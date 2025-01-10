import Modal from "react-modal";
import '../ModalStyles.css';


export const WinningProbabilityModal = ({ isOpen, onRequestClose }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="winning-probability-modal"
        overlayClassName="winning-probability-modal-overlay"
    >
        <div className="modal-content">
            <h2>Winning Probability Calculation</h2>
            <p>
                The total winning probability is the sum of the probabilities of all the possible bets. Here’s a breakdown of the individual bet types and their associated probabilities and payouts:
            </p>
            <table>
                <thead>
                <tr>
                    <th>Bet Type</th>
                    <th>Payout (%)</th>
                    <th>Probability (%)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Red/Black</td>
                    <td>100%</td>
                    <td>48.65%</td>
                </tr>
                <tr>
                    <td>Even/Odd</td>
                    <td>100%</td>
                    <td>48.65%</td>
                </tr>
                <tr>
                    <td>Straight Up (Single Number)</td>
                    <td>2600%</td>
                    <td>2.70%</td>
                </tr>
                </tbody>
            </table>
            <button onClick={onRequestClose} className="close-button">Close</button>
        </div>
    </Modal>
);
