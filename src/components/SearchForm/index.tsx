import React, { type ChangeEvent, type FormEvent, memo, useCallback, useEffect, useState } from 'react';
import SearchIcon from '@assets/images/search.svg';
import { Form, InputText, SearchBtn } from './styled';

interface SearchFormProps {
	handleOnSubmit: (inputValue: string) => void;
}

export const SearchForm = memo(({ handleOnSubmit }: SearchFormProps) => {
	const [inputValue, setInputValue] = useState('');

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
