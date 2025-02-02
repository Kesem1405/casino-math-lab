import React, { useState, useEffect } from 'react';
import '../../Styles/JarColorPickStudyMode.css';
import { LanguageDataJarStudyMode } from '../../Constants/Language/LanguageData';
import { jarStories } from './JarStories';
import { calculateProbability } from './JarProbabilityHelper';

const JarColorPickStudyMode = ({ language, user, balance, updateBalance }) => {
    const [currentStory, setCurrentStory] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showAnswerResult, setShowAnswerResult] = useState('');
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [ballPositions, setBallPositions] = useState([]);
    const [totalEarn, setTotalEarn] = useState(0);

    const generateBallPositions = (totalBalls) => {
        const positions = [];
        Object.entries(totalBalls).forEach(([color, amount]) => {
            for (let i = 0; i < amount; i++) {
                positions.push({
                    color,
                    top: `${Math.random() * 180}px`,
                    left: `${Math.random() * 130}px`,
                });
            }
        });
        setBallPositions(positions);
    };

    const generateRandomQuestion = () => {
        const selectedStory = jarStories[Math.floor(Math.random() * jarStories.length)];
        setCurrentStory(selectedStory);
        generateBallPositions(selectedStory.totalBalls);
        const { totalBalls, description } = selectedStory;
        const total = Object.values(totalBalls).reduce((sum, num) => sum + num, 0);

        const isWithReplacement = Math.random() < 0.5;

        let question, correctAnswer;

        const color = Object.keys(totalBalls)[Math.floor(Math.random() * Object.keys(totalBalls).length)];

        if (isWithReplacement) {
            question = language === 'he'
                ? `מה ההסתברות להוציא שני כדורים ${LanguageDataJarStudyMode[language].colors[color]} עם החזרה?`
                : `What is the probability of drawing two ${LanguageDataJarStudyMode[language].colors[color]} balls with replacement?`;

            correctAnswer = `(${totalBalls[color]}/${total}) * (${totalBalls[color]}/${total}) = ${(totalBalls[color] / total * totalBalls[color] / total).toFixed(4)}`;
        } else {
            question = language === 'he'
                ? `מה ההסתברות להוציא שני כדורים ${LanguageDataJarStudyMode[language].colors[color]} ללא החזרה?`
                : `What is the probability of drawing two ${LanguageDataJarStudyMode[language].colors[color]} balls without replacement?`;

            correctAnswer = `(${totalBalls[color]}/${total}) * (${totalBalls[color] - 1}/${total - 1}) = ${(totalBalls[color] / total * (totalBalls[color] - 1) / (total - 1)).toFixed(4)}`;
        }

        const incorrectAnswers = new Set();
        while (incorrectAnswers.size < 3) {
            const randomNumerator1 = Math.floor(Math.random() * (total + 1));
            const randomNumerator2 = Math.floor(Math.random() * (total + 1));
            const incorrectAnswer = `(${randomNumerator1}/${total}) * (${randomNumerator2}/${total}) = ${(randomNumerator1 / total * randomNumerator2 / total).toFixed(4)}`;
            if (incorrectAnswer !== correctAnswer) {
                incorrectAnswers.add(incorrectAnswer);
            }
        }

        const allAnswers = [correctAnswer, ...Array.from(incorrectAnswers)].sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            story: description[language],
            question,
            answers: allAnswers.map(answer => ({ text: answer, isCorrect: answer === correctAnswer })),
        });
        setCorrectAnswer(correctAnswer);
    };

    useEffect(() => {
        generateRandomQuestion();
    }, []);

    const checkAnswer = () => {
        if (isCheckingAnswer) return;
        setIsCheckingAnswer(true);

        const isCorrect = selectedAnswer === correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
            updateBalance(balance + 10);
            setTotalEarn(totalEarn + 10);
            setShowAnswerResult(LanguageDataJarStudyMode[language].correctAnswer);
        } else {
            setShowAnswerResult(language === 'en' ? `Incorrect. The correct answer is: ${correctAnswer}` : `לא נכון. התשובה הנכונה היא: ${correctAnswer}`);
        }

        setTimeout(() => {
            setSelectedAnswer('');
            setShowAnswerResult('');
            setIsCheckingAnswer(false);
            setQuestionNumber(questionNumber + 1);
            generateRandomQuestion();
        }, 2000);
    };

    return (
        <div className="jar-color-pick-study-mode">
            <h2>{LanguageDataJarStudyMode[language].studyMode}</h2>
            <p>{LanguageDataJarStudyMode[language].questionNumber} {questionNumber}/20</p>
            <p className="story">{currentQuestion?.story}</p>
            <div className="jar">
                <div className="lid"></div>
                <div className="glass">
                    {ballPositions.map((ball, index) => (
                        <div key={index} className={`ball-jar-study-mode ${ball.color}`} style={{ top: ball.top, left: ball.left, position: 'absolute' }}></div>
                    ))}
                </div>
            </div>
            <h3>{currentQuestion?.question}</h3>
            <div className="answers">
                {currentQuestion?.answers.map((answer, index) => (
                    <button key={index} onClick={() => !isCheckingAnswer && setSelectedAnswer(answer.text)} className={`answer-button ${selectedAnswer === answer.text ? 'selected' : ''} ${isCheckingAnswer && answer.isCorrect ? 'correct' : ''} ${isCheckingAnswer && selectedAnswer === answer.text && !answer.isCorrect ? 'incorrect' : ''}`} disabled={isCheckingAnswer}>{answer.text}</button>
                ))}
            </div>
            <button onClick={checkAnswer} disabled={isCheckingAnswer}>{LanguageDataJarStudyMode[language].checkAnswer}</button>
            <p>{showAnswerResult}</p>
            <p>{totalEarn}$</p>
            <p>{LanguageDataJarStudyMode[language].score} {score}</p>
        </div>
    );
};

export default JarColorPickStudyMode;
