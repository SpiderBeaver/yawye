import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllIngredients } from './ingredientsSlice';

interface IngredientsListProps {
  onEdit?: (id: number) => void;
}

export default function IngredientsList(props: IngredientsListProps) {
  const { onEdit } = props;

  const ingredients = useSelector(selectAllIngredients);

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
