import React, { useEffect, useRef, useState } from 'react';
import { RouletteTable } from './Components/RouletteTable';
import RouletteWheel from "./Components/RouletteWheel/RouletteWheel";
import '../../Styles/RouletteTable.css';
import '../../Styles/RouletteWheel.css';
import { getRandomRouletteWinBet } from './Helpers/getRandomRouletteWinBet';
import whiteChip from '../../Media/images/chips/white-chip.png';
import blueChip from '../../Media/images/chips/blue-chip.png';
import blackChip from '../../Media/images/chips/black-chip.png';
import cyanChip from '../../Media/images/chips/cyan-chip.png';
import { WinningModal } from "./Modals/WinningModal/WinningModal";
import Modal from "react-modal";
import { RouletteGameInfoModal } from "./Modals/InfoModal/RouletteGameInfoModal";
import { WinningProbabilityModal } from "./Modals/ProbabilityModal/WinningProbabilityModal";
import '../../Styles/Chip.css';
import '../../Styles/Roulette.css';
import RouletteStudyMode from './StudyMode/RouletteStudyMode';
import {
    calculateBetProbability,
    calculateTotalWinningProbability,
    calculateWinnings,
    getBetType
} from './Hooks/Logic/calculateWinnings';
import WheelSpinSound from '../../Media/Sounds/WheelSpinSound.mp3';
import { LastWinsTable } from './RouletteTableHelpers/LastWinsTable/LastWinsTable';
import useBalance from "../../Components/Backend/useBalance";
import {RouletteLanguageData} from "../../Language/LanguageData";

Modal.setAppElement("#root");

const API = {
    getRandomBet: async () => {
        return getRandomRouletteWinBet();
    },
};

const chipsMap = {
    whiteChip: {
        icon: whiteChip,
        value: 1,
    },
    blueChip: {
        icon: blueChip,
        value: 10,
    },
    blackChip: {
        icon: blackChip,
        value: 100,
    },
    cyanChip: {
        icon: cyanChip,
        value: 500,
    },
};

const calcTotalBet = (bets) => {
    return Object.entries(bets).reduce((acc, [, value]) => acc + value.number, 0);
};

const Roulette = ({ language, user , balance, updateBalance}) => {
    const [bets, setBets] = useState({});
    const [isDebug] = useState(false);
    const [activeChip, setActiveChip] = useState(Object.keys(chipsMap)[0]);
    const [shouldShowData] = useState(false);
    const [betHistory, setBetHistory] = useState([]);
    const [currentRoundBet, setCurrentRoundBet] = useState(0);
    const [winningNumber, setWinningNumber] = useState(null);
    const [roundWinnings, setRoundWinnings] = useState(null);
    const [showWinningModal, setShowWinningModal] = useState(false);
    const [showWheelModal, setShowWheelModal] = useState(false);
    const [winningAmount, setWinningAmount] = useState(0);
    const [lastWins, setLastWins] = useState([]);
    const [isRouletteWheelSpinning, setIsRouletteWheelSpinning] = useState(false);
    const [rouletteWheelStart, setRouletteWheelStart] = useState(false);
    const [rouletteWheelBet, setRouletteWheelBet] = useState('-1');
    const wheelSpinSound = useRef(new Audio(WheelSpinSound));
    const [showTotalWinningProbabilityModal, setShowTotalWinningProbabilityModal] = useState(false);
    const [showGameInfoModal, setShowGameInfoModal] = useState(false);
    const [isStudyMode, setIsStudyMode] = useState(false);

    const languageData = RouletteLanguageData[language];

    useEffect(() => {
        if (rouletteWheelBet === '-1' || rouletteWheelStart === true) {
            return;
        }

        setRouletteWheelStart(true);
    }, [rouletteWheelBet, rouletteWheelStart]);

    useEffect(() => {
        if (!isRouletteWheelSpinning) {
            return;
        }

        const prepare = async () => {
            const bet = await API.getRandomBet();
            console.info('gotta win bet', bet);
            console.log("user bet:", rouletteWheelBet);
            setRouletteWheelStart(false);
            setRouletteWheelBet(bet);
        };

        prepare().catch((err) => console.error('Error in prepare:', err));
    }, [isRouletteWheelSpinning]);


    const handleStudyModeComplete = () => {
        setIsStudyMode(false);
    };

    const handleDoSpin = () => {
        setShowWheelModal(true);
        setIsRouletteWheelSpinning(false);
        setRouletteWheelStart(false);
        wheelSpinSound.current.pause();
        wheelSpinSound.current.currentTime = 0;
        wheelSpinSound.current.play();
        setTimeout(() => {
            setRouletteWheelStart(true);
            setIsRouletteWheelSpinning(true);
        }, 50);
    };

    const handleUndo = () => {
        if (betHistory.length === 0) {
            alert(languageData.noUndoBets);
            return;
        }

        const lastBet = betHistory[betHistory.length - 1];
        if (!lastBet) {
            console.error("Bet history is empty, nothing to undo.");
            return;
        }

        const { id, value } = lastBet;

        setBets((prevState) => {
            const state = { ...prevState };

            if (state[id]) {
                if (state[id].number === value) {
                    delete state[id]; // Remove the bet if it matches the value
                } else {
                    state[id].number -= value; // Reduce the bet amount
                }
            } else {
                console.error(`Bet with ID ${id} not found in bets.`);
            }

            return state;
        });

        setBetHistory((prev) => prev.slice(0, -1)); // Remove the last bet from history
        updateBalance((prevBalance) => prevBalance + value); // Add the bet value back to the balance
        setCurrentRoundBet((prev) => prev - value); // Reduce the current round bet total
    };

    const handleCloseModal = () => {
        setShowWinningModal(false);
    };

    const handleClean = () => {
        const totalRefund = calcTotalBet(bets);

        setBets({});
        updateBalance((prev) => prev + totalRefund);
        setCurrentRoundBet(0);
    };

    const addBet = (id) => {
        const { icon, value } = chipsMap[activeChip];
        if (balance < value) {
            alert("Insufficient balance to place this bet.");
            return;
        }

        const betType = getBetType(id);
        console.log("bet type", betType);

        const probability = calculateBetProbability(betType);
        setBets((prevState) => {
            const state = { ...prevState };

            if (state[id] !== undefined) {
                state[id] = {
                    ...state[id],
                    icon,
                    number: state[id].number + value,
                    probability,
                };
            } else {
                state[id] = {
                    icon,
                    number: value,
                    probability,
                };
            }
            return state;
        });

        setBetHistory((prev) => [...prev, { id, value, probability }]);
        updateBalance(balance - value); // Deduct the bet amount from the balance
        setCurrentRoundBet((prev) => prev + value);
    };

    const handleEndSpin = () => {
        setIsRouletteWheelSpinning(false);
        let totalWinnings = 0;
        let winningsDetails = [];
        const winningBet = parseInt(rouletteWheelBet);
        setWinningNumber(winningBet);
        Object.entries(bets).forEach(([betId, { number }]) => {
            const betType = getBetType(betId);
            const winnings = calculateWinnings(betType, { betId, amount: number }, winningBet);
            if (winnings > 0) {
                totalWinnings += winnings;
                winningsDetails.push({ betId, winnings });
            }
        });

        if (totalWinnings > 0) {
            setWinningAmount(totalWinnings);
            setShowWinningModal(true);
        }

        setTimeout(() => {
            setShowWheelModal(false);
        }, 5000);
        updateBalance(balance + totalWinnings); // Update the balance with the winnings
        setRoundWinnings({ total: totalWinnings, details: winningsDetails });
        setCurrentRoundBet(0);
        setBets({});

        setLastWins((prev) => {
            const updatedWins = [...prev];
            if (updatedWins[updatedWins.length - 1] !== winningBet) {
                updatedWins.push(winningBet);
            }
            if (updatedWins.length > 10) {
                updatedWins.shift();
            }
            return updatedWins;
        });
    };


    const handleChipChange = (event) => {
        const chipName = event.target.closest('[data-name]').dataset.name;
        setActiveChip(chipName);
    };

    const totalProbability = calculateTotalWinningProbability(bets);

    return (
        <div className="body">
            <h1 className="heading">{languageData.gameTitle}</h1>
            <button className="modalButton" onClick={() => setShowGameInfoModal(true)}>{languageData.gameInfoButton}</button>
            <button className="modalButton" onClick={() => setShowTotalWinningProbabilityModal(true)}>
                {languageData.totalProbabilityButton}: {(totalProbability * 100).toFixed(2)}%
            </button>
            <button className="modalButton" onClick={() => setIsStudyMode(!isStudyMode)}>
                {isStudyMode ? languageData.exitStudyModeButton : languageData.studyModeButton}
            </button>
            <RouletteGameInfoModal
                isOpen={showGameInfoModal}
                onRequestClose={() => setShowGameInfoModal(false)}
                language={language}
            />
            <WinningProbabilityModal
                isOpen={showTotalWinningProbabilityModal}
                onRequestClose={() => setShowTotalWinningProbabilityModal(false)}
                language={language}
            />
            {isStudyMode ? (
                <RouletteStudyMode
                    language={language}
                    user={user}
                    onComplete={handleStudyModeComplete}
                    balance={balance}
                    updateBalance={updateBalance}
                />
            ) : (
                <>
                    {roundWinnings && (
                        <div className="round-winnings">
                            <p>{languageData.roundWinningsText}: ${roundWinnings.total}</p>
                            <ul>
                                {roundWinnings.details.map(({ betId, winnings }) => (
                                    <li key={betId}>
                                        {`${languageData.betOn} ${betId}: ${languageData.winningModalMessage}${winnings}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <LastWinsTable lastWins={lastWins} language={language} />
                    <div className="roulette-wheel-wrapper">
                        <Modal
                            isOpen={showWheelModal}
                            onRequestClose={() => {
                                if (!isRouletteWheelSpinning) {
                                    setShowWheelModal(false);
                                }
                            }}
                            className="wheel-modal"
                            overlayClassName="wheel-modal-overlay"
                            shouldCloseOnOverlayClick={!isRouletteWheelSpinning}
                        >
                            <RouletteWheel
                                start={rouletteWheelStart}
                                winningBet={rouletteWheelBet}
                                onSpinningEnd={handleEndSpin}
                                withAnimation={true}
                                addRest={true}
                                winningNumber={winningNumber}
                            />
                        </Modal>
                        <div className="spinButton-wrapper">
                            <button
                                type="button"
                                className="spinButton"
                                disabled={isRouletteWheelSpinning}
                                onClick={handleDoSpin}
                            >
                                {languageData.spinButton}
                            </button>
                        </div>
                    </div>
                    {showWinningModal && (
                        <WinningModal
                            amount={winningAmount}
                            onClose={handleCloseModal}
                            language={language}
                            winningNumber={winningNumber}
                        />
                    )}
                    <div className="roulette-wrapper">
                        <RouletteTable
                            onBet={({ id }) => addBet(id)}
                            bets={bets}
                            isDebug={isDebug}
                            language={language}
                        />
                        <div className="menu">
                            <ul className="chips">
                                {Object.entries(chipsMap).map(([name, { icon }]) => (
                                    <li
                                        key={name}
                                        data-name={name}
                                        className={activeChip === name ? 'active' : ''}
                                        onClick={handleChipChange}
                                    >
                                        <img width={64} height={64} src={icon} alt="chip" />
                                    </li>
                                ))}
                            </ul>
                            <div className="score">
                                <p>
                                    {`${languageData.totalBet}: ${calcTotalBet(bets)}$`}
                                </p>
                            </div>
                            <div className="buttons">
                                <button type="button" onClick={handleUndo}>{languageData.undoButton}</button>
                                <button type="button" onClick={handleClean}>{languageData.cleanButton}</button>
                            </div>
                        </div>
                        <div>
                            {shouldShowData && (
                                <p className="data">{JSON.stringify(bets, null, 2)}</p>
                            )}
                        </div>
                        <div style={{ height: 50 }} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Roulette;