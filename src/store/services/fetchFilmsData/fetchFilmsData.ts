import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../types/filmTypes';
import { AppDispatch } from '../../store';

// const client = new Client({
//     node: 'https://f1c4a98ce5224045a23f35b36a04091c.us-central1.gcp.cloud.es.io',
//     cloud: { id: 'test-youtube-search:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRmMWM0YTk4Y2U1MjI0MDQ1YTIzZjM1YjM2YTA0MDkxYyRjNjEzOWQxNTU1YWM0MzVhOWM3NjQ1YjEzMDYzNmYwOQ==' },
//     auth: { apiKey: 'eDNiNFI0b0JEYXRWYWpqeTlOd0s6dkx5anZ5TE5SRnU5b3pRLXVrWUROdw==' }   // 1
// });


// const client = new Client({
//     node: 'https://c2f49d7feaa948008026e0bb360cd821.us-central1.gcp.cloud.es.io',
//     cloud: { id: 'test-youtube:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRjMmY0OWQ3ZmVhYTk0ODAwODAyNmUwYmIzNjBjZDgyMSQwMzcwOGZjOGE3ZjI0ZDJmYTBkMThjODUyNjM2YjY5Mg==' },
//     auth: { apiKey: 'dk9KTHA0b0Jpd29ybzRRd0VUOUs6bmxzRDlNMHhTUHFXVkZGTGI4MmNkZw==' }  // 2
// });

export const fetchFilmsData = createAsyncThunk<Film[], number, { dispatch: AppDispatch, rejectValue: string }>(
    'main/fetchFilmsData',
    async (page, thunkAPI) => {
        // const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&page=${page}&selectFields=id+premiere+genres+poster.url+name+videos.trailers.url`;
        const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&page=1&selectFields=id+premiere+genres+poster.url+name+videos.trailers.url`;
        const options = {
            method: 'GET',
            headers: {
                'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA'   // me
                // 'X-API-KEY': 'J5M4GGT-XQC4SQC-J8RM0ZR-KW1XY45'  // kate
            }
        };
        try {
            const response = await fetch(url, options);
            if(!response.ok){
                throw new Error('Can\'t fetch')
            }

            const result = await response.json();
            return result.docs;
            // return result;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
