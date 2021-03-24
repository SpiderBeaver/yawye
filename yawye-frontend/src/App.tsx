import React, { useState } from 'react';
import './App.css';
import Navigation, { PageName } from './common/components/Navigation';
import DietPage from './common/pages/DietPage';
import DishesPage from './common/pages/DishesPage';

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('diet');

  return (
    <div className="App">
      {currentPage === 'diet' ? <DietPage></DietPage> : <DishesPage></DishesPage>}
      <Navigation currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}></Navigation>
    </div>
  );
}

export default App;
