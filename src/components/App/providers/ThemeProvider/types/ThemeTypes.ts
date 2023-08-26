export const LOCAL_STORAGE_THEME_KEY = 'theme';

export enum Theme {
    DARK = 'app_dark_theme',
    LIGHT = 'app_light_theme',
}

export interface ITheme{
    colors: {
        primary: string;
        secondary: string
    }
}
