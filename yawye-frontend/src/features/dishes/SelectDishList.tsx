import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Dish } from '../../models/Dish';
import { selectAllDishes } from './dishesSlice';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface SelectDishListProps {
  onSelect?: (dish: Dish) => void;
}

export default function SelectDishList({ onSelect }: SelectDishListProps) {
  const dishes = useSelector(selectAllDishes);

  return (
    <List>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <span>{dish.name}</span>
          <button onClick={() => onSelect?.(dish)}>select</button>
        </li>
      ))}
    </List>
  );
}
