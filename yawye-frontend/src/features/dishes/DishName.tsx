import React from 'react';
import { useSelector } from 'react-redux';
import { selectDish } from './dishesSlice';

export default function DishName({ id }: { id: number }) {
  const dish = useSelector(selectDish(id));

  if (!dish) {
    return <span>Dish not found</span>;
  }

  return <span>{dish.name}</span>;
}
