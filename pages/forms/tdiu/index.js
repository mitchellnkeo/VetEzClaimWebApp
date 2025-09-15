import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { TDIUFormValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { TdiuFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateTdiuPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import DropDownExtended from '@/components/Common/DropDownExtended';
import Divider from '@/components/Common/Divider';
import { StateData } from '@/utils/staticData';

const signatureOption = [
  {
    option: 'Signature Of Claimant (Required)',
    isSelected: true,
  },
];

const receivingEmail = [
    {
      option:
        'I agree to receive electronic correspondence from VA in regards to my claim',
      isSelected: false,
    },
];

const educationSelectionOpt  = [
    {
        option: '1 Grade School',
        isSelected: false,
    },
    {
        option: '2 Grade School',
        isSelected: false,
    },
    {
        option: '3 Grade School',
        isSelected: false,
    },
    {
        option: '4 Grade School',
        isSelected: false,
    },
    {
        option: '5 Grade School',
        isSelected: false,
    },
    {
        option: '6 Grade School',
        isSelected: false,
    },
    {
        option: '7 Grade School',
        isSelected: false,
    },
    {
        option: '8 Grade School',
        isSelected: false,
    },
    {
        option: '9 High School',
        isSelected: false,
    },
    {
        option: '10 High School',
        isSelected: false,
    },
    {
        option: '11 High School',
        isSelected: false,
    },
    {
        option: '12 High School',
        isSelected: false,
    },
    {
        option: 'Fresh',
        isSelected: false,
    },
    {
        option: 'Soph',
        isSelected: false,
    },
    {
        option: 'Jr',
        isSelected: false,
    },
    {
        option: 'Sr',
        isSelected: false,
    },
];

const yesNoData = ['Yes', 'No'];

export default function TDIUForm() {
  const formTitle       = 'Increased Rating due to TDIU (Unemployability) (Form 21-8940)';
  const formId          = 'tdiuform';
  const formName        = '21-8940';


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

  // console.log('>> Reloaded :: ', router.query, inProgress);

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
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
    email: '',
    emailE: false,
    receivingEmailOpt: receivingEmail,

    //   section II
    gainfulOccupation: '',
    doctorCare: '',
    dateTreatmentFrom: '',
    dateTreatmentTo: '',
    nameAddressDoctors: '',
    nameAddressHospital: '',
    dateHospitalizationFrom: '',
    dateHospitalizationTo: '',


    //   section III
    dateFullTimeEmployment: '',
    dateFullTimeWorked: '',
    dateDisabledWork: '',
    amountEarnedYear: '',
    whatYear: '',
    occupationDuring: '',
    employmentStatement: [
      {
        nameAddress: '',
        typeWork: '',
        hoursPerWeek: '',
        dateEmploymentFrom: '',
        dateEmploymentTo: '',
        timeLostIllness: '',
        amountGross: '',
      },
    ],
    disabilityMilitary: '',
    disabilityJobSelf: '',
    amountTotalMonthly: '',
    amountTotal12Months: '',
    disabilityReceiveExpect: '',
    workersReceiveExpect: '',
    disabledWork: '',

    // options 
    employerNameAddress1: '', 
    typeOfWork1: '',
    dateApplied1: '',
    employerNameAddress2: '', 
    typeOfWork2: '',
    dateApplied2: '',
    employerNameAddress3: '', 
    typeOfWork3: '',
    dateApplied3: '',


    // section IV
    education: '',
    educationOpt: educationSelectionOpt,
    educationDisabledWorkOne: '',
    typeOfTrainingOne: '',
    dateOfTrainingOneFrom: '',
    dateOfTrainingOneTo: '',
    educationDisabledWorkTwo: '',
    typeOfTrainingTwo: '',
    dateOfTrainingTwoFrom: '',
    dateOfTrainingTwoTo: '',

    // section V
    remarks: '',

    // section VI
    hasSignature: false,
    signature: '',
    veteranDateSigned: '',
  });

  return (
    <FrontLayout title={formTitle}>
      <Breadcrumb
        preUrl="/forms/menu"
        preTitle="Form Menu"
        currentTitle={formTitle}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={TDIUFormValidationSchema}
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
                birthday: user.dob ? user.dob : '',
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
            const eduOpt = data.educationOpt.map(item => ({
              ...item,
              isSelected: item.option === data.education
            }));
            const dataBody = {
              ...data,
              educationOpt: eduOpt,
            };
            setValues(dataBody);
          };
          
          const loadData = async () => {
            setIsLoading(true);
            const data = await getFormData({
              uid: uid,
              formName: formId,
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
            loadData();
          }, [uid, router.isReady, router.query]);

          const transformFormValues = async (formData) => {
            return {
              ...formData,
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            console.log('>> save Data :  isFromSaveData : ', isFromSaveData);
            var formData = await transformFormValues(values);
            formData = { ...formData, ...fields };
            console.log('>> save Data : ', formData);
            try {
              await postFormData({
                docName: formId,
                uid: uid,
                formId: formName,
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
            const pdfObject = await  generateTdiuPdfObject(formData);
            await generatePdfService(pdfObject, 'generatepdf17')
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
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              TdiuFileMap
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
              TdiuFileMap
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
              TdiuFileMap
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
              const pdfObject = await generateTdiuPdfObject(formData);
              console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf17')
                .then(async (res) => {
                  console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'tdiuform.pdf',
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
                      docName: formId,
                      uid: uid,
                      formId: formName,
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
              title={formTitle}
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

                <SectionTitle title="Section I:  Veteran's Identification Information" />
                <> 
                    <TextInput
                        label={`Veteran's First Name`}
                        name="firstName"
                        placeholder="Enter first name"
                        fieldCounter="(1 of 28)"
                        limit={12}
                    />
                    <TextInput
                        label="Veteran's Last Name"
                        name="lastName"
                        placeholder="Enter file number"
                        fieldCounter="(1-2 of 28)"
                        limit={18}
                    />
                    <TextInput
                        label="Social Security Number"
                        name="ssn"
                        placeholder="Enter ssn"
                        fieldCounter="(2 of 28)"
                        limit={9}
                    />
                    <TextInput
                        label="VA File Number"
                        name="currentVa"
                        placeholder="Enter va file number"
                        fieldCounter="(3 of 28)"
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
                        fieldCounter="(4 of 28)"  
                    />


                    <Divider title="Mailing Address" />
                    <TextInput
                      label="No. & Street"
                      name="street"
                      placeholder="Enter street"
                      fieldCounter="(5 of 28)"
                      limit={30}
                    />
                    <TextInput
                      label="Apt./Unit Number"
                      name="unitNumber"
                      placeholder="Enter apt/unit number"
                      fieldCounter="(5-2 of 28)"
                      limit={5}
                    />
                    <TextInput
                      label="City"
                      name="city"
                      placeholder="Enter city"
                      fieldCounter="(5-3 of 28)"
                      limit={18}    
                    />
                    <DropDownExtended
                      label="State/Province"
                      name="province"
                      data={StateData}
                      fieldCounter="(5-4 of 28)"
                    />
                    <TextInput
                      label="Country"
                      name="country"
                      fieldCounter="(5-5 of 28)"
                      limit={2}
                      readOnly
                    />
                    <TextInput
                      label="ZIP Code/Postal Code"
                      name="zipCode"
                      placeholder="Enter zip/postal code"
                      fieldCounter="(5-6 of 28)"
                      limit={10}
                    />

                    <TextInput
                        label="Email Address"
                        name="email"
                        placeholder="Enter email"
                        fieldCounter="(6 of 28)"
                    />

                    <OptionSelector
                        name="receivingEmailOpt"
                        options={values.receivingEmailOpt}
                        multiSelect={true}
                        isOtherAllowed={false}
                        onSelectionChange={async (options) => {
                           await setFieldValue('emailE', options[0].isSelected)
                        }}
                    />

                    <Divider title="Contact" />
                    <TextInput
                        label="Telephone Number"
                        name="phone"
                        placeholder="Enter telephone number"
                        fieldCounter="(7 of 28)"
                        limit={12}
                        hasCounter
                    />

                    <TextInput
                        label="International Telephone Number"
                        name="phoneI"
                        placeholder="Enter international telephone number"
                        fieldCounter="(7-2 of 28)"
                        limit={15}
                        hasCounter
                    />
                </>


                <SectionTitle title="Section II: Disability & Medical Information" />
                <> 
                    <TextInput
                        label="What Service-Connected Disability Prevents You From Securing Or Following Any Substantially Gainful Occupation?"
                        name="gainfulOccupation"
                        placeholder="Enter gainful occupation"
                        fieldCounter="(8 of 28)"
                        limit={140}
                        hasCounter
                    />

                    <DropDownExtended
                        label="Have You Been Under A Doctor's Care And/Or Hospitalized Within The Past 12 Months?"
                        name="doctorCare"
                        data={yesNoData}
                        fieldCounter="(9 of 28)"
                    />
                    <>
                        <div className="flex items-center justify-between my-3">
                            <p
                                className="m-0"
                                style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
                            >
                                Date(s) Of Treatment By Doctor(s)
                            </p>

                            {/* Field counter on the right */}
                            <span style={{ fontSize: '12px', color: '#999' }}>
                                (10 of 28)
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                                        <DateSelectorExtended
                                            label="From"
                                            allowRange={true}
                                            name={`dateTreatmentFrom`}
                                            referenceDate={values.dateTreatmentTo}
                                            value={values.dateTreatmentFrom}
                                            placeholder="Select Date"
                                            onChange={(val) =>
                                                setFieldValue(`dateTreatmentFrom`, val)
                                            }
                                            isStartDate={true}
                                        />

                                        <DateSelectorExtended
                                            label="To"
                                            allowRange={true}
                                            name={`dateTreatmentTo`}
                                            value={values.dateTreatmentTo}
                                            referenceDate={values.dateTreatmentFrom}
                                            placeholder="Select Date"
                                            onChange={(val) =>
                                                setFieldValue(`dateTreatmentTo`, val)
                                            }
                                            isStartDate={false}
                                        />
                        </div>
                    </>

                    <TextInput
                        label="Name And Address Of Doctor(s)"
                        name="nameAddressDoctors"
                        placeholder="Enter name and address of doctor(s)"
                        fieldCounter="(11 of 28)"
                        limit={140}
                        hasCounter
                    />

                    <TextInput
                        label="Name And Address Of Hospital(s)"
                        name="nameAddressHospital"
                        placeholder="Enter name and address of hospital(s)"
                        fieldCounter="(12 of 28)"
                        limit={140}
                        hasCounter
                    />

                    <>
                        <div className="flex items-center justify-between my-3">
                            <p
                                className="m-0"
                                style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
                            >
                                Date(s) Of Hospitalization
                            </p>

                            {/* Field counter on the right */}
                            <span style={{ fontSize: '12px', color: '#999' }}>
                                (13 of 28)
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                                        <DateSelectorExtended
                                            label="From"
                                            allowRange={true}
                                            name={`dateHospitalizationFrom`}
                                            referenceDate={values.dateHospitalizationTo}
                                            value={values.dateHospitalizationFrom}
                                            placeholder="Select Date"
                                            onChange={(val) =>
                                                setFieldValue(`dateHospitalizationFrom`, val)
                                            }
                                            isStartDate={true}
                                        />

                                        <DateSelectorExtended
                                            label="To"
                                            allowRange={true}
                                            name={`dateHospitalizationTo`}
                                            value={values.dateHospitalizationTo}
                                            referenceDate={values.dateHospitalizationFrom}
                                            placeholder="Select Date"
                                            onChange={(val) =>
                                                setFieldValue(`dateHospitalizationTo`, val)
                                            }
                                            isStartDate={false}
                                        />
                        </div>
                    </>
                </>

                <SectionTitle title="Section III: Employment Statement" />
                <> 
                    <DateSelectorExtended
                        label="Date your disability affected your full-time employment"
                        name="dateFullTimeEmployment"
                        value={values.dateFullTimeEmployment}
                        placeholder="Select Date"
                        onChange={(val) => setFieldValue('dateFullTimeEmployment', val)}
                        fieldCounter="(14 of 28)"
                    />
                    <DateSelectorExtended
                        label="Date you last worked full-time"
                        name="dateFullTimeWorked"
                        value={values.dateFullTimeWorked}
                        placeholder="Select Date"
                        onChange={(val) => setFieldValue('dateFullTimeWorked', val)}
                        fieldCounter="(15 of 28)"
                    />
                    <DateSelectorExtended
                        label="Date you became disabled to work"
                        name="dateDisabledWork"
                        value={values.dateDisabledWork}
                        placeholder="Select Date"
                        onChange={(val) => setFieldValue('dateDisabledWork', val)}
                        fieldCounter="(16 of 28)"
                    />
                    <TextInput
                        label="`What is the most you ever earned in one year?"
                        name="amountEarnedYear"
                        placeholder="Enter amount earned in the year of your disability"
                        fieldCounter="(17 of 28)"
                        limit={6}
                    />
                    <TextInput
                        label="What year?"
                        name="whatYear"
                        placeholder="Enter what year did you become disabled?"
                        fieldCounter="(17-2 of 28)"
                        limit={4}
                    />
                    <TextInput
                        label="Occupation During That Year?"
                        name="occupationDuring"
                        placeholder="Enter occupation during that year?"
                        fieldCounter="(17-3 of 28)"
                        limit={28}
                    />


                    <>
                        <div className="flex items-center justify-between my-3">
                            <p
                                className="m-0"
                                style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
                            >
                               List all your employment including self-employment for the last
                               five years you worked
                            </p>

                            {/* Field counter on the right */}
                            <span style={{ fontSize: '12px', color: '#999' }}>
                                (18 of 28)
                            </span>
                        </div>
                        <>
                            {values.employmentStatement.map((item, ind) => {
                            return (
                                <div key={ind} className="mt-10">
                                    <Divider title={`Employment #${ ind + 1}` } lightTitle/>
                                    <TextInput
                                        label={`Name And Address Of Employer (Or Unit)`}
                                        name={`employmentStatement[${ind}].nameAddress`}
                                        placeholder="Enter name and address of employer (or unit)"
                                        hasCounter
                                        multiline
                                        limit={350}
                                    />

                                    <TextInput
                                        label={`Type Of Work`}
                                        name={`employmentStatement[${ind}].typeWork`}
                                        placeholder="Enter type of work"
                                        hasCounter
                                        limit={84}
                                    />
                                    <TextInput
                                        label={`Hours Per Week`}
                                        name={`employmentStatement[${ind}].hoursPerWeek`}
                                        placeholder="Enter hours per week"
                                        hasCounter
                                        limit={3}
                                    />
                                    <>
                                        <div>
                                            <p
                                            className="my-3"
                                            style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
                                            >
                                               Date(s) Of Employment
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                                <DateSelectorExtended
                                                    label="From"
                                                    allowRange={true}
                                                    name={`employmentStatement[${ind}].dateEmploymentFrom`}
                                                    referenceDate={values.employmentStatement[ind].dateEmploymentTo}
                                                    value={values.employmentStatement[ind].dateEmploymentFrom}
                                                    placeholder="Select Date"
                                                    onChange={(val) =>
                                                        setFieldValue(`employmentStatement[${ind}].dateEmploymentFrom`, val)
                                                    }
                                                    isStartDate={true}
                                                />

                                                <DateSelectorExtended
                                                    label="To"
                                                    allowRange={true}
                                                    name={`employmentStatement[${ind}].dateEmploymentTo`}
                                                    value={values.employmentStatement[ind].dateEmploymentTo}
                                                    referenceDate={values.employmentStatement[ind].dateEmploymentFrom}
                                                    placeholder="Select Date"
                                                    onChange={(val) =>
                                                        setFieldValue(`employmentStatement[${ind}].dateEmploymentTo`, val)
                                                    }
                                                    isStartDate={false}
                                                />
                                        </div>
                                    </>
                                    <TextInput
                                        label="Time lost from illness"
                                        name={`employmentStatement[${ind}].timeLostIllness`}
                                        placeholder="Enter time lost from illness"
                                        limit={3}
                                        hasCounter
                                    />
                                    <TextInput
                                        label="Highest gross earnings per month"
                                        name={`employmentStatement[${ind}].amountGross`}
                                        placeholder="Enter highest gross earnings per month"
                                        limit={6}
                                    />
                                </div>
                            );
                            })}

                            <div className="mt-5 grid grid-cols-2 gap-6">
                            <button
                                className="cursor-pointer rounded bg-gray-200 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-gray-300"
                                disabled={values.employmentStatement.length >= 5}
                                onClick={() => {
                                setValues({
                                    ...values,
                                    employmentStatement: [
                                    ...values.employmentStatement,
                                    {
                                        nameAddress: '',
                                        typeWork: '',
                                        hoursPerWeek: '',
                                        dateEmploymentFrom: '',
                                        dateEmploymentTo: '',
                                        timeLostIllness: '',
                                        amountGross: '',
                                    },
                                    ],
                                });
                                }}
                            >
                                Add Employment
                            </button>

                            <button
                                className="cursor-pointer rounded bg-yellow-400 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                                hidden={values.employmentStatement.length <= 1}
                                onClick={() => {
                                if (values.employmentStatement.length > 1) {
                                    const updatedIssue = [
                                    ...values.employmentStatement,
                                    ];
                                    updatedIssue.pop();
                                    setValues({
                                    ...values,
                                    employmentStatement: [...updatedIssue],
                                    });
                                }
                                }}
                            >
                                Remove Employment
                            </button>
                            </div>
                        </>                 
                    </>

                    <br />
                    <br />
                    <DropDownExtended
                        label="If You Are Currently Serving In The Reserve Or National Guard, Does Your Service Connected Disability Prevent You From Performing Your Military Duties?"
                        name="disabilityMilitary"
                        data={yesNoData}
                        fieldCounter="(19 of 28)"
                    />
                    <TextInput
                        label="Indicate Your Total Earned Income For The Past 12 Months"
                        name="amountTotal12Months"
                        placeholder="Enter total earned income for the past 12 months"
                        fieldCounter="(20 of 28)"
                        limit={6}
                    />
                    <TextInput
                        label="If Presently Employed, Indicate Your Current Monthly Earned Income"
                        name="amountTotalMonthly"
                        placeholder="Enter current monthly earned income"
                        fieldCounter="(20-2 of 28)"
                        limit={6}
                    />
                    <DropDownExtended
                        label="Did You Leave Your Last Job/Self-Employment Because Of Your Disability?"
                        name="disabilityJobSelf"
                        data={yesNoData}
                        fieldCounter="(21 of 28)"
                    />
                    <DropDownExtended
                        label="Do You Receive/Expect To Receive Disability Retirement Benefits?"
                        name="disabilityReceiveExpect"
                        data={yesNoData}
                        fieldCounter="(21-2 of 28)"
                    />
                    <DropDownExtended
                        label="Do You Receive/Expect To Receive Workers Compensation Benefits?"
                        name="workersReceiveExpect"
                        data={yesNoData}
                        fieldCounter="(21-3 of 28)"
                    />
                    <DropDownExtended
                        label="Have you tried to obtain employment since you became too disabled to work?"
                        name="disabledWork"
                        data={yesNoData}
                        fieldCounter="(22 of 28)"
                    />

                    {values.disabledWork === 'Yes' && (
                        <>
                          
                            <br />
                            <Divider title="Employer #1" lightTitle />
                            <TextInput
                                label="Name and Address of Employer"
                                name="employerNameAddress1"
                                placeholder="Enter name and address of employer"
                                fieldCounter="(22-2-1 of 28)"
                                limit={250}
                                multiline
                                numberOfLines={4}
                                hasCounter
                            />

                            <TextInput
                                label="Type of Work"
                                name="typeOfWork1"
                                placeholder="Enter type of work"
                                fieldCounter="(22-2-2 of 28)"
                                limit={84}
                                hasCounter
                            />

                            <DateSelectorExtended
                                label="Date Applied"
                                name="dateApplied1"
                                value={values.dateApplied1}
                                placeholder="Select Date"
                                onChange={(val) => setFieldValue('dateApplied1', val)}
                                fieldCounter="(22-2-3 of 28)"
                            /> 

                           
                            <br />
                            <Divider title="Employer #2" lightTitle />

                            <TextInput
                                label="Name and Address of Employer"
                                name="employerNameAddress2"
                                placeholder="Enter name and address of employer"
                                fieldCounter="(22-2-1 of 28)"
                                limit={250}
                                multiline
                                numberOfLines={4}
                                hasCounter
                            />

                            <TextInput
                                label="Type of Work"
                                name="typeOfWork2"
                                placeholder="Enter type of work"
                                fieldCounter="(22-2-2 of 28)"
                                limit={84}
                                hasCounter
                            />


                            <DateSelectorExtended
                                label="Date Applied"
                                name="dateApplied2"
                                value={values.dateApplied2}
                                placeholder="Select Date"
                                onChange={(val) => setFieldValue('dateApplied2', val)}
                                fieldCounter="(22-2-3 of 28)"
                            /> 
                            
                            <br />
                            <Divider title="Employer #3" lightTitle />

                            <TextInput
                                label="Name and Address of Employer"
                                name="employerNameAddress3"
                                placeholder="Enter name and address of employer"
                                fieldCounter="(22-2-1 of 28)"
                                limit={250}
                                multiline
                                numberOfLines={4}
                                hasCounter
                            />

                            <TextInput
                                label="Type of Work"
                                name="typeOfWork3"
                                placeholder="Enter type of work"
                                fieldCounter="(22-2-2 of 28)"
                                limit={84}
                                hasCounter
                            />


                            <DateSelectorExtended
                                label="Date Applied"
                                name="dateApplied3"
                                value={values.dateApplied3}
                                placeholder="Select Date"
                                onChange={(val) => setFieldValue('dateApplied3', val)}
                                fieldCounter="(22-2-3 of 28)"
                            /> 
                        </>
                    )}
                    
                </>


                <SectionTitle title="Section IV: Schooling and Other Training" />
                <> 
                    <OptionSelector
                        label="Education (Check the highest year completed)"
                        name="educationOpt"
                        options={values.educationOpt}
                        multiSelect={false}
                        isOtherAllowed={false}
                        fieldCounter="(23 of 28)"
                        onSelectionChange={async (options) => {
                            const selectedOption = options.find(item => item.isSelected);
                            let educationStr = ''
                            if (selectedOption) {
                                educationStr = selectedOption.option
                            }
                            await setFieldValue('education', educationStr)
                        }}
                    />
                    <ErrorMessage name="education" component="div" style={{ fontSize: '12px', color: 'red' }} />
                    <br />
                    <DropDownExtended
                        label="Did You Have Any Other Education And Training Before You Were Too Disabled To Work?"
                        name="educationDisabledWorkOne"
                        data={yesNoData}
                        fieldCounter="(24 of 28)"
                    />
                    {
                        values.educationDisabledWorkOne === 'Yes' && (
                            <>
                                <br />
                                <TextInput
                                    label="Type Of Training"
                                    name="typeOfTrainingOne"
                                    placeholder="Enter type of training"
                                    fieldCounter="(24-2 of 28)"
                                />

                                <>
                                    <div className="flex items-center justify-between my-3">
                                        <p
                                            className="m-0"
                                            style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
                                        >
                                           Dates Of Training
                                        </p>

                                        {/* Field counter on the right */}
                                        <span style={{ fontSize: '12px', color: '#999' }}>
                                            (24-3 of 28)
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                                    <DateSelectorExtended
                                                        label="From"
                                                        allowRange={true}
                                                        name={`dateOfTrainingOneFrom`}
                                                        referenceDate={values.dateOfTrainingOneTo}
                                                        value={values.dateOfTrainingOneFrom}
                                                        placeholder="Select Date"
                                                        onChange={(val) =>
                                                            setFieldValue(`dateOfTrainingOneFrom`, val)
                                                        }
                                                        isStartDate={true}
                                                    />

                                                    <DateSelectorExtended
                                                        label="To"
                                                        allowRange={true}
                                                        name={`dateOfTrainingOneTo`}
                                                        value={values.dateOfTrainingOneTo}
                                                        referenceDate={values.dateOfTrainingOneFrom}
                                                        placeholder="Select Date"
                                                        onChange={(val) =>
                                                            setFieldValue(`dateOfTrainingOneTo`, val)
                                                        }
                                                        isStartDate={false}
                                                    />
                                    </div>
                                </>
                            </>
                        )
                    }
                    <br />
                    <DropDownExtended
                        label="Have you had any education and training since you became too disabled to work?"
                        name="educationDisabledWorkTwo"
                        data={yesNoData}
                        fieldCounter="(25 of 28)"
                    />
                    {
                        values.educationDisabledWorkTwo === 'Yes' && (
                            <>
                                <br />
                                <TextInput
                                    label="Type Of Training"
                                    name="typeOfTrainingTwo"
                                    placeholder="Enter type of training"
                                    fieldCounter="(25-2 of 28)"
                                />

                                <>
                                    <div className="flex items-center justify-between my-3">
                                        <p
                                            className="m-0"
                                            style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
                                        >
                                           Dates Of Training
                                        </p>

                                        {/* Field counter on the right */}
                                        <span style={{ fontSize: '12px', color: '#999' }}>
                                            (25-3 of 28)
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                                    <DateSelectorExtended
                                                        label="Beginning"
                                                        allowRange={true}
                                                        name={`dateOfTrainingTwoFrom`}
                                                        referenceDate={values.dateOfTrainingTwoTo}
                                                        value={values.dateOfTrainingTwoFrom}
                                                        placeholder="Select Date"
                                                        onChange={(val) =>      
                                                            setFieldValue(`dateOfTrainingTwoFrom`, val)
                                                        }
                                                        isStartDate={true}
                                                    />

                                                    <DateSelectorExtended
                                                        label="Ending"
                                                        allowRange={true}
                                                        name={`dateOfTrainingTwoTo`}
                                                        value={values.dateOfTrainingTwoTo}
                                                        referenceDate={values.dateOfTrainingTwoFrom}
                                                        placeholder="Select Date"
                                                        onChange={(val) =>
                                                            setFieldValue(`dateOfTrainingTwoTo`, val)
                                                        }
                                                        isStartDate={false}
                                                    />
                                    </div>
                                </>
                            </>
                        )
                    }
                    
                </>

                <SectionTitle title="Section V: Remarks" />
                <> 
                  <TextInput
                      label="Remarks"
                      name="remarks"
                      placeholder="Enter remarks if any"
                      fieldCounter="(26 of 28)"
                      limit={1500}
                      hasCounter
                      multiline
                  />
                </>

                <SectionTitle title="Section VI:  Authorization, Certification, and Signature" />
                <> 
                    <OptionSelector
                      name="signatureOption"
                      options={signatureOption}
                      multiSelect={false}
                      isOtherAllowed={false}
                      lockOption={true}
                    />

                    <DateSelectorExtended
                      label="Date Signed (Required)"
                      name="veteranDateSigned"
                      value={values.veteranDateSigned}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('veteranDateSigned', val)}
                      fieldCounter="(28 of 28)"
                    /> 
                </>

              </Form>

            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
