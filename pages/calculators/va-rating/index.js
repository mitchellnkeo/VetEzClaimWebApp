import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';

const categories = [
    { id: "head", label: "Head / Mental" },
    { id: "body", label: "Body" },
    { id: "leftArm", label: "Left Arm" },
    { id: "rightArm", label: "Right Arm" },
    { id: "leftLeg", label: "Left Leg" },
    { id: "rightLeg", label: "Right Leg" },
  ];
const percentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const VaRatingCalculator = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [openCategories, setOpenCategories] = useState({});
  const [disabilityDescriptions, setDisabilityDescriptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(0);
  const [combinedValue, setCombinedValue] = useState(0);
  const [bFactor, setBFactor] = useState(0);

  const addOption = (category, value) => {
    const description = disabilityDescriptions[category] || "";
    setSelectedOptions((prev) => [...prev, { category, value, description }]);
    setDisabilityDescriptions((prev) => ({ ...prev, [category]: "" }));
  };

  const removeOption = (index) => {
    const updated = [...selectedOptions];
    updated.splice(index, 1);
    setSelectedOptions(updated);
  };

  // --- Rating Calculation Functions ---
  function vaCombine(a, b) {
    const comb = Math.round((a + (b * (100 - a)) / 100) * 10) / 10;
    return Math.min(100, comb);
  }

  function combineMultiple(values) {
    return values
      .sort((a, b) => b - a)
      .reduce((acc, curr) => vaCombine(acc, curr), 0);
  }

  function calculateVaRating(selectedOptions) {
    const buckets = {};
    for (const opt of selectedOptions) {
      if (!buckets[opt.category]) buckets[opt.category] = [];
      buckets[opt.category].push(opt.value);
    }

    const leftArm = buckets["Left Arm"] ? combineMultiple(buckets["Left Arm"]) : 0;
    const rightArm = buckets["Right Arm"] ? combineMultiple(buckets["Right Arm"]) : 0;
    const leftLeg = buckets["Left Leg"] ? combineMultiple(buckets["Left Leg"]) : 0;
    const rightLeg = buckets["Right Leg"] ? combineMultiple(buckets["Right Leg"]) : 0;

    delete buckets["Left Arm"];
    delete buckets["Right Arm"];
    delete buckets["Left Leg"];
    delete buckets["Right Leg"];

    let bilateralResult = 0;
    let bFactor = 0;

    if (leftArm && rightArm && leftLeg && rightLeg) {
      const combinedExtremities = combineMultiple([leftArm, rightArm, leftLeg, rightLeg]);
      bilateralResult = combinedExtremities + Math.round(combinedExtremities * 0.1);
      bFactor = Math.round(combinedExtremities * 0.1 * 10) / 10;
    } else {
      if (leftArm && rightArm) {
        const armTotal = combineMultiple([leftArm, rightArm]);
        bilateralResult += armTotal + Math.round(armTotal * 0.1);
        bFactor = Math.round(armTotal * 0.1 * 10) / 10;
      } else {
        if (leftArm) bilateralResult += leftArm;
        if (rightArm) bilateralResult += rightArm;
      }

      if (leftLeg && rightLeg) {
        const legTotal = combineMultiple([leftLeg, rightLeg]);
        bilateralResult = vaCombine(bilateralResult, legTotal + Math.round(legTotal * 0.1));
        bFactor = Math.round(legTotal * 0.1 * 10) / 10;
      } else {
        if (leftLeg) bilateralResult = vaCombine(bilateralResult, leftLeg);
        if (rightLeg) bilateralResult = vaCombine(bilateralResult, rightLeg);
      }
    }

    let allRatings = bilateralResult ? [bilateralResult] : [];
    for (const key in buckets) {
      const totalForCategory = combineMultiple(buckets[key]);
      if (totalForCategory) allRatings.push(totalForCategory);
    }

    const finalCombined = combineMultiple(allRatings);
    const roundedFinalCombined = Math.round(finalCombined);

    setBFactor(bFactor);
    setCombinedValue(roundedFinalCombined);
    return Math.round(finalCombined / 10) * 10;
  }

  useEffect(() => {
    const total = calculateVaRating(selectedOptions);
    setCalculatedValue(total);
  }, [selectedOptions]);



  return (
    <FrontLayout title="VA Rating Calculator">
      <Breadcrumb
        preUrl="/calculators"
        preTitle="Calculators"
        currentTitle="VA Rating Calculator"
      />
      
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">VA Rating Calculator</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mx-5 my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"> */}
      <div className="w-full max-w-3xl mx-auto p-6 mt-5">
      {/* Circle */}
      <div className="flex justify-center mb-10">
        <div className="w-48 h-48 border-4 border-gray-300 rounded-full flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-white-light">Current Disability</p>
          <p className="text-4xl font-bold dark:text-gray-200">{calculatedValue}%</p>
        </div>
      </div>

      {/* Bilateral info */}
      {(bFactor > 0 || combinedValue > 0) && (
        <div className="text-center text-gray-700 mb-6 dark:text-white-light">
          {bFactor > 0 && <p>The bilateral factor of {bFactor} has been applied.</p>}
          {combinedValue > 0 && <p>Your calculated rating is {combinedValue}% which the VA rounds down.</p>}
        </div>
      )}

      {/* Selected Options */}
      {selectedOptions.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2 dark:text-white-light">Based on the following options:</h2>
          <div className="space-y-2">
            {selectedOptions.map((opt, index) => (
              <div
                key={index}
                className="flex justify-between items-start bg-gray-100 p-3 rounded-md dark:bg-gray dark:border-gray-700"
              >
                <div className="dark:text-white-light">
                  <p>
                    {opt.category} {opt.value}%
                  </p>
                  {opt.description && (
                    <p className="text-xs text-gray-500 italic dark:text-white-light">{opt.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeOption(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Dropdowns */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="border rounded-md dark:bg-gray-800 dark:border-gray-700">
            <button
              onClick={() =>
                setOpenCategories((prev) => ({ ...prev, [cat.id]: !prev[cat.id] }))
              }
              className="flex justify-between items-center w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              <span className="font-semibold dark:text-gray-200">{cat.label}</span>
              <span>{openCategories[cat.id] ? "▲" : "▼"}</span>
            </button>

            {openCategories[cat.id] && (
              <div className="p-4 space-y-3 dark:bg-gray-800">
                <textarea
                  className="w-full border rounded p-2 text-sm dark:bg-gray-900 dark:border-gray-400 dark:text-white-light"
                  placeholder="Enter disability description (optional)"
                  value={disabilityDescriptions[cat.label] || ""}
                  onChange={(e) =>
                    setDisabilityDescriptions((prev) => ({
                      ...prev,
                      [cat.label]: e.target.value,
                    }))
                  }
                />

                <div className="flex flex-wrap gap-2">
                  {percentages.map((p) => (
                    <button
                      key={p}
                      onClick={() => addOption(cat.label, p)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm dark:bg-gray-900 dark:border-gray-100 dark:text-white-light"
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
      {/* </div> */}
    </FrontLayout>
  );
};

export default VaRatingCalculator;
