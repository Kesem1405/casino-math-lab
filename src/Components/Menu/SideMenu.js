import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/App.css";

const SideMenu = ({ language, user, handleLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);


            if (isMenuOpen) {
                    document.getElementById("main").style.width = "0";
                document.getElementById("content").style.marginLeft = "0";
            } else {
                document.getElementById("main").style.width = "250px";
                document.getElementById("content").style.marginLeft = "250px";
            }
    };

    return (
        <div>
            {/* Menu Button to open the side menu */}
            <span className="slide">
                <a href="#" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </a>
            </span>

            {/* Side Menu */}
            <div className={`nav ${isMenuOpen ? "open" : ""}`}>
                <a href="#" className="close" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </a>
                <a href="/">{language === "en" ? "Home" : "בית"}</a>
                <a href="/introduction">{language === "en" ? "Introduction" : "הקדמה"}</a>
                {user ? (
                    <a href="/roulette">{language === "en" ? "Roulette" : "רולטה"}</a>
                ) : null}
                <a href="/contact">{language === "en" ? "Contact Us" : "צור קשר"}</a>
                {user ? (
                    <a href="#" onClick={handleLogout}>
                        {language === "en" ? "Logout" : "התנתקות"}
                    </a>
                ) : (
                    <>
                        <a href="/login">{language === "en" ? "Login" : "כניסה"}</a>
                        <a href="/register">{language === "en" ? "Register" : "הרשמה"}</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default SideMenu;
