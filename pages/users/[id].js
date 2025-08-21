import { useEffect, useState, Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import PageHeading from '@/components/Common/PageHeading';
import FrontLayout from '@/components/layouts/FrontLayout';
import { showAlert } from '@/utils';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import Loading from '@/components/Common/Loading';
import ProfileDetails from '@/components/PagesComponents/ProfileDetails';
import FileAppealsDetails from '@/components/PagesComponents/FileAppealsDetails';
import FillFormsDetails from '@/components/PagesComponents/FillFormsDetails';
import MiscFormsDetails from '@/components/PagesComponents/MiscFormsDetails';
import SubmitClaimDetails from '@/components/PagesComponents/SubmitClaimDetails';
import { TABLE_NAME } from '@/constants/constants';
import { getItems } from '@/services/firebaes_crud';
import RequestFilesDetails from '@/components/PagesComponents/RequestFilesDetails';

function SinglePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [fillFormsData, setFillFormsData] = useState([]);
  const [submitClaimsData, setSubmitClaimsData] = useState([]);
  const [fileAppealData, setFileAppealData] = useState([]);
  const [miscFormsData, setMiscFormsData] = useState([]);
  const [requestFilesData, setRequestFilesData] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  const profileDetails = async () => {
    const docRef = doc(db, TABLE_NAME.profile, id);
    const docSnap = await getDoc(docRef);
    try {
      if (docSnap.exists()) {
        setProfileData({
          id: id,
          ...docSnap.data(),
        });
        setIsLoading(false);
      } else {
        showAlert('No such document!', 'error');
        setError('No such document!');
        setIsLoading(false);
      }
    } catch (error) {
      showAlert(error.message, 'error');
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fileAppeals = async () => {
    setIsLoading(true);
    getItems(TABLE_NAME.fileappeal, id)
      .then((res) => {
        setFileAppealData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        showAlert(error.message, 'error');
        setError(error.message);
        setIsLoading(false);
      });
  };

  const fillForms = async () => {
    setIsLoading(true);
    getItems(TABLE_NAME.fillform, id)
      .then((res) => {
        setFillFormsData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        showAlert(error.message, 'error');
        setError(error.message);
        setIsLoading(false);
      });
  };

  const miscForms = () => {
    setIsLoading(true);
    getItems(TABLE_NAME.miscform, id)
      .then((res) => {
        setMiscFormsData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert(err.message, 'error');
        setError(err.message);
        setIsLoading(false);
      });
  };
  const requestFiles = () => {
    setIsLoading(true);
    getItems(TABLE_NAME.requestfile, id)
      .then((res) => {
        setRequestFilesData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert(err.message, 'error');
        setError(err.message);
        setIsLoading(false);
      });
  };
  const submitClaims = () => {
    setIsLoading(true);
    getItems(TABLE_NAME.submitclaim, id)
      .then((res) => {
        setSubmitClaimsData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert(err.message, 'error');
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      profileDetails();
    }
  }, [id]);

  return (
    <FrontLayout title="User Details">
      <PageHeading
        title="User Details"
        items={[
          { link: '/users', name: 'User' },
          { noLink: '#', name: 'Details' },
        ]}
        // onClick={exportTable}
        // btnClass="btn-primary"
        // btn="Export"
      />
      <Tab.Group>
        <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                disabled={false}
                className={`${
                  selected
                    ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
              >
                Profile
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={fillForms}
                disabled={false}
                className={`${
                  selected
                    ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
              >
                Fill Forms
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={submitClaims}
                disabled={false}
                className={`${
                  selected
                    ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
              >
                Submit claims
              </button>
            )}
          </Tab>

          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={fileAppeals}
                disabled={false}
                className={`${
                  selected
                    ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
              >
                File Appeals
              </button>
            )}
          </Tab>

          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={miscForms}
                disabled={false}
                className={`${
                  selected
                    ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
              >
                Misc Forms
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={requestFiles}
                disabled={false}
                className={`${
                  selected
                    ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black'
                    : ''
                }-mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
              >
                Request Files
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="panel pt-5">
              {error && <p className="text-danger">{error}</p>}
              {isLoading && <Loading />}
              {!isLoading && !error ? (
                <ProfileDetails data={profileData} />
              ) : null}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="pt-5">
              <div className="flex items-center gap-2 text-xl">
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <Loading />}
                {!isLoading && !error ? (
                  <FillFormsDetails data={fillFormsData} />
                ) : null}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="pt-5">
              <div className="flex items-center gap-2 text-xl">
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <Loading />}
                {!isLoading && !error ? (
                  <SubmitClaimDetails data={submitClaimsData} />
                ) : null}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="pt-5">
              <div className="flex items-center gap-2 text-xl">
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <Loading />}
                {!isLoading && !error ? (
                  <FileAppealsDetails data={fileAppealData} />
                ) : null}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="pt-5">
              <div className="flex items-center gap-2 text-xl">
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <Loading />}
                {!isLoading && !error ? (
                  <MiscFormsDetails data={miscFormsData} />
                ) : null}
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="panel pt-5">
              <div className="flex items-center gap-2 text-xl">
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <Loading />}
                {!isLoading && !error ? (
                  <RequestFilesDetails data={requestFilesData} />
                ) : null}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </FrontLayout>
  );
}

export default SinglePage;
