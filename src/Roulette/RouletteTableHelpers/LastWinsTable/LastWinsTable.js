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

export const LastWinsTable = ({ lastWins }) => {
    return (
        <div className="last-wins-table">
            <h2>Last Winning Numbers</h2>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Winning Number</th>
                </tr>
                </thead>
                <tbody>
                {lastWins.map((win, index) => (
                    <tr key={index} style={{ backgroundColor: getNumberColor(win) }}>
                        <td>{index + 1}</td>
                        <td>{win}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
