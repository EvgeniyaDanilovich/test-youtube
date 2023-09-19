import React, { memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { filmsActions } from '../../store/slices/filmsSlice';
import { fetchFilmByName } from '../../store/services/fetchFilmByName/fetchFilmByName';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '../App/types/themeTypes';
import { HeaderContainer, LogoText, LogoWrapper, RowWrapper } from './styled';
import LogoIcon from '../../assets/images/logo.svg';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { Genres } from '../App/types/genres';
import { SwitchSlider } from '../SwitchSlider/SwitchSlider';
import { SearchForm } from '../SearchForm/SearchForm';
import { useSearchFilmByNameMutation } from '../../store/services/searchService/searchService';

interface HeaderProps {
    switchTheme: () => void;
}

export const Header = memo(({ switchTheme }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(false);
    const [searchFilm, { data: film }] = useSearchFilmByNameMutation();

    useEffect(() => {
        const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
        localTheme === Theme.DARK ? setChecked(true) : setChecked(false);
    }, []);

    useEffect(() => {
        console.log(film);
    }, [film]);

    const handleOnSubmit = useCallback((inputValue) => {
        searchFilm(inputValue);
        dispatch(filmsActions.resetFilms());
        // @ts-ignore
        dispatch(fetchFilmByName(inputValue));
    }, []);

    const onSwitchTheme = useCallback(() => {
        switchTheme();
    }, [switchTheme]);

    const goAllFilms = useCallback(() => {
        dispatch(filmsActions.resetSearch());
        dispatch(filmsActions.resetFilms());
        dispatch(filmsActions.setGenre(Genres.ALL));
        // @ts-ignore
        dispatch(fetchFilmsData(1));
    }, []);

    return (
        <HeaderContainer>
            <RowWrapper>
                <LogoWrapper onClick={goAllFilms}>
                    <LogoIcon />
                    <LogoText>ModsenFilms</LogoText>
                </LogoWrapper>

                <SearchForm handleOnSubmit={handleOnSubmit} />

                <SwitchSlider action={onSwitchTheme} checkedStatus={checked} />
            </RowWrapper>
        </HeaderContainer>
    );
});
