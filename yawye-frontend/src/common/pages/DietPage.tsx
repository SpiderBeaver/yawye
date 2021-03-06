import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddServingForm from '../../features/diet/AddServingForm';
import DailyDiet from '../../features/diet/DailyDiet';
import { addServing, changeDate } from '../../features/diet/dietSlice';
import DateHeader from '../components/DateHeader';
import SlideIn from '../components/SlideIn';

export default function DietPage() {
  const dispatch = useDispatch();

  const [date, setDate] = useState(dayjs().startOf('day'));
  const [showAddServingForm, setShowAddServingForm] = useState(false);

  useEffect(() => {
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
    <div>
      <div>
        <DateHeader date={date} onDateChange={handleDateChange} />
        <DailyDiet
          date={date}
          onAddServingButtonClick={() => {
            setShowAddServingForm(true);
          }}
        />
        <SlideIn show={showAddServingForm}>
          <AddServingForm onBack={() => setShowAddServingForm(false)} onAddDish={handleAddServing} />
        </SlideIn>
      </div>
    </div>
  );
}
