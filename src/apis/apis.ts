import { db } from 'apis/firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};
