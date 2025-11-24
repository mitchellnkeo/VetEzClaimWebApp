import FrontLayout from '@/components/layouts/FrontLayout';
import { useRouter } from 'next/router';
import { getInprogressFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '@/components/Common/Loader';
import { postFormData } from '@/firebase/firebaseOperations';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { toast } from 'react-toastify';

export default function InProgressForms() {
  const router = useRouter();
  const { user, uid } = useSelector((state) => state.auth);
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [inprogressForms, setInprogressForms] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const fetchForms = async () => {
    setIsLoading(true);
    try {
      const forms = await getInprogressFormData(uid);
      process.env.NODE_ENV === 'development' && console.log('forms:', forms);
      setInprogressForms(forms);
    } catch (error) {
      process.env.NODE_ENV === 'development' &&
        console.error('Error fetching in-progress forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!uid) return;
    fetchForms();
  }, [uid]);

  const onDraft = async (item) => {
    if (
      !isSubscribed &&
      item.formId !== 'financial_hardship' &&
      item.formId !== 'courtform' &&
      item.formId !== 'fillform'
    ) {
      toast.info('Subscribe Now');
      return;
    }
    let routerBody = { pathname: item.formUrl };
    if (item.formId !== 'buddy_statement') {
      routerBody.query = { 'in-progress': true };
    }
    router.push(routerBody);
  };

  const onDiscard = async (item) => {
    if (
      !isSubscribed &&
      item.formId !== 'financial_hardship' &&
      item.formId !== 'courtform' &&
      item.formId !== 'fillform'
    ) {
      toast.info('Subscribe Now');
      return;
    }
    setIsLoading(true);
    await postFormData({
      docName: item.formId,
      uid: uid,
      formId: '',
      recordExists: true,
      formData: { isUploadedAlready: true, pdf: false },
    });
    await fetchForms();
    setIsLoading(false);
  };

  return (
    <FrontLayout title="In-Progress Forms">
      <Loader show={isloading} />
      <Breadcrumb preUrl="/" preTitle="Home" currentTitle="In-Progress" />
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">
                {' '}
                In-Progress Forms
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-4">
        {inprogressForms.length > 0 ? (
          inprogressForms.map((form, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white-light"
            >
              <div>
                <p className="text-base font-medium text-gray-900 dark:text-white-light">
                  {form.formTitle}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onDraft(form)}
                  className="rounded-md border border-blue-500 px-4 py-1 text-blue-600 hover:bg-blue-50"
                >
                  Draft
                </button>
                <button
                  onClick={() => onDiscard(form)}
                  className="rounded-md bg-red-600 px-4 py-1 text-white hover:bg-red-700"
                >
                  Discard
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white-light">
            No forms found
          </div>
        )}
      </div>
    </FrontLayout>
  );
}
