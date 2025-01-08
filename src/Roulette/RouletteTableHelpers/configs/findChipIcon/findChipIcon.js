import type  IRouletteTableProps  from '../../RouletteTableContext/RouletteTableContext';

export const findChipIcon = (id: string, bets: IRouletteTableProps['bets']) =>
    bets[id]?.icon;
