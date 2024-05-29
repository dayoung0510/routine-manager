'use client';

import { useState, useEffect } from 'react';
import useLogin from 'hooks/useLogin';
import Pin, { MAX_LENGTH } from 'components/molecules/Pin';

type Props = {
  id: string;
};

const EnterPinCode = ({ id }: Props) => {
  const [pin, setPin] = useState<string>('');
  const { subKeyLogin, loading, error } = useLogin();

  useEffect(() => {
    if (pin.length === MAX_LENGTH) {
      subKeyLogin(id, pin);
    }
  }, [id, pin]);

  return (
    <Pin
      onChange={(value) => setPin(value)}
      isInit={Boolean(pin && pin.length === MAX_LENGTH && error && !loading)}
      error={error}
      loading={loading}
    />
  );
};

export default EnterPinCode;
