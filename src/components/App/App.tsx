import React, { Suspense } from 'react';
import { Header } from '../Header/Header';
// import { MainPageAsync as MainPage } from '../../pages/MainPage.async';
import { useTheme } from './providers/ThemeProvider/hooks/useTheme';
import { Theme } from './providers/ThemeProvider/types/ThemeTypes';
import { themeDark, themeLight } from './providers/ThemeProvider/ThemeProvider';
import { Global } from '../globalStyles';
import { ThemeProvider } from 'styled-components';
import MainPage from '../../pages/MainPage';

const App: React.FC = () => {
    const [theme, themeToggler] = useTheme();
    const themeMode = theme === Theme.LIGHT ? themeLight : themeDark;

    return (
        <ThemeProvider theme={themeMode}>
            <Global />
            <div className={'app'}>
                <Suspense fallback={'Page loading...'}>
                    <Header />
                    <main className={'main'}>
                        main page
                        <MainPage themeToggler={themeToggler} />
                    </main>
                </Suspense>
            </div>
        </ThemeProvider>
    );
};

export default App;
