import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

const SlideInElement = styled.div<{ onScreen: boolean }>`
  position: absolute;
  top: 0;
  left: 100%;
  transition: left 0.3s;

  ${({ onScreen }) =>
    onScreen &&
    css`
      left: 0;
    `}
`;

type SlideInProps = PropsWithChildren<{ show: boolean }>;

export default function SlideIn({ show, children }: SlideInProps) {
  return <SlideInElement onScreen={show}>{children}</SlideInElement>;
}
