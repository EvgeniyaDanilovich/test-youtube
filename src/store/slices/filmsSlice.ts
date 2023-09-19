import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchFilmsData } from '../services/fetchFilmsData/fetchFilmsData';
import { fetchFilmsByGenre } from '../services/fetchFilmsByGenre/fetchFilmsByGenre';
import { Film } from '../types/filmTypes';
import { fetchFilmByName } from '../services/fetchFilmByName/fetchFilmByName';
import { Genres } from '../../components/App/types/genres';

export interface FilmsScheme {
    films: Film[];
    filmsMessage: string;
    isLoading: boolean;
    isSearch: boolean;
    error?: string | undefined;
    genre: string;
    page: number;
}

const initialState: FilmsScheme = {
    films: [],
    filmsMessage: '',
    isLoading: false,
    isSearch: false,
    error: undefined,
    genre: Genres.ALL,
    page: 1,
};

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        resetFilms: (state: FilmsScheme) => {
            state.films = [];
            state.filmsMessage = '';
        },
        setPage: (state: FilmsScheme, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setGenre: (state: FilmsScheme, action: PayloadAction<string>) => {
            state.genre = action.payload;
        },
        resetSearch: (state: FilmsScheme) => {
            state.isSearch = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilmsData.pending, (state: FilmsScheme) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchFilmsData.fulfilled, (state: FilmsScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                state.films = [...state.films, ...action.payload];
                state.isLoading = false;
                state.page = state.page + 1;
            }
        });
        builder.addCase(fetchFilmsData.rejected, (state: FilmsScheme, action) => {
            state.isLoading = false;
            // state.error = action?.payload;
        });
        builder.addCase(fetchFilmsByGenre.pending, (state: FilmsScheme) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchFilmsByGenre.fulfilled, (state: FilmsScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                state.films = [...state.films, ...action.payload];
                state.page = state.page + 1;
                state.isLoading = false;
            }
        });
        builder.addCase(fetchFilmsByGenre.rejected, (state: FilmsScheme, action) => {
            state.isLoading = false;
            // state.error = action?.payload;
        });
        builder.addCase(fetchFilmByName.pending, (state: FilmsScheme) => {
            state.error = undefined;
            state.isLoading = true;
            state.isSearch = true;
        });
        builder.addCase(fetchFilmByName.fulfilled, (state: FilmsScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                console.log(action.payload);
                state.films = action.payload;
                state.page = 1;
                state.isLoading = false;
            }
            if (!action.payload.length) {
                state.filmsMessage = 'По вашему запросу ничего не найдено';
            }
        });
        builder.addCase(fetchFilmByName.rejected, (state: FilmsScheme, action) => {
            state.isLoading = false;
            // state.error = action?.payload;
        });
    }
});

export const { actions: filmsActions } = filmsSlice;
export const { reducer: filmsReducer } = filmsSlice;
