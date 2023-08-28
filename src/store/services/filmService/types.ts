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

export interface FilmsData {
    docs: Film[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}