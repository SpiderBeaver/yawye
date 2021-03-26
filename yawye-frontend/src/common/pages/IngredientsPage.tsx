import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIngredientForm from '../../features/ingredients/EditIngredientForm';
import IngredientsList from '../../features/ingredients/IngredientsList';
import { createIngredient, updateIngredient } from '../../features/ingredients/ingredientsSlice';
import NewIngredientForm from '../../features/ingredients/NewIngredientForm';
import SlideIn from '../components/SlideIn';

export default function IngredientsPage() {
  const dispatch = useDispatch();

  const [showNewIngredientForm, setShowNewIngredientForm] = useState(false);

  const [showEditIngredientForm, setShowEditIngredientForm] = useState(false);

  const [editedIngredientId, setEditedIngredientId] = useState<number | null>(null);

  const handleCreateIngredient = (name: string, calories: number) => {
    dispatch(createIngredient({ name: name, calories: calories }));
    setShowNewIngredientForm(false);
  };

  const handleEditIngredientButton = (id: number) => {
    setEditedIngredientId(id);
    setShowEditIngredientForm(true);
  };

  const handleUpdateIngredient = (id: number, name: string, calories: number) => {
    dispatch(updateIngredient({ id: id, name: name, calories: calories }));
    setShowEditIngredientForm(false);
  };

  return (
    <section>
      <h2>Ingredients</h2>
      <IngredientsList onEdit={handleEditIngredientButton}></IngredientsList>
      <button onClick={() => setShowNewIngredientForm(true)}>New Ingredient</button>
      <SlideIn show={showNewIngredientForm}>
        <NewIngredientForm
          onBack={() => setShowNewIngredientForm(false)}
          onCreate={handleCreateIngredient}
        ></NewIngredientForm>
      </SlideIn>
      {editedIngredientId === null ? null : (
        <SlideIn show={showEditIngredientForm}>
          <EditIngredientForm
            ingredientId={editedIngredientId}
            onBack={() => setShowEditIngredientForm(false)}
            onUpdate={handleUpdateIngredient}
          ></EditIngredientForm>
        </SlideIn>
      )}
    </section>
  );
}
