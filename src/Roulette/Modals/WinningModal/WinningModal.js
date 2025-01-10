import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './WinningModalStyles.css';

export const WinningModal = ({ amount, onClose }) => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [displayedAmount, setDisplayedAmount] = useState(0);
    const [countUpFinished, setCountUpFinished] = useState(false);

    useEffect(() => {
        const duration = 5000;
        const stepTime = 50;
        const increment = amount / (duration / stepTime);

        const interval = setInterval(() => {
            setDisplayedAmount((prev) => {
                if (prev + increment >= amount) {
                    clearInterval(interval);
                    setCountUpFinished(true);
                    return amount;
                }
                return prev + increment;
            });
        }, stepTime);

        return () => {
            clearInterval(interval);
        };
    }, [amount]);

    useEffect(() => {
        if (countUpFinished) {
            const closeTimer = setTimeout(() => {
                setShowConfetti(false);
                onClose();
            }, 2000);

            return () => clearTimeout(closeTimer);
        }
    }, [countUpFinished, onClose]);



    return (
        <div className="winning-modal">
            {showConfetti && <Confetti />}
            <div className="modal-content">
                <h2>🎉 Congratulations! 🎉</h2>
                <p>
                    You won: <span className="amount">${Math.floor(displayedAmount)}</span>
                </p>
                <p className="message">Keep the luck rolling! 🍀</p>
            </div>
        </div>
    );
};
