import { SAVE_DATA_OF_DRAWN_CARDS } from '../actionTypes';
import ICardData from '../interfaces/cardData';

const saveDataOfDrawnCards = (
  cards: ICardData[],
): {
  type: string;
  payload: ICardData[];
} => ({
  type: SAVE_DATA_OF_DRAWN_CARDS,
  payload: cards,
});

export default saveDataOfDrawnCards;
