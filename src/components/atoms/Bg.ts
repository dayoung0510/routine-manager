import theme from 'styles/theme';

export const bg = {
  dot: `background-image: radial-gradient(${theme.colors.lilac} 0.75px, transparent 0); background-size: 5px 5px;`,

  dot2: `background-image: radial-gradient(${theme.colors.lilac} 0.75px, transparent 0); background-size: 3px 3px;`,

  slash: `background-image: linear-gradient(
    -45deg,transparent,transparent 25%, ${theme.colors.lilac} 25%, ${theme.colors.lilac} 50%,transparent 50%,transparent 75%, ${theme.colors.lilac} 75%);
  background-size: 4px 4px;`,

  slash2: `background-image: linear-gradient(
    -45deg,transparent,transparent 25%, ${theme.colors.mint} 25%, ${theme.colors.red} 50%,transparent 50%,transparent 75%, ${theme.colors.purple} 75%);
  background-size: 3.5px 3.5px;`,

  slash3: `background-image: linear-gradient(
    -45deg,transparent,transparent 25%, ${theme.colors.white} 25%, ${theme.colors.black0} 50%,transparent 50%,transparent 75%, ${theme.colors.black7} 75%);
  background-size: 3.5px 3.5px;`,

  slash4: `background-image: linear-gradient(
    -45deg,transparent,transparent 25%, ${theme.colors.mint} 25%, ${theme.colors.black0} 50%,transparent 50%,transparent 75%, ${theme.colors.purple} 75%);
  background-size: 3.5px 3.5px;`,

  slash5: `background-image: linear-gradient(
    -45deg,transparent,transparent 25%, ${theme.colors.black3} 25%, ${theme.colors.black3} 50%,transparent 50%,transparent 75%, ${theme.colors.black3} 75%);
  background-size: 5px 5px;`,

  triangle: `background-image: linear-gradient(
    -45deg,transparent,transparent 75%, ${theme.colors.purple} 75%, ${theme.colors.purple} 50%,transparent 50%,transparent 75%, ${theme.colors.purple} 75%);
  background-size: 7px 7px;`,
};
