import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Film } from '../../slices/mainSlice';

export const fetchFilmsData = createAsyncThunk<Film[]>(
    'main/fetchFilmsData',
    async (_, thunkAPI) => {
        const url = 'https://api.kinopoisk.dev/v1.3/movie?limit=16&selectFields=description+id+premiere+genres+poster.url+name+videos.trailers.url';
        const options = {
            method: 'GET',
            headers: {
                'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.docs)
            return result.docs;

            // if (!response.data) {
            //     throw new Error();
            // }
        } catch (e) {
            return thunkAPI.rejectWithValue('Error');
        }
    }
);

// export interface IGenres {
//     name: string;
// }
//
// export interface IPremiere {
//     russia: string;
//     world: string;
// }
//
// export interface Film {
//     id: number;
//     name: string;
//     description: string;
//     genres: IGenres[];
//     premiere: IPremiere;
// }
//
// export interface FilmsInfo {
//     docs: Film[];
//     limit: number;
//     page: number;
//     pages: number;
//     total: number;
// }
