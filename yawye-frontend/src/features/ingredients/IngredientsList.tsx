import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, selectAllIngredients } from './ingredientsSlice';

interface IngredientsListProps {
  onEdit?: (id: number) => void;
}

export default function IngredientsList(props: IngredientsListProps) {
  const { onEdit } = props;

  const dispatch = useDispatch();

  const ingredients = useSelector(selectAllIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <span>{ingredient.name}</span>
          <button onClick={() => onEdit?.(ingredient.id)}>edit</button>
        </li>
      ))}
    </ul>
  );
}
