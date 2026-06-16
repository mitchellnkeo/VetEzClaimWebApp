import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AnimateHeight from 'react-animate-height';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const MenuItem = ({
  path,
  title,
  icon,
  toggleMenu,
  currentMenu,
  keyID,
  submenu = false,
  deepSubMenu,
  deepMenuTitle,
  disabled = false,
  active = false,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const supportWaitingCount = 0;

  const promptCompleteProfile = () => {
    toast.info('Complete your profile in Settings to unlock this section.', {
      toastId: 'profile-required',
    });
    router.push('/profile/settings');
  };

  const handleSubmenuToggle = (e) => {
    if (disabled) {
      e.preventDefault();
      promptCompleteProfile();
      return;
    }
    toggleMenu(keyID);
  };

  const handleNavClick = (e) => {
    if (disabled) {
      e.preventDefault();
      promptCompleteProfile();
      return;
    }
    if (!submenu) return;
    toggleMenu(keyID);
  };

  const handleSubmenuClick = (e, itemPath) => {
    if (disabled) {
      e.preventDefault();
      promptCompleteProfile();
      return;
    }
    if (!itemPath) {
      e.preventDefault();
    }
  };

  return (
    <li
      className={`menu nav-item ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${active ? 'rounded-md bg-[#005985] text-white dark:bg-gray-600' : ''}`}
      title={
        disabled
          ? 'Complete your profile in Settings to unlock this section'
          : undefined
      }
    >
      {!submenu ? (
        <Link href={path || '/'} onClick={handleNavClick} className="group">
          <div className="flex items-center">
            {icon}
            <span className="text-white dark:text-[#ccc] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
              {t(title)}
            </span>
          </div>
        </Link>
      ) : (
        <>
          <button
            type="button"
            className={`${
              currentMenu === keyID ? 'active' : ''
            } nav-link group w-full ${
              disabled ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleSubmenuToggle}
            disabled={disabled}
          >
            <div className="flex items-center">
              {icon}
              <span className="text-white dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                {t(title)}
                {title === 'Support Request' && supportWaitingCount > 0 && (
                  <span className="badge my-0 bg-red-500 text-white ltr:ml-4 rtl:mr-4">
                    {supportWaitingCount}
                  </span>
                )}
              </span>
            </div>

            <div
              className={
                currentMenu === keyID
                  ? 'rotate-90 text-white'
                  : 'text-white rtl:rotate-180'
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5L15 12L9 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <AnimateHeight
            duration={300}
            height={currentMenu === keyID ? 'auto' : 0}
          >
            <ul className="sub-menu text-white">
              {submenu &&
                submenu.map((item, id) => (
                  <li key={id}>
                    <Link
                      href={item?.path || '/'}
                      onClick={(e) => handleSubmenuClick(e, item?.path)}
                    >
                      {t(item?.title)}
                    </Link>
                  </li>
                ))}

              {deepSubMenu && (
                <li className="menu nav-item">
                  <button
                    type="button"
                    className={`${
                      errorSubMenu ? 'open' : ''
                    } w-full before:h-[5px] before:w-[5px] before:rounded before:bg-gray-300 hover:text-gray-100 dark:text-[#888ea8] dark:hover:text-gray-900 ltr:before:mr-2 rtl:before:ml-2 ${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={() => !disabled && setErrorSubMenu(!errorSubMenu)}
                    disabled={disabled}
                  >
                    {t(deepMenuTitle || '')}
                    <div
                      className={`${
                        errorSubMenu ? '!rotate-90' : ''
                      } ltr:ml-auto rtl:mr-auto rtl:rotate-180`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M6.25 19C6.25 19.3139 6.44543 19.5946 6.73979 19.7035C7.03415 19.8123 7.36519 19.7264 7.56944 19.4881L13.5694 12.4881C13.8102 12.2073 13.8102 11.7928 13.5694 11.5119L7.56944 4.51194C7.36519 4.27364 7.03415 4.18773 6.73979 4.29662C6.44543 4.40551 6.25 4.68618 6.25 5.00004L6.25 19Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.5119 19.5695C10.1974 19.2999 10.161 18.8264 10.4306 18.5119L16.0122 12L10.4306 5.48811C10.161 5.17361 10.1974 4.70014 10.5119 4.43057C10.8264 4.161 11.2999 4.19743 11.5695 4.51192L17.5695 11.5119C17.8102 11.7928 17.8102 12.2072 17.5695 12.4881L11.5695 19.4881C11.2999 19.8026 10.8264 19.839 10.5119 19.5695Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </button>

                  <AnimateHeight
                    duration={300}
                    height={errorSubMenu ? 'auto' : 0}
                  >
                    <ul className="sub-menu text-gray-500">
                      {deepSubMenu &&
                        deepSubMenu.map((item, id) => (
                          <li key={id}>
                            <Link
                              href={item?.path || '/'}
                              onClick={(e) => handleSubmenuClick(e, item?.path)}
                            >
                              {t(item?.title)}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </AnimateHeight>
                </li>
              )}
            </ul>
          </AnimateHeight>
        </>
      )}
    </li>
  );
};

export default MenuItem;
