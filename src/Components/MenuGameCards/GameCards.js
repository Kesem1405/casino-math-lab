import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/GameCards.css";

const GameCards = ({ games, language, user }) => {
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
                        {user ? (
                            // If user is logged in, enable the button
                            <Link to={game.route} className="btn btn-primary">
                                {game.buttonText[language]}
                            </Link>
                        ) : (
                            // If user is not logged in, disable the button and show a message
                            <button
                                className="btn btn-primary disabled"
                                disabled
                                title="Please log in to play"
                            >
                                {game.buttonText[language]}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameCards;