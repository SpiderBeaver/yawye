import React from 'react';
import { useSelector } from 'react-redux';
import { selectIngredientById } from './ingredientsSlice';

export default function IngredientName({ id }: { id: number }) {
  const ingredient = useSelector(selectIngredientById(id));

  if (ingredient == null) {
    return <span>Ingredient not found</span>;
  }

  return <span>{ingredient.name}</span>;
}
