// RouletteStudyModeLogic.js
import {
    betTypes,
    isRed,
    payouts,
    probabilities,
    validCorners,
    validSplits
} from '../RouletteTableHelpers/Constants/rouletteConstants';
import {ACTION_TYPES} from '../RouletteTableHelpers/Constants';
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
            // Calculate the total payout and probability for this set of bets
            const totalPayout = bets.reduce((sum, bet) => {
                return sum + (bet.payout || 0);
            }, 0);

            const totalProbability = bets.reduce((sum, bet) => {
                return sum + (bet.probability || 0);
            }, 0);

            // Add the total payout and probability to the question object
            questions.push({
                level,
                bets,
                totalPayout,
                totalProbability: totalProbability > 100 ? 100 : totalProbability, // Ensure probability doesn't exceed 100
            });
        }
    }

    return questions;
};


// Helper to generate random numbers for each bet type
export const generateRandomNumbersForBetType = (betType) => {
    switch (betType) {
        case 'straight':
            return [Math.floor(Math.random() * 38)]; // 0-37
        case 'split':
            // Adjusting to select only valid splits
            return validSplits[Math.floor(Math.random() * validSplits.length)];
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

// Generate a random question with multiple choice answers
export const generateQuestion = (bets, text) => {
    if (!bets || bets.length === 0) {
        console.error('Invalid bets for question generation:', bets);
        return null;
    }

    const questionTypes = ['payout', 'probability'];
    const randomQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    let correctAnswer;
    let options;

    if (randomQuestionType === 'payout') {
        // Calculate the total payout for all the bets
        correctAnswer = bets.reduce((sum, bet) => sum + (payouts[bet.type] || 0), 0);

        // Ensure correct answer is non-zero (if payout is 0, set it to a valid positive value)
        if (correctAnswer <= 0) {
            correctAnswer = Math.floor(Math.random() * 100) + 1; // Random valid positive number
        }

        options = generateOptions(correctAnswer, 'integer');
        return {
            type: 'payout',
            text: text.payoutQuestion.replace('{number}', bets[0].numbers[0]),
            options,
            answer: correctAnswer.toString(),
        };
    } else {
        // Handle special bet types like red/black, even/odd, low/high
        const specialBetTypes = ['red/black', 'even/odd', 'low/high'];

        // Calculate the total probability for all the bets
        correctAnswer = bets.reduce((sum, bet) => {
            if (specialBetTypes.includes(bet.type)) {
                return sum + 47.37; // Fixed probability for red/black, even/odd, low/high
            } else {
                return sum + (probabilities[bet.type] || 0);
            }
        }, 0).toFixed(2);

        // Ensure correct answer is non-zero (if probability is 0, set it to a valid value)
        if (parseFloat(correctAnswer) <= 0) {
            correctAnswer = '0.01'; // Minimum valid probability
        }
        console.log(correctAnswer)
        options = generateOptions(correctAnswer, 'percentage');
        return {
            type: 'probability',
            text: text.probabilityQuestion,
            options,
            answer: correctAnswer.toString(),
        };
    }
};

const generateOptions = (correctAnswer, format) => {
    const options = new Set();
    options.add(correctAnswer);

    // Generate three random incorrect options
    while (options.size < 4) {
        const incorrect = format === 'integer'
            ? Math.floor(Math.random() * 100)  // Random integer for payout questions
            : (Math.random() * 100).toFixed(2);  // Random decimal for probability questions
        options.add(incorrect);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
};

export const generateHint = (currentQuestion, text) => {
    if (!currentQuestion) return '';

    if (currentQuestion.type === 'payout') {
        return text.payoutHint.replace('{answer}', currentQuestion.answer);
    } else {
        return text.probabilityHint.replace('{answer}', currentQuestion.answer);
    }
};
