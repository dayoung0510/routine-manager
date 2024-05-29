import styled from 'styled-components';
import Image from 'next/image';
import * as Arrow from 'components/atoms/Arrows';
import { useGetUsers } from 'hooks/users';
import Input from 'components/atoms/Input';
import EnterPinCode from './EnterPinCode';

type Props = {
  id: string;
  handleReset: () => void;
};

const EnterMemberInfo = ({ id, handleReset }: Props) => {
  const { data: users } = useGetUsers();
  const userInfo = users?.[Number(id)];

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
        <EnterPinCode id={id} />
      ) : (
        <Input placeholder="please enter a name." />
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
