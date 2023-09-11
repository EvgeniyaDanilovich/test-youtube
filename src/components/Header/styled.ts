import styled, { css } from 'styled-components';

interface SliderProps {
    checkedstatus: string;
}

export const HeaderContainer = styled.header`
  max-width: 1200px;
  margin: 0 auto 32px auto;
  padding: 0 15px
`;

export const RowWrapper = styled.div`
  height: 116px;
  display: flex;
  flex-direction: row;
  align-items: center;
  //justify-content: space-between;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
`;

export const Slider = styled.span<SliderProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background-color:  ${({ theme }) => theme.colors.textPrimary};
  transition: .4s;

  // ${props => props.checkedstatus === 'true' && css`
  //   background-color: ${({ theme }) => theme.colors.textPrimary};
  // `}
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.background};
    transition: .4s;
    ${props => props.checkedstatus === 'true' && css`
      transform: translateX(16px);
    `}
  }
`;

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Form = styled.form`
  width: 330px;
  height: 44px;
  border-radius: 4px;
  padding: 0 10px 0 20px;
  border: 1px solid  ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  margin-right: 25px;
  background-color: #fff;
`;

export const InputText = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

export const SearchBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 3px 0 0 5px;
  background-color: transparent;
`;

export const LogoWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

// export const StyledLogo = styled(LogoIcon)`
//   width: 50px;
//   height: 50px;
//
//   &:first-child{
//     fill: ${({ theme }) => theme.colors.extra};
//   }
// `;

export const LogoText = styled.span`
  font-weight: 700;
  font-size: 18px;
`