// src/constants/games.js
import CoinFlipSearchResult from '../Media/images/GameSearchResultsImages/CoinFlipSearchResult.png';
import DiceSearchResult from '../Media/images/GameSearchResultsImages/DiceSearchResults.png';
import JarSearchResult from '../Media/images/GameSearchResultsImages/JarSearchResult.png';
import RouletteSearchResult from '../Media/images/GameSearchResultsImages/RouletteSearchResult.png';

import RouletteImage from '../Media/images/RouletteImage.jpg'
import DiceImage from '../Media/images/DiceImage.jpg'
import JarImage from '../Media/images/jar.jpg'
import CoinFlipImage from '../Media/images/CoinFlip.jpg'

import RouletteGif from '../Media/gifs/RouletteGif.gif'
import DiceGif from '../Media/gifs/DiceGif.gif'
import JarGif from '../Media/gifs/jar.gif'
import CoinFlipGif from '../Media/gifs/CoinFlipGif.gif'

export const GameSearchResults = [
    {
        id: 1,
        name: 'Roulette',
        type: 'game',
        path: '/roulette',
        image: RouletteSearchResult,
    },
    {
        id: 2,
        name: 'Dice',
        type: 'game',
        path: '/dice',
        image: DiceSearchResult,
    },
    {
        id: 3,
        name: 'Coin Flip',
        type: 'game',
        path: '/coin-flip',
        image: CoinFlipSearchResult,
    },
    {
        id: 4,
        name: 'Jar Color Picking',
        type: 'game',
        path: '/jar-color-picking',
        image: JarSearchResult,
    },
];

export const gamesData = [
    {
        name: {
            en: "Roulette",
            he: "רולטה",
        },
        staticImg: RouletteImage,
        gifImg: RouletteGif,
        description: {
            en: "Test your luck with our interactive roulette game!",
            he: "בדוק את מזלך עם משחק הרולטה האינטראקטיבי שלנו!",
        },
        route: "/roulette",
        buttonText: {
            en: "Play Roulette",
            he: "שחק ברולטה",
        },
    },
    {
        name: {
            en: "Dice rolling",
            he: "הטלת קוביות",
        },
        staticImg: DiceImage,
        gifImg: DiceGif,
        description: {
            en: "Roll the dice and explore probabilities.",
            he: "השלך את הקוביות וחקור הסתברויות.",
        },
        route: "/dice",
        buttonText: {
            en: "Play Dice",
            he: "שחק בקוביות",
        },
    },
    {
        name: {
            en: "Ball Picking",
            he: "בחירת כדורים",
        },
        staticImg: JarImage,
        gifImg: JarGif,
        description: {
            en: "Pick balls and learn about random events.",
            he: "בחר כדורים ולמד על אירועים אקראיים.",
        },
        route: "/ball-picking",
        buttonText: {
            en: "Play Ball Picking",
            he: "שחק בבחירת כדורים",
        },
    },
    {
        name: {
            en: "Coin Flip",
            he: "הטלת מטבע",
        },
        staticImg: CoinFlipImage,
        gifImg: CoinFlipGif,
        description: {
            en: "Flip a coin and analyze the outcomes.",
            he: "הפוך מטבע ונתח את התוצאות.",
        },
        route: "/coin-flip",
        buttonText: {
            en: "Play Coin Flip",
            he: "שחק בהפיכת מטבע",
        },
    },
];

