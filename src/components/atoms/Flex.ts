import styled, { css } from 'styled-components';

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};
const justifyMap = {
  ...alignMap,
  sb: 'space-between',
};

type FlexProps = {
  $width?: number; // px단위
  $isFull?: boolean;
  $direction?: 'row' | 'column';
  $justify?: keyof typeof justifyMap;
  $align?: keyof typeof alignMap;
  $gap?: { column?: number; row?: number }; // px단위
};

const Flex = styled.div<FlexProps>`
  display: flex;
  width: ${({ $width, $isFull }) => {
    if ($isFull) return '100%';
    else {
      if ($width) {
        return `${$width / 16}rem`;
      }
      return 'auto';
    }
  }};

  // 가로정렬이 기본값
  flex-direction: ${({ $direction }) => ($direction ? $direction : 'row')};

  // 좌측정렬이 기본값
  justify-content: ${({ $justify }) => css`
    ${justifyMap[$justify ?? 'start']}
  `};

  // 가운데정렬이 기본값
  align-items: ${({ $align }) => css`
    ${alignMap[$align ?? 'center']}
  `};

  ${({ $gap }) =>
    $gap?.column &&
    css`
      column-gap: ${$gap.column / 16}rem;
    `};
  ${({ $gap }) =>
    $gap?.row &&
    css`
      row-gap: ${$gap.row / 16}rem;
    `}
`;

export default Flex;
