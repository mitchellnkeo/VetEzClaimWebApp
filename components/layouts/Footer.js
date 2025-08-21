import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p className="pt-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
        © {new Date().getFullYear()}. {t('copyright')}
      </p>
    </div>
  );
};

export default Footer;
