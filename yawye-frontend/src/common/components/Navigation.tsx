import React from 'react';

export type PageName = 'diet' | 'dishes';

interface NavigationProps {
  currentPage: PageName;
  onPageChange: (newPageName: PageName) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <div>
      <button onClick={() => onPageChange('diet')}>Diet</button>
      <button onClick={() => onPageChange('dishes')}>Dishes</button>
    </div>
  );
}
