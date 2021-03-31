import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Button from '../../common/components/Button';
import { selectAllIngredients } from './ingredientsSlice';

const IngredientsListStyled = styled.ul`
  margin: 0;
  padding: 0;
`;

const IngredientListItem = styled.li`
  list-style: none;
  margin-bottom: 1rem;
`;

const Ingredient = styled.div`
  display: grid;
  grid-template-rows: auto 0.5rem auto;
  grid-template-columns: auto auto;
  grid-template-areas:
    'header edit'
    'none none'
    'per100 contains';
`;

const IngredientName = styled.h3`
  margin: 0;
  grid-area: header;
`;

const EditButton = styled(Button)`
  grid-area: edit;
  justify-self: end;
`;

const PerHundred = styled.span`
  grid-area: per100;
  font-size: 0.8rem;
`;

const Contains = styled.span`
  grid-area: contains;
  justify-self: end;
`;

interface IngredientsListProps {
  onEdit?: (id: number) => void;
}

export default function IngredientsList(props: IngredientsListProps) {
  const { onEdit } = props;

  const ingredients = useSelector(selectAllIngredients);

  return (
    <IngredientsListStyled>
      {ingredients.map((ingredient) => (
        <IngredientListItem key={ingredient.id}>
          <Ingredient>
            <IngredientName>{ingredient.name}</IngredientName>
            <EditButton onClick={() => onEdit?.(ingredient.id)}>edit</EditButton>
            <PerHundred>Per 100 grams:</PerHundred>
            <Contains>{ingredient.calories} calories</Contains>
          </Ingredient>
        </IngredientListItem>
      ))}
    </IngredientsListStyled>
  );
}
