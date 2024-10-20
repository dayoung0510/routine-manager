import styled from 'styled-components';
import Modal from 'components/molecules/Modal';
import Flex from 'components/atoms/Flex';
import { useGetSpecialTodos, useGetTasks } from 'hooks/tasks';
import theme from 'styles/theme';

type Props = {
  date: string;
  userId: string;
  open: boolean;
  onClose: () => void;
};

type ColorType = keyof typeof theme.colors;

const CalendarModal = ({ open, onClose, date, userId }: Props) => {
  const { data: specialTodos } = useGetSpecialTodos({ userId, date });
  const { data: tasks } = useGetTasks({ userId, date });

  return (
    <Modal open={open} onClose={onClose} dimmed={true}>
      <Container $direction="column" $gap={{ row: 24 }} $isFull>
        <Flex $direction="column" $gap={{ row: 8 }} $align="start" $isFull>
          <Title $bg="blue">
            <p>DAILY TASKS</p>
          </Title>
          {tasks?.map((task) => {
            return (
              <Item key={task.content} $isDone={task.isDone}>
                {task.content}
              </Item>
            );
          })}
        </Flex>

        {specialTodos && specialTodos.length > 0 && (
          <Flex $direction="column" $gap={{ row: 8 }} $align="start" $isFull>
            <Title $bg="lilac">
              <p>SPECIAL TODOS</p>
            </Title>
            {specialTodos?.map((special) => {
              return (
                <Item key={special.specialTodoId} $isDone={special.isDone}>
                  {special.content}
                </Item>
              );
            })}
          </Flex>
        )}
      </Container>
    </Modal>
  );
};
export default CalendarModal;

const Container = styled(Flex)`
  padding: 1.5rem 1rem;
  min-width: 15rem;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Title = styled.div<{ $bg: ColorType }>`
  margin-bottom: 0.2rem;
  background-color: ${({ $bg }) => theme.colors[$bg]};
  padding: 2px 4px;

  > p {
    font-size: 1.2rem;
    color: #fff;
  }
`;

const Item = styled.p<{ $isDone: boolean }>`
  text-decoration: ${({ $isDone }) => ($isDone ? 'line-through' : 'none')};
  color: ${({ $isDone }) => ($isDone ? '#999' : '#000')};
`;
