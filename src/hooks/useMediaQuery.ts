import { useEffect, useState } from 'react';
import { useMediaQuery as useReactResponsiveMedaiQuery } from 'react-responsive';
import { MOBILE_SIZE } from 'constants/constants';

export const useMediaQuery = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const isMobile = useReactResponsiveMedaiQuery({ maxWidth: MOBILE_SIZE });

  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [isMobile]);

  return mobile;
};
