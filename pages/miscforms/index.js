import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import FrontLayout from '@/components/layouts/FrontLayout';
import List from './List';

const ProviderList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Misc Forms'));
  });

  return (
    <FrontLayout title="Misc Forms">
      <List />
    </FrontLayout>
  );
};

export default ProviderList;
