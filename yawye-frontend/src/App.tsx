import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import DateHeader from './common/components/DateHeader';
import AddServingForm from './features/diet/AddServingForm';
import DailyDiet from './features/diet/DailyDiet';
import { servingAdded } from './features/diet/dietSlice';
import { fetchDishes } from './features/dishes/dishesSlice';

function App() {
  const dispatch = useDispatch();

  const [showAddServingForm, setShowAddServingForm] = useState(false);
  const [date, setDate] = useState(dayjs().startOf('day'));

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div className="App">
      <DateHeader
        date={date}
        onDateChange={(newDate) => {
          setDate(newDate);
        }}
      />
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
          dispatch(servingAdded({ date: date.unix(), dishId: id, sizeGrams: weight }));
          setShowAddServingForm(false);
        }}
      />
    </div>
  );
}

export default App;
