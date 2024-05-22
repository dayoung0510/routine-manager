'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useLogin from 'hooks/useLogin';
import Pin from 'components/molecules/Pin';
import { useGetUsers } from 'hooks/users';
import Image from 'next/image';
import * as Arrow from 'components/atoms/Arrows';

type Props = {
  id: string;
  handleReset: () => void;
};

const EnterPinCode = ({ id, handleReset }: Props) => {
  const [pin, setPin] = useState<string>('');
  const { subKeyLogin, loading, error } = useLogin();

  const { data: users } = useGetUsers();
  const userInfo = users?.[Number(id)];

  useEffect(() => {
    if (pin.length === 4) {
      subKeyLogin(id, pin);
    }
  }, [id, pin]);

  return (
    <Container>
      <Arrow.Left onClick={handleReset} />
      <Image
        src={userInfo?.avatar ?? ''}
        priority
        width={120}
        height={120}
        alt={`avatar`}
      />
      <Pin onChange={(value) => setPin(value)} />
      <div style={{ color: 'yellow', marginTop: '20px' }}>{error}</div>
      <div style={{ color: 'red', marginTop: '20px' }}>
        {loading && 'loading...'}
      </div>
    </Container>
  );
};

export default EnterPinCode;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
`;
