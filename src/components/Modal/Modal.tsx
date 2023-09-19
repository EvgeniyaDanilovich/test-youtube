import React, { ReactNode } from 'react';
import { Portal } from '../Portal/Portal';
import { StyledModal, StyledContent } from './styled';

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
