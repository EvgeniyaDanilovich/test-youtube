import styled, { keyframes } from 'styled-components';
import { deviceSize } from '../App/styles/globalStyles';

export const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const load = keyframes`
  from {
    left: -150px;
  }

  to {
    left: 100%;
  }
`;

interface StyledSkeletonProps {
    height?: string;
    width?: string;
}

export const StyledSkeleton = styled.div<StyledSkeletonProps>`
  width: ${prop => prop.width || '252px'};
  height: ${prop => prop.height || '280px'};
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(98, 92, 92, 0.2);
  overflow: hidden;

  @media (max-width: ${deviceSize['laptop-m']}) {
    width: ${prop => prop.width || '180px'};
    height: ${prop => prop.height || '220px'};
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 80%;
    background: linear-gradient(to right, transparent 0%, ${({ theme }) => theme.colors.textSecondary} 50%, transparent 100%);
    animation: ${load} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;