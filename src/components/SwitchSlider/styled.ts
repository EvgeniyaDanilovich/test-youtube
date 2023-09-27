import styled, { css } from 'styled-components';
import { deviceSize } from '../App/styles/globalStyles';

interface SliderProps {
	checkedstatus: string;
}

export const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: 40px;
	height: 24px;

	@media (max-width: ${deviceSize['laptop-m']}) {
		order: 2;
	}
`;

export const Slider = styled.span<SliderProps>`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 24px;
	background-color: ${({ theme }) => theme.colors.textPrimary};
	transition: 0.4s;

	&:before {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		left: 4px;
		bottom: 4px;
		border-radius: 50%;
		background-color: ${({ theme }) => theme.colors.background};
		transition: 0.4s;
		${(props) =>
			props.checkedstatus === 'true' &&
			css`
				transform: translateX(16px);
			`}
	}
`;

export const Checkbox = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;
