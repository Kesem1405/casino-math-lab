import { ACTION_TYPES } from "../Constants";

export const calculateWinnings = (betType, betAmount, winningNumber) => {
    const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
    const blackNumbers = new Set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

    const columns = {
        '1ST_COLUMN': new Set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]),
        '2ND_COLUMN': new Set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]),
        '3RD_COLUMN': new Set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]),
    };

    const dozens = {
        '1ST_DOZEN': [1, 12],
        '2ND_DOZEN': [13, 24],
        '3RD_DOZEN': [25, 36],
    };

    if (!betAmount || typeof betAmount !== 'object') {
        console.error('Invalid betAmount:', betAmount);
        return 0;
    }

    if (betType === 'range' && typeof betAmount.betId === 'string') {
        betAmount.range = betAmount.betId.split('-').map(Number);
    }

    switch (betType) {
        case 'number':
            return winningNumber === parseInt(betAmount.betId) ? betAmount.amount * 36 : 0;

        case 'range':
            if (!Array.isArray(betAmount.range)) {
                console.error('Invalid range in betAmount:', betAmount);
                return 0;
            }
            return betAmount.range.includes(winningNumber) ? betAmount.amount * (36 / betAmount.range.length) : 0;

        case "low":
            if (winningNumber >= 1 && winningNumber <= 18) {
                return betAmount * 2;
            }
            return 0;

        case "high":
            if (winningNumber >= 19 && winningNumber <= 36) {
                return betAmount * 2;
            }
            return 0;

        case 'split':
            // Split bet typically covers 2 numbers
            return betAmount.payload.includes(winningNumber) ? betAmount.amount * 18 : 0;

        case 'street':
            // Street bet covers 3 numbers
            return betAmount.payload.includes(winningNumber) ? betAmount.amount * 12 : 0;

        case 'double-street':
            // Six-line bet covers 6 numbers (2 rows of 3 numbers each)
            return betAmount.payload.includes(winningNumber) ? betAmount.amount * 6 : 0;

        case 'column':
            return columns[betAmount.betId]?.has(winningNumber) ? betAmount.amount * 3 : 0;

        case 'even':
            return winningNumber !== 0 && winningNumber % 2 === 0 ? betAmount.amount * 2 : 0;

        case 'odd':
            return winningNumber % 2 === 1 ? betAmount.amount * 2 : 0;

        case 'red':
            return redNumbers.has(winningNumber) ? betAmount.amount * 2 : 0;

        case 'black':
            return blackNumbers.has(winningNumber) ? betAmount.amount * 2 : 0;

        case 'dozen':
            const [min, max] = dozens[betAmount.betId] || [];
            if (min === undefined || max === undefined) {
                console.error('Invalid dozen in betAmount:', betAmount);
                return 0;
            }
            return winningNumber >= min && winningNumber <= max ? betAmount.amount * 3 : 0;

        default:
            console.warn(`Unknown bet type: ${betType}`);
            return 0;
    }
};



export const calculateTotalWinningProbability = (bets) => {
    const totalNumbers = 37; // Including 0, so 37 numbers in total
    let coveredNumbers = new Set();

    Object.keys(bets).forEach((betId) => {
        const betType = getBetType(betId);

        switch (betType) {
            case 'number':
                coveredNumbers.add(parseInt(betId, 10));
                break;
            case 'split': {
                const [num1, num2] = betId.split('-').map(Number);
                coveredNumbers.add(num1);
                coveredNumbers.add(num2);
                break;
            }
            case 'street': {
                const base = parseInt(betId, 10);
                for (let i = 0; i < 3; i++) coveredNumbers.add(base + i);
                break;
            }
            case 'corner': {
                const [topLeft] = betId.split('-').map(Number);
                coveredNumbers.add(topLeft);
                coveredNumbers.add(topLeft + 1);
                coveredNumbers.add(topLeft + 3);
                coveredNumbers.add(topLeft + 4);
                break;
            }
            case 'six-line': {
                const [start] = betId.split('-').map(Number);
                for (let i = 0; i < 6; i++) coveredNumbers.add(start + i);
                break;
            }
            case 'double-street': {
                const [start] = betId.split('-').map(Number);
                for (let i = 0; i < 6; i++) coveredNumbers.add(start + i);
                break;
            }
            case 'trio': {
                const trioNumbers = betId.split('-').map(Number);
                trioNumbers.forEach((num) => coveredNumbers.add(num));
                break;
            }
            case 'basket-us': {
                [0, 1, 2, 3, 4].forEach((n) => coveredNumbers.add(n));
                break;
            }

            case 'red':
                [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].forEach((n) => coveredNumbers.add(n));
                break;
            case 'black':
                [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].forEach((n) => coveredNumbers.add(n));
                break;
            case 'odd':
                for (let i = 1; i <= 36; i += 2) coveredNumbers.add(i);
                break;
            case 'even':
                for (let i = 2; i <= 36; i += 2) coveredNumbers.add(i);
                break;
            case 'low':
                for (let i = 1; i <= 18; i++) coveredNumbers.add(i);
                break;
            case 'high':
                for (let i = 19; i <= 36; i++) coveredNumbers.add(i);
                break;
            case 'dozen': {
                const dozenStart = (parseInt(betId, 10) - 1) * 12 + 1;
                for (let i = 0; i < 12; i++) coveredNumbers.add(dozenStart + i);
                break;
            }
            case 'column': {
                const columnStart = parseInt(betId, 10);
                for (let i = 0; i < 12; i++) coveredNumbers.add(columnStart + i * 3);
                break;
            }

            default:
                break;
        }
    });

    const totalCoveredNumbers = coveredNumbers.size;
    return totalCoveredNumbers / totalNumbers;
};

export const calculateBetProbability = (betType) => {
    const totalNumbers = 37; // Including 0 (European roulette), 37 numbers in total
    switch (betType) {
        case 'number':
            return 1 / totalNumbers;

        case 'low':
        case 'high':
        case 'odd':
        case 'even':
        case 'red':
        case 'black':
            return 18 / totalNumbers;

        case 'column':
        case 'dozen':
            return 12 / totalNumbers;

        case 'street':
            // Street bet covers 3 consecutive numbers
            return 3 / totalNumbers;

        case 'split':
            // Split bet covers 2 numbers
            return 2 / totalNumbers;

        case 'double-street':
            // Double-street bet covers 6 numbers (2 rows of 3 numbers each)
            return 6 / totalNumbers;

        case 'corner':
            // Corner bet covers 4 numbers (a 2x2 square)
            return 4 / totalNumbers;

        case 'line':
            // Line bet covers 6 numbers (2 rows of 3 numbers each)
            return 6 / totalNumbers;

        case 'topLine':
            // Top Line bet covers 5 numbers
            return 5 / totalNumbers;

        case 'basket':
            // Basket bet covers 4 numbers (0, 1, 2, 3, 4)
            return 4 / totalNumbers;

        case 'six-line':
            // Six-line bet covers 6 numbers (2 rows of 3 numbers each)
            return 6 / totalNumbers;

        case 'basket-us':
            // Basket-US bet covers 5 numbers (0, 1, 2, 3, 4)
            return 5 / totalNumbers;

        default:
            return 0;
    }
};



export const getBetType = (betId) => {
    if (!betId || typeof betId !== 'string') return null;

    if (betId.includes('STREET')) return 'street';
    if (betId.includes('ROW')) return 'row';
    if (betId.includes('SPLIT')) return 'split';
    if (betId.includes('DOUBLE_STREET')) return 'double-street';
    if (betId.includes('DOZEN')) return 'dozen';
    if (betId.includes('COLUMN')) return 'column';
    if (betId === ACTION_TYPES.RED) return 'red';
    if (betId === ACTION_TYPES.BLACK) return 'black';
    if (betId === ACTION_TYPES.ODD) return 'odd';
    if (betId === ACTION_TYPES.EVEN) return 'even';
    if (betId === ACTION_TYPES['1_TO_18']) return 'low';
    if (betId === ACTION_TYPES['19_TO_36']) return 'high';
    if (betId === ACTION_TYPES['0']) return 'number';

    if (betId.includes('-')) {
        const numbers = betId.split('-').map(Number);
        if(numbers.length === 1) return 'number'
        if (numbers.length === 2) return 'split';
        if (numbers.length === 3) return 'street';
        if (numbers.length === 4) return 'basket-us';
        if (numbers.length === 6) return 'double-street';

        console.warn(`Unrecognized dash-separated pattern: ${betId}`);
        return null;
    }

    if (!isNaN(betId)) return 'number';

    console.warn(`Unknown betId format: ${betId}`);
    return null;
};

