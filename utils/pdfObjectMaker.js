export const generateSubmitToIntentPdf = async (form) => {
  const infoToPDF = {
    content: {
      documentKey: 'tpl_Qy9DCKfLDErJAMdGcm',
      f: {
        page_1: {
          s1_str_1: form.firstName ? form.firstName.slice(0, 12) : '',
          s1_str_2: '',
          s1_str_3: form.lastName ? form.lastName.slice(0, 18) : '',
          s2_str_1: form.ssn ? form.ssn.slice(0, 3) : '',
          s2_str_2: form.ssn ? form.ssn.slice(3, 5) : '',
          s2_str_3: form.ssn ? form.ssn.slice(5, 9) : '',
          s3_opt_1: form.claim === 'Yes',
          s3_opt_2: form.claim === 'No',
          s4_str_1: form.currentVa ? form.currentVa.slice(0, 10) : '',
          s5_str_1: form.birthday.slice(0, 2),
          s5_str_2: form.birthday.slice(3, 5),
          s5_str_3: form.birthday.slice(6, 10),
          s6_str_1: form.serviceNumber ? form.serviceNumber.slice(0, 10) : '',
          s7_str_1: form.street ? form.street.slice(0, 30) : '',
          s7_str_2: form.unitNumber ? form.unitNumber.slice(0, 5) : '',
          s7_str_3: form.city ? form.city.slice(0, 18) : '',
          s7_str_4: form.province ? form.province.slice(0, 2) : '',
          s7_str_5: form.country ? form.country.slice(0, 2) : '',
          s7_str_6: form.zipCode.slice(0, 5),
          s7_str_7: form.zipCode.slice(6, 10),
          s8_str_1: form.phone ? form.phone.slice(0, 3) : '',
          s8_str_2: form.phone ? form.phone.slice(4, 7) : '',
          s8_str_3: form.phone ? form.phone.slice(8, 12) : '',
          s8_str_4: form.phoneI,
          s9_str_5: form.email.slice(0, 20),
          s9_str_6: form.email.slice(20, 40),
          isNewFormat: true,
          s9_str_11: form.email.slice(0, 5),
          s9_str_12: form.email.slice(5, 10),
          s9_str_13: form.email.slice(10, 15),
          s9_str_14: form.email.slice(15, 20),
          s9_str_15: form.email.slice(20, 25),
          s9_str_16: form.email.slice(25, 30),
          s9_str_17: form.email.slice(30, 35),
          s9_str_18: form.email.slice(35, 40),
          s9_str_7: form.emailE ? form.emailE : false,
          s10_str_1:
            form.vet && form.claimantsName
              ? form.claimantsName.slice(0, 12)
              : '',
          s10_str_2: '',
          s10_str_3:
            form.vet && form.claimantsLastName
              ? form.claimantsLastName.slice(0, 18)
              : '',
          s11_str_1:
            form.vet && form.claimantsSsn ? form.claimantsSsn.slice(0, 3) : '',
          s11_str_2:
            form.vet && form.claimantsSsn ? form.claimantsSsn.slice(3, 5) : '',
          s11_str_3:
            form.vet && form.claimantsSsn ? form.claimantsSsn.slice(5, 9) : '',
          s12_opt_1: form.vet && form.claimantsClaim === 'Yes',
          s12_opt_2: form.vet && form.claimantsClaim === 'No',
          s13_str_1:
            form.vet && form.claimantsCurrentVa
              ? form.claimantsCurrentVa.slice(0, 10)
              : '',
          s14_opt_1: form.vet && form.claimantsRelationship === 'Spouse',
          s14_opt_2: form.vet && form.claimantsRelationship === 'Child',
          s14_opt_3: form.vet && form.claimantsRelationship === 'Fiduciary',
          s14_opt_4:
            form.vet &&
            form.claimantsRelationship === 'Veteran Service Officer',
          s14_opt_5:
            form.vet && form.claimantsRelationship === 'Alternate Signer',
          s14_opt_6: form.vet && form.claimantsRelationship === 'Third-Party',
          s14_opt_7: form.vet && form.claimantsRelationship === 'Other',
          s14_str_8:
            form.vet &&
            form.claimantsRelationship === 'Other' &&
            form.claimantOther
              ? form.claimantOther
              : '',
          s15_str_1:
            form.vet && form.claimantsBirthday
              ? form.claimantsBirthday.slice(0, 2)
              : '',
          s15_str_2:
            form.vet && form.claimantsBirthday
              ? form.claimantsBirthday.slice(3, 5)
              : '',
          s15_str_3:
            form.vet && form.claimantsBirthday
              ? form.claimantsBirthday.slice(6, 10)
              : '',
          s16_str_1:
            form.vet && form.claimantsStreet
              ? form.claimantsStreet.slice(0, 30)
              : '',
          s16_str_2:
            form.vet && form.claimantsUnitNumber
              ? form.claimantsUnitNumber.slice(0, 5)
              : '',
          s16_str_3:
            form.vet && form.claimantsCity
              ? form.claimantsCity.slice(0, 18)
              : '',
          s16_str_4:
            form.vet && form.claimantsProvince
              ? form.claimantsProvince.slice(0, 2)
              : '',
          s16_str_5:
            form.vet && form.claimantsCountry
              ? form.claimantsCountry.slice(0, 2)
              : '',
          s16_str_6:
            form.vet && form.claimantsZipCode
              ? form.claimantsZipCode.slice(0, 5)
              : '',
          s16_str_7:
            form.vet && form.claimantsZipCode
              ? form.claimantsZipCode.slice(6, 10)
              : '',
          s17_str_1:
            form.vet && form.claimantsPhone
              ? form.claimantsPhone.slice(0, 3)
              : '',
          s17_str_2:
            form.vet && form.claimantsPhone
              ? form.claimantsPhone.slice(4, 7)
              : '',
          s17_str_3:
            form.vet && form.claimantsPhone
              ? form.claimantsPhone.slice(8, 12)
              : '',
          s17_str_4:
            form.vet && form.claimantsPhoneI ? form.claimantsPhoneI : '',
          s18_str_1:
            form.vet && form.claimantsEmail
              ? form.claimantsEmail.slice(0, 20)
              : '',
          s18_str_2:
            form.vet && form.claimantsEmail
              ? form.claimantsEmail.slice(20, 40)
              : '',
          s18_str_3:
            form.vet && form.claimantsEmailE ? form.claimantsEmailE : false,
          s19_opt_1: form.benefitElection?.some(
            (benefit) => benefit.name === 'COMPENSATION' && benefit.selected
          )
            ? true
            : false,
          s19_opt_2: form.benefitElection?.some(
            (benefit) => benefit.name === 'PENSION' && benefit.selected
          )
            ? true
            : false,
          s19_opt_3: form.dic ? form.dic : false,
          s20_img_1: form.signature ? form.signature : '',
          s21_str_1: form.veteranDateSigned
            ? form.veteranDateSigned.slice(0, 2)
            : '',
          s21_str_2: form.veteranDateSigned
            ? form.veteranDateSigned.slice(3, 5)
            : '',
          s21_str_3: form.veteranDateSigned
            ? form.veteranDateSigned.slice(6, 10)
            : '',
          s22_str_1: '',
        },
      },
    },
  };
  return infoToPDF;
};

export const generateNewClaimPdfObject = async (form) => {
  const infoToPDF = {
    content: {
      documentKey: 'tpl_HYmmEYgDRcPRfQHcrk',
      f: {
        page_1: {
          fully_developed_claim: form.program
            ? form.program == 'FDC Program'
              ? true
              : false
            : false,
          scp: form.program
            ? form.program == 'Standard Claim Progress'
              ? true
              : false
            : false,
          ides: form.program ? (form.program == 'IDES' ? true : false) : false,
          bdd: form.program
            ? form.program == 'BDD Program Claim'
              ? true
              : false
            : false,

          firstname: form.firstName ? form.firstName.slice(0, 12) : '',
          last_name: form.lastName ? form.lastName.slice(0, 18) : '',
          ssn1: form.ssn ? form.ssn.slice(0, 3) : '',
          ssn2: form.ssn ? form.ssn.slice(3, 5) : '',
          ssn3: form.ssn ? form.ssn.slice(5, 9) : '',
          file_yes: form.claim ? (form.claim == 'Yes' ? true : false) : false,
          file_no: form.claim ? (form.claim == 'No' ? true : false) : false,
          va_file_number: form.currentVa ? form.currentVa : '',
          service_number: form.serviceNumber ? form.serviceNumber : '',
          birth_month: form.birthday ? form.birthday.slice(0, 2) : '',
          birth_day: form.birthday ? form.birthday.slice(3, 5) : '',
          birth_year: form.birthday ? form.birthday.slice(6, 10) : '',
          phone_area_code: form.phone ? form.phone.slice(0, 3) : '',
          telephone1: form.phone ? form.phone.slice(4, 7) : '',
          telephone2: form.phone ? form.phone.slice(8, 12) : '',
          release_month: form.bddDate ? form.bddDate.slice(0, 2) : '',
          release_day: form.bddDate ? form.bddDate.slice(3, 5) : '',
          release_year: form.bddDate ? form.bddDate.slice(6, 10) : '',
          international_tel: form.phoneI ? form.phoneI : '',

          curren_address: form.street ? form.street.slice(0, 30) : '',
          apartment_number: form.unitNumber ? form.unitNumber.slice(0, 5) : '',
          city: form.city ? form.city.slice(0, 18) : '',
          state: form.province ? form.province.slice(0, 2) : '',
          country: form.country ? form.country.slice(0, 2) : '',
          zip_code: form.zipCode ? form.zipCode.slice(0, 5) : '',
          postal_code: form.zipCode ? form.zipCode.slice(6, 10) : '',

          email_address_1: form.email ? form.email.slice(0, 25) : '',
          email_address_2: form.email ? form.email.slice(25, 50) : '',
          isNewFormat: true,
          email_address_3: form.email ? form.email.slice(0, 13) : '',
          email_address_4: form.email ? form.email.slice(13, 25) : '',
          email_address_5: form.email ? form.email.slice(25, 38) : '',
          email_address_6: form.email ? form.email.slice(38, 50) : '',

          agree_correspondence: form.emailE ? form.emailE : false,
          current_va_employee_check_box: form.currentlyEmployee
            ? form.currentlyEmployee
            : false,

          address_temp: form.typeAddressChange
            ? form.typeAddressChange == 'Temporary'
              ? true
              : false
            : false,
          address_perm: form.typeAddressChange
            ? form.typeAddressChange == 'Permanent'
              ? true
              : false
            : false,

          new_address: form.newAddressstreet
            ? form.newAddressstreet.slice(0, 30)
            : '',
          new_address_number: form.newAddressunitNumber
            ? form.newAddressunitNumber.slice(0, 5)
            : '',
          new_address_city: form.newAddresscity
            ? form.newAddresscity.slice(0, 18)
            : '',
          new_address_state: form.newAddressprovince
            ? form.newAddressprovince.slice(0, 2)
            : '',
          new_address_country: form.newAddresscountry
            ? form.newAddresscountry.slice(0, 2)
            : '',
          new_address_zip: form.newAddresszipCode
            ? form.newAddresszipCode.slice(0, 5)
            : '',
          new_address_postalcode: form.newAddresszipCode
            ? form.newAddresszipCode.slice(6, 10)
            : '',
          beginning_month: form.newAddressEffectiveBeginning
            ? form.newAddressEffectiveBeginning.slice(0, 2)
            : '',
          beginning_day: form.newAddressEffectiveBeginning
            ? form.newAddressEffectiveBeginning.slice(3, 5)
            : '',
          beginning_year: form.newAddressEffectiveBeginning
            ? form.newAddressEffectiveBeginning.slice(6, 10)
            : '',

          ending_month: form.newAddressEffectiveEnding
            ? form.newAddressEffectiveEnding.slice(0, 2)
            : '',
          ending_day: form.newAddressEffectiveEnding
            ? form.newAddressEffectiveEnding.slice(3, 5)
            : '',
          ending_year: form.newAddressEffectiveEnding
            ? form.newAddressEffectiveEnding.slice(6, 10)
            : '',

          '14a_opt_1': form.currentlyHomeless
            ? form.currentlyHomeless == 'Yes'
              ? true
              : false
            : false,
          '14a_opt_2': form.currentlyHomeless
            ? form.currentlyHomeless == 'No'
              ? true
              : false
            : false,

          '14b_opt_1': form.currentlyHomelesslivingSituation
            ? form.currentlyHomelesslivingSituation == 'Shelter'
              ? true
              : false
            : false,
          '14b_opt_2': form.currentlyHomelesslivingSituation
            ? form.currentlyHomelesslivingSituation ==
              'Non-sheltered Enviroment'
              ? true
              : false
            : false,
          '14b_opt_3': form.currentlyHomelesslivingSituation
            ? form.currentlyHomelesslivingSituation == 'Another'
              ? true
              : false
            : false,
          '14b_opt_4': form.currentlyHomelesslivingSituation
            ? form.currentlyHomelesslivingSituation == 'Fleeing Residence'
              ? true
              : false
            : false,
          '14b_opt_5': form.currentlyHomelesslivingSituation
            ? form.currentlyHomelesslivingSituation == 'Other'
              ? true
              : false
            : false,
          '14a_str_1':
            form.currentlyHomeless == 'Yes' &&
            form.currentlyHomelesslivingSituation == 'Other' &&
            form.currentlyHomelessspecify
              ? form.currentlyHomelessspecify
              : '',

          '14c_opt_1': form.riskOfHomeless
            ? form.riskOfHomeless == 'Yes'
              ? true
              : false
            : false,
          '14c_opt_2': form.riskOfHomeless
            ? form.riskOfHomeless == 'No'
              ? true
              : false
            : false,
          '14d_opt_1': form.riskOfHomelesslivingSituation
            ? form.riskOfHomelesslivingSituation ==
              'Housing will be lost in 30 days'
              ? true
              : false
            : false,
          '14d_opt_2': form.riskOfHomelesslivingSituation
            ? form.riskOfHomelesslivingSituation ==
              'Leaving publicly funded system of care (e.g., homeless shelter)'
              ? true
              : false
            : false,
          '14d_opt_3': form.riskOfHomelesslivingSituation
            ? form.riskOfHomelesslivingSituation == 'Other'
              ? true
              : false
            : false,
          '14a_str_2':
            form.riskOfHomeless == 'Yes' &&
            form.riskOfHomelesslivingSituation == 'Other' &&
            form.riskOfHomelessspecify
              ? form.riskOfHomelessspecify
              : '',

          '14e_str_1': form.pointOfContactName ? form.pointOfContactName : '',
          '14f_str_tel_1': form.pointOfContactTelephone
            ? form.pointOfContactTelephone.slice(0, 3)
            : '',
          '14f_str_tel_2': form.pointOfContactTelephone
            ? form.pointOfContactTelephone.slice(4, 7)
            : '',
          '14f_str_tel_3': form.pointOfContactTelephone
            ? form.pointOfContactTelephone.slice(8, 12)
            : '',
          '14f_str_tel_4': form.pointOfContactTelephoneI
            ? form.pointOfContactTelephoneI
            : '',

          '15a_opt_1': form.toxicExposures
            ? form.toxicExposures == 'Yes'
              ? true
              : false
            : false,
          '15a_opt_2': form.toxicExposures
            ? form.toxicExposures == 'No'
              ? true
              : false
            : false,
          '15b_opt_1': form.hazardLocation
            ? form.hazardLocation == 'Yes'
              ? true
              : false
            : false,
          '15b_opt_2': form.hazardLocation
            ? form.hazardLocation == 'No'
              ? true
              : false
            : false,
          '15b_date_month': form.hazardLocation
            ? form.hazardLocation == 'Yes' && form.hazardLocationDateFrom
              ? form.hazardLocationDateFrom.slice(0, 2)
              : ''
            : '',
          '15b_date_year': form.hazardLocation
            ? form.hazardLocation == 'Yes'
              ? form.hazardLocationDateFrom
                ? form.hazardLocationDateFrom.slice(6, 10)
                : ''
              : ''
            : '',
          '15b_date_month_2': form.hazardLocation
            ? form.hazardLocation == 'Yes' && form.hazardLocationDateTo
              ? form.hazardLocationDateTo.slice(0, 2)
              : ''
            : '',
          '15b_date_year_2': form.hazardLocation
            ? form.hazardLocation == 'Yes' && form.hazardLocationDateTo
              ? form.hazardLocationDateTo.slice(6, 10)
              : ''
            : '',
          '15c_opt_1': form.herbicideLocation
            ? form.herbicideLocation == 'Yes'
              ? true
              : false
            : false,
          '15c_opt_2': form.herbicideLocation
            ? form.herbicideLocation == 'No'
              ? true
              : false
            : false,
          '15c_str_loc': form.herbicideLocation
            ? form.herbicideLocationList
            : '',
          '15c_month_1': form.herbicideLocation
            ? form.herbicideLocation == 'Yes' && form.herbicideLocationDateFrom
              ? form.herbicideLocationDateFrom.slice(0, 2)
              : ''
            : '',
          '15c_year_1': form.herbicideLocation
            ? form.herbicideLocation == 'Yes' && form.herbicideLocationDateFrom
              ? form.herbicideLocationDateFrom.slice(6, 10)
              : ''
            : '',
          '15c_month_2': form.herbicideLocation
            ? form.herbicideLocation == 'Yes' && form.herbicideLocationDateTo
              ? form.herbicideLocationDateTo.slice(0, 2)
              : ''
            : '',
          '15c_year_2': form.herbicideLocation
            ? form.herbicideLocation == 'Yes' && form.herbicideLocationDateTo
              ? form.herbicideLocationDateTo.slice(6, 10)
              : ''
            : '',
          '15d_opt_1': form.haveExposed_Asbestos ? true : false,
          '15d_opt_4': form.haveExposed_MustardGas ? true : false,
          '15d_opt_6': form.haveExposed_Radiation ? true : false,
          '15d_opt_2': form.haveExposed_SHAD ? true : false,
          '15d_opt_5': form.haveExposed_MOSRelatedToxin ? true : false,
          '15d_opt_7': form.haveExposed_ContaminatedWater ? true : false,
          '15d_opt_3': form.haveExposed_Other ? true : false,
          '15d_str': form.haveExposed_OtherSpecify
            ? form.haveExposed_OtherSpecify
            : '',
          '15d_date_month': form.haveExposed_dateFrom
            ? form.haveExposed_dateFrom.slice(0, 2)
            : '',
          '15d_date_year': form.haveExposed_dateFrom
            ? form.haveExposed_dateFrom.slice(6, 10)
            : '',
          '15d_date_month_2': form.haveExposed_dateTo
            ? form.haveExposed_dateTo.slice(0, 2)
            : '',
          '15d_date_year_2': form.haveExposed_dateTo
            ? form.haveExposed_dateTo.slice(6, 10)
            : '',
          '15e_str': form.haveExposed_multipleTimes
            ? form.haveExposed_multipleTimes
            : '',

          currentdisability_0: form.disabilities
            ? form.disabilities.length > 0
              ? form.disabilities[0].currentDisability
              : ''
            : '',
          injury_0: form.disabilities
            ? form.disabilities.length > 0
              ? form.disabilities[0].specifications
              : ''
            : '',
          disability_0: form.disabilities
            ? form.disabilities.length > 0
              ? form.disabilities[0].explanation
              : ''
            : '',
          date_disability_0: form.disabilities
            ? form.disabilities.length > 0
              ? form.disabilities[0].date
              : ''
            : '',
          currentdisability_1: form.disabilities
            ? form.disabilities.length > 1
              ? form.disabilities[1].currentDisability
              : ''
            : '',
          injury_1: form.disabilities
            ? form.disabilities.length > 1
              ? form.disabilities[1].specifications
              : ''
            : '',
          disability_1: form.disabilities
            ? form.disabilities.length > 1
              ? form.disabilities[1].explanation
              : ''
            : '',
          date_disability_1: form.disabilities
            ? form.disabilities.length > 1
              ? form.disabilities[1].date
              : ''
            : '',
          currentdisability_2: form.disabilities
            ? form.disabilities.length > 2
              ? form.disabilities[2].currentDisability
              : ''
            : '',
          injury_2: form.disabilities
            ? form.disabilities.length > 2
              ? form.disabilities[2].specifications
              : ''
            : '',
          disability_2: form.disabilities
            ? form.disabilities.length > 2
              ? form.disabilities[2].explanation
              : ''
            : '',
          date_disability_2: form.disabilities
            ? form.disabilities.length > 2
              ? form.disabilities[2].date
              : ''
            : '',
          currentdisability_3: form.disabilities
            ? form.disabilities.length > 3
              ? form.disabilities[3].currentDisability
              : ''
            : '',
          injury_3: form.disabilities
            ? form.disabilities.length > 3
              ? form.disabilities[3].specifications
              : ''
            : '',
          disability_3: form.disabilities
            ? form.disabilities.length > 3
              ? form.disabilities[3].explanation
              : ''
            : '',
          date_disability_3: form.disabilities
            ? form.disabilities.length > 3
              ? form.disabilities[3].date
              : ''
            : '',
          currentdisability_4: form.disabilities
            ? form.disabilities.length > 4
              ? form.disabilities[4].currentDisability
              : ''
            : '',
          injury_4: form.disabilities
            ? form.disabilities.length > 4
              ? form.disabilities[4].specifications
              : ''
            : '',
          disability_4: form.disabilities
            ? form.disabilities.length > 4
              ? form.disabilities[4].explanation
              : ''
            : '',
          date_disability_4: form.disabilities
            ? form.disabilities.length > 4
              ? form.disabilities[4].date
              : ''
            : '',
          currentdisability_5: form.disabilities
            ? form.disabilities.length > 5
              ? form.disabilities[5].currentDisability
              : ''
            : '',
          injury_5: form.disabilities
            ? form.disabilities.length > 5
              ? form.disabilities[5].specifications
              : ''
            : '',
          disability_5: form.disabilities
            ? form.disabilities.length > 5
              ? form.disabilities[5].explanation
              : ''
            : '',
          date_disability_5: form.disabilities
            ? form.disabilities.length > 5
              ? form.disabilities[5].date
              : ''
            : '',
          currentdisability_6: form.disabilities
            ? form.disabilities.length > 6
              ? form.disabilities[6].currentDisability
              : ''
            : '',
          injury_6: form.disabilities
            ? form.disabilities.length > 6
              ? form.disabilities[6].specifications
              : ''
            : '',
          disability_6: form.disabilities
            ? form.disabilities.length > 6
              ? form.disabilities[6].explanation
              : ''
            : '',
          date_disability_6: form.disabilities
            ? form.disabilities.length > 6
              ? form.disabilities[6].date
              : ''
            : '',
          currentdisability_7: form.disabilities
            ? form.disabilities.length > 7
              ? form.disabilities[7].currentDisability
              : ''
            : '',
          injury_7: form.disabilities
            ? form.disabilities.length > 7
              ? form.disabilities[7].specifications
              : ''
            : '',
          disability_7: form.disabilities
            ? form.disabilities.length > 7
              ? form.disabilities[7].explanation
              : ''
            : '',
          date_disability_7: form.disabilities
            ? form.disabilities.length > 7
              ? form.disabilities[7].date
              : ''
            : '',
          currentdisability_8: form.disabilities
            ? form.disabilities.length > 8
              ? form.disabilities[8].currentDisability
              : ''
            : '',
          injury_8: form.disabilities
            ? form.disabilities.length > 8
              ? form.disabilities[8].specifications
              : ''
            : '',
          disability_8: form.disabilities
            ? form.disabilities.length > 8
              ? form.disabilities[8].explanation
              : ''
            : '',
          date_disability_8: form.disabilities
            ? form.disabilities.length > 8
              ? form.disabilities[8].date
              : ''
            : '',
          currentdisability_9: form.disabilities
            ? form.disabilities.length > 9
              ? form.disabilities[9].currentDisability
              : ''
            : '',
          injury_9: form.disabilities
            ? form.disabilities.length > 9
              ? form.disabilities[9].specifications
              : ''
            : '',
          disability_9: form.disabilities
            ? form.disabilities.length > 9
              ? form.disabilities[9].explanation
              : ''
            : '',
          date_disability_9: form.disabilities
            ? form.disabilities.length > 9
              ? form.disabilities[9].date
              : ''
            : '',
          currentdisability_10: form.disabilities
            ? form.disabilities.length > 10
              ? form.disabilities[10].currentDisability
              : ''
            : '',
          injury_10: form.disabilities
            ? form.disabilities.length > 10
              ? form.disabilities[10].specifications
              : ''
            : '',
          disability_10: form.disabilities
            ? form.disabilities.length > 10
              ? form.disabilities[10].explanation
              : ''
            : '',
          date_disability_10: form.disabilities
            ? form.disabilities.length > 10
              ? form.disabilities[10].date
              : ''
            : '',
          currentdisability_11: form.disabilities
            ? form.disabilities.length > 11
              ? form.disabilities[11].currentDisability
              : ''
            : '',
          injury_11: form.disabilities
            ? form.disabilities.length > 11
              ? form.disabilities[11].specifications
              : ''
            : '',
          disability_11: form.disabilities
            ? form.disabilities.length > 11
              ? form.disabilities[11].explanation
              : ''
            : '',
          date_disability_11: form.disabilities
            ? form.disabilities.length > 11
              ? form.disabilities[11].date
              : ''
            : '',
          currentdisability_12: form.disabilities
            ? form.disabilities.length > 12
              ? form.disabilities[12].currentDisability
              : ''
            : '',
          injury_12: form.disabilities
            ? form.disabilities.length > 12
              ? form.disabilities[12].specifications
              : ''
            : '',
          disability_12: form.disabilities
            ? form.disabilities.length > 12
              ? form.disabilities[12].explanation
              : ''
            : '',
          date_disability_12: form.disabilities
            ? form.disabilities.length > 12
              ? form.disabilities[12].date
              : ''
            : '',
          currentdisability_13: form.disabilities
            ? form.disabilities.length > 13
              ? form.disabilities[13].currentDisability
              : ''
            : '',
          injury_13: form.disabilities
            ? form.disabilities.length > 13
              ? form.disabilities[13].specifications
              : ''
            : '',
          disability_13: form.disabilities
            ? form.disabilities.length > 13
              ? form.disabilities[13].explanation
              : ''
            : '',
          date_disability_13: form.disabilities
            ? form.disabilities.length > 13
              ? form.disabilities[13].date
              : ''
            : '',
          currentdisability_14: form.disabilities
            ? form.disabilities.length > 14
              ? form.disabilities[14].currentDisability
              : ''
            : '',
          injury_14: form.disabilities
            ? form.disabilities.length > 14
              ? form.disabilities[14].specifications
              : ''
            : '',
          disability_14: form.disabilities
            ? form.disabilities.length > 14
              ? form.disabilities[14].explanation
              : ''
            : '',
          date_disability_14: form.disabilities
            ? form.disabilities.length > 14
              ? form.disabilities[14].date
              : ''
            : '',
          currentdisability_15: form.disabilities
            ? form.disabilities.length > 15
              ? form.disabilities[15].currentDisability
              : ''
            : '',
          injury_15: form.disabilities
            ? form.disabilities.length > 15
              ? form.disabilities[15].specifications
              : ''
            : '',
          disability_15: form.disabilities
            ? form.disabilities.length > 15
              ? form.disabilities[15].explanation
              : ''
            : '',
          date_disability_15: form.disabilities
            ? form.disabilities.length > 15
              ? form.disabilities[15].date
              : ''
            : '',
          currentdisability_16: form.disabilities
            ? form.disabilities.length > 16
              ? form.disabilities[16].currentDisability
              : ''
            : '',
          injury_16: form.disabilities
            ? form.disabilities.length > 16
              ? form.disabilities[16].specifications
              : ''
            : '',
          disability_16: form.disabilities
            ? form.disabilities.length > 16
              ? form.disabilities[16].explanation
              : ''
            : '',
          date_disability_16: form.disabilities
            ? form.disabilities.length > 16
              ? form.disabilities[16].date
              : ''
            : '',
          currentdisability_17: form.disabilities
            ? form.disabilities.length > 17
              ? form.disabilities[17].currentDisability
              : ''
            : '',
          injury_17: form.disabilities
            ? form.disabilities.length > 17
              ? form.disabilities[17].specifications
              : ''
            : '',
          disability_17: form.disabilities
            ? form.disabilities.length > 17
              ? form.disabilities[17].explanation
              : ''
            : '',
          date_disability_17: form.disabilities
            ? form.disabilities.length > 17
              ? form.disabilities[17].date
              : ''
            : '',
          currentdisability_18: form.disabilities
            ? form.disabilities.length > 18
              ? form.disabilities[18].currentDisability
              : ''
            : '',
          injury_18: form.disabilities
            ? form.disabilities.length > 18
              ? form.disabilities[18].specifications
              : ''
            : '',
          disability_18: form.disabilities
            ? form.disabilities.length > 18
              ? form.disabilities[18].explanation
              : ''
            : '',
          date_disability_18: form.disabilities
            ? form.disabilities.length > 18
              ? form.disabilities[18].date
              : ''
            : '',
          currentdisability_19: form.disabilities
            ? form.disabilities.length > 19
              ? form.disabilities[19].currentDisability
              : ''
            : '',
          injury_19: form.disabilities
            ? form.disabilities.length > 19
              ? form.disabilities[19].specifications
              : ''
            : '',
          disability_19: form.disabilities
            ? form.disabilities.length > 19
              ? form.disabilities[19].explanation
              : ''
            : '',
          date_disability_19: form.disabilities
            ? form.disabilities.length > 19
              ? form.disabilities[19].date
              : ''
            : '',

          // add more disabilities here
          currentdisability_20: form.disabilities
            ? form.disabilities.length > 20
              ? form.disabilities[20].currentDisability
              : ''
            : '',
          injury_20: form.disabilities
            ? form.disabilities.length > 20
              ? form.disabilities[20].specifications
              : ''
            : '',
          disability_20: form.disabilities
            ? form.disabilities.length > 20
              ? form.disabilities[20].explanation
              : ''
            : '',
          date_disability_20: form.disabilities
            ? form.disabilities.length > 20
              ? form.disabilities[20].date
              : ''
            : '',

          currentdisability_21: form.disabilities
            ? form.disabilities.length > 21
              ? form.disabilities[21].currentDisability
              : ''
            : '',
          injury_21: form.disabilities
            ? form.disabilities.length > 21
              ? form.disabilities[21].specifications
              : ''
            : '',
          disability_21: form.disabilities
            ? form.disabilities.length > 21
              ? form.disabilities[21].explanation
              : ''
            : '',
          date_disability_21: form.disabilities
            ? form.disabilities.length > 21
              ? form.disabilities[21].date
              : ''
            : '',

          currentdisability_22: form.disabilities
            ? form.disabilities.length > 22
              ? form.disabilities[22].currentDisability
              : ''
            : '',
          injury_22: form.disabilities
            ? form.disabilities.length > 22
              ? form.disabilities[22].specifications
              : ''
            : '',
          disability_22: form.disabilities
            ? form.disabilities.length > 22
              ? form.disabilities[22].explanation
              : ''
            : '',
          date_disability_22: form.disabilities
            ? form.disabilities.length > 22
              ? form.disabilities[22].date
              : ''
            : '',

          currentdisability_23: form.disabilities
            ? form.disabilities.length > 23
              ? form.disabilities[23].currentDisability
              : ''
            : '',
          injury_23: form.disabilities
            ? form.disabilities.length > 23
              ? form.disabilities[23].specifications
              : ''
            : '',
          disability_23: form.disabilities
            ? form.disabilities.length > 23
              ? form.disabilities[23].explanation
              : ''
            : '',
          date_disability_23: form.disabilities
            ? form.disabilities.length > 23
              ? form.disabilities[23].date
              : ''
            : '',

          currentdisability_24: form.disabilities
            ? form.disabilities.length > 24
              ? form.disabilities[24].currentDisability
              : ''
            : '',
          injury_24: form.disabilities
            ? form.disabilities.length > 24
              ? form.disabilities[24].specifications
              : ''
            : '',
          disability_24: form.disabilities
            ? form.disabilities.length > 24
              ? form.disabilities[24].explanation
              : ''
            : '',
          date_disability_24: form.disabilities
            ? form.disabilities.length > 24
              ? form.disabilities[24].date
              : ''
            : '',

          currentdisability_25: form.disabilities
            ? form.disabilities.length > 25
              ? form.disabilities[25].currentDisability
              : ''
            : '',
          injury_25: form.disabilities
            ? form.disabilities.length > 25
              ? form.disabilities[25].specifications
              : ''
            : '',
          disability_25: form.disabilities
            ? form.disabilities.length > 25
              ? form.disabilities[25].explanation
              : ''
            : '',
          date_disability_25: form.disabilities
            ? form.disabilities.length > 25
              ? form.disabilities[25].date
              : ''
            : '',

          currentdisability_26: form.disabilities
            ? form.disabilities.length > 26
              ? form.disabilities[26].currentDisability
              : ''
            : '',
          injury_26: form.disabilities
            ? form.disabilities.length > 26
              ? form.disabilities[26].specifications
              : ''
            : '',
          disability_26: form.disabilities
            ? form.disabilities.length > 26
              ? form.disabilities[26].explanation
              : ''
            : '',
          date_disability_26: form.disabilities
            ? form.disabilities.length > 26
              ? form.disabilities[26].date
              : ''
            : '',

          currentdisability_27: form.disabilities
            ? form.disabilities.length > 27
              ? form.disabilities[27].currentDisability
              : ''
            : '',
          injury_27: form.disabilities
            ? form.disabilities.length > 27
              ? form.disabilities[27].specifications
              : ''
            : '',
          disability_27: form.disabilities
            ? form.disabilities.length > 27
              ? form.disabilities[27].explanation
              : ''
            : '',
          date_disability_27: form.disabilities
            ? form.disabilities.length > 27
              ? form.disabilities[27].date
              : ''
            : '',

          currentdisability_28: form.disabilities
            ? form.disabilities.length > 28
              ? form.disabilities[28].currentDisability
              : ''
            : '',
          injury_28: form.disabilities
            ? form.disabilities.length > 28
              ? form.disabilities[28].specifications
              : ''
            : '',
          disability_28: form.disabilities
            ? form.disabilities.length > 28
              ? form.disabilities[28].explanation
              : ''
            : '',
          date_disability_28: form.disabilities
            ? form.disabilities.length > 28
              ? form.disabilities[28].date
              : ''
            : '',

          currentdisability_29: form.disabilities
            ? form.disabilities.length > 29
              ? form.disabilities[29].currentDisability
              : ''
            : '',
          injury_29: form.disabilities
            ? form.disabilities.length > 29
              ? form.disabilities[29].specifications
              : ''
            : '',
          disability_29: form.disabilities
            ? form.disabilities.length > 29
              ? form.disabilities[29].explanation
              : ''
            : '',
          date_disability_29: form.disabilities
            ? form.disabilities.length > 29
              ? form.disabilities[29].date
              : ''
            : '',

          currentdisability_30: form.disabilities
            ? form.disabilities.length > 30
              ? form.disabilities[30].currentDisability
              : ''
            : '',
          injury_30: form.disabilities
            ? form.disabilities.length > 30
              ? form.disabilities[30].specifications
              : ''
            : '',
          disability_30: form.disabilities
            ? form.disabilities.length > 30
              ? form.disabilities[30].explanation
              : ''
            : '',
          date_disability_30: form.disabilities
            ? form.disabilities.length > 30
              ? form.disabilities[30].date
              : ''
            : '',

          currentdisability_31: form.disabilities
            ? form.disabilities.length > 31
              ? form.disabilities[31].currentDisability
              : ''
            : '',
          injury_31: form.disabilities
            ? form.disabilities.length > 31
              ? form.disabilities[31].specifications
              : ''
            : '',
          disability_31: form.disabilities
            ? form.disabilities.length > 31
              ? form.disabilities[31].explanation
              : ''
            : '',
          date_disability_31: form.disabilities
            ? form.disabilities.length > 31
              ? form.disabilities[31].date
              : ''
            : '',

          currentdisability_32: form.disabilities
            ? form.disabilities.length > 32
              ? form.disabilities[32].currentDisability
              : ''
            : '',
          injury_32: form.disabilities
            ? form.disabilities.length > 32
              ? form.disabilities[32].specifications
              : ''
            : '',
          disability_32: form.disabilities
            ? form.disabilities.length > 32
              ? form.disabilities[32].explanation
              : ''
            : '',
          date_disability_32: form.disabilities
            ? form.disabilities.length > 32
              ? form.disabilities[32].date
              : ''
            : '',

          currentdisability_33: form.disabilities
            ? form.disabilities.length > 33
              ? form.disabilities[33].currentDisability
              : ''
            : '',
          injury_33: form.disabilities
            ? form.disabilities.length > 33
              ? form.disabilities[33].specifications
              : ''
            : '',
          disability_33: form.disabilities
            ? form.disabilities.length > 33
              ? form.disabilities[33].explanation
              : ''
            : '',
          date_disability_33: form.disabilities
            ? form.disabilities.length > 33
              ? form.disabilities[33].date
              : ''
            : '',

          currentdisability_34: form.disabilities
            ? form.disabilities.length > 34
              ? form.disabilities[34].currentDisability
              : ''
            : '',
          injury_34: form.disabilities
            ? form.disabilities.length > 34
              ? form.disabilities[34].specifications
              : ''
            : '',
          disability_34: form.disabilities
            ? form.disabilities.length > 34
              ? form.disabilities[34].explanation
              : ''
            : '',
          date_disability_34: form.disabilities
            ? form.disabilities.length > 34
              ? form.disabilities[34].date
              : ''
            : '',

          '17a_str_1': form.treatmentFacilities
            ? form.treatmentFacilities.length > 0
              ? form.treatmentFacilities[0].facility
              : ''
            : '',
          '17b_date_month_1': form.treatmentFacilities
            ? form.treatmentFacilities.length > 0
              ? form.treatmentFacilities[0].notAvailable
                ? ''
                : form.treatmentFacilities[0].date
                ? form.treatmentFacilities[0].date.slice(0, 2)
                : ''
              : ''
            : '',
          '17b_date_year_1': form.treatmentFacilities
            ? form.treatmentFacilities.length > 0
              ? form.treatmentFacilities[0].notAvailable
                ? ''
                : form.treatmentFacilities[0].date
                ? form.treatmentFacilities[0].date.slice(6, 10)
                : ''
              : ''
            : '',
          '17c_opt_1': form.treatmentFacilities
            ? form.treatmentFacilities.length > 0
              ? form.treatmentFacilities[0].notAvailable
                ? true
                : false
              : false
            : false,
          '17a_str_2': form.treatmentFacilities
            ? form.treatmentFacilities.length > 1
              ? form.treatmentFacilities[1].facility
              : ''
            : '',
          '17b_date_month_2': form.treatmentFacilities
            ? form.treatmentFacilities.length > 1
              ? form.treatmentFacilities[1].notAvailable
                ? ''
                : form.treatmentFacilities[1].date
                ? form.treatmentFacilities[1].date.slice(0, 2)
                : ''
              : ''
            : '',
          '17b_date_year_2': form.treatmentFacilities
            ? form.treatmentFacilities.length > 1
              ? form.treatmentFacilities[1].notAvailable
                ? ''
                : form.treatmentFacilities[1].date
                ? form.treatmentFacilities[1].date.slice(6, 10)
                : ''
              : ''
            : '',
          '17c_opt_2': form.treatmentFacilities
            ? form.treatmentFacilities.length > 1
              ? form.treatmentFacilities[1].notAvailable
                ? true
                : false
              : false
            : false,

          '17a_str_3': form.treatmentFacilities
            ? form.treatmentFacilities.length > 2
              ? form.treatmentFacilities[2].facility
              : ''
            : '',
          '17b_date_month_3': form.treatmentFacilities
            ? form.treatmentFacilities.length > 2
              ? form.treatmentFacilities[2].notAvailable
                ? ''
                : form.treatmentFacilities[2].date
                ? form.treatmentFacilities[2].date.slice(0, 2)
                : ''
              : ''
            : '',
          '17b_date_year_3': form.treatmentFacilities
            ? form.treatmentFacilities.length > 2
              ? form.treatmentFacilities[2].notAvailable
                ? ''
                : form.treatmentFacilities[2].date
                ? form.treatmentFacilities[2].date.slice(6, 10)
                : ''
              : ''
            : '',
          '17c_opt_3': form.treatmentFacilities
            ? form.treatmentFacilities.length > 2
              ? form.treatmentFacilities[2].notAvailable
                ? true
                : false
              : false
            : false,

          '18a_opt_1': form.anotherName
            ? form.anotherName == 'Yes'
              ? true
              : false
            : false,
          '18a_opt_2': form.anotherName
            ? form.anotherName == 'No'
              ? true
              : false
            : false,
          '18b_str': form.anotherName
            ? form.anotherName == 'Yes' && form.anotherNamenamesList
              ? form.anotherNamenamesList
              : ''
            : '',
          '19a_opt_1': form.branchOfService
            ? form.branchOfService == 'Army'
              ? true
              : false
            : false,
          '19a_opt_4': form.branchOfService
            ? form.branchOfService == 'Navy'
              ? true
              : false
            : false,
          '19a_opt_7': form.branchOfService
            ? form.branchOfService == 'Marine Corps'
              ? true
              : false
            : false,
          '19a_opt_2': form.branchOfService
            ? form.branchOfService == 'Air Force'
              ? true
              : false
            : false,
          '19a_opt_5': form.branchOfService
            ? form.branchOfService == 'Coast Guard'
              ? true
              : false
            : false,
          '19a_opt_8': form.branchOfService
            ? form.branchOfService == 'Space Force'
              ? true
              : false
            : false,
          '19a_opt_3': form.branchOfService
            ? form.branchOfService == 'NOAA'
              ? true
              : false
            : false,
          '19a_opt_6': form.branchOfService
            ? form.branchOfService == 'USPHS'
              ? true
              : false
            : false,
          '19b_opt_1': form.component
            ? form.component == 'Active'
              ? true
              : false
            : false,
          '19b_opt_2': form.component
            ? form.component == 'Reserves'
              ? true
              : false
            : false,
          '19b_opt_3': form.component
            ? form.component == 'National Guard'
              ? true
              : false
            : false,
          '20a_date_month_1': form.recentDatesFrom
            ? form.recentDatesFrom.slice(0, 2)
            : '',
          '20a_date_day_1': form.recentDatesFrom
            ? form.recentDatesFrom.slice(3, 5)
            : '',
          '20a_date_year_1': form.recentDatesFrom
            ? form.recentDatesFrom.slice(6, 10)
            : '',
          '20a_date_month_2': form.recentDatesTo
            ? form.recentDatesTo.slice(0, 2)
            : '',
          '20a_date_day_2': form.recentDatesTo
            ? form.recentDatesTo.slice(3, 5)
            : '',
          '20a_date_year_2': form.recentDatesTo
            ? form.recentDatesTo.slice(6, 10)
            : '',

          '20b_str_1': form.placeOfSeparation
            ? form.placeOfSeparation.slice(0, 15)
            : '',
          '20b_str_2': form.placeOfSeparation
            ? form.placeOfSeparation.slice(15, 30)
            : '',
          '20c_opt_1': form.combatZone
            ? form.combatZone == 'Yes'
              ? true
              : false
            : false,
          '20c_opt_2': form.combatZone
            ? form.combatZone == 'No'
              ? true
              : false
            : false,

          '20b_date_month_1': form.combatZone
            ? form.combatZone == 'Yes' && form.combatZoneDateFrom
              ? form.combatZoneDateFrom.slice(0, 2)
              : ''
            : '',
          '20b_date_day_1': form.combatZone
            ? form.combatZone == 'Yes' && form.combatZoneDateFrom
              ? form.combatZoneDateFrom.slice(3, 5)
              : ''
            : '',
          '20b_date_year_1': form.combatZone
            ? form.combatZone == 'Yes' && form.combatZoneDateFrom
              ? form.combatZoneDateFrom.slice(6, 10)
              : ''
            : '',
          '20b_date_month_2': form.combatZone
            ? form.combatZone == 'Yes' && form.combatZoneDateTo
              ? form.combatZoneDateTo.slice(0, 2)
              : ''
            : '',
          '20b_date_day_2': form.combatZone
            ? form.combatZone == 'Yes' && form.combatZoneDateTo
              ? form.combatZoneDateTo.slice(3, 5)
              : ''
            : '',
          '20b_date_year_2': form.combatZone
            ? form.combatZone == 'Yes' && form.combatZoneDateTo
              ? form.combatZoneDateTo.slice(6, 10)
              : ''
            : '',

          '21a_opt_1': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes'
              ? true
              : false
            : false,
          '21a_opt_2': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'No'
              ? true
              : false
            : false,

          '21b_opt_1': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardComponent == 'National Guard'
              ? true
              : false
            : false,
          '21b_opt_2': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardComponent == 'Reserves'
              ? true
              : false
            : false,

          '21c_date_month_1': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardDateFrom
              ? form.reservesNationalGuardDateFrom.slice(0, 2)
              : ''
            : '',
          '21c_date_day_1': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardDateFrom
              ? form.reservesNationalGuardDateFrom.slice(3, 5)
              : ''
            : '',
          '21c_date_year_1': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardDateFrom
              ? form.reservesNationalGuardDateFrom.slice(6, 10)
              : ''
            : '',
          '21c_date_month_2': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardDateTo
              ? form.reservesNationalGuardDateTo.slice(0, 2)
              : ''
            : '',
          '21c_date_day_2': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardDateTo
              ? form.reservesNationalGuardDateTo.slice(3, 5)
              : ''
            : '',
          '21c_date_year_2': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardDateTo
              ? form.reservesNationalGuardDateTo.slice(6, 10)
              : ''
            : '',
          '21d_str': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardNameAddressUnit
              ? form.reservesNationalGuardNameAddressUnit
              : ''
            : '',
          '21e_str': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardPhoneNumber
              ? form.reservesNationalGuardPhoneNumber
              : ''
            : '',
          '21f_opt_1': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardTrainingPay == 'Yes'
              ? true
              : false
            : false,
          '21f_opt_2': form.reservesNationalGuard
            ? form.reservesNationalGuard == 'Yes' &&
              form.reservesNationalGuardTrainingPay == 'No'
              ? true
              : false
            : false,

          '22a_opt_1': form.federalsOrders
            ? form.federalsOrders == 'Yes'
              ? true
              : false
            : false,
          '22a_opt_2': form.federalsOrders
            ? form.federalsOrders == 'No'
              ? true
              : false
            : false,
          '22b_date_month': form.federalsOrders
            ? form.federalsOrders == 'Yes' && form.federalsOrdersActivationDate
              ? form.federalsOrdersActivationDate.slice(0, 2)
              : ''
            : '',
          '22b_date_day': form.federalsOrders
            ? form.federalsOrders == 'Yes' && form.federalsOrdersActivationDate
              ? form.federalsOrdersActivationDate.slice(3, 5)
              : ''
            : '',
          '22b_date_year': form.federalsOrders
            ? form.federalsOrders == 'Yes' && form.federalsOrdersActivationDate
              ? form.federalsOrdersActivationDate.slice(6, 10)
              : ''
            : '',
          '22c_date_month': form.federalsOrders
            ? form.federalsOrders == 'Yes' && form.federalsOrdersSeparationDate
              ? form.federalsOrdersSeparationDate.slice(0, 2)
              : ''
            : '',
          '22c_date_day': form.federalsOrders
            ? form.federalsOrders == 'Yes' && form.federalsOrdersSeparationDate
              ? form.federalsOrdersSeparationDate.slice(3, 5)
              : ''
            : '',
          '22c_date_year': form.federalsOrders
            ? form.federalsOrders == 'Yes' && form.federalsOrdersSeparationDate
              ? form.federalsOrdersSeparationDate.slice(6, 10)
              : ''
            : '',

          '23a_opt_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes'
              ? true
              : false
            : false,
          '23a_opt_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'No'
              ? true
              : false
            : false,
          '23b_from_month_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarOneDateFrom
              ? form.prisionerOfWarOneDateFrom.slice(0, 2)
              : ''
            : '',
          '23b_from_day_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarOneDateFrom
              ? form.prisionerOfWarOneDateFrom.slice(3, 5)
              : ''
            : '',
          '23b_from_year_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarOneDateFrom
              ? form.prisionerOfWarOneDateFrom.slice(6, 10)
              : ''
            : '',
          '23b_to_month_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarOneDateTo
              ? form.prisionerOfWarOneDateTo.slice(0, 2)
              : ''
            : '',
          '23b_to_day_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarOneDateTo
              ? form.prisionerOfWarOneDateTo.slice(3, 5)
              : ''
            : '',
          '23b_to_year_1': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarOneDateTo
              ? form.prisionerOfWarOneDateTo.slice(6, 10)
              : ''
            : '',
          '23b_from_month_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarTwoDateFrom
              ? form.prisionerOfWarTwoDateFrom.slice(0, 2)
              : ''
            : '',
          '23b_from_day_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarTwoDateFrom
              ? form.prisionerOfWarTwoDateFrom.slice(3, 5)
              : ''
            : '',
          '23b_from_year_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarTwoDateFrom
              ? form.prisionerOfWarTwoDateFrom.slice(6, 10)
              : ''
            : '',
          '23b_to_month_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarTwoDateTo
              ? form.prisionerOfWarTwoDateTo.slice(0, 2)
              : ''
            : '',
          '23b_to_day_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarTwoDateTo
              ? form.prisionerOfWarTwoDateTo.slice(3, 5)
              : ''
            : '',
          '23b_to_year_2': form.prisionerOfWar
            ? form.prisionerOfWar == 'Yes' && form.prisionerOfWarTwoDateTo
              ? form.prisionerOfWarTwoDateTo.slice(6, 10)
              : ''
            : '',

          '24a_opt_1': form.retiredPay
            ? form.retiredPay == 'Yes'
              ? true
              : false
            : false,
          '24a_opt_2': form.retiredPay
            ? form.retiredPay == 'No'
              ? true
              : false
            : false,
          '24b_opt_1': form.retiredPayFuture
            ? form.retiredPayFuture == 'Yes'
              ? true
              : false
            : false,
          '24b_opt_2': form.retiredPayFuture
            ? form.retiredPayFuture == 'No'
              ? true
              : false
            : false,
          '24b_str': form.retiredPayFuture
            ? form.retiredPayFuture == 'Yes' && form.retiredPayExplanation
              ? form.retiredPayExplanation
              : ''
            : '',
          '24c_opt_1':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'Army'
              ? true
              : false,
          '24c_opt_4':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'Navy'
              ? true
              : false,
          '24c_opt_7':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'Marine Corps'
              ? true
              : false,
          '24c_opt_2':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'Air Force'
              ? true
              : false,
          '24c_opt_5':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'Coast Guard'
              ? true
              : false,
          '24c_opt_8':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'Space Force'
              ? true
              : false,
          '24c_opt_3':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'NOAA'
              ? true
              : false,
          '24c_opt_6':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayBranchOfService == 'USPHS'
              ? true
              : false,
          '24d_num_1':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayMonthlyAmount
              ? form.retiredPayMonthlyAmount.slice(0, 3)
              : '',
          '24d_num_2':
            ((form.retiredPay && form.retiredPay == 'Yes') ||
              (form.retiredPayFuture && form.retiredPayFuture == 'Yes')) &&
            form.retiredPayMonthlyAmount
              ? form.retiredPayMonthlyAmount.slice(3, 6)
              : '',
          '25_opt_1': form.retiredPayRetiredStatus
            ? form.retiredPayRetiredStatus == 'Retired'
              ? true
              : false
            : false,
          '25_opt_3': form.retiredPayRetiredStatus
            ? form.retiredPayRetiredStatus ==
              'Permanent Disability Retired List'
              ? true
              : false
            : false,
          '25_opt_2': form.retiredPayRetiredStatus
            ? form.retiredPayRetiredStatus ==
              'Temporary Disability Retired List'
              ? true
              : false
            : false,
          '26_opt': form.noRetiredPayment ? true : false,
          '27a_opt_1': form.separationPay ? true : false,
          '27a_opt_2': form.separationPay ? false : true,
          '27b_date_month':
            form.separationPay && form.separationPayPaymentDate
              ? form.separationPayPaymentDate.slice(0, 2)
              : '',
          '27b_date_day':
            form.separationPay && form.separationPayPaymentDate
              ? form.separationPayPaymentDate.slice(3, 5)
              : '',
          '27b_date_year':
            form.separationPay && form.separationPayPaymentDate
              ? form.separationPayPaymentDate.slice(6, 10)
              : '',
          '27c_opt_1': form.separationPay
            ? form.separationPayBranchOfService == 'Army'
              ? true
              : false
            : false,
          '27c_opt_4': form.separationPay
            ? form.separationPayBranchOfService == 'Navy'
              ? true
              : false
            : false,
          '27c_opt_7': form.separationPay
            ? form.separationPayBranchOfService == 'Marine Corps'
              ? true
              : false
            : false,
          '27c_opt_2': form.separationPay
            ? form.separationPayBranchOfService == 'Air Force'
              ? true
              : false
            : false,
          '27c_opt_5': form.separationPay
            ? form.separationPayBranchOfService == 'Coast Guard'
              ? true
              : false
            : false,
          '27c_opt_8': form.separationPay
            ? form.separationPayBranchOfService == 'Space Force'
              ? true
              : false
            : false,
          '27c_opt_3': form.separationPay
            ? form.separationPayBranchOfService == 'NOAA'
              ? true
              : false
            : false,
          '27c_opt_6': form.separationPay
            ? form.separationPayBranchOfService == 'USPHS'
              ? true
              : false
            : false,

          '27d_num_1':
            form.separationPay && form.separationPayAmountReceived
              ? form.separationPay == 'Yes' && form.separationPayAmountReceived
                ? form.separationPayAmountReceived.slice(0, 3)
                : ''
              : '',
          '27d_num_2':
            form.separationPay && form.separationPayAmountReceived
              ? form.separationPay == 'Yes' && form.separationPayAmountReceived
                ? form.separationPayAmountReceived.slice(3, 6)
                : ''
              : '',
          '28_opt': form.noInactivePayment ? form.noInactivePayment : false,

          '29_opt': form.directDeposit ? form.directDeposit : false,

          '30_str': form.directDepositAccountNumber
            ? form.directDepositAccountNumber.slice(0, 15)
            : '',
          '30_opt_1': form.directDepositAccountType
            ? form.directDepositAccountType == 'Checking'
              ? true
              : false
            : false,
          '30_opt_2': form.directDepositAccountType
            ? form.directDepositAccountType == 'Savings'
              ? true
              : false
            : false,
          '31_str': form.directDepositFinancialInstitution
            ? form.directDepositFinancialInstitution.slice(0, 9)
            : '',
          '32_str': form.directDepositRoutingNumber
            ? form.directDepositRoutingNumber.slice(0, 9)
            : '',

          '33b_month': form.veteranDateSigned
            ? form.veteranDateSigned.slice(0, 2)
            : '',
          '33b_day': form.veteranDateSigned
            ? form.veteranDateSigned.slice(3, 5)
            : '',
          '33b_year': form.veteranDateSigned
            ? form.veteranDateSigned.slice(6, 10)
            : '',
          '34b_str': form.firstWitness ? form.firstWitness : '',
          '35b_str': form.secondWitness ? form.secondWitness : '',

          '36b_month': form.alternateSignatureDate
            ? form.alternateSignatureDate.slice(0, 2)
            : '',
          '36b_day': form.alternateSignatureDate
            ? form.alternateSignatureDate.slice(3, 5)
            : '',
          '36b_year': form.alternateSignatureDate
            ? form.alternateSignatureDate.slice(6, 10)
            : '',

          '37b_month': form.poaSignatureDate
            ? form.poaSignatureDate.slice(0, 2)
            : '',
          '37b_day': form.poaSignatureDate
            ? form.poaSignatureDate.slice(3, 5)
            : '',
          '37b_year': form.poaSignatureDate
            ? form.poaSignatureDate.slice(6, 10)
            : '',
          field390: form.signature ? form.signature : '',
        },
      },
    },
  };
  return infoToPDF;
};

export const generateNoaPdfObject = async (data, isCombined = false) => {
  const infoToPDF = {
    content: {
      documentKey: isCombined
        ? 'tpl_ehJXextj2zFG6TDCyj'
        : 'tpl_zzh2s3f5T6mHMpEAHt',
      f: {
        page_1: {
          boardDecisionDate: data?.boardDecisionDate || '',
          appeallantName: data?.appeallantName || '',
          appeallantSsn: data?.appeallantSsn || '',
          appeallantAddress1: data?.appeallantAddress?.substring(0, 25) || '',
          appeallantAddress2: data?.appeallantAddress?.substring(25, 50) || '',
          appeallantAddress3: data?.appeallantAddress?.substring(50) || '',
          phone: data?.phone || '',
          email: data?.email || '',
          relationshipToAppeallant: data?.relationshipToAppeallant || '',
          receiveEmail: data?.receiveEmail || false,
          signature: {
            base64: data?.signature || '',
          },
          ...(isCombined
            ? {
                fh_docketNo: data?.hardshipDocketNo || '',
                fh_appeallant: data?.hardshipAppeallant || '',
                fh_dateSignedAppeallant:
                  data?.hardshipDateSignedAppeallant || '',
                fh_phone: data?.hardshipPhone || '',
                fh_email: data?.hardshipEmail || '',
                fh_signature: {
                  base64: data?.signature || '',
                },
              }
            : {}),
        },
      },
    },
  };
  return infoToPDF;
};

export const generateFinancialHardshipPdfObject = async (data) => {
  const financialHardshipPdf = {
    content: {
      documentKey: 'tpl_Rj2bh2JKxHgh3SSSps',
      f: {
        page_1: {
          docketNo: data?.docketNo || '',
          appeallant: data?.appeallant || '',
          dateSignedAppeallant: data?.dateSignedAppeallant || '',
          phone: data?.phone || '',
          email: data?.email || '',
          signature: {
            base64: data?.signature || '',
          },
        },
      },
    },
  };
  return financialHardshipPdf;
};

export const generateRequestCFilePdfObject = async (form) => {
  const infoToPDF = {
    content: {
      documentKey: 'tpl_HxtgEQ7pnMTHLbPcRk',
      f: {
        page_1: {
          first_name: form.firstName ? form.firstName.slice(0, 12) : '',
          middle_initial: '',
          last_name: form.lastName ? form.lastName.slice(0, 18) : '',
          ssn1: form.ssn ? form.ssn.slice(0, 3) : '',
          ssn2: form.ssn ? form.ssn.slice(3, 5) : '',
          ssn3: form.ssn ? form.ssn.slice(5, 9) : '',
          alien_registration: form.alien ? form.alien.slice(0, 10) : '',
          va_file_number: form.currentVa ? form.currentVa.slice(0, 9) : '',

          dobmonth: form.birthday ? form.birthday.slice(0, 2) : '',
          dobday: form.birthday ? form.birthday.slice(3, 5) : '',
          dobyear: form.birthday ? form.birthday.slice(6, 10) : '',

          place_of_birth: form.placeBirth ? form.placeBirth.slice(0, 20) : '',

          street: form.street ? form.street.slice(0, 30) : '',
          apartmentorunitnumber: form.unitNumber ? form.unitNumber.slice(0, 5) : '',
          city: form.city ? form.city.slice(0, 18) : '',
          stateorprovince: form.province ? form.province.slice(0, 2) : '',
          country: form.country ? form.country.slice(0, 2) : '',
          ziporpostalcode1: form.zipCode ? form.zipCode.slice(0, 5) : '',
          ziporpostalcode2: form.zipCode ? form.zipCode.slice(6, 10) : '',

          telephonenumber_first: form.phone ? form.phone.slice(0, 3) : '',
          telephonenumber_second: form.phone ? form.phone.slice(4, 7) : '',
          telephonenumber_last: form.phone ? form.phone.slice(8, 12) : '',
          international_phone_number: form.phoneI ? form.phoneI : '',
          fax_number_first: form.fax ? form.fax.slice(0, 3) : '',
          fax_number_second: form.fax ? form.fax.slice(3, 6) : '',
          fax_number_last: form.fax ? form.fax.slice(6, 10) : '',
          international_fax_number: form.faxI ? form.faxI : '',
          i_agree_to_receive_electronic: form.emailE ? form.emailE : false,
          email_address: form.email ? form.email.slice(0, 32) : '',
          name: form.firstNameTwo ? form.firstNameTwo.slice(0, 12) : '',
          middle_initial1: '',
          last_name2: form.lastNameTwo ? form.lastNameTwo.slice(0, 18) : '',
          organization_s_name: form.organization ? form.organization.slice(0, 32) : '',
          street2: form.streetTwo ? form.streetTwo.slice(0, 30) : '',
          apartmentorunitnumber2: form.unitNumberTwo ? form.unitNumberTwo.slice(0, 5) : '',
          city2: form.cityTwo ? form.cityTwo.slice(0, 18) : '',
          stateorprovince2: form.provinceTwo ? form.provinceTwo.slice(0, 2) : '',
          country2: form.countryTwo ? form.countryTwo.slice(0, 2) : '',
          ziporpostalcode3: form.zipCodeTwo ? form.zipCodeTwo.slice(0, 5) : '',
          ziporpostalcode4: form.zipCodeTwo ? form.zipCodeTwo.slice(6, 10) : '',


          telephonenumber_firstthreenumbers: form.phoneTwo ? form.phoneTwo.slice(0, 3) : '',
          telephonenumber_secondthreenumbers: form.phoneTwo ? form.phoneTwo.slice(4, 7) : '',
          telephonenumber_lastfournumbers: form.phoneTwo ? form.phoneTwo.slice(8, 12) : '',
          international_phone_number2: form.phoneITwo ? form.phoneITwo : '',
          fax_number_firstthreenumbers: form.faxTwo ? form.faxTwo.slice(0, 3) : '',
          fax_number_secondthreenumbers: form.faxTwo ? form.faxTwo.slice(3, 6) : '',
          fax_number_lastfournumbers: form.faxTwo ? form.faxTwo.slice(6, 10) : '',
          international_fax_number2: form.faxITwo ? form.faxITwo : '',

          name3: form.firstNameThree ? form.firstNameThree.slice(0, 12) : '',
          middle_initial2: '',
          last_name3: form.lastNameThree ? form.lastNameThree.slice(0, 18) : '',
          ssn4: form.ssnThree ? form.ssnThree.slice(0, 3) : '',
          ssn5: form.ssnThree ? form.ssnThree.slice(3, 5) : '',
          ssn6: form.ssnThree ? form.ssnThree.slice(5, 9) : '',
          alien2: form.alienThree ? form.alienThree.slice(0, 10) : '',
          va_file_2: form.currentVaThree ? form.currentVaThree.slice(0, 9) : '',
          
          claims_file_c_file: form.typeOfRecords?.claimsFile ? form.typeOfRecords?.claimsFile : false,
          dd_form_214: form.typeOfRecords?.ddForm214 ? form.typeOfRecords?.ddForm214 : false,
          human_resource_records: form.typeOfRecords?.humanResourceRecords ? form.typeOfRecords?.humanResourceRecords : false,
          life_insurance_benefit_records: form.typeOfRecords?.lifeInsuranceBenefitRecords ? form.typeOfRecords?.lifeInsuranceBenefitRecords : false,
          service_treatment_records: form.typeOfRecords?.serviceTreatment ? form.typeOfRecords?.serviceTreatment : false,
          life_insurance_records: form.typeOfRecords?.lifeInsuranceRecords ? form.typeOfRecords?.lifeInsuranceRecords : false,
          home_loan_benefit_records: form.typeOfRecords?.homeLoanBenefitRecords ? form.typeOfRecords?.homeLoanBenefitRecords : false,
          disability_examinations: form.typeOfRecords?.disabilityExaminations ? form.typeOfRecords?.disabilityExaminations : false,
          vocational_rehabilitation: form.typeOfRecords?.vocationalRehabilitationRecords ? form.typeOfRecords?.vocationalRehabilitationRecords : false,
          fiduciary_services_records: form.typeOfRecords?.fiduciaryServicesRecords ? form.typeOfRecords?.fiduciaryServicesRecords : false,  
          military_to_civilian_transition_tap_documents: form.typeOfRecords?.militaryToCivilianTransition ? form.typeOfRecords?.militaryToCivilianTransition : false,
          pension_benefit_documents: form.typeOfRecords?.pensionBenefit ? form.typeOfRecords?.pensionBenefit : false,
          education_benefit_records: form.typeOfRecords?.educationBenefitRecords ? form.typeOfRecords?.educationBenefitRecords : false,
          financial_records: form.typeOfRecords?.financialRecords ? form.typeOfRecords?.financialRecords : false,
          other_specify: form.typeOfRecords?.other ? true : false,

          other_specify1: form.typeOfRecords?.other?.specify ? form.typeOfRecords?.other?.specify?.slice(0, 30) : '',
          other_specify2: form.typeOfRecords?.other?.specify ? form.typeOfRecords?.other?.specify?.slice(30, 65) : '',
          other_specify3: form.typeOfRecords?.other?.specify ? form.typeOfRecords?.other?.specify?.slice(65, 100) : '',
         

          remarks1: form.remarks ? form.remarks.slice(0, 35) : '',
          remarks2: form.remarks ? form.remarks.slice(35, 70) : '',
          remarks3: form.remarks ? form.remarks.slice(70, 105) : '',
          remarks4: form.remarks ? form.remarks.slice(105, 140) : '',
          remarks5: form.remarks ? form.remarks.slice(140, 175) : '',

          i_am_willing_to_pay: form.checkApplicableFees ? form.checkApplicableFees : false,
          amount: form.checkApplicableFees && form.amount ? form.amount.slice(0, 4) : '',
          if_you_believe_you_are_entitled: form.checkFeeWaiver ? form.checkFeeWaiver : false,
          indicate_reason: form.checkFeeWaiver && form.feeWaiver ? form.feeWaiver : '',

          field98: form.signature ? form.signature : '',
          date_signed_month: form.dateSignedOne ? form.dateSignedOne.slice(0, 2) : '',
          date_signed_day: form.dateSignedOne ? form.dateSignedOne.slice(3, 5) : '',
          date_signed_year: form.dateSignedOne ? form.dateSignedOne.slice(6, 10) : '',
          date_signed_month2:  '',
          date_signed_day2: '',
          date_signed_year2: '',
          date_signed_month3: '',
          date_signed_day3: '',
          date_signed_year3: '',
        },
      },
    },
  };
  return infoToPDF;
};

export const generateSupplementalClaimPdfObject = async (form) => { 
  const infoToPDF = {
    content: {
      documentKey: 'tpl_afR42J2pGMbtzDK66H',
      f: {
        page_1: {
          s1_str_1: form.firstName.slice(0, 12),
          s1_str_2: '',
          s1_str_3: form.lastName.slice(0, 18),
          s2_str_1: form.ssn ? form.ssn.slice(0, 3) : '',
          s2_str_2: form.ssn ? form.ssn.slice(3, 5) : '',
          s2_str_3: form.ssn ? form.ssn.slice(5, 9) : '',
          s3_str_1: form.currentVa ? form.currentVa.slice(0, 9) : '',
          s4_str_1: form.birthday.slice(0, 2),
          s4_str_2: form.birthday.slice(3, 5),
          s4_str_3: form.birthday.slice(6, 10),
          s5_str_1: form.serviceNumber ? form.serviceNumber.slice(0, 9) : '',
          s6_str_1: form.insuranceNumber ? form.insuranceNumber.slice(0, 18) : '',
          s7_str_1: form.claimantsName ? form.claimantsName.slice(0, 12) : '',
          s7_str_2: '',
          s7_str_3: form.claimantsLastName ? form.claimantsLastName.slice(0, 18) : '',
          s8_opt_1: form.claimantsRelationship ? form.claimantsRelationship == 'Veteran' ? true : false : false,
          s8_opt_2: form.claimantsRelationship ? form.claimantsRelationship == 'Veteran\'s spouse' ? true : false : false,
          s8_opt_3: form.claimantsRelationship ? form.claimantsRelationship == 'Veteran\'s child' ? true : false : false,
          s8_opt_4: form.claimantsRelationship ? form.claimantsRelationship == 'Veteran\'s parent' ? true : false : false,
          s8_opt_5: form.claimantsRelationship ? form.claimantsRelationship == 'Other' ? true : false : false,
          s8_str_6: form.claimantsRelationshipOther ? form.claimantsRelationshipOther : '',
          s9_str_1: form.street ? form.street.slice(0, 30) : '',
          s9_str_2: form.unitNumber ? form.unitNumber.slice(0, 5) : '',
          s9_str_3: form.city ? form.city.slice(0, 18) : '',
          s9_str_4: form.province ? form.province.slice(0, 2) : '',
          s9_str_5: form.country ? form.country.slice(0, 2) : '',
          s9_str_6: form.zipCode ? form.zipCode.slice(0, 5) : '',
          s9_str_7: form.zipCode ? form.zipCode.slice(6, 10) : '',
          s10_str_1: form.phone ? form.phone : '', 
          s11_str_1: form.email ? form.email : '',

          s12_opt_1: form.benefitType ? form.benefitType == 'Compensation' ? true : false : false,    
          s12_opt_2: form.benefitType ? form.benefitType == 'Pensions/Survivors Benefits' ? true : false : false,
          s12_opt_3: form.benefitType ? form.benefitType == 'Fiduciary' ? true : false : false,
          s12_opt_4: form.benefitType ? form.benefitType == 'Life Insurance' ? true : false : false,
          s12_opt_5: form.benefitType ? form.benefitType == 'Veterans Health Administration' ? true : false : false,
          s12_opt_6: form.benefitType ? form.benefitType == 'Veteran Readiness and Employment' ? true : false : false,
          s12_opt_7: form.benefitType ? form.benefitType == 'Loan Guaranty' ? true : false : false,
          s12_opt_8: form.benefitType ? form.benefitType == 'Education' ? true : false : false,
          s12_opt_9: form.benefitType ? form.benefitType == 'National Cemetery Administration' ? true : false : false,
      

          s13_opt_1:  form.optIn ? form.optIn : false,


          s13_str_1: form.issues && form.issues.length > 0 ? form.issues?.[0]?.['specificIssue'] : '',
          s13b_date_1: form.issues && form.issues.length > 0 ? form.issues?.[0]?.['date'] : '',
          s13_str_2: form.issues && form.issues.length > 1 ? form.issues?.[1]?.['specificIssue'] : '',
          s13b_date_2: form.issues && form.issues.length > 1 ? form.issues?.[1]?.['date'] : '',
          s13_str_3: form.issues && form.issues.length > 2 ? form.issues?.[2]?.['specificIssue'] : '',
          s13b_date_3: form.issues && form.issues.length > 2 ? form.issues?.[2]?.['date'] : '',
          s13_str_4: form.issues && form.issues.length > 3 ? form.issues?.[3]?.['specificIssue'] : '',
          s13b_date_4: form.issues && form.issues.length > 3 ? form.issues?.[3]?.['date'] : '',
          s13_str_5: form.issues && form.issues.length > 4  ? form.issues?.[4]?.['specificIssue'] : '',
          s13b_date_5: form.issues && form.issues.length > 4  ? form.issues?.[4]?.['date'] : '',
          s13_str_6: form.issues && form.issues.length > 5  ? form.issues?.[5]?.['specificIssue'] : '',
          s13b_date_6: form.issues && form.issues.length > 5  ? form.issues?.[5]?.['date'] : '',
          s13_str_7: form.issues && form.issues.length > 6    ? form.issues?.[6]?.['specificIssue'] : '',
          s13b_date_7: form.issues && form.issues.length > 6    ? form.issues?.[6]?.['date'] : '',

          s15a_str_1: form.federalRecords && form.federalRecords.length > 0 ? form.federalRecords?.[0]?.['facilityName'] : '',
          s15b_date_1: form.federalRecords && form.federalRecords.length > 0 ? form.federalRecords?.[0]?.['dateOfRecords'] : '',
          s15a_str_2: form.federalRecords && form.federalRecords.length > 1 ? form.federalRecords?.[1]?.['facilityName'] : '',
          s15b_date_2: form.federalRecords && form.federalRecords.length > 1 ? form.federalRecords?.[1]?.['dateOfRecords'] : '',
          s15a_str_3: form.federalRecords && form.federalRecords.length > 2 ? form.federalRecords?.[2]?.['facilityName'] : '',
          s15b_date_3: form.federalRecords && form.federalRecords.length > 2 ? form.federalRecords?.[2]?.['dateOfRecords'] : '',
         
         
          s16_opt_1: form.noticeAcknowledgement == 'Yes' ? true : false,
          s16_opt_2: form.noticeAcknowledgement == 'No' ? true : false,

          s17b_date_1: form.veteranDateSigned ? form.veteranDateSigned : '',
          s17c_str_1: form.vaAuthorizedRepresentative ? form.vaAuthorizedRepresentative : '',
          s18b_date_1: form.veteranDateSigned ? form.veteranDateSigned : '',
          s18c_str_1: form.alternateSignerName ? form.alternateSignerName : '',
          field66: form.signature ? form.signature : '',
        },
      },
    },
  };
  return infoToPDF;
};

export const generateHigherLevelReviewPdfObject = async (form) => {
  const infoToPDF = {
    content: {
      documentKey: 'tpl_5JYHXZrKMAS42Q6tZT',
      f: {
        page_1: {
          s1_str_1: form.firstName.slice(0, 12),
          s1_str_2: '',
          s1_str_3: form.lastName.slice(0, 18),
          s2_str_1: form.ssn ? form.ssn.slice(0, 3) : '',
          s2_str_2: form.ssn ? form.ssn.slice(3, 5) : '',
          s2_str_3: form.ssn ? form.ssn.slice(5, 9) : '',
          s3_str_1: form.currentVa ? form.currentVa.slice(0, 9) : '',
          s4_str_1: form.birthday ? form.birthday.slice(0, 2) : '',
          s4_str_2: form.birthday ? form.birthday.slice(3, 5) : '',
          s4_str_3: form.birthday ? form.birthday.slice(6, 10) : '',
          s5_str_1: form.insuranceNumber ? form.insuranceNumber.slice(0, 18) : '',
          s6_str_1: form.street ? form.street.slice(0, 30) : '',
          s6_str_2: form.unitNumber ? form.unitNumber.slice(0, 5) : '',
          s6_str_3: form.city ? form.city.slice(0, 18) : '',
          s6_str_4: form.province ? form.province.slice(0, 2) : '',
          s6_str_5: form.country ? form.country.slice(0, 2) : '',
          s6_str_6: form.zipCode ? form.zipCode.slice(0, 5) : '',
          s6_str_7: form.zipCode ? form.zipCode.slice(6, 10) : '',
          s6_opt_8: form.homeless ? form.homeless : false,
          s7_str_1: form.phone ? form.phone.slice(0, 3) : '',
          s7_str_2: form.phone ? form.phone.slice(4, 7) : '',
          s7_str_3: form.phone ? form.phone.slice(8, 12) : '',
          s7_str_4: form.phoneI ? form.phoneI : '',
          s8_str_1: form.email ? form.email.slice(0, 30) : '',
          s9_str_1: form.vet && form.claimantsName ? form.claimantsName.slice(0, 12) : '',
          s9_str_2: '',
          s9_str_3: form.vet && form.claimantsLastName ? form.claimantsLastName.slice(0, 18) : '',
          s10_str_1: form.vet && form.claimantsSsn ? form.claimantsSsn.slice(0, 3) : '',
          s10_str_2: form.vet && form.claimantsSsn ? form.claimantsSsn.slice(3, 5) : '',
          s10_str_3: form.vet && form.claimantsSsn ? form.claimantsSsn.slice(5, 9) : '',


          s11_str_1: form.vet && form.claimantsBirthday ? form.claimantsBirthday.slice(0, 2) : '',
          s11_str_2: form.vet && form.claimantsBirthday ? form.claimantsBirthday.slice(3, 5) : '',
          s11_str_3: form.vet && form.claimantsBirthday ? form.claimantsBirthday.slice(6, 10) : '',


          s12_str_1: form.vet && form.claimantsStreet ? form.claimantsStreet.slice(0, 30) : '',
          s12_str_2: form.vet && form.claimantsUnitNumber ? form.claimantsUnitNumber.slice(0, 5) : '',
          s12_str_3: form.vet && form.claimantsCity ? form.claimantsCity.slice(0, 18) : '',
          s12_str_4: form.vet && form.claimantsProvince ? form.claimantsProvince.slice(0, 2) : '',
          s12_str_5: form.vet && form.claimantsCountry ? form.claimantsCountry.slice(0, 2) : '',


          s12_str_6: form.vet && form.claimantsZipCode ? form.claimantsZipCode.slice(0, 5) : '',
          s12_str_7: form.vet && form.claimantsZipCode ? form.claimantsZipCode.slice(6, 10) : '',

          s13_str_1: form.vet && form.claimantsPhone ? form.claimantsPhone.slice(0, 3) : '',
          s13_str_2: form.vet && form.claimantsPhone ? form.claimantsPhone.slice(4, 7) : '',
          s13_str_3: form.vet && form.claimantsPhone ? form.claimantsPhone.slice(8, 12) : '',
          s13_str_4: form.vet && form.claimantsPhoneI ? form.claimantsPhoneI : '',
          s14_str_1: form.vet && form.claimantsEmail ? form.claimantsEmail.slice(0, 30) : '',



          s15_opt_1: form.benefitType == 'Compensation' ? true : false,
          s15_opt_3: form.benefitType == 'Pensions/Survivors Benefits' ? true : false,
          s15_opt_4: form.benefitType == 'Fiduciary' ? true : false,
          s15_opt_6: form.benefitType == 'Education' ? true : false,
          s15_opt_8: form.benefitType == 'Veterans Health Administration' ? true : false,
          s15_opt_2: form.benefitType == 'Veteran Readiness and Employment' ? true : false,
          s15_opt_5: form.benefitType == 'Loan Guaranty' ? true : false,
          s15_opt_7: form.benefitType == 'Life Insurance' ? true : false,
          s15_opt_9: form.benefitType == 'National Cemetery Administration' ? true : false,


          s16a_opt_1: form.isInformalConference ? form.isInformalConference : false,

          s16b_opt_1: form.isInformalConference && form.informalConferenceContact == 'b8:12' ? true : false,
          s16b_opt_3: form.isInformalConference && form.informalConferenceContact == 'b12:4.30' ? true : false,
          s16b_opt_2: form.isInformalConference && form.informalConferenceContact == 'rb8:12' ? true : false,
          s16b_opt_4: form.isInformalConference && form.informalConferenceContact == 'rb12:4.30' ? true : false,



          s17a_str_1: form.rName ? form.rName.slice(0, 12) : '',
          s17a_str_2: form.rLastName ? form.rLastName.slice(0, 18) : '',
          s17b_str_1: form.rPhone ? form.rPhone.slice(0, 3) : '',
          s17b_str_2: form.rPhone ? form.rPhone.slice(4, 7) : '',
          s17b_str_3: form.rPhone ? form.rPhone.slice(8, 12) : '',
          s17c_str_1: form.rEmail ? form.rEmail.slice(0, 30) : '',


          s18a_str_1: form.issues && form.issues.length > 0 ? form.issues?.[0]?.['specificIssue'] : '',
          s18b_month_1: form.issues && form.issues.length > 0 ? form.issues[0]?.['date'] ? form.issues[0]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_1: form.issues && form.issues.length > 0 ? form.issues[0]?.['date'] ? form.issues[0]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_1: form.issues && form.issues.length > 0 ? form.issues[0]?.['date'] ? form.issues[0]?.['date']?.slice(6, 10) : '' : '',   

          s18a_str_2: form.issues && form.issues.length > 1 ? form.issues?.[1]?.['specificIssue'] : '',
          s18b_month_2: form.issues && form.issues.length > 1 ? form.issues[1]?.['date'] ? form.issues[1]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_2: form.issues && form.issues.length > 1 ? form.issues[1]?.['date'] ? form.issues[1]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_2: form.issues && form.issues.length > 1 ? form.issues[1]?.['date'] ? form.issues[1]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_3: form.issues && form.issues.length > 2 ? form.issues?.[2]?.['specificIssue'] : '',
          s18b_month_3: form.issues && form.issues.length > 2 ? form.issues[2]?.['date'] ? form.issues[2]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_3: form.issues && form.issues.length > 2 ? form.issues[2]?.['date'] ? form.issues[2]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_3: form.issues && form.issues.length > 2 ? form.issues[2]?.['date'] ? form.issues[2]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_4: form.issues && form.issues.length > 3 ? form.issues?.[3]?.['specificIssue'] : '',
          s18b_month_4: form.issues && form.issues.length > 3 ? form.issues[3]?.['date'] ? form.issues[3]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_4: form.issues && form.issues.length > 3 ? form.issues[3]?.['date'] ? form.issues[3]?.['date']?.slice(3, 5) : '' : '', 
          s18b_year_4: form.issues && form.issues.length > 3 ? form.issues[3]?.['date'] ? form.issues[3]?.['date']?.slice(6, 10) : '' : '', 

          s18a_str_5: form.issues && form.issues.length > 4 ? form.issues?.[4]?.['specificIssue'] : '',
          s18b_month_5: form.issues && form.issues.length > 4 ? form.issues[4]?.['date'] ? form.issues[4]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_5: form.issues && form.issues.length > 4 ? form.issues[4]?.['date'] ? form.issues[4]?.['date']?.slice(3, 5) : '' : '', 
          s18b_year_5: form.issues && form.issues.length > 4 ? form.issues[4]?.['date'] ? form.issues[4]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_6: form.issues && form.issues.length > 5 ? form.issues?.[5]?.['specificIssue'] : '',
          s18b_month_6: form.issues && form.issues.length > 5 ? form.issues[5]?.['date'] ? form.issues[5]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_6: form.issues && form.issues.length > 5 ? form.issues[5]?.['date'] ? form.issues[5]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_6: form.issues && form.issues.length > 5 ? form.issues[5]?.['date'] ? form.issues[5]?.['date']?.slice(6, 10) : '' : '', 

          s18a_str_7: form.issues && form.issues.length > 6 ? form.issues?.[6]?.['specificIssue'] : '',
          s18b_month_7: form.issues && form.issues.length > 6 ? form.issues[6]?.['date'] ? form.issues[6]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_7: form.issues && form.issues.length > 6 ? form.issues[6]?.['date'] ? form.issues[6]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_7: form.issues && form.issues.length > 6 ? form.issues[6]?.['date'] ? form.issues[6]?.['date']?.slice(6, 10) : '' : '',


          s18a_str_8: form.issues && form.issues.length > 7 ? form.issues?.[7]?.['specificIssue'] : '',
          s18b_month_8: form.issues && form.issues.length > 7 ? form.issues[7]?.['date'] ? form.issues[7]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_8: form.issues && form.issues.length > 7 ? form.issues[7]?.['date'] ? form.issues[7]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_8: form.issues && form.issues.length > 7 ? form.issues[7]?.['date'] ? form.issues[7]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_9: form.issues && form.issues.length > 8 ? form.issues?.[8]?.['specificIssue'] : '',
          s18b_month_9: form.issues && form.issues.length > 8 ? form.issues[8]?.['date'] ? form.issues[8]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_9: form.issues && form.issues.length > 8 ? form.issues[8]?.['date'] ? form.issues[8]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_9: form.issues && form.issues.length > 8 ? form.issues[8]?.['date'] ? form.issues[8]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_10: form.issues && form.issues.length > 9 ? form.issues?.[9]?.['specificIssue'] : '',
          s18b_month_10: form.issues && form.issues.length > 9 ? form.issues[9]?.['date'] ? form.issues[9]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_10: form.issues && form.issues.length > 9 ? form.issues[9]?.['date'] ? form.issues[9]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_10: form.issues && form.issues.length > 9 ? form.issues[9]?.['date'] ? form.issues[9]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_11: form.issues && form.issues.length > 10 ? form.issues?.[10]?.['specificIssue'] : '',
          s18b_month_11: form.issues && form.issues.length > 10 ? form.issues[10]?.['date'] ? form.issues[10]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_11: form.issues && form.issues.length > 10 ? form.issues[10]?.['date'] ? form.issues[10]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_11: form.issues && form.issues.length > 10 ? form.issues[10]?.['date'] ? form.issues[10]?.['date']?.slice(6, 10) : '' : '', 

          s18a_str_12: form.issues && form.issues.length > 11 ? form.issues?.[11]?.['specificIssue'] : '',
          s18b_month_12: form.issues && form.issues.length > 11 ? form.issues[11]?.['date'] ? form.issues[11]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_12: form.issues && form.issues.length > 11 ? form.issues[11]?.['date'] ? form.issues[11]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_12: form.issues && form.issues.length > 11 ? form.issues[11]?.['date'] ? form.issues[11]?.['date']?.slice(6, 10) : '' : '',

          s18a_str_13: form.issues && form.issues.length > 12 ? form.issues?.[12]?.['specificIssue'] : '',
          s18b_month_13: form.issues && form.issues.length > 12 ? form.issues[12]?.['date'] ? form.issues[12]?.['date']?.slice(0, 2) : '' : '',
          s18b_day_13: form.issues && form.issues.length > 12 ? form.issues[12]?.['date'] ? form.issues[12]?.['date']?.slice(3, 5) : '' : '',
          s18b_year_13: form.issues && form.issues.length > 12 ? form.issues[12]?.['date'] ? form.issues[12]?.['date']?.slice(6, 10) : '' : '',


          s19b_str_1: form.dateSigned ? form.dateSigned.slice(0, 2) : '',
          s19b_str_2: form.dateSigned ? form.dateSigned.slice(3, 5) : '',
          s19b_str_3: form.dateSigned ? form.dateSigned.slice(6, 10) : '',


          s20a_str_1: form.veteranFirstName ? form.veteranFirstName.slice(0, 12) : '',
          s20a_str_2: form.veteranLastName ? form.veteranLastName.slice(0, 18) : '',
          s20c_str_1: form.veteranDateSigned ? form.veteranDateSigned.slice(0, 2) : '',
          s20c_str_2: form.veteranDateSigned ? form.veteranDateSigned.slice(3, 5) : '',
          s20c_str_3: form.veteranDateSigned ? form.veteranDateSigned.slice(6, 10) : '',

          field125: form.signature ? form.signature : '',
        },
      },
    },
  };
  return infoToPDF;
};
