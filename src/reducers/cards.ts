import { SAVE_DATA_OF_DRAWN_CARDS } from '../actionTypes';
import ICardData from '../interfaces/cardData';

interface IActionSaveDataOfDrawnCards {
  type: 'SAVE_DATA_OF_DRAWN_CARDS';
  payload: ICardData[];
}

type Action = IActionSaveDataOfDrawnCards;

interface State {
  value: ICardData[];
}

const initialState: State = {
  value: [
    { name: '', image: '', price: '', url: '', setName: '', setLogo: '' },
    { name: '', image: '', price: '', url: '', setName: '', setLogo: '' },
    { name: '', image: '', price: '', url: '', setName: '', setLogo: '' },
  ],
};

const cards = (
  state: State = initialState,
  action: Action = { type: 'SAVE_DATA_OF_DRAWN_CARDS', payload: [] },
) => {
  switch (action.type) {
    case SAVE_DATA_OF_DRAWN_CARDS:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default cards;
