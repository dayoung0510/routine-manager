'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import Flex from 'components/atoms/Flex';
import { useGetUserIdActiveTasks } from 'hooks/tasks';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';

const DailyPage = () => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const { data } = useGetUserIdActiveTasks(user.id);

  return (
    <Container $direction="column" $isFull>
      <RowContainer $direction="column" $gap={{ row: 16 }}>
        {data?.map((task) => <Flex key={task.taskId}>{task.content}</Flex>)}
      </RowContainer>

      <ButtonWrapper>
        <Button onClick={() => router.push('/daily/edit')}>EDIT</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default DailyPage;

const Container = styled(Flex)`
  position: relative;
  height: 100%;
`;

const RowContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 60px;
  overflow-y: auto;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  position: absolute;
  bottom: 0;

  button {
    width: 100%;
  }
`;
