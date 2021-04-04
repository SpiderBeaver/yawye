import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Button from '../../common/components/Button';
import { Dish } from '../../models/Dish';
import Ingredient from '../../models/Ingredient';
import { selectAllIngredients } from '../ingredients/ingredientsSlice';
import { selectAllDishes } from './dishesSlice';

function caloriesPerHundred(dish: Dish, ingredients: Ingredient[]) {
  const dishWeight = dish.ingredients.map((di) => di.weight).reduce((a, b) => a + b);
  const ingredientsWithShare = dish.ingredients
    .map((di) => ({
      ingredient: ingredients.find((i) => i.id === di.ingredientId),
      share: di.weight / dishWeight,
    }))
    .filter((i) => i.ingredient !== undefined);
  const caloriesPerHundred = ingredientsWithShare.map((i) => i.ingredient!.calories * i.share).reduce((a, b) => a + b);
  return Math.round(caloriesPerHundred);
}

const DishesListStyled = styled.ul`
  margin: 0;
  padding: 0;
`;

const DishListItem = styled.li`
  list-style: none;
  margin-bottom: 2rem;
`;

const DishStyled = styled.div`
  display: grid;
  grid-template-rows: auto 0.5rem auto;
  grid-template-columns: auto auto;
  grid-template-areas:
    'header edit'
    'none none'
    'per100 contains';
`;

const DishName = styled.h3`
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

interface DishesListProps {
  allowEdit?: boolean;
  onEdit?: (dishId: number) => void;
}

export default function DishesList({ allowEdit = false, onEdit }: DishesListProps) {
  const dishes = useSelector(selectAllDishes);
  const ingredients = useSelector(selectAllIngredients);

  return (
    <DishesListStyled>
      {dishes.map((dish) => (
        <DishListItem>
          <DishStyled>
            <DishName>{dish.name}</DishName>
            {allowEdit && <EditButton onClick={() => onEdit?.(dish.id)}>edit</EditButton>}
            <PerHundred>Per 100 grams:</PerHundred>
            <Contains>{caloriesPerHundred(dish, ingredients)} calories</Contains>
          </DishStyled>
        </DishListItem>
      ))}
    </DishesListStyled>
  );
}
