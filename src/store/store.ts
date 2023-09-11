import { configureStore } from '@reduxjs/toolkit';
import { mainReducer, type MainScheme } from './slices/mainSlice';
import { useDispatch } from 'react-redux';

export interface StateSchema {
    main: MainScheme;
    // [filmApi.reducerPath]: ReturnType<typeof filmApi.reducer>;
}

// <StateSchema>
export const store = configureStore<StateSchema>({
    reducer: {
        main: mainReducer,
        // [filmApi.reducerPath]: filmApi.reducer,
        // [searchApi.reducerPath]: searchApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
