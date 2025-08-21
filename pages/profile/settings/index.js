import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/slices/themeConfigSlice';
import { useDispatch } from 'react-redux';
import FrontLayout from '@/components/layouts/FrontLayout';
import UpdateProfileForm from '@/components/forms/UpdateProfile';
import ChangePasswordForm from '@/components/forms/ChangePassword';
import {
  AccountUpdateIcon,
  ChangePasswordIcon,
} from '@/components/icons/SvgIcons';

const AccountSetting = () => {
  const dispatch = useDispatch();
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
