import React, {useContext, useEffect} from 'react';
import Chip from '../Chip/Chip';
import { RouletteTableContext } from '../RouletteTableContext';
import { shouldRenderChip, findChipIcon } from '../configs';
import { ACTION_TYPES } from '../Constants';

export const BottomBets = ({ language }) => {
    const { onBetCatcherHover, bets } = useContext(RouletteTableContext);

    useEffect(() => {
        console.log('BottomBets rendered');
    }, [language]);

    return (
        <>
            <div
                className="outside-section"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES['1_TO_18']}
                data-bet={ACTION_TYPES['1_TO_18']}
                data-highlight={ACTION_TYPES['1_TO_18']}
            >
                <div>1-18</div>
                {shouldRenderChip(ACTION_TYPES['1_TO_18'], bets) && (
                    <Chip
                        position="center"
                        icon={findChipIcon(ACTION_TYPES['1_TO_18'], bets)}
                    />
                )}
            </div>
            <div
                className="outside-section"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.EVEN}
                data-bet={ACTION_TYPES.EVEN}
                data-highlight={ACTION_TYPES.EVEN}
            >
                <div>
                    {language === 'he' ? 'זוגי' : 'EVEN'}
                </div>
                {shouldRenderChip(ACTION_TYPES.EVEN, bets) && (
                    <Chip
                        position="center"
                        icon={findChipIcon(ACTION_TYPES.EVEN, bets)}
                    />
                )}
            </div>
            <div
                className="outside-section"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.RED}
                data-bet={ACTION_TYPES.RED}
                data-highlight={ACTION_TYPES.RED}
            >
                <div>
                    <div className="rhomb-red" />
                    {shouldRenderChip(ACTION_TYPES.RED, bets) && (
                        <Chip
                            position="center"
                            icon={findChipIcon(ACTION_TYPES.RED, bets)}
                        />
                    )}
                </div>
            </div>
            <div
                className="outside-section"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.BLACK}
                data-bet={ACTION_TYPES.BLACK}
                data-highlight={ACTION_TYPES.BLACK}
            >
                <div>
                    <div className="rhomb-black" />
                    {shouldRenderChip(ACTION_TYPES.BLACK, bets) && (
                        <Chip
                            position="center"
                            icon={findChipIcon(ACTION_TYPES.BLACK, bets)}
                        />
                    )}
                </div>
            </div>
            <div
                className="outside-section"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.ODD}
                data-bet={ACTION_TYPES.ODD}
                data-highlight={ACTION_TYPES.ODD}
            >
                <div>
                    {language === 'he' ? 'אי-זוגי' : 'ODD'}
                </div>
                {shouldRenderChip(ACTION_TYPES.ODD, bets) && (
                    <Chip
                        position="center"
                        icon={findChipIcon(ACTION_TYPES.ODD, bets)}
                    />
                )}
            </div>
            <div
                className="outside-section"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES['19_TO_36']}
                data-bet={ACTION_TYPES['19_TO_36']}
                data-highlight={ACTION_TYPES['19_TO_36']}
            >
                <div>19-36</div>
                {shouldRenderChip(ACTION_TYPES['19_TO_36'], bets) && (
                    <Chip
                        position="center"
                        icon={findChipIcon(ACTION_TYPES['19_TO_36'], bets)}
                    />
                )}
            </div>
        </>
    );
};
