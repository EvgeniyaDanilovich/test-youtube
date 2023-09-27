import React, { memo, useEffect, useState } from 'react';
import { FilmImg, Text, Data } from './styled';
import { FilmModal } from '../FilmModal/FilmModal';
import { Modal } from '../Modal/Modal';
import { Film } from '../../store/types/filmTypes';
import NoPoster from '../../assets/images/emptyPoster.jpg';

interface FilmCardProps {
    film: Film;
}

export const FilmCard = memo(({ film }: FilmCardProps) => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [poster, setPoster] = useState('');
    const [premiere, setPremiere] = useState('');

    useEffect(() => {
        if (typeof film?.poster === 'string') {
            setPoster(film?.poster);
        } else {
            setPoster(film?.poster?.url);
        }

        setPremiere(film?.premiere?.world?.slice(0, 4));
    }, [film]);

    const handleModal = () => {
        setModalActive(true);
    };

    return (
        <div data-testid="FilmItem">
            {poster ?
                <FilmImg onClick={handleModal} src={poster} alt={'film'} /> :
                <FilmImg onClick={handleModal} src={NoPoster} alt={'film'} />
            }
            <Text>{film?.name}</Text>
            <Data>{premiere}</Data>
            {modalActive &&
                <Modal active={modalActive} setActive={setModalActive}>
                    <FilmModal film={film} />
                </Modal>
            }
        </div>
    );
});
