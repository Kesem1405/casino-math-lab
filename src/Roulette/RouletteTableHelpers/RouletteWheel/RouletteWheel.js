import React, { useEffect, useState, useRef } from 'react';
import { getWheelNumbers } from '../configs';
import { classNames } from '../../Helpers/ClassNames';

import './RouletteWheel.css';

const RouletteWheel = ({
                           start,
                           winningBet,
                           onSpinningEnd = () => undefined,
                           withAnimation = true,
                           addRest = true,
                       }) => {
    const [wheelNumbers, setWheelNumbers] = useState([]);
    const innerRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [ballSpinPosition, setBallSpinPosition] = useState(null);

    useEffect(() => {
        setWheelNumbers(getWheelNumbers());
    }, []);

    useEffect(() => {
        const currentInnerRef = innerRef.current;

        if (winningBet === '-1' || !currentInnerRef || !start || isSpinning) {
            return;
        }

        if (addRest) {
            currentInnerRef.classList.remove('rest');
        }

        currentInnerRef.removeAttribute('data-spintoindex');

        const betIndex = wheelNumbers.indexOf(winningBet);

        setIsSpinning(true); // Mark the wheel as spinning

        setTimeout(() => {
            currentInnerRef.setAttribute('data-spintoindex', `${betIndex}`);
            setBallSpinPosition(betIndex); // Set the ball's final position

            setTimeout(() => {
                if (addRest) {
                    currentInnerRef.classList.add('rest');
                }

                setIsSpinning(false); // Mark the wheel as not spinning
                onSpinningEnd(); // Notify that the spin ended
            }, 9000); // Simulate the time it takes for the wheel to spin
        }, 100);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winningBet, start, isSpinning]);

    return (
        <div className="roulette-wheel-container">
            <div
                className={classNames('roulette-wheel-plate', {
                    'with-animation': withAnimation && isSpinning,
                })}
            >
                <ul className="roulette-wheel-inner" ref={innerRef}>
                    {wheelNumbers.map((number, index) => (
                        <li
                            key={`wheel-${number}`}
                            data-bet={number}
                            className={`roulette-wheel-bet-number ${
                                ballSpinPosition === index ? 'ball-position' : ''
                            }`}
                        >
                            <label htmlFor={`wheel-pit-${number}`}>
                                <input
                                    type="radio"
                                    name="pit"
                                    id={`wheel-pit-${number}`}
                                    defaultValue={number}
                                />
                                <span className="roulette-wheel-pit">{number}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RouletteWheel;
