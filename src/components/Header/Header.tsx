import React, { ChangeEvent, FormEvent, memo, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { mainActions } from '../../store/slices/mainSlice';
import { fetchFilmByName } from '../../store/services/fetchFilmByName/fetchFilmByName';
import { Theme } from '../App/types/ThemeTypes';
import {
    Checkbox, HeaderContainer, RowWrapper, Slider, Switch, Form,
    LogoWrapper, LogoText, InputText, SearchBtn
} from './styled';
import SearchIcon from '../../assets/images/search.svg';
import LogoIcon from '../../assets/images/logo.svg';


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
        switchTheme()
    };

    return (
        <HeaderContainer>
            <RowWrapper>
                <LogoWrapper>
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
                {/* <button onClick={onSwitchTheme}>Switch theme</button> */}

                <Switch>
                    <Checkbox type={'checkbox'} checked={checked} onChange={() => setChecked(!checked)} />
                    <Slider onClick={onSwitchTheme} checkedstatus={checked.toString()}></Slider>
                </Switch>
            </RowWrapper>
        </HeaderContainer>
    );
});
