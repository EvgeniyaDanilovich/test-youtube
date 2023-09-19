import styled from 'styled-components';
import { deviceSize } from '../App/styles/globalStyles';

export const FilmImg = styled.img`
  width: 252px;
  height: 280px;

  @media (max-width: ${deviceSize['laptop-m']}) {
    width: 180px;
    height: 220px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Text = styled.p`
  font-weight: 600;
  margin-top: 15px;
`;

export const Data = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
