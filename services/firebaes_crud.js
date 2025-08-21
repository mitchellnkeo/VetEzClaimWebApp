import {
  doc,
  getDocs,
  getDoc,
  query,
  limit,
  orderBy,
  collection,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const getItems = async (tbnName, id, q) => {
  try {
    const collRef = collection(db, tbnName);
    if (q) {
      let querySnapshot;
      if (id) {
        const q = query(collRef, orderBy('timestamp', 'desc'), q);
        querySnapshot = await getDocs(q);
      }
      const result = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return result;
    } else {
      let querySnapshot;
      if (id) {
        const q = query(
          collRef,
          orderBy('timestamp', 'desc'),
          where('userId', '==', id)
        );
        querySnapshot = await getDocs(q);
      }
      const result = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return result;
    }
  } catch (error) {
    return error;
  }
};
