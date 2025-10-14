import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DarkThemeIcon, ToggleThemeIcon } from '../icons/SvgIcons';


export default function HeaderPublic() {
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
}, [darkMode]); 

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
              {darkMode ? (
                <button
                  className={`${
                    darkMode  &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => setDarkMode(false)}
                >
                  <ToggleThemeIcon />
                </button>
              ) : ( <button
                  className={`${
                    !darkMode  &&
                    'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => setDarkMode(true)}
                >
                  <DarkThemeIcon />
                </button>
              )}
        </div>
      </header>
    )
}