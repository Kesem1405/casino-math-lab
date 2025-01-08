import { ACTION_TYPES } from "../Constants";

const columns = {
    '1ST_COLUMN': new Set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]),
    '2ND_COLUMN': new Set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]),
    '3RD_COLUMN': new Set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]),
};

    export const calculateWinnings = (betType, betAmount, winningNumber) => {
        const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
        const blackNumbers = new Set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);

        const dozens = {
            '1ST_DOZEN': [1, 12],
            '2ND_DOZEN': [13, 24],
            '3RD_DOZEN': [25, 36],
        };

        if (typeof betAmount !== 'object' || betAmount === null) {
            console.error('Invalid betAmount:', betAmount);
            return 0;
        }

        // Initialize betAmount.payload as an empty array if it is undefined
        const payload = Array.isArray(betAmount.payload) ? betAmount.payload : [];

        // Check for the case of Zero bet
        if (winningNumber === 0) {
            if (betType === 'ZERO') {
                return betAmount.amount * 36; // Usually pays 35 to 1, but adjusted for your rules
            }
            return 0;
        }

        switch (betType) {
            case 'STRAIGHT_UP':
                return winningNumber === parseInt(betAmount.betId) ? betAmount.amount * 36 : 0;

            case 'SPLIT': {
                const [num1, num2] = betAmount.betId.split('-').map(Number);
                return (num1 === winningNumber || num2 === winningNumber) ? betAmount.amount * 18 : 0;
            }

            case 'STREET': {
                const base = parseInt(betAmount.betId, 10);
                for (let i = 0; i < 3; i++) {
                    if (base + i === winningNumber) {
                        return betAmount.amount * 12; // STREET bet pays 11:1, hence multiplier is 12
                    }
                }
                return 0;
            }

            case 'DOUBLE_STREET': {
                const base = parseInt(betAmount.betId, 10);
                for (let i = 0; i < 6; i++) {
                    if (base + i === winningNumber) {
                        return betAmount.amount * 6; // DOUBLE STREET pays 5:1, hence multiplier is 6
                    }
                }
                return 0;
            }

            case 'CORNER': {
                const [topLeft] = betAmount.betId.split('-').map(Number);
                const cornerNumbers = [
                    topLeft, topLeft + 1, topLeft + 3, topLeft + 4
                ];
                if (cornerNumbers.includes(winningNumber)) {
                    return betAmount.amount * 9; // CORNER bet pays 8:1, hence multiplier is 9
                }
                return 0;
            }

            case '1ST_COLUMN':
            case '2ND_COLUMN':
            case '3RD_COLUMN':
                return columns[betType]?.has(winningNumber) ? betAmount.amount * 3 : 0;

            case 'EVEN':
                return winningNumber !== 0 && winningNumber % 2 === 0 ? betAmount.amount * 2 : 0;

            case 'ODD':
                return winningNumber % 2 === 1 ? betAmount.amount * 2 : 0;

            case 'RED':
                return redNumbers.has(winningNumber) ? betAmount.amount * 2 : 0;

            case 'BLACK':
                return blackNumbers.has(winningNumber) ? betAmount.amount * 2 : 0;

            case '1_TO_18':
                return winningNumber >= 1 && winningNumber <= 18 ? betAmount.amount * 2 : 0;

            case '19_TO_36':
                return winningNumber >= 19 && winningNumber <= 36 ? betAmount.amount * 2 : 0;

            case '1ST_DOZEN':
            case '2ND_DOZEN':
            case '3RD_DOZEN': {
                const [min, max] = dozens[betType] || [];
                if (min === undefined || max === undefined) {
                    console.error('Invalid dozen in betAmount:', betAmount);
                    return 0;
                }
                return winningNumber >= min && winningNumber <= max ? betAmount.amount * 3 : 0;
            }

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
            case 'STRAIGHT_UP':
                coveredNumbers.add(parseInt(betId, 10));
                break;
            case 'SPLIT': {
                const [num1, num2] = betId.split('-').map(Number);
                coveredNumbers.add(num1);
                coveredNumbers.add(num2);
                break;
            }
            case 'STREET': {
                const base = parseInt(betId, 10);
                for (let i = 0; i < 3; i++) coveredNumbers.add(base + i);
                break;
            }
            case 'CORNER': {
                const [topLeft] = betId.split('-').map(Number);
                coveredNumbers.add(topLeft);
                coveredNumbers.add(topLeft + 1);
                coveredNumbers.add(topLeft + 3);
                coveredNumbers.add(topLeft + 4);
                break;
            }
            case 'DOUBLE_STREET': {
                const [start] = betId.split('-').map(Number);
                for (let i = 0; i < 6; i++) coveredNumbers.add(start + i);
                break;
            }
            case '1ST_COLUMN':
            case '2ND_COLUMN':
            case '3RD_COLUMN': {
                const columnSet = columns[betId];
                if (columnSet) {
                    columnSet.forEach((num) => coveredNumbers.add(num));
                }
                break;
            }
            case 'EVEN':
                for (let i = 2; i <= 36; i += 2) coveredNumbers.add(i);
                break;
            case 'ODD':
                for (let i = 1; i <= 36; i += 2) coveredNumbers.add(i);
                break;
            case 'RED':
                [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].forEach((n) => coveredNumbers.add(n));
                break;
            case 'BLACK':
                [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].forEach((n) => coveredNumbers.add(n));
                break;
            case '1_TO_18':
                for (let i = 1; i <= 18; i++) coveredNumbers.add(i);
                break;
            case '19_TO_36':
                for (let i = 19; i <= 36; i++) coveredNumbers.add(i);
                break;
            case '1ST_DOZEN':
            case '2ND_DOZEN':
            case '3RD_DOZEN': {
                const dozenStart = (parseInt(betId, 10) - 1) * 12 + 1;
                for (let i = 0; i < 12; i++) coveredNumbers.add(dozenStart + i);
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
        case 'STRAIGHT_UP':
            return 1 / totalNumbers;
        case 'SPLIT':
            return 2 / totalNumbers;
        case 'STREET':
            return 3 / totalNumbers;
        case 'CORNER':
            return 4 / totalNumbers;
        case 'DOUBLE_STREET':
            return 6 / totalNumbers;
        case '1ST_COLUMN':
        case '2ND_COLUMN':
        case '3RD_COLUMN':
            return 12 / totalNumbers;
        case 'EVEN':
        case 'ODD':
        case 'RED':
        case 'BLACK':
            return 18 / totalNumbers;
        case '1_TO_18':
        case '19_TO_36':
            return 18 / totalNumbers;
        case '1ST_DOZEN':
        case '2ND_DOZEN':
        case '3RD_DOZEN':
            return 12 / totalNumbers;
        default:
            return 0;
    }
};

export const getBetType = (betId) => {
    if (!betId || typeof betId !== 'string') return null;

    // Check for single number bets
    if (/^\d+$/.test(betId)) {
        return 'STRAIGHT_UP';
    }


    if (betId.includes('-') && betId.split('-').length === 3) {
        return 'STREET';
    }

    if (betId.includes('-') && betId.split('-').length === 2) {
        return 'SPLIT';
    }

    if (betId.includes('-') && betId.split('-').length === 6) {
        return 'DOUBLE_STREET';
    }

    if (betId.includes('-') && betId.split('-').length === 4) {
        return 'CORNER';
    }

    if (betId === ACTION_TYPES['1ST_COLUMN']) return '1ST_COLUMN';
    if (betId === ACTION_TYPES['2ND_COLUMN']) return '2ND_COLUMN';
    if (betId === ACTION_TYPES['3RD_COLUMN']) return '3RD_COLUMN';
    if (betId === ACTION_TYPES['1ST_DOZEN']) return '1ST_DOZEN';
    if (betId === ACTION_TYPES['2ND_DOZEN']) return '2ND_DOZEN';
    if (betId === ACTION_TYPES['3RD_DOZEN']) return '3RD_DOZEN';
    if (betId === ACTION_TYPES['1_TO_18']) return '1_TO_18';
    if (betId === ACTION_TYPES['19_TO_36']) return '19_TO_36';
    if (betId === ACTION_TYPES.EVEN) return 'EVEN';
    if (betId === ACTION_TYPES.ODD) return 'ODD';
    if (betId === ACTION_TYPES.RED) return 'RED';
    if (betId === ACTION_TYPES.BLACK) return 'BLACK';
    if (betId === 'ZERO') return 'ZERO';

    // If no match, return null
    return null;
};



