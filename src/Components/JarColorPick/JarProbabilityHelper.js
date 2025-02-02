export function combination(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
        result *= (n - i) / (i + 1);
    }
    return result;
}

// Probability calculations based on the question type
export function calculateProbability(story) {
    const { totalBalls, questionType } = story;
    const total = Object.values(totalBalls).reduce((acc, val) => acc + val, 0);

    switch (questionType) {
        case 'noReplacement': {
            // Probability of drawing 3 balls without replacement (example)
            const totalBlack = totalBalls.black;
            const totalWhite = totalBalls.white;
            const totalBlue = totalBalls.blue;

            const prob = (combination(totalBlack, 2) * combination(totalWhite, 1)) / combination(total, 3);
            return prob;
        }
        case 'withReplacement': {
            // Probability of drawing at least one black ball with replacement
            const probBlack = totalBalls.black / total;
            const probNoBlack = (total - totalBalls.black) / total;
            return 1 - Math.pow(probNoBlack, 3);
        }
        case 'replacementUntilFirstWhite': {
            // Geometric distribution for drawing until the first white ball is drawn
            const probWhite = totalBalls.white / total;
            return Math.pow(1 - probWhite, 3) * probWhite;
        }
        case 'replacementUntilSecondWhite': {
            // Probability for second white ball
            const probWhite = totalBalls.white / total;
            return Math.pow(1 - probWhite, 4) * Math.pow(probWhite, 2);
        }
        case 'specificCombination': {
            // Probability of drawing exactly 2 black balls and 1 white ball without replacement
            const blackProb = combination(totalBalls.black, 2);
            const whiteProb = combination(totalBalls.white, 1);
            const totalProb = combination(total, 3);
            return (blackProb * whiteProb) / totalProb;
        }
        case 'atLeastOneBlackBall': {
            // Probability of drawing at least one black ball
            const probNoBlack = (total - totalBalls.black) / total;
            return 1 - Math.pow(probNoBlack, 3);
        }
        default:
            return 0;
    }
}