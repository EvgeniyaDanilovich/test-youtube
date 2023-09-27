import React, { memo, useEffect } from 'react';
import { FilmsWrapper, MainContainer, StyledButton, Text } from './styled';
import { FilmCard } from '../components/FilmCard/FilmCard';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchFilmsData } from '../store/services/fetchFilmsData/fetchFilmsData';
import { GenresList } from '../components/GenresList/GenresList';
import { FilmsSkeleton } from '../components/Skeleton/FilmsSkeleton';
import { Genres } from '../components/App/types/enums';
import {
    selectError,
    selectFilms,
    selectFilteredFilms,
    selectFromItem,
    selectGenre,
    selectIsLoading,
    selectIsSearch,
    selectMessage,
    selectPage
} from '../store/selectors/filmsSelectors';
import { useFilterFilmsByGenreMutation } from '../store/services/searchService/searchService';
import { filmsActions } from '../store/slices/filmsSlice';

const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const films = useAppSelector(selectFilms);
    const filteredFilms = useAppSelector(selectFilteredFilms);
    const filmsMessage = useAppSelector(selectMessage);
    const page = useAppSelector(selectPage);
    const fromItem = useAppSelector(selectFromItem);
    const genre = useAppSelector(selectGenre);
    const isSearch = useAppSelector(selectIsSearch);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);
    const [filterFilms, { data: filteredFilm, isLoading: isLoadingFilteredFilms, error: errorFilteredFilms }] = useFilterFilmsByGenreMutation();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchFilmsData(page));
    }, []);

    useEffect(() => {
        if (filteredFilm) {
            dispatch(filmsActions.setFilteredFilms(filteredFilm));
        }
    }, [filteredFilm]);

    const showMore = () => {
        console.log(page);
        if (genre && genre !== Genres.ALL) {
            // @ts-ignore
            // dispatch(fetchFilmsByGenre({ page, genre }));
            console.log(fromItem);
            filterFilms({ genre, fromItem });
        } else {
            // @ts-ignore
            dispatch(fetchFilmsData(page));
        }
    };

    if (error || errorFilteredFilms) {
        return (
            <MainContainer>
                <Text>Произошла ошибка</Text>
            </MainContainer>
        );
    }

    return (
        <MainContainer data-testid='MainPage'>
            {!isSearch && <GenresList filterFilms={filterFilms} />}

            <FilmsWrapper>
                {films && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
                {isLoading && <FilmsSkeleton />}
            </FilmsWrapper>

            <FilmsWrapper data-testid='FilmsWrapper'>
                {filteredFilms && filteredFilms.map((film) => (
                    <FilmCard key={film._source.id} film={film._source} />
                ))}
                {isLoadingFilteredFilms && <FilmsSkeleton />}
            </FilmsWrapper>

            {filmsMessage && <Text>{filmsMessage}</Text>}

            {
                (isLoading || isLoadingFilteredFilms || filmsMessage || isSearch) ?
                    null
                    : <StyledButton onClick={showMore}>Показать больше</StyledButton>
            }
        </MainContainer>
    );
});

export default MainPage;
