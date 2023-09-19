import React, { useCallback, useEffect, useState } from 'react';
import { filmsActions } from '../../store/slices/filmsSlice';
import { fetchFilmsByGenre } from '../../store/services/fetchFilmsByGenre/fetchFilmsByGenre';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { StateSchema, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { GenresListUl, GenresListItem } from './styled';
import { Genres } from '../App/types/genres';
import { selectGenre, selectPage } from '../../store/selectors/filmsSelectors';

export const GenresList = () => {
    const dispatch = useAppDispatch();
    const [activeAll, setActiveAll] = useState<string>(Genres.ALL);
    const [activeDrama, setActiveDrama] = useState('');
    const [activeComedy, setActiveComedy] = useState('');
    const [activeFantastic, setActiveFantastic] = useState('');
    const [activeDetective, setActiveDetective] = useState('');
    const page = useSelector(selectPage);
    const genre = useSelector(selectGenre);

    useEffect(() => {
        console.log(page);
        if (genre === Genres.ALL) {
            resetGenre();
        }
    }, [genre]);

    const resetGenre = () => {
        setActiveAll(Genres.ALL);
        setActiveDrama('');
        setActiveComedy('');
        setActiveFantastic('');
        setActiveDetective('');
        dispatch(filmsActions.setGenre(Genres.ALL));
    };

    const getAllGenres = useCallback(() => {
        resetGenre();
        dispatch(filmsActions.setPage(1));
        dispatch(filmsActions.resetFilms());
        // @ts-ignore
        dispatch(fetchFilmsData(1));
    }, []);

    const switchGenre = useCallback((genre) => {
        console.log(page);
        dispatch(filmsActions.setPage(1));
        dispatch(filmsActions.resetFilms());
        dispatch(filmsActions.setGenre(genre));

        console.log(page);

        setActiveAll('');
        genre === Genres.DRAMA ? setActiveDrama(Genres.DRAMA) : setActiveDrama('');
        genre === Genres.COMEDY ? setActiveComedy(Genres.COMEDY) : setActiveComedy('');
        genre === Genres.FANTASTIC ? setActiveFantastic(Genres.FANTASTIC) : setActiveFantastic('');
        genre === Genres.DETECTIVE ? setActiveDetective(Genres.DETECTIVE) : setActiveDetective('');

        if (genre) {
            // @ts-ignore
            dispatch(fetchFilmsByGenre({ page: 1, genre }));
        }
    }, [page, genre]);

    return (
        <GenresListUl>
            <GenresListItem active={activeAll} onClick={getAllGenres}>Все</GenresListItem>
            <GenresListItem active={activeDrama} onClick={() => switchGenre(Genres.DRAMA)}>Драма</GenresListItem>
            <GenresListItem active={activeComedy} onClick={() => switchGenre(Genres.COMEDY)}>Комедия</GenresListItem>
            <GenresListItem active={activeFantastic} onClick={() => switchGenre(Genres.FANTASTIC)}>Фантастика</GenresListItem>
            <GenresListItem active={activeDetective} onClick={() => switchGenre(Genres.DETECTIVE)}>Детектив</GenresListItem>
        </GenresListUl>
    );
};
