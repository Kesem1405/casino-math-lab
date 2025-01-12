import React from "react";

const DiceComponent = ({ position, betAmount, winning, handleBet }) => (
    <div className={`dice ${winning ? "win" : ""}`} onClick={handleBet}>
        <div className="bet">Bet: ${betAmount}</div>
        <div className="number">Sum: {position}</div>
    </div>
);

export default DiceComponent;
