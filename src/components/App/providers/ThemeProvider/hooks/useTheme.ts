import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '../../../types/themeTypes';

export const useTheme = (): [Theme, () => void] => {
    const [theme, setTheme] = useState(Theme.LIGHT);

    const setMode = (mode) => {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, mode);
        setTheme(mode);
    };

    const switchTheme = () => {
        theme === Theme.LIGHT ? setMode(Theme.DARK) : setMode(Theme.LIGHT);
    };

    useEffect(() => {
        const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
        localTheme && setTheme(localTheme);
    }, []);

    return [theme, switchTheme];
};
