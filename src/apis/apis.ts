import { db } from 'apis/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  FieldValue,
  updateDoc,
} from 'firebase/firestore';

export type UserType = {
  id: string;
  name: string;
  avatar: string;
};

/* 모든 유저목록 가져오기 */
export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data as UserType[];
};

/* 유저네임 설정 */
export const putUserName = async ({
  id,
  name,
}: Pick<UserType, 'id' | 'name'>) => {
  const washingtonRef = doc(db, 'users', id);
  await updateDoc(washingtonRef, {
    name,
  });
};
