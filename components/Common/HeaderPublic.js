import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTheme,
} from '@/store/slices/themeConfigSlice';
import Image from 'next/image';
import { DarkThemeIcon, ToggleThemeIcon } from '../icons/SvgIcons';


export default function HeaderPublic() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeConfig.theme);

  useEffect(() => {
    dispatch(toggleTheme(theme));
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-primary dark:bg-gray-800 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-24 h-8 flex items-center justify-center">
          <Image
            src="/assets/images/vetez-sidelogo.png"
            alt="VetEZ Logo"
            width={100}
            height={100}
            className="rounded"
          />
        </div>
      </div>

      <button
        className="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
        onClick={() => {
          const nextTheme = theme === 'dark' ? 'light' : 'dark';
          dispatch(toggleTheme(nextTheme));
        }}
      >
        {theme === 'dark' ? <DarkThemeIcon /> : <ToggleThemeIcon />}
      </button>
    </header>
  );
}
