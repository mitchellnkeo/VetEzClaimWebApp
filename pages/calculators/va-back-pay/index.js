import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import { IsValidDateRange } from '@/utils/utils';
import { calculateBackPayWithFactors } from '@/helpers/calcultorHelpers';
import Loader from '@/components/Common/Loader';



const monthData = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const yearData = Array.from({ length: 6 }, (_, i) => (currentYear - i).toString());
const ratingPercentageData = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
const receivingPercentageData = ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
const dependentParentsData = ["1", "2"];

const VaBackPayCalculator = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);

  const currentDate = new Date();
  const currentMonth = monthData[currentDate.getMonth()];
  const curYear = currentDate.getFullYear().toString();

  const [initialMonth, setInitialMonth] = useState("January");
  const [initialYear, setInitialYear] = useState(curYear);
  const [finalMonth, setFinalMonth] = useState(currentMonth);
  const [finalYear, setFinalYear] = useState(curYear);
  const [ratingPercentage, setRatingPercentage] = useState("10%");
  const [receivingPercentage, setReceivingPercentage] = useState("0%");
  const [isMarried, setIsMarried] = useState(false);
  const [spouseNeedAid, setSpouseNeedAid] = useState(false);
  const [hasDependentChildren, setHasDependentChildren] = useState(false);
  const [childrenUnder18, setChildrenUnder18] = useState("0");
  const [childrenOver18, setChildrenOver18] = useState("0");
  const [hasDependentParents, setHasDependentParents] = useState(false);
  const [dependentParents, setDependentParents] = useState("0");

  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const onCalculate = async () => {
    setLoading(true);
    try {
      const payable = await calculateBackPayWithFactors(ratingPercentage, initialMonth, initialYear, finalMonth, finalYear);
      const paid = await calculateBackPayWithFactors(receivingPercentage, initialMonth, initialYear, finalMonth, finalYear);
      setResult(parseFloat((payable - paid).toFixed(2)));
    } catch (err) {
      setResult(0);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setInitialMonth("January");
    setInitialYear(curYear);
    setFinalMonth(currentMonth);
    setFinalYear(curYear);
    setRatingPercentage("10%");
    setReceivingPercentage("0%");
    setIsMarried(false);
    setSpouseNeedAid(false);
    setHasDependentChildren(false);
    setChildrenUnder18("0");
    setChildrenOver18("0");
    setHasDependentParents(false);
    setDependentParents("0");
    setResult(0);
  };

  return (
    <FrontLayout title="VA Back Pay Calculator">
      <Breadcrumb
        preUrl="/calculators"
        preTitle="Calculators"
        currentTitle="VA Back Pay Calculator"
      />
      
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl">VA Back Pay Calculator</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="w-full max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-semibold text-blue-700 border-b pb-4 mb-6">
            VA Back Pay Calculator
          </h1>

          {/* Result Box */}
          <div className="bg-gray-800 text-white text-center rounded-lg p-6 mb-6">
            <p className="text-lg">You Are Owed Approximately</p>
            <p className="text-4xl font-bold">${result}</p>
          </div>

          {/* Date Selection */}
          <div className="bg-gray-100 border rounded p-4 mb-6">
            <h2 className="font-medium text-blue-700">Initial Date</h2>
            <div className="flex gap-4 mt-2">
              <select
                className="border rounded p-2 flex-1"
                value={initialMonth}
                onChange={(e) => setInitialMonth(e.target.value)}
              >
                {monthData.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                className="border rounded p-2 flex-1"
                value={initialYear}
                onChange={(e) => setInitialYear(e.target.value)}
              >
                {yearData.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-100 border rounded p-4 mb-6">
            <h2 className="font-medium text-blue-700">Final Date</h2>
            <div className="flex gap-4 mt-2">
              <select
                className="border rounded p-2 flex-1"
                value={finalMonth}
                onChange={(e) => setFinalMonth(e.target.value)}
              >
                {monthData.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                className="border rounded p-2 flex-1"
                value={finalYear}
                onChange={(e) => setFinalYear(e.target.value)}
              >
                {yearData.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Percentages */}
          <div className="bg-gray-100 border rounded p-4 mb-6">
            <label className="block font-medium text-blue-700">
              Rating Percentage
            </label>
            <select
              className="border rounded p-2 w-full mt-2"
              value={ratingPercentage}
              onChange={(e) => setRatingPercentage(e.target.value)}
            >
              {ratingPercentageData.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-100 border rounded p-4 mb-6">
            <label className="block font-medium text-blue-700">
              Actual Receiving Percentage
            </label>
            <select
              className="border rounded p-2 w-full mt-2"
              value={receivingPercentage}
              onChange={(e) => setReceivingPercentage(e.target.value)}
            >
              {receivingPercentageData.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Marital / Children / Parents */}
          <div className="bg-gray-100 border rounded p-4 mb-6 space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isMarried}
                onChange={(e) => {
                  setIsMarried(e.target.checked);
                  if (!e.target.checked) setSpouseNeedAid(false);
                }}
              />
              Are you married?
            </label>

            {isMarried && (
              <label className="flex items-center gap-2 ml-4">
                <input
                  type="checkbox"
                  checked={spouseNeedAid}
                  onChange={(e) => setSpouseNeedAid(e.target.checked)}
                />
                Does your spouse need aid and attendance?
              </label>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasDependentChildren}
                onChange={(e) => {
                  setHasDependentChildren(e.target.checked);
                  if (!e.target.checked) {
                    setChildrenUnder18("0");
                    setChildrenOver18("0");
                  }
                }}
              />
              Do you have dependent children?
            </label>

            {hasDependentChildren && (
              <div className="ml-4 space-y-2">
                <input
                  type="number"
                  className="border rounded p-2 w-full"
                  value={childrenUnder18}
                  onChange={(e) => setChildrenUnder18(e.target.value)}
                  placeholder="Children under 18"
                />
                <input
                  type="number"
                  className="border rounded p-2 w-full"
                  value={childrenOver18}
                  onChange={(e) => setChildrenOver18(e.target.value)}
                  placeholder="Children over 18"
                />
              </div>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasDependentParents}
                onChange={(e) => {
                  setHasDependentParents(e.target.checked);
                  if (!e.target.checked) setDependentParents("0");
                }}
              />
              Do you have dependent parents?
            </label>

            {hasDependentParents && (
              <select
                className="border rounded p-2 ml-4"
                value={dependentParents}
                onChange={(e) => setDependentParents(e.target.value)}
              >
                {dependentParentsData.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCalculate}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
            <button
              onClick={onReset}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
};

export default VaBackPayCalculator;


/*

import React, { useState } from "react";

// Dummy helpers (replace with your real functions)
import { calculateBackPayWithFactors } from "./calculatorHelpers";
import { isValidDateRange } from "./utilities";



export default function BackPayCalculator() {
  const currentDate = new Date();
  const currentMonth = monthData[currentDate.getMonth()];
  const curYear = currentDate.getFullYear().toString();

  const [initialMonth, setInitialMonth] = useState("January");
  const [initialYear, setInitialYear] = useState(curYear);
  const [finalMonth, setFinalMonth] = useState(currentMonth);
  const [finalYear, setFinalYear] = useState(curYear);
  const [ratingPercentage, setRatingPercentage] = useState("10%");
  const [receivingPercentage, setReceivingPercentage] = useState("0%");
  const [isMarried, setIsMarried] = useState(false);
  const [spouseNeedAid, setSpouseNeedAid] = useState(false);
  const [hasDependentChildren, setHasDependentChildren] = useState(false);
  const [childrenUnder18, setChildrenUnder18] = useState("0");
  const [childrenOver18, setChildrenOver18] = useState("0");
  const [hasDependentParents, setHasDependentParents] = useState(false);
  const [dependentParents, setDependentParents] = useState("0");

  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const onCalculate = async () => {
    setLoading(true);
    try {
      // simulate
      const payable = await calculateBackPayWithFactors(ratingPercentage, initialMonth, initialYear, finalMonth, finalYear);
      const paid = await calculateBackPayWithFactors(receivingPercentage, initialMonth, initialYear, finalMonth, finalYear);
      setResult(parseFloat((payable - paid).toFixed(2)));
    } catch (err) {
      setResult(0);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setInitialMonth("January");
    setInitialYear(curYear);
    setFinalMonth(currentMonth);
    setFinalYear(curYear);
    setRatingPercentage("10%");
    setReceivingPercentage("0%");
    setIsMarried(false);
    setSpouseNeedAid(false);
    setHasDependentChildren(false);
    setChildrenUnder18("0");
    setChildrenOver18("0");
    setHasDependentParents(false);
    setDependentParents("0");
    setResult(0);
  };

  return (
   
  );
}


*/