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
  setDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, updateProfile } from 'firebase/auth';

export type UserType = {
  id: string;
  name: string;
  avatar: string;
};

export type TaskType = {
  category: string;
  content: string;
  point: number;
  userId: string;
  createdAt?: string;
  taskId?: string;
  isActive: boolean;
};

export type OneWordType = {
  endAt: string;
  isActive: boolean;
  onewordId: string;
  startAt: string;
  title: string;
};

export type OnewordSubItemType = {
  category: string;
  title: string;
  isDone: boolean;
  subitemId: string;
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
  // const q = query(
  //   collection(db, 'passwords'),
  //   where('id', '==', id),
  //   where('value', '!=', ''),
  // );

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

/* create user's task */
export const postTask = async ({
  userId,
  content,
  category,
  point,
  isActive,
}: TaskType) => {
  try {
    const ref = collection(db, 'users', userId, 'tasks');

    addDoc(ref, {
      content,
      category,
      point,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
      isActive,
    }).then((res) => {
      updateDoc(doc(db, 'users', userId, 'tasks', res.id), { taskId: res.id });
    });
  } catch (e) {
    console.log('err', e);
  }
};

/* update user's task */
export const updateTask = async ({
  userId,
  taskId,
  content,
  category,
  point,
  isActive,
}: TaskType) => {
  if (taskId) {
    const docRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(docRef, {
      content,
      category,
      point,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
      isActive,
    });
  }
};

/* user's task 비활성화 */
export const inactiveTask = async ({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) => {
  if (taskId) {
    const docRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(docRef, {
      isActive: false,
    });
  }
};

/* user's task DB에서 영구삭제 */
export const deleteTask = async ({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) => {
  if (taskId) {
    const docRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(docRef);
  }
};

/* 특정아이디의 모든 todo list 가져오기(active + inactive) */
export const getUserIdAllTasks = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDocs(collection(docRef, 'tasks'));

    const data = docSnap.docs.map((doc) => doc.data());

    return data as TaskType[];
  } catch (e) {
    console.log('err', e);
  }
};

/* 특정아이디의 활성화된 todo list 가져오기(active) */
export const getUserIdActiveTasks = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const q = query(collection(docRef, 'tasks'), where('isActive', '==', true));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data() as TaskType);
    return data;
  } catch (e) {
    console.log('err', e);
  }
};

/* daily task 카테고리 목록 불러오기 */
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const data = querySnapshot.docs.map((doc) => doc.data());

    return data;
  } catch (e) {
    console.log('err', e);
  }
};

/* 특정유저의 비활성화된 one word 목록 불러오기 */
export const getUserIdInactiveOneWord = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const collectionRef = collection(docRef, 'onewords');

    const q = query(collectionRef, where('isActive', '==', false));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());

    return data as OneWordType[];
  } catch (e) {
    console.log('err', e);
  }
};

/* 특정 유저의 현재 활성화된 one word 불러오기 */
export const getUserIdActiveOneWord = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const q = query(
      collection(docRef, 'onewords'),
      where('isActive', '==', true),
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data() as OneWordType);
    return data;
  } catch (e) {
    console.log('err', e);
  }
};

/* one word 생성하기 */
export const postUserIdOneWord = async ({
  userId,
  startAt,
  endAt,
  title,
}: Omit<OneWordType, 'onewordId' | 'isActive'> & {
  userId: string;
}) => {
  try {
    const ref = collection(db, 'users', userId, 'onewords');

    // 1. 현재 isActive가 true인 모든 onewords 항목을 찾아서 false로 업데이트
    const q = query(ref, where('isActive', '==', true));
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db); // Firebase batch를 사용하여 여러 문서를 한 번에 업데이트

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { isActive: false });
    });

    // batch 커밋 (isActive를 모두 false로 변경)
    await batch.commit();

    // 2. 새로 추가
    const res = await addDoc(ref, {
      title,
      startAt,
      endAt,
      isActive: true,
    });

    // 3. onewordId를 업데이트
    await updateDoc(doc(db, 'users', userId, 'onewords', res.id), {
      onewordId: res.id,
    });
  } catch (e) {
    console.log('err', e);
  }
};

/* 특정 oneword의 sub items 가져오기 */
export const getUserIdOnewordIdSubItems = async ({
  userId,
  onewordId,
}: {
  userId: string;
  onewordId: string;
}) => {
  try {
    const onewordRef = doc(db, 'users', userId, 'onewords', onewordId);
    const subItemsCollectionRef = collection(onewordRef, 'subItems');

    const querySnapshot = await getDocs(subItemsCollectionRef);
    const subItems = querySnapshot.docs.map((doc) => ({
      subitemId: doc.id,
      ...doc.data(),
    }));

    return subItems as OnewordSubItemType[];
  } catch (e) {
    console.log(e);
  }
};
