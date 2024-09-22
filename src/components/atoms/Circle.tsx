import styled, { css } from 'styled-components';

export const colors = [
  { id: '0', color: '#eb5454' },
  { id: '1', color: '#f9ab3e' },
  { id: '2', color: '#369128' },
];

const Circle = styled.div<{ $bg: string; $isActive?: boolean }>`
  width: 12px;
  height: 12px;

  background-color: ${({ $bg }) => $bg};

  box-shadow:
    4px 0 #222,
    -4px 0 #222,
    0 -4px #222,
    0 4px #222;

  ${({ $isActive }) =>
    $isActive &&
    css`
      box-shadow:
        4px 0 #222,
        -4px 0 #222,
        0 -4px #222,
        0 4px #222,
        0 0 0 8px ${({ theme }) => theme.colors.blue},
        0 0 0 8px ${({ theme }) => theme.colors.blue},
        0 0 0 8px ${({ theme }) => theme.colors.blue},
        0 0 0 8px ${({ theme }) => theme.colors.blue};
    `}
`;

export default Circle;
