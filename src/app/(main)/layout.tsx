'use client';

import styled, { css } from 'styled-components';
import StrokeBox from 'components/atoms/StrokeBox';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { bg } from 'components/atoms/Bg';
import dayjs from 'dayjs';
import { auth } from 'apis/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Button from 'components/atoms/Button';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      toast.error('문제가 발생했습니다.');
    }
  };

  return (
    <Container>
      <StrokeBox
        $step={2}
        $thick={1.2}
        // $bdColor="mint"
        // $bgColor="black"
        style={{
          position: 'relative',
          width: isMobile ? '100%' : '800px',
          height: isMobile ? 'calc(100vh - 2rem)' : '100%',
          maxHeight: isMobile ? '100%' : '550px',
        }}
      >
        <NavBar>
          <div style={{ letterSpacing: '2px', fontSize: '1.3rem' }}>
            {dayjs().format('YYYY/MM/DD (ddd)')}
          </div>
          <div>
            <Button
              size="sm"
              color="midGray"
              onClick={handleLogout}
              style={{ padding: '0.2rem 0.4rem' }}
            >
              X
            </Button>
          </div>
        </NavBar>

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </StrokeBox>
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;

  background-color: #369128;
  ${bg.slash2}
`;

const NavBar = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  border-bottom: 4px solid black;

  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  ${({ theme }) => {
    const bg = '#2e2e2e';

    return css`
      color: ${theme.colors.white};
      background-color: ${bg};
      box-shadow:
        5px 0 ${bg},
        -5px 0 ${bg},
        0 -5px ${bg};
    `;
  }}

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    height: 4px;
    background-color: black;
  }

  &::before {
    left: -5px;
    width: 5px;
  }

  &::after {
    right: -5px;
    width: 5px;
  }
`;

const ChildrenWrapper = styled.div`
  padding: 1rem;
  height: calc(100% - 3rem);
  overflow-y: auto;
`;
