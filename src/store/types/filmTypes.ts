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
    // description: string;
    // genres: IGenres[];
    premiere: IPremiere;
    poster: IPoster;
    videos: IVideo;
}

export interface FilmSearched {
    id: number;
    name: string;
    description: string;
    genres: IGenres[];
    poster: IPoster;
    alternativeName: string;
    backdrop: string;
    countries: string[];
    enName: string;
    logo: string;
    movieLength: number;
    names: string[];
    rating: number;
    releaseYears: number[];
    shortDescription: string;
    type: string;
    votes: number;
    year: number;
}
