import React, { useState, useEffect } from 'react';
import '../../Styles/DiceStudyMode.css';
import DiceContainer from './DiceContainer';
import useBalance from '../Backend/useBalance'; // Adjust the path as needed

const DiceStudyMode = ({ language, user, balance, updateBalance }) => {

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showAnswerResult, setShowAnswerResult] = useState(false);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [rolling, setRolling] = useState(false);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    const generateQuestion = () => {
        const newDice1 = rollDice();
        const newDice2 = rollDice();
        const sum = newDice1 + newDice2;

        // Generate unique answers for each question
        const questions = [
            {
                question: language === 'en' ? `What is the probability of rolling two ${newDice1}s?` : `מה ההסתברות לקבל שני ${newDice1}?`,
                answers: generateUniqueAnswers([
                    { text: '1/36', isCorrect: true },
                    { text: '1/6', isCorrect: false },
                    { text: '1/12', isCorrect: false },
                    { text: '1/18', isCorrect: false },
                ]),
            },
            {
                question: language === 'en' ? `What is the probability of rolling a sum of ${sum}?` : `מה ההסתברות לקבל סכום של ${sum}?`,
                answers: generateUniqueAnswers([
                    { text: `${sum === 7 ? '6/36' : sum === 6 || sum === 8 ? '5/36' : sum === 5 || sum === 9 ? '4/36' : sum === 4 || sum === 10 ? '3/36' : sum === 3 || sum === 11 ? '2/36' : '1/36'}`, isCorrect: true },
                    { text: '1/6', isCorrect: false },
                    { text: '1/12', isCorrect: false },
                    { text: '1/18', isCorrect: false },
                ]),
            },
            {
                question: language === 'en' ? `What is the probability of rolling a number greater than ${newDice1} on the first die?` : `מה ההסתברות לקבל מספר גדול מ-${newDice1} בקוביה הראשונה?`,
                answers: generateUniqueAnswers([
                    { text: `${(6 - newDice1)}/6`, isCorrect: true },
                    { text: '1/6', isCorrect: false },
                    { text: '1/2', isCorrect: false },
                    { text: '1/3', isCorrect: false },
                ]),
            },
            // Add more questions here
        ];

        // Randomly select a question
        const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];

        // Update dice values and question
        setDice1(newDice1);
        setDice2(newDice2);
        setCurrentQuestion(selectedQuestion);
        setCorrectAnswer(selectedQuestion.answers.find((answer) => answer.isCorrect).text);
    };

    // Helper function to ensure answers are unique
    const generateUniqueAnswers = (answers) => {
        const uniqueAnswers = [];
        const usedTexts = new Set();

        answers.forEach((answer) => {
            if (!usedTexts.has(answer.text)) {
                uniqueAnswers.push(answer);
                usedTexts.add(answer.text);
            }
        });

        // Fill remaining slots with random incorrect answers if necessary
        while (uniqueAnswers.length < 4) {
            const randomAnswer = { text: `1/${Math.floor(Math.random() * 36) + 1}`, isCorrect: false };
            if (!usedTexts.has(randomAnswer.text)) {
                uniqueAnswers.push(randomAnswer);
                usedTexts.add(randomAnswer.text);
            }
        }

        return uniqueAnswers.sort(() => Math.random() - 0.5); // Shuffle answers
    };

    // Initialize the first question on component mount
    useEffect(() => {
        generateQuestion();
    }, []);

    // Automatically move to the next question after 2 seconds
    useEffect(() => {
        if (isCheckingAnswer) {
            const timer = setTimeout(() => {
                handleNextQuestion();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCheckingAnswer]);

    const handleNextQuestion = () => {
        setIsLoading(true);
        setTimeout(() => {
            generateQuestion();
            setSelectedAnswer('');
            setShowAnswerResult(false);
            setIsCheckingAnswer(false);
            setQuestionNumber(questionNumber + 1);
            setIsLoading(false);
        }, 1000); // Simulate loading time
    };

    const checkAnswer = () => {
        if (isCheckingAnswer) return; // Prevent multiple clicks

        const isCorrect = selectedAnswer === correctAnswer;
        setIsCheckingAnswer(true);

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
            updateBalance(balance + 10); // Add $10 for correct answer
            setShowAnswerResult(language === 'en' ? 'Correct! 🎉 +$10' : 'נכון! 🎉 +10$');
        } else {
            setShowAnswerResult(language === 'en' ? `Incorrect. The correct answer is: ${correctAnswer}` : `לא נכון. התשובה הנכונה היא: ${correctAnswer}`);
        }
    };

    return (
        <div className="dice-study-mode">
            <h2>{language === 'en' ? 'Study Mode' : 'מצב לימוד'}</h2>
            <p>
                {language === 'en' ? 'Question' : 'שאלה'} {questionNumber}/20
            </p>
            <DiceContainer dice1={dice1} dice2={dice2} rolling={rolling} />
            {isLoading ? (
                <p>{language === 'en' ? 'Loading next question...' : 'טוען שאלה הבאה...'}</p>
            ) : (
                currentQuestion && (
                    <div className="question">
                        <h3>{currentQuestion.question}</h3>
                        <div className="answers">
                            {currentQuestion.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => !isCheckingAnswer && setSelectedAnswer(answer.text)}
                                    className={`answer-button 
                                        ${selectedAnswer === answer.text ? 'selected' : ''} 
                                        ${isCheckingAnswer && answer.isCorrect ? 'correct' : ''} 
                                        ${isCheckingAnswer && selectedAnswer === answer.text && !answer.isCorrect ? 'incorrect' : ''}`}
                                    disabled={isCheckingAnswer}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                        <button onClick={checkAnswer} disabled={isCheckingAnswer || !selectedAnswer}>
                            {language === 'en' ? 'Check Answer' : 'בדוק תשובה'}
                        </button>
                        {showAnswerResult && <p>{showAnswerResult}</p>}
                    </div>
                )
            )}
            <p>
                {language === 'en' ? 'Score:' : 'ניקוד:'} {score}
            </p>
        </div>
    );
};

export default DiceStudyMode;