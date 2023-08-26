import React, { memo, useState } from 'react';
import { type Film } from '../../store/slices/mainSlice';
import { FilmImg } from './styled';
import { FilmDetails } from '../FilmDetails/FilmDetails';
import { Modal } from '../Modal/Modal';

interface FilmCardProps {
    film: Film;
}

export const FilmCard = memo(({ film }: FilmCardProps) => {
    const [modalActive, setModalActive] = useState<boolean>(false);

    const handleModal = () => {
        setModalActive(true)
    };

    return (
        <div>
            <FilmImg onClick={handleModal} src={film.poster.url} alt={'film'} />
            <Modal active={modalActive} setActive={setModalActive}>
                <FilmDetails film={film} />
            </Modal>
        </div>
    );
});
