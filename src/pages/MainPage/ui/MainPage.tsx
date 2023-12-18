import React, { memo, useEffect } from 'react';
import { FilmsWrapper, MainContainer, StyledButton, Text } from '../styled';
import { useAppDispatch, useAppSelector } from '@/store';
import { FilmCard } from '@components/FilmCard';
import { fetchFilmsData } from '@store/services/fetchFilmsData/fetchFilmsData';
import { GenresList } from '@components/GenresList';
import { FilmsSkeleton } from '@components/Skeleton/FilmsSkeleton';
import { Genres } from '@components/App/types/enums';
import {
	selectError,
	selectFilms,
	selectGenre,
	selectIsLoading,
	selectIsSearch,
	selectMessage,
	selectPage,
} from '@store/selectors/filmsSelectors';
import { fetchFilmsByGenre } from '@store/services/fetchFilmsByGenre/fetchFilmsByGenre';

const MainPage = memo(() => {
	const dispatch = useAppDispatch();
	const films = useAppSelector(selectFilms);
	const filmsMessage = useAppSelector(selectMessage);
	const page = useAppSelector(selectPage);
	const genre = useAppSelector(selectGenre);
	const isSearch = useAppSelector(selectIsSearch);
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchFilmsData(page));
	}, []);

	const showMore = () => {
		if (genre && genre !== Genres.ALL) {
			// @ts-ignore
			dispatch(fetchFilmsByGenre({ page, genre }));
		} else {
			// @ts-ignore
			dispatch(fetchFilmsData(page));
		}
	};

	if (error) {
		return (
			<MainContainer>
				<Text>Произошла ошибка</Text>
			</MainContainer>
		);
	}

	return (
		<MainContainer data-testid="MainPage">
			{!isSearch && <GenresList />}

			<FilmsWrapper>
				{films && films.map((film) => <FilmCard key={film.id} film={film} />)}
				{isLoading && <FilmsSkeleton />}
			</FilmsWrapper>

			{filmsMessage && <Text>{filmsMessage}</Text>}
			{isLoading || filmsMessage || isSearch ? null : (
				<StyledButton onClick={showMore}>Показать больше</StyledButton>
			)}
		</MainContainer>
	);
});

export default MainPage;
