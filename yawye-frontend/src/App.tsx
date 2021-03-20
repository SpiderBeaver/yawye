import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import AddServingForm from './features/diet/AddServingForm';
import DailyDiet from './features/diet/DailyDiet';
import { servingAdded } from './features/diet/dietSlice';

function App() {
  const [showAddServingForm, setShowAddServingForm] = useState(false);
  const dispatch = useDispatch();

  const date = new Date(2021, 3, 15);

  return (
    <div className="App">
      <DailyDiet
        date={date}
        onAddServingButtonClick={() => {
          setShowAddServingForm(true);
        }}
      />
      <AddServingForm
        show={showAddServingForm}
        onBack={() => setShowAddServingForm(false)}
        onAddDish={(id, weight) => {
          dispatch(servingAdded({ date: date.getTime(), dishId: id, sizeGrams: weight }));
          setShowAddServingForm(false);
        }}
      />
    </div>
  );
}

export default App;
