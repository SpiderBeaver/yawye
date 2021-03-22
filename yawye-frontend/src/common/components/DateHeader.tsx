import dayjs from 'dayjs';
import React from 'react';

interface DateHeaderProps {
  date: dayjs.Dayjs;
  onDateChange?: (newDate: dayjs.Dayjs) => void;
}

export default function DateHeader({ date, onDateChange }: DateHeaderProps) {
  const handleBackButton = () => {
    const newDate = date.subtract(1, 'day');
    onDateChange?.(newDate);
  };

  const handleForwardButton = () => {
    const newDate = date.add(1, 'day');
    onDateChange?.(newDate);
  };

  return (
    <div>
      <button onClick={handleBackButton}>{'<'}</button>
      <span>{date.format('YYYY-MM-DD')}</span>
      <button onClick={handleForwardButton}>{'>'}</button>
    </div>
  );
}
