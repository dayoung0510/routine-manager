'use client';

import { useRouter } from 'next/navigation';
import Button from 'components/atoms/Button';

const DailyPage = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push('/daily/edit')}>EDIT</Button>
    </div>
  );
};

export default DailyPage;
