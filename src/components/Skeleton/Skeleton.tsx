import React, { CSSProperties, memo } from 'react';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
  from {
    left: -150px;
  }

  to {
    left: 100%;
  }
`

const StyledSkeleton = styled.div<SkeletonProps>`
  width: ${prop => prop.width || '200px'};
  height: ${prop => prop.height || '270px'};
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(98, 92, 92, 0.2);
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 80%;
    background: linear-gradient(to right, transparent 0%, #000000 50%, transparent 100%);
    animation: ${load} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`

interface SkeletonProps {
    height?: string | number;
    width?: string | number;
}

export const Skeleton = memo(({ width, height }: SkeletonProps) => {
    const styles: CSSProperties = {
        width,
        height
    };

    return (
        <StyledSkeleton />
        // <div style={styles} />
    );
});
