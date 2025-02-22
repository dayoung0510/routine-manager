'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import {
  usePostTask,
  useGetUserIdActiveTasks,
  useUpdateTask,
  useInactiveTask,
} from 'hooks/tasks';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { TaskType } from 'apis/apis';
import { MAX_DAILY_POINT } from 'constants/constants';
import { isEqual, differenceWith } from 'lodash';
import { toast } from 'react-toastify';
import ScorePanel from 'components/molecules/ScorePanel';
import Flex from 'components/atoms/Flex';
import { useRouter } from 'next/navigation';
import SelectCategories from 'components/molecules/SelectCategories';
import Icon from 'components/atoms/icon/Icon';
import { useMediaQuery } from 'hooks/useMediaQuery';

type FormType = { tasks: Omit<TaskType, 'userId'>[] };

const Setting = () => {
  const [point, setPoint] = useState(0);
  const router = useRouter();

  const isMobile = useMediaQuery();

  const user = useAtomValue(userAtom);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<FormType>({
    defaultValues: {
      tasks: [{ category: '0', content: '', point: 1, createdAt: undefined }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const { mutate: createTask } = usePostTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: inactiveTask } = useInactiveTask();

  const { data, isPending } = useGetUserIdActiveTasks(user.id);

  useEffect(() => {
    if (data && data.length > 0) {
      reset({ tasks: data });
    }
  }, [data, reset]);

  const points = useWatch({ control, name: 'tasks', defaultValue: [] });
  const totalPoint = points?.reduce((acc, cur) => {
    return acc + Number(cur.point);
  }, 0);

  useEffect(() => {
    if (!isPending) {
      setPoint(totalPoint);
    }
  }, [totalPoint, isPending]);

  /* save */
  const onSubmit = (formData: FormType) => {
    if (!user.id) return;

    if (totalPoint !== 10) {
      toast('Total points must be 10!');
      return;
    }

    if (data) {
      // 비활성화시킬 기존 task의 id
      const formDataIds = formData.tasks.map((i) => i.taskId);
      const willBeInactive = data.filter(
        (item) => !formDataIds.includes(item.taskId),
      );

      // task 비활성화
      willBeInactive.forEach((i) => {
        if (user.id && i.taskId) {
          inactiveTask({ userId: user.id, taskId: i.taskId });
        }
      });

      const newValues = differenceWith(formData.tasks, data, isEqual);
      newValues.forEach((value) => {
        // 기존항목 수정일 땐 update
        if (value.taskId) {
          updateTask(
            {
              taskId: value.taskId,
              userId: user.id!,
              content: value.content,
              category: value.category,
              point: value.point,
              isActive: true,
            },
            {
              onSuccess: () => {
                toast(`UPDATED SUCCESS`);
              },
            },
          );
        }
        // 새로운 항목일 땐 create
        else {
          createTask(
            {
              userId: user.id!,
              content: value.content,
              category: value.category,
              point: value.point,
              isActive: true,
            },
            {
              onSuccess: () => {
                toast(`SAVED SUCCESS`);
              },
            },
          );
        }
      });
    }
  };

  /* plus button click */
  const handleClickAdd = () => {
    if (user.id) {
      append({ category: '0', content: '', point: 1, isActive: true });
    }
  };

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <div style={{ width: '100%' }}>
          <PlusButtonWrapper>
            <Flex $gap={{ column: 16 }}>
              <IconWrapper onClick={() => router.back()}>
                <Icon name="back" />
              </IconWrapper>

              <IconWrapper
                onClick={() => {
                  if (fields.length > 9) {
                    toast.error(
                      'You have exceeded the maximum number of tasks.',
                    );
                  } else {
                    handleClickAdd();
                  }
                }}
              >
                <Icon name="plus" />
              </IconWrapper>
            </Flex>
            <PointWrapper $isError={point !== 10}>
              <span className="title">POINT</span>
              <span className="current">{point}</span>/
              <span>{MAX_DAILY_POINT}</span>
            </PointWrapper>
          </PlusButtonWrapper>

          <RowsContainer>
            {isPending
              ? 'loading...'
              : fields.map((field, index) => {
                  return (
                    <Row key={field.id}>
                      <Controller
                        name={`tasks.${index}.category`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectCategories
                              defaultValue={getValues(
                                `tasks.${index}.category`,
                              )}
                              onSelect={(value) =>
                                setValue(
                                  `tasks.${index}.category`,
                                  value.value,
                                  { shouldDirty: true },
                                )
                              }
                            />
                          );
                        }}
                      />

                      <Flex $gap={{ column: 16 }} style={{ flex: 1 }}>
                        <Controller
                          key={field.id}
                          name={`tasks.${index}.content`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => {
                            return (
                              <Input
                                placeholder={`daily task ${index + 1}`}
                                style={{ width: '100%' }}
                                {...field}
                              />
                            );
                          }}
                        />

                        <Flex $gap={{ column: 4 }}>
                          <Controller
                            name={`tasks.${index}.point`}
                            control={control}
                            rules={{ required: true, min: 1, max: 10 }}
                            render={({ field: { value, onChange } }) => {
                              return (
                                <ScorePanel
                                  score={value as number}
                                  handleScore={(v) => onChange(v)}
                                />
                              );
                            }}
                          />
                          <IconWrapper
                            onClick={() => {
                              if (fields.length > 1) {
                                return remove(index);
                              } else {
                                return toast.error(
                                  'There should be at least one!',
                                );
                              }
                            }}
                          >
                            <Icon name="close" />
                          </IconWrapper>
                        </Flex>
                      </Flex>
                    </Row>
                  );
                })}
          </RowsContainer>
        </div>

        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          style={{ marginTop: '3rem' }}
        >
          CONFIRM
        </Button>
      </Container>
    </form>
  );
};

export default Setting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  overflow-y: auto;
  padding: 12px 12px 12px 16px;
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 1rem;

  ${({ theme }) => theme.device.mobile} {
    row-gap: 3rem;
  }
`;

const PlusButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem 0.25rem;
  outline: 0;
  font-size: 1.2rem;
  background: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black3};

  &::placeholder {
    color: ${({ theme }) => theme.colors.black9};
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  flex-direction: row;

  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const PointWrapper = styled.div<{ $isError: boolean }>`
  color: ${({ theme }) => theme.colors.black3};
  display: flex;
  column-gap: 4px;
  font-size: 1.5rem;

  ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }

  > .title {
    color: ${(props) => props.$isError && props.theme.colors.black9};
  }
  > .current {
    color: ${(props) => props.$isError && props.theme.colors.red};
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;
