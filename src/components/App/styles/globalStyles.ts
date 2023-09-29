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
