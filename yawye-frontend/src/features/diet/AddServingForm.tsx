import React from 'react';
import { useSelector } from 'react-redux';
import { Dish, selectAllDishes } from '../dishes/dishesSlice';
import styles from './AddServingForm.module.css';

interface AddServingFormProps {
  show: boolean;
  onBack?: () => void;
  onAddDish?: (id: number, weight: number) => void;
}

function dishServingWeight(dish: Dish) {
  console.log(dish);
  const totalWeight = dish.ingredients.map((i) => i.weight).reduce((a, b) => a + b);
  const servingWeight = totalWeight / dish.numberOfServings;
  return servingWeight;
}

export default function AddServingForm({ show, onBack, onAddDish }: AddServingFormProps) {
  const dishes = useSelector(selectAllDishes);

  return (
    <div className={`${styles.servingForm} ${show ? styles.onScreen : ''}`}>
      <h2>Add Serving Form</h2>
      <button onClick={onBack}>back</button>
      <ul className={styles.dishesList}>
        {dishes.map((dish) => (
          <li key={dish.id} className={styles.dishesListItem}>
            <span>{dish.name}</span>
            <button onClick={() => onAddDish?.(dish.id, dishServingWeight(dish))}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
