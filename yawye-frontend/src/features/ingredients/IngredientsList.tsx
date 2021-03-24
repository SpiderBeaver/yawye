import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, selectAllIngredients } from './ingredientsSlice';

export default function IngredientsList() {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectAllIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>{ingredient.name}</li>
      ))}
    </ul>
  );
}
