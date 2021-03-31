import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllDishes } from './dishesSlice';

interface DishesListProps {
  allowEdit?: boolean;
  onEdit?: (dishId: number) => void;
}

export default function DishesList({ allowEdit = false, onEdit }: DishesListProps) {
  const dishes = useSelector(selectAllDishes);

  return (
    <div>
      <ul>
        {dishes.map((dish) => (
          <li>
            <span>{dish.name}</span>
            {allowEdit && <button onClick={() => onEdit?.(dish.id)}>edit</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
