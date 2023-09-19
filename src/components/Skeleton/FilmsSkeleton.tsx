import React, { memo } from 'react';
import { Skeleton } from './Skeleton';
import { SkeletonItem } from './styled';

export const FilmsSkeleton = memo(() => {
    return (
        <>
            <SkeletonItem>
                <Skeleton />
                <Skeleton width={'180px'} height={'20px'} />
                <Skeleton width={'100px'} height={'20px'} />
            </SkeletonItem>
            <SkeletonItem>
                <Skeleton />
                <Skeleton width={'180px'} height={'20px'} />
                <Skeleton width={'100px'} height={'20px'} />
            </SkeletonItem>
            <SkeletonItem>
                <Skeleton />
                <Skeleton width={'180px'} height={'20px'} />
                <Skeleton width={'100px'} height={'20px'} />
            </SkeletonItem>
            <SkeletonItem>
                <Skeleton />
                <Skeleton width={'180px'} height={'20px'} />
                <Skeleton width={'100px'} height={'20px'} />
            </SkeletonItem>
        </>
    );
});
