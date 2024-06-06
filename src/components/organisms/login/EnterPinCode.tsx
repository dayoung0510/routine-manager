'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useLogin from 'hooks/useLogin';
import Pin, { MAX_LENGTH } from 'components/molecules/Pin';
import { useGetUserPasswordExist, usePostUserPassword } from 'hooks/users';
import Modal from 'components/molecules/Modal';

type Props = {
  id: string;
  name: string;
};

const EnterPinCode = ({ id, name }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [firstPin, setFirstPin] = useState<string>('');
  const { subKeyLogin, loading, error } = useLogin();

  const { data: isPasswordExist, isPending } = useGetUserPasswordExist(id);
  const { mutate: postFirstPin } = usePostUserPassword();

  // 기존회원 로그인
  useEffect(() => {
    if (pin.length === MAX_LENGTH) {
      subKeyLogin(id, pin);
    }
  }, [id, pin]);

  useEffect(() => {
    if (firstPin.length === MAX_LENGTH) {
      postFirstPin({ id, value: firstPin });
    }
  }, [id, firstPin]);

  const isFirstPasswordSetting = !!name && !isPasswordExist;

  useEffect(() => {
    if (isFirstPasswordSetting && !isPending) {
      setOpen(true);
    }
  }, [isFirstPasswordSetting, isPending]);

  return (
    <>
      <NameWrapper>{name}</NameWrapper>
      {isFirstPasswordSetting ? (
        // 첫 비번 설정
        <Modal
          open={open}
          width={300}
          height={250}
          onClose={() => setOpen(false)}
          showCloseButton={false}
        >
          <FirstPinContainer>
            <div>PLEASE SET YOUR PIN</div>
            <Pin
              onChange={(value) => setFirstPin(value)}
              underlineColor="#000"
            />
          </FirstPinContainer>
        </Modal>
      ) : (
        // 기존 비번 입력
        <>
          <Pin
            onChange={(value) => setPin(value)}
            isInit={Boolean(
              pin && pin.length === MAX_LENGTH && error && !loading,
            )}
            error={error}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default EnterPinCode;

const FirstPinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  row-gap: 16px;
`;

const NameWrapper = styled.div`
  /* color: ${({ theme }) => theme.colors.midGray}; */
  color: #aaa;
  font-size: 2rem;

  ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
`;
