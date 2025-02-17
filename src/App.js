import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import "./Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import Roulette from "./Components/Roulette/Roulette";
import Dice from "./Components/Dice/Dice";
import JarColorPick from "./Components/JarColorPick/JarColorPick";
import GameCards from "./Components/MenuGameCards/GameCards";
import Login from "./Components/Users/Authentication/Login";
import Register from "./Components/Users/Authentication/Register";
import UserMenu from "./Components/Users/Authentication/UserMenu";
import useBalance from "./Components/Backend/useBalance";
import SearchBar from "./Components/Search/SearchBar";
import SideMenu from "./Components/Menu/SideMenu";
import UserBalance from "./Components/Users/UserBalance/UserBalance";
import LoadingScreen from "./Components/Common/LoadingScreen";
import LanguageSelector from "./Constants/Language/LanguageSelector";
import ChatContainer from "./Components/Users/Chat/ChatContainer";
import { languageDataAuthentication } from "./Constants/Language/LanguageData";

import Logo from "./Media/images/Logo.png";
import { gamesData } from "./Constants/Constants";
import Notifications from "./Components/Users/AccountHandler/Notifications";
import Profile from "./Components/Users/AccountHandler/Profile";
import AccountSettings from "./Components/Users/AccountHandler/AccountSettings";
import SearchResults from "./Components/Search/SearchResults";

const App = () => {
    const [language, setLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const { balance, updateBalance } = useBalance(user?.balance || 0, user?.username || "");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        if (user?.username) { // Safe check for user and username
            const fetchBalance = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/users/get-balance?username=${user.username}`);
                    if (!response.ok) throw new Error("Failed to fetch balance");
                    const data = await response.json();
                    updateBalance(data.balance);
                } catch (error) {
                    console.error("Error fetching balance:", error);
                    setSessionExpired(true);
                }
            };
            fetchBalance();
        }
    }, [user]); // Only run the effect if user is not null

    useEffect(() => {
        const simulateLoading = () => {
            setTimeout(() => setLoadingComplete(true), 1000);
        };
        simulateLoading();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleLanguageSelection = (lang) => {
        setLanguage(lang);
        localStorage.setItem("selectedLanguage", lang);
    };

    const handleLoginSuccess = (userData) => {
        if (userData && userData.balance !== undefined) {
            setUser(userData);
            updateBalance(userData.balance);
            localStorage.setItem("authToken",userData.token)
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            console.error("Balance not found in user data");
        }
    };

    const handleLogout = () => {
        setUser(null);
        updateBalance(0);
        localStorage.removeItem("user");
    };

    return (
        <Router>
            <div className="app">
                {!loadingComplete ? (
                    <LoadingScreen logo={Logo} />
                ) : (
                    <div id="main">
                        <div id="content">
                            <Link to="/">
                                <img className="main-logo" src={Logo} alt="Main Logo" />
                            </Link>

                            <LanguageSelector language={language} onSelectLanguage={handleLanguageSelection} />

                            <div className="auth-buttons">
                                {user ? (
                                    <>
                                        <UserBalance balance={balance} language={language} />
                                        <UserMenu user={user} onLogout={handleLogout} />
                                    </>
                                ) : (
                                    <>
                                        {sessionExpired ? (
                                            <p>{language === "en" ? "Your session has expired. Please log in again." : "הסשן שלך פג. אנא התחבר שוב."}</p>
                                        ) : (
                                            <>
                                                <Link to="/login">
                                                    <button>{language === "en" ? "Login" : "כניסה"}</button>
                                                </Link>
                                                <Link to="/register">
                                                    <button>{language === "en" ? "Register" : "הרשמה"}</button>
                                                </Link>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <SideMenu language={language} user={user} handleLogout={handleLogout} />

                            <SearchBar language={language} />

                            {user && <ChatContainer senderUsername={user.username} isMenuOpen={isMenuOpen} />}
                        </div>
                    </div>
                )}

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<GameCards games={gamesData} language={language} user={user} />} />
                        <Route path="/roulette" element={user ? <Roulette language={language} user={user} balance={balance} updateBalance={updateBalance} /> : <Navigate to="/login" />} />
                        <Route path="/dice" element={user ? <Dice language={language} user={user} balance={balance} updateBalance={updateBalance} /> : <Navigate to="/login" />} />
                        <Route path="/ball-picking" element={user ? <JarColorPick language={language} user={user} balance={balance} updateBalance={updateBalance} /> : <Navigate to="/login" />} />
                        <Route path="/coin-flip" element={user ? <p>Coin Flip Game Component Placeholder</p> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login language={language} languageData={languageDataAuthentication} onLogin={handleLoginSuccess} />} />
                        <Route path="/register" element={<Register language={language} languageData={languageDataAuthentication} />} />
                        <Route path="/profile/:username" element={user ? <Profile language={language} currentUserUsername={user.username} /> : <Navigate to="/login" />} />
                        <Route path="/account-settings" element={<AccountSettings user={user} onUpdate={null} />} />
                        <Route path="/search-results" element={<SearchResults language={language} currentUserUsername={user?.username} />} />
                        <Route path="/notifications" element={<Notifications currentUserUsername={user?.username}/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
