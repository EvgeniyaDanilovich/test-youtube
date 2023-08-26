import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Portal } from '../Portal/Portal';

interface StyledDivProps {
    active: string;
}

const StyledModal = styled.div<StyledDivProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(151, 149, 143, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: 0.5s;

  ${props => props.active === 'true' && css`
    opacity: 1;
    pointer-events: all;
  `}
`;

const StyledContent = styled.div<StyledDivProps>`
  padding: 35px;
  width: 400px;
  background-color: #FAFAFA;
  border-radius: 8px;
  transform: scale(0.5);
  transition: 0.4s all;
  ${props => props.active === 'true' && css`
    transform: scale(1);
  `}
`;

export interface ModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
    const closeModal = () => {
        setActive(false);
    };

    return (
        <Portal>
            <StyledModal active={active.toString()} onClick={closeModal}>
                <StyledContent active={active.toString()} onClick={(e) => e.stopPropagation()}>
                    {children}
                </StyledContent>
            </StyledModal>
        </Portal>
    );
};
