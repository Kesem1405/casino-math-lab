// src/constants/games.js
import CoinFlipSearchResult from '../Media/images/GameSearchResultsImages/CoinFlipSearchResult.png';
import DiceSearchResult from '../Media/images/GameSearchResultsImages/DiceSearchResults.png';
import JarSearchResult from '../Media/images/GameSearchResultsImages/JarSearchResult.png';
import RouletteSearchResult from '../Media/images/GameSearchResultsImages/RouletteSearchResult.png';

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