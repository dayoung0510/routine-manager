'use client';

import { useEffect } from 'react';
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
import SideBar from 'components/molecules/SideBar';
import { TOP_NAVBAR_HEIGHT } from 'constants/constants';
import { useSetAtom } from 'jotai';
import { userAtom } from 'atoms/user';
import { RESET } from 'jotai/utils';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery();
  const router = useRouter();

  const setUser = useSetAtom(userAtom);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(RESET);
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
        $bdColor="black0"
        $bgColor="lightGray"
        style={{
          position: 'relative',
          width: isMobile ? '100%' : '850px',
          height: isMobile ? 'calc(100vh - 2rem)' : '100%',
          maxHeight: isMobile ? '100%' : '550px',
        }}
      >
        <TopNavBar>
          <div
            style={{
              letterSpacing: '2px',
              fontSize: '1.3rem',
              color: '#999',
            }}
          >
            {dayjs().format('YYYY/MM/DD (ddd)')}
          </div>
          <div>
            <Button
              size="sm"
              color="black7"
              onClick={handleLogout}
              style={{ padding: '0.2rem 0.4rem' }}
            >
              X
            </Button>
          </div>
        </TopNavBar>

        <ContentContainer>
          <SideBar />
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ContentContainer>
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

  background-color: ${({ theme }) => theme.colors.black0};
  ${bg.slash3}
`;

const TopNavBar = styled.div`
  width: 100%;
  position: relative;
  z-index: 2;
  border-bottom: 4px solid black;

  height: ${TOP_NAVBAR_HEIGHT}rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  ${({ theme }) => {
    const bg = theme.colors.black3;

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

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${TOP_NAVBAR_HEIGHT}rem);
  padding-top: 4px;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

const ChildrenWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.black1};
  color: #fff;
`;
