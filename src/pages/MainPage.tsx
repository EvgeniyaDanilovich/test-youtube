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

export const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const films = useSelector((state: StateSchema) => state.main.films);
    const page = useSelector((state: StateSchema) => state.main.page);
    const genre = useSelector((state: StateSchema) => state.main.genre);
    const isSearch = useSelector((state: StateSchema) => state.main.isSearch);
    const isLoading = useSelector((state: StateSchema) => state.main.isLoading);
    const error = useSelector((state: StateSchema) => state.main.error);

    useEffect(() => {
        // @ts-ignore
        // dispatch(fetchFilmsData(page));
    }, [isLoading]);

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
            </FilmsWrapper>

            {isLoading &&
                <FilmsWrapper>
                    <SkeletonItem>
                        <Skeleton />
                        <Skeleton width={'200px'} height={'20px'} />
                        <Skeleton width={'100px'} height={'20px'} />
                    </SkeletonItem>
                    <SkeletonItem>
                        <Skeleton />
                        <Skeleton width={'200px'} height={'20px'} />
                        <Skeleton width={'100px'} height={'20px'} />
                    </SkeletonItem>
                    <SkeletonItem>
                        <Skeleton />
                        <Skeleton width={'200px'} height={'20px'} />
                        <Skeleton width={'100px'} height={'20px'} />
                    </SkeletonItem>
                    <SkeletonItem>
                        <Skeleton />
                        <Skeleton width={'200px'} height={'20px'} />
                        <Skeleton width={'100px'} height={'20px'} />
                    </SkeletonItem>
                </FilmsWrapper>
            }
            {!isLoading || !isSearch && <button onClick={showMore}>Показать больше</button>}
        </MainContainer>
    );
});

export default MainPage;
