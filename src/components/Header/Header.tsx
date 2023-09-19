import React, { memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { filmsActions } from '../../store/slices/filmsSlice';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '../App/types/themeTypes';
import { HeaderContainer, LogoText, LogoWrapper, RowWrapper } from './styled';
import LogoIcon from '../../assets/images/logo.svg';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { Enums, Messages } from '../App/types/enums';
import { SwitchSlider } from '../SwitchSlider/SwitchSlider';
import { SearchForm } from '../SearchForm/SearchForm';
import { useSearchFilmByNameMutation } from '../../store/services/searchService/searchService';

interface HeaderProps {
    switchTheme: () => void;
}

export const Header = memo(({ switchTheme }: HeaderProps) => {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(false);
    const [searchFilm, { data: films, isLoading, error }] = useSearchFilmByNameMutation();

    useEffect(() => {
        const localTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
        localTheme === Theme.DARK ? setChecked(true) : setChecked(false);
    }, []);

    useEffect(() => {
        dispatch(filmsActions.setIsLoading(isLoading));
        if (films && !films.length) {
            dispatch(filmsActions.setMessage(Messages.NOT_FOUND));
        } else {
            dispatch(filmsActions.setFilteredFilms(films));
        }
    }, [films, isLoading]);

    useEffect(() => {
        if (error) {
            dispatch(filmsActions.setError('Some error'));
        }
        console.log(error);
    }, [error]);

    const handleOnSubmit = useCallback((inputValue) => {
        searchFilm(inputValue);
        dispatch(filmsActions.resetFilms());
        dispatch(filmsActions.setSearch(true));
        // @ts-ignore
        // dispatch(fetchFilmByName(inputValue));
    }, []);

    const onSwitchTheme = useCallback(() => {
        switchTheme();
    }, [switchTheme]);

    const goAllFilms = useCallback(() => {
        dispatch(filmsActions.setSearch(false));
        dispatch(filmsActions.resetFilms());
        dispatch(filmsActions.resetPagination());
        dispatch(filmsActions.setGenre(Enums.ALL));
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
