import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { RouletteTable } from "../Components/RouletteTable";
import '../../../Styles/RouletteStudyMode.css';
import useBalance from "../../Backend/useBalance";
import { LanguageDataRouletteStudyMode } from '../../../Language/LanguageData';
import {
    generateQuestions,
    generateRandomNumbersForBetType,
    simulateBets,
    generateQuestion,
    generateHint,
} from './RouletteStudyModeLogic';
import {betTypes, payouts, probabilities} from "../RouletteTableHelpers/Constants/rouletteConstants";

const RouletteStudyMode = ({ language, user, onComplete, balance, updateBalance }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [simulatedBets, setSimulatedBets] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [hint, setHint] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [moneyEarned, setMoneyEarned] = useState(0);

    const text = LanguageDataRouletteStudyMode[language];

    useEffect(() => {
        const generatedQuestions = generateQuestions();
        setQuestions(generatedQuestions);
    }, []);

    useEffect(() => {
        if (questions.length > 0 && currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            setSimulatedBets(simulateBets(question.bets));
            setCurrentQuestion(generateQuestion(question.bets, text));
            setTimeRemaining(30);
        }
    }, [currentQuestionIndex, questions, text]);

    const handleAnswerSubmit = async () => {
        if (!currentQuestion) return;

        const correctAnswer = currentQuestion.answer;
        if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
            setIsCorrect(true);
            const moneyForQuestion = Math.max(30, 100 - (30 - timeRemaining) * 2);
            setMoneyEarned((prevMoney) => prevMoney + moneyForQuestion);

            try {
                await updateBalance((prevBalance) => prevBalance + moneyForQuestion);
                console.log('Balance updated successfully!');
            } catch (error) {
                console.error('Failed to update balance:', error);
            }

            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setUserAnswer('');
                    setIsCorrect(null);
                    setHint('');
                } else {
                    onComplete();
                }
            }, 1000);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div className="study-mode">
            <h2>{text.studyMode}</h2>
            <div className="roulette-wrapper-study">
                <RouletteTable
                    bets={simulatedBets}
                    isDebug={false}
                    language={language}
                    isStudyMode={true}
                />
            </div>
            {currentQuestion && (
                <div className="question-section p-4 border rounded bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="mb-0">{currentQuestion.text}</p>
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => setShowInfoModal(true)}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />{" "}
                            {text.info}
                        </button>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder={text.enterYourAnswer}
                        />
                        {!showInfoModal && (
                            <button
                                className="btn btn-primary"
                                onClick={handleAnswerSubmit}
                            >
                                {text.submit}
                            </button>
                        )}
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setHint(generateHint(currentQuestion, text))}
                        >
                            <FontAwesomeIcon icon={faLightbulb} />{" "}
                            {text.hint}
                        </button>
                    </div>
                    {hint && (
                        <div className="alert alert-warning mt-3">
                            {hint}
                        </div>
                    )}
                    {isCorrect !== null && (
                        <div className={`alert mt-3 ${isCorrect ? 'alert-success' : 'alert-danger'}`}>
                            {isCorrect ? text.correct : text.incorrect}
                        </div>
                    )}
                    <div className="mt-3">
                        <p>{text.timeRemaining} {timeRemaining}s</p>
                        <p>{text.moneyEarned} ${moneyEarned}</p>
                        <p>{text.question} {currentQuestionIndex + 1}/{questions.length}</p>
                    </div>
                </div>
            )}
            <Modal
                isOpen={showInfoModal}
                onRequestClose={() => setShowInfoModal(false)}
                contentLabel="Info Modal"
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                <div>
                    <h2>{text.betTypesAndPayouts}</h2>
                    <table className="table table-sm table-dark">
                        <thead>
                        <tr>
                            <th scope="col">{text.betType}</th>
                            <th scope="col">{text.payout}</th>
                            <th scope="col">{text.probability}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {betTypes.map((type) => {
                            const probability = probabilities[type] || 0; // Fallback to 0 if undefined
                            return (
                                <tr key={type}>
                                    <td>{type}</td>
                                    <td>{payouts[type]}:1</td>
                                    <td>{probability.toFixed(2)}%</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <button
                    className="btn btn-secondary mt-3"
                    onClick={() => setShowInfoModal(false)}
                >
                    {text.close}
                </button>
            </Modal>
        </div>
    );
};

export default RouletteStudyMode;