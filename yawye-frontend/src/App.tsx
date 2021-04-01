import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/macro';
import Navigation, { PageName } from './common/components/Navigation';
import DietPage from './common/pages/DietPage';
import DishesPage from './common/pages/DishesPage';
import IngredientsPage from './common/pages/IngredientsPage';
import { fetchDishes } from './features/dishes/dishesSlice';
import { fetchIngredients } from './features/ingredients/ingredientsSlice';
import theme from './theme';

const AppElement = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 3rem;
`;

const PageContainer = styled.div`
  overflow: scroll;
  background-color: ${(props) => props.theme.colors.background};
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
    <ThemeProvider theme={theme}>
      <AppElement>
        <PageContainer>{pageElement(currentPage)}</PageContainer>
        <NavigationContainer>
          <Navigation currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)}></Navigation>
        </NavigationContainer>
      </AppElement>
    </ThemeProvider>
  );
}

export default App;
