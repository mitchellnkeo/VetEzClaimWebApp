import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const postFormData = async ({
  docName,
  uid,
  formId,
  recordExists,
  formData,
}) => {
  try {
    const docRef = doc(db, docName, uid);

    if (recordExists) {
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });
      console.log(`${formId} form updated in ${docName} ✅`);
    } else {
      await setDoc(docRef, {
        id: uid,
        userId: uid,
        formId,
        ...formData,
        createdAt: new Date().toISOString(),
      });
      console.log(`${formId} form created in ${docName} ✅`);
    }
  } catch (error) {
    console.error(`❌ Error uploading ${formId} to ${docName}:`, error);
    throw error; // 👈 rethrow so caller can handle
  }
};

export const getFormData = async ({ uid, formName }) => {
  try {
    const docRef = doc(db, formName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null; // doc doesn't exist
    }
  } catch (error) {
    console.error('Error fetching form data:', error);
    return null;
  }
};
