import React, { memo } from 'react';
import { Film } from '../../store/slices/mainSlice';

interface FilmDetailsProps {
    film: Film;
}

export const FilmDetails = memo(({ film }: FilmDetailsProps) => {
    return (
        <>
            <iframe width="330" height="200"
                    src={film.videos.trailers[0].url}
                    // src={'https://www.youtube.com/embed/0RqDiYnFxTk'}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                   >
            </iframe>
            <div>
            <div>{film.name}</div>
            <div>{film.premiere.world}</div>
            </div>
        </>
    );
});
