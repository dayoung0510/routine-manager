import styled, { css } from 'styled-components';
import { ButtonHTMLAttributes } from 'react';
import theme from 'styles/theme';
import { darkenColor, lightenColor } from 'utils/common';

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
  md: '0.35rem',
  lg: '0.5rem',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  size?: SizeType;
  isFull?: boolean;

  /* 개별컬러설정이 colorSet보다 후적용 */
  color?: ColorType;
  subColor?: ColorType;
}

const Button = ({
  size = 'md',
  isFull = false,
  children,
  color = 'mint',
  subColor,
  ...props
}: ButtonProps) => {
  const sub = subColor
    ? theme.colors[subColor]
    : darkenColor(theme.colors[color], 40);
  return (
    <StyledButton
      {...props}
      $size={size}
      $color={color}
      $subColor={sub}
      $isFull={isFull}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $color: ColorType;
  $subColor: string;
  $size: SizeType;
  $isFull: boolean;
}>`
  width: ${(props) => (props.$isFull ? '100%' : 'auto')};
  outline: 0;
  border: 0;
  cursor: pointer;
  letter-spacing: 1px;

  background-color: ${(props) => props.theme.colors[props.$color]};
  color: ${(props) => (props.$color === 'white' ? '#000' : props.$subColor)};

  box-shadow: ${(props) => `
  -${boxShadowStyles[props.$size]} 0 0 0 ${props.$subColor},
  ${boxShadowStyles[props.$size]} 0 0 0 ${props.$subColor},
  0 -${boxShadowStyles[props.$size]} 0 0 ${props.$subColor},
  0 ${boxShadowStyles[props.$size]} 0 0 ${props.$subColor}
`};

  ${(props) => sizeStyles[props.$size]};

  &:disabled {
    color: ${({ theme }) => theme.colors.black7};
    background-color: ${({ theme }) => theme.colors.black9};

    box-shadow: ${(props) => {
      const disabledColor = theme.colors.black7;
      return `
        -${boxShadowStyles[props.$size]} 0 0 0 ${disabledColor},
        ${boxShadowStyles[props.$size]} 0 0 0 ${disabledColor},
        0 -${boxShadowStyles[props.$size]} 0 0 ${disabledColor},
        0 ${boxShadowStyles[props.$size]} 0 0 ${disabledColor}
      `;
    }};
  }
`;
