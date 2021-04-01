import React, { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components/macro';

const DialogOverlay = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${({ show }) =>
    show
      ? css`
          left: 0;
          background-color: rgba(255, 255, 255, 0.8);
        `
      : css`
          left: 100%;
          background-color: rgba(255, 255, 255, 0);
          // Put this here so the overlay doesn't disappear right away
          transition: left 0.3s step-end;
        `}
`;

const DialogContainer = styled.div<{ show: boolean }>`
  position: relative;
  top: 100%;
  transition: top 0.3s;

  ${({ show }) =>
    show
      ? css`
          top: 0;
        `
      : css`
          top: 100%;
        `}
`;

interface DialogProps {
  show: boolean;
  onClose?: () => void;
}

export default function Dialog(props: PropsWithChildren<DialogProps>) {
  const { children, show, onClose } = props;

  return (
    <DialogOverlay show={show} onClick={onClose}>
      <DialogContainer
        show={show}
        onClick={(e) => {
          // We don't want this event to be caught in overlay
          e.stopPropagation();
        }}
      >
        {children}
      </DialogContainer>
    </DialogOverlay>
  );
}
