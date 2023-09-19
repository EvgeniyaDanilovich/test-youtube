import { configureStore } from '@reduxjs/toolkit';
import { filmsReducer, type FilmsScheme } from './slices/filmsSlice';
import { useDispatch } from 'react-redux';
import { searchApi } from './services/searchService/searchService';

export interface StateSchema {
    films: FilmsScheme;
}

// <StateSchema>

export const store = configureStore({
    reducer: {
        films: filmsReducer,
        [searchApi.reducerPath]: searchApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
