import { NONPROFIT_TAGLINE } from '@/constants/branding';

export default function NonprofitTagline({ className = '' }) {
  return (
    <p className={`text-center text-xs leading-snug text-white/90 ${className}`}>
      {NONPROFIT_TAGLINE}
    </p>
  );
}
