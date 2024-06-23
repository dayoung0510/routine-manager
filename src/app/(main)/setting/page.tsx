'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import { usePostTask, useGetUserIdTasks, useUpdateTask } from 'hooks/tasks';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { TaskType } from 'apis/apis';
import { MAX_DAILY_POINT } from 'constants/constants';
import { isEqual, differenceWith } from 'lodash';

type FormType = { tasks: Omit<TaskType, 'userId'>[] };

const Setting = () => {
  const [point, setPoint] = useState(0);
  const user = useAtomValue(userAtom);

  const { control, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      tasks: [{ category: '', content: '', point: 1, createdAt: undefined }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const { mutate: createTask } = usePostTask();
  const { mutate: updateTask } = useUpdateTask();
  const { data, isPending } = useGetUserIdTasks(user.id);

  useEffect(() => {
    if (data && data.length > 0) {
      reset({ tasks: data });
    }
  }, [data, reset]);

  /* save */
  const onSubmit = (formData: FormType) => {
    if (!user.id) return;

    if (data) {
      const newValues = differenceWith(formData.tasks, data, isEqual);
      newValues.forEach((value) => {
        // 기존항목 수정일 땐 update
        if (value.taskId) {
          updateTask({
            taskId: value.taskId,
            userId: user.id!,
            content: value.content,
            category: '',
            point: value.point,
          });
        }

        // 새로운 항목일 땐 create
        else {
          createTask({
            userId: user.id!,
            content: value.content,
            category: '',
            point: value.point,
          });
        }
      });
    }
  };

  /* plus button click */
  const handleClickAdd = () => {
    if (user.id) {
      append({ category: '', content: '', point: 1 });
    }
  };

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <div style={{ width: '100%' }}>
          <PlusButtonWrapper>
            <Button
              type="button"
              size="sm"
              color="blue"
              disabled={fields.length > 9}
              onClick={handleClickAdd}
            >
              ADD
            </Button>
            <div>
              POINT: {point}/{MAX_DAILY_POINT}
            </div>
          </PlusButtonWrapper>

          <RowsContainer>
            {isPending
              ? 'loading...'
              : fields.map((field, index) => {
                  return (
                    <Row key={field.id}>
                      <Controller
                        key={field.id}
                        name={`tasks.${index}.content`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <Input
                              placeholder={`daily task ${index + 1}`}
                              {...field}
                            />
                          );
                        }}
                      />
                      <Controller
                        name={`tasks.${index}.point`}
                        control={control}
                        render={({ field }) => {
                          return <Input placeholder="point" {...field} />;
                        }}
                      />
                      <Button
                        size="sm"
                        color="red"
                        disabled={fields.length < 2}
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(index);
                          }
                        }}
                      >
                        -
                      </Button>
                    </Row>
                  );
                })}
          </RowsContainer>
        </div>

        <Button type="submit">CONFIRM</Button>
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
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const PlusButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  outline: 0;
  font-size: 1.2rem;
  background: none;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black2};
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black9};
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
`;
