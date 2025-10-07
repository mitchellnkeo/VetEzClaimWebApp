import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { RequestCFileValidation } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData } from '@/utils/staticData';
import Divider from '@/components/Common/Divider';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { RequestCFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateRequestCFilePdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import SubscriptionRequired from '@/components/Common/SubscriptionRequired';



const receivingEmail = [
  {
    option:
      'I agree to receive electronic correspondence from VA in regards to my claim',
    isSelected: false,
  },
];

const recordRequestOption = [
  {
    option: 'CLAIMS FILE (C-FILE)',
    isSelected: false,
  },
  {
    option: 'DD FORM 214',
    isSelected: false,
  },
  {
    option: 'HUMAN RESOURCE RECORDS',
    isSelected: false,
  },
  {
    option: 'LIFE INSURANCE BENEFIT RECORDS\n(If applicable, enter policy number in Section IV, Item 18, Remarks)',
    isSelected: false,
  },
  {
    option: 'SERVICE TREATMENT RECORDS / MILITARY TREATMENT RECORDS',
    isSelected: false,
  },
  {
    option: 'LIFE INSURANCE RECORDS',
    isSelected: false,
  },
  {
    option: 'HOME LOAN BENEFIT RECORDS',
    isSelected: false,
  },
  
  {
    option: 'VOCATIONAL REHABILITATION RECORDS AND EMPLOYMENT RECORDS',
    isSelected: false,
  },

  {
    option: 'FIDUCIARY SERVICES RECORDS',
    isSelected: false,
  },

  {
    option: 'MILITARY TO CIVILIAN TRANSITION TAP DOCUMENTS',
    isSelected: false,
  },

  {
    option: 'PENSION BENEFIT DOCUMENTS',
    isSelected: false,
  },
  
  {
    option: 'EDUCATION BENEFIT RECORDS',
    isSelected: false,
  },

  {
    option: 'FINANCIAL RECORDS',
    isSelected: false,
  },
  {
    option: 'DISABILITY EXAMINATIONS\n(C & P EXAMS) (If applicable enter date of exam in Section VI, Item 20, Remarks)',
    isSelected: false,
  },
  { 
    option: 'OTHER',
    isSelected: false,
  },
];

const signatureOption = [
  {
    option: 'Requester\'s Signature (Required)',
    isSelected: true,
  },
];

const willingOption = [
    {
      option:
        'I AM WILLING TO PAY THE APPLICABLE FEES UP TO THE AMOUNT OF',
      isSelected: false,
    },
  ];

const indicateOption = [
    {
        option: 'IF YOU BELIEVE YOU ARE ENTITLED TO A FEE WAIVER OR EXPEDITED PROCESSING, PLEASE INDICATE:', 
        isSelected: false 
    }
  ]

  const optionToFormikField = {
    'CLAIMS FILE (C-FILE)': 'claimsFile',
    'DD FORM 214': 'ddForm214',
    'HUMAN RESOURCE RECORDS': 'humanResourceRecords',
    'LIFE INSURANCE BENEFIT RECORDS\n(If applicable, enter policy number in Section IV, Item 18, Remarks)': 'lifeInsuranceBenefitRecords',
    'SERVICE TREATMENT RECORDS / MILITARY TREATMENT RECORDS': 'serviceTreatment',    
    'LIFE INSURANCE RECORDS': 'lifeInsuranceRecords',
    'HOME LOAN BENEFIT RECORDS': 'homeLoanBenefitRecords',
    'VOCATIONAL REHABILITATION RECORDS AND EMPLOYMENT RECORDS': 'vocationalRehabilitationRecords',
    'FIDUCIARY SERVICES RECORDS': 'fiduciaryServicesRecords',   
    'MILITARY TO CIVILIAN TRANSITION TAP DOCUMENTS': 'militaryToCivilianTransition',    
    'PENSION BENEFIT DOCUMENTS': 'pensionBenefit',
    'EDUCATION BENEFIT RECORDS': 'educationBenefitRecords',
    'FINANCIAL RECORDS': 'financialRecords',
    'DISABILITY EXAMINATIONS\n(C & P EXAMS) (If applicable enter date of exam in Section VI, Item 20, Remarks)': 'disabilityExaminations',
    'OTHER': 'other', // special case because it has { value, specify } 
  };
  
  

export default function SubmitToIntentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, uid } = useSelector((state) => state.auth);
  const [recordExists, setRecordsExists] = useState(false);
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [urlDocspring, setUrlDocspring] = useState('');
  const [guid, setGuid] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [count, setCount] = useState(0);
  const router = useRouter();
  const { ['in-progress']: inProgress } = router.query;

  // console.log('>> Reloaded :: ', router.query, inProgress);

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    currentVa: '',
    alien: '',
    birthday: '',
    placeBirth: '',
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    country: 'US',
    zipCode: '',
    phone: '',
    phoneI: '',
    fax: '',
    faxI: '',
    email: '',
    emailE: receivingEmail,
    

    firstNameTwo: '',
    lastNameTwo: '',
    organization: '',
    streetTwo: '',
    unitNumberTwo: '',
    cityTwo: '',
    provinceTwo: '',
    countryTwo: 'US',
    zipCodeTwo: '',
    phoneTwo: '',
    phoneITwo: '',
    faxTwo: '',
    faxITwo: '',

    firstNameThree: '',
    lastNameThree: '',
    ssnThree: '',
    alienThree: '',
    currentVaThree: '',
    recordRequest: recordRequestOption,
    typeOfRecords: {
      claimsFile: false,
      serviceTreatment: false,
      ddForm214: false,
      disabilityExaminations: false,
      pensionBenefit: false,
      humanResourceRecords: false,
      lifeInsuranceBenefitRecords: false,
      lifeInsuranceRecords: false,
      homeLoanBenefitRecords: false,
      vocationalRehabilitationRecords: false,
      fiduciaryServicesRecords: false,
      militaryToCivilianTransition: false,
      educationBenefitRecords: false,
      financialRecords: false,
      other: {
        value: false,
        specify: '',
      },
    },
    remarks: '',
    associatedVAOffice: '',
    checkApplicableFees: willingOption,
    amount: '',
    checkFeeWaiver: indicateOption,
    feeWaiver: '',
    ssnWillingnessToPay: '',
    dateSignedOne: '',
    signature: '', 

  });

  return (
    <FrontLayout title="Request C-File/DD 214 (Form 20-10206)">
      <Breadcrumb
        preUrl="/forms/menu"
        preTitle="Form Menu"
        currentTitle="Request C-File/DD 214 (Form 20-10206)"
      />
      {!isSubscribed && <SubscriptionRequired />}
      <Formik
        initialValues={initialValues}
        validationSchema={RequestCFileValidation}
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

            const recordRequestCallback = async (selectedOptions) => {
                console.log('recordRequestCallback >> ', selectedOptions);
              
                Object.keys(optionToFormikField).forEach((option) => {
                  const fieldName = optionToFormikField[option];
                  const selectedOption = selectedOptions.find((o) => o.option === option);
              
                  if (fieldName === 'other') {
                   
                    setFieldValue('typeOfRecords.other.value', selectedOption?.isSelected || false);
                    setFieldValue('typeOfRecords.other.specify', selectedOption?.value || '');
                  } else {
                  
                    setFieldValue(`typeOfRecords.${fieldName}`, selectedOption?.isSelected || false);
                  }
                });
              };
              

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
            const updatedRecordRequest = values.recordRequest.map((optionObj) => {
                const key = optionToFormikField[optionObj.option];
                if (key === 'other') {
                  return {
                    ...optionObj,
                    isSelected: data.typeOfRecords.other.value, 
                    value: data.typeOfRecords.other.specify,
                  };
                } else {
                  return {
                    ...optionObj,
                    isSelected: !!data.typeOfRecords[key],
                  };
                }
              });
            var dataBody = {
              ...data,
              emailE: data.emailE
                ? [{ ...receivingEmail[0], isSelected: true }]
                : [...receivingEmail],

            checkApplicableFees: data.checkApplicableFees
                ? [{ ...willingOption[0], isSelected: true }]
                : [...willingOption],

            checkFeeWaiver: data.checkFeeWaiver
                ? [{ ...indicateOption[0], isSelected: true }]
                : [...indicateOption],
            recordRequest: updatedRecordRequest, 
            };
            await setValues(dataBody);
          };

          const loadData = async () => {
            setIsLoading(true);
            const data = await getFormData({
              uid: uid,
              formName: 'requestcfile',
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
            if (!isSubscribed) return;
            loadData();
          }, [uid, router.isReady, router.query]);

          const transformFormValues = async (formData) => {
            return {
              ...formData,
              emailE: formData.emailE?.[0]?.isSelected || false,
              checkApplicableFees:
                formData.checkApplicableFees?.[0]?.isSelected || false,
              checkFeeWaiver: formData.checkFeeWaiver?.[0]?.isSelected || false,
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            var formData = await transformFormValues(values);
            formData = { ...formData, ...fields };
            console.log('>> save Data : ', formData);
            try {
              await postFormData({
                docName: 'requestcfile',
                uid: uid,
                formId: '20-10206',
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
            const pdfObject = await  generateRequestCFilePdfObject(formData);
            await generatePdfService(pdfObject, 'generatepdf15')
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
            console.log('>> onSave : ', values);
            setTouchedAction();
            const allErrors = await validateForm();
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              RequestCFileMap
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
              RequestCFileMap
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
              RequestCFileMap
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
              const pdfObject = await generateRequestCFilePdfObject(formData);
              console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf15')
                .then(async (res) => {
                  console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'requestcfile.pdf',
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
                      docName: 'requestcfile',
                      uid: uid,
                      formId: '20-10206',
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
              title="Request C-File/DD 214 (Form 20-10206)"
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
                <SectionTitle title="Section I: Request for Information on Yourself" subtitle="(If you are seeking information on yourself, complete Sections I, III, V and VI. Complete Section IV, if applicable)"/>
                
                <> 
                <TextInput
                  label="First Name"
                  name="firstName"
                  placeholder="Enter first name"
                  fieldCounter="(1 of 22)"
                  limit={18}
                />
                
            
                <TextInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  fieldCounter="(1-2 of 22)"
                  limit={12}
                />
                <TextInput
                  label="Social Security Number"
                  name="ssn"
                  placeholder="Enter ssn"
                  fieldCounter="(2 of 22)"
                  limit={9}
                />

                <TextInput
                  label="Alien Registration Number"
                  name="alien"
                  placeholder="Enter alien registration number"
                  fieldCounter="(3 of 22)"
                  limit={10}
                />

                <TextInput
                  label="VA File Number"
                  name="currentVa"
                  placeholder="Enter va file number"
                  fieldCounter="(4 of 22)"
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
                  fieldCounter="(5 of 22)"
                />

                 <TextInput
                  label="Place of Birth"
                  name="placeBirth"
                  placeholder="Enter place of birth"
                  fieldCounter="(6 of 22)"
                  limit={100}
                  hasCounter
                />

                <Divider title="Current Mailing Address" />

                <TextInput
                  label="No. & Street"
                  name="street"
                  placeholder="Enter street"
                  fieldCounter="(7 of 22)"
                  limit={20}
                />

                <TextInput
                  label="Apt./Unit Number"
                  name="unitNumber"
                  placeholder="Enter apt/unit number"
                  fieldCounter="(7-2 of 22)"
                  limit={5}
                />

                <TextInput
                  label="City"
                  name="city"       
                  placeholder="Enter city"
                  fieldCounter="(7-3 of 22)"
                  limit={18}
                />
                <DropDownExtended
                  label="State/Province"
                  name="province"
                  data={StateData}
                  hasCounter={true}
                  fieldCounter="(7-4 of 22)"
                />
                <TextInput
                  label="Country"
                  name="country"
                  fieldCounter="(7-5 of 22)"
                  limit={2}
                  readOnly
                />
                <TextInput
                  label="ZIP Code/Postal Code"
                  name="zipCode"
                  placeholder="Enter zip/postal code"
                  fieldCounter="(7-6 of 22)"
                  limit={10}
                />

                <Divider title="Telephone Number" />
                <TextInput
                  label="Telephone Number"
                  name="phone"
                  placeholder="Enter telephone number"
                  fieldCounter="(8 of 22)"
                  limit={12}
                />
                <TextInput
                  label="International Phone Number"
                  name="phoneI"
                  placeholder="Enter international phone number"
                  fieldCounter="(8-2 of 22)"
                  limit={15}
                  hasCounter
                />

                <Divider title="Fax Number" />
                <TextInput
                  label="Fax Number"
                  name="fax"
                  placeholder="Enter fax number"
                  fieldCounter="(8-3 of 22)"
                  limit={10}
                />

                <TextInput
                  label="International Fax Number"
                  name="faxI"
                  placeholder="Enter international fax number"
                  fieldCounter="(8-4 of 22)"
                  limit={15}
                  hasCounter
                />


                <TextInput
                  label="Email Address"
                  name="email"
                  placeholder="Enter email"
                  fieldCounter="(9 of 22)"
                  limit={40}
                  hasCounter
                />



                <OptionSelector
                  name="emailE"
                  options={values.emailE}
                  multiSelect={true}
                  isOtherAllowed={false}
                />

                </>

                <SectionTitle
                  title="Section II: Request for information on a person other than yourself"
                  subtitle=" (If you are seeking information on an individual other than yourself, complete Sections II, III or IV, V, VII and IX or X. Complete Section VI, if applicable)"
                />
            
                  <>
                    <TextInput
                      label="First Name"
                      name="firstNameTwo"
                      placeholder="Enter first name"
                      fieldCounter="(10 of 22)"
                      limit={18}
                    />
                    <TextInput
                      label="Last Name"
                      name="lastNameTwo"
                      placeholder="Enter last name"
                      fieldCounter="(10-2 of 22)"
                      limit={12}
                    />
                    <TextInput
                      label="Organization's Name"
                      name="organization"
                      placeholder="Enter organization's name"
                      fieldCounter="(10-3 of 22)"
                      limit={32}
                      hasCounter
                    />
                    <Divider title="Current Mailing Address" />

                    <TextInput
                      label="No. & Street"
                      name="streetTwo"
                      placeholder="Enter street"
                      fieldCounter="(11 of 22)"
                      limit={30}
                    />
                    <TextInput
                      label="Apt./Unit Number"
                      name="unitNumberTwo"
                      placeholder="Enter apt/unit number"
                      fieldCounter="(11-2 of 22)"
                      limit={5}
                    />
                    <TextInput
                      label="City"
                      name="cityTwo"
                      placeholder="Enter city"
                      fieldCounter="(11-3 of 22)"
                      limit={18}
                    />
                    <DropDownExtended
                      label="State/Province"
                      name="provinceTwo"
                      data={StateData}
                      hasCounter={true}
                      fieldCounter="(11-4 of 22)"
                    />
                    <TextInput
                      label="Country"
                      name="countryTwo"
                      fieldCounter="(11-5 of 22)"
                      limit={2}
                      readOnly
                    />
                    <TextInput
                      label="ZIP Code/Postal Code"
                      name="zipCodeTwo"
                      placeholder="Enter zip/postal code"
                      fieldCounter="(11-6 of 22)"
                      limit={10}
                    />
                        <Divider title="Telephone Number" />
                    <TextInput
                      label="Telephone Number"
                      name="phoneTwo"
                      placeholder="Enter telephone number"
                      fieldCounter="(12 of 22)"
                      limit={12}    
                    />
                    <TextInput
                      label="International Phone Number"
                      name="phoneITwo"
                      placeholder="Enter international phone number"
                      fieldCounter="(12-2 of 22)"
                      limit={15}
                      hasCounter
                    />

                    <Divider title="Fax Number" />
                    <TextInput
                      label="Fax Number"
                      name="faxTwo"
                      placeholder="Enter fax number"
                      fieldCounter="(12-3 of 22)"
                      limit={10}
                    />

                    <TextInput
                      label="International Fax Number"
                      name="faxITwo"
                      placeholder="Enter international fax number"
                      fieldCounter="(12-4 of 22)"
                      limit={15}
                      hasCounter
                    />


                    <Divider title="Name Of The Person You Are Requesting Information On " />

                   <TextInput
                      label="First Name"
                      name="firstNameThree"
                      placeholder="Enter first name"
                      fieldCounter="(13 of 22)"
                      limit={18}
                    />
                    <TextInput
                      label="Last Name"
                      name="lastNameThree"
                      placeholder="Enter last name"
                      fieldCounter="(13-2 of 22)"
                      limit={12}
                    />
                    <TextInput
                      label="Social Security Number"
                      name="ssnThree"
                      placeholder="Enter ssn"
                      fieldCounter="(14 of 22)"
                      limit={9}
                    />

                    <TextInput
                      label="Alien Registration Number"
                      name="alienThree"
                      placeholder="Enter alien registration number"
                      fieldCounter="(15 of 22)"
                      limit={10}
                    />

                    <TextInput
                      label="VA File Number"
                      name="currentVaThree"
                      placeholder="Enter va file number"
                      fieldCounter="(16 of 22)"
                      limit={9}
                      hasCounter
                    />

                  </>
                

                <SectionTitle
                  title="Section III: Records you are seeking"
                  subtitle="(This information is required in order to complete the request)"   />


                <OptionSelector
                  label="Select the type(s) of records you are requesting, below:"
                  name="recordRequest"
                  options={values.recordRequest}
                  multiSelect={true}
                  isOtherAllowed={true}
                  fieldCounter="(17 of 22)"
                  onSelectionChange={(selectedOptions) => {
                    recordRequestCallback(selectedOptions);
                  }}
                  

                />

<ErrorMessage
                    name="typeOfRecords"
                    component="div"
                    className="mt-1 text-danger"
                  />

                <SectionTitle title="Section IV: Remarks" />

                <TextInput
                      label="Remarks"
                      name="remarks"
                      placeholder="Enter remarks if any"
                      fieldCounter="(18 of 22)"
                      limit={175}
                      hasCounter
                      multiline
                    />

<SectionTitle title="Section IV: Willingness to pay fees" />

                <p className="dark:text-white-light"> 
                  19. <strong>Important :</strong> 
                  For the
            purpose of fees only, FOIA divides requesters into three categories:
            (1) commercial requesters may be charged fees for searching for
            records, reviewing the records, and photocopying them; (2)
            educational, non-commercial scientific institutions, and
            representatives of the news media are charged for photocopying after
            the first 100 pages; (3) all other requesters (requesters who do not
            fall into any of the other two categories) are charged for
            photocopying after the first 100 pages and for time spent searching
            for records in excess of two hours. VA charges $0.15 per
            single-sided page for photocopying. Actual costs are charged for a
            format other than paper copies.
            {'\n\n'}
            An agency may grant fee waivers if the requester successfully
            demonstrates that disclosure of information is in the publics
            interest because it is likely to contribute significantly to the
            public understanding of the operations or activities of the
            government and is not primarily in the commercial interest of the
            requester.

                </p>

                <OptionSelector
                  name="checkApplicableFees"
                  options={values.checkApplicableFees}
                  multiSelect={false}
                  isOtherAllowed={false} 
                />

                {values.checkApplicableFees[0].isSelected && (
                    <>
                      <TextInput
                      label="Amount"
                      name="amount"
                      placeholder="Enter amount in $"
                      limit={4}
                      hasCounter
                    />
                    </>
                )}

                <OptionSelector
                  name="checkFeeWaiver"
                  options={values.checkFeeWaiver}
                  multiSelect={false}
                  isOtherAllowed={false} 
                />

{values.checkFeeWaiver[0].isSelected && (
                    <>
                      <TextInput
                      label="Indicate Here"
                      name="feeWaiver"
                      placeholder="Enter here"
                      limit={35}
                      hasCounter
                    />
                    </>
                )}




                <SectionTitle title="Section VI: Requester Certification and Signature"  subtitle="(Valid only if Section II has been completed and requester has an
            authorized third party)"/>

<p className='mb-5 dark:text-white-light'> <strong> I CERTIFY THAT </strong> I have
            completed this FOIA/PA request and declare it is true and correct to
            the best of my knowledge and belief. </p>

                <OptionSelector
                  name="signatureOption"
                  options={signatureOption}
                  multiSelect={false}
                  isOtherAllowed={false}
                  lockOption={true}
                />

                <DateSelectorExtended
                  label="Date Signed (Required)"
                  name="dateSignedOne"
                  value={values.dateSignedOne}
                  placeholder="Select Date"
                  onChange={(val) => setFieldValue('dateSignedOne', val)}
                  fieldCounter="(22 of 22)"
                />
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
