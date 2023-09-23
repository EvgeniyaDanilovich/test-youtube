import { configureStore } from '@reduxjs/toolkit';
import { filmsReducer, type FilmsScheme } from './slices/filmsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { searchApi } from './services/searchService/searchService';

// export interface StateSchema {
//     films: FilmsScheme;
//     [searchApi.reducerPath]: ReturnType<typeof searchApi.reducer>
// }

// <StateSchema>

export const store = configureStore({
    reducer: {
        films: filmsReducer,
        [searchApi.reducerPath]: searchApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchApi.middleware)
});

export type StateSchema = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
