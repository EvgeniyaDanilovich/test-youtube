import React, { Suspense } from 'react';
import { Header } from '../Header/Header';
// import { MainPageAsync as MainPage } from '../../pages/MainPage.async';
import { useTheme } from './providers/ThemeProvider/hooks/useTheme';
import { Theme } from './types/themeTypes';
// import { themeDark, themeLight } from './providers/ThemeProvider/ThemeProvider';
import { Global } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import MainPage from '../../pages/MainPage';
import { themeDark, themeLight } from './styles/themeStyles';

const App: React.FC = () => {
    // const [theme, themeToggler] = useTheme();
    const [theme, switchTheme] = useTheme();
    const themeMode = theme === Theme.LIGHT ? themeLight : themeDark;

    return (
        <ThemeProvider theme={themeMode}>
            <Global />
            <div className={'app'}>
                <Suspense fallback={'Page loading...'}>
                    <Header switchTheme={switchTheme} />
                    {/* <Header /> */}
                    <main className={'main'}>
                        <MainPage />
                        {/* <MainPage themeToggler={themeToggler} /> */}
                    </main>
                </Suspense>
            </div>
        </ThemeProvider>
    );
};

export default App;
