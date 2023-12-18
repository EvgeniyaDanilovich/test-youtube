import styled, { css } from 'styled-components';
import { deviceSize } from '../App/styles/globalStyles';

export const GenresListUl = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
	margin-bottom: 64px;

	@media (max-width: ${deviceSize['laptop-m']}) {
		margin-bottom: 45px;
	}
`;

interface GenresListItemProps {
	active: string;
}

export const GenresListItem = styled.li<GenresListItemProps>`
	cursor: pointer;
	padding: 7px 20px;
	border-radius: 50px;
	list-style-type: none;
	background-color: ${({ theme }) => theme.colors.background};
	border: 1px solid ${({ theme }) => theme.colors.extra};

	&:hover {
		color: ${({ theme }) => theme.colors.extra};
	}

	${(props) =>
		props.active &&
		css`
			color: #ffffff;
			background-color: ${({ theme }) => theme.colors.extra};

			&:hover {
				color: #ffffff;
				pointer-events: none;
			}
		`}
`;
