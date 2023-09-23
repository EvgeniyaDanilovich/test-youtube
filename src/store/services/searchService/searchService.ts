import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FilteredFilm } from '../../types/filmTypes';
import { Genres } from '../../../components/App/types/enums';

interface FilterFilmsByGenreArgs {
    genre: Genres;
    fromItem: number;
}

interface FilterFilmsResponse {
    hits: {
        hits: FilteredFilm[]
    };
}

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://c2f49d7feaa948008026e0bb360cd821.us-central1.gcp.cloud.es.io',
        prepareHeaders: (headers) => {
            headers.set('Authorization', 'ApiKey dk9KTHA0b0Jpd29ybzRRd0VUOUs6bmxzRDlNMHhTUHFXVkZGTGI4MmNkZw==');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        filterFilmsByGenre: builder.mutation<FilteredFilm[], FilterFilmsByGenreArgs>({
            query: ({ genre, fromItem }) => ({
                url: '/films/_search',
                method: 'POST',
                body: {
                    'from': fromItem,
                    'size': 16,
                    'query': {
                        'bool': {
                            'must': [{
                                'term': {
                                    'genres.name': genre
                                }
                            }]
                        }
                    }
                }
            }),
            transformResponse: (response: FilterFilmsResponse) => response?.hits.hits,
        }),
        searchFilmByName: builder.mutation<FilteredFilm[], string>({
            query: (name) => ( {
                url: '/films/_search',
                method: 'POST',
                body: {
                    'from': 0,
                    'size': 16,
                    'query': {
                        'match': {
                            'name': name
                        }
                    }
                }
            }),
            transformResponse: (response: FilterFilmsResponse) => response?.hits?.hits,
        })
    })
});

export const { useSearchFilmByNameMutation, useFilterFilmsByGenreMutation } = searchApi;
