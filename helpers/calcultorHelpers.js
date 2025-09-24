export async function calculateBackPayWithFactors(
    factors,
    initialMonth,
    initialYear,
    finalMonth,
    finalYear
  ) {
    const monthMapping = await getCOLAMonthMapping(initialMonth, initialYear, finalMonth, finalYear);
    let total = 0;
  
    for (const [colaYear, months] of Object.entries(monthMapping)) {
      const yearData = CompensationRateData.find(d => d.cola_year === colaYear);
      if (!yearData) continue;
  
      const ratingEntries = Object.entries(yearData.rates); 
      const ratingData = ratingEntries.find(
        ([rating]) => rating === factors.ratingPercentage.toString()
      )?.[1];
      
      if (!ratingData) continue;
  
      // Determine dependentStatus key
      let baseKey = "veteran_alone"; // default
      if (factors.isMarried && factors.hasDependentParents && factors.dependentParentsCount === 1 && factors.hasChildren && (factors.childrenUnder18 + factors.childrenOver18 > 0)) {
          baseKey = "veteran_spouse_one_parent_one_child";
      } else if (factors.isMarried && factors.hasDependentParents && factors.dependentParentsCount === 2 && factors.hasChildren && (factors.childrenUnder18 + factors.childrenOver18 > 0)) {
          baseKey = "veteran_spouse_two_parents_one_child";
      } else if (factors.isMarried && factors.hasDependentParents && factors.dependentParentsCount === 1) {
          baseKey = "veteran_spouse_one_parent";
      } else if (factors.isMarried && factors.hasDependentParents && factors.dependentParentsCount === 2) {
          baseKey = "veteran_spouse_two_parents";
      } else if (factors.isMarried && factors.hasChildren && (factors.childrenUnder18 + factors.childrenOver18 > 0)) {
          baseKey = "veteran_spouse_one_child";
      } else if (factors.isMarried) {
          baseKey = "veteran_spouse";
      } else if (factors.hasDependentParents && factors.dependentParentsCount === 1 && factors.hasChildren && (factors.childrenUnder18 + factors.childrenOver18 > 0)) {
          baseKey = "veteran_one_parent_one_child";
      } else if (factors.hasDependentParents && factors.dependentParentsCount === 2 && factors.hasChildren && (factors.childrenUnder18 + factors.childrenOver18 > 0)) {
          baseKey = "veteran_two_parents_one_child";
      } else if (factors.hasDependentParents && factors.dependentParentsCount === 1) {
          baseKey = "veteran_one_parent";
      } else if (factors.hasDependentParents && factors.dependentParentsCount === 2) {
          baseKey = "veteran_two_parents";
      } else if (factors.hasChildren && (factors.childrenUnder18 + factors.childrenOver18 > 0)) {
          baseKey = "veteran_one_child";
      }
  
      // --- Base monthly rate ---
      let monthly = 0;
      if ("flat" in ratingData) {
        monthly = ratingData.flat;
      } else if (ratingData.base) {
        monthly = ratingData.base[baseKey] || 0;
  
        // --- Addons ---
        if (ratingData.addons) {
          if (factors.spouseNeedsAid && ratingData.addons.spouse_aid_and_attendance) {
            monthly += ratingData.addons.spouse_aid_and_attendance;
          }
  
          if (factors.childrenUnder18 && ratingData.addons.additional_child_under_18) {
            monthly += ratingData.addons.additional_child_under_18 * (factors.childrenUnder18 - 1);
          }
  
          if (factors.childrenOver18 && ratingData.addons.additional_child_over_18_school) {
            monthly += ratingData.addons.additional_child_over_18_school * factors.childrenOver18;
          }
        }
      }
  
      total += monthly * months;
    }
  
    return parseFloat(total.toFixed(2));
  }
  