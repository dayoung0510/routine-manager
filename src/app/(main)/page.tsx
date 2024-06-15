'use client';

import { useState } from 'react';
import Button from 'components/atoms/Button';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import { usePostTask } from 'hooks/tasks';

const Main = () => {
  const [content, setContent] = useState('');
  const user = useAtomValue(userAtom);

  const { mutate } = usePostTask();

  return (
    <>
      <input onChange={(e) => setContent(e.target.value)} />
      <Button
        onClick={() => {
          if (user.id) {
            mutate({ userId: user.id, content, category: '0' });
          }
        }}
      >
        CONFIRM
      </Button>
    </>
  );
};

export default Main;
