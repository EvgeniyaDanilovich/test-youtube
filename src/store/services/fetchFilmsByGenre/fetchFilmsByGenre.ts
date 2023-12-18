import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Film } from '@store/types/filmTypes';
import { type AppDispatch } from '@/store';

interface fetchFilmsByGenreArgs {
	page: number;
	genre: number;
}

export const fetchFilmsByGenre = createAsyncThunk<
	Film[],
	fetchFilmsByGenreArgs,
	{ dispatch: AppDispatch; rejectValue: string }
>('main/fetchFilmsByGenre', async (args, thunkAPI) => {
	const { page, genre } = args;
	const url = `https://api.kinopoisk.dev/v1.3/movie?limit=16&genres.name=${genre}&page=${page}&selectFields=id+premiere+genres+poster.url+name+videos.trailers.url`;
	const options = {
		method: 'GET',
		headers: {
			// 'X-API-KEY': 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA', // me
			'X-API-KEY': 'J5M4GGT-XQC4SQC-J8RM0ZR-KW1XY45', // kate
		},
	};

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error("Can't fetch");
		}

		const result = await response.json();
		return result.docs;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});
