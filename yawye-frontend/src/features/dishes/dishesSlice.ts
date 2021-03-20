import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Ingredient {
  id: number;
  name: string;
  caloriesPerHundredGrams: number;
  sizeGrams: number;
}

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
  dishes: [
    {
      id: 1,
      name: 'Pizza',
      numberOfPortions: 4,
      ingredients: [
        { id: 1, name: 'Test', caloriesPerHundredGrams: 220, sizeGrams: 150 },
        { id: 2, name: 'Test2', caloriesPerHundredGrams: 120, sizeGrams: 200 },
      ],
    },
    {
      id: 2,
      name: 'Soup',
      numberOfPortions: 2,
      ingredients: [
        { id: 1, name: 'Test', caloriesPerHundredGrams: 220, sizeGrams: 150 },
        { id: 2, name: 'Test2', caloriesPerHundredGrams: 120, sizeGrams: 200 },
      ],
    },
  ],
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: initialState,
  reducers: {},
});

export const selectAllDishes = (state: RootState) => state.dishes.dishes;
export const selectDish = (id: number) => (state: RootState) => state.dishes.dishes.find((d) => d.id === id);

export default dishesSlice.reducer;
