import Modal from "react-modal";
import '../ModalStyles.css';
import {useState} from "react";

export const RouletteGameInfoModal = ({ isOpen, onRequestClose, language }) => {
    const [page, setPage] = useState(1);

    const prevPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);

    const gameInfoContent = {
        en: [
            {
                title: "About Roulette",
                content: `Roulette is a casino game where players bet on where a ball will land on a spinning wheel. There are many betting options, including betting on a color, odd/even, or specific numbers. The game features two types of roulette: European (with one zero) and American (with two zeros). The payout varies based on the bet type and the odds of winning.`,
            },
            {
                title: "How Probabilities are Calculated",
                content: `The calculation of probabilities in roulette depends on the betting options. For example, betting on red or black gives a nearly 50% chance of winning, but the presence of the zero(s) makes it slightly less than 50%. Other bets like straight-up bets on numbers have lower probabilities but higher payouts.`
            }
        ],
        he: [
            {
                title: "על הרולטה",
                content: `רולטה היא משחק קזינו שבו השחקנים מהמרים היכן הכדור ינחת על גלגל המסתובב. ישנן אפשרויות הימור רבות, כולל הימור על צבע, זוגי/אי-זוגי או מספרים מסוימים. המשחק כולל שני סוגים של רולטה: אירופאית (עם אפס אחד) ואמריקאית (עם שני אפסים). התשלום משתנה לפי סוג ההימור והסיכויים לזכות.`,
            },
            {
                title: "איך מחשבים את ההסתברויות",
                content: `החישוב של ההסתברויות ברולטה תלוי באופציות ההימור. למשל, הימור על אדום או שחור נותן סיכוי כמעט 50% לזכות, אך נוכחות האפסים מקטינה אותו במעט. הימורים אחרים, כמו הימור ישיר על מספרים, יש להם סיכויים נמוכים יותר אך תשלומים גבוהים יותר.`
            }
        ]
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="roulette-info-modal"
            overlayClassName="roulette-info-modal-overlay"
        >
            <div className="modal-content">
                <h2>{gameInfoContent[language][page - 1].title}</h2>
                <p>{gameInfoContent[language][page - 1].content}</p>
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
                        disabled={page === 2}
                    >
                        {language === 'en' ? 'Next' : 'הבא'} →
                    </button>
                </div>
                <button onClick={onRequestClose} className="close-button">X</button>
            </div>
        </Modal>
    );
};
