import styled from 'styled-components';

export const PageErrorWrapper = styled.div`
	margin: 0;
	padding: 0;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ErrorText = styled.p`
	margin: -2px 3px 0 0;
	font-size: 16px;
`;

export const ErrorButton = styled.button`
	background: transparent;
	border: none;
	outline: none;
	margin: 0;
	font-size: 14px;

	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;
