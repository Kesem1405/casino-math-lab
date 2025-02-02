export const jarStories = [
    // Original stories
    {
        id: 1,
        description: {
            en: "The jar contains 15 balls: 5 black, 5 green, 3 white, and 2 yellow.",
            he: "הכד מכיל 15 כדורים: 5 שחורים, 5 ירוקים, 3 לבנים ושניים צהובים."
        },
        totalBalls: { black: 5, green: 5, white: 3, yellow: 2 },
    },
    {
        id: 2,
        description: {
            en: "The jar contains 12 balls: 4 black, 4 green, 3 white, and 1 yellow.",
            he: "הכד מכיל 12 כדורים: 4 שחורים, 4 ירוקים, 3 לבנים וכדור צהוב אחד."
        },
        totalBalls: { black: 4, green: 4, white: 3, yellow: 1 },
    },
    {
        id: 3,
        description: {
            en: "The jar contains 20 balls: 7 black, 5 green, 4 white, and 4 yellow.",
            he: "הכד מכיל 20 כדורים: 7 שחורים, 5 ירוקים, 4 לבנים ו-4 צהובים."
        },
        totalBalls: { black: 7, green: 5, white: 4, yellow: 4 },
    },
    // Additional stories based on the new questions
    {
        id: 4,
        description: {
            en: "The box contains 15 balls: 6 black, 4 white, and 5 blue. 3 balls are drawn without replacement.",
            he: "בקופסה נמצאים 15 כדורים: 6 כדורים שחורים, 4 כדורים לבנים, ו-5 כדורים כחולים. בוחרים 3 כדורים ללא החזרה."
        },
        totalBalls: { black: 6, white: 4, blue: 5 },
        questionType: 'noReplacement'
    },
    {
        id: 5,
        description: {
            en: "The box contains 15 balls: 6 black, 4 white, and 5 blue. Draw 3 balls with replacement. What is the probability of drawing at least one black ball?",
            he: "בקופסה נמצאים 15 כדורים: 6 כדורים שחורים, 4 כדורים לבנים, ו-5 כדורים כחולים. בוחרים 3 כדורים עם החזרה. מה ההסתברות להוציא לפחות כדור שחור אחד?"
        },
        totalBalls: { black: 6, white: 4, blue: 5 },
        questionType: 'withReplacement'
    },
    {
        id: 6,
        description: {
            en: "The box contains 7 balls: 2 white balls. Draw balls with replacement until the first white ball is drawn. What is the probability that at least 4 balls are drawn?",
            he: "בקופסה נמצאים 7 כדורים: 2 כדורים לבנים. בוחרים כדורים עם החזרה עד הוצאת הכדור הלבן הראשון. מה ההסתברות להוציא לפחות 4 כדורים?"
        },
        totalBalls: { white: 2, other: 5 },
        questionType: 'replacementUntilFirstWhite'
    },
    {
        id: 7,
        description: {
            en: "The box contains 7 balls: 2 white balls. Draw balls with replacement until the second white ball is drawn. What is the probability that at least 3 balls are drawn?",
            he: "בקופסה נמצאים 7 כדורים: 2 כדורים לבנים. בוחרים כדורים עם החזרה עד הוצאת הכדור הלבן השני. מה ההסתברות להוציא לפחות 3 כדורים?"
        },
        totalBalls: { white: 2, other: 5 },
        questionType: 'replacementUntilSecondWhite'
    },
    {
        id: 8,
        description: {
            en: "The box contains 15 balls: 6 black, 4 white, and 5 blue. 3 balls are drawn without replacement. What is the probability of drawing exactly 2 black balls and 1 white ball?",
            he: "בקופסה נמצאים 15 כדורים: 6 כדורים שחורים, 4 כדורים לבנים, ו-5 כדורים כחולים. בוחרים 3 כדורים ללא החזרה. מה ההסתברות להוציא בדיוק 2 כדורים שחורים וכדור לבן אחד?"
        },
        totalBalls: { black: 6, white: 4, blue: 5 },
        questionType: 'specificCombination'
    },
    {
        id: 9,
        description: {
            en: "The box contains 15 balls: 6 black, 4 white, and 5 blue. 3 balls are drawn without replacement. What is the probability of drawing at least 1 black ball?",
            he: "בקופסה נמצאים 15 כדורים: 6 כדורים שחורים, 4 כדורים לבנים, ו-5 כדורים כחולים. בוחרים 3 כדורים ללא החזרה. מה ההסתברות להוציא לפחות כדור שחור אחד?"
        },
        totalBalls: { black: 6, white: 4, blue: 5 },
        questionType: 'atLeastOneBlackBall'
    },
    {
        id: 10,
        description: {
            en: "The box contains 7 balls: 2 white balls. Draw balls with replacement until the first white ball is drawn. What is the probability of drawing exactly 4 balls?",
            he: "בקופסה נמצאים 7 כדורים: 2 כדורים לבנים. בוחרים כדורים עם החזרה עד הוצאת הכדור הלבן הראשון. מה ההסתברות להוציא בדיוק 4 כדורים?"
        },
        totalBalls: { white: 2, other: 5 },
        questionType: 'replacementUntilFirstWhiteExact'
    }
];