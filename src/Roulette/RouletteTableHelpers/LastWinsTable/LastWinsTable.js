import React from 'react';
import './LastWinsTable.css';

const numberColors = {
    red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
    black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
};

const getNumberColor = (number) => {
    if (number === 0) return 'green';
    if (numberColors.red.includes(number)) return 'red';
    if (numberColors.black.includes(number)) return 'black';
    return 'default';
};

export const LastWinsTable = ({ lastWins, language }) => {
    const limitedWins = lastWins.slice(0, 10).reverse();
    const lastWinsText = language === 'en' ? 'Last Wins' : 'הזכיות האחרונות';

    return (
        <p className="last-wins-table">
            <ul>
                {lastWinsText}
                {limitedWins.map((win, index) => {
                    if (index === 0) {
                        return (
                            <li key={index}>
                                <strong></strong> <p style={{ backgroundColor: getNumberColor(win), color: "white" }}> {win}</p>
                                __
                            </li>
                        );
                    } else {
                        return (
                            <>
                                <hr key={`line-${index}`} />
                                <li key={index} style={{ backgroundColor: getNumberColor(win), color: 'white' }}>
                                    {win}
                                </li>
                            </>
                        );
                    }
                })}
            </ul>
        </p>
    );
};
