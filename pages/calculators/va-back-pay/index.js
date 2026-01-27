import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import { IsValidDateRange } from '@/utils/utils';
import { calculateBackPayWithFactors } from '@/helpers/calcultorHelpers';
import Loader from '../../../components/Common/Loader';
import { toast } from 'react-toastify';

const monthData = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const currentYear = new Date().getFullYear();
const yearData = Array.from({ length: 49 }, (_, i) =>
  (currentYear - i).toString()
);
const ratingPercentageData = [
  '0%',
  '10%',
  '20%',
  '30%',
  '40%',
  '50%',
  '60%',
  '70%',
  '80%',
  '90%',
  '100%',
];
const dependentParentsData = ['0', '1', '2'];
const compensationTypeData = ['Select', 'Disability Rating', 'SMC'];
const smckAwardsData = [0, 1, 2, 3];

export const smcLevelData = [
  { smcId: '', smcTitle: 'none' },
  { smcId: '10%', smcTitle: '10%' },
  { smcId: '20%', smcTitle: '20%' },
  { smcId: '30%', smcTitle: '30%' },
  { smcId: '40%', smcTitle: '40%' },
  { smcId: '50%', smcTitle: '50%' },
  { smcId: '60%', smcTitle: '60%' },
  { smcId: '70%', smcTitle: '70%' },
  { smcId: '80%', smcTitle: '80%' },
  { smcId: '90%', smcTitle: '90%' },
  { smcId: '100%', smcTitle: '100%' },
  { smcId: 'smc_l', smcTitle: 'SMC-L' },
  { smcId: 'smc_l_half', smcTitle: 'SMC-L 1/2' },
  { smcId: 'smc_m', smcTitle: 'SMC-M' },
  { smcId: 'smc_m_half', smcTitle: 'SMC-M 1/2' },
  { smcId: 'smc_n', smcTitle: 'SMC-N' },
  { smcId: 'smc_n_half', smcTitle: 'SMC-N 1/2' },
  { smcId: 'smc_op', smcTitle: 'SMC-O/P' },
  { smcId: 'smc_r1', smcTitle: 'SMC-R1' },
  { smcId: 'smc_r2_t', smcTitle: 'SMC-R2(T)' },
  { smcId: 'smc_s', smcTitle: 'SMC-S' },
];

const VaBackPayCalculator = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);

  const currentDate = new Date();
  const currentMonth = monthData[currentDate.getMonth()];
  const curYear = currentDate.getFullYear().toString();

  const [initialMonth, setInitialMonth] = useState('January');
  const [initialYear, setInitialYear] = useState(curYear);
  const [finalMonth, setFinalMonth] = useState(currentMonth);
  const [finalYear, setFinalYear] = useState(curYear);
  const [ratingPercentage, setRatingPercentage] = useState('10%');
  const [receivingPercentage, setReceivingPercentage] = useState('0%');

  const [smcLevel, setSmcLevel] = useState('10%');
  const [smcLevelReceiving, setSmcLevelReceiving] = useState('');

  const [isMarried, setIsMarried] = useState(false);
  const [spouseNeedAid, setSpouseNeedAid] = useState(false);
  const [hasDependentChildren, setHasDependentChildren] = useState(false);
  const [childrenUnder18, setChildrenUnder18] = useState('0');
  const [childrenOver18, setChildrenOver18] = useState('0');
  const [hasDependentParents, setHasDependentParents] = useState(false);
  const [dependentParents, setDependentParents] = useState('0');
  const [compensationType, setCompensationType] = useState('Select');
  const [smckAwards, setSmckAwards] = useState(0);

  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const onCalculate = async () => {
    // if (compensationType === 'Select') {
    //   toast.error('Please select a compensation type.');
    //   return;
    // }

    setLoading(true);
    const nCUnder18Int = parseInt(childrenUnder18) || 0;
    const nCOver18Int = parseInt(childrenOver18) || 0;
    const nDPInt = parseInt(dependentParents) || 0;
    const nSmckAwardsInt = parseInt(smckAwards) || 0;

    const commonFactors = {
      isMarried,
      spouseNeedsAid: spouseNeedAid,
      hasChildren: hasDependentChildren,
      childrenUnder18: nCUnder18Int,
      childrenOver18: nCOver18Int,
      hasDependentParents,
      dependentParentsCount: nDPInt,
      smckAwards: nSmckAwardsInt,
    };

    const factors1 = {
      // ...(compensationType === 'Disability Rating' && {
      //   ratingPercentage: ratingPercentage,
      // }),
      // ...(compensationType === 'SMC' && { ratingPercentage: smcLevel }),
      ratingPercentage: smcLevel ,
      ...commonFactors,
    };
    const factors2 = {
        // ...(compensationType === 'Disability Rating' && {
        //   ratingPercentage: receivingPercentage,
        // }),
        // ...(compensationType === 'SMC' && {
        //   ratingPercentage: smcLevelReceiving,
        // }),
        ratingPercentage: smcLevelReceiving,
      ...commonFactors,
    };

    process.env.NODE_ENV === 'development' &&
      console.log('Here we go >>> ', factors1, factors2);

    try {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const payableAmount = await calculateBackPayWithFactors(
        factors1,
        initialMonth,
        initialYear,
        finalMonth,
        finalYear
      );

      const paidAmount = await calculateBackPayWithFactors(
        factors2,
        initialMonth,
        initialYear,
        finalMonth,
        finalYear
      );

      const res = parseFloat((payableAmount - paidAmount).toFixed(2));
      setResult(res);
    } catch (error) {
      process.env.NODE_ENV === 'development' &&
        console.log('Error calculating back pay. Please try again.', error);
      toast.error('Error calculating back pay. Please try again.');
      setResult(0);
    } finally {
      setLoading(false);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onReset = () => {
    setInitialMonth('January');
    setInitialYear(curYear);
    setFinalMonth(currentMonth);
    setFinalYear(curYear);
    setRatingPercentage('10%');
    setReceivingPercentage('0%');
    setIsMarried(false);
    setSpouseNeedAid(false);
    setHasDependentChildren(false);
    setChildrenUnder18('0');
    setChildrenOver18('0');
    setHasDependentParents(false);
    setDependentParents('0');
    setSmckAwards(0);
    setSmcLevel('smc_l');
    setSmcLevelReceiving('');
    setResult(0);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // smooth scroll
    });
  };

  return (
    <FrontLayout title="VA Back Pay Calculator">
      <Breadcrumb
        preUrl="/calculators"
        preTitle="Calculators"
        currentTitle="VA Back Pay Calculator"
      />
      <Loader show={loading} />

      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">
                VA Back Pay Calculator
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl p-6">
        <div
          className={`mb-6 rounded-lg p-6 text-center ${
            result < 0
              ? 'bg-red-600 text-white dark:border-red-600 dark:bg-red-600 dark:text-white-light'
              : 'bg-gray-800 text-white dark:border-gray-700 dark:bg-gray-800 dark:text-white-light'
          }`}
        >
          <p className="text-lg">
            {result < 0
              ? 'You Owe VA Approximately'
              : 'You Are Owed Approximately'}
          </p>
          <p className="text-4xl font-bold">${Math.abs(result).toFixed(2)}</p>
        </div>

        <div className="mb-6 rounded-lg border p-4 pt-5 dark:border-gray dark:bg-gray-900">
          <h1 className="mb-6 text-lg font-bold dark:text-white-light">
            {' '}
            Step 1: Pick Duration
          </h1>
          {/* Date Selection */}
          <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
            <h2 className="text-md  font-bold dark:text-white-light">
              When should you have received a larger disability/smc payment than
              you did?
            </h2>
            <div className="mt-2 flex gap-4 ">
              <select
                className="flex-1 rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                value={initialMonth}
                onChange={(e) => {
                  if (
                    IsValidDateRange(
                      e.target.value,
                      initialYear,
                      finalMonth,
                      finalYear
                    )
                  ) {
                    setInitialMonth(e.target.value);
                  } else {
                    toast.error(
                      'The intial date must be come before the stop date.'
                    );
                  }
                }}
              >
                {monthData.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                className="flex-1 rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                value={initialYear}
                onChange={(e) => {
                  if (
                    IsValidDateRange(
                      initialMonth,
                      e.target.value,
                      finalMonth,
                      finalYear
                    )
                  ) {
                    setInitialYear(e.target.value);
                  } else {
                    toast.error(
                      'The intial date must be come before the stop date.'
                    );
                  }
                }}
              >
                {yearData.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
            <h2 className="text-md  font-bold dark:text-white-light">
              (Optional) Specify a stop date, or leave empty to use today's
              date.
            </h2>
            <div className="mt-2 flex gap-4">
              <select
                className="flex-1 rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                value={finalMonth}
                onChange={(e) => {
                  if (
                    IsValidDateRange(
                      initialMonth,
                      initialYear,
                      e.target.value,
                      finalYear
                    )
                  ) {
                    setFinalMonth(e.target.value);
                  } else {
                    toast.error(
                      'The stop date must be come after the intial date.'
                    );
                  }
                }}
              >
                {monthData.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                className="flex-1 rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                value={finalYear}
                onChange={(e) => {
                  if (
                    IsValidDateRange(
                      initialMonth,
                      initialYear,
                      finalMonth,
                      e.target.value
                    )
                  ) {
                    setFinalYear(e.target.value);
                  } else {
                    toast.error(
                      'The stop date must be come after the intial date.'
                    );
                  }
                }}
              >
                {yearData.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded border p-4 pt-5 dark:border-0 dark:bg-gray-900">
          <h1 className="mb-6  text-lg font-bold dark:text-white-light">
            {' '}
            Step 2: Benefit Details
          </h1>

          <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
            <label className=" text-md  mb-2 font-bold dark:text-white-light">
              Total SMC-K Awards Received
            </label>
            <select
              className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
              value={smckAwards}
              onChange={(e) => setSmckAwards(e.target.value)}
            >
              {smckAwardsData.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* <div className="mb-6 w-full">
            <label className=" text-md  mb-2 font-bold dark:text-white-light">
              Select Compensation Type
            </label>
            <select
              className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
              value={compensationType}
              onChange={(e) => {
                setCompensationType(e.target.value);
                if (e.target.value === 'Disability Rating') {
                  setSmcLevel('smc_l');
                  setSmcLevelReceiving('');
                } else if (e.target.value === 'SMC') {
                  setRatingPercentage('10%');
                  setReceivingPercentage('0%');
                } else {
                  setSmcLevel('smc_l');
                  setSmcLevelReceiving('');
                  setRatingPercentage('10%');
                  setReceivingPercentage('0%');
                }
              }}
            >
              {compensationTypeData.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div> */}

          {/* {compensationType === 'Disability Rating' && (
            <>
              <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
                <label className="text-md block  font-bold">
                  {' '}
                  What the benefit rate should you have been receiving on this
                  date?{' '}
                </label>
                <select
                  className="mt-2 w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                  value={ratingPercentage}
                  onChange={(e) => setRatingPercentage(e.target.value)}
                >
                  {ratingPercentageData.slice(1).map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
                <label className="text-md block  font-bold">
                  What was the benefit rate you were actually receiving on this
                  date?
                </label>
                <select
                  className="mt-2 w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                  value={receivingPercentage}
                  onChange={(e) => setReceivingPercentage(e.target.value)}
                >
                  {ratingPercentageData.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </>
          )} */}

          {/* {compensationType === 'SMC' && ( */}
            <>
              <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
                <label className="text-md block  font-bold">
                  {' '}
                  What benefit rate <span className="font-extrabold text-lg">should</span> you have been receiving on this
                  date?{' '}
                </label>
                <select
                  className="mt-2 w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                  value={smcLevel}
                  onChange={(e) => setSmcLevel(e.target.value)}
                >
                  {smcLevelData.slice(1).map((p) => (
                    <option key={p.smcId} value={p.smcId}>
                      {p.smcTitle}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700 dark:text-white-light">
                <label className="text-md block  font-bold">
                  What was the benefit rate you were <span className="font-extrabold text-lg">actually</span> receiving on this
                  date?
                </label>
                <select
                  className="mt-2 w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                  value={smcLevelReceiving}
                  onChange={(e) => setSmcLevelReceiving(e.target.value)}
                >
                  {smcLevelData.map((p) => (
                    <option key={p.smcId} value={p.smcId}>
                      {p.smcTitle}
                    </option>
                  ))}
                </select>
              </div>
            </>
          {/* )} */}
        </div>

        <div className="mb-6 rounded border p-4 pt-5 dark:border-0 dark:bg-gray-900">
          <h1 className="mb-6  text-lg font-bold dark:text-white-light">
            {' '}
            Step 3: Dependents Information
          </h1>
          {/* Marital / Children / Parents */}
          <div className="mb-6 space-y-4 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
            <label className="text-md flex items-center gap-2  font-bold dark:text-white-light">
              <input
                type="checkbox"
                checked={isMarried}
                onChange={(e) => {
                  setIsMarried(e.target.checked);
                  if (!e.target.checked) setSpouseNeedAid(false);
                }}
                className="form-checkbox dark:border-white-light dark:checked:border-0 dark:checked:bg-gray-800"
              />
              Are you married?
            </label>

            {isMarried && (
              <label className="text-md ml-4 flex items-center gap-2  font-bold dark:text-white-light">
                <input
                  type="checkbox"
                  checked={spouseNeedAid}
                  onChange={(e) => setSpouseNeedAid(e.target.checked)}
                  className="form-checkbox dark:border-white-light dark:checked:border-0 dark:checked:bg-gray-800"
                />
                Does your spouse need aid and attendance?
              </label>
            )}
          </div>

          <div className="mb-6 space-y-4 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
            <label className="text-md flex items-center gap-2  font-bold dark:text-white-light">
              <input
                type="checkbox"
                checked={hasDependentChildren}
                onChange={(e) => {
                  setHasDependentChildren(e.target.checked);
                  if (!e.target.checked) {
                    setChildrenUnder18('0');
                    setChildrenOver18('0');
                  }
                }}
                className="form-checkbox dark:border-white-light dark:checked:border-0 dark:checked:bg-gray-800"
              />
              Do you have dependent children?
            </label>

            {hasDependentChildren && (
              <div className="ml-4 space-y-2 dark:text-white-light">
                <label className="text-md  font-bold">
                  Number of children under 18
                </label>
                <input
                  type="number"
                  className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                  value={childrenUnder18}
                  onChange={(e) => {
                    const text = e.target.value;
                    const numericValue = text.replace(/[^0-9]/g, '');
                    const number = parseInt(numericValue);
                    if (!isNaN(number) && number >= 0 && number <= 99) {
                      setChildrenUnder18(String(number));
                    } else if (text === '') {
                      setChildrenUnder18('');
                    } else {
                      toast.error(
                        'The number of children under 18 must be between 0 and 99.'
                      );
                    }
                  }}
                  placeholder="Children under 18"
                />
                <label className="text-md  mt-2 font-bold">
                  Number of children over 18
                </label>
                <input
                  type="number"
                  className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                  value={childrenOver18}
                  onChange={(e) => {
                    const text = e.target.value;
                    const numericValue = text.replace(/[^0-9]/g, '');
                    const number = parseInt(numericValue);
                    if (!isNaN(number) && number >= 0 && number <= 99) {
                      setChildrenOver18(String(number));
                    } else if (text === '') {
                      setChildrenOver18('');
                    } else {
                      toast.error(
                        'The number of children over 18 must be between 0 and 99.'
                      );
                    }
                  }}
                  placeholder="Children over 18"
                />
              </div>
            )}
          </div>

          <div className="mb-6 space-y-4 rounded border bg-gray-100 p-4 dark:border-0 dark:bg-gray-700">
            <label className="text-md flex items-center gap-2  font-bold dark:text-white-light">
              <input
                type="checkbox"
                checked={hasDependentParents}
                onChange={(e) => {
                  setHasDependentParents(e.target.checked);
                  if (!e.target.checked) setDependentParents('0');
                }}
                className="form-checkbox dark:border-white-light dark:checked:border-0 dark:checked:bg-gray-800"
              />
              Do you have dependent parents?
            </label>

            {hasDependentParents && (
              <select
                className="ml-4 w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white-light"
                value={dependentParents}
                onChange={(e) => setDependentParents(e.target.value)}
              >
                {dependentParentsData.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onCalculate}
            disabled={loading}
            className=" rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 disabled:opacity-50 dark:border-0 dark:bg-gray-600 dark:text-white-light dark:hover:bg-gray-700"
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
          <button
            onClick={onReset}
            className="rounded bg-primary px-4 py-2 text-white shadow hover:bg-primaryHover dark:border-primary dark:bg-primary dark:text-white-light dark:hover:border-primary  dark:hover:bg-primaryHover"
          >
            Reset All
          </button>
        </div>
      </div>
    </FrontLayout>
  );
};

export default VaBackPayCalculator;
