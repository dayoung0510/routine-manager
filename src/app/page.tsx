'use client';

import { auth } from 'apis/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();

  console.log('1 콘솔 로그');
  console.info('2 콘솔 정보');
  console.debug('3 콘솔 디버그');
  console.warn('4 콘솔 경고');
  console.error('5 콘솔 오류');
  console.table('6 콘솔 테이블');
  console.group('7 콘솔 그룹');
  console.time('8 콘솔 타이머');
  console.count('9 콘솔 카운드');

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
