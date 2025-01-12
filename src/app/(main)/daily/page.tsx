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
  usePutTodayTask,
  useGetTodayDoneTaskList,
  usePutTodayScore,
  useDeleteSpecialTodo,
} from 'hooks/tasks';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import StrokeBox from 'components/atoms/StrokeBox';
import { theme } from 'styles/theme';
import Icon from 'components/atoms/icon/Icon';
import dayjs from 'dayjs';
import Modal from 'components/molecules/Modal';
import { useEffect, useRef, useState } from 'react';
import Input from 'components/atoms/Input';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'hooks/useMediaQuery';

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

  const isMobile = useMediaQuery();

  const queryClient = useQueryClient();
  const today = dayjs().format('YYYYMMDD').toString();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const targetDay = dayjs(selectedDate).format('YYYYMMDD');

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: tasks } = useGetUserIdActiveTasks(user.id);
  const { data: categories } = useGetCategories();
  const { data: todayDoneTasks } = useGetTodayDoneTaskList({
    userId: user.id,
    date: targetDay,
  });
  const { data: specialTodos } = useGetSpecialTodos({
    userId: user.id,
    date: targetDay,
  });

  const { mutate: addSpecialTodo } = usePostSpecialTodo();
  const { mutate: toggleSpecialTodo } = usePutSpecialTodoStatus();
  const { mutate: toggleTask } = usePutTodayTask();
  const { mutate: saveTodayScore } = usePutTodayScore();
  const { mutate: deleteSpecialTodo } = useDeleteSpecialTodo();

  const [specialModal, setSpecialModal] = useState(false);
  const [specialInput, setSpecialInput] = useState('');

  // 카테고리 색상표시
  const findCategory = (id: string) => {
    if (categories && categories.length) {
      return categories.find((i) => i.id === id)?.title ?? '!';
    }
    return '-';
  };

  // special todo 추가
  const handleClickSpecialAdd = () => {
    if (user.id) {
      addSpecialTodo(
        {
          date: targetDay,
          content: specialInput,
          userId: user.id,
          isDone: false,
        },
        {
          onSuccess: (res) => {
            queryClient.invalidateQueries({
              queryKey: ['specialTodos', targetDay],
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
          date: targetDay,
          isDone: !currentStatus,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['specialTodos', targetDay],
            });
          },
        },
      );
    }
  };

  // specialTodo 삭제
  const handleDeleteSpecialTodo = (specialTodoId: string) => {
    if (user.id) {
      deleteSpecialTodo(
        { userId: user.id, specialTodoId, date: targetDay },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['specialTodos', targetDay],
            });
            toast.success('DELETED!');
          },
        },
      );
    }
  };

  // 오늘의 완료된 태스크 아이디 리스트
  const doneTaskList = todayDoneTasks?.map((i) => i.taskId);

  // 오늘의 태스크 상태 토글
  const handleToggleTodayTask = (taskId: string, content: string) => {
    if (user.id) {
      const payload = {
        userId: user.id,
        date: targetDay,
        taskId,
        content,
      };

      // 오늘 처음 토글누른거면 일단 오늘의 모든 tasks 목록을 DB에 넣기
      if (doneTaskList && doneTaskList.length === 0) {
        tasks?.forEach((task) => {
          if (task.taskId && user.id) {
            toggleTask({
              userId: user.id,
              date: targetDay,
              taskId: task.taskId,
              content: task.content,
              isDone: false,
            });
          }
        });
      }

      if (doneTaskList?.includes(taskId)) {
        toggleTask(
          { ...payload, isDone: false },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['tasks', targetDay] });
            },
          },
        );
      } else {
        toggleTask(
          { ...payload, isDone: true },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['tasks', targetDay] });
            },
          },
        );
      }
    }
  };

  // 오늘의 점수 계산
  const doneDetailInfoList = tasks?.filter((task) =>
    task.taskId ? doneTaskList?.includes(task.taskId) : '',
  );
  const score = doneDetailInfoList?.reduce((acc, cur) => {
    return acc + cur.point * 10;
  }, 0);
  useEffect(() => {
    // 오늘의 스코어 업데이트
    if (score && user.id) {
      saveTodayScore({
        userId: user.id,
        date: targetDay,
        score: score.toString(),
      });
    }
  }, [score]);

  // special todo 추가모달 열렸을 때 input 자동포커싱
  useEffect(() => {
    if (specialModal) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [specialModal]);

  return (
    <Container $direction="column" $gap={{ row: 16 }} $isFull>
      <DailyAndSpecialContainer $direction="column" $isFull $align="start">
        <Flex $direction="column" $isFull $align="start">
          <Title>DAILY ROUTINE</Title>
          <RowContainer style={{ marginTop: '8px' }}>
            {tasks?.map((task) => {
              const isDone = task.taskId
                ? doneTaskList?.includes(task.taskId)
                : false;

              return (
                <div
                  key={task.taskId}
                  style={{ position: 'relative' }}
                  onClick={() => {
                    if (task.taskId) {
                      handleToggleTodayTask(task.taskId, task.content);
                    }
                  }}
                >
                  <Bar>
                    <Text>{findCategory(task.category)}</Text>
                    <Text>{task.point}</Text>
                  </Bar>
                  <StrokeBox
                    $pd={0.75}
                    $bdColor={isDone ? 'black7' : 'black0'}
                    $bgColor={isDone ? 'midGray' : colorMap[task.category]}
                    style={{ cursor: 'pointer' }}
                  >
                    <p
                      style={{
                        color: isDone ? '#777' : '#000',
                        textDecoration: isDone ? 'line-through' : 'none',
                      }}
                    >
                      {task.content}
                    </p>
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
                <div key={special.content} style={{ position: 'relative' }}>
                  <Bar>
                    <div></div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        if (special.specialTodoId) {
                          handleDeleteSpecialTodo(special.specialTodoId);
                        }
                      }}
                    >
                      <Icon
                        name="close"
                        size={12}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </Bar>
                  <StrokeBox
                    $pd={0.75}
                    $bgColor={isDone ? 'midGray' : 'lilac'}
                    $bdColor={isDone ? 'black7' : 'black0'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleToggleSpecialTodo(
                        special.specialTodoId,
                        special.isDone,
                      );
                    }}
                  >
                    <p
                      style={{
                        color: isDone ? '#999' : '#000',
                        textDecoration: isDone ? 'line-through' : 'none',
                      }}
                    >
                      {special.content}
                    </p>
                  </StrokeBox>
                </div>
              );
            })}
          </RowContainer>
        </Flex>
      </DailyAndSpecialContainer>

      <ScoreWrapper>
        <Flex $gap={{ column: 20 }}>
          {!isMobile && <p className="score">TODAY SCORE</p>}
          <p className="score">{score}</p>
        </Flex>

        <Flex $gap={{ column: 8 }}>
          <div
            onClick={() => {
              const target = dayjs(selectedDate).subtract(1, 'day');
              setSelectedDate(target.toDate());
            }}
          >
            <Icon size={18} name="arrowL" />
          </div>
          <DateTypo>{dayjs(selectedDate).format('YYYY-MM-DD(dd)')}</DateTypo>
          <div
            onClick={() => {
              const target = dayjs(selectedDate).add(1, 'day');
              setSelectedDate(target.toDate());
            }}
          >
            <Icon size={18} name="arrowR" />
          </div>
        </Flex>
      </ScoreWrapper>

      {specialModal && (
        <Modal
          open={specialModal}
          onClose={() => setSpecialModal(false)}
          width={400}
          dimmed
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClickSpecialAdd();
            }}
          >
            <Flex
              $justify="center"
              $direction="column"
              $gap={{ row: 24 }}
              style={{ padding: '1rem' }}
              $isFull
            >
              <Input
                ref={inputRef}
                bdColor="black3"
                ftColor="black3"
                placeholder={`TODAY'S SPECIAL TODO`}
                style={{ width: '100%' }}
                onChange={(e) => setSpecialInput(e.target.value)}
              />
              <Button type="submit" color="blue" isFull>
                CONFIRM
              </Button>
            </Flex>
          </form>
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
    padding: 21px 16px;
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

const DateTypo = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black5};
`;

const ScoreWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 36px;
  padding-top: 12px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p.score1 {
    font-size: 36px;
  }
  p.score2 {
    font-size: 12px;
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

const DailyAndSpecialContainer = styled(Flex)`
  height: calc(100% - 36px);
  overflow-y: auto;
`;
