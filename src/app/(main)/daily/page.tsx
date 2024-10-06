'use client';

import styled from 'styled-components';
import Button from 'components/atoms/Button';
import Flex from 'components/atoms/Flex';
import {
  useGetUserIdActiveTasks,
  useGetSpecialTodos,
  usePostSpecialTodo,
  usePutSpecialTodoStatus,
  useGetCategories,
} from 'hooks/tasks';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import StrokeBox from 'components/atoms/StrokeBox';
import { theme } from 'styles/theme';
import Icon from 'components/atoms/icon/Icon';
import dayjs from 'dayjs';
import Modal from 'components/molecules/Modal';
import { useState } from 'react';
import Input from 'components/atoms/Input';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type Colortype = keyof typeof theme.colors;

const colorMap: Record<string, Colortype> = {
  '0': 'mint',
  '1': 'blue',
  '2': 'yellow',
  '3': 'red',
  '4': 'purple',
  '5': 'green',
};

const DailyPage = () => {
  const user = useAtomValue(userAtom);

  const queryClient = useQueryClient();
  const today = dayjs().format('YYYYMMDD').toString();

  const { data: tasks } = useGetUserIdActiveTasks(user.id);
  const { data: categories } = useGetCategories();
  const { data: specialTodos } = useGetSpecialTodos({
    userId: user.id,
    date: today,
  });

  const { mutate: addSpecialTodo } = usePostSpecialTodo();
  const { mutate: toggleSpecialTodo } = usePutSpecialTodoStatus();

  const [specialModal, setSpecialModal] = useState(false);
  const [specialInput, setSpecialInput] = useState('');

  // 카테고리 색상표시
  const findCategory = (id: string) => {
    if (categories && categories.length) {
      return categories.find((i) => i.id === id)?.title ?? '!';
    }
    return '-';
  };

  // 오늘의 점수 계산
  const todayScore = (): number => {
    return 0;
  };

  // special todo 추가
  const handleClickSpecialAdd = () => {
    if (user.id) {
      addSpecialTodo(
        { date: today, content: specialInput, userId: user.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['specialTodos', today],
            });
            setSpecialModal(false);
            toast.success('SUCCESS!');
          },
        },
      );
    }
  };

  // special todo 상태 토글
  const handleToggleSpecialTodo = (id: string, currentStatus: boolean) => {
    if (user.id) {
      toggleSpecialTodo(
        {
          userId: user.id,
          specialTodoId: id,
          date: today,
          isDone: !currentStatus,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['specialTodos', today],
            });
          },
        },
      );
    }
  };

  return (
    <Container $direction="column" $gap={{ row: 16 }} $isFull>
      <Flex $direction="column" $isFull $align="start">
        <Title>DAILY ROUTINE</Title>
        <RowContainer style={{ marginTop: '8px' }}>
          {tasks?.map((task) => {
            return (
              <div key={task.taskId} style={{ position: 'relative' }}>
                <Bar>
                  <Text>{findCategory(task.category)}</Text>
                  <Text>{task.point}</Text>
                </Bar>
                <StrokeBox
                  $pd={0.75}
                  $bgColor={colorMap[task.category]}
                  style={{ cursor: 'pointer' }}
                >
                  {task.content}
                </StrokeBox>
              </div>
            );
          })}
        </RowContainer>
      </Flex>

      <Flex $direction="column" $isFull $align="start">
        <Flex $justify="center" $align="center" $gap={{ column: 4 }}>
          <Title>SPECIAL TODO</Title>
          <IconWrapper onClick={() => setSpecialModal(true)}>
            <Icon name="plus" size={20} />
          </IconWrapper>
        </Flex>
        <RowContainer>
          {specialTodos?.map((special) => {
            const isDone = special.isDone;

            return (
              <StrokeBox
                key={special.content}
                $pd={0.75}
                $bgColor={isDone ? 'midGray' : 'lilac'}
                $bdColor={isDone ? 'black7' : 'black0'}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  handleToggleSpecialTodo(special.specialTodoId, special.isDone)
                }
              >
                <p
                  style={{
                    color: isDone ? '#777' : '#000',
                    textDecoration: isDone ? 'line-through' : 'none',
                  }}
                >
                  {special.content}
                </p>
              </StrokeBox>
            );
          })}
        </RowContainer>
      </Flex>

      <ScoreWrapper>
        <p>TODAY SCORE</p>
        <p>{todayScore()}</p>
      </ScoreWrapper>

      {specialModal && (
        <Modal
          open={specialModal}
          onClose={() => setSpecialModal(false)}
          width={400}
          dimmed
        >
          <Flex
            $justify="center"
            $direction="column"
            $gap={{ row: 24 }}
            style={{ padding: '1rem' }}
            $isFull
          >
            <Input
              bdColor="black3"
              ftColor="black3"
              placeholder={`TODAY'S SPECIAL TODO`}
              style={{ width: '100%' }}
              onChange={(e) => setSpecialInput(e.target.value)}
            />
            <Button color="blue" isFull onClick={handleClickSpecialAdd}>
              CONFIRM
            </Button>
          </Flex>
        </Modal>
      )}
    </Container>
  );
};

export default DailyPage;

const Container = styled(Flex)`
  position: relative;
  height: 100%;
  overflow-y: auto;
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  column-gap: 24px;
  row-gap: 36px;
  padding: 24px;

  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    padding: 16px;
  }
`;
const Text = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
`;
const Bar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: absolute;
  top: -21px;
`;
const Title = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black7};

  ${({ theme }) => theme.device.mobile} {
    font-size: 18px;
  }
`;

const ScoreWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 20px;
  p {
    font-size: 36px;
  }

  p:first-child {
    color: ${({ theme }) => theme.colors.black9};
  }

  ${({ theme }) => theme.device.mobile} {
    p {
      font-size: 24px;
    }
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;
