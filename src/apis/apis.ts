import { db } from 'apis/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

export type UserType = {
  id: string;
  name: string;
  avatar: string;
};

export type TaskType = {
  category: string;
  content: string;
  userId: string;
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
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, {
    name,
  });
};

/* 특정회원id에 기존 설정한 비번 존재 여부 */
export const getUserPasswordExist = async (id: string) => {
  const q = query(
    collection(db, 'passwords'),
    where('id', '==', id),
    where('value', '!=', ''),
  );

  const docRef = doc(db, 'passwords', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().value?.length > 0;
  }

  return false;
};

/* 첫 pin 설정 */
export const postUserPassword = async ({
  id,
  value,
}: {
  id: string;
  value: string;
}) => {
  const docRef = doc(db, 'passwords', id);
  await updateDoc(docRef, { value });
};

/* create task */
export const postTask = async ({ userId, content, category }: TaskType) => {
  try {
    const docRef = addDoc(collection(db, 'tasks'), {
      userId,
      content,
      category,
      createdAt: serverTimestamp(),
      status: false,
    });
  } catch (e) {
    console.log('err', e);
  }
};
