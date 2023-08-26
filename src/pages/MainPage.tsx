import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type StateSchema, useAppDispatch } from '../store/store';
import { FilmCard } from '../components/FilmCard/FilmCard';
import { FilmsWrapper } from './styled';
import { Modal } from '../components/Modal/Modal';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { fetchFilmsData } from '../store/services/fetchFilmsData/fetchFilmsData';

interface MainPageProps {
    themeToggler: () => void;
}

const MainPage = memo(({ themeToggler }: MainPageProps) => {
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);

    const films = useSelector((state: StateSchema) => state.main.films);
    useEffect(() => {
        // dispatch(fetchFilmsData());
    }, []);

    const handleOpen = () => {
        setModalActive(true);
    };

    const handleTheme = () => {
        themeToggler();
    };

    return (
        <div>
            dsf
            <FilmsWrapper>
                {films && films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </FilmsWrapper>
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
