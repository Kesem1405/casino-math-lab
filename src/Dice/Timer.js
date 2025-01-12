import React from "react";
import { GAME_PHASE_BETTING } from "./Constants";
const Timer = ({ timer, gamePhase }) => (
    <div className="timer">
        {gamePhase === GAME_PHASE_BETTING
            ? `Time Remaining: ${timer}`
            : `${gamePhase}...`}
    </div>
);

export default Timer;
