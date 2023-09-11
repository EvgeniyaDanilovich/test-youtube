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

export interface IVideoTrailers {
    url: string;
}

export interface IVideo {
    trailers: IVideoTrailers[];
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


// export interface Film {
//     'kinopoiskId': number,
//     'imdbId': string,
//     'nameRu': string,
//     'nameEn': string,
//     'nameOriginal': string,
//     'countries': [
//         {
//             'country': string
//         }
//     ],
//     'genres': [
//         {
//             'genre': string
//         }
//     ],
//     'ratingKinopoisk': number,
//     'ratingImdb': number,
//     'year': number,
//     'type': string,
//     'posterUrl': string,
//     'posterUrlPreview': string
// }