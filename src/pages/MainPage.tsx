import React, { memo, useEffect } from 'react';
import { FilmsWrapper, MainContainer, StyledButton, } from './styled';
import { FilmCard } from '../components/FilmCard/FilmCard';
import { useSelector } from 'react-redux';
import { StateSchema, useAppDispatch } from '../store/store';
import { fetchFilmsData } from '../store/services/fetchFilmsData/fetchFilmsData';
import { fetchFilmsByGenre } from '../store/services/fetchFilmsByGenre/fetchFilmsByGenre';
import { GenresList } from '../components/GenresList/GenresList';
import { FilmsSkeleton } from '../components/Skeleton/FilmsSkeleton';
import { Genres } from '../components/App/types/genres';
import {
    selectError, selectFilms, selectFilmsMessage,
    selectGenre, selectIsLoading, selectIsSearch, selectPage
} from '../store/selectors/filmsSelectors';

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
    const filmsMessage = useSelector(selectFilmsMessage);
    const page = useSelector(selectPage);
    const genre = useSelector(selectGenre);
    const isSearch = useSelector(selectIsSearch);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        // const f = async () => {
        //     const elasticResult = await client.search({
        //         index: 'test-index-3',
        //         query: {
        //             match: {
        //                 "name": "Джентльмены"
        //             }
        //         }
        //     })
        //
        //     console.log(await elasticResult)
        // }

        // f();

        // @ts-ignore
        dispatch(fetchFilmsData(page));
    }, []);

    const showMore = () => {
        console.log(page);
        if (genre && genre !== Genres.ALL) {
            // @ts-ignore
            dispatch(fetchFilmsByGenre({ page, genre }));
        } else {
            // @ts-ignore
            dispatch(fetchFilmsData(page));
        }
    };

    if (error) {
        return (<div>Произошла ошибка</div>);
    }

    return (
        <MainContainer>
            {!isSearch && <GenresList />}

            <FilmsWrapper>
                {films && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
                {isLoading && <FilmsSkeleton />}
            </FilmsWrapper>

            {filmsMessage && <div>{filmsMessage}</div>}

            {isLoading || !isSearch && <StyledButton onClick={showMore}>Показать больше</StyledButton>}
        </MainContainer>
    );
});

export default MainPage;
