import { createContext } from 'react';
import type { MouseEvent } from 'react';
import type  IRouletteTableProps  from '../RouletteTable';

export interface IRouletteTableContextProps {
    bets: IRouletteTableProps['bets'];
    onBetCatcherHover: (event: MouseEvent<HTMLDivElement>) => void;
}

export const RouletteTableContext = createContext<IRouletteTableContextProps>({
    bets: {},
    onBetCatcherHover: () => null,
});
export default class IRouletteTableProps {
}