import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Navigation, { PageName } from './common/components/Navigation';
import DietPage from './common/pages/DietPage';
import DishesPage from './common/pages/DishesPage';
import IngredientsPage from './common/pages/IngredientsPage';
import { fetchDishes } from './features/dishes/dishesSlice';
import { fetchIngredients } from './features/ingredients/ingredientsSlice';

const AppElement = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.div`
  flex-grow: 1;
`;

const NavigationContainer = styled.div`
  height: 3rem;
`;

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState<PageName>('diet');

  return (
    <AppElement>
      <PageContainer>{pageElement(currentPage)}</PageContainer>
      <NavigationContainer>
        <Navigation currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}></Navigation>
      </NavigationContainer>
    </AppElement>
  );
}

export default App;
