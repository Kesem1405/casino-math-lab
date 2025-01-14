import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Roulette from './Roulette/Roulette';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from './Media/images/Logo.png'
import GameCards from "./MenuGameCards/GameCards";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouletteImage from './Media/images/RouletteImage.jpg';
import RouletteGif from './Media/gifs/RouletteGif.gif';
import DiceImage from './Media/images/DiceImage.jpg';
import DiceGif from './Media/gifs/DiceGif.gif';
import JarGif from './Media/gifs/jar.gif';
import JarImage from './Media/images/jar.jpg';
import CoinFlipImage from './Media/images/CoinFlip.jpg';
import CoinFlipGif from './Media/gifs/CoinFlipGif.gif';



const App = () => {
    const [language, setLanguage] = useState('en'); // Default language set to English
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0); // Track loading progress
    const [loadingComplete, setLoadingComplete] = useState(false); // Track if loading is complete

    const games = [
        {
            name: {
                en: 'Roulette',
                he: 'רולטה',
            },
            staticImg: RouletteImage,
            gifImg: RouletteGif,
            description: {
                en: 'Test your luck with our interactive roulette game!',
                he: 'בדוק את מזלך עם משחק הרולטה האינטראקטיבי שלנו!',
            },
            route: '/roulette',
            buttonText: {
                en: 'Play Roulette',
                he: 'שחק ברולטה',
            },
        },
        {
            name: {
                en: 'Dice rolling',
                he: 'הטלת קוביות',
            },
            staticImg: DiceImage,
            gifImg: DiceGif,
            description: {
                en: 'Roll the dice and explore probabilities.',
                he: 'השלך את הקוביות וחקור הסתברויות.',
            },
            route: '/dice',
            buttonText: {
                en: 'Play Dice',
                he: 'שחק בקוביות',
            },
        },
        {
            name: {
                en: 'Ball Picking',
                he: 'בחירת כדורים',
            },
            staticImg: JarImage,
            gifImg: JarGif,
            description: {
                en: 'Pick balls and learn about random events.',
                he: 'בחר כדורים ולמד על אירועים אקראיים.',
            },
            route: '/ball-picking',
            buttonText: {
                en: 'Play Ball Picking',
                he: 'שחק בבחירת כדורים',
            },
        },
        {
            name: {
                en: 'Coin Flip',
                he: 'הטלת מטבע',
            },
            staticImg: CoinFlipImage,
            gifImg: CoinFlipGif,
            description: {
                en: 'Flip a coin and analyze the outcomes.',
                he: 'הפוך מטבע ונתח את התוצאות.',
            },
            route: '/coin-flip',
            buttonText: {
                en: 'Play Coin Flip',
                he: 'שחק בהפיכת מטבע',
            },
        },
    ];


    const handleLanguageSelection = (lang) => {
        setLanguage(lang);
    };

    const openSlideMenu = () => {
        setIsMenuOpen(true);
        document.getElementById('menu').style.width = '250px';
        document.getElementById('content').style.marginLeft = '250px';
    };

    const closeSlideMenu = () => {
        setIsMenuOpen(false);
        document.getElementById('menu').style.width = '0';
        document.getElementById('content').style.marginLeft = '0';
    };

    useEffect(() => {
        const simulateLoading = () => {
            setLoadingProgress(0); // Reset progress
            let progressInterval = setInterval(() => {
                setLoadingProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(progressInterval);
                        setLoadingComplete(true); // Mark loading as complete
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);
        };

        simulateLoading();

    }, []);

    return (
        <Router>
            <div className="app">
                {/* Full-screen loading screen */}
                {!loadingComplete && (
                    <div className="loading-screen">
                        <img id="loading-logo" src={Logo} alt="Loading Logo" />
                        <div className="loading-bar">
                            <div
                                className="loading-bar-progress"
                                style={{
                                    width: `${loadingProgress}%`,
                                    transform: `rotate(${loadingProgress * 3.6}deg)`,
                                }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Main content of the app */}
                {loadingComplete && (
                    <div id="main">
                        <div id="content">
                            <Link to="/">
                                <img id="main-logo" src={Logo} alt="Main Logo"/>
                            </Link>
                            {/* Language Selection Buttons */}
                            <div className="language-buttons">
                                <button
                                    onClick={() => handleLanguageSelection('en')}
                                    className={language === 'en' ? 'active' : ''}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => handleLanguageSelection('he')}
                                    className={language === 'he' ? 'active' : ''}
                                >
                                    עברית
                                </button>
                            </div>

                            {/* Button to open menu */}
                            <span className="slide">
                                <a href="#" onClick={openSlideMenu}>
                                    <FontAwesomeIcon icon={faBars}/>
                                </a>
                            </span>

                            {/* Side Menu */}
                            <div id="menu" className={`nav ${isMenuOpen ? 'open' : ''}`}>
                                <a href="#" className="close" onClick={closeSlideMenu}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </a>
                                <a href="#">{language === 'en' ? 'Home' : 'בית'}</a>
                                <a href="/">{language === 'en' ? 'Introduction' : 'הקדמה'}</a>
                                <a href="/roulette">{language === 'en' ? 'Roulette' : 'רולטה'}</a>
                                <a href="/contact">{language === 'en' ? 'Contact Us' : 'צור קשר'}</a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Logo & Loading Progress */}
                {loadingComplete && (
                    <>
                        <div id="loading-bar">
                            <div id="loading-bar-progress" style={{ width: `${loadingProgress}%` }}></div>
                        </div>
                    </>
                )}

                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <section className="intro">
                                    <header className="header">
                                        <h1>
                                            {language === 'en' ? 'Casino Math Lab' : 'ברוכים הבאים למעבדת מתמטיקה קזינו'}
                                        </h1>
                                    </header>
                                    <p>
                                        {language === 'en'
                                            ? 'Dive into the exciting world of probability and statistics through interactive casino games!'
                                            : 'צא אל תוך העולם המרתק של הסתברות וסטטיסטיקה דרך משחקי קזינו אינטראקטיביים!'}
                                    </p>
                                    <GameCards games={games} language={language} />
                                </section>
                            }
                        />

                        <Route path="/" element={<GameCards games={games} />} />
                        <Route path="/roulette" element={<Roulette language={language} />} />
                        <Route path="/contact" element={<p>{language === 'en' ? 'Contact page content' : 'תוכן דף צור קשר'}</p>} />
                        <Route path="/" element={<GameCards games={games} />} />
                        <Route path="/roulette" element={<Roulette />} />
                        <Route path="/dice" element={<p>Dice Game Component Placeholder</p>} />
                        <Route path="/ball-picking" element={<p>Ball Picking Game Component Placeholder</p>} />
                        <Route path="/coin-flip" element={<p>Coin Flip Game Component Placeholder</p>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
