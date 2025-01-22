import Modal from "react-modal";
import '../../../../Styles/ModalStyles.css';
import {useState} from "react";

export const WinningProbabilityModal = ({ isOpen, onRequestClose, language }) => {
    const [page, setPage] = useState(1);

    const prevPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);

    const probabilityContent = {
        en: [
            {
                title: "Winning Probability Overview",
                content: `The total winning probability is the sum of the probabilities of all the possible bets. Here’s a breakdown of the individual bet types and their associated probabilities and payouts:`,
            },
            {
                title: "Single Number Bet",
                content: `A straight-up bet on a single number has a payout of 2600%. The probability of winning is 2.7%.`,
            },
            {
                title: "Odd/Even Bet",
                content: `Betting on Odd or Even has a payout of 100%. The probability of winning is 48.65%.`,
            },
            {
                title: "Red/Black Bet",
                content: `Betting on Red or Black also has a payout of 100%. The probability of winning is 48.65%.`,
            },
            {
                title: "Other Bets",
                content: `Other bets like 1st, 2nd, and 3rd columns, 1st, 2nd, and 3rd dozens, 19-36 and 1-18, straight-up, split, double-street, street, and corner bets also have specific probabilities and payouts.`,
            }
        ],
        he: [
            {
                title: "הסתברות לזכייה",
                content: `ההסתברות הכוללת לזכייה היא סכום ההסתברויות של כל ההימורים האפשריים. הנה פירוט של סוגי ההימורים השונים וההסתברויות והתשלומים שלהם:`,
            },
            {
                title: "הימור על מספר יחיד",
                content: `הימור ישיר על מספר יחיד משלם 2600%. ההסתברות לזכות היא 2.7%.`,
            },
            {
                title: "הימור זוגי/אי-זוגי",
                content: `הימור על זוגי או אי-זוגי משלם 100%. ההסתברות לזכות היא 48.65%.`,
            },
            {
                title: "הימור אדום/שחור",
                content: `הימור על אדום או שחור גם משלם 100%. ההסתברות לזכות היא 48.65%.`,
            },
            {
                title: "הימורים אחרים",
                content: `הימורים אחרים כמו עמודות 1, 2, 3, עשרות 1, 2, 3, 19-36 ו-1-18, הימור ישיר, הימור כפול, רחוב ופינתיים, יש להם הסתברויות ותשלומים ספציפיים.`,
            }
        ]
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="winning-probability-modal"
            overlayClassName="winning-probability-modal-overlay"
        >
            <div className="modal-content">
                <h2>{probabilityContent[language][page - 1].title}</h2>
                <p>{probabilityContent[language][page - 1].content}</p>
                <div className="modal-navigation">
                    <button
                        onClick={prevPage}
                        className="modal-nav-button"
                        disabled={page === 1}
                    >
                        ← {language === 'en' ? 'Previous' : 'הקודם'}
                    </button>
                    <button
                        onClick={nextPage}
                        className="modal-nav-button"
                        disabled={page === probabilityContent[language].length}
                    >
                        {language === 'en' ? 'Next' : 'הבא'} →
                    </button>
                </div>
                <button onClick={onRequestClose} className="close-button">X</button>
            </div>
        </Modal>
    );
};
