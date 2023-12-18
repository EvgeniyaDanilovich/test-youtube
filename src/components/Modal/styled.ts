import styled, { css } from 'styled-components';

interface StyledDivProps {
	active: string;
}

export const StyledModal = styled.div<StyledDivProps>`
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

	${(props) =>
		props.active === 'true' &&
		css`
			opacity: 1;
			pointer-events: all;
		`}
`;

export const StyledContent = styled.div<StyledDivProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 650px;
	height: 400px;
	padding: 10px;
	margin: 10px;

	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 8px;
	transform: scale(0.5);
	transition: 0.4s all;
	${(props) =>
		props.active === 'true' &&
		css`
			transform: scale(1);
		`}
`;
