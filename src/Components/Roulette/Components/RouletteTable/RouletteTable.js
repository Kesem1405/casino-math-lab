import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { ZeroBets } from '../../RouletteTableHelpers/ZeroBets';
import NumberBets from '../../RouletteTableHelpers/NumberBets/NumberBets';
import Columns from '../../RouletteTableHelpers/Column/Column';
import Dozens from '../../RouletteTableHelpers/Dozens/Dozens';
import { BottomBets } from '../../RouletteTableHelpers/BottomBets';
import { RouletteTableContext } from '../../RouletteTableHelpers/RouletteTableContext';
import { ACTION_TYPES } from '../../RouletteTableHelpers/Constants';
import config from '../../Helpers/table.json';
import { hasOwn } from '../../RouletteTableHelpers/utils';
import { classNames } from '../../Helpers/ClassNames';
import '../../../../Styles/RouletteTable.css';

export const RouletteTable = ({ onBet, bets, isDebug = false, language }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (!tableRef.current) {
            return;
        }

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

            const isActionSupported = Object.keys(ACTION_TYPES).includes(action);

            if (!isActionSupported) {
                console.error('Unsupported action', action);
                return;
            }

            /* Checks are done */

            const payloadData = highlightData ?? betData;

            const getPayload = () => {
                const firstId = payloadData.split('-')[0];

                const isPayloadInConfig = hasOwn(config, firstId);

                if (isPayloadInConfig) {
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

        const tableRefCurrent = tableRef.current;

        return () => {
            tableRefCurrent?.removeEventListener('click', listener);
        };
    }, [onBet]);

    const doHighlight = (betId) => {
        if (!tableRef.current) {
            return;
        }

        const hoverClass = 'item-hover';

        const element = tableRef.current.querySelector(`[data-bet="${betId}"]`);

        if (element) {
            element.classList.toggle(hoverClass);
        }
    };

    const handleBetCatcherHover = useCallback((event) => {
        const highlightData = event.currentTarget.dataset.highlight;
        const toHighlight = highlightData?.split('-');

        if (!toHighlight?.[0]) {
            return;
        }

        const isFromConfig = Object.keys(config).includes(toHighlight[0]);

        if (isFromConfig) {
            doHighlight(toHighlight[0]);

            if (!config[toHighlight[0]]) {
                console.error('Config does not contain the key', toHighlight[0]);
                return;
            }

            config[toHighlight[0]].forEach((bet) => doHighlight(`${bet}`));

            return;
        }

        toHighlight.forEach((element) => {
            doHighlight(element);
        });
    }, []);

    const contextValue = useMemo(
        () => ({ bets, onBetCatcherHover: handleBetCatcherHover }),
        [bets, handleBetCatcherHover]
    );

    return (
        <RouletteTableContext.Provider value={contextValue}>
            <div
                className={classNames('roulette-table-container', { debug: isDebug })}
                ref={tableRef}
            >
                <section className="roulette-table-container-first">
                    <ZeroBets />
                    <NumberBets />
                    <Columns />
                </section>
                <section className="roulette-table-container-second">
                    <Dozens />
                </section>
                <div className="roulette-table-container-third">
                    <BottomBets language={language}/>
                </div>
            </div>
        </RouletteTableContext.Provider>
    );
};