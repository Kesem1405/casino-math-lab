import React, {useEffect, useRef, useState} from 'react';
import { RouletteTable } from './RouletteTableHelpers/RouletteTable';
import RouletteWheel from "./RouletteTableHelpers/RouletteWheel/RouletteWheel";
import './RouletteTableHelpers/RouletteTable/RouletteTable.css'
import './RouletteTableHelpers/RouletteWheel/RouletteWheel.css'
import { getRandomRouletteWinBet } from './Helpers/getRandomRouletteWinBet';
import whiteChip from '../Media/images/white-chip.png';
import blueChip from '../Media/images/blue-chip.png';
import blackChip from '../Media/images/black-chip.png';
import cyanChip from '../Media/images/cyan-chip.png';
import {WinningModal} from "./Modals/WinningModal/WinningModal"
import Modal from "react-modal";
import {RouletteGameInfoModal} from "./Modals/InfoModal/RouletteGameInfoModal";
import {WinningProbabilityModal} from "./Modals/ProbabilityModal/WinningProbabilityModal";
import './RouletteTableHelpers/Chip/Chip.css'
import './Roulette.css';
import {
    calculateBetProbability,
    calculateTotalWinningProbability,
    calculateWinnings,
    getBetType
} from './RouletteTableHelpers/Logic/calculateWinnings';
import WheelSpinSound from '../Media/Sounds/WheelSpinSound.mp3'
import { LastWinsTable } from './RouletteTableHelpers/LastWinsTable/LastWinsTable';

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

const Roulette = ({language}) => {
    const [bets, setBets] = useState({});
    const [isDebug] = useState(false);
    const [activeChip, setActiveChip] = useState(Object.keys(chipsMap)[0]);
    const [shouldShowData] = useState(false);
    const [betHistory, setBetHistory] = useState([]);
    const [balance, setBalance] = useState(10000);
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


    const spinButtonText = language === 'en' ? 'SPIN' : 'סובב';
    const undoButtonText = language === 'en' ? 'Undo' : 'בטל';
    const cleanButtonText = language === 'en' ? 'Clean' : 'נקה';
    const gameInfoButtonText = language === 'en' ? 'Game Info' : 'מידע על המשחק';
    const totalProbabilityButtonText = language === 'en' ? 'Total probability' : 'הסתברות כוללת';

    const roundWinningsText = language === 'en' ? 'Winnings This Round' : 'זכיות בסיבוב זה';

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
            console.log("user bet:", rouletteWheelBet )
            setRouletteWheelStart(false);
            setRouletteWheelBet(bet);
        };

        prepare().catch((err) => console.error('Error in prepare:', err));
    }, [isRouletteWheelSpinning]);

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
            alert(language === 'en' ? 'No bets to undo!' : 'אין הימורים לביטול!');
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
                    delete state[id];
                } else {
                    state[id].number -= value;
                }
            } else {
                console.error(`Bet with ID ${id} not found in bets.`);
            }

            return state;
        });

        setBetHistory((prev) => prev.slice(0, -1));

        setBalance((prev) => prev + value);
        setCurrentRoundBet((prev) => prev - value);
    };


    const handleCloseModal = () => {
        setShowWinningModal(false);
    };

    const handleClean = () => {
        const totalRefund = calcTotalBet(bets);

        setBets({});
        setBalance((prev) => prev + totalRefund);
        setCurrentRoundBet(0);
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

            console.log(`Processing bet: ${betId}, Type: ${betType}, Amount: ${number}, Winnings: ${winnings}`);

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
        setBalance((prev) => prev + totalWinnings);
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


    const addBet = (id) => {
        const { icon, value } = chipsMap[activeChip];

        if (balance < value) {
            alert(language === 'en' ? 'Insufficient balance to place this bet.' : 'לא מספיק יתרה להנחת הימור');
            return;
        }

        const betType = getBetType(id);
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
                console.log("probability:" + probability, "Bet type: "+ betType);
            }
            return state;
        });

        setBetHistory((prev) => [...prev, { id, value, probability }]);
        setBalance((prev) => prev - value);
        setCurrentRoundBet((prev) => prev + value);
    };

    const handleChipChange = (event) => {
        const chipName = event.target.closest('[data-name]').dataset.name;

        setActiveChip(chipName);
    };

    const totalProbability = calculateTotalWinningProbability(bets);

    return (
        <div className="body">
            <h1 className="heading">{language === 'en' ? ' Roulette game' : 'משחק הרולטה'}</h1>
            <div className="balance">{language === 'en' ? `Balance: $${balance}` : `יתרה: ₪${balance}`}</div>
            <button className="modalButton" onClick={() => setShowGameInfoModal(true)}>{gameInfoButtonText}</button>
            <button className="modalButton" onClick={() => setShowTotalWinningProbabilityModal(true)}>
                {totalProbabilityButtonText}: {(totalProbability * 100).toFixed(2)}%
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
            {roundWinnings && (
                <div className="round-winnings">
                    <p>{roundWinningsText}: ${roundWinnings.total}</p>
                    <ul>
                    {roundWinnings.details.map(({betId, winnings}) => (
                            <li key={betId}>
                                {language === 'en' ? `Bet on ${betId}: Won $${winnings}` : `הימור על ${betId}: זכית ב-${winnings}`}
                            </li>))}
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
                    shouldCloseOnOverlayClick={!isRouletteWheelSpinning} // Disable overlay click during spinning
                >
                    <RouletteWheel
                        start={rouletteWheelStart}
                        winningBet={rouletteWheelBet}
                        onSpinningEnd={handleEndSpin}
                        withAnimation={true}
                        addRest={true}
                        winningNumber={winningNumber}  // Pass the winning number
                    />
                </Modal>
                    <div className="spinButton-wrapper">
                    <button
                        type="button"
                        className="spinButton"
                        disabled={isRouletteWheelSpinning}
                        onClick={handleDoSpin}
                    >
                        {spinButtonText}
                    </button>
                </div>
            </div>
            {showWinningModal && <WinningModal amount={winningAmount} onClose={handleCloseModal} language={language} winningNumber={winningNumber} />}
            <div className="roulette-wrapper">
                <RouletteTable
                    onBet={({id}) => addBet(id)}
                    bets={bets}
                    isDebug={isDebug}
                    isRouletteWheelSpinning={isRouletteWheelSpinning}
                    language={language}
                />
                <div className="menu">
                    <ul className="chips">
                        {Object.entries(chipsMap).map(([name, {icon}]) => (
                            <li
                                key={name}
                                data-name={name}
                                className={activeChip === name ? 'active' : ''}
                                onClick={handleChipChange}
                            >
                                <img width={64} height={64} src={icon} alt="chip"/>
                            </li>
                        ))}
                    </ul>
                    <div className="score">
                        <p>
                            {language === 'he'
                                ? `הימור כולל: ${calcTotalBet(bets)}$`
                                : `Total bet: ${calcTotalBet(bets)}$`}
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" onClick={handleUndo}>{undoButtonText}</button>
                        <button type="button" onClick={handleClean}>{cleanButtonText}</button>
                    </div>
                </div>
                <div>
                    {shouldShowData && (
                        <p className="data">{JSON.stringify(bets, null, 2)}</p>
                    )}
                </div>
                <div style={{height: 50}}/>
            </div>
        </div>
    );
};

export default Roulette;
