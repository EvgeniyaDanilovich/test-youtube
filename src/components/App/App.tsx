import React, { Suspense } from 'react';
import { Header } from '../Header/Header';
import { MainPageAsync as MainPage } from '../../pages/MainPage.async';
import { useTheme } from './providers/ThemeProvider/hooks/useTheme';
import { Theme } from './types/themeTypes';
import { Global } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { themeDark, themeLight } from './styles/themeStyles';

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
