import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';
import theme from 'styles/theme';

type ColorType = keyof typeof theme.colors;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ftColor?: ColorType;
  bdColor?: ColorType;
}

const Input = ({
  ftColor = 'white',
  bdColor = 'mint',
  ...props
}: InputProps) => {
  return <StyledInput $bdColor={bdColor} $ftColor={ftColor} {...props} />;
};

export default Input;

const StyledInput = styled.input<{ $ftColor: ColorType; $bdColor: ColorType }>`
  outline: 0;
  border: 0;
  background: none;
  border-bottom: 2px solid ${({ $bdColor }) => theme.colors[$bdColor]};
  color: ${({ $ftColor }) => theme.colors[$ftColor]};
  font-size: 24px;
  padding: 0.5rem;
`;
