import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Roulette from './Roulette/Roulette';
import Dice from './Dice';
import './App.css';

const App = () => {
    const [language, setLanguage] = useState(null);

    const handleLanguageSelection = (lang) => {
        setLanguage(lang);
    };

    if (language === null) {
        return (
            <div className="language-selection">
                <button onClick={() => handleLanguageSelection('en')}>English</button>
                <button onClick={() => handleLanguageSelection('he')}>עברית</button>
            </div>
        );
    }

    return (
        <Router>
            <div className="app">
                <aside className="sidebar">
                    <h2>{language === 'en' ? 'Casino Math Lab' : 'מעבדת מתמטיקה קזינו'}</h2>
                    <ul>
                        <li><Link to="/">{language === 'en' ? 'Introduction' : 'הקדמה'}</Link></li>
                        <li><Link to="/roulette">{language === 'en' ? 'Roulette' : 'רולטה'}</Link></li>
                        <li><Link to="/contact">{language === 'en' ? 'Contact Us' : 'צור קשר'}</Link></li>
                        <li><Link to="/dice">{language === 'en' ? 'Dice rolling' : 'הטלת קוביה'}</Link></li>

                    </ul>
                </aside>

                <main className="main-content">
                    <Routes>
                    <Route path="/" element={
                            <section className="intro">
                                <header className="header">
                                    <h1>{language === 'en' ? 'Welcome to Casino Math Lab' : 'ברוכים הבאים למעבדת מתמטיקה קזינו'}</h1>
                                </header>
                                <p>
                                    {language === 'en'
                                        ? 'Dive into the exciting world of probability and statistics through interactive casino games!'
                                        : 'צא אל תוך העולם המרתק של הסתברות וסטטיסטיקה דרך משחקי קזינו אינטראקטיביים!'}
                                </p>
                            </section>
                        } />
                        <Route path="/roulette" element={<Roulette language={language} />} />
                        <Route path="/contact" element={<p>{language === 'en' ? 'Contact page content' : 'תוכן דף צור קשר'}</p>} />
                        <Route path="/dice" element={<Dice language={language} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
