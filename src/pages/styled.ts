import styled from 'styled-components';
import { deviceSize } from '../components/App/styles/globalStyles';

export const FilmsWrapper = styled.section`
  display: grid;
  gap: 40px;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 252px);

  @media (max-width: ${deviceSize['laptop-m']}) {
    grid-template-columns: repeat(auto-fill, 180px);
    gap: 25px;
  }
`;

export const MainContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px 50px 15px;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StyledButton = styled.button`
  display: block;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding-bottom: 3px;
  margin: 40px auto 0 auto;
  cursor: pointer;
  font-size: 14px;
  border: none;
  outline: none;

  text-decoration: none;
  background-image: linear-gradient(${({ theme }) => theme.colors.extra}, ${({ theme }) => theme.colors.extra});
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 2px;
  transition: background-size .3s;

  &:hover {
    background-size: 100% 2px;
    color: ${({ theme }) => theme.colors.extra};
  }
`;