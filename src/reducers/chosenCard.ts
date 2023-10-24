import { SET_CHOSEN_CARD } from '../actionTypes';

interface IActionSetChosenCard {
  type: 'SET_CHOSEN_CARD';
  payload: number;
}

type Action = IActionSetChosenCard;

interface State {
  value: number;
}

const initialState: State = {
  value: -1,
};

const chosenCard = (
  state: State = initialState,
  action: Action = { type: 'SET_CHOSEN_CARD', payload: -1 },
) => {
  switch (action.type) {
    case SET_CHOSEN_CARD:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default chosenCard;
