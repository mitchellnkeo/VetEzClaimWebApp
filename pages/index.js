// import ServiceList from '@/components/cards/serviceList';
import FrontLayout from '@/components/layouts/FrontLayout';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { isUserOver18 } from '@/utils/common';

const Dashboard = () => {
  const [profileStatus, setProfileStatus] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const isRtl =
    useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  const isProfileComplete = async () => {
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.birthday &&
      user.phone &&
      user.ssn &&
      user.branchOfService &&
      user.street &&
      user.city &&
      user.province &&
      user.zipCode &&
      user.country &&
      user.signature
    ) {
      const isOver18 = await isUserOver18(user.birthday);
      if (isOver18) {
        setProfileStatus(2);
      } else {
        setProfileStatus(1);
      }
    }
  };

  useEffect(() => {
    console.log('user Info: ', user);
    if (user) {
      isProfileComplete();
    }
  }, []);

  return (
    <FrontLayout title="Dashboard">
      <div className="h-[450px]">
        <p className="mb-5 border-b-2 border-gray-200 pb-2 text-2xl dark:border-gray-600 dark:text-white-light">
          Welcome{', '}
          <span className="font-bold dark:text-white-light">
            {user?.firstName + ' ' + user?.lastName}
          </span>
          <br />
          <span className="text-md dark:text-white-light">{user?.email}</span>
        </p>


        <div className="mt-5 pt-2">
          {profileStatus === 0 && (
            <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
              <p className="font-semibold">Your profile is incomplete </p>
              <p className="mt-2">
                Please complete your profile settings to continue.
              </p>
              <a
                href="/profile/settings"
                className="mt-3 inline-block rounded-lg px-4 py-2 text-white"
                style={{ backgroundColor: '#035F92' }}
              >
                Go to Profile Settings
              </a>
            </div>
          )}

          {profileStatus === 1 && (
            <div className="rounded-lg bg-red-100 p-4 text-red-800">
              <p className="font-semibold">Age restriction </p>
              <p className="mt-2">
                Your profile is complete, but you must be at least 18 years old.
              </p>
              <a
                href="/profile/settings"
                className="mt-3 inline-block rounded-lg px-4 py-2 text-white"
                style={{ backgroundColor: '#035F92' }}
              >
                Update Profile Settings
              </a>
            </div>
          )}

          {profileStatus === 2 && (
            <div className="rounded-lg bg-green-100 p-4 text-green-800 dark:bg-gray-600 dark:text-white-light">
              <p className="font-semibold">Profile Complete </p>
              <p className="mt-2">
                You’re ready to proceed! Please go to the forms menu.
              </p>
              <a
                href="/forms"
                className="mt-3 inline-block rounded-lg px-4 py-2 text-white bg-primary hover:bg-primaryHover  dark:bg-gray-900  dark:hover:bg-gray-800  dark:text-white-light"
              >
                Go to Forms Menu
              </a>
            </div>
          )}
        </div>
      </div>
    </FrontLayout>
  );
};

export default Dashboard;
