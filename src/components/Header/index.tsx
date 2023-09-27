import React, { memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store';
import { filmsActions } from '@store/slices/filmsSlice';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '@components/App/types/themeTypes';
import LogoIcon from '@assets/images/logo.svg';
import { fetchFilmsData } from '@store/services/fetchFilmsData/fetchFilmsData';
import { Genres, Messages } from '@components/App/types/enums';
import { SwitchSlider } from '@components/SwitchSlider';
import { SearchForm } from '@components/SearchForm';
import { useSearchFilmByNameMutation } from '@store/services/searchService/searchService';
import { HeaderContainer, LogoContainer, LogoText, LogoWrapper, RowWrapper } from './styled';

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
	}, [error]);

	const handleOnSubmit = useCallback((inputValue) => {
		dispatch(filmsActions.setMessage(undefined));
		searchFilm(inputValue);
		dispatch(filmsActions.resetFilms());
		dispatch(filmsActions.setIsSearch(true));
	}, []);

	const onSwitchTheme = useCallback(() => {
		switchTheme();
	}, [switchTheme]);

	const goAllFilms = useCallback(() => {
		dispatch(filmsActions.setMessage(undefined));
		dispatch(filmsActions.setIsSearch(false));
		dispatch(filmsActions.resetFilms());
		dispatch(filmsActions.resetPagination());
		dispatch(filmsActions.setGenre(Genres.ALL));
		// @ts-ignore
		dispatch(fetchFilmsData(1));
	}, []);

	return (
		<HeaderContainer>
			<RowWrapper>
				<LogoContainer>
					<LogoWrapper onClick={goAllFilms} data-testid="LogoWrapper">
						<LogoIcon />
						<LogoText>ModsenFilms</LogoText>
					</LogoWrapper>
				</LogoContainer>

				<SearchForm handleOnSubmit={handleOnSubmit} />

				<SwitchSlider action={onSwitchTheme} checkedStatus={checked} />
			</RowWrapper>
		</HeaderContainer>
	);
});
