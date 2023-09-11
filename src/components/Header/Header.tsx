import React, { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { mainActions } from '../../store/slices/mainSlice';
import { fetchFilmByName } from '../../store/services/fetchFilmByName/fetchFilmByName';
import { Theme } from '../App/types/themeTypes';
import {
    Checkbox, HeaderContainer, RowWrapper, Slider, Switch, Form,
    LogoWrapper, LogoText, InputText, SearchBtn
} from './styled';
import SearchIcon from '../../assets/images/search.svg';
import LogoIcon from '../../assets/images/logo.svg';
import { fetchFilmsData } from '../../store/services/fetchFilmsData/fetchFilmsData';
import { Genres } from '../App/types/genres';


interface HeaderProps {
    switchTheme: Theme | (() => void);
}

// { switchTheme }: HeaderProps

export const Header = memo(({ switchTheme }) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');
    const [checked, setChecked] = useState(false);

    const handleOnChange = (target) => {
        setInputValue(target);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(mainActions.resetFilms());
        // @ts-ignore
        dispatch(fetchFilmByName(inputValue));
        setInputValue('');
    };

    const onSwitchTheme = () => {
        switchTheme();
    };

    const goAllFilms = useCallback(() => {
        dispatch(mainActions.resetSearch());
        dispatch(mainActions.resetFilms());
        dispatch(mainActions.setGenre(Genres.ALL));
        // @ts-ignore
        dispatch(fetchFilmsData(1));
    }, []);

    return (
        <HeaderContainer>
            <RowWrapper>
                <LogoWrapper onClick={goAllFilms}>
                    <LogoIcon />
                    <LogoText>ModsenFilms</LogoText>
                </LogoWrapper>
                <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleOnSubmit(e)}>
                    <InputText
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.value)}
                        type={'text'}
                        value={inputValue}
                        placeholder={'Search'}
                    />
                    <SearchBtn><SearchIcon /></SearchBtn>
                </Form>

                <Switch>
                    <Checkbox type={'checkbox'} checked={checked} onChange={() => setChecked(!checked)} />
                    <Slider onClick={onSwitchTheme} checkedstatus={checked.toString()}></Slider>
                </Switch>
            </RowWrapper>
        </HeaderContainer>
    );
});
