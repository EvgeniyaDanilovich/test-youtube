import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { filmsActions } from '@store/slices/filmsSlice';
import { fetchFilmsData } from '@store/services/fetchFilmsData/fetchFilmsData';
import { useAppDispatch } from '@/store';
import { Genres } from '@components/App/types/enums';
import { selectGenre } from '@store/selectors/filmsSelectors';
import { GenresListItem, GenresListUl } from './styled';
import { fetchFilmsByGenre } from '@store/services/fetchFilmsByGenre/fetchFilmsByGenre';

export const GenresList = memo(() => {
	const dispatch = useAppDispatch();
	const [activeAll, setActiveAll] = useState<string>(Genres.ALL);
	const [activeDrama, setActiveDrama] = useState('');
	const [activeComedy, setActiveComedy] = useState('');
	const [activeFantastic, setActiveFantastic] = useState('');
	const [activeDetective, setActiveDetective] = useState('');
	const genre = useSelector(selectGenre);

	useEffect(() => {
		if (genre === Genres.ALL) {
			resetGenre();
		}
	}, [genre]);

	const resetGenre = useCallback(() => {
		setActiveAll(Genres.ALL);
		setActiveDrama('');
		setActiveComedy('');
		setActiveFantastic('');
		setActiveDetective('');
		dispatch(filmsActions.setGenre(Genres.ALL));
	}, [setActiveAll, setActiveDrama, setActiveComedy, setActiveFantastic, setActiveDetective, dispatch]);

	const getAllGenres = useCallback(() => {
		resetGenre();
		dispatch(filmsActions.resetPagination());
		dispatch(filmsActions.resetFilms());
		// @ts-ignore
		dispatch(fetchFilmsData(1));
	}, []);

	const switchGenre = useCallback(
		(genre) => {
			dispatch(filmsActions.resetPagination());
			dispatch(filmsActions.resetFilms());
			dispatch(filmsActions.setGenre(genre));

			setActiveAll('');
			genre === Genres.DRAMA ? setActiveDrama(Genres.DRAMA) : setActiveDrama('');
			genre === Genres.COMEDY ? setActiveComedy(Genres.COMEDY) : setActiveComedy('');
			genre === Genres.FANTASTIC ? setActiveFantastic(Genres.FANTASTIC) : setActiveFantastic('');
			genre === Genres.DETECTIVE ? setActiveDetective(Genres.DETECTIVE) : setActiveDetective('');

			if (genre) {
				// @ts-ignore
				dispatch(fetchFilmsByGenre({ page: 1, genre }));
			}
		},
		[genre]
	);

	return (
		<GenresListUl>
			<GenresListItem active={activeAll} onClick={getAllGenres}>
				Все
			</GenresListItem>
			<GenresListItem
				active={activeDrama}
				onClick={() => {
					switchGenre(Genres.DRAMA);
				}}
			>
				Драма
			</GenresListItem>
			<GenresListItem
				active={activeComedy}
				onClick={() => {
					switchGenre(Genres.COMEDY);
				}}
			>
				Комедия
			</GenresListItem>
			<GenresListItem
				active={activeFantastic}
				onClick={() => {
					switchGenre(Genres.FANTASTIC);
				}}
			>
				Фантастика
			</GenresListItem>
			<GenresListItem
				active={activeDetective}
				onClick={() => {
					switchGenre(Genres.DETECTIVE);
				}}
			>
				Детектив
			</GenresListItem>
		</GenresListUl>
	);
});
