import React from "react";

const WinningMessage = ({ winningNumber }) => (
    <div className="winning-message">
        {winningNumber === 0 || winningNumber > 6
            ? "No Winner"
            : `Winner: ${winningNumber}`}
    </div>
);

export default WinningMessage;
