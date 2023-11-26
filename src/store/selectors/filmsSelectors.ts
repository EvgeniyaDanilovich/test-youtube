import { type StateSchema } from '@/store';

export const selectFilms = (state: StateSchema) => state.films.films;
export const selectMessage = (state: StateSchema) => state.films.message;
export const selectPage = (state: StateSchema) => state.films.page;
export const selectGenre = (state: StateSchema) => state.films.genre;
export const selectIsSearch = (state: StateSchema) => state.films.isSearch;
export const selectIsLoading = (state: StateSchema) => state.films.isLoading;
export const selectError = (state: StateSchema) => state.films.error;
