import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../types/filmTypes';

interface fetchFilmsByGenreArgs {
    page: number,
    genre: number,
}

export const fetchFilmsByGenre = createAsyncThunk<Film[]>(
    'main/fetchFilmsByGenre',
    // async (args, thunkAPI) => {
    async <fetchFilmsByGenreArgs>(args) => {
        // console.log(args)
        const { page, genre } = args;
        const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&genres.name=${genre}&page=${page}&selectFields=description+id+premiere+genres+poster.url+name+videos.trailers.url`;
        // const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}&genre=${genre}`;
        const options = {
            method: 'GET',
            headers: {
                // 'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA'   // me
                'X-API-KEY': 'J5M4GGT-XQC4SQC-J8RM0ZR-KW1XY45'  // kate
                // 'X-API-KEY': '574b2ae2-dd69-4aae-9090-fef74b488719',
                // 'Content-Type': 'application/json',
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result.docs);
            return result.docs;

            // if (!response.data) {
            //     throw new Error();
            // }
        } catch (e) {
            // return thunkAPI.rejectWithValue('Error');
        }
    }
);