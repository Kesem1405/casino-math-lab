// For register and login
export const languageDataAuthentication = {
    en: {
        login: {
            title: "Login",
            welcome: "Welcome back!",
            description: "Enter your username and password to access your account.",
            username: "Username",
            password: "Password",
            forgotPassword: "Forgot password?",
            noAccount: "Don't have an account?",
            register: "Register",
            moto: "Enrich your knowledge, Enrich your pocket.",
        },
        register: {
            title: "Register",
            welcome: "Create an account!",
            description: "Enter your details to create an account.",
            username: "Username",
            password: "Password",
            email: "Email",
            firstName: "First Name",
            lastName: "Last Name",
            phoneNumber: "Phone Number",
            minLength: "Minimum 8 characters",
            specialChar: "Special character",
            capitalLetter: "Capital letter",
            alreadyHaveAccount: "Already have an account?",
            login: "Login",

            moto: "Enrich your knowledge, Enrich your pocket.",
        },
    },
    he: {
        login: {
            title: "כניסה",
            welcome: "ברוך שובך!",
            description: "הזן את שם המשתמש והסיסמה שלך כדי לגשת לחשבון שלך.",
            username: "שם משתמש",
            password: "סיסמה",
            forgotPassword: "שכחת סיסמה?",
            noAccount: "אין לך חשבון?",
            register: "הרשמה",
            moto: "העשר את הידע שלך, העשר את כיסך.",
        },
        register: {
            title: "הרשמה",
            welcome: "צור חשבון!",
            description: "הזן את הפרטים שלך כדי ליצור חשבון.",
            username: "שם משתמש",
            password: "סיסמה",
            email: "אימייל",
            firstName: "שם פרטי",
            lastName: "שם משפחה",
            phoneNumber: "מספר טלפון",
            minLength: "מינימום 8 תווים",
            specialChar: "תו מיוחד",
            capitalLetter: "אות גדולה",
            alreadyHaveAccount: "כבר יש לך חשבון?",
            login: "כניסה",
            moto:" העשר את הידע שלך, העשר את כיסך. ",
        },
    },
};

// For roulette study mode.
export const LanguageDataRouletteStudyMode = {
    en: {
        studyMode: 'Study Mode',
        enterYourAnswer: 'Enter your answer',
        submit: 'Submit',
        info: 'Info',
        hint: 'Hint',
        correct: 'Correct!',
        incorrect: 'Incorrect!',
        timeRemaining: 'Time Remaining:',
        moneyEarned: 'Money Earned:',
        question: 'Question:',
        betTypesAndPayouts: 'Bet Types and Payouts',
        betType: 'Bet Type',
        payout: 'Payout',
        probability: 'Probability',
        close: 'Close',
        payoutQuestion: 'What is the total payout if the number {number} wins? (Enter an integer)',
        probabilityQuestion: 'What is the total probability (percentage) for these bets? (Enter a decimal number)',
        payoutHint: 'The total payout for these bets is usually {answer}:1.',
        probabilityHint: 'The total probability for these bets is usually around {answer}%.',
    },
    he: {
        studyMode: 'מצב לימוד',
        enterYourAnswer: 'הזן את התשובה שלך',
        submit: 'שלח',
        info: 'מידע',
        hint: 'רמז',
        correct: 'נכון!',
        incorrect: 'לא נכון!',
        timeRemaining: 'זמן נותר:',
        moneyEarned: 'כסף שהרווחת:',
        question: 'שאלה:',
        betTypesAndPayouts: 'סוגי הימורים ותשלומים',
        betType: 'סוג הימור',
        payout: 'תשלום',
        probability: 'הסתברות',
        close: 'סגור',
        payoutQuestion: 'מה יהיה התשלום הכולל אם המספר {number} ינצח? (הזן מספר שלם)',
        probabilityQuestion: 'מה ההסתברות הכוללת (באחוזים) עבור ההימורים האלה? (הזן מספר עשרוני)',
        payoutHint: 'התשלום הכולל עבור ההימורים האלה הוא בדרך כלל {answer}:1.',
        probabilityHint: 'ההסתברות הכוללת עבור ההימורים האלה היא בדרך כלל סביב {answer}%.',
    },
};

 // For the roulette game.

export const RouletteLanguageData = {
    en: {
        gameTitle: "Roulette Game",
        balance: "Balance",
        spinButton: "SPIN",
        undoButton: "Undo",
        cleanButton: "Clean",
        gameInfoButton: "Game Info",
        totalProbabilityButton: "Total Probability",
        roundWinningsText: "Winnings This Round",
        winningModalTitle: "You Win!",
        winningModalMessage: "Congratulations! You won $", // Removed {{amount}}
        studyModeButton: "Study Mode",
        exitStudyModeButton: "Exit Study Mode",
        noUndoBets: "No bets to undo!",
        betOn: "Bet on", // Removed {{betId}} and {{winnings}}
        totalBet: "Total Bet",
        payoutTable: {
            title: "Payouts & Probabilities",
            headers: ["Sum", "Payout Ratio", "Probability"],
        },
        lastWinsTable: {
            title: "Last Wins",
        },
    },
    he: {
        gameTitle: "משחק הרולטה",
        balance: "יתרה",
        spinButton: "סובב",
        undoButton: "בטל",
        cleanButton: "נקה",
        gameInfoButton: "מידע על המשחק",
        totalProbabilityButton: "הסתברות כוללת",
        roundWinningsText: "זכיות בסיבוב זה",
        winningModalTitle: "ניצחת!",
        winningModalMessage: "מזל טוב! זכית ב-", // Removed {{amount}}
        studyModeButton: "מצב לימוד",
        exitStudyModeButton: "יציאה ממצב לימוד",
        noUndoBets: "אין הימורים לבטל!",
        betOn: "הימור על", // Removed {{betId}} and {{winnings}}
        totalBet: "הימור כולל",
        payoutTable: {
            title: "יחסי תשלום והסתברויות",
            headers: ["סכום", "יחס תשלום", "הסתברות"],
        },
        lastWinsTable: {
            title: "זכיות אחרונות",
        },
    },
};

export const SearchLanguageData = {
    en: {
        searchPlaceholder: "Search for users or games...",
        searchButton: "Search",
        addFriend: "Send friend request",
        searchResultsFor: "Search results for",
        requestSent: 'Pending request'

    },
    he: {
        searchPlaceholder: "חפש משתמשים או משחקים...",
        searchButton: "חפש",
        addFriend: "הוסף חבר",
        searchResultsFor: "תוצאות חיפוש עבור",
        requestSent: 'הבקשה נשלחה'
    },
};

export const LanguageDataJarStudyMode = {
    en: {
        studyMode: "Study Mode",
        questionNumber: "Question",
        loadingNextQuestion: "Loading next question...",
        checkAnswer: "Check Answer",
        correctAnswer: "Correct! 🎉 +$10",
        incorrectAnswer: "Incorrect. The correct answer is: {correctAnswer}",
        score: "Score:",

        singleBallQuestion: "What is the probability of drawing a {color} ball?",
        twoBallsWithoutReplacement: "What is the probability of drawing a {color1} first and a {color2} second without replacement?",
        twoBallsWithReplacement: "What is the probability of drawing a {color} ball twice with replacement?",

        colors: {
            black: "black",
            red: "red",
            blue: "blue",
            yellow: "yellow",
            green: "green",
            white: "white"
        }
    },
    he: {
        studyMode: "מצב לימוד",
        questionNumber: "שאלה",
        loadingNextQuestion: "טוען שאלה הבאה...",
        checkAnswer: "בדוק תשובה",
        correctAnswer: "נכון! 🎉 +10$",
        incorrectAnswer: "לא נכון. התשובה הנכונה היא: {correctAnswer}",
        score: "ניקוד:",
        singleBallQuestion: "מה ההסתברות להוציא כדור {color}?",
        twoBallsWithoutReplacement: "מה ההסתברות להוציא כדור {color1} ראשון וכדור {color2} שני ללא החזרה?",
        twoBallsWithReplacement: "מה ההסתברות להוציא כדור {color} פעמיים עם החזרה?",

        colors: {
            black: "שחור",
            red: "אדום",
            blue: "כחול",
            yellow: "צהוב",
            green: "ירוק",
            white: "לבן"
        }
    }
};

export const JarColorPickLanguageData = {
    en: {
        gameTitle: "Jar Color Pick Game",
        enterStudyModeButton: "Enter Study Mode",
        exitStudyModeButton: "Exit Study Mode",
        betAmount: "Bet Amount:",
        roundsSelection: "Rounds Selection",
        oneRound: "1 Round",
        twoRounds: "2 Rounds",
        round1Bet: "Round 1 Bet:",
        round2Bet: "Round 2 Bet:",
        withReplacement: "With Replacement",
        withoutReplacement: "Without Replacement",
        colorButtons: {
            red: "Red",
            blue: "Blue",
            yellow: "Yellow",
        },
        shuffleButton: "Shuffle",
        insufficientBalance: "Insufficient balance!",
        selectColors: "Please select colors for both rounds.",
        selectColor: "Please select a color for the round.",
        result: "Result:",
        wonMessage: "You won! Payout: $",
        lostMessage: "You lost. Result: ",
        selectedColor: "Selected Color: ",
    },
    he: {
        gameTitle: "משחק בחירת צבע בצנצנת",
        enterStudyModeButton: "היכנס למצב לימוד",
        exitStudyModeButton: "יציאה ממצב לימוד",
        betAmount: "סכום ההימור:",
        roundsSelection: "בחירת סיבובים",
        oneRound: "סיבוב 1",
        twoRounds: "2 סיבובים",
        round1Bet: "הימור סיבוב 1:",
        round2Bet: "הימור סיבוב 2:",
        withReplacement: "עם חזרות",
        withoutReplacement: "בלי חזרות",
        colorButtons: {
            red: "אדום",
            blue: "כחול",
            yellow: "צהוב",
        },
        shuffleButton: "ערבוב",
        insufficientBalance: "יתרה לא מספקת!",
        selectColors: "אנא בחר צבעים לשני הסיבובים.",
        selectColor: "אנא בחר צבע להימור בסיבוב.",
        result: "תוצאה:",
        wonMessage: "ניצחת! תשלום: $",
        lostMessage: "הפסדת. התוצאה: ",
        selectedColor: "הצבע שנבחר: ",
    },
};

