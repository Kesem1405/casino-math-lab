import React, { useState, useEffect } from "react";
import "../../Styles/JarColorPick.css";

const JarColorPick = () => {
    const ballColors = ["red", "blue", "yellow"];
    const [balls, setBalls] = useState(ballColors);
    const [userBalance, setUserBalance] = useState(100);
    const [betAmount, setBetAmount] = useState(10);
    const [betColor, setBetColor] = useState([]);
    const [rounds, setRounds] = useState(1);
    const [result, setResult] = useState("");
    const [isShuffling, setIsShuffling] = useState(false);
    const [ballPositions, setBallPositions] = useState([]);
    const [winningBalls, setWinningBalls] = useState([]);
    const [isCooldown, setIsCooldown] = useState(false);

    useEffect(() => {
        generateBallPositions();
    }, [balls, rounds]);

    const generateBallPositions = () => {
        const totalBalls = rounds === 2 ? [...ballColors, ...ballColors] : ballColors;
        const positions = totalBalls.map((color, index) => ({
            id: index,
            color,
            bottom: `${Math.random() * 200}px`,
            left: `${Math.random() * 150}px`,
            isWinning: false,
            isAnimatingOut: false,
        }));
        setBallPositions(positions);
    };

    const shuffleAndSelect = (roundNumber) => {
        const availableBalls = ballPositions.filter((ball) => !ball.isWinning);
        const selectedBall =
            availableBalls[Math.floor(Math.random() * availableBalls.length)];

        setBallPositions((prev) =>
            prev.map((ball) =>
                ball.id === selectedBall.id
                    ? { ...ball, isWinning: true, isAnimatingOut: true }
                    : ball
            )
        );

        setWinningBalls((prev) => [
            ...prev,
            { ...selectedBall, round: roundNumber },
        ]);

        return selectedBall;
    };

    const placeBet = () => {
        if (!validateBet()) return;

        setUserBalance((prevBalance) => prevBalance - betAmount);
        setIsShuffling(true);

        const newWinningBalls = [];
        setTimeout(() => {
            const firstRoundBall = shuffleAndSelect(1);
            newWinningBalls.push(firstRoundBall);

            if (rounds === 2) {
                setTimeout(() => {
                    const secondRoundBall = shuffleAndSelect(2);
                    newWinningBalls.push(secondRoundBall);

                    handleBetResult(newWinningBalls);
                    endRound();
                }, 2000);
            } else {
                handleBetResult(newWinningBalls);
                endRound();
            }
        }, 2000);
    };

    const validateBet = () => {
        if (betAmount > userBalance) {
            setResult("Insufficient balance!");
            return false;
        }

        if (rounds === 2 && betColor.length < 2) {
            setResult("Please select colors for both rounds.");
            return false;
        }

        if (rounds === 1 && betColor.length < 1) {
            setResult("Please select a color for the round.");
            return false;
        }

        return true;
    };

    const handleBetResult = (winningBalls) => {
        const winningColors = winningBalls.map((ball) => ball.color);

        const won =
            (rounds === 1 && winningColors[0] === betColor[0]) ||
            (rounds === 2 &&
                winningColors[0] === betColor[0] &&
                winningColors[1] === betColor[1]);

        const payout = won ? betAmount * (rounds === 1 ? 2 : 7) : 0;

        setUserBalance((prevBalance) => prevBalance + payout);

        setResult(
            won
                ? `You won! Payout: $${payout}`
                : `You lost. Result: ${winningColors.join(", ")}`
        );
    };

    const endRound = () => {
        setIsShuffling(false);
        setIsCooldown(true);
        setBetColor([]);
        setTimeout(() => {
            setIsCooldown(false);
            setWinningBalls([]);
            generateBallPositions();
            setResult("");
        }, 3000);
    };

    const handleColorSelection = (color, round) => {
        if (rounds === 1) {
            setBetColor([color]);
        } else if (rounds === 2) {
            const updatedBetColor = [...betColor];
            updatedBetColor[round - 1] = color;
            setBetColor(updatedBetColor);
        }
    };

    return (
        <div className="jar-color-pick">
            <h1>Jar Color Pick Game</h1>
            <div className="jar">
                <div className="lid"></div>
                <div className="glass">
                    {ballPositions.map((ball) => (
                        <div
                            key={ball.id}
                            className={`ball ${ball.color} ${
                                isShuffling && !ball.isWinning ? "shuffle" : ""
                            } ${ball.isAnimatingOut ? "slide-out-blurred-top" : ""}`}
                            style={{
                                bottom: ball.bottom,
                                left: ball.left,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="winning-balls">
                {winningBalls.map((ball, index) => (
                    <div key={index} className={`winning-ball ${ball.color}`}>
                        <span className="round-number">{ball.round}</span>
                    </div>
                ))}
            </div>
            <div className="betting-table-jar">
                <label>
                    Bet Amount:
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        min="1"
                        max={userBalance}
                    />
                </label>
                <div className="rounds-selection">
                    <button
                        className={rounds === 1 ? "active" : ""}
                        onClick={() => setRounds(1)}
                        disabled={isShuffling || isCooldown}
                    >
                        1 Round
                    </button>
                    <button
                        className={rounds === 2 ? "active" : ""}
                        onClick={() => setRounds(2)}
                        disabled={isShuffling || isCooldown}
                    >
                        2 Rounds
                    </button>
                </div>
                <div className="color-buttons">
                    <div className="button-row">
                        <span>Round 1 bet:</span>
                        {ballColors.map((color) => (
                            <button
                                key={color}
                                className={`bet-button ${color} ${
                                    betColor[0] === color ? "selected" : ""
                                }`}
                                onClick={() => handleColorSelection(color, 1)}
                                disabled={isShuffling || isCooldown}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                    {rounds === 2 && (
                        <div className="button-row">
                            <span>Round 2 bet:</span>
                            {ballColors.map((color) => (
                                <button
                                    key={color}
                                    className={`bet-button ${color} ${
                                        betColor[1] === color ? "selected" : ""
                                    }`}
                                    onClick={() => handleColorSelection(color, 2)}
                                    disabled={isShuffling || isCooldown}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button
                className="shuffle-button"
                onClick={placeBet}
                disabled={isShuffling || isCooldown || betColor.length < rounds}
            >
                Shuffle
            </button>
            <div className="result">{result}</div>
            <div>User Balance: ${userBalance}</div>
        </div>
    );
};

export default JarColorPick;
