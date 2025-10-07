import Link from 'next/link';

const Breadcrumb = ({ preUrl, preTitle, currentTitle }) => {
  return (
    <ul className="flex space-x-2 rtl:space-x-reverse mb-5">
      {preUrl && preTitle && (
        <li>
          <Link href={preUrl} className="text-primary hover:underline dark:text-blue-400">
            {preTitle}
          </Link>
        </li>
      )}
      {currentTitle && (
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 dark:text-white">
          <span>{currentTitle}</span>
        </li>
      )}
    </ul>
  );
};

export default Breadcrumb;
