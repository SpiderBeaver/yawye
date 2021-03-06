import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { RootState } from '../../app/store';
import Ingredient from '../../models/Ingredient';

interface IngredientsState {
  ingredients: Ingredient[];
  loadingState: 'idle' | 'pending' | 'success';
}

const initialState: IngredientsState = {
  ingredients: [],
  loadingState: 'idle',
};

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () => {
  const ingredients = apiClient.getIngredients();
  return ingredients;
});

export const createIngredient = createAsyncThunk(
  'ingredients/createIngredient',
  async ({ name, calories }: { name: string; calories: number }) => {
    const ingredient = await apiClient.createIngredient(name, calories);
    return ingredient;
  }
);

export const updateIngredient = createAsyncThunk(
  'ingredients/updateIngredient',
  async ({ id, name, calories }: { id: number; name: string; calories: number }) => {
    const ingredient = await apiClient.updateIngredient(id, name, calories);
    return ingredient;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    loadingStateReset: (state, action) => {
      state.loadingState = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
    builder.addCase(createIngredient.pending, (state, action) => {
      state.loadingState = 'pending';
    });
    builder.addCase(createIngredient.fulfilled, (state, action) => {
      state.loadingState = 'success';
      state.ingredients.push(action.payload);
    });
    builder.addCase(updateIngredient.fulfilled, (state, action) => {
      const ingredientIndex = state.ingredients.findIndex((ingredient) => ingredient.id === action.payload.id);
      state.ingredients[ingredientIndex] = action.payload;
    });
  },
});

export const selectAllIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectIngredientById = (id: number) => (state: RootState) =>
  state.ingredients.ingredients.find((ingredient) => ingredient.id === id);
export const selectLoadingState = (state: RootState) => state.ingredients.loadingState;

export const { loadingStateReset } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
