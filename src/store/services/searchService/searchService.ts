import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type FilteredFilm } from '@store/types/filmTypes';

// interface FilterFilmsByGenreArgs {
// 	genre: Genres;
// 	fromItem: number;
// }

interface FilterFilmsResponse {
	hits: {
		hits: FilteredFilm[];
	};
}

export const searchApi = createApi({
	reducerPath: 'searchApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://147b35e8cd104a0a8b7cbfcfde0fa405.us-central1.gcp.cloud.es.io',
		prepareHeaders: (headers) => {
			headers.set('Authorization', 'ApiKey OG1DdTM0b0JYTjZ3TU05eTlnbHk6bFRuZDhDNkFRNHFSOGgwRmd4TmNXZw==');
			return headers;
		},
	}),
	tagTypes: ['FilmsByGenre', 'FilmByName'],
	endpoints: (builder) => ({
		// filterFilmsByGenre: builder.mutation<FilteredFilm[], FilterFilmsByGenreArgs>({
		// 	query: ({ genre, fromItem }) => ({
		// 		url: '/films/_search',
		// 		method: 'POST',
		// 		body: {
		// 			from: fromItem,
		// 			size: 16,
		// 			query: {
		// 				bool: {
		// 					must: [
		// 						{
		// 							term: {
		// 								'genres.name': genre,
		// 							},
		// 						},
		// 					],
		// 				},
		// 			},
		// 		},
		// 	}),
		// 	transformResponse: (response: FilterFilmsResponse) => response?.hits.hits,
		// 	// @ts-ignore
		// 	providesTags: ['FilmsByGenre'],
		// }),
		searchFilmByName: builder.mutation<FilteredFilm[], string>({
			query: (name) => ({
				url: '/films/_search',
				method: 'POST',
				body: {
					from: 0,
					size: 16,
					query: {
						match: {
							name,
						},
					},
				},
			}),
			// @ts-ignore
			providesTags: ['FilmByName'],
			transformResponse: (response: FilterFilmsResponse) => response?.hits?.hits,
		}),
	}),
});
// useFilterFilmsByGenreMutation
export const { useSearchFilmByNameMutation } = searchApi;
