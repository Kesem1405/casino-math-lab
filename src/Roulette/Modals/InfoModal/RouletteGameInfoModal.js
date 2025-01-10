import Modal from "react-modal";
import '../ModalStyles.css';

export const RouletteGameInfoModal = ({ isOpen, onRequestClose }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="roulette-info-modal"
        overlayClassName="roulette-info-modal-overlay"
    >
        <div className="modal-content">
            <h2>About Roulette</h2>
            <p>
                Roulette is a casino game where players bet on where a ball will land on a spinning wheel.
                There are many betting options, including betting on a color, odd/even, or specific numbers.
                The game features two types of roulette: European (with one zero) and American (with two zeros).
                The payout varies based on the bet type and the odds of winning.
            </p>
            <button onClick={onRequestClose} className="close-button">X</button>
        </div>
    </Modal>
);