import { useEffect } from 'react';
import FrontLayout from '@/components/layouts/FrontLayout';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInformation from '@/components/user/ProfileInformation';
import Link from 'next/link';
import Loading from '@/components/Common/Loading';

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Profile'));
  });
  const isRtl =
    useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  const { user, isLoading } = useSelector((state) => {
    return state.auth;
  });

  return (
    <FrontLayout title="Profile">
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Profile</span>
          </li>
        </ul>
        <div className="pt-5">
          <div className="mb-5">
            {!isLoading ? <ProfileInformation data={user} /> : <Loading />}
          </div>
        </div>
      </div>
    </FrontLayout>
  );
};

export default Profile;
