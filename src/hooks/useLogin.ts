import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from 'firebase/auth';
import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { auth, db } from 'apis/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useSetAtom } from 'jotai';
import { userAtom } from 'atoms/user';

const realKey = process.env.NEXT_PUBLIC_FIREBASE_AUTH_PW ?? '';

type Props = {
  id: string;
  name: string;
  avatar: string;
};

const useLogin = ({ id, name, avatar }: Props) => {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = useSetAtom(userAtom);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(undefined);
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        // set localStorage
        setUser({ name, avatar, id });
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
    setError('Please check password.');
  };

  return { subKeyLogin, loading, error };
};

export default useLogin;
