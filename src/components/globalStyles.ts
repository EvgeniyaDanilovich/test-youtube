import { createGlobalStyle } from 'styled-components';


export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

// background: ${({ theme }) => theme.primary};
// color: ${({ theme }) => theme.secondary};
// background-color: ${props => props.theme.colors.primary};

// export const Text = styled.p`
//   display: block;
//   font-size: 16px;
// `;
//
// export const Button = styled.button`
//   border: 1px solid #000;
//   background-color: transparent;
// `;
