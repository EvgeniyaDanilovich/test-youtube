import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Form, InputText, SearchBtn } from './styled';
import SearchIcon from '../../assets/images/search.svg';

interface SearchFormProps {
    handleOnSubmit: (inputValue: string) => void;
}

export const SearchForm = ({ handleOnSubmit }: SearchFormProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleOnChange = (target: string) => {
        setInputValue(target);
    };

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleOnSubmit(inputValue);
        }
    }, [handleOnSubmit]);

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
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <InputText
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.value)}
                type={'text'}
                value={inputValue}
                placeholder={'Найти'}
            />
            <SearchBtn><SearchIcon /></SearchBtn>
        </Form>
    );
};
