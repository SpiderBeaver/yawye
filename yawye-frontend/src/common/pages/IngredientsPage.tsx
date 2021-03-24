import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import IngredientsList from '../../features/ingredients/IngredientsList';
import { createIngredient } from '../../features/ingredients/ingredientsSlice';
import NewIngredientForm from '../../features/ingredients/NewIngredientForm';

export default function IngredientsPage() {
  const dispatch = useDispatch();

  const [showNewIngredientForm, setShowNewIngredientForm] = useState(false);

  const handleCreateIngredient = (name: string, calories: number) => {
    dispatch(createIngredient({ name: name, calories: calories }));
    setShowNewIngredientForm(false);
  };

  return (
    <section>
      <h2>Ingredients</h2>
      <IngredientsList></IngredientsList>
      <button onClick={() => setShowNewIngredientForm(true)}>New Ingredient</button>
      <NewIngredientForm
        show={showNewIngredientForm}
        onBack={() => setShowNewIngredientForm(false)}
        onCreate={handleCreateIngredient}
      ></NewIngredientForm>
    </section>
  );
}
