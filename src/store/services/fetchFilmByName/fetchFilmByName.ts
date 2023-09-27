// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { Film } from '../../types/filmTypes';
//
// export const fetchFilmByName = createAsyncThunk<Film[]>(
//     'main/fetchFilmByName',
//     async (name, thunkAPI) => {
//         // const url = `https://api.kinopoisk.dev/v1.2/movie/search?query=${name}&limit=1`;
//         // const options = {
//         //     method: 'GET',
//         //     headers: {
//         //         'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA'   // me
//         //     }
//         // };
//
//         try {
//             // const response = await fetch(url, options);
//             const response = await fetch(`${instance.baseUrl}v1.2/movie/search?query=${name}&limit=1`, instance.options);
//             const result = await response.json();
//             // console.log(result.docs);
//             return result.docs;
//
//         } catch (e) {
//             return thunkAPI.rejectWithValue('Error');
//         }
//     }
// );

export {};
