import React from "react";
import '../../../Styles/App.css';

const UserBalance = ({ balance, language }) => {
    return (
        <div className="balance">
            <span>{language === "en" ? "Balance: $" : "יתרה: $"}</span>
            <strong>{balance}</strong>
        </div>
    );
};

export default UserBalance;