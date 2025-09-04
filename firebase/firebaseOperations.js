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
        formTitle: 'Buddy Statement',
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

    const buddyStatementData = await getBuddyStatementData({uid});
    formDataItems.push(...buddyStatementData);

    const newArr = formDataItems
      .filter(item => item !== null && item !== undefined)
      .map(item => ({
        formTitle: item?.formTitle === undefined ? '' : item.formTitle,
        urlDocspring: item?.urlDocspring === undefined ? '' : item.urlDocspring,
        timestamp: item?.timestamp === undefined ? '' : item.timestamp,
        count: item?.count === undefined ? 0 : item.count,
        guid: item?.guid === undefined ? '' : item.guid,
        pdf: item?.pdf === undefined ? false : item.pdf,
        isUploadedAlready: item?.isUploadedAlready === undefined ? false : item.isUploadedAlready,
        formId: item?.formId === undefined ? '' : item.formId
      }));

    const processedArray = newArr.reduce((acc, item) => {
      console.log('item => ', item);
    
      const guidValue = String(item?.guid || '');
      const guids = guidValue === '' ? [] : guidValue.includes('|') 
        ? guidValue.split('|').filter(g => g && g !== undefined)
        : [guidValue];

      
      const timestampValue = String(item?.timestamp || '');
      const timestamps = timestampValue === '' ? [] : timestampValue.includes('|')
        ? timestampValue.split('|').filter(t => t && t !== undefined)
        : [timestampValue];
        
      const urlValue = String(item?.urlDocspring || '');
      const urls = urlValue === '' ? [] : urlValue.includes('|')
        ? urlValue.split('|').filter(u => u && u !== undefined)
        : [urlValue];

   
      const entries = guids.map((guid, index) => ({
        formTitle: item?.formTitle === undefined ? '' : item.formTitle,
        formId: item?.formId === undefined ? '' : item.formId,
        guid: guid === undefined ? '' : guid,
        pdf: item?.pdf === undefined ? false : item.pdf,
        timestamp: timestamps[index] === undefined ? '' : timestamps[index],
        urlDocspring: urls[index] === undefined ? '' : urls[index],
        isUploadedAlready: item?.isUploadedAlready === undefined ? false : item.isUploadedAlready,
        count: item?.count === undefined ? 0 : item.count
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
          count: item?.count === undefined ? 0 : item.count
        });
      }

      return [...acc, ...entries];
    }, []);

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
      
      const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
      const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
      
      // Sort in descending order (most recent first)
      return dateB.getTime() - dateA.getTime();
    });

    return sortedArray;
  } catch (error) {
    console.error('Error fetching items:', error);
    // throw error;
    return [];
  }
};

