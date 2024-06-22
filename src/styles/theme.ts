import { MOBILE_SIZE } from 'constants/constants';

export const theme = {
  colors: {
    red: '#eb5454',
    mint: '#06a49a',
    green: '#369128',
    purple: '#657CEA',
    lilac: '#a1acfe',
    blue: '#3faeed',

    white: '#eeeeee',
    black0: '#000000',
    black1: '#111111',
    black2: '#222222',
    black3: '#333333',
    black5: '#555555',
    black7: '#777777',
    black9: '#999999',
    darkGray: '#2e2e2e',
    midGray: '#cccccc',
    lightGray: '#ececec',
  },
  device: {
    mobile: `@media only screen and (max-width: ${MOBILE_SIZE}px)`,
  },
};

export default theme;
