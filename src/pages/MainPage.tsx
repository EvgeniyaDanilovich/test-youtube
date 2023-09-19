import React, { memo, useEffect } from 'react';
import { FilmsWrapper, MainContainer, StyledButton, Text } from './styled';
import { FilmCard } from '../components/FilmCard/FilmCard';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store/store';
import { fetchFilmsData } from '../store/services/fetchFilmsData/fetchFilmsData';
import { GenresList } from '../components/GenresList/GenresList';
import { FilmsSkeleton } from '../components/Skeleton/FilmsSkeleton';
import { Enums } from '../components/App/types/enums';
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

// import { Client } from '@elastic/elasticsearch';
//
// const client = new Client({
//     node: 'https://c2f49d7feaa948008026e0bb360cd821.us-central1.gcp.cloud.es.io',
//     cloud: { id: 'test-youtube:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRjMmY0OWQ3ZmVhYTk0ODAwODAyNmUwYmIzNjBjZDgyMSQwMzcwOGZjOGE3ZjI0ZDJmYTBkMThjODUyNjM2YjY5Mg==' },
//     auth: { apiKey: 'dk9KTHA0b0Jpd29ybzRRd0VUOUs6bmxzRDlNMHhTUHFXVkZGTGI4MmNkZw==' }  // 2
// });

const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const films = useSelector(selectFilms);
    const filteredFilms = useSelector(selectFilteredFilms);
    const filmsMessage = useSelector(selectMessage);
    const page = useSelector(selectPage);
    const fromItem = useSelector(selectFromItem);
    const genre = useSelector(selectGenre);
    const isSearch = useSelector(selectIsSearch);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
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
        if (genre && genre !== Enums.ALL) {
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
        <MainContainer>
            {!isSearch && <GenresList filterFilms={filterFilms} />}

            <FilmsWrapper>
                {films && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
                {isLoading && <FilmsSkeleton />}
            </FilmsWrapper>

            <FilmsWrapper>
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
