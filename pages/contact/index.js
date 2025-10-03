import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';


export default function Contact() {


  return (
    <FrontLayout title="Contact">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Contact"
      />
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl dark:text-white-light">Contact</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 mt-10 rounded-lg shadow-lg p-10 dark:bg-gray-900 dark:text-white-light">
        <p className="mt-5 mb-6">
        <span className="font-bold">Vet EZ Claim LLC</span><br />
        <span className="font-bold">20 N Orange Ave Suite 1100</span><br />
        <span className="font-bold">Orlando, FL 32801</span><br />
        <span className="font-bold">United States</span><br />
        <span className="font-bold">Phone: (+1)2532795754</span><br />
        <span className="font-bold">suppourt@vetezclaim.com</span>
      </p>
      </div>


    </FrontLayout>
  );
}