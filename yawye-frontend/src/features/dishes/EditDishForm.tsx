import React from 'react';
import { useSelector } from 'react-redux';
import FullScreen from '../../common/components/FullScreen';
import IngredientName from '../ingredients/IngredientName';
import { selectDish } from './dishesSlice';

export default function EditDishForm({ dishId }: { dishId: number }) {
  const dish = useSelector(selectDish(dishId));

  if (!dish) {
    return <div>Dish not found</div>;
  }

  return (
    <FullScreen>
      <h2>{dish.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {dish.ingredients.map((dishIngredient) => (
          <li key={dishIngredient.ingredientId}>
            <IngredientName id={dishIngredient.ingredientId}></IngredientName>
            <input type="number" value={dishIngredient.weight}></input>
          </li>
        ))}
      </ul>
    </FullScreen>
  );
}
