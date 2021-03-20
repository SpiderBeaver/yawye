import React from 'react';
import { useSelector } from 'react-redux';
import { selectDay } from './dietSlice';
import Serving from './Serving';

interface DailyDietProps {
  date: Date;
  onAddServingButtonClick?: () => void;
}

export default function DailyDiet({ date, onAddServingButtonClick }: DailyDietProps) {
  const dailyDiet = useSelector(selectDay(date));

  return (
    <div>
      <h2 style={{ margin: 0 }}>I ate this on {date.toLocaleDateString('en')}</h2>
      <div>
        {dailyDiet?.servings.map((serving) => (
          <Serving dishId={serving.dishId} sizeGrams={serving.sizeGrams}></Serving>
        ))}
      </div>
      <button onClick={onAddServingButtonClick}>Add serving</button>
    </div>
  );
}
