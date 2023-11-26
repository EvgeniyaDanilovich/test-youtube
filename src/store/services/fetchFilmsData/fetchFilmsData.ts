import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Film } from '@store/types/filmTypes';
import { type AppDispatch } from '@/store';

export const fetchFilmsData = createAsyncThunk<Film[], number, { dispatch: AppDispatch; rejectValue: string }>(
	'main/fetchFilmsData',
	async (page, thunkAPI) => {
		const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&page=${page}&selectFields=id+premiere+genres+poster.url+name+videos.trailers.url`;
		const options = {
			method: 'GET',
			headers: {
				'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA',
			},
		};
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error("Can't fetch");
			}

			const result = await response.json();
			console.log(result.docs);
			return result.docs;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	}
);
