import React from 'react';
import './GameCards.css';

const GameCards = ({ games, language }) => {
    return (
        <div className="game-cards-grid">
            {games.map((game, index) => (
                <div key={index} className="game-card">
                    <div className="card-img-container">
                        {/* Static Image */}
                        <img
                            src={game.staticImg}
                            alt={game.name[language]}
                            className="static-img"
                        />
                        {/* GIF */}
                        <img
                            src={game.gifImg}
                            alt={`${game.name[language]} animation`}
                            className="gif-img"
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{game.name[language]}</h5>
                        <p className="card-text">{game.description[language]}</p>
                        <a href={game.route} className="btn btn-primary">
                            {game.buttonText[language]}
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameCards;
