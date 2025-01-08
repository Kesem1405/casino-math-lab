import { getRandomArrayItem } from '../../../Helpers/getRandomArrayItem';

export const getWheelNumbers = () => {
    // 1st step
    const staticWheelNumbers = []; // without 0 and 00

    for (let i = 1; i <= 36; i += 1) {
        staticWheelNumbers.push(`${i}`);
    }

    // 2nd step
    const randomNumbers = [];

    for (let i = 0; i < staticWheelNumbers.length; i += 1) {
        const availableNumbers = staticWheelNumbers.filter(
            (number) => randomNumbers.includes(number) === false,
        );
        const randomNumber = getRandomArrayItem(availableNumbers);

        randomNumbers.push(randomNumber);
    }

    // 3rd step
    const finalArray = [];

    randomNumbers.forEach((number, index) => {
        finalArray.push(number);
    });

    finalArray.push('0');

    return finalArray;
};
