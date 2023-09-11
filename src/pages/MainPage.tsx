import React, { memo, useCallback, useEffect, useState } from 'react';
import { FilmsWrapper } from './styled';
import { Modal } from '../components/Modal/Modal';
import { FilmCard } from '../components/FilmCard/FilmCard';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { StateSchema, useAppDispatch } from '../store/store';
import { fetchFilmsData } from '../store/services/fetchFilmsData/fetchFilmsData';
import { fetchFilmsByGenre } from '../store/services/fetchFilmsByGenre/fetchFilmsByGenre';
import { mainActions } from '../store/slices/mainSlice';
import styled from 'styled-components';
import { GenresList } from '../components/GenresList/GenresList';

interface MainPageProps {
    themeToggler: () => void;
}

export const MainContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const films = useSelector((state: StateSchema) => state.main.films);
    const page = useSelector((state: StateSchema) => state.main.page);
    const genre = useSelector((state: StateSchema) => state.main.genre);

    useEffect(() => {
        console.log(page);
        // @ts-ignore
        // dispatch(fetchFilmsData(page));
    }, []);

    const handleOpen = () => {
        setModalActive(true);
    };

    const showMore = () => {
        // dispatch(mainActions.setPage(page + 1));
        console.log(page);
        if (genre) {
            // @ts-ignore
            dispatch(fetchFilmsByGenre({ page, genre }));
        } else {
            // @ts-ignore
            dispatch(fetchFilmsData(page));
        }
    };

    // if (error) {
    //     return (<div>Произошла ошибка</div>);
    // }
    //
    // if (isLoading) {
    //     return (
    //         <FilmsWrapper>
    //             <Skeleton />
    //             <Skeleton />
    //             <Skeleton />
    //             <Skeleton />
    //         </FilmsWrapper>
    //     );
    // }

    // const switchGenre = useCallback((genre) => {
    //     setGenre(genre);
    //     setCurrentFilms(filmsByGenre)
    // }, [filmsByGenre])

    return (
        <MainContainer>
            <GenresList />
            <FilmsWrapper>
                {films && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </FilmsWrapper>
            <button onClick={showMore}>Показать больше</button>

            {/* <button onClick={handleOpen}>Open</button> */}
            {/* <Modal active={modalActive} setActive={setModalActive}> */}
            {/*     modal here */}
            {/* </Modal> */}
        </MainContainer>
    );
});

export default MainPage;
