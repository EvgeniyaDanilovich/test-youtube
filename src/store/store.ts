import { configureStore } from '@reduxjs/toolkit';
import { mainReducer, type MainScheme } from './slices/mainSlice';
import { useDispatch } from 'react-redux';
import { filmApi } from './services/filmService/filmApi';

export interface StateSchema {
    main: MainScheme;
    // [filmApi.reducerPath]: filmApi.reducer
}
// <StateSchema>
export const store = configureStore({
    reducer: {
        main: mainReducer,
        [filmApi.reducerPath]: filmApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
