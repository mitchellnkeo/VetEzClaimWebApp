import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { formsIdList } from '@/utils/staticData';

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
    console.error(`Error uploading ${formId} to ${docName}:`, error);
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

export const getBuddyStatementData = async ({ uid }) => {
  try {
    const buddyStatementRef = collection(
      db,
      'buddy_statement',
      uid,
      'buddyStatement'
    );
    const querySnapshot = await getDocs(buddyStatementRef);

    const fetchedStatements = querySnapshot.docs.map((doc) => {
      const docs = doc.data();
      return {
        formId: docs?.formId || '',
        guid: docs?.guid || '',
        urlDocsSPring: docs?.urlDocsSPring || '',
        timestamp: docs?.timestamp || '',
        pdf: docs?.pdf || false,
        isUploadedAlready: docs?.formUploadedToVA || false,
      };
    });

    // console.log('Fetched buddy statements:', fetchedStatements);

    return fetchedStatements;
  } catch (error) {
    console.log('Error fetching buddy statements from Firestore =>', error);
    return [];
  }
};

export const getInprogressFormData = async (uid) => {
  try {
    const results = await Promise.all(
      formsIdList.map(async (form) => {
        const formName = form.formId;
        try {
          const formData = await getFormData({ uid, formName });
          if (formData) {
            if (
              formData?.isUploadedAlready === false ||
              formData?.isUploadedAlready === undefined
            ) {
              return { ...form, inProgress: true };
            }
          }
          return { ...form, inProgress: false };
        } catch (error) {
          return { ...form, inProgress: false };
        }
      })
    );
    let inProgressForms = results.filter((form) => form.inProgress);

    const buddyStatementData = await getBuddyStatementData({ uid });
    const anyInProgressBuddy = buddyStatementData.some(
      (form) =>
        form.isUploadedAlready === false || form.isUploadedAlready === undefined
    );

    if (anyInProgressBuddy) {
      inProgressForms.push({
        formId: 'buddy_statement',
        formTitle: 'Buddy Statement',
        formUrl: '/buddy-statement',
        inProgress: true,
      });
    }

    return inProgressForms;
  } catch (error) {
    console.error('Error fetching in-progress forms:', error);
    return [];
  }
};
