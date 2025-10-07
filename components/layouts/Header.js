import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  toggleLocale,
  toggleSidebar,
  toggleTheme,
} from '@/store/slices/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import { showAlert } from '@/utils';
import { BaseImageURl } from '@/constants/constants';
import {
  DarkThemeIcon,
  LogoutIcon,
  SettingsIcon,
  SideToggleIcon,
  SystemThemeIcon,
  ToggleThemeIcon,
} from '../icons/SvgIcons';

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const routes = {
    profile: '/profile',
    settings: '/profile/settings',
  };

  const handleLogout = () => {
    showAlert('Sign Out', 'success');
    setTimeout(() => {
      router.push('/logout');
    }, 500);
  };

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      const all = document.querySelectorAll(
        'ul.horizontal-menu .nav-link.active'
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul = selector.closest('ul.sub-menu');
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [router.pathname]);
  const isRtl =
    useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  const themeConfig = useSelector((state) => state.themeConfig);
  const [flag, setFlag] = useState('');
  useEffect(() => {
    setFlag(localStorage.getItem('i18nextLng') || themeConfig.locale);
  });

  return (
    <header
      className={
        themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''
      }
    >
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-[#006092] px-5 py-2.5 dark:bg-gray">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img
                className="inline w-12 ltr:-ml-1 rtl:-mr-1"
                src="/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <SideToggleIcon />
            </button>
          </div>
          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>

            <div>
              {themeConfig.theme === 'light' ? (
                <button
                  className={`${
                    themeConfig.theme === 'light' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('dark'))}
                >
                  <ToggleThemeIcon />
                </button>
              ) : (
                ''
              )}
              {themeConfig.theme === 'dark' && (
                <button
                  className={`${
                    themeConfig.theme === 'dark' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('light'))}
                >
                  <DarkThemeIcon />
                </button>
              )}
              {themeConfig.theme === 'system' && (
                <button
                  className={`${
                    themeConfig.theme === 'system' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('light'))}
                >
                  <SystemThemeIcon />
                </button>
              )}
            </div>

            {/* <MessagesNotification isRtl={isRtl} /> */}

            {/* User Logout */}
            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={
                  user && user?.profilePicture ? (
                    <img
                      className="h-10 w-10 rounded-full border-green-400 object-cover saturate-50 group-hover:saturate-100"
                      src={BaseImageURl + user?.profilePicture}
                      alt="userProfile"
                    ></img>
                  ) : (
                    <span className="text-cente flex h-9 w-9 items-center justify-center rounded-full bg-success object-cover font-bold text-white">
                      {user?.firstName === null
                        ? user?.email.slice(0, 1).toUpperCase()
                        : user?.firstName &&
                          user?.firstName.slice(0, 1).toUpperCase()}
                    </span>
                  )
                }
              >
                <ul className="w-[250px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <Link
                      href={routes.profile}
                      className="flex items-center !pl-2"
                    >
                      {user && user.profilePicture ? (
                        <img
                          className="h-12 w-12 rounded-full border-green-400 object-cover saturate-50 group-hover:saturate-100"
                          src={BaseImageURl + user?.profilePicture}
                          alt="userProfile"
                        ></img>
                      ) : (
                        <span className="text-cente flex h-9 w-9 items-center justify-center rounded-full bg-success object-cover font-bold text-white">
                          {user?.firstName === null
                            ? user?.email.slice(0, 1).toUpperCase()
                            : user?.firstName &&
                              user?.firstName.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                      <div className="truncate ltr:pl-2 rtl:pr-2">
                        <h4 className="text-base">
                          {user?.firstName + ' ' + user?.lastName}
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {user && user?.email}
                        </button>
                      </div>
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <button
                      onClick={() => router.push('/profile/settings')}
                      className="!py-3 text-danger"
                    >
                      <SettingsIcon />
                      Settings
                    </button>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <button
                      onClick={handleLogout}
                      className="!py-3 text-danger"
                    >
                      <LogoutIcon />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
