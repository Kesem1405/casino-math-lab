import React, { useState, useEffect, useRef } from 'react';
import { getRandomArrayItem } from './Helpers/getRandomArrayItem';

const WheelNumbers = () => {
    const [wheelNumbers, setWheelNumbers] = useState([]);

    useEffect(() => {
        const generateWheelNumbers = () => {
            const staticWheelNumbers = Array.from({ length: 36 }, (_, i) => `${i + 1}`);
            const randomNumbers = [];

            while (randomNumbers.length < staticWheelNumbers.length) {
                const availableNumbers = staticWheelNumbers.filter(
                    (number) => !randomNumbers.includes(number)
                );
                const randomNumber = getRandomArrayItem(availableNumbers);
                randomNumbers.push(randomNumber);
            }

            const finalArray = [];
            randomNumbers.forEach((number, index) => {
                if (index === 18) {
                    finalArray.push('00');
                }
                finalArray.push(number);
            });
            finalArray.push('0');

            return finalArray;
        };

        const numbers = generateWheelNumbers();
        setWheelNumbers(numbers);
    }, []); // Run once on component mount

    return wheelNumbers;
};

const RouletteWheel = () => {
    const wheelNumbers = WheelNumbers(); // Use WheelNumbers to get the wheel numbers
    const innerRef = useRef(null);

    useEffect(() => {
        // Assuming you need to handle the spinning and animation logic
        const currentInnerRef = innerRef.current;
        if (currentInnerRef === null) return;

        // Animation logic can go here

    }, [wheelNumbers]);

    return (
        <div className="roulette-wheel-container">
            <div className="roulette-wheel-plate">
                <ul className="roulette-wheel-inner" ref={innerRef}>
                    {wheelNumbers.map((number) => (
                        <li key={`wheel-${number}`} className="roulette-wheel-bet-number">
                            <label htmlFor={`wheel-pit-${number}`}>
                                <input
                                    type="radio"
                                    name="pit"
                                    id={`wheel-pit-${number}`}
                                    value={number}
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
