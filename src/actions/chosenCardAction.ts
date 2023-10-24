import { SET_CHOSEN_CARD } from '../actionTypes';

const setChosenCard = (
  chosenCard: number,
): {
  type: string;
  payload: number;
} => ({
  type: SET_CHOSEN_CARD,
  payload: chosenCard,
});

export default setChosenCard;
