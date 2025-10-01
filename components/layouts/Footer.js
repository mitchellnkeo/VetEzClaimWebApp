import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Footer = () => {
  const { t } = useTranslation();

  const buttons = [
    { title: "Contact", path: '/contact', disabled: false },
    { title: 'Conditions of Use', path: '/terms-conditions', disabled: false },
    { title: 'Privacy Policy', path: '/privacy-policy', disabled: false },
    { title: 'Accessibility', path: '/accessibility', disabled: false },
  ];

  return (
    <div className="py-6 text-center sm:text-left mt-10">
      <div className="flex flex-col sm:flex-row sm:justify-start sm:space-x-6 space-y-2 sm:space-y-0 mb-1">
        {buttons.map((btn, index) => (
          <Link key={index} href={btn.path} passHref>
            <button
              className={`${btn.disabled ? 'cursor-not-allowed opacity-50' : ''} ${btn.disabled ? 'text-gray-500 dark:text-gray-500' : 'text-primary dark:text-primaryHover'}  font-medium hover:underline hover:font-semibold transition-all duration-200 dark:text-white-light  dark:hover:text-white-light`}
              disabled={btn.disabled}
            >
              {t(btn.title)}
            </button>
          </Link>
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300">
      © {new Date().getFullYear()}. {t('copyright')}
      </p>
    </div>
  );
};

export default Footer;
