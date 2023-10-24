import { configureStore, combineReducers } from '@reduxjs/toolkit';
import step from './reducers/step';

const rootReducer = combineReducers({
  step,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
