import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { RouletteTable } from "../Components/RouletteTable";
import '../../../Styles/RouletteStudyMode.css';
import { LanguageDataRouletteStudyMode } from '../../../Constants/Language/LanguageData';
import {
    generateQuestions,
    simulateBets,
    generateQuestion,
    generateHint,
} from './RouletteStudyModeLogic';
import {betTypes, payouts, probabilities} from "../RouletteTableHelpers/Constants/rouletteConstants";

const RouletteStudyMode = ({ language, user, onComplete, balance, updateBalance }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [simulatedBets, setSimulatedBets] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [hint, setHint] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [moneyEarned, setMoneyEarned] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
    const [showAnswerResult, setShowAnswerResult] = useState('');

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
            setSelectedAnswer(null);
            setIsCheckingAnswer(false);
        }
    }, [currentQuestionIndex, questions, text]);

    const handleAnswerSubmit = async (selectedAnswer) => {
        if (!currentQuestion) return;

        // Normalize both answers by converting to strings and trimming spaces
        const normalizedSelectedAnswer = (typeof selectedAnswer === 'string' ? selectedAnswer.trim() : String(selectedAnswer)).toString();
        const normalizedCorrectAnswer = (typeof currentQuestion.answer === 'string' ? currentQuestion.answer.trim() : String(currentQuestion.answer)).toString();

        console.log('Selected Answer:', normalizedSelectedAnswer);
        console.log('Correct Answer:', normalizedCorrectAnswer);

        // Compare the normalized answers
        setIsCheckingAnswer(true); // Disable button during check

        if (normalizedSelectedAnswer === normalizedCorrectAnswer) {
            setIsCorrect(true);
            const moneyForQuestion = Math.max(30, 100 - (30 - timeRemaining) * 2);
            setMoneyEarned((prevMoney) => prevMoney + moneyForQuestion);

            try {
                await updateBalance((prevBalance) => prevBalance + moneyForQuestion);
                console.log('Balance updated successfully!');
            } catch (error) {
                console.error('Failed to update balance:', error);
            }
        } else {
            setIsCorrect(false);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setIsCorrect(null);
                setHint('');
                setIsCheckingAnswer(false); // Enable button again
            } else {
                onComplete();
            }
        }, 1000);
    };

    const checkAnswer = () => {
        if (!currentQuestion || !currentQuestion.options) return; // Ensure question and options are available

        const correctAnswer = currentQuestion.answer;

        // Normalize the selected and correct answer
        const normalizedSelectedAnswer = (typeof selectedAnswer === 'string' ? selectedAnswer.trim() : String(selectedAnswer)).toString();
        const normalizedCorrectAnswer = (typeof correctAnswer === 'string' ? correctAnswer.trim() : String(correctAnswer)).toString();

        console.log('Selected Answer:', normalizedSelectedAnswer);
        console.log('Correct Answer:', normalizedCorrectAnswer);

        // Set the checking state to true to trigger the answer highlighting
        setIsCheckingAnswer(true);

        // Compare the answers
        if (normalizedSelectedAnswer === normalizedCorrectAnswer) {
            setShowAnswerResult(language === 'en' ? 'Correct!' : 'נכון!');
            setMoneyEarned(prev => prev + 50); // Example reward
            updateBalance(prev => prev + 50);

            // Trigger handleAnswerSubmit if the answer is correct
            handleAnswerSubmit(normalizedSelectedAnswer);
        } else {
            setShowAnswerResult(language === 'en' ? 'Incorrect' : 'לא נכון');

            // Highlight the correct answer in green
            setTimeout(() => {
                // Automatically proceed to the next question
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setIsCorrect(null);
                    setHint('');
                } else {
                    onComplete();
                }
            }, 1500); // Delay to allow time for users to see the correct/incorrect answer feedback
        }
    };
    const handleAnswerClick = (answerText) => {
        setSelectedAnswer(answerText); // Update selected answer
        console.log('Selected Answer:', answerText); // For debugging
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
                <div className="question">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className="mb-0">{currentQuestion.text}</p>
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => setShowInfoModal(true)}
                        >
                            <FontAwesomeIcon icon={faInfoCircle}/>{' '}
                            {text.info}
                        </button>
                    </div>
                    <div className="answers">
                        {currentQuestion && currentQuestion.options && currentQuestion.options.length > 0 ? (
                            currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`answer-button 
            ${selectedAnswer === option ? 'selected' : ''} 
            ${isCheckingAnswer && option === currentQuestion.answer ? 'correct' : ''} 
            ${isCheckingAnswer && selectedAnswer === option && option !== currentQuestion.answer ? 'incorrect' : ''}`}
                                    disabled={isCheckingAnswer}
                                    onClick={() => handleAnswerClick(option)} // Update selected answer on click
                                >
                                    {option} {/* Display the option */}
                                </button>
                            ))
                        ) : (
                            <p>{text.noAnswersAvailable}</p> // Optional: Message if no answers are available
                        )}
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
                        {(betTypes || []).map((type) => (
                            <tr key={type}>
                                <td>{type}</td>
                                <td>{payouts?.[type] || 'N/A'}:1</td>
                                <td>{(probabilities?.[type] || 0).toFixed(2)}%</td>
                            </tr>
                        ))}
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
            <div>
                <button
                    onClick={checkAnswer}
                    disabled={isCheckingAnswer || !selectedAnswer} // Disable the button if checking or no answer is selected
                >
                    {language === 'en' ? 'Check Answer' : 'בדוק תשובה'}
                </button>
            </div>
            {showAnswerResult && <p>{showAnswerResult}</p>}
        </div>
    );
};

export default RouletteStudyMode;
