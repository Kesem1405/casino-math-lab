import React, { useRef } from "react";
import Dice from "react-dice-roll";

const RollButton = ({ balance, handleRollEnd }) => {
    const diceRef1 = useRef(null);
    const diceRef2 = useRef(null);

    const rollDice = () => {
        if (balance > 0) {
            const dice1Value = diceRef1.current.rollDice();
            const dice2Value = diceRef2.current.rollDice();

            setTimeout(() => {
                const sum = dice1Value + dice2Value;
                handleRollEnd(sum);
            }, 2000); // Match rolling time
        }
    };

    return (
        <div className="show-dice">
            <Dice ref={diceRef1} sides={6} rollingTime={2000} />
            <Dice ref={diceRef2} sides={6} rollingTime={2000} />
            <button onClick={rollDice}>Roll Dice</button>
        </div>
    );
};

export default RollButton;
