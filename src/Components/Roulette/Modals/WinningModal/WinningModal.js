import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import '../../../../Styles/WinningModalStyles.css';

export const WinningModal = ({ amount, onClose, language, winningNumber }) => {
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

    const messages = {
        en: {
            winningNumberText: `${winningNumber} is the winning number!`,
            title: "🎉 Congratulations! 🎉",
            wonText: `You won: $${Math.floor(displayedAmount)}`,
            message: "Keep the luck rolling! 🍀"
        },
        he: {
            winningNumberText: `${winningNumber} הוא המספר הזוכה!`,
            title: "🎉 מזל טוב! 🎉",
            wonText: `זכית: ₪${Math.floor(displayedAmount)}`,
            message: "המשך את ההצלחה 🍀"
        }
    };

    const { title, wonText, message, winningNumberText } = language === 'he' ? messages.he : messages.en;

    return (
        <div className="winning-modal">
            {showConfetti && <Confetti />}
            <div className="modal-content">
                <h2>{title}</h2>
                <p>
                    <span className="amount">{wonText}</span>
                </p>
                <p className="winning-number">{winningNumberText}</p> {/* Displaying the winning number */}
                <p className="message">{message}</p>
            </div>
        </div>
    );
};
