import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchFilmsData } from '../services/fetchFilmsData/fetchFilmsData';

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
export interface IGenres {
    name: string;
}

export interface IPremiere {
    russia: string;
    world: string;
}

export interface IPoster {
    url: string;
}

export interface IVideoTrailers{
    url: string;
}

export interface IVideo{
    trailers: IVideoTrailers[]
}

export interface Film {
    id: number;
    name: string;
    description: string;
    genres: IGenres[];
    premiere: IPremiere;
    poster: IPoster;
    videos: IVideo;
}

export interface MainScheme {
    films?: Film[];
    // page: number
}

const initialState: MainScheme = {
    films: undefined
};

export const counterSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        increment: (state) => {
        },
        decrement: (state) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilmsData.pending, (state) => {
            // state.error = undefined;
            // state.isLoading = true;
        });
        builder.addCase(fetchFilmsData.fulfilled, (state: MainScheme, action: PayloadAction<Film[]>) => {
            if (action.payload) {
                state.films = action.payload;
            }
        });
        // builder.addCase(fetchFilmsData.fulfilled, (state: MainScheme, action: PayloadAction<Film[]>) => {
        //     state.films = action.payload;
        // });
        builder.addCase(fetchFilmsData.rejected, (state, action) => {
            // state.isLoading = false;
            // state.error = action.payload;
        });
    }
});

export const { actions: mainActions } = counterSlice;
export const { reducer: mainReducer } = counterSlice;
