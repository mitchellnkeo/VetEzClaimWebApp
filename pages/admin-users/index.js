import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import FrontLayout from '@/components/layouts/FrontLayout';
import List from './List';

const ProviderList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Users'));
  });

  return (
    <FrontLayout title="Users">
      <List />
    </FrontLayout>
  );
};

export default ProviderList;
