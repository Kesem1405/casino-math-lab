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