import React from 'react';
import styled from 'styled-components/macro';
import { Dish } from '../../models/Dish';
import SelectDishList from '../dishes/SelectDishList';

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

export default function AddServingForm({ onBack, onAddDish }: AddServingFormProps) {
  const handleSelectDish = (dish: Dish) => {
    onAddDish?.(dish.id, dishServingWeight(dish));
  };

  return (
    <ServingForm>
      <Heading>Add Serving Form</Heading>
      <button onClick={onBack}>back</button>
      <SelectDishList onSelect={handleSelectDish}></SelectDishList>
    </ServingForm>
  );
}
