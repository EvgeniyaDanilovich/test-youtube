import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type StateSchema, useAppDispatch } from '../store/store';
import { FilmCard } from '../components/FilmCard/FilmCard';
import { FilmsWrapper } from './styled';
import { Modal } from '../components/Modal/Modal';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { fetchFilmsData } from '../store/services/fetchFilmsData/fetchFilmsData';
import { useGetFilmQuery } from '../store/services/filmService/filmApi';
import { FilmsData } from '../store/services/filmService/types';

interface MainPageProps {
    themeToggler: () => void;
}

const MainPage = memo(({ themeToggler }: MainPageProps) => {
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const { data: films, error, isLoading, refetch } = useGetFilmQuery(page);

    // const films = useSelector((state: StateSchema) => state.main.films);
    useEffect(() => {
        console.log(films);
        // dispatch(fetchFilmsData());
    }, [films]);

    const handleOpen = () => {
        setModalActive(true);
    };

    const handleTheme = () => {
        themeToggler();
    };

    const showMore = () => {
        setPage(page => page + 1);
        refetch();
    };

    if (error) {
        return (<div>Произошла ошибка</div>);
    }

    if (isLoading) {
        return (
            <FilmsWrapper>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </FilmsWrapper>
        );
    }

    return (
        <div>
            dsf
            <FilmsWrapper>
                {films && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </FilmsWrapper>
            <button onClick={showMore}>Показать больше</button>
            <button onClick={handleOpen}>Open</button>
            <button onClick={handleTheme}>Switch theme</button>

            <FilmsWrapper>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </FilmsWrapper>

            <Modal active={modalActive} setActive={setModalActive}>
                modal here
            </Modal>
        </div>
    );
});

export default MainPage;
