'use client';

import Image from 'next/image';
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
import { userAtom } from 'atoms/user';
import { RESET } from 'jotai/utils';
import { useAtom } from 'jotai';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery();
  const router = useRouter();

  const [user, setUser] = useAtom(userAtom);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(RESET);
      router.push('/login');
    } catch (error) {
      toast('문제가 발생했습니다.');
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
          <ContentFlex>
            <div>
              {user.avatar && (
                <Image src={user.avatar} width={25} height={25} alt="avatar" />
              )}
            </div>
            <div>{user.name}</div>
            <div className="date">{dayjs().format('YYYY/MM/DD (ddd)')}</div>
          </ContentFlex>
          <div>
            <Button
              size="sm"
              color="midGray"
              subColor="black0"
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

  background-color: ${({ theme }) => theme.colors.black7};
  ${bg.slash5}
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
    const bg = theme.colors.black2;

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
  padding: 12px 12px 12px 16px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: black;

  ${({ theme }) => theme.device.mobile} {
  }
`;

const ContentFlex = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  color: ${({ theme }) => theme.colors.midGray};
  letter-spacing: 2px;
  font-size: 1.3rem;

  .date {
    color: ${({ theme }) => theme.colors.black7};
  }

  ${({ theme }) => theme.device.mobile} {
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
`;
