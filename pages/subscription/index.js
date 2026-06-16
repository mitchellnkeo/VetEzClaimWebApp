import FrontLayout from '@/components/layouts/FrontLayout';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import { NONPROFIT_TAGLINE } from '@/constants/branding';
import ZeffyDonateButton from '@/components/Common/ZeffyDonateButton';
import {
  DONATE_SUPPORT,
  ZEFFY_DONATION_FORM_URL,
  getDonateDisclaimer,
  openDonationUrl,
} from '@/constants/donate';

export default function DonatePage() {
  const router = useRouter();
  const donateDisclaimer = getDonateDisclaimer();

  const handleDonateFallback = () => {
    if (openDonationUrl(ZEFFY_DONATION_FORM_URL)) {
      return;
    }
    toast.info('Online donation options are coming soon.');
  };

  const handleTermsAndConditions = () => {
    router.push('/terms-conditions');
  };

  const handleExploreForms = () => {
    router.push('/forms');
  };

  return (
    <FrontLayout title="Donate">
      <Breadcrumb preUrl="/" preTitle="Home" currentTitle="Donate" />

      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {NONPROFIT_TAGLINE}
              </p>
              <h1 className="text-2xl dark:text-white-light">Donate</h1>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {DONATE_SUPPORT}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white-light">
        <div className="rounded-lg bg-primary p-6 text-white">
          <h3 className="mb-2 text-lg font-semibold">
            All features are included at no cost
          </h3>
          <p className="mb-4 text-sm opacity-90">
            After you sign in and complete your profile, you can use every VA
            form and tool in VetEZ Claim without paying.
          </p>
          <h3 className="mb-4 text-lg font-semibold">Includes ability to:</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Complete, sign, and submit VA forms for new claims, increases,
                Supplemental Claims, Higher Level Reviews, and Appeals to the
                Board.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Complete, sign, and submit optional VA forms to include Sworn
                Statement in Support of Claim, PTSD Stressor Statements, and
                medical records release.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Request C-file/DD 214, and other documents directly from VA.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>Request buddy statements from others via email.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                File appeals and filing fee waivers directly with the Court of
                Appeals for Veterans Claims.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-lg bg-yellow-400 p-4 text-center text-black">
          <p className="font-bold">Support our mission</p>
          <p className="mt-2 text-sm">
            Give once or set up monthly giving on our secure Zeffy page.
          </p>
        </div>

        <ZeffyDonateButton
          className="mt-4 w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primaryHover"
          onFallback={handleDonateFallback}
        >
          Donate Now
        </ZeffyDonateButton>

        <button
          type="button"
          className="mt-3 w-full rounded-lg border border-primary bg-white py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-50 dark:bg-gray"
          onClick={handleDonateFallback}
        >
          Open donation page in a new tab
        </button>

        <div className="mt-6 rounded-lg border border-gray-200 p-4 text-center dark:border-gray-600">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Prefer to give on your phone?
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Scan this code to open our Zeffy donation page.
          </p>
          <img
            src="/assets/zeffy-donate-qr.png"
            alt="QR code linking to the VetEZ Claim Zeffy donation page"
            className="mx-auto mt-3 h-40 w-40"
            width={160}
            height={160}
          />
        </div>

        <p className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">
          {donateDisclaimer}
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-lg border border-gray-400 bg-white py-2 font-semibold transition-colors hover:border-primary hover:font-bold dark:bg-gray"
          onClick={handleExploreForms}
        >
          Explore VA Forms
        </button>

        <button
          type="button"
          className="hover:font-primary mt-4 w-full rounded-lg border border-gray-400 bg-white py-2 font-semibold transition-colors hover:border-primary hover:font-bold dark:bg-gray"
          onClick={handleTermsAndConditions}
        >
          Terms and Conditions
        </button>
      </div>
    </FrontLayout>
  );
}
