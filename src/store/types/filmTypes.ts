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
	genres: IGenres[];
	premiere: IPremiere;
	poster: IPoster;
	videos: IVideo;
}
