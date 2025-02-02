import React from "react";
import '../../Styles/App.css';

const LanguageSelector = ({ language, onSelectLanguage }) => {
    return (
        <div className="language-selection">
            <button onClick={() => onSelectLanguage("en")} className={language === "en" ? "active" : ""}>EN</button>
            <button onClick={() => onSelectLanguage("he")} className={language === "he" ? "active" : ""}>HE</button>
        </div>
    );
};

export default LanguageSelector;
