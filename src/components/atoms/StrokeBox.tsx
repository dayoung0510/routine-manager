import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
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
  $step?: number;

  children: React.ReactNode;
  style?: CSSProperties;
};

export const getBorderStyle = (
  step: number,
  thick: number,
  bdColor: ColorType,
  bgColor: ColorType,
) => {
  const borderColor = theme.colors[bdColor];
  const backgroundColor = theme.colors[bgColor];

  switch (step) {
    case 1:
      return css`
        box-shadow:
          ${thick / 3}rem 0 ${borderColor},
          -${thick / 3}rem 0 ${borderColor},
          0 -${thick / 3}rem ${borderColor},
          0 ${thick / 3}rem ${borderColor};
      `;
    case 2:
      return css`
        box-shadow:
          ${thick / 4}rem 0 ${backgroundColor},
          -${thick / 4}rem 0 ${backgroundColor},
          0 -${thick / 4}rem ${backgroundColor},
          0 ${thick / 4}rem ${backgroundColor},
          ${thick / 2}rem 0 ${borderColor},
          -${thick / 2}rem 0 ${borderColor},
          0 -${thick / 2}rem ${borderColor},
          0 ${thick / 2}rem ${borderColor},
          0 0 0 ${thick / 4}rem ${borderColor};
      `;
    case 3:
      return css`
        box-shadow:
          ${thick}rem 0 ${backgroundColor},
          -${thick}rem 0 ${backgroundColor},
          0 -${thick}rem ${backgroundColor},
          0 ${thick}rem ${backgroundColor},
          ${thick / 4}rem 0 0 ${thick * 0.5}rem ${backgroundColor},
          -${thick / 4}rem 0 0 ${thick * 0.5}rem ${backgroundColor},
          0 -${thick / 4}rem 0 ${thick * 0.5}rem ${backgroundColor},
          0 ${thick / 4}rem 0 ${thick * 0.5}rem ${backgroundColor},
          ${thick * 1.25}rem 0 ${borderColor},
          -${thick * 1.25}rem 0 ${borderColor},
          0 -${thick * 1.25}rem ${borderColor},
          0 ${thick * 1.25}rem ${borderColor},
          0 0 0 ${thick * 0.75}rem ${borderColor},
          0 ${thick * 0.5}rem 0 ${thick * 0.5}rem ${borderColor},
          0 -${thick * 0.5}rem 0 ${thick * 0.5}rem ${borderColor},
          ${thick * 0.5}rem 0 0 ${thick * 0.5}rem ${borderColor},
          -${thick * 0.5}rem 0 0 ${thick * 0.5}rem ${borderColor};

        margin: ${thick}rem;
      `;
    default:
      return;
  }
};

const StrokeBox = ({
  $pd = 0,
  $ftSize = 1,
  $ftColor = 'black0',
  $bgColor = 'white',
  $bdColor = 'black0',
  $isFull = false,
  $thick = 1 /* thickness */,
  $step = 2 /* radius */,
  children,
  ...props
}: Props) => {
  return (
    <StyledDiv
      $pd={$pd}
      $ftSize={$ftSize}
      $isFull={$isFull}
      $bgColor={$bgColor}
      $ftColor={$ftColor}
      $thick={$thick}
      $bdColor={$bdColor}
      $step={$step}
      {...props}
    >
      {children}
    </StyledDiv>
  );
};

export default StrokeBox;

type ContentBoxProps = Omit<Props, 'children'> & {
  $step: number;
  $thick: number;
  $ftColor: ColorType;
  $bdColor: ColorType;
  $bgColor: ColorType;
};

const StyledDiv = styled.div<ContentBoxProps>`
  padding: ${(props) => {
    if (typeof props.$pd === 'object') {
      return `${props.$pd[0]}rem ${props.$pd[1]}rem`;
    }
    return `${props.$pd}rem`;
  }};

  font-size: ${(props) => props.$ftSize}rem;
  background-color: ${(props) => theme.colors[props.$bgColor]};
  color: ${(props) => theme.colors[props.$ftColor]};
  width: ${(props) => (props.$isFull ? '100%' : 'auto')};

  /* 8-bit border */
  ${(props) =>
    getBorderStyle(props.$step, props.$thick, props.$bdColor, props.$bgColor)}
`;
