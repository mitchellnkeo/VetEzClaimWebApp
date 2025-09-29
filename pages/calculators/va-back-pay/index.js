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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const yearData = Array.from({ length: 6 }, (_, i) => (currentYear - i).toString());
const ratingPercentageData = ["0%","10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
const dependentParentsData = ["1", "2"];
const compensationTypeData = ["Select", "Disability Rating", "SMC"];
const smckAwardsData = [0,1,2,3]

export const smcLevelData = [
  { smcId: "", smcTitle: "none" },
  { smcId: "smc_l", smcTitle: "SMC-L" },
  { smcId: "smc_l_half", smcTitle: "SMC-L 1/2" },
  { smcId: "smc_m", smcTitle: "SMC-M" },
  { smcId: "smc_m_half", smcTitle: "SMC-M 1/2" },
  { smcId: "smc_n", smcTitle: "SMC-N" },
  { smcId: "smc_n_half", smcTitle: "SMC-N 1/2" },
  { smcId: "smc_op", smcTitle: "SMC-O/P" },
  { smcId: "smc_r1", smcTitle: "SMC-R1" },
  { smcId: "smc_r2_t", smcTitle: "SMC-R2(T)" },
  { smcId: "smc_s", smcTitle: "SMC-S" }
];


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

  const [smcLevel, setSmcLevel] = useState("smc_l");
  const [smcLevelReceiving, setSmcLevelReceiving] = useState("");

  const [isMarried, setIsMarried] = useState(false);
  const [spouseNeedAid, setSpouseNeedAid] = useState(false);
  const [hasDependentChildren, setHasDependentChildren] = useState(false);
  const [childrenUnder18, setChildrenUnder18] = useState("0");
  const [childrenOver18, setChildrenOver18] = useState("0");
  const [hasDependentParents, setHasDependentParents] = useState(false);
  const [dependentParents, setDependentParents] = useState("0");
  const [compensationType, setCompensationType] = useState("Select");
  const [smckAwards, setSmckAwards] = useState(0);

  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const onCalculate = async () => {
    if (compensationType === "Select") {
      toast.error('Please select a compensation type.');
      return;
    }

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
      ...(compensationType === "Disability Rating" && { ratingPercentage: ratingPercentage }),
      ...(compensationType === "SMC" && { ratingPercentage: smcLevel }),
      ...commonFactors,
    };
    const factors2 = {
      ...(compensationType === "Disability Rating" && { ratingPercentage: receivingPercentage }),
      ...(compensationType === "SMC" && { ratingPercentage: smcLevelReceiving }),
      ...commonFactors,
    };

    console.log("Here we go >>> ", factors1, factors2);
          
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
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
      console.log("Error calculating back pay. Please try again.", error);
      toast.error('Error calculating back pay. Please try again.');
      setResult(0);
    } finally {
      setLoading(false);
    }



    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    setSmckAwards(0);
    setSmcLevel("smc_l");
    setSmcLevelReceiving("");
    setResult(0);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll
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
              <h1 className="text-2xl">VA Back Pay Calculator</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto p-6">
          <div
            className={`text-center rounded-lg p-6 mb-6 ${
              result < 0 ? "bg-red-600 text-white" : "bg-gray-800 text-white"
            }`}
          >
            <p className="text-lg">
              {result < 0 ? "You Owe VA Approximately" : "You Are Owed Approximately"}
            </p>
            <p className="text-4xl font-bold">
              ${Math.abs(result).toFixed(2)}
            </p>
          </div>

          <div className="border rounded p-4 mb-6 pt-5">

            <h1 className="font-bold  text-lg mb-6"> Step 1: Pick  Duration</h1>
            {/* Date Selection */}
            <div className="bg-gray-100 border rounded p-4 mb-6">
              <h2 className="font-bold  text-md">When should you have received a larger disability/smc payment than you did?</h2>
              <div className="flex gap-4 mt-2">
                <select
                  className="border rounded p-2 flex-1"
                  value={initialMonth}
                  onChange={(e) => {
                    if (IsValidDateRange(e.target.value, initialYear, finalMonth, finalYear)) {
                      setInitialMonth(e.target.value);
                    } else {
                      toast.error('The intial date must be come before the stop date.');
                    }
                  }}
                >
                  {monthData.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select
                  className="border rounded p-2 flex-1"
                  value={initialYear}
                  onChange={(e) => {
                    if (IsValidDateRange(initialMonth, e.target.value, finalMonth, finalYear)) {
                      setInitialYear(e.target.value);
                    } else {
                      toast.error('The intial date must be come before the stop date.');
                    }
                  }}
                >
                  {yearData.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-100 border rounded p-4 mb-6">
              <h2 className="font-bold  text-md">(Optional) Specify a stop date, or leave empty to use today's date.</h2>
              <div className="flex gap-4 mt-2">
                <select
                  className="border rounded p-2 flex-1"
                  value={finalMonth}
                  onChange={(e) => {
                    if (IsValidDateRange(initialMonth, initialYear, e.target.value, finalYear)) {
                      setFinalMonth(e.target.value);
                    } else {
                      toast.error('The stop date must be come after the intial date.');
                    }
                  }}
                >
                  {monthData.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select
                  className="border rounded p-2 flex-1"
                  value={finalYear}
                  onChange={(e) => {
                    if (IsValidDateRange(initialMonth, initialYear, finalMonth, e.target.value)) {
                      setFinalYear(e.target.value);
                    } else {
                      toast.error('The stop date must be come after the intial date.');
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

          <div className="border rounded p-4 mb-6 pt-5">
            <h1 className="font-bold  text-lg mb-6"> Step 2: Rating / SMC</h1>

            <div className="w-full mb-6"> 
              <label className=" font-bold  text-md mb-2">
                 Total SMC-K Awards Received
              </label>
              <select
                    className="border rounded p-2 w-full"
                    value={smckAwards}
                    onChange={(e) => setSmckAwards(e.target.value)}
                  >
                    {smckAwardsData.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
              </select>
            </div>
              

            <div className="w-full mb-6"> 
              <label className=" font-bold  text-md mb-2">
                Select Compensation Type
              </label>
              <select
                    className="border rounded p-2 w-full"
                    value={compensationType}
                    onChange={(e) => {
                      setCompensationType(e.target.value)
                      if (e.target.value === "Disability Rating") {
                        setSmcLevel("smc_l");
                        setSmcLevelReceiving("");
                      } else if (e.target.value === "SMC") {
                        setRatingPercentage("10%");
                        setReceivingPercentage("0%");
                      }else {
                        setSmcLevel("smc_l");
                        setSmcLevelReceiving("");
                        setRatingPercentage("10%");
                        setReceivingPercentage("0%");
                      }
                    }}
                  >
                    {compensationTypeData.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
              </select>
            </div>
              
            {compensationType === "Disability Rating" && (
              <> 
                <div className="bg-gray-100 border rounded p-4 mb-6">
                  <label className="block font-bold  text-md"> What the benefit rate  should you have been receiving on this date? </label>
                  <select
                    className="border rounded p-2 w-full mt-2"
                    value={ratingPercentage}
                    onChange={(e) => setRatingPercentage(e.target.value)}
                  >
                    {ratingPercentageData.slice(1).map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-gray-100 border rounded p-4 mb-6">
                  <label className="block font-bold  text-md">
                  What was the benefit rate you were actually receiving on this date? 
                  </label>
                  <select
                    className="border rounded p-2 w-full mt-2"
                    value={receivingPercentage}
                    onChange={(e) => setReceivingPercentage(e.target.value)}
                  >
                    {ratingPercentageData.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {compensationType === "SMC" && (
              <> 
                <div className="bg-gray-100 border rounded p-4 mb-6">
                  <label className="block font-bold  text-md"> What the SMC level should you have been receiving on this date? </label>
                  <select
                    className="border rounded p-2 w-full mt-2"
                    value={smcLevel}
                    onChange={(e) => setSmcLevel(e.target.value)}
                  >
                    {smcLevelData.slice(1).map((p) => (
                      <option  key={p.smcId} value={p.smcId} >{p.smcTitle}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-gray-100 border rounded p-4 mb-6">
                  <label className="block font-bold  text-md">
                  What was the SMC level you were actually receiving on this date? 
                  </label>
                  <select
                    className="border rounded p-2 w-full mt-2"
                    value={smcLevelReceiving}
                    onChange={(e) => setSmcLevelReceiving(e.target.value)}
                  >
                    {smcLevelData.map((p) => (
                      <option  key={p.smcId} value={p.smcId} >{p.smcTitle}</option>
                    ))}
                  </select>
                </div>
              </>
            )}




          </div>

          <div className="border rounded p-4 mb-6 pt-5">
            <h1 className="font-bold  text-lg mb-6"> Step 3: Dependents Information</h1>
            {/* Marital / Children / Parents */}
            <div className="bg-gray-100 border rounded p-4 mb-6 space-y-4">
              <label className="flex items-center gap-2 font-bold  text-md">
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
                <label className="flex items-center gap-2 ml-4 font-bold  text-md">
                  <input
                    type="checkbox"
                    checked={spouseNeedAid}
                    onChange={(e) => setSpouseNeedAid(e.target.checked)}
                  />
                  Does your spouse need aid and attendance?
                </label>
              )}
            </div>

            <div className="bg-gray-100 border rounded p-4 mb-6 space-y-4">
              <label className="flex items-center gap-2 font-bold  text-md">
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
                  <label className="font-bold  text-md">
                    Number of children under 18
                  </label>
                  <input
                    type="number"
                    className="border rounded p-2 w-full"
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
                          toast.error('The number of children under 18 must be between 0 and 99.');
                      }
                    }}
                    placeholder="Children under 18"
                  />
                  <label className="font-bold  text-md mt-2">
                    Number of children over 18
                  </label>
                  <input
                    type="number"
                    className="border rounded p-2 w-full"
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
                        toast.error('The number of children over 18 must be between 0 and 99.');
                      }
                    }}
                    placeholder="Children over 18"
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-100 border rounded p-4 mb-6 space-y-4">
              <label className="flex items-center gap-2 font-bold  text-md">
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
                  className="border rounded p-2 w-full ml-4"
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
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
            <button
              onClick={onReset}
              className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primaryHover"
            >
              Reset All
            </button>
          </div>
       
      </div>
    </FrontLayout>
  );
};

export default VaBackPayCalculator;


