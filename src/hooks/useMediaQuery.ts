import { useEffect, useState } from 'react';
import { useMediaQuery as useReactResponsiveMedaiQuery } from 'react-responsive';

export const useMediaQuery = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const isMobile = useReactResponsiveMedaiQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [isMobile]);

  return mobile;
};
