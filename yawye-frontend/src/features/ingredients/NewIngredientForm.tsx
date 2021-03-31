import React, { useState } from 'react';
import styled from 'styled-components/macro';

interface NewIngredientFormProps {
  onBack?: () => void;
  onCreate?: (name: string, calories: number) => void;
}

const Form = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

export default function NewIngredientForm({ onBack, onCreate }: NewIngredientFormProps) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.(name, calories);
  };

  return (
    <Form>
      <button onClick={onBack}>back</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <input type="number" value={calories} onChange={(e) => setCalories(parseInt(e.target.value))}></input>
        <input type="submit" value="Create"></input>
      </form>
    </Form>
  );
}
