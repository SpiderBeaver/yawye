import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from '../../app/store';

interface Serving {
  dishId: number;
  weight: number;
}

interface DietState {
  dailyDiet: {
    date: number;
    servings: Serving[];
  };
}

const initialState: DietState = {
  dailyDiet: {
    date: dayjs('2021-03-21').unix(),
    servings: [
      { dishId: 1, weight: 150 },
      { dishId: 2, weight: 250 },
    ],
  },
};

export const changeDate = createAsyncThunk('/diet/changeDate', async ({ newDate }: { newDate: Dayjs }) => {
  // TODO Extract to a separate module for API client.
  const newDateString = newDate.format('YYYY-MM-DD');
  const response = await fetch(`http://localhost:3001/diet/${newDateString}`);
  const servings = await response.json();
  return {
    newDate: newDate.unix(),
    servings: servings,
  };
});

export const dietSlice = createSlice({
  name: 'diet',
  initialState: initialState,
  reducers: {
    servingAdded: (state, action: PayloadAction<{ dishId: number; sizeGrams: number }>) => {
      state.dailyDiet.servings.push({ dishId: action.payload.dishId, weight: action.payload.sizeGrams });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeDate.fulfilled, (state, action: PayloadAction<{ newDate: number; servings: Serving[] }>) => {
      state.dailyDiet.date = action.payload.newDate;
      state.dailyDiet.servings = action.payload.servings;
    });
  },
});

export const { servingAdded } = dietSlice.actions;

export const selectDailyDiet = () => (state: RootState) => {
  return state.diet.dailyDiet;
};

export default dietSlice.reducer;
