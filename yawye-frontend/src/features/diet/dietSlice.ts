import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';

interface DietState {
  days: {
    date: number;
    servings: {
      dishId: number;
      sizeGrams: number;
    }[];
  }[];
}

const initialState: DietState = {
  days: [
    {
      date: dayjs('2021-03-21').unix(),
      servings: [
        { dishId: 1, sizeGrams: 150 },
        { dishId: 2, sizeGrams: 250 },
      ],
    },
  ],
};

export const dietSlice = createSlice({
  name: 'diet',
  initialState: initialState,
  reducers: {
    servingAdded: (state, action: PayloadAction<{ date: number; dishId: number; sizeGrams: number }>) => {
      const day = state.days.find((d) => d.date === action.payload.date);
      if (day !== undefined) {
        day.servings.push({ dishId: action.payload.dishId, sizeGrams: action.payload.sizeGrams });
      }
    },
  },
});

export const { servingAdded } = dietSlice.actions;

export const selectDay = (date: dayjs.Dayjs) => (state: RootState) => {
  return state.diet.days.find((d) => d.date === date.unix());
};

export default dietSlice.reducer;
