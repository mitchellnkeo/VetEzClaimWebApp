import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { NewClaimFileValidation } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData, disabilityData } from '@/utils/staticData';
import Divider from '@/components/Common/Divider';
import OptionSelector from '@/components/Common/OptionSelector';
import Switch from '@/components/Common/Switch';
import { GetErrorFieldsString } from '@/utils/utils';
import { NewClaimFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateNewClaimPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ErrorMessage } from 'formik';
import Breadcrumb from '@/components/Common/Breadcrumb';

const programData = [
  'FDC Program',
  'Standard Claim Progress',
  'IDES',
  'BDD Program Claim',
];

const typesOfAddressChangeData = ['Permanent', 'Temporary'];
const directDepositAccountTypeData = ['Checking', 'Savings'];
const yesNoData = ['Yes', 'No'];

const receivingEmail = [
  {
    option:
      'I agree to receive electronic correspondence from VA in regards to my claim',
    isSelected: false,
  },
];

const currentEmpoyee = [
  {
    option:
      'If you are currently a VA employee, check the box (includes work study/internship).',
    isSelected: false,
  },
];

const livingSituationData = [
  {
    option: 'Living in a homeless shelter',
    isSelected: false,
  },
  {
    option:
      'Not currently in a sheltered enviroment (e.g., living in a car or tent)',
    isSelected: false,
  },
  {
    option: 'Staying with another person',
    isSelected: false,
  },
  {
    option: 'Fleeing current residence',
    isSelected: false,
  },
  {
    option: 'Other',
    isSelected: false,
  },
];

const livingSituationDataForRisk = [
  {
    option: 'Housing will be lost in 30 days',
    isSelected: false,
  },
  {
    option: 'Leaving publicly funded system of care (e.g., homeless shelter)',
    isSelected: false,
  },
  {
    option: 'Other',
    isSelected: false,
  },
];

const exposedStatusData = [
  { option: 'Asbestos', isSelected: false },
  { option: 'Mustard gas', isSelected: false },
  { option: 'Radiation', isSelected: false },
  { option: 'SHAD (Shipboard Hazard and Defense)', isSelected: false },
  {
    option: 'Military occupational specialty (MOS)-related toxin',
    isSelected: false,
  },
  { option: 'Contaminated water at Camp Lejeune', isSelected: false },
  { option: 'Other', isSelected: false },
];

const notAvailableOption = [
  {
    option: 'Check the box if you do not have date(s) of treatment',
    isSelected: false,
  },
];

const branchOfServiceData = [
  'Army',
  'Navy',
  'Marine Corps',
  'Air Force',
  'Coast Guard',
  'Space Force',
  'NOAA',
  'USPHA',
];

const componentData = ['Active', 'Reserves', 'National Guard'];
const reserveComponentData = ['National Guard', 'Reserves'];

const retiredStatus = [
  'Retired',
  'Permanent Disability Retired List',
  'Temporary Disability Retired List',
];

const noRetiredPaymentOption = [
  {
    option:
      'Do NOT pay me VA compensation. I do NOT want to receive VA compensation in lieu of retired pay.',
    isSelected: false,
  },
];

const noInactivePaymentOption = [
  {
    option:
      'Do NOT pay me VA compensation. I do NOT want to receive VA compensation in lieu of training pay.',
    isSelected: false,
  },
];

const directDepositOption = [
  {
    option:
      'I CERTIFY THAT I DO NOT HAVE AN ACCOUNT WITH A FINANCIAL INSTITUTION OR CERTIFIED PAYMENT AGENT.',
    isSelected: false,
  },
];

const signatureOption = [
  {
    option: 'Signature of veteran/claimant/authorized agent (Required)',
    isSelected: true,
  },
];

const alternateSignatureOption = [
  {
    option: 'Alternate Signer Signature',
    isSelected: true,
  },
];

const poaSignatureOption = [
  {
    option: 'POA/Authorized Representative Signature',
    isSelected: true,
  },
];

export default function NewClaimForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, uid } = useSelector((state) => state.auth);
  const [recordExists, setRecordsExists] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [urlDocspring, setUrlDocspring] = useState('');
  const [guid, setGuid] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [count, setCount] = useState(0);
  const router = useRouter();
  const { ['in-progress']: inProgress } = router.query;


  const [initialValues, setInitialValues] = useState({
    program: '',
    firstName: '',
    lastName: '',
    ssn: '',
    claim: '',
    currentVa: '',
    birthday: '',
    serviceNumber: '',
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    country: 'US',
    zipCode: '',
    phone: '',
    phoneI: '',
    emailE: receivingEmail,
    //new_fields,
    bddDate: '',
    email: '',
    currentlyEmployee: currentEmpoyee,

    // section II, new address
    typeAddressChange: '',
    newAddressstreet: '',
    newAddressunitNumber: '',
    newAddresscity: '',
    newAddressprovince: '',
    newAddresscountry: 'US',
    newAddresszipCode: '',
    newAddressEffectiveBeginning: '',
    newAddressEffectiveEnding: '',

    // section III
    currentlyHomeless: '',
    currentlyHomelesslivingSituationHolder: livingSituationData,
    currentlyHomelesslivingSituation: '',
    currentlyHomelessspecify: '',
    riskOfHomeless: '',
    riskOfHomelesslivingSituationHolder: livingSituationDataForRisk,
    riskOfHomelesslivingSituation: '',
    riskOfHomelessspecify: '',
    pointOfContactName: '',
    pointOfContactTelephone: '',
    pointOfContactTelephoneI: '',

    // Section IV
    toxicExposures: '',
    hazardLocation: '',
    hazardLocationDateFrom: '',
    hazardLocationDateTo: '',
    herbicideLocation: '',
    herbicideLocationDateFrom: '',
    herbicideLocationDateTo: '',
    herbicideLocationList: '',
    haveExposed: exposedStatusData,
    haveExposed_Asbestos: false,
    haveExposed_MustardGas: false,
    haveExposed_Radiation: false,
    haveExposed_SHAD: false,
    haveExposed_MOSRelatedToxin: false,
    haveExposed_ContaminatedWater: false,
    haveExposed_Other: false,
    haveExposed_OtherSpecify: '',
    haveExposed_dateFrom: '',
    haveExposed_dateTo: '',
    haveExposed_multipleTimes: '',

    // Section V
    disabilities: [
      {
        currentDisability: '',
        specifications: '',
        explanation: '',
        date: '',
      },
    ],
    treatmentFacilities: [
      {
        facility: '',
        date: '',
        notAvailable: notAvailableOption,
      },
    ],
    // section VI
    anotherName: '',
    anotherNamenamesList: '',
    branchOfService: '',
    component: '',
    recentDatesFrom: '',
    recentDatesTo: '',
    placeOfSeparation: '',
    combatZone: '',
    combatZoneDateFrom: '',
    combatZoneDateTo: '',
    reservesNationalGuard: '',
    reservesNationalGuardComponent: '',
    reservesNationalGuardDateFrom: '',
    reservesNationalGuardDateTo: '',
    reservesNationalGuardNameAddressUnit: '',
    reservesNationalGuardPhoneNumber: '',
    reservesNationalGuardTrainingPay: '',
    federalsOrders: '',
    federalsOrdersActivationDate: '',
    federalsOrdersSeparationDate: '',

    prisionerOfWar: '',
    prisionerOfWarOneDateFrom: '',
    prisionerOfWarOneDateTo: '',
    prisionerOfWarTwoDateFrom: '',
    prisionerOfWarTwoDateTo: '',

    //Section VII
    retiredPay: '',
    retiredPayFuture: '',
    retiredPayExplanation: '',
    retiredPayBranchOfService: '',
    retiredPayMonthlyAmount: '',
    retiredPayRetiredStatus: '',
    noRetiredPayment: noRetiredPaymentOption,
    separationPay: '',
    separationPayPaymentDate: '',
    separationPayBranchOfService: '',
    separationPayAmountReceived: '',
    noInactivePayment: noInactivePaymentOption,

    directDeposit: directDepositOption,
    veteranDateSigned: '',
    directDepositAccountNumber: '',
    directDepositRoutingNumber: '',
    directDepositFinancialInstitution: '',
    directDepositAccountType: '',

    signature: '',
    signatureOption: signatureOption,

    firstWitness: '',
    secondWitness: '',
    alternateSignatureDate: '',
    alternateSignature: alternateSignatureOption,
    poaSignatureDate: '',
    poaSignature: poaSignatureOption,
  });

  return (
    <FrontLayout title="New Claim or Increas (Form 21-526EZ)">
      <Breadcrumb
        preUrl="/forms/menu"
        preTitle="Form Menu"
        currentTitle="New Claim or Increase (Form 21-526EZ)"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={NewClaimFileValidation}
      >
        {({
          values,
          setValues,
          setFieldValue,
          errors,
          touched,
          setTouched,
          validateForm,
          setFieldTouched,
        }) => {
          const livingSituationCallback = (selectedOptions) => {
            let selectedValue = '';
            let othersData = '';
            const selected = selectedOptions.filter((o, i) => o.isSelected);

            if (selected.length > 0) {
              const chosen = selected[0];

              switch (chosen.option) {
                case 'Living in a homeless shelter':
                  selectedValue = 'Shelter';
                  break;
                case 'Not currently in a sheltered enviroment (e.g., living in a car or tent)':
                  selectedValue = 'Non-sheltered Environment';
                  break;
                case 'Staying with another person':
                  selectedValue = 'Another Person';
                  break;
                case 'Fleeing current residence':
                  selectedValue = 'Fleeing Residence';
                  break;
                case 'Other':
                  selectedValue = 'Other';
                  othersData = chosen.value || '';
                  break;
                default:
                  selectedValue = '';
                  break;
              }
            }

            setValues({
              ...values,
              currentlyHomelesslivingSituation: selectedValue,
              currentlyHomelessspecify: othersData,
              currentlyHomelesslivingSituationHolder: selectedOptions,
            });
          };

          const riskOfHomelessCallback = async (selectedOptions) => {
            let selectedValue = '';
            let othersData = '';
            const selected = selectedOptions.filter((o, i) => o.isSelected);

            if (selected.length > 0) {
              const chosen = selected[0];
              selectedValue = chosen.option;
              if (selectedValue === 'Other') {
                othersData = chosen.value || '';
              }
            }
            setValues({
              ...values,
              riskOfHomelesslivingSituation: selectedValue,
              riskOfHomelessspecify: othersData,
              riskOfHomelesslivingSituationHolder: selectedOptions,
            });
          };

          const exposedDataCallback = async (selectedOptions) => {
            const optionToFieldMap = {
              Asbestos: 'haveExposed_Asbestos',
              'Mustard gas': 'haveExposed_MustardGas',
              Radiation: 'haveExposed_Radiation',
              'SHAD (Shipboard Hazard and Defense)': 'haveExposed_SHAD',
              'Military occupational specialty (MOS)-related toxin':
                'haveExposed_MOSRelatedToxin',
              'Contaminated water at Camp Lejeune':
                'haveExposed_ContaminatedWater',
              Other: 'haveExposed_Other',
            };

            for (let item of selectedOptions) {
              const fieldName = optionToFieldMap[item.option];
              if (!fieldName) continue;
              const currentValue = values[fieldName];
              if (currentValue !== item.isSelected) {
                await setFieldValue(fieldName, item.isSelected);
              }
              if (item.option === 'Other' && item.isSelected) {
                await setFieldValue('haveExposed_OtherSpecify', item.value);
              }
            }
          };

          const loadDataFromLocalStorage = async () => {
            process.env.NODE_ENV === 'development' &&
              console.log('loading data from local storage : ', user);
            await setValues({
              ...values,
              firstName: user.firstName ? user.firstName : '',
              lastName: user.lastName ? user.lastName : '',
              ssn: user.ssn ? user.ssn : '',
              birthday: user.birthday ? user.birthday : '',
              phone: user.phone ? user.phone : '',
              email: user.email ? user.email : '',
              street: user.street ? user.street : '',
              unitNumber: user.unitNumber ? user.unitNumber : '',
              city: user.city ? user.city : '',
              province: user.province ? user.province : '',
              zipCode: user.zipCode ? user.zipCode : '',
              signature: user.signature ? user.signature : '',
            });
          };

          const loadDataFromFirebase = async (data) => {
            var dataBody = {
              ...data,
              emailE: data.emailE
                ? [{ ...receivingEmail[0], isSelected: true }]
                : [...receivingEmail],

              currentlyEmployee: data.currentlyEmployee
                ? [{ ...currentEmpoyee[0], isSelected: true }]
                : [...currentEmpoyee],

              signatureOption: data.signatureOption
                ? [{ ...signatureOption[0], isSelected: true }]
                : [...signatureOption],

              noInactivePayment: data.noInactivePayment
                ? [{ ...noInactivePaymentOption[0], isSelected: true }]
                : [...noInactivePaymentOption],

              noRetiredPayment: data.noRetiredPayment
                ? [{ ...noRetiredPaymentOption[0], isSelected: true }]
                : [...noRetiredPaymentOption],

              directDeposit: data.directDeposit
                ? [{ ...directDepositOption[0], isSelected: true }]
                : [...directDepositOption],

              alternateSignature: data.alternateSignature
                ? [{ ...alternateSignatureOption[0], isSelected: true }]
                : [...alternateSignatureOption],

              poaSignature: data.poaSignature
                ? [{ ...poaSignatureOption[0], isSelected: true }]
                : [...poaSignatureOption],

              treatmentFacilities: data.treatmentFacilities.map((item) => ({
                facility: item.facility,
                date: item.date,
                notAvailable: item.notAvailable
                  ? [{ ...notAvailableOption[0], isSelected: true }]
                  : [...notAvailableOption],
              })),
            };

            setValues(dataBody);
          };

          const loadData = async () => {
            setIsLoading(true);
            const data = await getFormData({
              uid: uid,
              formName: 'newclaim',
            });
            if (data) {
              setRecordsExists(true);
              setUrlDocspring(
                data?.urlDocspring === undefined ? '' : data.urlDocspring
              );
              setGuid(data?.guid === undefined ? '' : data.guid);
              setTimestamp(data?.timestamp === undefined ? '' : data.timestamp);
              setCount(data?.count === undefined ? 0 : data.count);
              const isUploaded = data?.isUploadedAlready || false;

              if (inProgress === 'true') {
                await loadDataFromFirebase(data);
                setIsLoading(false);
              } else if (isUploaded) {
                await loadDataFromLocalStorage();
                setIsLoading(false);
              } else {
                setToastConfig({
                  title: 'VetEZ Claim',
                  message: `Do you want to continue with the existing form?`,
                  primaryButtonText: 'Yes',
                  primaryButtonAction: async () => {
                    setToastOpen(false);
                    await loadDataFromFirebase(data);
                    setIsLoading(false);
                  },
                  secondaryButtonText: 'No',
                  secondaryButtonAction: async () => {
                    setToastOpen(false);
                    await loadDataFromLocalStorage();
                    setIsLoading(false);
                  },
                });
                setToastOpen(true);
              }
            } else {
              await loadDataFromLocalStorage();
            }
            setIsLoading(false);
          };

          useEffect(() => {
            if (!router.isReady) return;
            loadData();
          }, [uid, router.isReady, router.query]);

          const transformFormValues = async (formData) => {
            return {
              ...formData,
              emailE: formData.emailE?.[0]?.isSelected || false,
              currentlyEmployee:
                formData.currentlyEmployee?.[0]?.isSelected || false,
              signatureOption:
                formData.signatureOption?.[0]?.isSelected || false,
              noInactivePayment:
                formData.noInactivePayment?.[0]?.isSelected || false,
              noRetiredPayment:
                formData.noRetiredPayment?.[0]?.isSelected || false,
              directDeposit: formData.directDeposit?.[0]?.isSelected || false,
              alternateSignature:
                formData.alternateSignature?.[0]?.isSelected || false,
              poaSignature: formData.poaSignature?.[0]?.isSelected || false,
              treatmentFacilities: formData.treatmentFacilities.map((item) => ({
                facility: item.facility,
                date: item.date,
                notAvailable: item.notAvailable?.[0]?.isSelected || false,
              })),
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            var formData = await transformFormValues(values);
            formData = { ...formData, ...fields };
            try {
              await postFormData({
                docName: 'newclaim',
                uid: uid,
                formId: '21-526EZ',
                recordExists: recordExists,
                formData: formData,
              });
              return true;
            } catch (error) {
              if (isFromSaveData) {
                toast.error('Save failed. Something went wrong!');
                return false;
              }
            }
          };

          const handleSaveOperation = async () => {
            setIsLoading(true);
            var saveStatus = await saveData({ isUploadedAlready: false }, true);
            setIsLoading(false);
            if (saveStatus) {
              toast.success('Saved successfully!');
            }
          };

          const generatePdf = async (formValues, isFromGeneratePdf = false) => {
            setIsLoading(true);
            const formData = await transformFormValues(formValues);
            const pdfObject = await generateNewClaimPdfObject(formData);
            process.env.NODE_ENV === 'development' &&
              console.log('pdfObject >> ', pdfObject);
            await generatePdfService(pdfObject, 'generatepdf6')
              .then(async (res) => {
                process.env.NODE_ENV === 'development' &&
                  console.log('generatePdf >> res : ', res);
                if (isFromGeneratePdf) {
                  await saveData({ pdf: true }, false);
                }
                setIsLoading(false);
                window.open(res?.download_url, '_blank');
              })
              .catch((err) => {
                toast.error('Error generating PDF. Please try again.');
              })
              .finally(() => {
                setIsLoading(false);
              });
          };

          const buildTouched = (obj) => {
            if (Array.isArray(obj)) {
              return obj.map((item) => buildTouched(item));
            } else if (typeof obj === 'object' && obj !== null) {
              return Object.keys(obj).reduce((acc, key) => {
                acc[key] = buildTouched(obj[key]);
                return acc;
              }, {});
            }
            return true;
          };

          const setTouchedAction = () => {
            setTouched(buildTouched(values));
          };

          const onViewDetails = async () => {
            await generatePdf(initialValues, false);
          };

          const onSave = async () => {
            setTouchedAction();
            const allErrors = await validateForm();
            process.env.NODE_ENV === 'development' && console.log(allErrors);
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              NewClaimFileMap
            );

            if (hasErrors) {
              setToastConfig({
                title: 'VetEZ Claim',
                message: `The following fields are missing: ${missingFields}`,
                primaryButtonText: 'Save Anyway',
                primaryButtonAction: async () => {
                  setToastOpen(false);
                  await handleSaveOperation();
                },
                secondaryButtonText: 'Cancel',
                secondaryButtonAction: () => setToastOpen(false),
              });
              setToastOpen(true);
            } else {
              await handleSaveOperation();
            }
          };

          const onReview = async () => {
            setTouchedAction();
            const allErrors = await validateForm();
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              NewClaimFileMap
            );

            if (hasErrors) {
              setToastConfig({
                title: 'VetEZ Claim',
                message: `The following fields are missing: ${missingFields}. Add the missing fields to review pdf. `,
                primaryButtonText: 'Okay',
                primaryButtonAction: () => {
                  setToastOpen(false);
                },
              });
              setToastOpen(true);
            } else {
              await generatePdf(values, true);
            }
          };

          const onSubmit = async () => {
            setTouchedAction();
            const allErrors = await validateForm();
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              NewClaimFileMap
            );

            if (hasErrors) {
              setToastConfig({
                title: 'VetEZ Claim',
                message: `The following fields are missing: ${missingFields}. Add the missing fields to submit. `,
                primaryButtonText: 'Okay',
                primaryButtonAction: () => {
                  setToastOpen(false);
                },
              });
              setToastOpen(true);
            } else {
              setIsLoading(true);
              const formData = await transformFormValues(values);
              process.env.NODE_ENV === 'development' &&
                console.log('1  faxData >> ', formData);
              const pdfObject = await generateNewClaimPdfObject(formData);
              process.env.NODE_ENV === 'development' &&
                console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf6')
                .then(async (res) => {
                  process.env.NODE_ENV === 'development' &&
                    console.log(res.download_url);
                  const faxBody = await getFaxBodyData('newclaim.pdf', false);
                  const faxData = {
                    ...faxBody,
                    sFileContent_1: res?.download_url,
                  };
                  process.env.NODE_ENV === 'development' &&
                    console.log(' faxData >> ', faxData);

                  const faxResponse = await sendViaSRFax(faxData);

                  process.env.NODE_ENV === 'development' &&
                    console.log('faxReponse >> ', faxResponse);

                  if (faxResponse.Status === 'Success') {
                    const url =
                      res?.permanent_download_url + '|' + urlDocspring;
                    const guids = faxResponse.Result + '|' + guid;

                    const completeForm = {
                      ...formData,
                      guid: guids,
                      pdf: false,
                      timestamp: `${moment().format(
                        'MM/DD/YYYY'
                      )}|${timestamp}`,
                      count: count + 1,
                      urlDocspring: url,
                      isUploadedAlready: true,
                    };

                    await postFormData({
                      docName: 'newclaim',
                      uid: uid,
                      formId: '21-526EZ',
                      recordExists: recordExists,
                      formData: completeForm,
                    });

                    setToastConfig({
                      title: 'VetEZ Claim',
                      message: `Your submission has been successfully uploaded to VA. Do you want to submit another?`,
                      primaryButtonText: 'Yes',
                      primaryButtonAction: async () => {
                        setToastOpen(false);
                        await loadData();
                      },
                      secondaryButtonText: 'No',
                      secondaryButtonAction: () => {
                        setToastOpen(false);
                        router.push('/forms');
                      },
                    });
                    setToastOpen(true);
                  } else {
                    toast.error('Error uploading to VA. Try again later.');
                  }

                  setIsLoading(false);
                })
                .catch((err) => {
                  process.env.NODE_ENV === 'development' &&
                    console.log('error', err);
                  toast.error('Error uploading to VA. Try again later-2.');
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }
          };

          return (
            <FormContent
              title="New Claim or Increase (Form 21-526EZ)"
              onViewDetails={onViewDetails}
              onSave={onSave}
              onReview={onReview}
              onSubmit={onSubmit}
            >
              <Loader show={isLoading} />
              <Form>
                <ToastModal
                  {...toastConfig}
                  isOpen={toastOpen}
                  onClose={() => setToastOpen(false)}
                />
                <DropDownExtended
                  label="Select the type of claim program/process that applies to you"
                  name="program"
                  data={programData}
                  fieldCounter="(1 of 37)"
                />
                <SectionTitle
                  title="Section I: Veteran's Identification Information"
                  subtitle="(If claim is not an original claim, only Section I, IV(if applicable), V and a signature are required)"
                />
                <>
                  <TextInput
                    label="Veteran's First Name"
                    name="firstName"
                    placeholder="Enter first name"
                    fieldCounter="(2 of 37)"
                    limit={18}
                  />
                  <TextInput
                    label="Veteran's Last Name"
                    name="lastName"
                    placeholder="Enter last name"
                    fieldCounter="(2-2 of 37)"
                    limit={12}
                  />
                  <TextInput
                    label="Social Security Number"
                    name="ssn"
                    placeholder="Enter ssn"
                    fieldCounter="(3 of 37)"
                    limit={9}
                  />
                  <DropDownExtended
                    label="Have you ever filed a claim with VA?"
                    hintsMessage="If 'YES', Provide your file number in item 5"
                    name="claim"
                    data={yesNoData}
                    fieldCounter="(4 of 37)"
                  />
                  <TextInput
                    label="VA File Number"
                    name="currentVa"
                    placeholder="Enter va file number"
                    fieldCounter="(5 of 37)"
                    limit={9}
                    hasCounter
                  />
                  <DateSelectorExtended
                    label="Date of Birth"
                    name="birthday"
                    value={values.birthday}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('birthday', val)}
                    isDOB
                    fieldCounter="(6 of 37)"
                  />
                  <TextInput
                    label="Service Number"
                    name="serviceNumber"
                    placeholder="Enter service number"
                    fieldCounter="(7 of 37)"
                    limit={9}
                  />
                  <DateSelectorExtended
                    label="BDD CLAIMS ONLY: provide the date or anticipated date of release from active duty"
                    name="bddDate"
                    value={values.bddDate}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('bddDate', val)}
                    fieldCounter="(8 of 37)"
                    allowFutureDates
                  />
                  <TextInput
                    label="Telephone Number"
                    name="phone"
                    placeholder="Enter telephone number"
                    fieldCounter="(9 of 37)"
                    limit={12}
                  />
                  <TextInput
                    label="Enter International Phone Number"
                    name="phoneI"
                    placeholder="Enter international phone number"
                    fieldCounter="(9-2 of 37)"
                    limit={15}
                    hasCounter
                  />
                  <Divider title="Mailing Address" />
                  <TextInput
                    label="No. & Street"
                    name="street"
                    placeholder="Enter street"
                    fieldCounter="(10 of 37)"
                    limit={20}
                  />
                  <TextInput
                    label="Apt./Unit Number"
                    name="unitNumber"
                    placeholder="Enter apt/unit number"
                    fieldCounter="(10-2 of 37)"
                    limit={5}
                  />
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Enter city"
                    fieldCounter="(10-3 of 37)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="State/Province"
                    name="province"
                    data={StateData}
                    fieldCounter="(10-4 of 37)"
                  />
                  <TextInput
                    label="Country"
                    name="country"
                    fieldCounter="(10-5 of 37)"
                    limit={2}
                    readOnly
                  />
                  <TextInput
                    label="ZIP Code/Postal Code"
                    name="zipCode"
                    placeholder="Enter zip/postal code"
                    fieldCounter="(10-6 of 37)"
                    limit={10}
                  />
                  <Divider title=" Contact" />
                  <TextInput
                    label="Email Address"
                    name="email"
                    placeholder="Enter email"
                    fieldCounter="(11 of 37)"
                    limit={40}
                  />
                  <OptionSelector
                    name="emailE"
                    options={values.emailE}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />
                  <OptionSelector
                    name="currentlyEmployee"
                    options={values.currentlyEmployee}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />
                </>

                <SectionTitle
                  title="Section II: Change of Address"
                  subtitle="Note : If you are temporarily or permanently changing your address, complete Items 13A through 13-6."
                />
                <>
                  <DropDownExtended
                    label="Type of Address Change"
                    name="typeAddressChange"
                    data={typesOfAddressChangeData}
                    fieldCounter="(13A of 37)"
                  />

                  <Divider title="New Address" />

                  <TextInput
                    label="No. & Street"
                    name="newAddressstreet"
                    placeholder="Enter street"
                    fieldCounter="(13B of 37)"
                    limit={20}
                  />
                  <TextInput
                    label="Apt./Unit Number"
                    name="newAddressunitNumber"
                    placeholder="Enter apt/unit number"
                    fieldCounter="(13B-2 of 37)"
                    limit={5}
                  />
                  <TextInput
                    label="City"
                    name="newAddresscity"
                    placeholder="Enter city"
                    fieldCounter="(13B-3 of 37)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="State/Province"
                    name="newAddressprovince"
                    data={StateData}
                    fieldCounter="(13B-4 of 37)"
                  />
                  <TextInput
                    label="Country"
                    name="newAddresscountry"
                    fieldCounter="(13B-5 of 37)"
                    limit={2}
                    readOnly
                  />
                  <TextInput
                    label="ZIP Code/Postal Code"
                    name="newAddresszipCode"
                    placeholder="Enter zip/postal code"
                    fieldCounter="(13B-6 of 37)"
                    limit={10}
                  />

                  <div>
                    <p
                      className="my-3"
                      style={{
                        color: '#035F92',
                      }}
                    >
                      Effective date(s) of new address (If your change of
                      address is temporary, complete both the beginning and
                      ending date of your temporary address) (If your change of
                      address is permanent, please enter your effective date in
                      the beginning date only)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <DateSelectorExtended
                      label="Beginning Date"
                      allowRange={true}
                      name="newAddressEffectiveBeginning"
                      referenceDate={values.newAddressEffectiveEnding}
                      value={values.newAddressEffectiveBeginning}
                      placeholder="Select Date"
                      onChange={(val) =>
                        setFieldValue('newAddressEffectiveBeginning', val)
                      }
                      isStartDate={true}
                      allowFutureDates
                    />

                    <DateSelectorExtended
                      label="Ending Date"
                      allowRange={true}
                      name="newAddressEffectiveEnding"
                      value={values.newAddressEffectiveEnding}
                      referenceDate={values.newAddressEffectiveBeginning}
                      placeholder="Select Date"
                      onChange={(val) =>
                        setFieldValue('newAddressEffectiveEnding', val)
                      }
                      isStartDate={false}
                      allowFutureDates
                    />
                  </div>
                </>

                <SectionTitle title="Section III: Homeless Information" />
                <>
                  <DropDownExtended
                    label="Are you currently homeless?"
                    name="currentlyHomeless"
                    data={yesNoData}
                    fieldCounter="(14 of 37)"
                  />

                  {values.currentlyHomeless === 'Yes' && (
                    <>
                      <OptionSelector
                        label="Choose the option that applies to your living situation."
                        name="currentlyHomelesslivingSituationHolder"
                        options={values.currentlyHomelesslivingSituationHolder}
                        multiSelect={false}
                        isOtherAllowed={true}
                        fieldCounter="(14-2 of 37)"
                        onSelectionChange={(selectedOptions) => {
                          livingSituationCallback(selectedOptions);
                        }}
                      />

                      <ErrorMessage
                        name="currentlyHomelesslivingSituation"
                        component="div"
                        className="mt-1 text-danger"
                      />

                      <ErrorMessage
                        name="currentlyHomelessspecify"
                        component="div"
                        className="mt-1 text-danger"
                      />
                    </>
                  )}

                  {values.currentlyHomeless === 'No' && (
                    <>
                      <DropDownExtended
                        label="Are you currently at risk of becoming homeless?"
                        name="riskOfHomeless"
                        data={yesNoData}
                        fieldCounter="(14-3 of 37)"
                      />

                      {values.riskOfHomeless === 'Yes' && (
                        <>
                          <OptionSelector
                            label="Choose the option that applies to your living situation."
                            name="riskOfHomelesslivingSituationHolder"
                            options={values.riskOfHomelesslivingSituationHolder}
                            multiSelect={false}
                            isOtherAllowed={true}
                            fieldCounter="(14-4 of 37)"
                            onSelectionChange={(selectedOptions) => {
                              riskOfHomelessCallback(selectedOptions);
                            }}
                          />

                          <ErrorMessage
                            name="riskOfHomelesslivingSituation"
                            component="div"
                            className="mt-1 text-danger"
                          />

                          <ErrorMessage
                            name="riskOfHomelessspecify"
                            component="div"
                            className="mt-1 text-danger"
                          />
                        </>
                      )}
                    </>
                  )}

                  <TextInput
                    label="Point of Contact (Name of person VA can contact in order to get in touch with you)"
                    name="pointOfContactName"
                    fieldCounter="(14-5 of 37)"
                    limit={125}
                    placeholder="Enter contact name"
                    hasCounter
                  />

                  <TextInput
                    label="Point of Contact Telephone Number (Include Area Code)"
                    name="pointOfContactTelephone"
                    placeholder="Enter phone number"
                    fieldCounter="(14-6 of 37)"
                    limit={12}
                  />

                  <TextInput
                    label="Enter International Telephone Number"
                    name="pointOfContactTelephoneI"
                    placeholder="Enter international phone number"
                    fieldCounter="(14-7 of 37)"
                    limit={15}
                    hasCounter
                  />

                  <SectionTitle title="Section IV: Exposure Information" />

                  <DropDownExtended
                    label="Are you claiming any conditions related to toxic exposures?"
                    name="toxicExposures"
                    data={yesNoData}
                    fieldCounter="(15 of 37)"
                  />

                  {values.toxicExposures === 'Yes' && (
                    <>
                      <DropDownExtended
                        label="Did you serve in any of the following gulf war hazard locations? Iraq; Kuwait; Saudi Arabia; the neutral zone between Iraq and Saudi Arabia; Bahrain; Qatar; the United Arab Emirates; Oman; Yemen; Lebanon; Somalia; Afghanistan; Israel; Egypt; Turkey; Syria; Jordan; Djibouti; Uzbekistan; the Gulf of Aden; the Gulf of Oman; the Persian Gulf; the Arabian Sea; and the Red Sea."
                        name="hazardLocation"
                        data={yesNoData}
                        fieldCounter="(15-2 of 37)"
                      />
                      {values.hazardLocation === 'Yes' && (
                        <>
                          <div>
                            <p
                              className="my-3"
                              style={{
                                fontSize: '14px',
                                color: '#035F92',
                                fontWeight: 500,
                              }}
                            >
                              When did you serve in these locations?
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <DateSelectorExtended
                              label="From"
                              allowRange={true}
                              name="hazardLocationDateFrom"
                              referenceDate={values.hazardLocationDateTo}
                              value={values.hazardLocationDateFrom}
                              placeholder="Select Date"
                              onChange={(val) =>
                                setFieldValue('hazardLocationDateFrom', val)
                              }
                              isStartDate={true}
                            />

                            <DateSelectorExtended
                              label="To"
                              allowRange={true}
                              name="hazardLocationDateTo"
                              value={values.hazardLocationDateTo}
                              referenceDate={values.hazardLocationDateFrom}
                              placeholder="Select Date"
                              onChange={(val) =>
                                setFieldValue('hazardLocationDateTo', val)
                              }
                              isStartDate={false}
                            />
                          </div>
                        </>
                      )}

                      <DropDownExtended
                        label="Did you serve in any of the following herbicide (e.g., Agent Orange) locations? Republic of Vietnam to include the 12 nautical mile territorial waters; Thailand at any United States or Royal Thai base; Laos; Cambodia at Mimot or Krek; Kampong Cham Province; Guam or American Samoa; or in the territorial waters thereof; Johnston Atoll or a ship that called at Johnston Atoll; Korean demilitarized zone; aboard (to include repeated operations and maintenance with) a C-123 aircraft known to have been used to spray an herbicide agent (during service in the Air Force and Air Force Reserves)."
                        name="herbicideLocation"
                        data={yesNoData}
                        fieldCounter="(15-3 of 37)"
                      />
                      {values.herbicideLocation === 'Yes' && (
                        <>
                          <TextInput
                            label="Please list other location(s) where you served, if not listed above:"
                            name="herbicideLocationList"
                            placeholder="Enter locations"
                            limit={200}
                          />
                          <div>
                            <p
                              className="my-3"
                              style={{
                                fontSize: '14px',
                                color: '#035F92',
                                fontWeight: 500,
                              }}
                            >
                              When did you serve in these locations?
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <DateSelectorExtended
                              label="From"
                              allowRange={true}
                              name="herbicideLocationDateFrom"
                              referenceDate={values.herbicideLocationDateTo}
                              value={values.herbicideLocationDateFrom}
                              placeholder="Select Date"
                              onChange={(val) =>
                                setFieldValue('herbicideLocationDateFrom', val)
                              }
                              isStartDate={true}
                            />

                            <DateSelectorExtended
                              label="To"
                              allowRange={true}
                              name="herbicideLocationDateTo"
                              value={values.herbicideLocationDateTo}
                              referenceDate={values.herbicideLocationDateFrom}
                              placeholder="Select Date"
                              onChange={(val) =>
                                setFieldValue('herbicideLocationDateTo', val)
                              }
                              isStartDate={false}
                            />
                          </div>
                        </>
                      )}

                      <OptionSelector
                        label="Have you been exposed to any of the following? "
                        name="haveExposed"
                        options={values.haveExposed}
                        multiSelect={true}
                        isOtherAllowed={true}
                        fieldCounter="(15-4 of 37)"
                        onSelectionChange={(selectedOptions) => {
                          exposedDataCallback(selectedOptions);
                        }}
                      />
                      <ErrorMessage
                        name="haveExposed_OtherSpecify"
                        component="div"
                        className="mt-1 text-danger"
                      />

                      <div>
                        <p
                          className="my-3"
                          style={{
                            fontSize: '14px',
                            color: '#035F92',
                            fontWeight: 500,
                          }}
                        >
                          When were you exposed?
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <DateSelectorExtended
                          label="From"
                          allowRange={true}
                          name="haveExposed_dateFrom"
                          referenceDate={values.haveExposed_dateTo}
                          value={values.haveExposed_dateFrom}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('haveExposed_dateFrom', val)
                          }
                          isStartDate={true}
                        />

                        <DateSelectorExtended
                          label="To"
                          allowRange={true}
                          name="haveExposed_dateTo"
                          value={values.haveExposed_dateTo}
                          referenceDate={values.haveExposed_dateFrom}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('haveExposed_dateTo', val)
                          }
                          isStartDate={false}
                        />
                      </div>
                      <TextInput
                        label="If you were exposed multiple times, please provide all additional dates and locations of potential exposure."
                        name="haveExposed_multipleTimes"
                        placeholder="Enter details"
                        fieldCounter="15-5 of 37"
                        multiline
                        limit={200}
                        hasCounter
                      />
                    </>
                  )}
                </>

                <SectionTitle title="Section V: Claim Information" />
                <>
                  {values.disabilities.map((item, ind) => {
                    return (
                      <div key={ind} className="mt-10">
                        <DropDownExtended
                          label={`Disability #${ind + 1}`}
                          name={`disabilities[${ind}].currentDisability`}
                          data={disabilityData}
                          isTextFieldEnabled
                        />

                        <TextInput
                          label="If due to exposure, event, or injury, please specify (e.g., Agent Orange, radiation, burn pits)"
                          name={`disabilities[${ind}].specifications`}
                          placeholder="Enter details"
                        />
                        <TextInput
                          label="Explain how the disability(ies) relates to the in-service event/exposure/injury"
                          name={`disabilities[${ind}].explanation`}
                          placeholder="Enter details"
                        />
                        <DateSelectorExtended
                          label="Approximate date disability(ies) began or worsened:"
                          name={`disabilities[${ind}].date`}
                          value={values.disabilities[ind].date}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue(`disabilities[${ind}].date`, val)
                          }
                        />
                      </div>
                    );
                  })}

                  <div className="mt-5 grid grid-cols-2 gap-6">
                    <button
                      className="cursor-pointer rounded bg-gray-200 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-gray-300"
                      disabled={values.disabilities.length >= 35}
                      onClick={() => {
                        setValues({
                          ...values,
                          disabilities: [
                            ...values.disabilities,
                            {
                              currentDisability: '',
                              specifications: '',
                              explanation: '',
                              date: '',
                            },
                          ],
                        });
                      }}
                    >
                      Add Disability
                    </button>

                    <button
                      className="cursor-pointer rounded bg-yellow-400 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      hidden={values.disabilities.length <= 1}
                      onClick={() => {
                        if (values.disabilities.length > 1) {
                          const updatedDisabilities = [...values.disabilities];
                          updatedDisabilities.pop();
                          setValues({
                            ...values,
                            disabilities: [...updatedDisabilities],
                          });
                        }
                      }}
                    >
                      Remove Disability
                    </button>
                  </div>

                  {values.treatmentFacilities.map((item, ind) => {
                    return (
                      <div key={ind} className="mt-10">
                        <TextInput
                          label={`Name and Location of Treatment Facility #${
                            ind + 1
                          }`}
                          name={`treatmentFacilities[${ind}].facility`}
                          placeholder="Enter details"
                          hasCounter
                          limit={150}
                        />

                        {!values.treatmentFacilities[ind].notAvailable[0]
                          .isSelected && (
                          <DateSelectorExtended
                            label="Date of Treated"
                            name={`treatmentFacilities[${ind}].date`}
                            value={values.treatmentFacilities[ind].date}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue(
                                `treatmentFacilities[${ind}].date`,
                                val
                              )
                            }
                          />
                        )}

                        <OptionSelector
                          name={`treatmentFacilities[${ind}].notAvailable`}
                          options={values.treatmentFacilities[ind].notAvailable}
                          multiSelect={true}
                          isOtherAllowed={false}
                          onSelectionChange={(selectedOptions) => {
                            process.env.NODE_ENV === 'development' &&
                              console.log(selectedOptions);
                            setValues({
                              ...values,
                              treatmentFacilities:
                                values.treatmentFacilities.map((item, i) =>
                                  i === ind
                                    ? { ...item, notAvailable: selectedOptions }
                                    : item
                                ),
                            });
                          }}
                        />
                      </div>
                    );
                  })}

                  <div className="mt-5 grid grid-cols-2 gap-6">
                    <button
                      className="cursor-pointer rounded bg-gray-200 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-gray-300"
                      disabled={values.treatmentFacilities.length >= 35}
                      onClick={() => {
                        setValues({
                          ...values,
                          treatmentFacilities: [
                            ...values.treatmentFacilities,
                            {
                              facility: '',
                              date: '',
                              notAvailable: notAvailableOption,
                            },
                          ],
                        });
                      }}
                    >
                      Add Facility
                    </button>

                    <button
                      className="cursor-pointer rounded bg-yellow-400 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      hidden={values.treatmentFacilities.length <= 1}
                      onClick={() => {
                        if (values.treatmentFacilities.length > 1) {
                          const updatedFacilities = [
                            ...values.treatmentFacilities,
                          ];
                          updatedFacilities.pop();
                          setValues({
                            ...values,
                            treatmentFacilities: [...updatedFacilities],
                          });
                        }
                      }}
                    >
                      Remove Facility
                    </button>
                  </div>
                </>

                <SectionTitle title="Section VI: Service Information" />
                <>
                  <DropDownExtended
                    label="Did you serve under another name?"
                    name="anotherName"
                    data={yesNoData}
                    fieldCounter="(18 of 37)"
                  />

                  {values.anotherName === 'Yes' && (
                    <TextInput
                      label="List the other name(s) you served under:"
                      name="anotherNamenamesList"
                      placeholder="Enter name(s)"
                      fieldCounter="(18-2 of 37)"
                      limit={200}
                      hasCounter
                    />
                  )}

                  <DropDownExtended
                    label="Branch of Service"
                    name="branchOfService"
                    data={branchOfServiceData}
                    fieldCounter="(19 of 37)"
                  />

                  <DropDownExtended
                    label="Component"
                    name="component"
                    data={componentData}
                    fieldCounter="(19-2 of 37)"
                  />

                  <>
                    <div>
                      <p
                        className="my-3"
                        style={{
                          color: '#035F92',
                        }}
                      >
                        Most recent active service dates
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <DateSelectorExtended
                        label="Entry Date"
                        allowRange={true}
                        name="recentDatesFrom"
                        referenceDate={values.recentDatesTo}
                        value={values.recentDatesFrom}
                        placeholder="Select Date"
                        onChange={(val) =>
                          setFieldValue('recentDatesFrom', val)
                        }
                        isStartDate={true}
                      />

                      <DateSelectorExtended
                        label="Exit Date"
                        allowRange={true}
                        name="recentDatesTo"
                        value={values.recentDatesTo}
                        referenceDate={values.recentDatesFrom}
                        placeholder="Select Date"
                        onChange={(val) => setFieldValue('recentDatesTo', val)}
                        isStartDate={false}
                      />
                    </div>
                  </>

                  <TextInput
                    label="Place of last or anticipated separation"
                    name="placeOfSeparation"
                    placeholder="Enter place"
                    fieldCounter="(20 of 37)"
                    limit={30}
                  />

                  <DropDownExtended
                    label="Did you serve in a combat zone since 9-11-2001?"
                    name="combatZone"
                    data={yesNoData}
                    fieldCounter="(20-2 of 37)"
                  />

                  {values.combatZone === 'Yes' && (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <DateSelectorExtended
                          label="From"
                          allowRange={true}
                          name="combatZoneDateFrom"
                          referenceDate={values.combatZoneDateTo}
                          value={values.combatZoneDateFrom}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('combatZoneDateFrom', val)
                          }
                          isStartDate={true}
                        />

                        <DateSelectorExtended
                          label="To"
                          allowRange={true}
                          name="combatZoneDateTo"
                          value={values.combatZoneDateTo}
                          referenceDate={values.combatZoneDateFrom}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('combatZoneDateTo', val)
                          }
                          isStartDate={false}
                        />
                      </div>
                    </>
                  )}

                  <DropDownExtended
                    label="Are you currently serving or have you ever served in the reserves or national guard?"
                    name="reservesNationalGuard"
                    data={yesNoData}
                    fieldCounter="(21 of 37)"
                  />
                  {values.reservesNationalGuard == 'Yes' && (
                    <>
                      <DropDownExtended
                        label="Component"
                        name="reservesNationalGuardComponent"
                        data={reserveComponentData}
                        fieldCounter="(21-2 of 37)"
                      />

                      <>
                        <div>
                          <p
                            className="my-3"
                            style={{
                              fontSize: '14px',
                              color: '#035F92',
                              fontWeight: 500,
                            }}
                          >
                            Obligation term of service
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <DateSelectorExtended
                            label="From"
                            allowRange={true}
                            name="reservesNationalGuardDateFrom"
                            referenceDate={values.reservesNationalGuardDateTo}
                            value={values.reservesNationalGuardDateFrom}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue(
                                'reservesNationalGuardDateFrom',
                                val
                              )
                            }
                            isStartDate={true}
                          />

                          <DateSelectorExtended
                            label="To"
                            allowRange={true}
                            name="reservesNationalGuardDateTo"
                            value={values.reservesNationalGuardDateTo}
                            referenceDate={values.reservesNationalGuardDateFrom}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue('reservesNationalGuardDateTo', val)
                            }
                            isStartDate={false}
                          />
                        </div>
                      </>

                      <TextInput
                        label="Current or last assigned name and address of unit"
                        name="reservesNationalGuardNameAddressUnit"
                        placeholder="Enter name & address"
                        fieldCounter="(21-3 of 37)"
                        limit={100}
                      />

                      <TextInput
                        label="Current or assigned phone number of unit (include area code)"
                        name="reservesNationalGuardPhoneNumber"
                        placeholder="Enter phone number"
                        fieldCounter="(21-4 of 37)"
                        limit={15}
                      />

                      <DropDownExtended
                        label="Are you currently receiving inactive duty training pay?"
                        name="reservesNationalGuardTrainingPay"
                        data={yesNoData}
                        fieldCounter="(21-5 of 37)"
                      />
                    </>
                  )}

                  <DropDownExtended
                    label="Are you currently activated on federal orders within the national guard or reserves?"
                    name="federalsOrders"
                    data={yesNoData}
                    fieldCounter="(22 of 37)"
                  />

                  {values.federalsOrders === 'Yes' && (
                    <>
                      <DateSelectorExtended
                        label="Date of Activation"
                        name={`federalsOrdersActivationDate`}
                        value={values.federalsOrdersActivationDate}
                        placeholder="Select Date"
                        onChange={(val) =>
                          setFieldValue(`federalsOrdersActivationDate`, val)
                        }
                        fieldCounter="(22-2 of 37)"
                      />
                      <DateSelectorExtended
                        label="Anticipated Separation Date"
                        name={`federalsOrdersSeparationDate`}
                        value={values.federalsOrdersSeparationDate}
                        placeholder="Select Date"
                        onChange={(val) =>
                          setFieldValue(`federalsOrdersSeparationDate`, val)
                        }
                        fieldCounter="(22-3 of 37)"
                      />
                    </>
                  )}

                  <DropDownExtended
                    label="Have you ever been a prisioner of war?"
                    name="prisionerOfWar"
                    data={yesNoData}
                    fieldCounter="(23 of 37)"
                  />

                  {values.prisionerOfWar === 'Yes' && (
                    <>
                      <>
                        <div className="grid grid-cols-2 gap-6">
                          <DateSelectorExtended
                            label="From"
                            allowRange={true}
                            name="prisionerOfWarOneDateFrom"
                            referenceDate={values.prisionerOfWarOneDateTo}
                            value={values.prisionerOfWarOneDateFrom}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue('prisionerOfWarOneDateFrom', val)
                            }
                            isStartDate={true}
                          />

                          <DateSelectorExtended
                            label="To"
                            allowRange={true}
                            name="prisionerOfWarOneDateTo"
                            value={values.prisionerOfWarOneDateTo}
                            referenceDate={values.prisionerOfWarOneDateFrom}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue('prisionerOfWarOneDateTo', val)
                            }
                            isStartDate={false}
                          />
                        </div>
                      </>

                      <>
                        <div className="grid grid-cols-2 gap-6">
                          <DateSelectorExtended
                            label="From"
                            allowRange={true}
                            name="prisionerOfWarTwoDateFrom"
                            referenceDate={values.prisionerOfWarTwoDateTo}
                            value={values.prisionerOfWarTwoDateFrom}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue('prisionerOfWarTwoDateFrom', val)
                            }
                            isStartDate={true}
                          />

                          <DateSelectorExtended
                            label="To"
                            allowRange={true}
                            name="prisionerOfWarTwoDateTo"
                            value={values.prisionerOfWarTwoDateTo}
                            referenceDate={values.prisionerOfWarTwoDateFrom}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue('prisionerOfWarTwoDateTo', val)
                            }
                            isStartDate={false}
                          />
                        </div>
                      </>
                    </>
                  )}
                </>

                <SectionTitle title="Section VII: Service Pay" />
                <>
                  <DropDownExtended
                    label="Are you receiving military retired pay?"
                    name="retiredPay"
                    data={yesNoData}
                    fieldCounter="(24 of 37)"
                  />

                  {values.retiredPay === 'No' && (
                    <DropDownExtended
                      label="Will you receive military retired pay in the future?"
                      name="retiredPayFuture"
                      data={yesNoData}
                      fieldCounter="(24-2 of 37)"
                    />
                  )}

                  {values.retiredPayFuture === 'Yes' && (
                    <TextInput
                      label="Explain here (e.g. future Reserve/National Guard retirement, pending MEB/PEB)"
                      name="retiredPayExplanation"
                      placeholder="Explain"
                      limit={120}
                    />
                  )}

                  {(values.retiredPay === 'Yes' ||
                    values.retiredPayFuture === 'Yes') && (
                    <>
                      <DropDownExtended
                        label="Branch of Service"
                        name="retiredPayBranchOfService"
                        data={branchOfServiceData}
                        fieldCounter="(24-3 of 37)"
                      />
                      <TextInput
                        label="Monthly Amount"
                        name="retiredPayMonthlyAmount"
                        placeholder="Enter amount"
                        limit={6}
                        fieldCounter="(24-4 of 37)"
                      />
                    </>
                  )}

                  <DropDownExtended
                    label="Retired Status"
                    name="retiredPayRetiredStatus"
                    data={retiredStatus}
                    fieldCounter="(25 of 37)"
                  />
                  <div className="space-y-3 text-sm text-black">
                    <p className="mt-3 font-bold dark:text-white-light">
                      IMPORTANT INFORMATION ON MILITARY RETIRED PAY (Includes
                      all Uniformed Services Retired Pay):
                    </p>

                    <p className="font-light dark:text-white-light">
                      Submission of this application constitutes a waiver of
                      military retired pay in an amount equal to VA compensation
                      awarded, if you are entitled to both benefits. Your
                      retired pay may be reduced by the amount of VA
                      compensation awarded. Receipt of the full amount of
                      military retired pay and VA compensation at the same time{' '}
                      <span className="font-bold italic">may</span> result in an
                      overpayment, which{' '}
                      <span className="font-bold italic underline">may</span> be
                      subject to collection. If you qualify for concurrent
                      receipt of VA compensation and military retired pay, the
                      waiver of retired pay will not apply. If you do not want
                      to waive any retired pay to receive VA compensation, you
                      should check the box in{' '}
                      <span className="font-bold">Item 26</span>.
                    </p>

                    <p className="font-bold dark:text-white-light">
                      Note that if you check the box in Item 26, you will not
                      receive VA compensation, if granted. If you are currently
                      in receipt of VA compensation and you check the box in
                      Item 26, your VA compensation will be terminated, if you
                      are also eligible for military retired pay.
                    </p>

                    <p className="font-bold dark:text-white-light">
                      IMPORTANT: VA COMPENSATION PAY IS NON-TAXABLE. THEREFORE,
                      VA COMPENSATION PAY MAY BE THE GREATER BENEFIT.
                    </p>
                  </div>

                  <OptionSelector
                    name="noRetiredPayment"
                    options={values.noRetiredPayment}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />

                  <div className="mb-4 w-[90%] text-sm text-black">
                    <p className="mt-3 font-bold dark:text-white-light">
                      IMPORTANT INFORMATION ON SEPARATION/SEVERANCE PAY:
                    </p>

                    <p className="mb-4 mt-3 font-light dark:text-white-light">
                      VA compensation, if granted, may be withheld to recoup any
                      disability severance or separation pay such as involuntary
                      separation pay, voluntary separation pay, or special
                      separation benefit, you receive from your branch of
                      service. In addition, if you receive a Voluntary
                      Separation Incentive (VSI), your VSI payments may be
                      reduced if you are awarded VA compensation. Receipt of VA
                      compensation and VSI at the same time may result in an
                      overpayment of VSI, which{' '}
                      <span className="font-bold italic underline">may</span> be
                      subject to collection.
                    </p>
                  </div>

                  <DropDownExtended
                    label="Have you ever received separation pay, disability severance pay, or any other lump sum payment from your branch of service?"
                    name="separationPay"
                    data={yesNoData}
                    fieldCounter="(27 of 37)"
                  />

                  {values.separationPay === 'Yes' && (
                    <>
                      <DateSelectorExtended
                        fieldCounter="(27-2 of 37)"
                        label="Date Payment Received"
                        name={`separationPayPaymentDate`}
                        value={values.separationPayPaymentDate}
                        placeholder="Select Date"
                        onChange={(val) =>
                          setFieldValue(`separationPayPaymentDate`, val)
                        }
                      />

                      <DropDownExtended
                        label="Branch of Service"
                        name="separationPayBranchOfService"
                        data={branchOfServiceData}
                        fieldCounter="(27-3 of 37)"
                      />

                      <TextInput
                        label="Amount Received (Provide pre-tax amount)"
                        name="separationPayAmountReceived"
                        placeholder="Enter amount"
                        limit={6}
                        fieldCounter="(27-4 of 37)"
                      />
                    </>
                  )}

                  <OptionSelector
                    name="noInactivePayment"
                    options={values.noInactivePayment}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />
                </>

                <SectionTitle title="Section VIII: Direct Deposit Information" />
                <>
                  <div className="mb-4 text-sm text-black">
                    <p className="mt-3 font-light">
                      The Department of the Treasury requires all Federal
                      benefit payments be made by electronic funds transfer
                      (EFT), also called direct deposit.{' '}
                      <span className="font-semibold underline dark:text-white-light">
                        To enroll in direct deposit, provide the information
                        requested below, and attach either a voided personal
                        check or a deposit slip.
                      </span>{' '}
                      <span>
                        If you do not have a bank account, please visit,
                      </span>
                    </p>

                    <a
                      href="https://www.benefits.va.gov/benefits/banking.asp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-semibold text-blue-600 underline dark:text-white-light"
                    >
                      https://www.benefits.va.gov/benefits/banking.asp
                    </a>

                    <p className="mt-3 font-light dark:text-white-light">
                      This website provides information about the Veterans
                      Benefits Banking Program (VBBP), and a link to banks and
                      credit unions that may fit your needs. You may also call{' '}
                      <span className="font-semibold">1-800-827-1000</span>. If
                      you elect not to enroll, you must contact representatives
                      handling waiver requests for the Department of the
                      Treasury at{' '}
                      <span className="font-semibold">1-888-224-2950</span>.
                      They will encourage your participation in EFT and address
                      any questions or concerns you may have.
                    </p>

                    <p className="mb-3 mt-3 font-bold dark:text-white-light">
                      IMPORTANT: VA COMPENSATION PAY IS NON-TAXABLE. THEREFORE,
                      VA COMPENSATION PAY MAY BE THE GREATER BENEFIT.
                    </p>
                  </div>

                  <OptionSelector
                    name="directDeposit"
                    options={values.directDeposit}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />

                  <TextInput
                    label="Account Number"
                    name="directDepositAccountNumber"
                    placeholder="Enter account number"
                    fieldCounter="(30 of 37)"
                    limit={15}
                    hasCounter
                  />

                  <DropDownExtended
                    label="Account Type"
                    name="directDepositAccountType"
                    data={directDepositAccountTypeData}
                    fieldCounter="(30-2 of 37)"
                  />

                  <TextInput
                    label="Name of Financial Institution"
                    name="directDepositFinancialInstitution"
                    placeholder="Enter financial institution"
                    fieldCounter="(31 of 37)"
                    limit={30}
                  />

                  <TextInput
                    label="Routing or Transit Number"
                    name="directDepositRoutingNumber"
                    placeholder="Enter routing number"
                    fieldCounter="(32 of 37)"
                    limit={9}
                    hasCounter1212
                  />
                </>

                <SectionTitle title="Section IX: Claim Certification & Signature" />
                <>
                  <div className="mb-4 text-sm text-black">
                    <p className="mt-3 font-light dark:text-white-light">
                      I certify and authorize the release of information. I
                      certify that the statements in this document are true and
                      complete to the best of my knowledge. I authorize any
                      person or entity, including but not limited to any
                      organization, service provider, employer, or government
                      agency, to give the Department of Veterans Affairs any
                      information about me. For the limited purpose of providing
                      VA with this information as it may relate to my claim, I
                      waive any privilege that may apply and would otherwise
                      make the information confidential and not discloseable.
                    </p>

                    <p className="mt-3 font-light dark:text-white-light ">
                      I certify I have received the notice attached to this
                      application titled,
                      <span className="font-semibold italic">
                        {' '}
                        Notice to Veteran/Service Member of Evidence Necessary
                        to Substantiate a Claim for Veterans Disability
                        Compensation and Related Compensation Benefits.
                      </span>
                    </p>

                    <p className="mt-3 font-light dark:text-white-light">
                      I certify I have enclosed all the information or evidence
                      that will support my claim, to include an identification
                      of relevant records available at a Federal facility such
                      as a VA medical center;{' '}
                      <span className="font-bold">OR</span>, I have no
                      information or evidence to give VA to support my claim;{' '}
                      <span className="font-bold">OR</span>, I have checked the
                      box in Item 1, on page 9, indicating I want my claim
                      processed under the standard claim process because I plan
                      to submit additional evidence in support of my claim.
                    </p>
                  </div>

                  <OptionSelector
                    name="signatureOption"
                    options={values.signatureOption}
                    multiSelect={false}
                    isOtherAllowed={false}
                  />

                  <DateSelectorExtended
                    label="Date Signed"
                    name="veteranDateSigned"
                    value={values.veteranDateSigned}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('veteranDateSigned', val)}
                    fieldCounter="(33 of 37)"
                  />
                </>

                <SectionTitle title="Section X: Witness to signature" />
                <>
                  <TextInput
                    label="Printed name and address of first witness"
                    name="firstWitness"
                    placeholder="Enter first witness"
                    fieldCounter="(34 of 37)"
                    limit={50}
                  />
                  <TextInput
                    label="Printed name and address of second witness"
                    name="secondWitness"
                    placeholder="Enter second witness"
                    fieldCounter="(35 of 37)"
                    limit={50}
                  />
                </>

                <SectionTitle
                  title="Section XI: Alternate signer certification and signature"
                  subtitle="(Note: Required only if item 33A is blank)"
                />
                <>
                  <div className="mb-4 space-y-3 text-sm text-black">
                    <p className="font-light dark:text-white-light">
                      <span className="font-bold">NOTE:</span> An alternate
                      signer signature{' '}
                      <span className="font-bold">will not</span> be accepted
                      unless a valid VA Form 21-0972, Alternate Signer
                      Certification, is of record or attached to this request.
                    </p>

                    <p className="font-light dark:text-white-light">
                      I certify that by signing on behalf of the claimant, that
                      I am a court-appointed representative;{' '}
                      <span className="font-bold">OR</span>, an attorney in fact
                      or agent authorized to act on behalf of a claimant under a
                      durable power of attorney;{' '}
                      <span className="font-bold">OR</span>, a person who is
                      responsible for the care of the claimant, to include but
                      not limited to a spouse or other relative;{' '}
                      <span className="font-bold">OR</span>, a manager or
                      principal officer acting on behalf of an institution which
                      is responsible for the care of an individual;{' '}
                      <span className="font-bold">AND</span>, that the claimant
                      is under the age of 18;{' '}
                      <span className="font-bold">OR</span>, is mentally
                      incompetent to provide substantially accurate information
                      needed to complete the form, or to certify that the
                      statements made on the form are true and complete;{' '}
                      <span className="font-bold">OR</span>, is physically
                      unable to sign this form.
                    </p>

                    <p className="font-light dark:text-white-light">
                      I understand that I may be asked to confirm the
                      truthfulness of the answers to the best of my knowledge
                      under penalty of perjury. I also understand that VA may
                      request further documentation or evidence to verify or
                      confirm my authorization to sign or complete an
                      application on behalf of the claimant if necessary.
                    </p>

                    <p className="font-light dark:text-white-light">
                      Examples of evidence which VA may request include: Social
                      Security Number (SSN) or Taxpayer Identification Number
                      (TIN); a certificate or order from a court with competent
                      jurisdiction showing your authority to act for the
                      claimant with a judge's signature and a date/time stamp; a
                      copy of documentation showing appointment of fiduciary;
                      durable power of attorney showing the name and signature
                      of the claimant and your authority as attorney in fact or
                      agent; health care power of attorney, affidavit or
                      notarized statement from an institution or person
                      responsible for the care of the claimant indicating the
                      capacity or responsibility of care provided; or any other
                      documentation showing such authorization.
                    </p>
                  </div>
                  <OptionSelector
                    name="alternateSignature"
                    options={values.alternateSignature}
                    multiSelect={false}
                    isOtherAllowed={false}
                  />

                  <DateSelectorExtended
                    label="Date Signed"
                    name="alternateSignatureDate"
                    value={values.alternateSignatureDate}
                    placeholder="Select Date"
                    onChange={(val) =>
                      setFieldValue('alternateSignatureDate', val)
                    }
                    fieldCounter="(36 of 37)"
                  />
                </>

                <SectionTitle
                  title="Section XII: Power of Attorney (POA) Signature"
                  subtitle="(Note: A POA cannot sign for an original claim only)"
                />
                <>
                  <div className="mb-4 space-y-3 text-sm text-black">
                    <p className="font-light dark:text-white-light">
                      I certify that the claimant has authorized the undersigned
                      representative to file this claim on behalf of the
                      claimant and that the claimant is aware and accepts the
                      information provided in this document. I certify that the
                      claimant has authorized the undersigned representative to
                      state that the claimant certifies the truth and completion
                      of the information contained in this document to the best
                      of the claimant's knowledge.
                    </p>

                    <p className="font-light dark:text-white-light">
                      <span className="font-bold">Note:</span> A POA's signature{' '}
                      <span className="font-bold">will not</span> be accepted
                      unless at the time of submission of this claim a valid VA
                      Form 21-22, Appointment of Veterans Service Organization
                      as Claimant's Representative, or VA Form 21-22a,
                      Appointment of Individual as Claimant's Representative,
                      indicating the appropriate POA is of record with VA.
                    </p>

                    <OptionSelector
                      name="poaSignature"
                      options={values.poaSignature}
                      multiSelect={false}
                      isOtherAllowed={false}
                    />

                    <DateSelectorExtended
                      label="Date Signed"
                      name="poaSignatureDate"
                      value={values.poaSignatureDate}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('poaSignatureDate', val)}
                      fieldCounter="(37 of 37)"
                    />
                  </div>

                  <div className="mb-4 space-y-3 text-sm text-black">
                    <p className="font-light dark:text-white-light">
                      <span className="font-bold">Penalty:</span> The law
                      provides severe penalties which include fine or
                      imprisonment, or both, for the willful submission of any
                      statement or evidence of a material fact, knowing it to be
                      false, or for the fraudulent acceptance of any payment to
                      which you are not entitled.
                    </p>

                    <p className="font-light dark:text-white-light">
                      <span className="font-bold">Privacy Act Notice:</span>{' '}
                      This form will be used to determine your eligibility for
                      benefits (38 U.S.C. 5101). The responses you submit are
                      considered confidential (38 U.S.C. 5701). VA may disclose
                      the information that you provide, including Social
                      Security numbers, outside VA if the disclosure is
                      authorized under the Privacy Act, including the routine
                      uses identified in the VA system of records, 58VA21/22/28,
                      Compensation, Pension, Education, and Veteran Readiness
                      and Employment Records - VA, published in the Federal
                      Register. The requested information is considered relevant
                      and necessary to determine maximum benefits under the law.
                      Information submitted is subject to verification through
                      computer matching programs with other agencies. VA may
                      make a “routine use” disclosure for: civil or criminal law
                      enforcement, congressional communications, epidemiological
                      or research studies, the collection of money owed to the
                      United States, litigation in which the United States is a
                      party or has an interest, the administration of VA
                      programs and delivery of VA benefits, verification of
                      identity and status, and personnel administration. Your
                      response is required in order to obtain or retain
                      benefits. Information that you furnish may be utilized in
                      computer matching programs with other Federal or State
                      agencies for the purpose of determining your eligibility
                      to receive VA benefits, as well as to collect any amount
                      owed to the United States by virtue of your participation
                      in any benefit program administered by the Department of
                      Veterans Affairs.{' '}
                      <span className="font-semibold">
                        Social Security information:
                      </span>{' '}
                      You are required to provide the Social Security number
                      requested under 38 U.S.C. 5101(c)(1). VA may disclose
                      Social Security numbers as authorized under the Privacy
                      Act, and specifically may disclose them for purposes
                      stated above.
                    </p>

                    <p className="font-light dark:text-white-light">
                      <span className="font-bold">Respondent Burden:</span> We
                      need this information to determine your eligibility for
                      compensation. Title 38, United States Code, allows us to
                      ask for this information. We estimate that you will need
                      an average of 25 minutes to review the instructions, find
                      the information, and complete this form. VA cannot conduct
                      or sponsor a collection of information unless a valid OMB
                      control number is displayed. You are not required to
                      respond to a collection of information if this number is
                      not displayed. Valid OMB control numbers can be located on
                      the OMB Internet Page at{' '}
                      <a
                        href="https://www.reginfo.gov/public/do/PRAMain"
                        className="dark:underline-white-light font-semibold text-black underline dark:text-white-light"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.reginfo.gov/public/do/PRAMain
                      </a>
                      . If desired, you can call 1-800-827-1000 to get
                      information on where to send comments or suggestions about
                      this form.
                    </p>
                  </div>
                </>
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
