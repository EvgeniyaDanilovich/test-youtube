import { createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '../../types/filmTypes';
import { instance } from '../../../constants/instance';
import { Client } from '@elastic/elasticsearch';

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

export const fetchFilmsData = createAsyncThunk<Film[]>(
    'main/fetchFilmsData',
    async (page, thunkAPI) => {
        // const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&page=${page}&selectFields=description+id+premiere+genres+poster.url+name+videos.trailers.url`;

        try {
            const response = await fetch(
                `${instance.baseUrl}v1.3/movie?limit=16&page=${page}&selectFields=id+premiere+genres+poster.url+name+videos.trailers.url`,
                instance.options
            );
            // const resultText = await response.text();
            const result = await response.json();
            // console.log(resultText);
            return result.docs;
        } catch (e) {
            return thunkAPI.rejectWithValue('Error');
        }
    }
);

//
// {
//     "query": {
//     "match": {
//         "name": "Джентльмены"
//     }
// }
// }
