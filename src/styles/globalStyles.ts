import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
${reset}

html,
body {
  width:100%;
  height:100%;
  
  background-color: #555;
  color:#222;

  padding: 0;
  margin: 0;

  font-family: 'Dung', sans-serif;
  font-size: 16px;
}

button {
  outline: 0;
  border: 0;
  cursor: pointer;
  font-family: 'Dung', sans-serif;
}

button:disabled {
  cursor: not-allowed;
}

input {
  outline: 0;
  border: 0;
  font-family: 'Dung', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
  font-family: 'Dung', sans-serif;
}

* {
  box-sizing: border-box;
}


@font-face {
    font-family: 'Dung';
    font-weight: 400;
    font-display: swap;
    src: url(/fonts/DungGeunMo.eot);
    src: url(/fonts/DungGeunMo.eot?#iefix) format('embedded-opentype'),
    url(/fonts/DungGeunMo.woff2) format('woff2'),
    url(/fonts/DungGeunMo.woff) format('woff');
  }
`;
