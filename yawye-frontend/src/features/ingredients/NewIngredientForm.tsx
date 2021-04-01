import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { createIngredient, loadingStateReset, selectLoadingState } from './ingredientsSlice';

interface NewIngredientFormProps {
  onBack?: () => void;
  onCreated?: () => void;
}

const FormContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.backgroundAccent};
  border-radius: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Heading = styled.h2`
  margin: 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 1.5rem;
  display: block;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-top: 1.2rem;
  &:first-child {
    margin-top: 0;
  }
`;

const LabelSmall = styled.label`
  font-size: 0.8rem;
`;

const Input = styled.input`
  padding: 0.3rem;
  border: none;
  border-radius: 0.2rem;
  font-size: 1rem;
`;

const Submit = styled.input`
  margin-top: 1rem;
  align-self: end;
  border: none;
  background-color: ${(props) => props.theme.colors.accent};
  color: #ffffff;
  font-size: 1.2rem;
  font-family: inherit;
  padding: 0.4rem 0.6rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export default function NewIngredientForm({ onBack, onCreated: onCreate }: NewIngredientFormProps) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [caloriesString, setCaloriesString] = useState('');

  const loadingState = useSelector(selectLoadingState);

  if (loadingState === 'success') {
    dispatch(loadingStateReset({}));
    onCreate?.();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Show errors
    if (name.length === 0) {
      return;
    }
    const calories = parseInt(caloriesString);
    if (isNaN(calories)) {
      return;
    }

    dispatch(createIngredient({ name: name, calories: calories }));
  };

  return (
    <FormContainer>
      <Header>
        <Heading>New Ingredient</Heading>
        <BackButton onClick={onBack}>x</BackButton>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
        <Label>Per 100 grams</Label>
        <LabelSmall>Calories</LabelSmall>
        <Input type="text" value={caloriesString} onChange={(e) => setCaloriesString(e.target.value)}></Input>
        {loadingState === 'pending' ? <p>Loading</p> : null}
        <Submit type="submit" value="Create"></Submit>
      </Form>
    </FormContainer>
  );
}
