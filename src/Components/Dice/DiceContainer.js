import React from 'react';
import '../../Styles/Dice.css';

const Dice = ({ value, rolling }) => {
    return (
        <div className={`dice ${rolling ? 'rolling' : ''}`} data-side={value}>
            <div className="side front">
                <div className="dot center"></div>
            </div>
            <div className="side left">
                <div className="dot top-left"></div>
                <div className="dot bottom-right"></div>
            </div>
            <div className="side back">
                <div className="dot top-left"></div>
                <div className="dot center"></div>
                <div className="dot bottom-right"></div>
            </div>
            <div className="side right">
                <div className="dot top-left"></div>
                <div className="dot top-right"></div>
                <div className="dot bottom-left"></div>
                <div className="dot bottom-right"></div>
            </div>
            <div className="side bottom">
                <div className="dot top-left"></div>
                <div className="dot top-right"></div>
                <div className="dot center"></div>
                <div className="dot bottom-left"></div>
                <div className="dot bottom-right"></div>
            </div>
            <div className="side top">
                <div className="dot top-left"></div>
                <div className="dot top-right"></div>
                <div className="dot middle-left"></div>
                <div className="dot middle-right"></div>
                <div className="dot bottom-left"></div>
                <div className="dot bottom-right"></div>
            </div>
        </div>
    );
};

const DiceContainer = ({ dice1, dice2, rolling }) => {
    return (
        <div className="dice-container">
            <Dice value={dice1} rolling={rolling} />
            <Dice value={dice2} rolling={rolling} />
        </div>
    );
};

export default DiceContainer;