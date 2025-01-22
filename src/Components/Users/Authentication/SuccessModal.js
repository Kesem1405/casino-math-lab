import React from "react";
import '../../../Styles/AuthenticationStyles.css'

const SuccessModal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h3>{message}</h3>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;