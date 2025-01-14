import React from "react";
import { Link } from "react-router-dom";
import './GameCards.css';

const GameCardView = ({ game, language }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 my-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={game.img} className="card-img-top" alt={game.name[language]} />
                <div className="card-body">
                    <h5 className="card-title">{game.name[language]}</h5>
                    <p className="card-text">{game.description[language]}</p>
                    <Link to={game.route} className="btn btn-primary">
                        {game.buttonText[language]}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GameCardView;
