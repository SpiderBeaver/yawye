import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIngredientById } from './ingredientsSlice';

interface EditIngredientFormProps {
  ingredientId: number;
  onBack?: () => void;
  onUpdate?: (id: number, name: string, calories: number) => void;
}

const Form = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

export default function EditIngredientForm(props: EditIngredientFormProps) {
  const { ingredientId, onBack, onUpdate } = props;

  const ingredient = useSelector(selectIngredientById(ingredientId))!;

  const [name, setName] = useState(ingredient.name);
  const [calories, setCalories] = useState(ingredient.calories);

  useEffect(() => {
    setName(ingredient.name);
    setCalories(ingredient.calories);
  }, [ingredient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate?.(ingredientId, name, calories);
  };

  return (
    <Form>
      <button onClick={onBack}>back</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="number" value={calories} onChange={(e) => setCalories(parseInt(e.target.value))}></input>
        <input type="submit" value="Save"></input>
      </form>
    </Form>
  );
}
