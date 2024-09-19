import { SVGAttributes, forwardRef } from 'react';
import iconList from './iconList';
import theme from 'styles/theme';

type IconProps = {
  name: keyof typeof iconList;
  size?: number;
  color?: keyof typeof theme.colors;
} & SVGAttributes<SVGElement>;

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 36, color, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      color={color ? theme.colors[color] : 'currentColor'}
      viewBox="0 0 96 96"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {iconList[name]}
    </svg>
  );
});

export default Icon;
