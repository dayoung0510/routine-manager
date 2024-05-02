'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGetUsers } from 'hooks/users';
import useLogin from 'hooks/useLogin';
import Pin from 'components/molecules/Pin';

export default function Home() {
  const [id, setId] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { data: users } = useGetUsers();

  const { subKeyLogin, loading, error } = useLogin();

  useEffect(() => {
    if (id && password && password.length === 4) {
      subKeyLogin(id, password);
    }
  }, [id, password]);

  return (
    <Container>
      <UserContainer>
        {users?.map((user) => {
          return (
            <button
              key={user.id}
              onClick={() => {
                setId(user.id);
              }}
            >
              {user.name}
            </button>
          );
        })}
      </UserContainer>

      <Pin />

      <div style={{ color: 'pink', marginTop: '20px' }}>클릭한아이디 {id}</div>
      <div style={{ color: 'yellowgreen', marginTop: '20px' }}>
        입력한비번 {password}
      </div>
      <div style={{ color: 'yellow', marginTop: '20px' }}>{error}</div>
      <div style={{ color: 'red', marginTop: '20px' }}>
        {loading && 'loading...'}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
const UserContainer = styled.div`
  display: flex;
  column-gap: 10px;
`;
