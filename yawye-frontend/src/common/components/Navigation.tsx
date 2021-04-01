import React from 'react';
import styled, { css } from 'styled-components';

export type PageName = 'diet' | 'dishes' | 'ingredients';

const NavigationElement = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundDark};
  height: 100%;
  display: flex;
`;

const NavigationButton = styled.button<{ selected: boolean }>`
  flex-basis: 0;
  flex-grow: 1;
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      color: ${(props) => props.theme.colors.accent};
    `}
`;

interface NavigationProps {
  currentPage: PageName;
  onPageChange: (newPageName: PageName) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <NavigationElement>
      <NavigationButton onClick={() => onPageChange('diet')} selected={currentPage === 'diet'}>
        Diet
      </NavigationButton>
      <NavigationButton onClick={() => onPageChange('dishes')} selected={currentPage === 'dishes'}>
        Dishes
      </NavigationButton>
      <NavigationButton onClick={() => onPageChange('ingredients')} selected={currentPage === 'ingredients'}>
        Ingredients
      </NavigationButton>
    </NavigationElement>
  );
}
