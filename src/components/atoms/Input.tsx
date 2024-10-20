import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';
import theme from 'styles/theme';

type ColorType = keyof typeof theme.colors;
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ftColor?: ColorType;
  bdColor?: ColorType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ftColor = 'white', bdColor = 'mint', ...props }, ref) => {
    return (
      <StyledInput ref={ref} $bdColor={bdColor} $ftColor={ftColor} {...props} />
    );
  },
);

Input.displayName = 'Input';

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
