import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/slices/themeConfigSlice';
import { useDispatch } from 'react-redux';
import FrontLayout from '@/components/layouts/FrontLayout';
import UpdateProfileForm from '@/components/forms/UpdateProfile';
import { useSelector } from 'react-redux';
import ChangePasswordForm from '@/components/forms/ChangePassword';
import {
  AccountUpdateIcon,
  ChangePasswordIcon,
} from '@/components/icons/SvgIcons';

const AccountSetting = () => {
  const dispatch = useDispatch();
  const { user, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(setPageTitle('Account Setting'));
  });
  const [tabs, setTabs] = useState('accountUpdate');
  const toggleTabs = (name) => {
    setTabs(name);
  };

  return (
    <FrontLayout title="Profile">
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="../profile" className="text-primary hover:underline">
            Profile
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Settings</span>
        </li>
      </ul>

      <div className="pt-5">
        <div className="mb-5 flex items-center justify-between">
          <h5 className="text-lg font-semibold dark:text-white-light">
            User Account Settings
          </h5>
        </div>
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-500">Name</p>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Birth Date</p>
              <p className="font-semibold">{user.birthday}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">Phone Number</p>
              <p className="font-semibold">{user.phone}</p>
            </div>
          </div>
        </div>

        <div>
          <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('accountUpdate')}
                className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                  tabs === 'accountUpdate' ? '!border-primary text-primary' : ''
                }`}
              >
                <AccountUpdateIcon />
                Account Update
              </button>
            </li>
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('changePassword')}
                className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                  tabs === 'changePassword'
                    ? '!border-primary text-primary'
                    : ''
                }`}
              >
                <ChangePasswordIcon />
                Change Password
              </button>
            </li>
          </ul>
        </div>
        {tabs === 'accountUpdate' ? <UpdateProfileForm /> : ''}
        {tabs === 'changePassword' ? <ChangePasswordForm /> : ''}
      </div>
    </FrontLayout>
  );
};

export default AccountSetting;
