import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FilteredFilm } from '../../types/filmTypes';
import { Enums } from '../../../components/App/types/enums';

// import Client from '@elastic/elasticsearch'

interface FilterFilmsByGenreArgs {
    genre: Enums;
    fromItem: number;
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
        // createIndex: builder.mutation({
        //     query: (body) => ({
        //         url: '/test-index/_doc',
        //         method: 'POST',
        //         body
        //     })
        // }),
        // createIndexWithId: builder.mutation({
        //     query: (body) => ({
        //         url: '/test-index/_doc/1',
        //         method: 'PUT',
        //         body
        //     })
        // }),

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
            // @ts-ignore
            transformResponse: (response) => response?.hits?.hits,
        }),

        searchFilmByName: builder.mutation({
            query: (name) => ({
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
            // @ts-ignore
            transformResponse: (response) => response?.hits?.hits,
            // transformResponse: (response) => response?.hits?.hits;
        }),
        getIndexFilms: builder.query({
            query: () => ({
                url: '/films/_search',
                // url: '/',
            })
        })
    })
});

export const { useGetIndexFilmsQuery, useSearchFilmByNameMutation, useFilterFilmsByGenreMutation } = searchApi;
