import { type DeepPartial } from '@reduxjs/toolkit';
import { type Film } from '@store/types/filmTypes';
import { fetchFilmsData } from '@store/services/fetchFilmsData/fetchFilmsData';
import { Genres, Messages } from '@components/App/types/enums';
import { filmsActions, filmsReducer, type FilmsScheme } from './filmsSlice';

const film: Film = {
	id: 1,
	name: '1+1',
	genres: [{ name: 'драма' }],
	premiere: { russia: '2020', world: '2020' },
	poster: { url: 'url' },
	videos: { trailers: [{ url: 'url' }] },
};

describe('filmsSlice', () => {
	test('test reset films', () => {
		const state: DeepPartial<FilmsScheme> = {
			films: [film],
		};

		expect(filmsReducer(state as FilmsScheme, filmsActions.resetFilms())).toEqual({
			films: [],
		});
	});

	test('test reset pagination', () => {
		const state: DeepPartial<FilmsScheme> = {
			page: 4,
		};

		expect(filmsReducer(state as FilmsScheme, filmsActions.resetPagination())).toEqual({
			page: 1,
		});
	});

	test('test set isSearch', () => {
		const state: DeepPartial<FilmsScheme> = {
			isSearch: false,
		};

		expect(filmsReducer(state as FilmsScheme, filmsActions.setIsSearch(true))).toEqual({ isSearch: true });
	});

	test('test set genre', () => {
		const state: DeepPartial<FilmsScheme> = {
			genre: Genres.ALL,
		};

		expect(filmsReducer(state as FilmsScheme, filmsActions.setGenre(Genres.COMEDY))).toEqual({
			genre: Genres.COMEDY,
		});
	});

	test('test set message', () => {
		const state: DeepPartial<FilmsScheme> = {
			message: undefined,
		};

		expect(filmsReducer(state as FilmsScheme, filmsActions.setMessage(Messages.NOT_FOUND))).toEqual({
			message: Messages.NOT_FOUND,
		});
	});

	test('test set isLoading', () => {
		const state: DeepPartial<FilmsScheme> = {
			isLoading: false,
		};

		expect(filmsReducer(state as FilmsScheme, filmsActions.setIsLoading(true))).toEqual({ isLoading: true });
	});

	test('test fetch films data service pending', () => {
		const state: DeepPartial<FilmsScheme> = {
			error: undefined,
			isLoading: false,
		};

		expect(filmsReducer(state as FilmsScheme, fetchFilmsData.pending)).toEqual({
			error: undefined,
			isLoading: true,
		});
	});

	test('test fetch films data service fulfilled', () => {
		const state: DeepPartial<FilmsScheme> = {
			films: [],
			isLoading: true,
			page: 1,
		};

		expect(filmsReducer(state as FilmsScheme, fetchFilmsData.fulfilled([film], '', 0, ''))).toEqual({
			films: [film],
			isLoading: false,
			page: 2,
		});
	});

	test('test fetch films data service rejected', () => {
		const state: DeepPartial<FilmsScheme> = {
			isLoading: true,
			error: undefined,
		};

		expect(
			filmsReducer(state as FilmsScheme, fetchFilmsData.rejected(new Error(), '', 0, 'Something went wrong', ''))
		).toEqual({
			isLoading: false,
			error: 'Something went wrong',
		});
	});
});
