// RouletteStudyModeLogic.js
import { betTypes, validCorners, payouts, probabilities, isRed } from '../RouletteTableHelpers/Constants/rouletteConstants';
import { ACTION_TYPES } from '../RouletteTableHelpers/Constants';
import studyChip from '../../../Media/images/chips/study-chip.png'

// Generate random bets and questions
export const generateQuestions = () => {
    const questions = [];

    for (let i = 0; i < 15; i++) {
        const level = i < 5 ? 'easy' : i < 10 ? 'medium' : 'hard';
        const bets = [];

        const numBets = level === 'easy' ? 1 : level === 'medium' ? 2 : 3;
        for (let j = 0; j < numBets; j++) {
            const randomBetType = betTypes[Math.floor(Math.random() * betTypes.length)];
            const randomNumbers = generateRandomNumbersForBetType(randomBetType);
            const payout = payouts[randomBetType];
            const probability = probabilities[randomBetType];

            if (randomNumbers.length > 0) {
                bets.push({
                    type: randomBetType,
                    numbers: randomNumbers,
                    payout,
                    probability,
                });
            }
        }

        if (bets.length > 0) {
            questions.push({
                level,
                bets,
            });
        }
    }

    return questions;
};

export const generateRandomNumbersForBetType = (betType) => {
    switch (betType) {
        case 'straight':
            return [Math.floor(Math.random() * 38)]; // 0-37
        case 'split':
            const start = Math.floor(Math.random() * 33) + 1; // 1-33
            return [start, start + 1];
        case 'street':
            const streetStart = Math.floor(Math.random() * 12) * 3 + 1; // 1, 4, 7, ..., 34
            return [streetStart, streetStart + 1, streetStart + 2];
        case 'corner':
            return validCorners[Math.floor(Math.random() * validCorners.length)];
        case 'line':
            const lineStart = Math.floor(Math.random() * 11) * 3 + 1; // 1, 4, 7, ..., 31
            return [lineStart, lineStart + 1, lineStart + 2, lineStart + 3, lineStart + 4, lineStart + 5];
        case 'dozen':
            const dozenStart = Math.floor(Math.random() * 3) * 12 + 1; // 1, 13, 25
            return Array.from({ length: 12 }, (_, i) => dozenStart + i);
        case 'column':
            const columnStart = Math.floor(Math.random() * 3) + 1; // 1, 2, 3
            return Array.from({ length: 12 }, (_, i) => columnStart + i * 3);
        case 'red/black':
        case 'even/odd':
        case 'low/high':
            return [Math.floor(Math.random() * 36) + 1]; // 1-36
        default:
            return [];
    }
};

// Simulate bets for the roulette table
export const simulateBets = (bets) => {
    const simulatedBets = {};

    if (!bets || bets.length === 0) {
        console.log('No bets to simulate. Returning empty simulatedBets.');
        return {};
    }

    bets.forEach((bet) => {
        if (!bet.type || !bet.numbers || bet.numbers.length === 0) {
            console.warn('Invalid bet data:', bet);
            return;
        }

        switch (bet.type) {
            case 'straight':
                bet.numbers.forEach(num => {
                    if (num >= 0 && num <= 37) {
                        simulatedBets[num] = { number: 1, icon: studyChip };
                    }
                });
                break;

            case 'split':
                if (bet.numbers.length >= 2) {
                    const sortedNumbers = bet.numbers.slice().sort((a, b) => a - b);
                    const splitKey = `${sortedNumbers[0]}-${sortedNumbers[1]}`;
                    simulatedBets[splitKey] = { number: 1, icon: studyChip };
                }
                break;

            case 'street':
                if (bet.numbers.length >= 3) {
                    const sortedNumbers = bet.numbers.slice().sort((a, b) => a - b);
                    const streetKey = `${sortedNumbers[0]}-${sortedNumbers[1]}-${sortedNumbers[2]}`;
                    simulatedBets[streetKey] = { number: 1, icon: studyChip };
                }
                break;

            case 'corner':
                if (bet.numbers.length >= 4) {
                    const sortedNumbers = bet.numbers.slice().sort((a, b) => a - b);
                    const cornerKey = `${sortedNumbers[0]}-${sortedNumbers[1]}-${sortedNumbers[2]}-${sortedNumbers[3]}`;
                    simulatedBets[cornerKey] = { number: 1, icon: studyChip };
                }
                break;

            case 'line':
                if (bet.numbers.length >= 6) {
                    const sortedNumbers = bet.numbers.slice().sort((a, b) => a - b);
                    const lineKey = `${sortedNumbers[0]}-${sortedNumbers[1]}-${sortedNumbers[2]}-${sortedNumbers[3]}-${sortedNumbers[4]}-${sortedNumbers[5]}`;
                    simulatedBets[lineKey] = { number: 1, icon: studyChip };
                }
                break;

            case 'dozen':
                if (bet.numbers.length >= 12) {
                    const dozenKey = `${ACTION_TYPES[`${bet.numbers[0] <= 12 ? '1ST_DOZEN' : bet.numbers[0] <= 24 ? '2ND_DOZEN' : '3RD_DOZEN'}`]}`;
                    simulatedBets[dozenKey] = { number: 1, icon: studyChip };
                }
                break;

            case 'column':
                if (bet.numbers.length >= 12) {
                    const columnKey = `${ACTION_TYPES[`${bet.numbers[0] % 3 === 1 ? '1ST_COLUMN' : bet.numbers[0] % 3 === 2 ? '2ND_COLUMN' : '3RD_COLUMN'}`]}`;
                    simulatedBets[columnKey] = { number: 1, icon: studyChip };
                }
                break;

            case 'red/black':
                const colorKey = `${ACTION_TYPES[isRed(bet.numbers[0]) ? 'RED' : 'BLACK']}`;
                simulatedBets[colorKey] = { number: 1, icon: studyChip };
                break;

            case 'even/odd':
                const parityKey = `${ACTION_TYPES[bet.numbers[0] % 2 === 0 ? 'EVEN' : 'ODD']}`;
                simulatedBets[parityKey] = { number: 1, icon: studyChip };
                break;

            case 'low/high':
                const rangeKey = `${ACTION_TYPES[bet.numbers[0] <= 18 ? '1_TO_18' : '19_TO_36']}`;
                simulatedBets[rangeKey] = { number: 1, icon: studyChip };
                break;

            default:
                console.warn('Unknown bet type:', bet.type);
                break;
        }
    });

    if (Object.keys(simulatedBets).length === 0) {
        console.log('No valid bets found. Returning default simulatedBets.');
        return {};
    } else {
        console.log('Simulated bets:', simulatedBets);
        return simulatedBets;
    }
};

// Generate a random question based on the bets
export const generateQuestion = (bets, text) => {
    if (!bets || bets.length === 0) {
        console.error('Invalid bets for question generation:', bets);
        return null;
    }

    const questionTypes = ['payout', 'probability'];
    const randomQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    if (randomQuestionType === 'payout') {
        const totalPayout = bets.reduce((sum, bet) => sum + bet.payout, 0);
        return {
            type: 'payout',
            text: text.payoutQuestion.replace('{number}', bets[0].numbers[0]),
            answer: totalPayout,
        };
    } else {
        const totalProbability = bets.reduce((sum, bet) => sum + bet.probability, 0);
        return {
            type: 'probability',
            text: text.probabilityQuestion,
            answer: totalProbability.toFixed(2),
        };
    }
};

// Generate a hint for the current question
export const generateHint = (currentQuestion, text) => {
    if (!currentQuestion) return '';

    if (currentQuestion.type === 'payout') {
        return text.payoutHint.replace('{answer}', currentQuestion.answer);
    } else {
        return text.probabilityHint.replace('{answer}', currentQuestion.answer);
    }
};