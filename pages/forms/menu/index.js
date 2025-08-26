import { useSelector } from 'react-redux';
import { menuData } from '@/utils/staticData';
import Link from 'next/link';
import FrontLayout from '@/components/layouts/FrontLayout';

export default function MenuPage() {
  const selectedForm = useSelector((state) => state.form.selectedForm);
  const menuItem = menuData.find((item) => item.id === selectedForm.id);

  // console.log(' >> selectedForm :', selectedForm);
  // console.log(' >> menuItem :', menuData);

  return (
    <FrontLayout title="Form Menu">
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl">{menuItem ? menuItem.title : ''}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-4">
          {menuItem ? (
            <>
              <ul className="space-y-2">
                {menuItem.submenu.map((sub) => (
                  <li key={sub.id}>
                    {sub.status ? (
                      <Link
                        href={sub.path}
                        className="block rounded bg-[#035F92] p-2 text-white hover:bg-[#024a6f]"
                      >
                        {sub.title}
                      </Link>
                    ) : (
                      <span className="block cursor-not-allowed rounded bg-gray-400 p-2 text-gray-700">
                        {sub.title} (Locked)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No form selected. Please go back.</p>
          )}
        </div>
      </div>
    </FrontLayout>
  );
}
