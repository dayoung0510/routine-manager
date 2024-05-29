'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useGetUsers } from 'hooks/users';

type Props = {
  onClick: (v: string) => void;
};

const SelectIcon = ({ onClick }: Props) => {
  const { data: users } = useGetUsers();

  return (
    <Container>
      <UserContainer>
        {users?.map((user) => {
          return (
            <IconGrid key={user.id} onClick={() => onClick(user.id)}>
              <Image
                src={user.avatar}
                priority
                width={80}
                height={80}
                alt={`avatar-${user.id}`}
              />
              <div>{user.name.length > 0 ? user.name : 'available'}</div>
            </IconGrid>
          );
        })}
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
  display: flex;
  column-gap: 30px;
`;
const IconGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  cursor: pointer;
`;
