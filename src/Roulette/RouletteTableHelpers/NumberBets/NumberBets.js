import React, { useContext } from 'react';
import  Chip  from '../Chip/Chip';
import { RouletteTableContext } from '../RouletteTableContext';
import config from '../../Helpers/table.json';
import {
    shouldRenderBottomCatcher,
    shouldRenderChip,
    shouldRenderCornerBetCatcher,
    shouldRenderRightCatcher,
    shouldRenderSixLineBetCatcher,
    shouldRenderTopCatcher,
    shouldRenderTopRightDoubleStreetCatcher,
    shouldRenderTopStreetCatcher,
    findChipIcon,
} from '../configs';
import { ACTION_TYPES } from '../Constants';

const NumberBets = () => {
    const { onBetCatcherHover, bets } = useContext(RouletteTableContext);

    return (
        <>
            {Array.from({ length: 36 }, (_, i) => i + 1).map((number) => (
                <div
                    key={number}
                    data-action={ACTION_TYPES.STRAIGHT_UP}
                    data-bet={`${number}`}
                    className={config.RED.includes(number) ? 'red-item' : 'black-item'}
                >
                    {/* start chip */}
                    {shouldRenderCornerBetCatcher(number) && (
                        <>
                            <div
                                className="corner-bet-catcher"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.CORNER}
                                data-highlight={`${number}-${number + 1}-${number + 3}-${number + 4}`}
                            />
                            {shouldRenderChip(
                                `${number}-${number + 1}-${number + 3}-${number + 4}`,
                                bets,
                            ) && (
                                <Chip
                                    position="right-top"
                                    icon={findChipIcon(
                                        `${number}-${number + 1}-${number + 3}-${number + 4}`,
                                        bets,
                                    )}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    {/* start chip */}
                    {shouldRenderTopRightDoubleStreetCatcher(number) && (
                        <>
                            <div
                                className="double-street-catcher-top-right"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.DOUBLE_STREET}
                                data-highlight={`${number}-${number - 1}-${number - 2}-${number + 3}-${number + 2}-${number + 1}`}
                            />
                            {shouldRenderChip(
                                `${number}-${number - 1}-${number - 2}-${number + 3}-${number + 2}-${number + 1}`,
                                bets,
                            ) && (
                                <Chip
                                    position="right-top"
                                    icon={findChipIcon(
                                        `${number}-${number - 1}-${number - 2}-${number + 3}-${number + 2}-${number + 1}`,
                                        bets,
                                    )}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    {/* start chip */}
                    {shouldRenderTopStreetCatcher(number) && (
                        <>
                            <div
                                className="split-up-bet-catcher-top"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.STREET}
                                data-highlight={`${number}-${number - 1}-${number - 2}`}
                            />
                            {shouldRenderChip(`${number}-${number - 1}-${number - 2}`, bets) && (
                                <Chip
                                    position="center-top"
                                    icon={findChipIcon(
                                        `${number}-${number - 1}-${number - 2}`,
                                        bets,
                                    )}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    {/* start chip for special bet 0-1-2 or 00-2-3 */}
                    {(number === 1 || number === 2) && (
                        <>
                            <div
                                className="spleet-bet-catcher"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.STREET}
                                data-highlight={`${number === 1 ? '0-1-2' : '00-2-3'}`}
                                style={{ zIndex: 12 }}
                            />
                            {shouldRenderChip(
                                `${number === 1 ? '0-1-2' : '00-2-3'}`,
                                bets,
                            ) && (
                                <Chip
                                    position="left-top"
                                    icon={findChipIcon(
                                        `${number === 1 ? '0-1-2' : '00-2-3'}`,
                                        bets,
                                    )}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    {/* start chip */}
                    {shouldRenderTopCatcher(number) && (
                        <>
                            <div
                                className="split-up-bet-catcher-top"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.SPLIT}
                                data-highlight={`${number}-${number + 1}`}
                            />
                            {shouldRenderChip(`${number}-${number + 1}`, bets) && (
                                <Chip
                                    position="center-top"
                                    icon={findChipIcon(`${number}-${number + 1}`, bets)}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    <div className="value">{number}</div>
                    {shouldRenderChip(`${number}`, bets) && (
                        <Chip position="center" icon={findChipIcon(`${number}`, bets)} />
                    )}

                    {/* start chip */}
                    {shouldRenderRightCatcher(number) && (
                        <>
                            <div
                                className="split-up-bet-catcher-right"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.SPLIT}
                                data-highlight={`${number}-${number + 3}`}
                            />
                            {shouldRenderChip(`${number}-${number + 3}`, bets) && (
                                <Chip
                                    position="right-center"
                                    icon={findChipIcon(`${number}-${number + 3}`, bets)}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    {/* start chip */}
                    {shouldRenderBottomCatcher(number) && (
                        <>
                            <div
                                className="split-up-bet-catcher-bottom"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.STREET}
                                data-highlight={`${number}-${number + 1}-${number + 2}`}
                            />
                            {shouldRenderChip(
                                `${number}-${number + 1}-${number + 2}`,
                                bets,
                            ) && (
                                <Chip
                                    position="center-bottom"
                                    icon={findChipIcon(
                                        `${number}-${number + 1}-${number + 2}`,
                                        bets,
                                    )}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}

                    {/* start chip */}
                    {shouldRenderSixLineBetCatcher(number) && (
                        <>
                            <div
                                className="six-lines-catcher"
                                onMouseEnter={onBetCatcherHover}
                                onMouseLeave={onBetCatcherHover}
                                data-action={ACTION_TYPES.DOUBLE_STREET}
                                data-highlight={`${number}-${number + 1}-${number + 2}-${number + 3}-${number + 4}-${number + 5}`}
                            />
                            {shouldRenderChip(
                                `${number}-${number + 1}-${number + 2}-${number + 3}-${number + 4}-${number + 5}`,
                                bets,
                            ) && (
                                <Chip
                                    position="right-bottom"
                                    icon={findChipIcon(
                                        `${number}-${number + 1}-${number + 2}-${number + 3}-${number + 4}-${number + 5}`,
                                        bets,
                                    )}
                                />
                            )}
                        </>
                    )}
                    {/* end chip */}
                </div>
            ))}
        </>
    );
};

export default NumberBets;
