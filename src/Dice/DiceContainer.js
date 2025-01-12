import React from "react";
import { DICE_SUMS } from "./Constants";
import DiceComponent from "./DiceComponent";

const DiceContainer = ({ bets, winningSum, handleBet }) => (
    <div className="dice-container">
        {DICE_SUMS.map((sum) => (
            <DiceComponent
                key={sum}
                position={sum}
                betAmount={bets[sum - 2]} // Adjust index to start from 2
                winning={winningSum === sum}
                handleBet={() => handleBet(sum)}
            />
        ))}
    </div>
);

export default DiceContainer;
