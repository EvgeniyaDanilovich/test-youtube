import React, { memo, useEffect, useState } from 'react';
import { FilmImg } from './styled';
import { FilmDetails } from '../FilmDetails/FilmDetails';
import { Modal } from '../Modal/Modal';
import { Film } from '../../store/types/filmTypes';
import styled from 'styled-components';

export const Text = styled.p`
  font-weight: 600;
  margin-top: 15px;
`
export const Data = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

interface FilmCardProps {
    film: Film;
}

export const FilmCard = memo(({ film }: FilmCardProps) => {
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [poster, setPoster] = useState('');
    const [premiere, setPremiere] = useState('');

    useEffect(() => {
        if (typeof film.poster === 'string') {
            setPoster(film.poster);
        } else {
            setPoster(film.poster.url);
        }
        setPremiere(film?.premiere?.world?.slice(0, 4))
    }, [film]);

    const handleModal = () => {
        setModalActive(true);
    };

    return (
        <div>
            <FilmImg onClick={handleModal} src={poster} alt={'film'} />
            <Text>{film?.name}</Text>
            <Data>{premiere}</Data>
            <Modal active={modalActive} setActive={setModalActive}>
                <FilmDetails film={film} />
            </Modal>
        </div>
    );
});
