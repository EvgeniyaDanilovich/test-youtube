import styled, { css } from 'styled-components';

export const GenresListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 64px;
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

  ${props => props.active && css`
    color: #FFFFFF;
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.extra};
  `}
`;