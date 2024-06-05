'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useGetUsers } from 'hooks/users';
import { useMediaQuery } from 'hooks/useMediaQuery';

type Props = {
  onClick: (v: string) => void;
};

const SelectIcon = ({ onClick }: Props) => {
  const { data: users } = useGetUsers();

  const isMobile = useMediaQuery();

  return (
    <Container>
      <UserContainer>
        <IconGrid $isMobile={isMobile}>
          {users?.map((user) => {
            return (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  rowGap: '10px',
                }}
                onClick={() => onClick(user.id)}
              >
                <Image
                  src={user.avatar}
                  priority
                  width={80}
                  height={80}
                  alt={`avatar-${user.id}`}
                />
                <div>{user.name.length > 0 ? user.name : '_ _ _'}</div>
              </div>
            );
          })}
        </IconGrid>
      </UserContainer>
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
const UserContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: red;

  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    background-color: blue;
  }
`;
const IconGrid = styled.div<{ $isMobile: boolean }>`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px; */
  cursor: pointer;
`;
