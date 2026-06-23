import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import {
  COMPANY_ADDRESS_CITY_STATE_ZIP,
  COMPANY_ADDRESS_STREET,
  NONPROFIT_TAGLINE,
  SUPPORT_EMAIL,
} from '@/constants/branding';

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
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {NONPROFIT_TAGLINE}
        </p>
        <p className="mt-5 mb-6">
          <span className="font-bold">VetClaims Alliance (VetEZ Claim)</span><br />
          <span className="font-bold">{COMPANY_ADDRESS_STREET}</span><br />
          <span className="font-bold">{COMPANY_ADDRESS_CITY_STATE_ZIP}</span><br />
          <span className="font-bold">United States</span><br />
          <span className="font-bold">{SUPPORT_EMAIL}</span>
        </p>
      </div>
    </FrontLayout>
  );
}
