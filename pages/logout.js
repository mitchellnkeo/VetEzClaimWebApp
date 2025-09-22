import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import AuthLayout from '@/components/layouts/AuthLayout';
import { logoutUser } from '@/store/slices/authSlice';
import { logoutRevenueCat } from '@/store/slices/revenueCatSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const redirectUrl = router.query.redirectUrl
    ? router.query.redirectUrl.toString()
    : '';

  useEffect(() => {
    dispatch(logoutUser({}))
      .then(() => {
        dispatch(logoutRevenueCat());
        window.location.replace(
          redirectUrl ? `/login?redirectUrl=${redirectUrl}` : `/login`
        );
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }, [router, dispatch, redirectUrl]);

  return <AuthLayout>{''}</AuthLayout>;
};

export default Logout;
