import { FaSave, FaFilePdf, FaArrowRight, FaInfoCircle, FaTimes } from 'react-icons/fa';

export default function FormContent({
  title,
  children,
  onViewDetails,
  onSave,
  onReview,
  onSubmit,
  isBuddyForm = false,

}) {
  return (
    <div className="relative flex h-screen flex-col">
      <div className="rounded-md bg-white dark:bg-gray-600">
        <div className="justify-content-between  flex flex-col gap-5  pl-5 pt-5 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl dark:text-white-light ">{title}</h1>
          </div>
        </div>
        <div className="sticky top-0 z-10 flex justify-center gap-3 rounded-md  p-6 shadow-md">
          <button
            onClick={onViewDetails}
            className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm 
              ${isBuddyForm ? 'text-red-600 hover:bg-red-100' : 'text-gray-700 hover:bg-gray-100 dark:bg-white-light dark:text-black dark:hover:bg-gray dark:hover:text-white-light '}`}
          >
            {isBuddyForm ? (
              <>
                <FaTimes /> Cancel Form
              </>
            ) : (
              <>
                <FaInfoCircle /> View Form Details
              </>
            )}
          </button>


          <button
            onClick={onSave}
            className="flex items-center gap-2 rounded-md border bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:bg-white-light dark:text-black dark:hover:bg-gray dark:hover:text-white-light"
          >
            <FaSave /> Save
          </button>

          <button
            onClick={onReview}
            className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-white-light dark:text-black dark:hover:bg-gray dark:hover:text-white-light"
          >
            <FaFilePdf /> Review PDF
          </button>

          <button
            onClick={onSubmit} 
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white cursor-pointer bg-[#035F92] hover:bg-[#024b70]" 
          >
            <FaArrowRight /> {isBuddyForm ? 'Review & Submit' : 'Submit to VA'}
          </button>

        </div>
      </div>

      {/* Scrollable Children */}
      <div
        style={{ width: '80%', margin: '10px auto' }}
        className="flex-1 space-y-6 overflow-y-auto p-6"
      >
        {children}
      </div>
    </div>
  );
}
