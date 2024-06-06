import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

type ColorType = keyof typeof theme.colors;

type Props = {
  $pd?: number | [number, number];
  $thick?: number;
  $ftSize?: number;
  $ftColor?: ColorType;
  $bgColor?: ColorType;
  $bdColor?: ColorType;
  $isFull?: boolean;

  children: React.ReactNode;
  style?: CSSProperties;
};

const StrokeBox = ({
  $pd = 0.5,
  $thick = 5,
  $ftSize = 1,
  $ftColor = 'black',
  $bgColor = 'white',
  $bdColor = 'black',
  $isFull = false,
  children,
  ...props
}: Props) => {
  return (
    <StyledDiv
      $pd={$pd}
      $thick={$thick}
      $ftSize={$ftSize}
      $ftColor={$ftColor}
      $bgColor={$bgColor}
      $bdColor={$bdColor}
      $isFull={$isFull}
      {...props}
    >
      {children}
    </StyledDiv>
  );
};

export default StrokeBox;

const StyledDiv = styled.div<Omit<Props, 'children'>>`
  padding: ${(props) => {
    if (typeof props.$pd === 'object') {
      return `${props.$pd[0]}rem ${props.$pd[1]}rem`;
    }
    return `${props.$pd}rem`;
  }};

  font-size: ${(props) => props.$ftSize}rem;
  color: ${(props) => props.$ftColor};
  background-color: ${(props) => props.$bgColor};
  width: ${(props) => (props.$isFull ? '100%' : 'auto')};

  box-shadow: ${(props) => `
  -${props.$thick}px 0 0 0 ${props.$bdColor},
  ${props.$thick}px 0 0 0 ${props.$bdColor},
  0 -${props.$thick}px 0 0 ${props.$bdColor},
  0 ${props.$thick}px 0 0 ${props.$bdColor}
`};
`;
