'use client';

import { auth } from 'apis/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      toast.error('문제가 발생했습니다.');
    }
  };

  return (
    <>
      <div>main</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default Main;
