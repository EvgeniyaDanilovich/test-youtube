import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../types/filmTypes';
import { instance } from '../../../constants/instance';

interface fetchFilmsByGenreArgs {
    page: number,
    genre: number,
}

export const fetchFilmsByGenre = createAsyncThunk<Film[]>(
    'main/fetchFilmsByGenre',
    async <fetchFilmsByGenreArgs>(args, thunkAPI) => {
        const { page, genre } = args;

        try {
            const response = await fetch(
                `${instance.baseUrl}v1.3/movie?limit=16&genres.name=${genre}&page=${page}&selectFields=id+premiere+poster.url+name+videos.trailers.url`,
                instance.options
            );
            const result = await response.json();
            return result.docs;
        } catch (e) {
            return thunkAPI.rejectWithValue('Error');
        }
    }
);
