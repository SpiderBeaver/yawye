import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Dish } from '../../models/Dish';
import { selectAllDishes } from '../dishes/dishesSlice';

interface AddServingFormProps {
  onBack?: () => void;
  onAddDish?: (id: number, weight: number) => void;
}

function dishServingWeight(dish: Dish) {
  console.log(dish);
  const totalWeight = dish.ingredients.map((i) => i.weight).reduce((a, b) => a + b);
  const servingWeight = totalWeight / dish.numberOfServings;
  return servingWeight;
}

const ServingForm = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

const Heading = styled.h2`
  margin: 0;
`;

const DishesList = styled.ul`
  margin: 0;
  padding: 0;
`;

const DishesListItem = styled.li`
  list-style: none;
`;

export default function AddServingForm({ onBack, onAddDish }: AddServingFormProps) {
  const dishes = useSelector(selectAllDishes);

  return (
    <ServingForm>
      <Heading>Add Serving Form</Heading>
      <button onClick={onBack}>back</button>
      <DishesList>
        {dishes.map((dish) => (
          <DishesListItem key={dish.id}>
            <span>{dish.name}</span>
            <button onClick={() => onAddDish?.(dish.id, dishServingWeight(dish))}>Add</button>
          </DishesListItem>
        ))}
      </DishesList>
    </ServingForm>
  );
}
