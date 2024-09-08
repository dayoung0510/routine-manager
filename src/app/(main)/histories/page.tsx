'use client';

import styled from 'styled-components';
import { useGetUserIdAllTasks } from 'hooks/tasks';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import StrokeBox from 'components/atoms/StrokeBox';
import { useDeleteTask } from 'hooks/tasks';
import Button from 'components/atoms/Button';
import { toast } from 'react-toastify';

const Setting = () => {
  const user = useAtomValue(userAtom);
  const { data } = useGetUserIdAllTasks(user.id);

  const { mutate } = useDeleteTask();

  const handleClickDelete = (taskId?: string) => {
    if (taskId && user.id) {
      mutate(
        { taskId: taskId, userId: user.id },
        {
          onSuccess: () => {
            toast('DELETED SUCCESS');
          },
        },
      );
    }
  };

  return (
    <Container>
      {data?.map((i) => (
        <Row key={i.taskId}>
          <Cell>
            {i.category.length > 0 && (
              <StrokeBox $bdColor="purple" $bgColor="lilac">
                {i.category}
              </StrokeBox>
            )}

            <Text $isOngoing={i.isActive}>{i.content}</Text>
          </Cell>
          <Cell>
            <Text $isOngoing={i.isActive}>
              {i.isActive ? 'NOW' : 'FINISHED'}
            </Text>
            <Button
              size="sm"
              color="red"
              onClick={() => handleClickDelete(i.taskId)}
            >
              DELETE PERMANANTLY
            </Button>
          </Cell>
        </Row>
      ))}
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.black5};
`;
const Cell = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: center;
`;

const Text = styled.p<{ $isOngoing: boolean }>`
  color: ${({ $isOngoing, theme }) =>
    $isOngoing ? theme.colors.black3 : theme.colors.black9};
`;
