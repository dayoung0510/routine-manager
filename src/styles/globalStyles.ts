import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset}

html,
body {
  background-color: #000;
  color:#fff;

  padding: 0;
  margin: 0;

  font-family: 'Dung', sans-serif;
  font-size: 16px;
}

button {
  outline: 0;
  border: 0;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

input {
  outline: 0;
  border: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}


@font-face {
    font-family: 'Dung';
    font-weight: 400;
    src: url(/fonts/DungGeunMo.eot);
    src: url(/fonts/DungGeunMo.eot?#iefix) format('embedded-opentype'),
    url(/fonts/DungGeunMo.woff2) format('woff2'),
    url(/fonts/DungGeunMo.woff) format('woff');
  }
`;
