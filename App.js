import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleRTL,
  toggleTheme,
  toggleLocale,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from './store/slices/themeConfigSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestNotificationPermission, onMessageListener } from './firebase/firebaseNotifications';
import { toast } from 'react-toastify';

function App({ children }) {
  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem('layout') || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem('animation') || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar)
    );
    dispatch(
      toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark)
    );
    // locale
    const locale = localStorage.getItem('i18nextLng') || themeConfig.locale;
    dispatch(toggleLocale(locale));
    i18n.changeLanguage(locale);
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);


  useEffect(() => {
    requestNotificationPermission()
      .catch(console.error);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${
          themeConfig.menu
        } ${themeConfig.layout} ${
          themeConfig.rtlClass
        } main-section relative font-nunito text-sm font-normal antialiased`}
      >
        {children}
      </div>
    </>
  );
}

export default App;
