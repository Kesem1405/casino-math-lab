import React, { useState, useRef, useEffect } from "react";
import "./diceStyles.css";
import {
    GAME_PHASE_BETTING,
    GAME_PHASE_ROLLING,
    GAME_PHASE_RESULT,
    INTIAL_BETS,
} from "./Constants";

import DiceContainer from "./DiceContainer";
import Timer from "./Timer";
import Balance from "./Balance";
import WinningMessage from "./WinningMessage";
import RollButton from "./RollButton";

const DiceGame = () => {
    const [balance, setBalance] = useState(100);
    const [bets, setBets] = useState(INTIAL_BETS);
    const diceRef1 = useRef(null);
    const diceRef2 = useRef(null);
    const [timer, setTimer] = useState(10);
    const [winningSum, setWinningSum] = useState(null);
    const [gamePhase, setGamePhase] = useState(GAME_PHASE_BETTING);

    const handleBet = (sum) => {
        if (gamePhase === GAME_PHASE_BETTING && balance - 1 >= 0) {
            const updatedBets = [...bets];
            updatedBets[sum - 2] += 1; // Adjust index to start from 2
            setBalance((prevBalance) => prevBalance - 1);
            setBets(updatedBets);
        }
    };

    const handleRollEnd = (dice1, dice2) => {
        const sum = dice1 + dice2;
        setWinningSum(sum);
        const winningAmount = bets[sum - 2] * 2; // Example payout: double the bet
        setBalance((prevBalance) => prevBalance + winningAmount);
        setGamePhase(GAME_PHASE_RESULT);
        restartGame();
    };

    useEffect(() => {
        if (timer > 0 && gamePhase === GAME_PHASE_BETTING && balance > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timer, gamePhase]);

    const restartGame = () => {
        setTimeout(() => {
            setBets(INTIAL_BETS);
            setWinningSum(null);
            setTimer(10);
            setGamePhase(GAME_PHASE_BETTING);
        }, 5000);
    };

    useEffect(() => {
        if (timer === 0 && gamePhase === GAME_PHASE_BETTING && balance >= 0) {
            setGamePhase(GAME_PHASE_ROLLING);

            const dice1Value = diceRef1.current.rollDice();
            const dice2Value = diceRef2.current.rollDice();

            setTimeout(() => {
                handleRollEnd(dice1Value, dice2Value);
            }, 2000);
        }
    }, [timer, balance, bets, gamePhase]);

    return (
        <div className="dice-game">
            <h1>Dice Betting Game</h1>
            <Balance balance={balance} />
            <Timer timer={timer} gamePhase={gamePhase} />
            <DiceContainer
                bets={bets}
                winningSum={winningSum}
                handleBet={handleBet}
            />
            <RollButton
                diceRef1={diceRef1}
                diceRef2={diceRef2}
                balance={balance}
                handleRollEnd={handleRollEnd}
            />
            {winningSum && <WinningMessage winningSum={winningSum} />}
            {balance <= 0 && (
                <div className="show-dice">Please recharge your balance</div>
            )}
        </div>
    );
};

export default DiceGame;
