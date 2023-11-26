import React, { type ChangeEvent, type FormEvent, memo, useCallback, useEffect, useState } from 'react';
import SearchIcon from '@assets/images/search.svg';
import { Form, InputText, SearchBtn } from './styled';
import { filmsActions } from '@store/slices/filmsSlice';
import { useAppDispatch } from '@/store';
import { fetchFilmByName } from '@store/services/fetchFilmByName/fetchFilmByName';

// interface SearchFormProps {
// 	handleOnSubmit: (inputValue: string) => void;
// }

// export const SearchForm = memo(({ handleOnSubmit }: SearchFormProps) => {
export const SearchForm = memo(() => {
	const dispatch = useAppDispatch();

	const [inputValue, setInputValue] = useState('');

	const handleOnSubmit = useCallback((inputValue) => {
		dispatch(filmsActions.setMessage(undefined));
		// @ts-ignore
		dispatch(fetchFilmByName(inputValue))
		// searchFilm(inputValue);
		dispatch(filmsActions.resetFilms());
		dispatch(filmsActions.setIsSearch(true));
	}, []);

	const handleOnChange = useCallback(
		(target: string) => {
			setInputValue(target);
		},
		[setInputValue]
	);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				handleOnSubmit(inputValue);
			}
		},
		[handleOnSubmit]
	);

	useEffect(() => {
		if (inputValue) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		handleOnSubmit(inputValue);
		setInputValue('');
	};

	return (
		<Form
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				handleSubmit(e);
			}}
		>
			<InputText
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					handleOnChange(e.target.value);
				}}
				type={'text'}
				value={inputValue}
				placeholder={'Найти'}
				data-testid="InputSearch"
			/>
			<SearchBtn data-testid="SearchBtn">
				<SearchIcon />
			</SearchBtn>
		</Form>
	);
});
