import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { RootState } from '../../app/store';
import { Dish } from '../../models/Dish';

export interface DishesState {
  dishes: Dish[];
}

const initialState: DishesState = {
  dishes: [],
};

export const fetchDishes = createAsyncThunk('/dishes/fetchDishes', async () => {
  const dishes = await apiClient.getDishes();
  return dishes;
});

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
    });
  },
});

export const selectAllDishes = (state: RootState) => state.dishes.dishes;
export const selectDish = (id: number) => (state: RootState) => state.dishes.dishes.find((d) => d.id === id);

export default dishesSlice.reducer;
