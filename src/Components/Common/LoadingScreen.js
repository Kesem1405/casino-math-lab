import React from "react";

const LoadingScreen = ({ logo }) => {
    return (
        <div className="loading-screen">
            <img src={logo} alt="Loading Logo" className="loading-logo" />
            <p>Loading...</p>
        </div>
    );
};
export default LoadingScreen;
