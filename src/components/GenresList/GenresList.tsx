import React, { memo, useCallback, useEffect, useState } from 'react';
import { filmsActions } from '../../store/slices/filmsSlice';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { GenresListItem, GenresListUl } from './styled';
import { Enums } from '../App/types/enums';
import { selectGenre } from '../../store/selectors/filmsSelectors';

interface GenresListProps {
    filterFilms: ({ genre, fromItem }: {genre: Enums, fromItem: number}) => void;
}

export const GenresList = memo(({ filterFilms }: GenresListProps) => {
    const dispatch = useAppDispatch();
    const [activeAll, setActiveAll] = useState<string>(Enums.ALL);
    const [activeDrama, setActiveDrama] = useState('');
    const [activeComedy, setActiveComedy] = useState('');
    const [activeFantastic, setActiveFantastic] = useState('');
    const [activeDetective, setActiveDetective] = useState('');
    const genre = useSelector(selectGenre);
    // const [filterFilms, { data: films }] = useFilterFilmsByGenreMutation();

    useEffect(() => {
        if (genre === Enums.ALL) {
            resetGenre();
        }
    }, [genre]);

    // useEffect(() => {
    //     if (films) {
    //         dispatch(filmsActions.setFilteredFilms(films));
    //     }
    // }, [films]);

    const resetGenre = () => {
        setActiveAll(Enums.ALL);
        setActiveDrama('');
        setActiveComedy('');
        setActiveFantastic('');
        setActiveDetective('');
        dispatch(filmsActions.setGenre(Enums.ALL));
    };

    const getAllGenres = useCallback(() => {
        resetGenre();
        dispatch(filmsActions.resetPagination());
        dispatch(filmsActions.resetFilms());
        // @ts-ignore
        dispatch(fetchFilmsData(1));
    }, []);

    const switchGenre = useCallback((genre) => {
        dispatch(filmsActions.resetPagination());
        dispatch(filmsActions.resetFilms());
        dispatch(filmsActions.setGenre(genre));

        setActiveAll('');
        genre === Enums.DRAMA ? setActiveDrama(Enums.DRAMA) : setActiveDrama('');
        genre === Enums.COMEDY ? setActiveComedy(Enums.COMEDY) : setActiveComedy('');
        genre === Enums.FANTASTIC ? setActiveFantastic(Enums.FANTASTIC) : setActiveFantastic('');
        genre === Enums.DETECTIVE ? setActiveDetective(Enums.DETECTIVE) : setActiveDetective('');

        if (genre) {
            // @ts-ignore
            // dispatch(fetchFilmsByGenre({ page: 1, genre }));
            filterFilms({ genre, fromItem: 0 });
        }
    }, [genre]);

    return (
        <GenresListUl>
            <GenresListItem active={activeAll} onClick={getAllGenres}>Все</GenresListItem>
            <GenresListItem active={activeDrama} onClick={() => switchGenre(Enums.DRAMA)}>Драма</GenresListItem>
            <GenresListItem active={activeComedy} onClick={() => switchGenre(Enums.COMEDY)}>Комедия</GenresListItem>
            <GenresListItem active={activeFantastic} onClick={() => switchGenre(Enums.FANTASTIC)}>Фантастика</GenresListItem>
            <GenresListItem active={activeDetective} onClick={() => switchGenre(Enums.DETECTIVE)}>Детектив</GenresListItem>
        </GenresListUl>
    );
});
