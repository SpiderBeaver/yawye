import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import DateHeader from './common/components/DateHeader';
import AddServingForm from './features/diet/AddServingForm';
import DailyDiet from './features/diet/DailyDiet';
import { addServing, changeDate, servingAdded } from './features/diet/dietSlice';
import { fetchDishes } from './features/dishes/dishesSlice';

function App() {
  const dispatch = useDispatch();

  const [showAddServingForm, setShowAddServingForm] = useState(false);
  const [date, setDate] = useState(dayjs().startOf('day'));

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(changeDate({ newDate: dayjs() }));
  }, [dispatch]);

  const handleDateChange = (newDate: Dayjs) => {
    dispatch(changeDate({ newDate: newDate }));
    setDate(newDate);
  };

  const handleAddServing = (dishId: number, weight: number) => {
    // Not sure if I want to save the exact time of the serving.
    // For now just set the hour to 12.
    const servingDate = date.set('hour', 12);
    dispatch(addServing({ date: servingDate, dishId: dishId, weight: weight }));
    setShowAddServingForm(false);
  };

  return (
    <div className="App">
      <DateHeader date={date} onDateChange={handleDateChange} />
      <DailyDiet
        date={date}
        onAddServingButtonClick={() => {
          setShowAddServingForm(true);
        }}
      />
      <AddServingForm
        show={showAddServingForm}
        onBack={() => setShowAddServingForm(false)}
        onAddDish={handleAddServing}
      />
    </div>
  );
}

export default App;
