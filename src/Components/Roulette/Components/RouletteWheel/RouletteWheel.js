import React, { useEffect, useState, useRef } from 'react';
import config from '../../Helpers/table.json';
import { getWheelNumbers } from '../../RouletteTableHelpers/configs';
import { classNames } from '../../Helpers/ClassNames';

import '../../../../Styles/RouletteWheel.css';

// Define the getColor function
const getColor = (number) => {
    const redNumbers = ['1', '3', '5', '7', '9', '12', '14', '16', '18', '19', '21', '23', '25', '27', '30', '32', '34', '36'];
    const blackNumbers = ['2', '4', '6', '8', '10', '11', '13', '15', '17', '20', '22', '24', '26', '28', '29', '31', '33', '35'];

    if (redNumbers.includes(number)) return 'red';
    if (blackNumbers.includes(number)) return 'black';
    return 'green'; // For '0' and '00'
};

export const RouletteWheel = ({
                                  start,
                                  winningBet,
                                  onSpinningEnd,
                                  withAnimation,
                                  addRest,
                                  winningNumber,
                              }) => {
    const [wheelNumbers, setWheelNumbers] = useState([]);
    const [ballSpinPosition, setBallSpinPosition] = useState(null);
    const [currentWinningNumber, setCurrentWinningNumber] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    const innerRef = useRef(null);

    useEffect(() => {
        setWheelNumbers(getWheelNumbers());
    }, []);

    useEffect(() => {
        const currentInnerRef = innerRef.current;

        if (winningBet === '-1' || currentInnerRef === null || start === false || isSpinning) {
            return;
        }

        if (addRest === true) {
            currentInnerRef.classList.remove('rest');
        }

        currentInnerRef.removeAttribute('data-spintoindex');

        const betIndex = wheelNumbers.indexOf(winningBet);

        setTimeout(() => {
            currentInnerRef.setAttribute('data-spintoindex', `${betIndex}`);
            setBallSpinPosition(betIndex);
            setIsSpinning(true);
            setTimeout(() => {
                if (addRest === true) {
                    currentInnerRef.classList.add('rest');
                }
                setCurrentWinningNumber(winningNumber);
                setIsSpinning(false);
                onSpinningEnd?.();
                setTimeout(() => {
                    setIsBlinking(true);
                }, 1000);
            }, 9000);
        }, 100);
    }, [winningBet, start]);

    return (
        <div className="roulette-wheel-container">
            <div
                className={classNames('roulette-wheel-plate', {
                    'with-animation': withAnimation,
                })}
            >
                <ul className="roulette-wheel-inner" ref={innerRef}>
                    {wheelNumbers.map((number, index) => {
                        const isNumberBlinking = isBlinking && (ballSpinPosition === index || number === currentWinningNumber);
                        const numberColor = getColor(number); // Get the color for the number
                        const numberStr = String(number); // Convert to string

                        return (
                            <li
                                key={`wheel-${numberStr}`}
                                data-bet={numberStr}
                                className={`roulette-wheel-bet-number ${isNumberBlinking ? 'blinking' : ''} ${numberColor}`}
                            >
                                <label htmlFor={`wheel-pit-${number}`}>
                                    <input
                                        type="radio"
                                        name="pit"
                                        id={`wheel-pit-${number}`}
                                        defaultValue={numberStr}
                                    />
                                    <span className={`roulette-wheel-pit ${numberColor}`}>{numberStr}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

RouletteWheel.defaultProps = {
    onSpinningEnd: () => undefined,
    withAnimation: true,
    addRest: true,
};
export default RouletteWheel;
