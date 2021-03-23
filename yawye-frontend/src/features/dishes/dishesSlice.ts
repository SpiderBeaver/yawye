import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Ingredient {
  id: number;
  name: string;
  caloriesPerHundredGrams: number;
  sizeGrams: number;
}

// TODO: Sync this interface and the API data
export interface Dish {
  id: number;
  name: string;
  numberOfPortions: number;
  ingredients: Ingredient[];
}

export interface DishesState {
  dishes: Dish[];
}

const initialState: DishesState = {
  dishes: [],
};

export const fetchDishes = createAsyncThunk('/dishes/fetchDishes', async () => {
  // TODO: Move into API module
  const response = await fetch('http://192.168.1.7:3001/dishes');
  // TODO: Check status
  const dishes = await response.json();
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
