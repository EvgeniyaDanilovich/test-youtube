// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Film, FilmsData } from './types';

// export interface Film {
//     id: string;
//     description: string;
//     genre: string[];
//     image: string;
//     rank: number;
//     rating: string;
//     thumbnail: string;
//     title: string;
//     year: number;
// }

export const filmApi = createApi({
    reducerPath: 'filmApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.kinopoisk.dev',
        prepareHeaders: (headers) => {
            headers.set('X-API-KEY', 'EQ8PXQ7-9E5MWCF-PR638J9-1M3F9KA');
            return headers;
        }
    }),
    tagTypes: ['Films'],
    endpoints: (builder) => ({
        getFilm: builder.query<Film[], number>({
            query: (page) => ({
                url: `/v1.3/movie?limit=16&selectFields=description+id+premiere+genres+poster.url+name+videos.trailers.url&page=${page}`
            }),
            transformResponse: (response: FilmsData) => response.docs,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            // providesTags: ['Films']
        })
    })
});

export const { useGetFilmQuery } = filmApi;
// export const c = filmApi.useGet;
