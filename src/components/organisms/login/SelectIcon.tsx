'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useGetUsers } from 'hooks/users';
import { useMediaQuery } from 'hooks/useMediaQuery';
import StrokeBox from 'components/atoms/StrokeBox';

type Props = {
  onClick: (v: string) => void;
};

const SelectIcon = ({ onClick }: Props) => {
  const { data: users } = useGetUsers();

  const isMobile = useMediaQuery();

  return (
    <Container>
      <Grid>
        {users?.map((user) => {
          return (
            <UserContainer
              key={user.id}
              $isMobile={isMobile}
              onClick={() => onClick(user.id)}
            >
              <Image
                src={user.avatar}
                priority
                width={isMobile ? 80 : 100}
                height={isMobile ? 80 : 100}
                alt={`avatar-${user.id}`}
              />
              <StrokeBox
                $thick={4}
                $isFull
                $pd={[0.25, 1]}
                $ftSize={1.2}
                style={{ textAlign: 'center' }}
              >
                {user.name.length > 0 ? user.name : '_____'}
              </StrokeBox>
            </UserContainer>
          );
        })}
      </Grid>
    </Container>
  );
};

export default SelectIcon;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2.5rem;
  row-gap: 3rem;

  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
`;
const UserContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  cursor: pointer;
`;
const NameWraaper = styled.div`
  width: 100%;
  padding: 0.25rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};
  box-shadow:
    -4px 0 0 0 ${({ theme }) => theme.colors.black},
    4px 0 0 0 ${({ theme }) => theme.colors.black},
    0 -4px 0 0 ${({ theme }) => theme.colors.black},
    0 4px 0 0 ${({ theme }) => theme.colors.black};
`;
