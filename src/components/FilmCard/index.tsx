import React, { memo, useCallback, useEffect, useState } from 'react';
import { FilmModal } from '@components/FilmModal';
import { Modal } from '@components/Modal';
import { type Film } from '@store/types/filmTypes';
import NoPoster from '@assets/images/emptyPoster.jpg';
import { FilmImg, Text, Data } from './styled';

interface FilmCardProps {
	film: Film;
}

export const FilmCard = memo(({ film }: FilmCardProps) => {
	const [modalActive, setModalActive] = useState<boolean>(false);
	const [premiere, setPremiere] = useState('');

	useEffect(() => {
		setPremiere(film?.premiere?.world?.slice(0, 4));
	}, [film]);

	const handleModal = useCallback(() => {
		setModalActive(true);
	}, [setModalActive]);

	return (
		<div data-testid="FilmItem">
			{film.poster.url ? (
				<FilmImg onClick={handleModal} src={film.poster.url} alt={'film'} />
			) : (
				<FilmImg onClick={handleModal} src={NoPoster} alt={'film'} />
			)}
			<Text>{film?.name}</Text>
			<Data>{premiere}</Data>
			{modalActive && (
				<Modal active={modalActive} setActive={setModalActive}>
					<FilmModal film={film} />
				</Modal>
			)}
		</div>
	);
});
