import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../types/filmTypes';
// import { Client } from '@elastic/elasticsearch';
//
// const client = new Client({
//     node: 'https://f1c4a98ce5224045a23f35b36a04091c.us-central1.gcp.cloud.es.io',
//     cloud: { id: 'test-youtube-search:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRmMWM0YTk4Y2U1MjI0MDQ1YTIzZjM1YjM2YTA0MDkxYyRjNjEzOWQxNTU1YWM0MzVhOWM3NjQ1YjEzMDYzNmYwOQ==' },
//     auth: { apiKey: 'eDNiNFI0b0JEYXRWYWpqeTlOd0s6dkx5anZ5TE5SRnU5b3pRLXVrWUROdw==' }
// });

export const fetchFilmsData = createAsyncThunk<Film[]>(
    'main/fetchFilmsData',
    async (page, thunkAPI) => {
        const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&page=${page}&selectFields=description+id+premiere+genres+poster.url+name+videos.trailers.url`;
        // const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}`;
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
