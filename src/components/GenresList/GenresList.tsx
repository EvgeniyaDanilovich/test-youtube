import React, { useCallback, useState } from 'react';
import { mainActions } from '../../store/slices/mainSlice';
import { fetchFilmsByGenre } from '../../store/services/fetchFilmsByGenre/fetchFilmsByGenre';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { StateSchema, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

export enum Genres {
    ALL = 'все',
    DRAMA = 'драма',
    DETECTIVE = 'детектив',
    COMEDY = 'комедия',
    FANTASTIC = 'фантастика'
}

export const GenresListUl = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 10px;
  margin-bottom: 30px;
`;

interface GenresListItemProps {
    active: string;
}

export const GenresListItem = styled.li<GenresListItemProps>`
  list-style-type: none;
  ${props => props.active === Genres.ALL && css`
    color: ${({ theme }) => theme.colors.extra};
  `}
  ${props => props.active === Genres.COMEDY && css`
    color: ${({ theme }) => theme.colors.extra};
  `}
  ${props => props.active === Genres.FANTASTIC && css`
    color: ${({ theme }) => theme.colors.extra};
  `}
  ${props => props.active === Genres.DETECTIVE && css`
    color: ${({ theme }) => theme.colors.extra};
  `}
  ${props => props.active === Genres.DRAMA && css`
    color: ${({ theme }) => theme.colors.extra};
  `}
`;

export const GenresList = () => {
    const dispatch = useAppDispatch();
    const [activeAll, setActiveAll] = useState<string>(Genres.ALL);
    const [activeDrama, setActiveDrama] = useState('');
    const [activeComedy, setActiveComedy] = useState('');
    const [activeFantastic, setActiveFantastic] = useState('');
    const [activeDetective, setActiveDetective] = useState('');
    const page = useSelector((state: StateSchema) => state.main.page);
    const genre = useSelector((state: StateSchema) => state.main.genre);

    const resetGenre = useCallback(() => {
        setActiveAll(Genres.ALL);
        setActiveDrama('');
        setActiveComedy('');
        setActiveFantastic('');
        setActiveDetective('');
        dispatch(mainActions.resetFilms());
        dispatch(mainActions.setGenre(''));
        // @ts-ignore
        dispatch(fetchFilmsData(page));
    }, [page]);

    const switchGenre = useCallback((genre) => {
        dispatch(mainActions.setPage(1));
        dispatch(mainActions.resetFilms());
        mainActions.setGenre(genre);

        // console.log(genre);
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
            <GenresListItem active={activeAll} onClick={resetGenre}>Все</GenresListItem>
            <GenresListItem active={activeDrama} onClick={() => switchGenre(Genres.DRAMA)}>Драма</GenresListItem>
            <GenresListItem active={activeComedy} onClick={() => switchGenre(Genres.COMEDY)}>Комедия</GenresListItem>
            <GenresListItem active={activeFantastic} onClick={() => switchGenre(Genres.FANTASTIC)}>Фантастика</GenresListItem>
            <GenresListItem active={activeDetective} onClick={() => switchGenre(Genres.DETECTIVE)}>Детектив</GenresListItem>
        </GenresListUl>
    );
};
