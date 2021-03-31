import React, { useState } from 'react';
import DishesList from '../../features/dishes/DishesList';
import EditDishForm from '../../features/dishes/EditDishForm';
import SlideIn from '../components/SlideIn';

export default function DishesPage() {
  const [showEditDishForm, setShowEditDishForm] = useState(false);
  const [editDishId, setEditDishId] = useState<number | null>(null);

  const handleEditDish = (dishId: number) => {
    setEditDishId(dishId);
    setShowEditDishForm(true);
  };

  return (
    <div>
      <h2>Dishes</h2>
      <DishesList allowEdit={true} onEdit={handleEditDish}></DishesList>
      <SlideIn show={showEditDishForm}>{editDishId && <EditDishForm dishId={editDishId}></EditDishForm>}</SlideIn>
    </div>
  );
}
