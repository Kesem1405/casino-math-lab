import { useState, useEffect } from 'react';
import { getRandomArrayItem } from './getRandomArrayItem';

const WheelNumbers = () => {
    const [wheelNumbers, setWheelNumbers] = useState([]);

    useEffect(() => {
        const generateWheelNumbers = () => {
            const staticWheelNumbers = Array.from({ length: 36 }, (_, i) => `${i + 1}`);

            // Step 2: Shuffle the numbers randomly
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
    }, []); // Only run once

    return wheelNumbers;
};

export default WheelNumbers;
