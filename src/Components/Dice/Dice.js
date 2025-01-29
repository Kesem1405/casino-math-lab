import React, { useState } from 'react';
import '../../Styles/Dice.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DiceStudyMode from './DiceStudyMode';
import DiceContainer from './DiceContainer';
import ChipContainer from '../../Components/Roulette/RouletteTableHelpers/Chip/ChipContainer';


const Dice = ({ language, user, balance, updateBalance}) => {
    const [mode, setMode] = useState('gambling'); // 'gambling' or 'study'
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [rolling, setRolling] = useState(false);
    const [bets, setBets] = useState({});
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [winningSum, setWinningSum] = useState(null);
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [selectedChipValue, setSelectedChipValue] = useState(1); // Track selected chip value

    const payoutData = {
        2: { ratio: 36, probability: '2.78%' },
        3: { ratio: 18, probability: '5.56%' },
        4: { ratio: 12, probability: '8.33%' },
        5: { ratio: 9, probability: '11.11%' },
        6: { ratio: 7.2, probability: '13.89%' },
        7: { ratio: 6, probability: '16.67%' },
        8: { ratio: 7.2, probability: '13.89%' },
        9: { ratio: 9, probability: '11.11%' },
        10: { ratio: 12, probability: '8.33%' },
        11: { ratio: 18, probability: '5.56%' },
        12: { ratio: 36, probability: '2.78%' },
    };

    const handleChipChange = (value) => {
        setSelectedChipValue(value); // Update the selected chip value
    };

    const handleBet = (value) => {
        if (balance < selectedChipValue) {
            alert("Insufficient balance to place this bet.");
            return;
        }

        const newBalance = balance - selectedChipValue;
        updateBalance(newBalance); // Update balance using the hook

        setBets((prevBets) => ({
            ...prevBets,
            [value]: (prevBets[value] || 0) + selectedChipValue,
        }));
    };

    const resetBets = () => {
        setBets({});
    };

    const rollDice = () => {
        if (rolling || Object.keys(bets).length === 0) return;

        setRolling(true);
        setResult('');
        setShowResult(false);

        const newDice1 = Math.floor(Math.random() * 6) + 1;
        const newDice2 = Math.floor(Math.random() * 6) + 1;
        const sum = newDice1 + newDice2;

        // Track the current balance before the roll
        const initialBalance = balance;

        setTimeout(() => {
            setDice1(newDice1);
            setDice2(newDice2);
            setRolling(false);
            setShowResult(true);
            setWinningSum(sum);

            let totalWinnings = 0;
            Object.keys(bets).forEach((betSum) => {
                if (parseInt(betSum) === sum) {
                    totalWinnings += bets[betSum] * payoutData[betSum].ratio;
                }
            });

            // Calculate the new balance after the win/loss
            const newBalance = initialBalance + totalWinnings;

            updateBalance(newBalance); // Update balance in the backend here (only once)

            setResult(
                totalWinnings > 0
                    ? language === 'en'
                        ? `You win $${totalWinnings}!`
                        : `ניצחת $${totalWinnings}!`
                    : language === 'en'
                        ? `You lose $${Math.abs(totalWinnings)}!`
                        : `הפסדת $${Math.abs(totalWinnings)}!`
            );

            setBets({});
        }, 1000);
    };

    return (
        <div className="dice-game">
            <h1>{language === 'en' ? 'Dice Rolling Game' : 'משחק הטלת קוביות'}</h1>
            <button className="modalButton" onClick={() => setMode(mode === 'gambling' ? 'study' : 'gambling')}>
                {mode === 'gambling'
                    ? language === 'en'
                        ? 'Switch to Study Mode'
                        : 'עבור למצב לימוד'
                    : language === 'en'
                        ? 'Switch to Gambling Mode'
                        : 'עבור למצב הימורים'}
            </button>

            {mode === 'gambling' && (
                <>
                    <DiceContainer dice1={dice1} dice2={dice2} rolling={rolling} />
                    {showResult && (
                        <div className="result-sum">
                            <p>
                                {language === 'en' ? 'The winning sum is:' : 'הסכום שניצח הוא:'} {winningSum}
                            </p>
                            <p>
                                {language === 'en' ? 'Dice 1:' : 'קוביה 1:'} {dice1}
                            </p>
                            <p>
                                {language === 'en' ? 'Dice 2:' : 'קוביה 2:'} {dice2}
                            </p>
                        </div>
                    )}

                    {/* Betting Table */}
                    <div className="betting-table">
                        {Array.from({ length: 11 }, (_, i) => i + 2).map((value) => (
                            <div
                                key={value}
                                className={`bet-cell ${bets[value] ? 'selected' : ''}`}
                                onClick={() => handleBet(value)}
                            >
                                <div className="number">{value}</div>
                                <div className="bet">${bets[value] || 0}</div>
                            </div>
                        ))}
                    </div>

                    {/* Chips */}
                    <div className="chips">
                        <ChipContainer onChipChange={handleChipChange} />
                    </div>

                    <button onClick={resetBets} className="reset-bets">
                        {language === 'en' ? 'Reset Bets' : 'אפס הימורים'}
                    </button>

                    <Button variant="info" onClick={() => setShowPayoutModal(true)}>
                        {language === 'en' ? 'Show Payouts & Probabilities' : 'הצג יחסי תשלום והסתברויות'}
                    </Button>

                    <button onClick={rollDice} disabled={rolling || Object.keys(bets).length === 0}>
                        {rolling ? (language === 'en' ? 'Rolling...' : 'מגלגל...') : language === 'en' ? 'Roll Dice' : 'גלגל קוביות'}
                    </button>

                    {result && <p className="result">{result}</p>}

                    {/* Payouts & Probabilities Modal */}
                    <Modal show={showPayoutModal} onHide={() => setShowPayoutModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {language === 'en' ? 'Payouts & Probabilities' : 'יחסי תשלום והסתברויות'}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>{language === 'en' ? 'Sum' : 'סכום'}</th>
                                    <th>{language === 'en' ? 'Payout Ratio' : 'יחס תשלום'}</th>
                                    <th>{language === 'en' ? 'Probability' : 'הסתברות'}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(payoutData).map(([sum, data]) => (
                                    <tr key={sum}>
                                        <td>{sum}</td>
                                        <td>{data.ratio}x</td>
                                        <td>{data.probability}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowPayoutModal(false)}>
                                {language === 'en' ? 'Close' : 'סגור'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}

            {mode === 'study' && <DiceStudyMode language={language} user={user} balance={balance} updateBalance={updateBalance}/>}
        </div>
    );
};

export default Dice;