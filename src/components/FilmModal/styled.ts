import styled from 'styled-components';

export const StyledIframe = styled.iframe`
	position: relative;
	width: 100%;
	height: 100%;
`;

export const StyledText = styled.p`
	color: ${({ theme }) => theme.colors.textPrimary};
	text-align: center;
`;
