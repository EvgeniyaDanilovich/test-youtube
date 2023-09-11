import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchFilmsData } from '../services/fetchFilmsData/fetchFilmsData';
import { fetchFilmsByGenre } from '../services/fetchFilmsByGenre/fetchFilmsByGenre';
import { Film } from '../types/filmTypes';
import { fetchFilmByName } from '../services/fetchFilmByName/fetchFilmByName';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import { Genres } from '../../components/App/types/genres';

export interface MainScheme {
    films: Film[];
    isLoading: boolean;
    isSearch: boolean;
    error?: string | undefined;
    genre: string;
    page: number;
}

const initialState: MainScheme = {
    films: [],
    isLoading: false,
    isSearch: false,
    error: undefined,
    genre: Genres.ALL,
    page: 1
};

export const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        resetFilms: (state: MainScheme) => {
            state.films = [];
            state.page = 1;
        },
        setPage: (state: MainScheme, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setGenre: (state: MainScheme, action: PayloadAction<string>) => {
            state.genre = action.payload;
        },
        resetSearch: (state: MainScheme) => {
            state.isSearch = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilmsData.pending, (state: MainScheme) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchFilmsData.fulfilled, (state: MainScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                state.films = [...state.films, ...action.payload];
                state.isLoading = false;
                state.page = state.page + 1;
            }
        });
        builder.addCase(fetchFilmsData.rejected, (state: MainScheme, action) => {
            state.isLoading = false;
            // state.error = action.payload;
        });
        builder.addCase(fetchFilmsByGenre.pending, (state: MainScheme) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchFilmsByGenre.fulfilled, (state: MainScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                // console.log(action.payload);
                state.films = [...state.films, ...action.payload];
                state.page = state.page + 1;
                state.isLoading = false;
            }
        });
        builder.addCase(fetchFilmsByGenre.rejected, (state: MainScheme, action) => {
            state.isLoading = false;
            // state.error = action.payload;
        });
        builder.addCase(fetchFilmByName.pending, (state: MainScheme) => {
            state.error = undefined;
            state.isLoading = true;
            state.isSearch = true;
        });
        builder.addCase(fetchFilmByName.fulfilled, (state: MainScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                // console.log(action.payload);
                state.films = action.payload;
                state.page = 1;
                state.isLoading = false;
            }
        });
        builder.addCase(fetchFilmByName.rejected, (state: MainScheme, action) => {
            state.isLoading = false;
            // state.error = action.payload;
        });
    }
});

export const { actions: mainActions } = counterSlice;
export const { reducer: mainReducer } = counterSlice;
