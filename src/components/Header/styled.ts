import styled from 'styled-components';
import { deviceSize } from '../App/styles/globalStyles';

export const HeaderContainer = styled.header`
	max-width: 1200px;
	margin: 0 auto 32px auto;
	padding: 34px 15px;

	@media (max-width: ${deviceSize['laptop-m']}) {
		padding: 24px 15px;
		margin: 0 auto 20px auto;
	}

	@media (max-width: ${deviceSize['mobile-l']}) {
		padding: 15px 10px;
		margin: 0 auto 15px auto;
	}
`;

export const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	@media (max-width: ${deviceSize['laptop-m']}) {
		flex-wrap: wrap;
		row-gap: 25px;
	}

	@media (max-width: ${deviceSize['mobile-l']}) {
		row-gap: 15px;
	}
`;

export const LogoContainer = styled.div`
	flex: 1 1 auto;
`;

export const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	max-width: 180px;
	column-gap: 10px;
	cursor: pointer;
	margin-right: 15px;
`;

export const LogoText = styled.span`
	font-weight: 700;
	font-size: 18px;
`;
