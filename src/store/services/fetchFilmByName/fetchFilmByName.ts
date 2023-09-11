import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../types/filmTypes';

export const fetchFilmByName = createAsyncThunk<Film[]>(
    'main/fetchFilmByName',
    async (name, thunkAPI) => {
        console.log(name);
        const url = `https://api.kinopoisk.dev/v1.2/movie/search?query=${name}&limit=1`;
        console.log(url);
        const options = {
            method: 'GET',
            headers: {
                // 'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA'   // me
                'X-API-KEY': 'J5M4GGT-XQC4SQC-J8RM0ZR-KW1XY45'  // kate
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