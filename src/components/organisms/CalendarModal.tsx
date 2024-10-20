import styled from 'styled-components';
import Modal from 'components/molecules/Modal';
import Flex from 'components/atoms/Flex';

import { useGetSpecialTodos, useGetTasks } from 'hooks/tasks';

type Props = {
  date: string;
  userId: string;
  open: boolean;
  onClose: () => void;
};

const CalendarModal = ({ open, onClose, date, userId }: Props) => {
  const { data: specialTodos } = useGetSpecialTodos({ userId, date });
  const { data: tasks } = useGetTasks({ userId, date });

  return (
    <Modal open={open} onClose={onClose} dimmed={true}>
      <Container $direction="column" $gap={{ row: 24 }} $isFull>
        <Flex $direction="column" $gap={{ row: 8 }} $align="start" $isFull>
          <Title>DAILY TASKS</Title>
          {tasks?.map((task) => {
            return (
              <Item key={task.content} $isDone={task.isDone}>
                {task.content}
              </Item>
            );
          })}
        </Flex>

        <Flex $direction="column" $gap={{ row: 8 }} $align="start" $isFull>
          <Title>SPECIAL TODOS</Title>
          {specialTodos?.map((special) => {
            return (
              <Item key={special.specialTodoId} $isDone={special.isDone}>
                {special.content}
              </Item>
            );
          })}
        </Flex>
      </Container>
    </Modal>
  );
};
export default CalendarModal;

const Container = styled(Flex)`
  padding: 1.5rem 1rem;
`;

const Title = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.midGray};
  margin-bottom: 0.3rem;

  min-width: 15rem;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Item = styled.p<{ $isDone: boolean }>`
  text-decoration: ${({ $isDone }) => ($isDone ? 'line-through' : 'none')};
  color: ${({ $isDone }) => ($isDone ? '#777' : '#000')};
`;
