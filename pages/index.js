// import ServiceList from '@/components/cards/serviceList';
import FrontLayout from '@/components/layouts/FrontLayout';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react';
// import { dashboardSummery } from '@/store/slices/dashboardSlice';
import Dropdown from '@/components/Dropdown';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  CloseIcon,
  DotIcon,
  EyeIcon,
  ThreeDotIcon,
  TickIcon,
} from '@/components/icons/SvgIcons';
import { showAlert } from '@/utils';
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import CardUI from '@/components/Common/CardUI';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [toggle, setToggle] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const isRtl =
    useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <FrontLayout title="Dashboard">
      <div className="h-[450px]">
        <p className="mb-5 border-b-2 border-gray-200 pb-2 text-2xl">
          Welcome{', '}
          <span className="font-bold">
            {user?.firstName + ' ' + user?.lastName}
          </span>
          <br />
          <span className="text-md">{user?.email}</span>
        </p>
        <div className="mt-5 pt-2"></div>
      </div>
    </FrontLayout>
  );
};

export default Dashboard;
