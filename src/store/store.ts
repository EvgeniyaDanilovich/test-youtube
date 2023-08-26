import { configureStore } from '@reduxjs/toolkit';
import { mainReducer, type MainScheme } from './slices/mainSlice';
import { useDispatch } from 'react-redux';

export interface StateSchema {
    main: MainScheme;
}

export const store = configureStore<StateSchema>({
    reducer: {
        main: mainReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
