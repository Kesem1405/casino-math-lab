import React, {useEffect, useRef, useState} from 'react';
import { RouletteTable, RouletteWheel } from 'react-casino-roulette';
import 'react-casino-roulette/dist/index.css';
import { getRandomRouletteWinBet } from './Helpers/getRandomRouletteWinBet';
import whiteChip from './images/white-chip.png';
import blueChip from './images/blue-chip.png';
import blackChip from './images/black-chip.png';
import cyanChip from './images/cyan-chip.png';
import {WinningModal} from "./WinningModal/WinningModal";
import './Roulette.css';
import {
    calculateBetProbability,
    calculateTotalWinningProbability,
    calculateWinnings,
    getBetType
} from './RouletteTableHelpers/Logic/calculateWinnings';
import WheelSpinSound from '../Roulette/Sounds/WheelSpinSound.mp3'

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

const Roulette = () => {
    const [bets, setBets] = useState({});
    const [isDebug] = useState(false);
    const [activeChip, setActiveChip] = useState(Object.keys(chipsMap)[0]);
    const [shouldShowData] = useState(false);
    const [betHistory, setBetHistory] = useState([]);
    const [balance, setBalance] = useState(10000);
    const [currentRoundBet, setCurrentRoundBet] = useState(0);
    const [roundWinnings, setRoundWinnings] = useState(null);
    const [showWinningModal, setShowWinningModal] = useState(false);
    const [winningAmount, setWinningAmount] = useState(0);

    const [isRouletteWheelSpinning, setIsRouletteWheelSpinning] = useState(false);
    const [rouletteWheelStart, setRouletteWheelStart] = useState(false);
    const [rouletteWheelBet, setRouletteWheelBet] = useState('-1');
    const wheelSpinSound = useRef(new Audio(WheelSpinSound));




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
            alert("No bets to undo!");
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

        setBalance((prev) => prev + totalWinnings);
        setRoundWinnings({ total: totalWinnings, details: winningsDetails });
        setCurrentRoundBet(0);
        setBets({});
    };





    const addBet = (id) => {
        const { icon, value } = chipsMap[activeChip];

        if (balance < value) {
            alert("Insufficient balance to place this bet.");
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
            <h1 className="heading">React Casino Roulette</h1>
            <div className="balance">Balance: ${balance}</div>
            <p>Total Winning Probability: {(totalProbability * 100).toFixed(2)}%</p>
            <div className="current-bet">Current Round Bet: ${currentRoundBet}</div>
            {roundWinnings && (
                <div className="round-winnings">
                    <p>Winnings This Round: ${roundWinnings.total}</p>
                    <ul>
                        {roundWinnings.details.map(({ betId, winnings }) => (
                            <li key={betId}>Bet on {betId}: Won ${winnings}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="roulette-wheel-wrapper">
                <RouletteWheel
                    start={rouletteWheelStart}
                    winningBet={rouletteWheelBet}
                    onSpinningEnd={handleEndSpin}
                    withAnimation={true}
                />
                <div className="buttons">
                    <button
                        type="button"
                        disabled={isRouletteWheelSpinning}
                        onClick={handleDoSpin}
                    >
                        Let&apos;s go
                    </button>
                </div>
            </div>
            {showWinningModal && <WinningModal amount={winningAmount}  onClose={handleCloseModal} />}
            <div className="roulette-wrapper">
                <RouletteTable
                    onBet={({ id }) => addBet(id)}
                    bets={bets}
                    isDebug={isDebug}
                    isRouletteWheelSpinning={isRouletteWheelSpinning}
                />
                {Object.entries(bets).map(([betId, { number }]) => (
                    <div key={betId}>
                        <p>{betId}: {number} chips</p>
                    </div>
                ))}

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
                        <p>Total bet: {calcTotalBet(bets)}</p>
                    </div>
                    <div className="buttons">
                        <button type="button" onClick={handleUndo}>Undo</button>
                        <button type="button" onClick={handleClean}>Clean</button>
                    </div>
                </div>
                <div>
                    {shouldShowData && (
                        <p className="data">{JSON.stringify(bets, null, 2)}</p>
                    )}
                </div>
                <div style={{ height: 50 }} />
            </div>
        </div>
    );
};

export default Roulette;
