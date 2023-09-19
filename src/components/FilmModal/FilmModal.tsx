import React, { memo } from 'react';
import { Film } from '../../store/types/filmTypes';
import { StyledIframe, StyledText } from './styled';

interface FilmDetailsProps {
    film: Film;
}

export const FilmModal = memo(({ film }: FilmDetailsProps) => {
    const filmUrl = film?.videos?.trailers[0]?.url;

    return (
        <>
            {filmUrl ?
                <StyledIframe
                    src={`${filmUrl}?autoplay=1`}
                    allow="autoplay"
                >
                </StyledIframe>
                : <StyledText>Видео не найдено</StyledText>
            }
        </>
    );
});
