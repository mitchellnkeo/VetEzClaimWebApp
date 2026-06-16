const DONATE_SUPPORT =
  'Your support allows us to add new features and assist more veterans.';

const DONATE_DISCLAIMER_BASE =
  'Donations are voluntary and support our nonprofit mission to assist veterans. All app features are free after you create an account and complete your profile.';

const DONATE_DISCLAIMER_PENDING =
  `${DONATE_DISCLAIMER_BASE} Online giving via Zeffy is coming soon.`;

const DONATE_DISCLAIMER_CONFIGURED =
  `${DONATE_DISCLAIMER_BASE} You will complete your gift on Zeffy's secure donation page (one-time or monthly).`;

export const ZEFFY_DONATION_FORM_URL =
  process.env.NEXT_PUBLIC_ZEFFY_DONATION_FORM_URL?.trim() || '';

export const ZEFFY_EMBED_FORM_URL =
  process.env.NEXT_PUBLIC_ZEFFY_EMBED_FORM_URL?.trim() || '';

export const ZEFFY_EMBED_SCRIPT_URL =
  'https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js';

/** Hosted page — user chooses one-time or recurring on Zeffy */
export const ZEFFY_DONATE_ONCE_URL =
  process.env.NEXT_PUBLIC_ZEFFY_DONATE_ONCE_URL?.trim() ||
  ZEFFY_DONATION_FORM_URL;

export const ZEFFY_DONATE_MONTHLY_URL =
  process.env.NEXT_PUBLIC_ZEFFY_DONATE_MONTHLY_URL?.trim() ||
  ZEFFY_DONATION_FORM_URL;

export function isZeffyConfigured() {
  return Boolean(
    ZEFFY_DONATION_FORM_URL ||
      ZEFFY_EMBED_FORM_URL ||
      ZEFFY_DONATE_ONCE_URL ||
      ZEFFY_DONATE_MONTHLY_URL
  );
}

export function getDonateDisclaimer() {
  return isZeffyConfigured()
    ? DONATE_DISCLAIMER_CONFIGURED
    : DONATE_DISCLAIMER_PENDING;
}

export function openDonationUrl(url) {
  if (!url) {
    return false;
  }

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return true;
}

export { DONATE_SUPPORT };
