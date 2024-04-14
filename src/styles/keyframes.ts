import { keyframes } from 'styled-components';

export const Floating = keyframes`
  0% { transform: translateY(0);}
  50% { transform: translateY(-25px);}
  100% { transform: translateY(0);}
`;

export const FadeInUp = keyframes`
  0% { opacity: 0; transform: translate3d(0, 75%, 0);}
  to { opacity: 1; transform: translateZ(0);}
`;
