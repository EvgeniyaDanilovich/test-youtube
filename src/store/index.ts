import { configureStore } from '@reduxjs/toolkit';
import { filmsReducer } from './slices/filmsSlice';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { searchApi } from './services/searchService/searchService';

export const store = configureStore({
	reducer: {
		films: filmsReducer,
		[searchApi.reducerPath]: searchApi.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchApi.middleware),
});

export type StateSchema = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
