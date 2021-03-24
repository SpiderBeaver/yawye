import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Ingredient {
  id: number;
  name: string;
  calories: number;
}

interface IngredientsState {
  ingredients: Ingredient[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const response = await fetch('http://192.168.1.7:3001/ingredients');
  const ingredients = (await response.json()) as Ingredient[];
  return ingredients;
});

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  },
});

export const selectAllIngredients = (state: RootState) => state.ingredients.ingredients;

export default ingredientsSlice.reducer;
