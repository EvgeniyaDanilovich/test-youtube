import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchFilmsData } from '@store/services/fetchFilmsData/fetchFilmsData';
import { type Film } from '@store/types/filmTypes';
import { Genres, Messages } from '@components/App/types/enums';
import { fetchFilmsByGenre } from '@store/services/fetchFilmsByGenre/fetchFilmsByGenre';
import { fetchFilmByName } from '@store/services/fetchFilmByName/fetchFilmByName';

export interface FilmsScheme {
	films: Film[];
	message: Messages | undefined;
	isLoading: boolean;
	isSearch: boolean;
	error?: string | undefined;
	genre: Genres;
	page: number;
}

const initialState: FilmsScheme = {
	films: [],
	message: undefined,
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
		},
		resetPagination: (state: FilmsScheme) => {
			state.page = 1;
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
			if (action.payload !== '') {
				state.error = action?.payload;
			}
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
			if (action.payload !== '') {
				state.error = action?.payload;
			}
		});

		builder.addCase(fetchFilmByName.pending, (state: FilmsScheme) => {
			state.error = undefined;
			state.isLoading = true;
			state.isSearch = true;
		});
		builder.addCase(fetchFilmByName.fulfilled, (state: FilmsScheme, action: PayloadAction<Film[]>) => {
			if (action.payload) {
				state.films = [...action.payload];
				state.page = 1;
				state.isLoading = false;
			}
			if (!action.payload.length) {
				state.message = Messages.NOT_FOUND;
			}
		});
		builder.addCase(fetchFilmByName.rejected, (state: FilmsScheme, action) => {
			state.isLoading = false;
			if (action.payload !== '') {
				state.error = action?.payload;
			}
		});
	},
});

export const { actions: filmsActions } = filmsSlice;
export const { reducer: filmsReducer } = filmsSlice;
