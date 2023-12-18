import React, { memo, type ReactNode } from 'react';
import { Portal } from '@components/Portal';
import { StyledModal, StyledContent } from './styled';

export interface ModalProps {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
}

export const Modal = memo(({ active, setActive, children }: ModalProps) => {
	const closeModal = () => {
		setActive(false);
	};

	return (
		<Portal>
			<StyledModal active={active.toString()} onClick={closeModal}>
				<StyledContent
					active={active.toString()}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{children}
				</StyledContent>
			</StyledModal>
		</Portal>
	);
});
