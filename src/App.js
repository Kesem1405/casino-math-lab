import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Roulette from "./Components/Roulette/Roulette";
import Dice from "./Components/Dice/Dice";
import "./Styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Media/images/Logo.png";
import GameCards from "./Components/MenuGameCards/GameCards";
import "bootstrap/dist/css/bootstrap.min.css";
import RouletteImage from "./Media/images/RouletteImage.jpg";
import RouletteGif from "./Media/gifs/RouletteGif.gif";
import DiceImage from "./Media/images/DiceImage.jpg";
import DiceGif from "./Media/gifs/DiceGif.gif";
import JarGif from "./Media/gifs/jar.gif";
import JarImage from "./Media/images/jar.jpg";
import CoinFlipImage from "./Media/images/CoinFlip.jpg";
import CoinFlipGif from "./Media/gifs/CoinFlipGif.gif";
import Login from "./Components/Users/Authentication/Login";
import Register from "./Components/Users/Authentication/Register";
import {languageDataAuthentication} from "./Language/LanguageData";
import UserMenu from "./Components/Users/Authentication/UserMenu";
import useBalance from "./Components/Backend/useBalance";
import AccountSettings from "./Components/Users/AccountHandler/AccountSettings";
import Profile from "./Components/Users/AccountHandler/Profile";
import SearchResults from "./Components/Search/SearchResults";
import SearchBar from "./Components/Search/SearchBar";


const App = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("selectedLanguage") || "en";
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const { balance, updateBalance } = useBalance(user?.balance || 0, user?.username);


    const games = [
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

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify({ ...user, balance }));
        }
    }, [balance, user]);


    useEffect(() => {
        if (user) {
            const fetchBalance = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/get-balance?username=${user.username}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch balance');
                    }
                    const data = await response.json();
                    updateBalance(data.balance);
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            };

            fetchBalance();
        }
    }, [user]);

    const handleLanguageSelection = (lang) => {
        setLanguage(lang);
        localStorage.setItem("selectedLanguage", lang);
    };

    const openSlideMenu = () => {
        setIsMenuOpen(true);
        document.getElementById("menu").style.width = "250px";
        document.getElementById("content").style.marginLeft = "250px";
    };

    const closeSlideMenu = () => {
        setIsMenuOpen(false);
        document.getElementById("menu").style.width = "0";
        document.getElementById("content").style.marginLeft = "0";
    };

    const handleLoginSuccess = (userData) => {
        console.log("User data received:", userData); // Log user data
        if (userData && userData.balance !== undefined) {
            setUser(userData);
            updateBalance(userData.balance); // Set balance from backend
            localStorage.setItem("user", JSON.stringify(userData));
            setShowLogin(false);
        } else {
            console.error("Balance not found in user data");
        }
    };

    const handleRegisterSuccess = (userData) => {
        setUser(userData);
        updateBalance(userData.balance); // Set balance from backend
        localStorage.setItem("user", JSON.stringify(userData));
        setShowRegister(false);
        console.log("Balance after register:", userData.balance); // Log the balance
    };

    const handleUpdate = (updatedUser) => {
        setUser(updatedUser); // Update the user state in the parent component
    };

    const handleLogout = () => {
        setUser(null);
        updateBalance(null); // Reset balance on logout
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const simulateLoading = () => {
            setLoadingProgress(0);
            let progressInterval = setInterval(() => {
                setLoadingProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(progressInterval);
                        setLoadingComplete(true);
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
                                    onClick={() => handleLanguageSelection("en")}
                                    className={language === "en" ? "active" : ""}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => handleLanguageSelection("he")}
                                    className={language === "he" ? "active" : ""}
                                >
                                    עברית
                                </button>
                            </div>

                            {/* Login/Register or User Info */}
                            <div className="auth-buttons">
                                {user ? (
                                    <>
                                        <div className="balance">
                                            {language === "en" ? `Balance: $${balance}` : `יתרה: $${balance}`}
                                        </div>
                                        <UserMenu user={user} onLogout={handleLogout}/>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login">
                                            <button>
                                                {language === "en" ? "Login" : "כניסה"}
                                            </button>
                                        </Link>
                                        <Link to="/register">
                                            <button>
                                                {language === "en" ? "Register" : "הרשמה"}
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            {/* Button to open menu */}
                            <span className="slide">
                                <a href="#" onClick={openSlideMenu}>
                                    <FontAwesomeIcon icon={faBars}/>
                                </a>
                            </span>

                            {/* Side Menu */}
                            <div id="menu" className={`nav ${isMenuOpen ? "open" : ""}`}>
                                <a href="#" className="close" onClick={closeSlideMenu}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </a>
                                <a href="/">{language === "en" ? "Home" : "בית"}</a>
                                <a href="/introduction">
                                    {language === "en" ? "Introduction" : "הקדמה"}
                                </a>
                                {user ? (
                                    <>
                                        <a href="/roulette">{language === "en" ? "Roulette" : "רולטה"}</a>
                                        <a href="/dice">{language === "en" ? "Dice" : "הטלת קוביה"}</a>
                                    </>
                                ) : (
                                    <span className="disabled-link">
                                        {language === "en" ? "Roulette" : "רולטה"}
                                    </span>
                                )}
                                <a href="/contact">
                                    {language === "en" ? "Contact Us" : "צור קשר"}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                <SearchBar />
                {/* Logo & Loading Progress */}
                {loadingComplete && (
                    <>
                        <div id="loading-bar">
                            <div
                                id="loading-bar-progress"
                                style={{width: `${loadingProgress}%`}}
                            ></div>
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
                                            {language === "en"
                                                ? "Casino Math Lab"
                                                : "ברוכים הבאים למעבדת מתמטיקה קזינו"}
                                        </h1>
                                    </header>
                                    <p>
                                        {language === "en"
                                            ? "Dive into the exciting world of probability and statistics through interactive casino games!"
                                            : "צא אל תוך העולם המרתק של הסתברות וסטטיסטיקה דרך משחקי קזינו אינטראקטיביים!"}
                                    </p>
                                    <GameCards games={games} language={language} user={user} />
                                </section>
                            }
                        />

                        <Route path="/" element={<GameCards games={games} user={user} />} />
                        <Route path="/roulette" element={user ? <Roulette language={language} user={user} balance={balance} updateBalance={updateBalance}/> : <Navigate to="/login" />} />
                        <Route path="/dice" element={user ? <Dice language={language} user={user}  balance={balance} updateBalance={updateBalance} /> : <Navigate to="/login" />} />
                        <Route
                            path="/contact"
                            element={
                                <p>{language === "en" ? "Contact page content" : "תוכן דף צור קשר"}</p>
                            }
                        />
                        <Route path="/ball-picking" element={user ? <p>Ball Picking Game Component Placeholder</p> : <Navigate to="/login" />} />
                        <Route path="/coin-flip" element={user ? <p>Coin Flip Game Component Placeholder</p> : <Navigate to="/login" />} />

                        <Route path="/login"
                               element={<Login language={language} languageData={languageDataAuthentication} onLogin={handleLoginSuccess} />} />
                        <Route path="/register"
                               element={<Register language={language} languageData={languageDataAuthentication} onRegister={handleRegisterSuccess} />} />
                        <Route path="/account-settings" element={<AccountSettings user={user}  onUpdate={handleUpdate} />} />
                        <Route path="/profile/:username" element={<Profile />} />
                        <Route path="/search-results" element={<SearchResults />} />
                    </Routes>
                </main>

                {/* Login Modal */}
                {showLogin && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <Login onLogin={handleLoginSuccess} onClose={() => setShowLogin(false)} />
                        </div>
                    </div>
                )}

                {/* Register Modal */}
                {showRegister && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <Register
                                onRegister={handleRegisterSuccess}
                                onClose={() => setShowRegister(false)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

export default App;