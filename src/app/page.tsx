'use client';

import { auth } from 'apis/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('로그인 상태');
      } else {
        console.log('로그아웃 상태');
      }
    });
  }, [auth]);

  return (
    <>
      <div>main</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default Main;
