import SupplementalClaimForm from '@/components/VaFormComponent/supplimental-claim';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SupplementalClaimAppealForm() {
  const router = useRouter();
  const { ['in-progress']: inProgress } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
  }, [ router.isReady, router.query]);


  return <SupplementalClaimForm docName="supplementalclaimAppeal" inProgress={inProgress} formTitle="Supplemental Claim Appeal" />;
} 