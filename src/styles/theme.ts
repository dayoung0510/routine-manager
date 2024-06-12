import { MOBILE_SIZE } from 'constants/constants';

export const theme = {
  colors: {
    red: '#eb5454',
    mint: '#30CFC5',
    purple: '#657CEA',
    lilac: '#a1acfe',
    white: '#eee',
    black: '#222',
    darkGray: '#777',
    midGray: '#acacac',
    lightGray: '#ececec',
  },
  device: {
    mobile: `@media only screen and (max-width: ${MOBILE_SIZE}px)`,
  },
};

export default theme;
