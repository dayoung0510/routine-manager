import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import theme from 'styles/theme';
import { darkenColor } from 'utils/common';

type ColorType = keyof typeof theme.colors;
type SizeType = 'sm' | 'md' | 'lg';

const sizeStyles: Record<SizeType, ReturnType<typeof css>> = {
  sm: css`
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  `,
  md: css`
    font-size: 1.25rem;
    padding: 0.75rem 1rem;
  `,
  lg: css`
    font-size: 1.5rem;
    padding: 1rem 1.25rem;
  `,
};

const boxShadowStyles: Record<SizeType, string> = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: ColorType;
  size?: SizeType;
  isFull?: boolean;
}

const Button = ({
  size = 'md',
  color = 'mint',
  isFull = false,
  children,
  ...props
}: ButtonProps) => {
  const darken = darkenColor(theme.colors[color], 80);
  return (
    <StyledButton
      {...props}
      $size={size}
      $color={color}
      $darken={darken}
      $isFull={isFull}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $color: ColorType;
  $darken: string;
  $size: SizeType;
  $isFull: boolean;
}>`
  width: ${(props) => (props.$isFull ? '100%' : 'auto')};
  outline: 0;
  border: 0;
  cursor: pointer;
  letter-spacing: 1px;

  background-color: ${(props) => props.theme.colors[props.$color]};
  color: ${(props) => (props.$color === 'white' ? '#000' : props.$darken)};

  box-shadow: ${(props) => `
  -${boxShadowStyles[props.$size]} 0 0 0 ${props.$darken},
  ${boxShadowStyles[props.$size]} 0 0 0 ${props.$darken},
  0 -${boxShadowStyles[props.$size]} 0 0 ${props.$darken},
  0 ${boxShadowStyles[props.$size]} 0 0 ${props.$darken}
`};

  ${(props) => sizeStyles[props.$size]};
`;
