import { IRouletteTableProps } from '../../components/RouletteTable';

const noTopRender = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const noRightRender = [34, 35, 36];
const bottomRender = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const noCornerBetRender = [...noTopRender, 34, 35];
const sixLinesBetRender = bottomRender.slice(0, bottomRender.length - 1);
const topRightDoubleStreetRender = noTopRender.slice(0, noTopRender.length - 1);

export const shouldRenderTopCatcher = (currentNumber) =>
    !noTopRender.includes(currentNumber);

export const shouldRenderRightCatcher = (currentNumber) =>
    !noRightRender.includes(currentNumber);

export const shouldRenderBottomCatcher = (currentNumber) =>
    bottomRender.includes(currentNumber);

export const shouldRenderCornerBetCatcher = (currentNumber) =>
    !noCornerBetRender.includes(currentNumber);

export const shouldRenderSixLineBetCatcher = (currentNumber) =>
    sixLinesBetRender.includes(currentNumber);

export const shouldRenderChip = (id, bets) =>
    Object.keys(bets).includes(id);

export const shouldRenderTopStreetCatcher = (currentNumber) =>
    noTopRender.includes(currentNumber);

export const shouldRenderTopRightDoubleStreetCatcher = (currentNumber) =>
    topRightDoubleStreetRender.includes(currentNumber);
