import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchFilmsData } from '../services/fetchFilmsData/fetchFilmsData';
import { Film, FilteredFilm } from '../types/filmTypes';
import { Genres, Messages } from '../../components/App/types/enums';

export interface FilmsScheme {
    films: Film[];
    filteredFilms: FilteredFilm[];
    message: Messages | undefined;
    isLoading: boolean;
    isSearch: boolean;
    error?: string | undefined;
    genre: Genres;
    page: number;
    fromItem: number;
}

const initialState: FilmsScheme = {
    films: [],
    filteredFilms: [],
    message: undefined,
    isLoading: false,
    isSearch: false,
    error: undefined,
    genre: Genres.ALL,
    page: 1,
    fromItem: 0,
};

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        resetFilms: (state: FilmsScheme) => {
            state.films = [];
            state.filteredFilms = [];
        },
        resetPagination: (state: FilmsScheme) => {
            state.page = 1;
            state.fromItem = 0;
        },
        setError: (state: FilmsScheme, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setIsSearch: (state: FilmsScheme, action: PayloadAction<boolean>) => {
            state.isSearch = action.payload;
        },
        setGenre: (state: FilmsScheme, action: PayloadAction<Genres>) => {
            state.genre = action.payload;
        },
        setMessage: (state: FilmsScheme, action: PayloadAction<Messages | undefined>) => {
            state.message = action.payload;
        },
        setIsLoading: (state: FilmsScheme, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setFilteredFilms: (state: FilmsScheme, action: PayloadAction<FilteredFilm[]>) => {
            if (action.payload) {
                state.filteredFilms = [...state.filteredFilms, ...action.payload];
                state.fromItem = state.fromItem + 16;
            }
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
        builder.addCase(fetchFilmsData.rejected, (state: FilmsScheme, action: PayloadAction<string>) => {
            state.isLoading = false;
            if (action.payload) {
                state.error = action?.payload;
            }
        });
        // builder.addCase(fetchFilmsByGenre.pending, (state: FilmsScheme) => {
        //     state.error = undefined;
        //     state.isLoading = true;
        // });
        // builder.addCase(fetchFilmsByGenre.fulfilled, (state: FilmsScheme, action: PayloadAction<Film[]>) => {
        //     if (action.payload) {
        //         state.films = [...state.films, ...action.payload];
        //         state.page = state.page + 1;
        //         state.isLoading = false;
        //     }
        // });
        // builder.addCase(fetchFilmsByGenre.rejected, (state: FilmsScheme, action) => {
        //     state.isLoading = false;
        //     // state.error = action?.payload;
        // });
        // builder.addCase(fetchFilmByName.pending, (state: FilmsScheme) => {
        //     state.error = undefined;
        //     state.isLoading = true;
        //     state.isSearch = true;
        // });
        // builder.addCase(fetchFilmByName.fulfilled, (state: FilmsScheme, action: PayloadAction<Film[]>) => {
        //     if (action.payload) {
        //         // console.log(action.payload);
        //         state.films = action.payload;
        //         state.page = 1;
        //         state.isLoading = false;
        //     }
        //     if (!action.payload.length) {
        //         state.filmsMessage = 'По вашему запросу ничего не найдено';
        //     }
        // });
        // builder.addCase(fetchFilmByName.rejected, (state: FilmsScheme, action) => {
        //     state.isLoading = false;
        //     // state.error = action?.payload;
        // });
    }
});

export const { actions: filmsActions } = filmsSlice;
export const { reducer: filmsReducer } = filmsSlice;
