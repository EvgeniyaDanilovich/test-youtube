import { createGlobalStyle } from 'styled-components';

interface DeviceSizeI {
	'mobile-l': string;
	'laptop-m': string;
	'laptop-l': string;
}

export const deviceSize: DeviceSizeI = {
	'mobile-l': '425px',
	'laptop-m': '645px',
	'laptop-l': '768px',
};

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

// background: ${({ theme }) => theme.textPrimary};
// color: ${({ theme }) => theme.background};
// background-color: ${props => props.theme.colors.textPrimary};

// export const Text = styled.p`
//   display: block;
//   font-size: 16px;
// `;
//
// export const Button = styled.button`
//   border: 1px solid #000;
//   background-color: transparent;
// `;
