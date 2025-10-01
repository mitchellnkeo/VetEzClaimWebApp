import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/slices/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MenuItem from './MenuItem';
import { isUserOver18 } from '@/utils/common';
import { FaFile, FaFileAlt, FaFileExport } from 'react-icons/fa';
import { FaFileInvoice, FaFileCircleExclamation } from 'react-icons/fa6';

import {
  DashboardIcon,
  FormsIcon,
  HistoryIcon,
  InProgressIcon,
  SubscriptionIcon,
  SideToggleCloseIcon,
  CalculatorIcon,
} from '../icons/SvgIcons';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [currentMenu, setCurrentMenu] = useState('');
  const themeConfig = useSelector((state) => state.themeConfig);
  const semidark = useSelector((state) => state.themeConfig.semidark);
  const [buttonStatus, setButtonStatus] = useState(0);


  const toggleMenu = (value) => setCurrentMenu(value);

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
        setButtonStatus(2);
      } else {
        setButtonStatus(1);
      }
    } else {
      setButtonStatus(0);
    }
  };

  useEffect(() => {
    if (user) {
      isProfileComplete();
    }
  }, [user]);

  const menuList = [
    {
      path: '/',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      path: '/forms',
      title: 'Forms',
      icon: <FormsIcon />,
      keyID: 'Forms',
      disabled: buttonStatus < 2,
    },
    {
      path: '/in-progress',
      title: 'In-Progress',
      icon: <InProgressIcon />,
      keyID: 'In-Progress',
      disabled: buttonStatus < 2,
    },
    {
      path: '/history',
      title: 'History',
      icon: <HistoryIcon />,
      keyID: 'History',
      disabled: buttonStatus < 2,
    },
    {
      path: '/calculators',
      title: 'Calculators',
      icon: <CalculatorIcon />,
      keyID: 'Calculators',
      disabled: false,
    },
    {
      path: '/subscription',
      title: 'Subscription',
      icon: <SubscriptionIcon />,
      keyID: 'Subscription',
      disabled: buttonStatus < 2,
    },

  ];

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? 'text-white-dark' : ''
        }`}
      >
        <div className="h-full bg-[#006092] dark:bg-gray">
          {/* Logo & toggle button */}
          <div className="flex items-center justify-between px-4 py-3 ">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img
                className="w-40 flex-none"
                src="/assets/images/vetez-sidelogo.png"
                alt={t('VetEZ')}
              />
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <SideToggleCloseIcon />
            </button>
          </div>

          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              {menuList.map((item, id) => {
                return item.submenu ? (
                  <MenuItem
                    key={id}
                    toggleMenu={toggleMenu}
                    currentMenu={currentMenu}
                    keyID={item?.keyID}
                    title={item?.title}
                    icon={item?.icon}
                    submenu={item?.submenu}
                    deepMenuTitle={item?.deepMenuTitle}
                    deepSubMenu={item?.deepSubMenu}
                    disabled={item?.disabled}
                  />
                ) : (
                  <MenuItem
                    key={id}
                    path={item?.path}
                    title={item?.title}
                    icon={item?.icon}
                    disabled={item?.disabled}
                    active={router.pathname === item?.path}
                  />
                );
              })}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
