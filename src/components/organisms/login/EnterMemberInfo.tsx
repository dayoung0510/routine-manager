import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import * as Arrow from 'components/atoms/Arrows';
import { useGetUsers, usePutUserName } from 'hooks/users';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import EnterPinCode from './EnterPinCode';

type Props = {
  id: string;
  handleReset: () => void;
};

const EnterMemberInfo = ({ id, handleReset }: Props) => {
  const [name, setName] = useState('');

  const { data: users } = useGetUsers();
  const userInfo = users?.[Number(id)];

  const { mutate: putUserName } = usePutUserName();

  const handleSubmitName = (name: string) => {
    putUserName({ id, name });
  };

  return (
    <Container>
      <Arrow.Up onClick={handleReset} />
      <Image
        src={userInfo?.avatar ?? ''}
        priority
        width={120}
        height={120}
        alt={`avatar`}
      />

      {userInfo?.name ? (
        // 기존회원 pin code 입력
        <EnterPinCode
          id={id}
          name={userInfo.name}
          avatar={userInfo?.avatar ?? ''}
        />
      ) : (
        // 새회원 닉네임 입력
        <>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="please enter a name."
            maxLength={6}
          />
          <Button isFull color="mint" onClick={() => handleSubmitName(name)}>
            CONFIRM
          </Button>
        </>
      )}
    </Container>
  );
};

export default EnterMemberInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  position: relative;
`;
