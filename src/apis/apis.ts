import { db } from 'apis/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  FieldValue,
} from 'firebase/firestore';

type UserType = {
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
