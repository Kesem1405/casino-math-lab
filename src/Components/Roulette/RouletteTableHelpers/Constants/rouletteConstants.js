// rouletteConstants.js For study  mode!

// Valid bet types
export const betTypes = [
    'straight', 'split', 'street', 'corner', 'line', 'dozen', 'column', 'red/black', 'even/odd', 'low/high'
];

// Valid corners
export const validCorners = [
    [1, 2, 4, 5], [2, 3, 5, 6], [4, 5, 7, 8], [5, 6, 8, 9],
    [7, 8, 10, 11], [8, 9, 11, 12], [10, 11, 13, 14], [11, 12, 14, 15],
    [13, 14, 16, 17], [14, 15, 17, 18], [16, 17, 19, 20], [17, 18, 20, 21],
    [19, 20, 22, 23], [20, 21, 23, 24], [22, 23, 25, 26], [23, 24, 26, 27],
    [25, 26, 28, 29], [26, 27, 29, 30], [28, 29, 31, 32], [29, 30, 32, 33],
    [31, 32, 34, 35], [32, 33, 35, 36]
];

// Payouts for bet types
export const payouts = {
    straight: 35,
    split: 17,
    street: 11,
    corner: 8,
    line: 5,
    dozen: 2,
    column: 2,
    red: 1,
    black: 1,
    even: 1,
    odd: 1,
    low: 1,
    high: 1,
};

// Probabilities for bet types (American roulette)
export const probabilities = {
    straight: (1 / 38) * 100,
    split: (2 / 38) * 100,
    street: (3 / 38) * 100,
    corner: (4 / 38) * 100,
    line: (6 / 38) * 100,
    dozen: (12 / 38) * 100,
    column: (12 / 38) * 100,
    red: (18 / 38) * 100,
    black: (18 / 38) * 100,
    even: (18 / 38) * 100,
    odd: (18 / 38) * 100,
    low: (18 / 38) * 100,
    high: (18 / 38) * 100,
};
// Red and black numbers
export const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
export const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

// Dozen and column ranges
export const dozens = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 1st dozen
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // 2nd dozen
    [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], // 3rd dozen
];

export const columns = [
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], // 1st column
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], // 2nd column
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], // 3rd column
];

// Helper functions
export const isRed = (number) => redNumbers.includes(number);
export const isBlack = (number) => blackNumbers.includes(number);

export const getDozen = (number) => {
    if (number >= 1 && number <= 12) return 1;
    if (number >= 13 && number <= 24) return 2;
    if (number >= 25 && number <= 36) return 3;
    return null;
};

export const getColumn = (number) => {
    if (number % 3 === 1) return 1;
    if (number % 3 === 2) return 2;
    if (number % 3 === 0) return 3;
    return null;
};

