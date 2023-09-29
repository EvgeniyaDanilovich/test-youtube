import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { Header } from '@components/Header';
import { useTheme } from '@utils/hooks/useTheme';
import { Theme } from '@components/App/types/themeTypes';
import { Global } from '@components/App/styles/globalStyles';
import { themeDark, themeLight } from '@components/App/styles/themeStyles';
import { MainPage } from '@pages/MainPage';

const App: React.FC = () => {
	const [theme, switchTheme] = useTheme();
	const themeMode = theme === Theme.LIGHT ? themeLight : themeDark;

	return (
		<ThemeProvider theme={themeMode}>
			<Global />
			<div className={'app'}>
				<Suspense fallback={'Page loading...'}>
					<Header switchTheme={switchTheme} />
					<main className={'main'}>
						<MainPage />
					</main>
				</Suspense>
			</div>
		</ThemeProvider>
	);
};

export default App;
