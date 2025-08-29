import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { NewClaimFileValidation } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData } from '@/utils/staticData';
import Divider from '@/components/Common/Divider';
import OptionSelector from '@/components/Common/OptionSelector';
import Switch from '@/components/Common/Switch';
import { GetErrorFieldsString } from '@/utils/utils';
import { SubmitIntentFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateSubmitToIntentPdf } from '@/utils/pdfObjectMaker';
import { generateSubmitToIntentFormPdf } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';

const programData = [
  'FDC Program',
  'Standard Claim Progress',
  'IDES',
  'BDD Program Claim',
];
const typesOfAddressChangeData = ['Permanent', 'Temporary'];

const yesNoData = ['Yes', 'No'];
const relationshipToVeteranData = [
  'Spouse',
  'Child',
  'Fiduciary',
  'Veteran Service Officer',
  'Alternate Signer',
  'Third-Party',
  'Other',
];

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

const dicOption = [
  {
    option:
      'Survivors pension and/or dependency and indemnity compensation (DIC)',
    isSelected: false,
  },
];

const beifitOption = [
  {
    option: 'COMPENSATION',
    isSelected: false,
  },
  {
    option: 'PENSION',
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

const signatureOption = [
  {
    option: 'Signature of veteran/claimant/authorized agent (Required)',
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
    currentlyHomelesslivingSituation: livingSituationData,
    currentlyHomelessspecify: '',
    riskOfHomeless: '',
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
        notAvailable: false,
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
    noRetiredPayment: false,
    separationPay: '',
    separationPayPaymentDate: '',
    separationPayBranchOfService: '',
    separationPayAmountReceived: '',
    noInactivePayment: false,

    directDeposit: false,
    veteranDateSigned: '',
    directDepositAccountNumber: '',
    directDepositRoutingNumber: '',
    directDepositFinancialInstitution: '',
    directDepositAccountType: '',

    signature: '',

    firstWitness: '',
    secondWitness: '',
    alternateSignatureDate: '',
    poaSignatureDate: '',
  });

  return (
    <FrontLayout title="New Claim or Increase">
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
        }) => {
          const loadDataFromLocalStorage = async () => {
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
              claimantsEmailE: data.claimantsEmailE
                ? [{ ...receivingEmail[0], isSelected: true }]
                : [...receivingEmail],
              dic: data.dic
                ? [{ ...dicOption[0], isSelected: true }]
                : [...dicOption],
              benefitElection: (data.benefitElection || beifitOption).map(
                (item, idx) => ({
                  option: item.name || beifitOption[idx]?.option,
                  isSelected: !!item.selected,
                })
              ),
              signatureOption: data.signature
                ? [{ ...signatureOption[0], isSelected: true }]
                : [...signatureOption],
              signature: data.signature
                ? data.signature
                : user?.signature || '',
            };

            setValues(dataBody);
          };
          const loadData = async () => {
            setIsLoading(true);
            const data = await getFormData({
              uid: uid,
              formName: 'fillform',
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
              console.log('Form data from Firebase:', data);
              console.log('inProgress : ', inProgress);

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
              console.log('No data found');
            }
            setIsLoading(false);
          };

          useEffect(() => {
            if (!router.isReady) return;
            // loadData();
          }, [uid, router.isReady, router.query]);

          const transformFormValues = async (formData) => {
            return {
              ...formData,
              emailE: formData.emailE?.[0]?.isSelected || false,
              claimantsEmailE:
                formData.claimantsEmailE?.[0]?.isSelected || false,
              dic: formData.dic?.[0]?.isSelected || false,
              benefitElection: formData.benefitElection.map((item) => ({
                name: item.option,
                selected: item.isSelected,
              })),
              signature: formData.signatureOption?.[0]?.isSelected
                ? formData.signature
                : '',
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            console.log('>> save Data :  isFromSaveData : ', isFromSaveData);
            var formData = await transformFormValues(values);
            formData = { ...formData, ...fields };
            console.log('>> save Data : ', formData);
            try {
              await postFormData({
                docName: 'fillform',
                uid: uid,
                formId: 'Submit\nIntent',
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
            const pdfObject = await generateSubmitToIntentPdf(formData);
            await generateSubmitToIntentFormPdf(pdfObject)
              .then(async (res) => {
                if (isFromGeneratePdf) {
                  await saveData({ pdf: true }, false);
                }
                setIsLoading(false);
                window.open(res?.download_url, '_blank');
              })
              .catch((err) => {
                console.log('error', err);
                toast.error('Error generating PDF. Please try again.');
              })
              .finally(() => {
                setIsLoading(false);
              });
          };

          const setTouchedAction = () => {
            setTouched(
              Object.keys(values).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {})
            );
          };

          const onViewDetails = async () => {
            await generatePdf(initialValues, false);
          };

          const onSave = async () => {
            setTouchedAction();
            const allErrors = await validateForm();
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              SubmitIntentFileMap
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
              SubmitIntentFileMap
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
              await generatePdf(values, false);
            }
          };

          const onSubmit = async () => {
            setTouchedAction();
            const allErrors = await validateForm();
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              SubmitIntentFileMap
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
              console.log('1  faxData >> ', formData);
              const pdfObject = await generateSubmitToIntentPdf(formData);
              console.log('2  faxData >> ', pdfObject);

              await generateSubmitToIntentFormPdf(pdfObject)
                .then(async (res) => {
                  console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'fillsubmitform.pdf',
                    false
                  );
                  const faxData = {
                    ...faxBody,
                    sFileContent_1: res?.download_url,
                  };
                  console.log(' faxData >> ', faxData);

                  const faxResponse = await sendViaSRFax(faxData);

                  console.log('faxReponse >> ', faxResponse);

                  if (faxResponse.Status === 'Success') {
                    const url =
                      res?.permanent_download_url + '|' + urlDocspring;
                    const guids = faxResponse.Result + '|' + guid;

                    var formData = await transformFormValues(values);
                    formData = {
                      ...formData,
                      guid: guid,
                      pdf: false,
                      timestamp: `${moment().format(
                        'MM/DD/YYYY'
                      )}|${timestamp}`,
                      count: count + 1,
                      urlDocspring: url,
                      isUploadedAlready: true,
                    };

                    await postFormData({
                      docName: 'fillform',
                      uid: uid,
                      formId: 'Submit\nIntent',
                      recordExists: recordExists,
                      formData: formData,
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
              title="New Claim or Increase"
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
                  subtitle="(If claim is not an original claim, only Section I, IV(if
            applicable), V and a signature are required)"
                />
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
                <SectionTitle
                  title="Section II: Change of Address"
                  subtitle="Note : If you are temporarily or permanently changing your address,
            complete Items 13A through 13-6."
                />
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
                    Effective date(s) of new address (If your change of address
                    is temporary, complete both the beginning and ending date of
                    your temporary address) (If your change of address is
                    permanent, please enter your effective date in the beginning
                    date only)
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

                <SectionTitle title="Section III: Homeless Information" />

                <DropDownExtended
                  label="Are you currently homeless?"
                  name="currentlyHomeless"
                  data={yesNoData}
                  fieldCounter="(14 of 37)"
                />

                {values.currentlyHomeless === 'Yes' && (
                  <OptionSelector
                    label="Choose the option that applies to your living situation."
                    name="currentlyHomelesslivingSituation"
                    options={values.currentlyHomelesslivingSituation}
                    multiSelect={false}
                    isOtherAllowed={true}
                    fieldCounter="(14-2 of 37)"
                  />
                )}

                <OptionSelector
                  label="Note: Only check the box below if you are a surviving dependent of the veteran."
                  name="dic"
                  options={values.dic}
                  multiSelect={true}
                  isOtherAllowed={false}
                />
                <p>
                  <strong>Important: </strong>
                  After receiving this form, VA will give you the appropriate
                  application to file for the general benefit you select above.
                  You can also apply for VA disability compensation online at
                  www.va.gov. If you give VA a completed application for the
                  selected general benefit within one year of filing this form,
                  your completed application will be considered filed as of the
                  date of receipt of this form. Only the first completed
                  application for each selected general benefit that is received
                  after you file this form will be considered filed as of the
                  date of receipt of this form. You may indicate your intent to
                  file for more than one general benefit on this form or you may
                  submit a separate intent to file (VA Form 21-0966) for each
                  general benefit. Please complete as much of this form as
                  possible, as VA cannot process this form if we cannot identify
                  the claimant and/or veteran.
                </p>
                <SectionTitle title="Section IV: Declartion Of Intent And Signature" />
                <OptionSelector
                  name="signatureOption"
                  options={signatureOption}
                  multiSelect={false}
                  isOtherAllowed={false}
                />
                <DateSelectorExtended
                  label="Date Signed (Required)"
                  name="veteranDateSigned"
                  value={values.veteranDateSigned}
                  placeholder="Select Date"
                  onChange={(val) => setFieldValue('veteranDateSigned', val)}
                  fieldCounter="(21 of 21)"
                />
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
