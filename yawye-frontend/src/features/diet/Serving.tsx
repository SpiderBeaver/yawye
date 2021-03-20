import React from 'react';
import { useSelector } from 'react-redux';
import { selectDish } from '../dishes/dishesSlice';

export default function Serving({ dishId, sizeGrams }: { dishId: number; sizeGrams: number }) {
  const dish = useSelector(selectDish(dishId));

  return (
    <div>
      {dish === undefined ? (
        <p>No dish sorry</p>
      ) : (
        <div>
          {dish.name} - {sizeGrams}g.
        </div>
      )}
    </div>
  );
}
