import React, { useContext } from 'react';
import type { FC } from 'react';

import  Chip  from '../Chip/Chip';
import { ACTION_TYPES } from '../Constants';
import { findChipIcon, shouldRenderChip } from '../configs';
import { RouletteTableContext } from '../RouletteTableContext';

export const ZeroBets: FC = () => {
    const { onBetCatcherHover, bets } = useContext(RouletteTableContext);

    return (
        <>
            {['0','00'].map((number) => (
                <div
                    key={`zero-item-${number}`}
                    className="zero-item"
                    data-action={ACTION_TYPES[number]}
                    data-bet={number}
                >
                    {/* Start Chip for '0' and  */}
                    {number === 1 && (
                        <>
                            <div
                                className="spleet-bet-catcher"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.STREET}
                                data-highlight="0-00-2"
                                style={{ zIndex: 12 }}
                            />
                            {shouldRenderChip("0-00-2", bets) && (
                                <Chip
                                    position="left-top"
                                    icon={findChipIcon("0-00-2", bets)}
                                />
                            )}
                        </>
                    )}

                    {/* Start Corner Bet Catcher */}
                    <div
                        className={`corner-bet-catcher ${number === '0' ? 'bottom' : ''}`}
                        onMouseEnter={onBetCatcherHover}
                        onMouseLeave={onBetCatcherHover}
                        data-action={ACTION_TYPES.BASKET_US}
                        data-highlight={number === '0' ? '0-1-2-3' : '0-1-2-3'}
                        style={{ zIndex: 14 }}
                    />
                    {shouldRenderChip(number === '0' ? '0-1-2-3' : '0-1-2-3', bets) && (
                        <Chip
                            position={number === '0' ? 'right-bottom' : 'right-top'}
                            icon={findChipIcon(number === '0' ? '0-1-2-3' : '0-1-2-3', bets)}
                        />
                    )}

                    {/* Start Split Bet Catchers */}
                    {number === '0' && (
                        <>
                            <div
                                className="split-up-bet-catcher-top"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.ROW}
                                data-highlight="0-00"
                            />
                            {shouldRenderChip('0-00', bets) && (
                                <Chip position="center-top" icon={findChipIcon('0-00', bets)} />
                            )}
                        </>
                    )}
                    {/* End Split Bet Catcher */}

                    {/* Split Bet Catcher for Right side */}
                    <div
                        className="split-up-bet-catcher-right"
                        onMouseEnter={onBetCatcherHover}
                        onMouseLeave={onBetCatcherHover}
                        data-action={ACTION_TYPES.SPLIT}
                        data-highlight={`${number}-${number === '0' ? 2 : 3}`}

                    />
                    {shouldRenderChip(`${number}-${number === '0' ? 2 : 3}`, bets) && (
                        <Chip
                            position={number === '0' ? 'right-top-with-no-offset' : 'right-top-with-offset'}
                            icon={findChipIcon(`${number}-${number === '0' ? 2 : 3}`, bets)}
                        />
                    )}

                    {/* Start Split Bet Catcher for Bottom */}
                    <div
                        className="split-up-bet-catcher-right"
                        onMouseEnter={onBetCatcherHover}
                        onMouseLeave={onBetCatcherHover}
                        data-action={ACTION_TYPES.SPLIT}
                        data-highlight={`${number}-${number === '0' ? 1 : 2}`}
                        style={{ height: 85, top: 'auto', bottom: 0 }}
                    />
                    {shouldRenderChip(`${number}-${number === '0' ? 1 : 2}`, bets) && (
                        <Chip
                            position={number === '0' ? 'right-bottom-with-offset' : 'right-bottom-with-no-offset'}
                            icon={findChipIcon(`${number}-${number === '0' ? 1 : 2}`, bets)}
                        />
                    )}
                    {/* End Split Bet Catcher */}

                    {/* Basket Catcher for 0/00 */}
                    <div
                        className={number === '0' ? 'basket-catcher-bottom' : 'basket-catcher-top'}
                        onMouseEnter={onBetCatcherHover}
                        onMouseLeave={onBetCatcherHover}
                        data-action={ACTION_TYPES.BASKET_US}
                        data-highlight={`${number === '0' ? '0-00' : '00-0'}-1-2-3`}
                        style={{ left: -3 }}
                    />
                    {/* End Basket Catcher */}

                    {/* Display Bet Number */}
                    <div className="value">{number}</div>

                    {/* Render chip for the selected number */}
                    {shouldRenderChip(number, bets) && (
                        <Chip position="center" icon={findChipIcon(number, bets)} />
                    )}
                </div>
            ))}
        </>
    );
};
