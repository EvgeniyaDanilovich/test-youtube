import React, { memo, useEffect, useState } from 'react';
import { FilmImg } from './styled';
import { FilmDetails } from '../FilmDetails/FilmDetails';
import { Modal } from '../Modal/Modal';
import { Film } from '../../store/types/filmTypes';

interface FilmCardProps {
    film: Film;
}

export const FilmCard = memo(({ film }: FilmCardProps) => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [poster, setPoster] = useState('');

    useEffect(() => {
        if (typeof film.poster === 'string') {
            setPoster(film.poster);
        } else {
            setPoster(film.poster.url);
        }
    }, [poster]);

    const handleModal = () => {
        setModalActive(true);
    };

    return (
        <div>
            <FilmImg onClick={handleModal} src={poster} alt={'film'} />
            <Modal active={modalActive} setActive={setModalActive}>
                <FilmDetails film={film} />
            </Modal>
        </div>
    );
});
