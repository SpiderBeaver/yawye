import React, { useState } from 'react';
import './App.css';
import Navigation, { PageName } from './common/components/Navigation';
import DietPage from './common/pages/DietPage';
import DishesPage from './common/pages/DishesPage';
import IngredientsPage from './common/pages/IngredientsPage';

function pageElement(name: PageName) {
  switch (name) {
    case 'diet':
      return <DietPage></DietPage>;
    case 'dishes':
      return <DishesPage></DishesPage>;
    case 'ingredients':
      return <IngredientsPage></IngredientsPage>;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('diet');

  return (
    <div className="App">
      {pageElement(currentPage)}
      <Navigation currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}></Navigation>
    </div>
  );
}

export default App;
