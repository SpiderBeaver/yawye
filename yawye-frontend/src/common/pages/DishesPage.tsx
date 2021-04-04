import React, { useState } from 'react';
import styled from 'styled-components/macro';
import DishesList from '../../features/dishes/DishesList';
import EditDishForm from '../../features/dishes/EditDishForm';
import ActionButton from '../components/ActionButton';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import SlideIn from '../components/SlideIn';

const DishesListContainer = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export default function DishesPage() {
  const [showEditDishForm, setShowEditDishForm] = useState(false);
  const [editDishId, setEditDishId] = useState<number | null>(null);

  const handleEditDish = (dishId: number) => {
    setEditDishId(dishId);
    setShowEditDishForm(true);
  };

  return (
    <Page>
      <PageHeader>Dishes</PageHeader>
      <ActionButton>New Dish</ActionButton>
      <DishesListContainer>
        <DishesList allowEdit={true} onEdit={handleEditDish}></DishesList>
      </DishesListContainer>

      <SlideIn show={showEditDishForm}>{editDishId && <EditDishForm dishId={editDishId}></EditDishForm>}</SlideIn>
    </Page>
  );
}
