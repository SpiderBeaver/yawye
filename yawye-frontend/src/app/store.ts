import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import dietReducer from '../features/diet/dietSlice';
import dishesReducer from '../features/dishes/dishesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    diet: dietReducer,
    dishes: dishesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
