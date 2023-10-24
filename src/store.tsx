import { configureStore, combineReducers } from '@reduxjs/toolkit';
import step from './reducers/step';
import cards from './reducers/cards';

const rootReducer = combineReducers({
  step,
  cards,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
