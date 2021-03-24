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
    date: dayjs().unix(),
    servings: [],
  },
};

export const changeDate = createAsyncThunk('/diet/changeDate', async ({ newDate }: { newDate: Dayjs }) => {
  // TODO Extract to a separate module for API client.
  const newDateString = newDate.format('YYYY-MM-DD');
  const response = await fetch(`http://192.168.1.7:3001/diet/${newDateString}`);
  const servings = await response.json();
  return {
    newDate: newDate.unix(),
    servings: servings,
  };
});

export const addServing = createAsyncThunk(
  '/dist/addServing',
  async ({ date, dishId, weight }: { date: Dayjs; dishId: number; weight: number }) => {
    const body = {
      date,
      dishId,
      weight: Math.trunc(weight),
    };
    const response = await fetch('http://localhost:3001/diet/addServing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const serving = await response.json();
    return serving;
  }
);

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
    builder.addCase(addServing.fulfilled, (state, action: PayloadAction<Serving>) => {
      state.dailyDiet.servings.push({ dishId: action.payload.dishId, weight: action.payload.weight });
    });
  },
});

export const { servingAdded } = dietSlice.actions;

export const selectDailyDiet = () => (state: RootState) => {
  return state.diet.dailyDiet;
};

export default dietSlice.reducer;
