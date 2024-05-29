import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: 24 | 32;
}

const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  outline: 0;
  border: 0;
  background: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.mint};
  color: ${({ theme }) => theme.colors.mint};
  font-size: 24px;
  padding: 0.5rem;
`;
