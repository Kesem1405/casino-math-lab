import React, { useEffect, useState, useRef } from 'react';
import { getWheelNumbers } from './RouletteTableHelpers/configs';
import { classNames } from './Helpers/ClassNames';

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

    useEffect(() => {
        setWheelNumbers(getWheelNumbers());
    }, []);

    useEffect(() => {
        const currentInnerRef = innerRef.current;

        if (winningBet === '-1' || !currentInnerRef || !start) {
            return;
        }

        if (addRest) {
            currentInnerRef.classList.remove('rest');
        }

        currentInnerRef.removeAttribute('data-spintoindex');

        const betIndex = wheelNumbers.indexOf(winningBet);

        setTimeout(() => {
            currentInnerRef.setAttribute('data-spintoindex', `${betIndex}`);

            setTimeout(() => {
                if (addRest) {
                    currentInnerRef.classList.add('rest');
                }

                onSpinningEnd();
            }, 9000);
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winningBet, start]);

    return (
        <div className="roulette-wheel-container">
            <div
                className={classNames('roulette-wheel-plate', {
                    'with-animation': withAnimation,
                })}
            >
                <ul className="roulette-wheel-inner" ref={innerRef}>
                    {wheelNumbers.map((number) => (
                        <li
                            key={`wheel-${number}`}
                            data-bet={number}
                            className="roulette-wheel-bet-number"
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
