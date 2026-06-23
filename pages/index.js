import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';
import { NONPROFIT_TAGLINE, PRODUCT_NAME } from '@/constants/branding';

export default function Welcome() {
  return (
    <AuthLayout title={`${PRODUCT_NAME} — Sign Up or Log In`}>
      <div className="text-center">
        <Link href="/">
          <img
            src="/assets/images/logo.png"
            alt={PRODUCT_NAME}
            className="m-auto w-[100px] object-cover"
          />
        </Link>

        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
          The FREE app built to serve you
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
          Significantly cut the time it takes to complete and file for your
          well-deserved Veteran Benefits.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/75 sm:text-sm">
          {NONPROFIT_TAGLINE}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/registration"
            className="btn btn-primary w-full py-3 text-base font-semibold"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="btn w-full border-2 border-white/90 bg-transparent py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Log In
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/70">
          All features are free after you create an account and complete your
          profile.
        </p>
      </div>
    </AuthLayout>
  );
}
