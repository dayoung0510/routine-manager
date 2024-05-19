import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { auth, db } from 'apis/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const realKey = process.env.NEXT_PUBLIC_FIREBASE_AUTH_PW ?? '';

const useLogin =  () => {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(undefined);
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        setLoggedInUser(user);
        router.push('/');
        return user;
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },

    [auth],
  );

  const subKeyLogin = async (id: string, subKey: string) => {
    const q = query(
      collection(db, 'passwords'),
      where('id', '==', id),
      where('value', '==', subKey),
    );
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      if (doc.exists()) {
        login(`user${id}@user.com`, realKey);
        return; // 로그인 성공 시 함수 종료
      }
    }
    setError('비밀번호를 확인하세요.');
  };

  return { subKeyLogin, loggedInUser, loading, error };
};

export default useLogin