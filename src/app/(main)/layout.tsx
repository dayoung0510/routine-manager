'use client';

import styled from 'styled-components';
import StrokeBox from 'components/atoms/StrokeBox';
import { useMediaQuery } from 'hooks/useMediaQuery';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery();

  return (
    <Container>
      <StrokeBox
        $pd={1}
        $thick={10}
        style={{
          position: 'relative',
          width: isMobile ? '90%' : '800px',
          height: '100%',
          maxHeight: isMobile ? '100%' : '550px',
          overflowY: 'auto',
        }}
      >
        {children}
      </StrokeBox>
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
`;
