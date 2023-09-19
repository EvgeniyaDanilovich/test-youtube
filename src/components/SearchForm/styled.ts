import styled from 'styled-components';
import { deviceSize } from '../App/styles/globalStyles';

export const Form = styled.form`
  flex: 0 0 330px;
  height: 44px;
  border-radius: 4px;
  padding: 0 10px 0 20px;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  margin-right: 25px;
  background-color: #FFFFFF;

  @media (max-width: ${deviceSize['laptop-m']}) {
    flex: 1 0 100%;
    order: 3;
    margin: 0;
  }
`;

export const InputText = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

export const SearchBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 3px 0 0 5px;
  background-color: transparent;
`;
