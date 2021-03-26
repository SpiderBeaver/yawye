import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import apiClient from '../../api/apiClient';
import { RootState } from '../../app/store';
import Serving from '../../models/Serving';

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
  const servings = await apiClient.getDiet(newDate);
  return {
    newDate: newDate.unix(),
    servings: servings,
  };
});

export const addServing = createAsyncThunk(
  '/dist/addServing',
  async ({ date, dishId, weight }: { date: Dayjs; dishId: number; weight: number }) => {
    const serving = await apiClient.addServing(date, dishId, weight);
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
