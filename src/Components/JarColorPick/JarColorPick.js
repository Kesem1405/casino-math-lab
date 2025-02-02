import React, { useState, useEffect } from "react";
import "../../Styles/JarColorPick.css";
import { ChipContainer } from '../Roulette/RouletteTableHelpers/Chip/ChipContainer';
import JarColorPickStudyMode from "./JarColorPickStudyMode";
import { JarColorPickLanguageData } from "../../Constants/Language/LanguageData";

const JarColorPick = ({ language, user, balance, updateBalance }) => {
    const [isStudyMode, setIsStudyMode] = useState(false);
    const ballColors = ["red", "blue", "yellow"];
    const [balls] = useState(ballColors);
    const [betColor, setBetColor] = useState([]);
    const [rounds, setRounds] = useState(1);
    const [result, setResult] = useState("");
    const [isShuffling, setIsShuffling] = useState(false);
    const [ballPositions, setBallPositions] = useState([]);
    const [winningBalls, setWinningBalls] = useState([]);
    const [isCooldown, setIsCooldown] = useState(false);
    const [selectedChipValue, setSelectedChipValue] = useState(1); // Track the selected chip value
    const [withReplacement, setWithReplacement] = useState(true);
    const LanguageData = JarColorPickLanguageData[language];

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

    const shuffleAndSelect = (roundNumber, remainingBalls) => {
        const availableBalls = remainingBalls.filter((ball) => !ball.isWinning);
        const selectedBall = availableBalls[Math.floor(Math.random() * availableBalls.length)];

        setBallPositions((prev) =>
            prev.map((ball) =>
                ball.id === selectedBall.id
                    ? { ...ball, isWinning: true, isAnimatingOut: true }
                    : ball
            )
        );

        setWinningBalls((prev) => [
            ...prev,
            { ...selectedBall, round: roundNumber }
        ]);

        if (withReplacement) {
            setTimeout(() => {
                setBallPositions((prev) =>
                    prev.map((ball) =>
                        ball.id === selectedBall.id
                            ? { ...ball, isWinning: false, isAnimatingOut: false }
                            : ball
                    )
                );
            }, 1500);
        }

        return selectedBall;
    };

    const placeBet = () => {
        if (!validateBet()) return;

        updateBalance((prevBalance) => prevBalance - selectedChipValue);
        setIsShuffling(true);

        let newWinningBalls = [];
        let remainingBalls = [...ballPositions];

        setTimeout(() => {
            const firstRoundBall = shuffleAndSelect(1, remainingBalls);
            newWinningBalls.push(firstRoundBall);

            if (!withReplacement) {
                remainingBalls = remainingBalls.filter(ball => ball.id !== firstRoundBall.id);
            } else {
                setBallPositions((prev) =>
                    prev.map(ball =>
                        ball.id === firstRoundBall.id
                            ? { ...ball, isWinning: false, isAnimatingOut: false }
                            : ball
                    )
                );
            }

            if (rounds === 2) {
                setTimeout(() => {
                    const secondRoundBall = shuffleAndSelect(2, remainingBalls);
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
        if (selectedChipValue > balance) {
            setResult(LanguageData.insufficientBalance);
            return false;
        }

        if (rounds === 2 && betColor.length < 2) {
            setResult(LanguageData.selectColors);
            return false;
        }

        if (rounds === 1 && betColor.length < 1) {
            setResult(LanguageData.selectColor);
            return false;
        }

        return true;
    };

    const handleBetResult = (winningBalls) => {
        const winningColors = winningBalls.map((ball) => ball.color);

        const won =
            (rounds === 1 && winningColors[0] === betColor[0]) ||
            (rounds === 2 && winningColors[0] === betColor[0] && winningColors[1] === betColor[1]);

        let payout = 0;
        if (won) {
            if (rounds === 1) {
                payout = selectedChipValue * 3;
            } else {
                payout = withReplacement ? selectedChipValue * 9 : selectedChipValue * 15;
            }
        }

        if (won) {
            updateBalance((prevBalance) => prevBalance + payout);
            setResult(`${LanguageData.wonMessage} $${payout}`);
        } else {
            setResult(`${LanguageData.lostMessage} ${winningColors.join(", ")}`);
        }
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
        if (isShuffling) return;

        let updatedBetColor = [...betColor];

        if (rounds === 1) {
            updatedBetColor = [color];
        } else if (rounds === 2) {
            if (updatedBetColor[round - 1] === color) {
                updatedBetColor[round - 1] = "";
            } else {
                updatedBetColor[round - 1] = color;
            }
        }

        setBetColor(updatedBetColor);
    };

    return (
        <div className="jar-color-pick">
            <h1>{LanguageData.gameTitle}</h1>

            {/* Study Mode Button */}
            <button style={{ marginBottom: "50px" }}
                    className="modalButton"
                    onClick={() => setIsStudyMode(!isStudyMode)}
            >
                {isStudyMode ? LanguageData.exitStudyModeButton : LanguageData.enterStudyModeButton}
            </button>

            {/* Study Mode Component */}
            {isStudyMode ? (
                <JarColorPickStudyMode language={language} user={user} balance={balance}
                                       updateBalance={updateBalance} />
            ) : (
                <div>
                    <div className="jar">
                        <div className="lid"></div>
                        <div className="glass">
                            {ballPositions.map((ball) => (
                                <div
                                    key={ball.id}
                                    className={`ball ${ball.color} ${isShuffling && !ball.isWinning ? "shuffle" : ""} ${ball.isAnimatingOut ? "slide-out-blurred-top" : ""}`}
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
                    <ChipContainer onChipChange={setSelectedChipValue} />
                    <div className="betting-table">
                        <label>
                            {LanguageData.betAmount}
                            <input
                                type="number"
                                value={selectedChipValue}
                                onChange={(e) => setSelectedChipValue(Number(e.target.value))}
                                min="1"
                                max={balance}
                            />
                        </label>

                        <div className="rounds-selection">
                            <button
                                className={rounds === 1 ? "active" : ""}
                                onClick={() => setRounds(1)}
                                disabled={isShuffling}
                            >
                                {LanguageData.oneRound}
                            </button>
                            <button
                                className={rounds === 2 ? "active" : ""}
                                onClick={() => setRounds(2)}
                                disabled={isShuffling}
                            >
                                {LanguageData.twoRounds}
                            </button>
                            {rounds === 2 && (
                                <div className="replacement-selection">
                                    <button className={withReplacement ? "active" : ""} onClick={() => setWithReplacement(true)}>
                                        {LanguageData.withReplacement}
                                    </button>
                                    <button className={!withReplacement ? "active" : ""} onClick={() => setWithReplacement(false)}>
                                        {LanguageData.withoutReplacement}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="color-buttons">
                            <div className="button-row">
                                <span>{LanguageData.round1Bet}</span>
                                {ballColors.map((color) => (
                                    <button
                                        key={color}
                                        className={`bet-button ${color} ${betColor[0] === color ? "selected" : ""}`}
                                        onClick={() => handleColorSelection(color, 1)}
                                        disabled={isShuffling || isCooldown}
                                    >
                                        {LanguageData.colorButtons[color]}
                                    </button>
                                ))}
                            </div>
                            {rounds === 2 && (
                                <div className="button-row">
                                    <span>{LanguageData.round2Bet}</span>
                                    {ballColors.map((color) => (
                                        <button
                                            key={color}
                                            className={`bet-button ${color} ${betColor[1] === color ? "selected" : ""}`}
                                            onClick={() => handleColorSelection(color, 2)}
                                            disabled={isShuffling || isCooldown}
                                        >
                                            {LanguageData.colorButtons[color]}
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
                        {LanguageData.shuffleButton}
                    </button>
                    <div className="result">{result}</div>
                </div>
            )}
        </div>
    );
};

export default JarColorPick;
