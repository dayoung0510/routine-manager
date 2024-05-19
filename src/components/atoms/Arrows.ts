import styled from 'styled-components';

const Base = styled.i`
  width: 20px;
  height: 20px;
  border-width: 4px 4px 0 0;
  border-style: solid;
  margin: 10px;
  color: #888;

  &:after,
  &:before {
    content: '';
    box-sizing: border-box;
  }

  &:hover {
    color: #aaa;
  }

  &:before {
    right: 0;
    top: -3px;
    position: absolute;
    height: 4px;
    box-shadow: inset 0 0 0 32px;
    transform: rotate(-45deg);
    width: 23px;
    transform-origin: right top;
  }
`;

export const Left = styled(Base)`
  transform: rotate(45deg);
`;
export const Right = styled(Base)`
  transform: rotate(-135deg);
`;

export const Up = styled(Base)`
  transform: rotate(-45deg);
`;
export const Down = styled(Base)`
  transform: rotate(135deg);
`;
