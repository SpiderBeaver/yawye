import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import EditIngredientForm from '../../features/ingredients/EditIngredientForm';
import IngredientsList from '../../features/ingredients/IngredientsList';
import { createIngredient, updateIngredient } from '../../features/ingredients/ingredientsSlice';
import NewIngredientForm from '../../features/ingredients/NewIngredientForm';
import ActionButton from '../components/ActionButton';
import Dialog from '../components/Dialog';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import SlideIn from '../components/SlideIn';

const IngredientsListContainer = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export default function IngredientsPage() {
  const dispatch = useDispatch();

  const [showNewIngredientForm, setShowNewIngredientForm] = useState(false);

  const [showEditIngredientForm, setShowEditIngredientForm] = useState(false);

  const [editedIngredientId, setEditedIngredientId] = useState<number | null>(null);

  const handleEditIngredientButton = (id: number) => {
    setEditedIngredientId(id);
    setShowEditIngredientForm(true);
  };

  const handleUpdateIngredient = (id: number, name: string, calories: number) => {
    dispatch(updateIngredient({ id: id, name: name, calories: calories }));
    setShowEditIngredientForm(false);
  };

  return (
    <Page>
      <PageHeader>Ingredients</PageHeader>
      <ActionButton onClick={() => setShowNewIngredientForm(true)}>New Ingredient</ActionButton>
      <IngredientsListContainer>
        <IngredientsList onEdit={handleEditIngredientButton}></IngredientsList>
      </IngredientsListContainer>

      {editedIngredientId === null ? null : (
        <SlideIn show={showEditIngredientForm}>
          <EditIngredientForm
            ingredientId={editedIngredientId}
            onBack={() => setShowEditIngredientForm(false)}
            onUpdate={handleUpdateIngredient}
          ></EditIngredientForm>
        </SlideIn>
      )}

      <Dialog show={showNewIngredientForm} onClose={() => setShowNewIngredientForm(false)}>
        <NewIngredientForm
          onBack={() => setShowNewIngredientForm(false)}
          onCreated={() => setShowNewIngredientForm(false)}
        ></NewIngredientForm>
      </Dialog>
    </Page>
  );
}
