'use client';

import { useState } from 'react';
import Button from 'components/atoms/Button';

const Main = () => {
  const [content, setContent] = useState('');

  return (
    <>
      <input onChange={(e) => setContent(e.target.value)} />
      <Button onClick={() => console.log()}>CONFIRM</Button>
    </>
  );
};

export default Main;
