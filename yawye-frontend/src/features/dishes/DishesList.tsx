import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllDishes } from './dishesSlice';

export default function DishesList() {
  const dishes = useSelector(selectAllDishes);

  return (
    <div>
      <ul>
        {dishes.map((dish) => (
          <li>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
}
