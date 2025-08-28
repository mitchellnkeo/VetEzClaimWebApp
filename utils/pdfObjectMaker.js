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
