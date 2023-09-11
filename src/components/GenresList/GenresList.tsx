import React, { useCallback, useEffect, useState } from 'react';
import { mainActions } from '../../store/slices/mainSlice';
import { fetchFilmsByGenre } from '../../store/services/fetchFilmsByGenre/fetchFilmsByGenre';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { StateSchema, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { GenresListUl, GenresListItem } from './styled';
import { Genres } from '../App/types/genres';

export const GenresList = () => {
    const dispatch = useAppDispatch();
    const [activeAll, setActiveAll] = useState<string>(Genres.ALL);
    const [activeDrama, setActiveDrama] = useState('');
    const [activeComedy, setActiveComedy] = useState('');
    const [activeFantastic, setActiveFantastic] = useState('');
    const [activeDetective, setActiveDetective] = useState('');
    const page = useSelector((state: StateSchema) => state.main.page);
    const genre = useSelector((state: StateSchema) => state.main.genre);

    useEffect(() => {
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
        dispatch(mainActions.setGenre(Genres.ALL));
    };

    const getAllGenres = useCallback(() => {
        resetGenre();
        dispatch(mainActions.resetFilms());
        // @ts-ignore
        dispatch(fetchFilmsData(page));
    }, [page]);

    const switchGenre = useCallback((genre) => {
        dispatch(mainActions.setPage(1));
        dispatch(mainActions.resetFilms());
        dispatch(mainActions.setGenre(genre));

        setActiveAll('');
        genre === Genres.DRAMA ? setActiveDrama(Genres.DRAMA) : setActiveDrama('');
        genre === Genres.COMEDY ? setActiveComedy(Genres.COMEDY) : setActiveComedy('');
        genre === Genres.FANTASTIC ? setActiveFantastic(Genres.FANTASTIC) : setActiveFantastic('');
        genre === Genres.DETECTIVE ? setActiveDetective(Genres.DETECTIVE) : setActiveDetective('');

        if (genre) {
            // @ts-ignore
            dispatch(fetchFilmsByGenre({ page, genre }));
        } else {
            // @ts-ignore
            dispatch(fetchFilmsData(page));
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
