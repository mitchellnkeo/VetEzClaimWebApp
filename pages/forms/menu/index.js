import { useSelector } from 'react-redux';
import { menuData } from '@/utils/staticData';
import FrontLayout from '@/components/layouts/FrontLayout';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function MenuPage() {
  const selectedForm = useSelector((state) => state.form.selectedForm);
  const menuItem = menuData.find((item) => item.id === selectedForm.id);
  const router = useRouter();

  const handlePress = (item) => {
    if (item.disabled) {
      toast.error(`${item.title} is disabled`);
      return;
    }
    router.push(item.path);
  };

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
        {menuItem ? (
          <>
            {menuItem.submenu.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handlePress(item)}
                disabled={item.disabled}
                className={`w-full rounded-lg p-4 font-semibold text-white transition ${
                  item.disabled
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'cursor-pointer bg-[#035F92] hover:bg-[#024b70]'
                }`}
              >
                {item.title}
              </button>
            ))}
          </>
        ) : (
          <p>No form selected. Please go back.</p>
        )}
      </div>
    </FrontLayout>
  );
}
