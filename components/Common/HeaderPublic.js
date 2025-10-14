import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  toggleLocale,
  toggleSidebar,
  toggleTheme,
} from '@/store/slices/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { DarkThemeIcon, ToggleThemeIcon } from '../icons/SvgIcons';


export default function HeaderPublic() {
const dispatch = useDispatch();

const themeConfig = useSelector((state) => state.themeConfig);

return (
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-primary dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-2">
            <div className="w-24 h-8 flex items-center justify-center">
                
                <Image
                src="/assets/images/vetez-sidelogo.png"
                alt="VetEZ Logo"
                width={100}      // match the div size  
                height={100}     // match the div size
                className="rounded" // optional, if you want rounded corners
                />
            </div>
          
        </div>
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
              ) : ( <button
                  className={`${
                    themeConfig.theme === 'dark' &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('light'))}
                >
                  <DarkThemeIcon />
                </button>
              )}
        </div>
      </header>
)
}