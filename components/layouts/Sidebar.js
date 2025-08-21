import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/slices/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MenuItem from './MenuItem';
import { FaFile, FaFileAlt, FaFileExport } from 'react-icons/fa';
import { FaFileInvoice, FaFileCircleExclamation } from 'react-icons/fa6';

import {
  AvailabilityIcon,
  CaseManagementIcon,
  CategoryIcon,
  ChatIcon,
  Cities,
  ComplaintIcon,
  Counties,
  Countries,
  DashboardIcon,
  FormBuilderIcon,
  FunctionIcon,
  Invoice,
  Order,
  ProviderManagementIcon,
  ReportIcon,
  RoleIcon,
  ServiceIcon,
  ServiceMenuIcon,
  SettingIcon,
  SideToggleCloseIcon,
  State,
  SystemIcon,
  SystemLogIcon,
  TaxIcon,
  Transaction,
  UserManagementIcon,
  UserNameIcon,
} from '../icons/SvgIcons';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { id: RoleID } = user?.role || {};
  const [currentMenu, setCurrentMenu] = useState('');
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state) => state.themeConfig);
  const semidark = useSelector((state) => state.themeConfig.semidark);
  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => {
      return value;
    });
  };

  useEffect(() => {
    let pathValue = window.location.pathname.split('/');
    toggleMenu(pathValue[2]);
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );

    if (selector) {
      selector.classList.add('active');
      const ul = selector.closest('ul.sub-menu');
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length > 0) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [router.pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );

    selector?.classList.add('active');
  };

  const menuList = [
    {
      path: '/',
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      path: '/users',
      title: 'Users',
      icon: <UserManagementIcon />,
      keyID: 'Users',
    },
    {
      path: '/notice-of-appeals',
      title: 'Court Appeals',
      icon: <SystemLogIcon />,
      keyID: 'noa',
    },

    // {
    //   path: '/fillforms',
    //   title: 'Fill Forms',
    //   icon: <FaFileAlt color="white" />,
    //   keyID: 'Fill Forms',
    // },
    // {
    //   path: '/submitclaims',
    //   title: 'Submit Claims',
    //   icon: <FaFileCircleExclamation color="white" />,
    //   keyID: 'Submit Claims',
    // },
    // {
    //   path: '/fileappeals',
    //   title: 'File Appeals',
    //   icon: <FaFile color="white" />,
    //   keyID: 'File Appeals',
    // },
    // {
    //   path: '/miscforms',
    //   title: 'Misc Forms',
    //   icon: <FaFileInvoice color="white" />,
    //   keyID: 'Misc Forms',
    // },
    // {
    //   path: '/requestfiles',
    //   title: 'Request Files',
    //   icon: <FaFileExport color="white" />,
    //   keyID: 'Request Files',
    // },
    // {
    //   path: '/admin-users',
    //   title: 'Admin User',
    //   icon: <RoleIcon />,
    //   keyID: 'Admin User',
    // },

    // {
    //   path: '#',
    //   title: 'System Logs',
    //   icon: <SystemLogIcon />,
    //   keyID: 'System Logs',
    // },
    // {
    //   path: '/',
    //   title: 'Reports',
    //   icon: <ReportIcon />,
    //   keyID: 'Reports',
    //   submenu: [
    //     { path: '#', title: 'Notifications' },
    //     { path: '#', title: 'Report-1' },
    //     { path: '#', title: 'Report-2' },
    //   ],
    // },
  ];

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? 'text-white-dark' : ''
        }`}
      >
        <div className="h-full bg-[#006092] dark:bg-gray-400">
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
                  />
                ) : (
                  <MenuItem
                    key={id}
                    path={item?.path}
                    title={item?.title}
                    icon={item?.icon}
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
