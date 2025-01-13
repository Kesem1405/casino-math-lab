import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { ZeroBets } from '../ZeroBets';
import NumberBets from '../NumberBets/NumberBets';
import Columns from '../Column/Column';
import Dozens from '../Dozens/Dozens';
import { BottomBets } from '../BottomBets';
import { RouletteTableContext } from '../RouletteTableContext';
import { ACTION_TYPES } from '../Constants';
import config from '../../Helpers/table.json';
import { hasOwn } from '../utils';
import { classNames } from '../../Helpers/ClassNames';
import './RouletteTable.css';

export const RouletteTable = ({ onBet, bets, isDebug = false, isRouletteWheelSpinning , language}) => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (!tableRef.current) return;

        const listener = (event) => {
            const highlightElement = event.target.closest('[data-highlight]');
            const highlightData = highlightElement?.dataset?.highlight;

            const betElement = event.target.closest('[data-bet]');
            const betData = betElement?.dataset?.bet;

            const action = (highlightElement ?? betElement)?.dataset?.action;
            if (!highlightData && !betData) {
                console.error('No data in [data-bet] or [data-highlight]');
                return;
            }

            if (!action) {
                console.error('Action is undefined');
                return;
            }

            if (!Object.keys(ACTION_TYPES).includes(action)) {
                console.error('Unsupported action', action);
                return;
            }

            const payloadData = highlightData ?? betData;

            const getPayload = () => {
                const firstId = payloadData.split('-')[0];
                if (hasOwn(config, firstId)) {
                    return config[firstId].map((item) => `${item}`);
                }
                return payloadData.split('-').map((item) => item);
            };

            const payload = getPayload();

            onBet({
                bet: action,
                payload,
                id: payloadData,
            });
        };

        tableRef.current.addEventListener('click', listener);

        return () => tableRef.current?.removeEventListener('click', listener);
    }, [onBet]);

    const doHighlight = (betId) => {
        if (!tableRef.current) return;

        const hoverClass = 'item-hover';
        const element = tableRef.current.querySelector(`[data-bet="${betId}"]`);
        element?.classList.toggle(hoverClass);
    };

    const handleBetCatcherHover = useCallback(
        (event) => {
            const highlightData = event.currentTarget.dataset.highlight;
            const toHighlight = highlightData?.split('-');

            if (!toHighlight?.[0]) return;

            if (config[toHighlight[0]]) {
                doHighlight(toHighlight[0]);
                config[toHighlight[0]].forEach((bet) => doHighlight(`${bet}`));
                return;
            }

            toHighlight.forEach((element) => doHighlight(element));
        },
        [],
    );

    const contextValue = useMemo(
        () => ({ bets, onBetCatcherHover: handleBetCatcherHover }),
        [bets, handleBetCatcherHover],
    );

    return (
        <RouletteTableContext.Provider value={contextValue}>
            <div className={classNames('roulette-table-container', { debug: isDebug })} ref={tableRef}>
                <section className="roulette-table-container-first">
                    <ZeroBets isRouletteWheelSpinning={isRouletteWheelSpinning} />
                    <NumberBets isRouletteWheelSpinning={isRouletteWheelSpinning} />
                    <Columns isRouletteWheelSpinning={isRouletteWheelSpinning} />
                </section>
                <section className="roulette-table-container-second">
                    <Dozens isRouletteWheelSpinning={isRouletteWheelSpinning} />
                </section>
                <div className="roulette-table-container-third">
                    <BottomBets language={language} isRouletteWheelSpinning={isRouletteWheelSpinning} />
                </div>
            </div>
        </RouletteTableContext.Provider>
    );
};

RouletteTable.defaultProps = {
    isDebug: false,
};
