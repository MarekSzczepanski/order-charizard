import { configureStore, combineReducers } from '@reduxjs/toolkit';
import step from './reducers/step';
import cards from './reducers/cards';
import chosenCard from './reducers/chosenCard';

const rootReducer = combineReducers({
  step,
  cards,
  chosenCard,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
