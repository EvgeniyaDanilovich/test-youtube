import React, { memo } from 'react';
import { StyledSkeleton } from './styled';

interface SkeletonProps {
    height?: string;
    width?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { width, height } = props;

    return (
        <StyledSkeleton width={width} height={height} />
    );
});
