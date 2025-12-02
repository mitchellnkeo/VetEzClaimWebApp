import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  addDoc,
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
      process.env.NODE_ENV === 'development' &&
        console.log(`${formId} form updated in ${docName} ✅`);
    } else {
      await setDoc(docRef, {
        id: uid,
        userId: uid,
        formId,
        ...formData,
        createdAt: new Date().toISOString(),
      });
      process.env.NODE_ENV === 'development' &&
        console.log(`${formId} form created in ${docName} ✅`);
    }
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
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
    process.env.NODE_ENV === 'development' &&
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
        formTitle: 'Buddy Statement',
        formId: docs?.formId || '',
        guid: docs?.guid || '',
        urlDocsSPring: docs?.urlDocsSPring || '',
        timestamp: docs?.timestamp || '',
        pdf: docs?.pdf || false,
        isUploadedAlready: docs?.formUploadedToVA || false,
      };
    });

    // process.env.NODE_ENV === 'development' && console.log('Fetched buddy statements:', fetchedStatements);

    return fetchedStatements;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
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
        formUrl: '/forms/buddy-requests',
        inProgress: true,
      });
    }

    return inProgressForms;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error fetching in-progress forms:', error);
    return [];
  }
};

export const getFormHistory = async (uid) => {
  try {
    const formDataItems = [];

    for (const form of formsIdList) {
      const formData = await getFormData({ uid: uid, formName: form.formId });
      if (formData) {
        formDataItems.push({
          formTitle: form.formTitle,
          ...formData,
        });
      }
    }

    const buddyStatementData = await getBuddyStatementData({ uid });
    formDataItems.push(...buddyStatementData);

    const newArr = formDataItems
      .filter((item) => item !== null && item !== undefined)
      .map((item) => ({
        formTitle: item?.formTitle === undefined ? '' : item.formTitle,
        urlDocspring: item?.urlDocspring === undefined ? '' : item.urlDocspring,
        timestamp: item?.timestamp === undefined ? '' : item.timestamp,
        count: item?.count === undefined ? 0 : item.count,
        guid: item?.guid === undefined ? '' : item.guid,
        pdf: item?.pdf === undefined ? false : item.pdf,
        isUploadedAlready:
          item?.isUploadedAlready === undefined
            ? false
            : item.isUploadedAlready,
        formId: item?.formId === undefined ? '' : item.formId,
      }));

    const processedArray = newArr.reduce((acc, item) => {
      process.env.NODE_ENV === 'development' && console.log('item => ', item);

      const guidValue = String(item?.guid || '');
      const guids =
        guidValue === ''
          ? []
          : guidValue.includes('|')
          ? guidValue.split('|').filter((g) => g && g !== undefined)
          : [guidValue];

      const timestampValue = String(item?.timestamp || '');
      const timestamps =
        timestampValue === ''
          ? []
          : timestampValue.includes('|')
          ? timestampValue.split('|').filter((t) => t && t !== undefined)
          : [timestampValue];

      const urlValue = String(item?.urlDocspring || '');
      const urls =
        urlValue === ''
          ? []
          : urlValue.includes('|')
          ? urlValue.split('|').filter((u) => u && u !== undefined)
          : [urlValue];

      const entries = guids.map((guid, index) => ({
        formTitle: item?.formTitle === undefined ? '' : item.formTitle,
        formId: item?.formId === undefined ? '' : item.formId,
        guid: guid === undefined ? '' : guid,
        pdf: item?.pdf === undefined ? false : item.pdf,
        timestamp: timestamps[index] === undefined ? '' : timestamps[index],
        urlDocspring: urls[index] === undefined ? '' : urls[index],
        isUploadedAlready:
          item?.isUploadedAlready === undefined
            ? false
            : item.isUploadedAlready,
        count: item?.count === undefined ? 0 : item.count,
      }));

      // add a new entry only if isUploadedAlready found false and it need to have value false explicitly
      if (item?.isUploadedAlready === false) {
        entries.push({
          formTitle: item?.formTitle === undefined ? '' : item.formTitle,
          formId: item?.formId === undefined ? '' : item.formId,
          guid: '',
          pdf: item?.pdf === undefined ? false : item.pdf,
          timestamp: '-',
          urlDocspring: '',
          isUploadedAlready: false,
          count: item?.count === undefined ? 0 : item.count,
        });
      }

      return [...acc, ...entries];
    }, []);

    process.env.NODE_ENV === 'development' &&
      console.log('processedArray => ', processedArray);

    // Sort the array based on timestamp
    const sortedArray = processedArray.sort((a, b) => {
      // If either timestamp is '-', it should come first
      if (a.timestamp === '-' && b.timestamp === '-') return 0;
      if (a.timestamp === '-') return -1;
      if (b.timestamp === '-') return 1;

      // Convert MM/DD/YYYY to Date objects
      const [monthA, dayA, yearA] = a.timestamp.split('/');
      const [monthB, dayB, yearB] = b.timestamp.split('/');

      const dateA = new Date(
        parseInt(yearA),
        parseInt(monthA) - 1,
        parseInt(dayA)
      );
      const dateB = new Date(
        parseInt(yearB),
        parseInt(monthB) - 1,
        parseInt(dayB)
      );

      // Sort in descending order (most recent first)
      return dateB.getTime() - dateA.getTime();
    });

    return sortedArray;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error fetching items:', error);
    // throw error;
    return [];
  }
};

export const fetchBuddyRequests = async (uid) => {
  try {
    const buddyStatementRef = query(
      collection(db, 'buddy_statement', uid, 'buddyStatement'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(buddyStatementRef);
    const fetchedStatements = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    process.env.NODE_ENV === 'development' &&
      console.log('Fetched statements:', fetchedStatements);
    return fetchedStatements;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error fetching buddy data:', error);
    return [];
  }
};

export const setBuddyRequestData = async (
  uid,
  data,
  docId,
  formStatus,
  recordExists
) => {
  const fcmToken = localStorage.getItem('fcm_token');

  const buddyStatementData = {
    ...data,
    fcm_token: fcmToken || null,
    status: formStatus,
    userId: uid,
    docId: docId,
    formId: 'Buddy form',
    createdAt: serverTimestamp(),
  };
  process.env.NODE_ENV === 'development' &&
    console.log('Buddy Request data: >> ', buddyStatementData);

  try {
    const docRef = doc(db, 'buddy_statement', uid, 'buddyStatement', docId);
    if (recordExists) {
      await updateDoc(docRef, buddyStatementData);
    } else {
      await setDoc(docRef, buddyStatementData);
    }
    process.env.NODE_ENV === 'development' &&
      console.log('Buddy statement saved successfully!');
    return true;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error saving buddy statement:', error);
    throw error;
  }
};

export const deleteBuddyRequestData = async (uid, docId) => {
  process.env.NODE_ENV === 'development' && console.log('Doc Id:', docId);
  process.env.NODE_ENV === 'development' && console.log('Uid:', uid);
  try {
    const docRef = doc(db, 'buddy_statement', uid, 'buddyStatement', docId);
    await deleteDoc(docRef);
    process.env.NODE_ENV === 'development' &&
      console.log(`Document '${docId}' deleted for UID '${uid}'.`);
    return true;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error deleting buddy statement:', error);
    return false;
  }
};

export const getBuddyFormData = async (uid, docId) => {
  process.env.NODE_ENV === 'development' && console.log('uid:', uid);
  process.env.NODE_ENV === 'development' && console.log('docId:', docId);
  try {
    const docRef = doc(db, 'buddy_statement', uid, 'buddyStatement', docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      process.env.NODE_ENV === 'development' &&
        console.log('No buddy statement found for the given UID and DocID.');
      return null;
    }
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error retrieving buddy statement:', error);
    return null;
  }
};

export const updateBuddyStatementData = async (uid, data) => {
  process.env.NODE_ENV === 'development' &&
    console.log('updateBuddyStatementData : >> ', data);
  try {
    const docRef = doc(
      db,
      'buddy_statement',
      uid,
      'buddyStatement',
      data.docId
    );
    if (data.recordExists) {
      await updateDoc(docRef, { ...data });
      process.env.NODE_ENV === 'development' &&
        console.log('Buddy statement updated in Firestore');
    } else {
      await setDoc(docRef, { ...data });
      process.env.NODE_ENV === 'development' &&
        console.log('Buddy statement created in Firestore');
    }
    return true;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Error uploading buddy statement:', error);
    return false;
  }
};

export const recordAnalyzerData = async ({
  uid,
  analyzerData,
  instructions,
}) => {
  try {
    // Reference: AnalyzerRecords/{uid}/records
    const recordsRef = collection(db, 'analyzer_records', uid, 'records');

    // Create new record
    const newDoc = await addDoc(recordsRef, {
      userId: uid,
      analyzerData,
      instructions,
      createdAt: new Date().toISOString(),
    });

    process.env.NODE_ENV === 'development' &&
      console.log(`${analyzerData} is recorded with ID: ${newDoc.id} ✅`);
    return newDoc.id; // return record ID if needed
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error(`Error creating ${analyzerData} record:`, error);
    throw error;
  }
};

export const getAnalyzerRecordsByUser = async (uid) => {
  try {
    const recordsRef = collection(db, 'analyzer_records', uid, 'records');
    const snapshot = await getDocs(recordsRef);

    if (snapshot.empty) {
      return []; // no records, return blank array
    }

    const records = snapshot.docs.map((doc) => doc.data().analyzerData || {});
    return records;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error(`Error fetching records for user ${uid}:`, error);
    return []; // fail-safe return blank
  }
};
