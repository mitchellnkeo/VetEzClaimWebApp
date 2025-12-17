import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { PTSDStressorValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { PTSDStressorFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generatePTSDStressorPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import DropDownExtended from '@/components/Common/DropDownExtended';
import Divider from '@/components/Common/Divider';
import SubscriptionRequired from '@/components/Common/SubscriptionRequired';

const checkOptionsData = [
  'Killed in action',
  'Wounded in action',
  'Killed non-battle',
  'Injured non-battle',
  'Other',
];

const signatureOption = [
  {
    option: "Veteran/Claimant's Signature (Required)",
    isSelected: true,
  },
];

export default function PTSDStressorForm() {
  const formTitle = 'PTSD Stressor Statement (Form 21-0781)';
  const formId = 'ptsdform';
  const formName = '21-0781';

  const [isLoading, setIsLoading] = useState(false);
  const { user, uid } = useSelector((state) => state.auth);
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [recordExists, setRecordsExists] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [urlDocspring, setUrlDocspring] = useState('');
  const [guid, setGuid] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [count, setCount] = useState(0);
  const router = useRouter();
  const { ['in-progress']: inProgress } = router.query;

  // process.env.NODE_ENV === 'development' && console.log('>> Reloaded :: ', router.query, inProgress);

  const [initialValues, setInitialValues] = useState({
    // section I
    firstName: '',
    lastName: '',
    ssn: '',
    currentVa: '', // optional
    birthday: '',
    serviceNumber: '', // optional

    phone: '',
    phoneI: '',
    email: '',

    // section II
    incidentDate1: '',
    dateOfAssignmentFrom1: '',
    dateOfAssignmentTo1: '',
    incidentLocation1: '',
    unitAssignmentDuringIncident0: '',
    descriptionOfIncident1: '',
    medalReceived1: '',

    person1FirstName: '',
    person1LastName: '',
    person1Rank: '', // optional
    injuryDate1: '',
    checkOptions1: '',
    checkOptionsOther1: '',
    unitAssignmentDuringIncident1: '',

    person2FirstName: '',
    person2LastName: '',
    person2Rank: '', // optional
    injuryDate2: '',
    checkOptions2: '',
    checkOptionsOther2: '',
    unitAssignmentDuringIncident2: '',

    incidentDate2: '', // optional
    dateOfAssignmentFrom2: '', // optional
    dateOfAssignmentTo2: '', // optional
    incidentLocation2: '', // optional
    unitAssignmentDuringIncident3: '', // optional
    descriptionOfIncident2: '', // optional
    medalReceived2: '', // optional

    person3FirstName: '', // optional
    person3LastName: '', // optional
    person3Rank: '', // optional
    injuryDate3: '', // optional
    checkOptions3: '', // optional
    checkOptionsOther3: '', // optional
    unitAssignmentDuringIncident4: '', // optional

    person4FirstName: '', // optional
    person4LastName: '',
    person4Rank: '', // optional
    injuryDate4: '',
    checkOptions4: '',
    checkOptionsOther4: '',
    unitAssignmentDuringIncident5: '',

    remarks: '', // optional
    hasSignature: false,
    signature: '',
    dateSigned: '',
  });

  return (
    <FrontLayout title={formTitle}>
      <Breadcrumb
        preUrl="/forms/menu"
        preTitle="Form Menu"
        currentTitle={formTitle}
      />
      {isSubscribed != true && <SubscriptionRequired />}
      <Formik
        initialValues={initialValues}
        validationSchema={PTSDStressorValidationSchema}
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
            process.env.NODE_ENV === 'development' &&
              console.log('loading data from local storage : ', user);
            await setValues({
              ...values,
              firstName: user.firstName ? user.firstName : '',
              lastName: user.lastName ? user.lastName : '',
              ssn: user.ssn ? user.ssn : '',
              birthday: user.dob ? user.dob : '',
              phone: user.phone ? user.phone : '',
              email: user.email ? user.email : '',
              signature: user.signature ? user.signature : '',
            });
          };

          const loadDataFromFirebase = async (data) => {
            const dataBody = {
              ...data,
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
              process.env.NODE_ENV === 'development' &&
                console.log('Form data from Firebase:', data);
              process.env.NODE_ENV === 'development' &&
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
              process.env.NODE_ENV === 'development' &&
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
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            process.env.NODE_ENV === 'development' &&
              console.log('>> save Data :  isFromSaveData : ', isFromSaveData);
            var formData = await transformFormValues(values);
            formData = { ...formData, ...fields };
            process.env.NODE_ENV === 'development' &&
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
            const pdfObject = await generatePTSDStressorPdfObject(formData);
            await generatePdfService(pdfObject, 'generatepdf14')
              .then(async (res) => {
                if (isFromGeneratePdf) {
                  await saveData({ pdf: true }, false);
                }
                setIsLoading(false);
                window.open(res?.download_url, '_blank');
              })
              .catch((err) => {
                process.env.NODE_ENV === 'development' &&
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
              PTSDStressorFileMap
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
              PTSDStressorFileMap
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
              PTSDStressorFileMap
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
              const pdfObject = await generatePTSDStressorPdfObject(formData);
              process.env.NODE_ENV === 'development' &&
                console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf14')
                .then(async (res) => {
                  process.env.NODE_ENV === 'development' &&
                    console.log(res.download_url);
                  const faxBody = await getFaxBodyData('ptsdform.pdf', false);
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
                    fieldCounter="(1 of 16)"
                    limit={12}
                  />
                  <TextInput
                    label="Veteran's Last Name"
                    name="lastName"
                    placeholder="Enter file number"
                    fieldCounter="(1-2 of 16)"
                    limit={18}
                  />
                  <TextInput
                    label="Veteran's Social Security Number"
                    name="ssn"
                    placeholder="Enter ssn"
                    fieldCounter="(2 of 16)"
                    limit={9}
                  />
                  <TextInput
                    label="VA File Number"
                    name="currentVa"
                    placeholder="Enter va file number"
                    fieldCounter="(3 of 16)"
                    limit={9}
                    hasCounter
                  />
                  <DateSelectorExtended
                    label="Veteran's Date of Birth"
                    name="birthday"
                    value={values.birthday}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('birthday', val)}
                    isDOB
                    fieldCounter="(4 of 16)"
                  />

                  <TextInput
                    label="Veteran's Service Number"
                    name="serviceNumber"
                    placeholder="Enter service number"
                    fieldCounter="(5 of 16)"
                    limit={9}
                    hasCounter
                  />

                  <TextInput
                    label="Telephone Number"
                    name="phone"
                    placeholder="Enter telephone number"
                    fieldCounter="(6 of 16)"
                    limit={12}
                    hasCounter
                  />

                  <TextInput
                    label="International Telephone Number"
                    name="phoneI"
                    placeholder="Enter international telephone number"
                    fieldCounter="(6-2 of 16)"
                    limit={15}
                    hasCounter
                  />
                </>

                <SectionTitle title="Section II: Stressful Incidents" />
                <>
                  <>
                    <Divider title="First Incident Information" />
                    <DateSelectorExtended
                      label="Date First Incident Occurred"
                      name="incidentDate1"
                      value={values.incidentDate1}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('incidentDate1', val)}
                      fieldCounter="(8 of 16)"
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
                          Dates of Unit Assignment
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <DateSelectorExtended
                          label="From"
                          allowRange={true}
                          name="dateOfAssignmentFrom1"
                          referenceDate={values.dateOfAssignmentTo1}
                          value={values.dateOfAssignmentFrom1}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('dateOfAssignmentFrom1', val)
                          }
                          isStartDate={true}
                        />

                        <DateSelectorExtended
                          label="To"
                          allowRange={true}
                          name="dateOfAssignmentTo1"
                          value={values.dateOfAssignmentTo1}
                          referenceDate={values.dateOfAssignmentFrom1}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('dateOfAssignmentTo1', val)
                          }
                          isStartDate={false}
                        />
                      </div>
                    </>

                    <TextInput
                      label="Location of incident (City, State, Country, Province, landmark or military installation)"
                      name="incidentLocation1"
                      placeholder="Enter incident location"
                      fieldCounter="(8-3 of 16)"
                    />

                    <TextInput
                      label="Unit assignment during incident (Such as, division, wing, battalion, cavalry, ship)"
                      name="unitAssignmentDuringIncident0"
                      placeholder="Enter unit assignment during incident"
                      fieldCounter="(8-4 of 16)"
                      multiline={true}
                      rows={4}
                      limit={300}
                    />

                    <TextInput
                      label="Description of the incident"
                      name="descriptionOfIncident1"
                      placeholder="Enter description of incident"
                      fieldCounter="(8-5 of 16)"
                      multiline={true}
                      rows={4}
                      limit={1000}
                    />

                    <TextInput
                      label="Medals or citations you received because of the incident"
                      name="medalReceived1"
                      placeholder="Enter medal received"
                      fieldCounter="(8-6 of 16)"
                    />

                    <br />
                    <Divider title="Injured/Death Person Information" />
                    <Divider title="First Person's Information" lightTitle />
                    <TextInput
                      label="First Name"
                      name="person1FirstName"
                      placeholder="Enter first name"
                      fieldCounter="(9-1-1 of 16)"
                      limit={12}
                    />

                    <TextInput
                      label="Last Name"
                      name="person1LastName"
                      placeholder="Enter last name"
                      fieldCounter="(9-1-2 of 16)"
                      limit={18}
                    />

                    <TextInput
                      label="Rank"
                      name="person1Rank"
                      placeholder="Enter rank"
                      fieldCounter="(9-2 of 16)"
                      limit={4}
                    />

                    <DateSelectorExtended
                      label="Date of Injury/Death"
                      name="injuryDate1"
                      value={values.injuryDate1}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('injuryDate1', val)}
                      fieldCounter="(9-3 of 16)"
                    />

                    <DropDownExtended
                      label="Please check one"
                      name="checkOptions1"
                      data={checkOptionsData}
                      fieldCounter="(9-4 of 16)"
                    />

                    {values.checkOptions1 === 'Other' && (
                      <TextInput
                        label="Please specify"
                        name="checkOptionsOther1"
                        placeholder="specify other"
                      />
                    )}

                    <TextInput
                      label="Unit assignment during incident(Such as, division, wing, battalion, cavalry, ship)"
                      name="unitAssignmentDuringIncident1"
                      placeholder="Enter unit assignment during incident"
                      fieldCounter="(9-5 of 16)"
                      multiline={true}
                      rows={4}
                      limit={300}
                    />

                    <Divider title="Second Person's Information" lightTitle />
                    <TextInput
                      label="First Name"
                      name="person2FirstName"
                      placeholder="Enter first name"
                      fieldCounter="(10-1-1 of 16)"
                      limit={12}
                    />

                    <TextInput
                      label="Last Name"
                      name="person2LastName"
                      placeholder="Enter last name"
                      fieldCounter="(10-1-2 of 16)"
                      limit={18}
                    />

                    <TextInput
                      label="Rank"
                      name="person2Rank"
                      placeholder="Enter rank"
                      fieldCounter="(10-2 of 16)"
                      limit={4}
                    />

                    <DateSelectorExtended
                      label="Date of Injury/Death"
                      name="injuryDate2"
                      value={values.injuryDate2}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('injuryDate2', val)}
                      fieldCounter="(10-3 of 16)"
                    />

                    <DropDownExtended
                      label="Please check one"
                      name="checkOptions2"
                      data={checkOptionsData}
                      fieldCounter="(10-4 of 16)"
                    />

                    {values.checkOptions2 === 'Other' && (
                      <TextInput
                        label="Please specify"
                        name="checkOptionsOther2"
                        placeholder="specify other"
                      />
                    )}

                    <TextInput
                      label="Unit assignment during incident(Such as, division, wing, battalion, cavalry, ship)"
                      name="unitAssignmentDuringIncident2"
                      placeholder="Enter unit assignment during incident"
                      fieldCounter="(10-5 of 16)"
                      multiline={true}
                      rows={4}
                      limit={300}
                    />
                  </>

                  <>
                    <br />
                    <br />
                    <Divider title="Second Incident Information" />
                    <DateSelectorExtended
                      label="Date First Incident Occurred"
                      name="incidentDate2"
                      value={values.incidentDate2}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('incidentDate2', val)}
                      fieldCounter="(8 of 16)"
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
                          Dates of Unit Assignment
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <DateSelectorExtended
                          label="From"
                          allowRange={true}
                          name="dateOfAssignmentFrom2"
                          referenceDate={values.dateOfAssignmentTo2}
                          value={values.dateOfAssignmentFrom2}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('dateOfAssignmentFrom2', val)
                          }
                          isStartDate={true}
                        />

                        <DateSelectorExtended
                          label="To"
                          allowRange={true}
                          name="dateOfAssignmentTo2"
                          value={values.dateOfAssignmentTo2}
                          referenceDate={values.dateOfAssignmentFrom2}
                          placeholder="Select Date"
                          onChange={(val) =>
                            setFieldValue('dateOfAssignmentTo2', val)
                          }
                          isStartDate={false}
                        />
                      </div>
                    </>

                    <TextInput
                      label="Location of incident (City, State, Country, Province, landmark or military installation)"
                      name="incidentLocation2"
                      placeholder="Enter incident location"
                      fieldCounter="(8-3 of 16)"
                    />

                    <TextInput
                      label="Unit assignment during incident (Such as, division, wing, battalion, cavalry, ship)"
                      name="unitAssignmentDuringIncident3"
                      placeholder="Enter unit assignment during incident"
                      fieldCounter="(8-4 of 16)"
                      multiline={true}
                      rows={4}
                      limit={300}
                    />

                    <TextInput
                      label="Description of the incident"
                      name="descriptionOfIncident2"
                      placeholder="Enter description of incident"
                      fieldCounter="(8-5 of 16)"
                      multiline={true}
                      rows={4}
                      limit={1000}
                    />

                    <TextInput
                      label="Medals or citations you received because of the incident"
                      name="medalReceived2"
                      placeholder="Enter medal received"
                      fieldCounter="(8-6 of 16)"
                    />

                    <br />
                    <Divider title="Injured/Death Person Information" />
                    <Divider title="First Person's Information" lightTitle />
                    <TextInput
                      label="First Name"
                      name="person3FirstName"
                      placeholder="Enter first name"
                      fieldCounter="(9-1-1 of 16)"
                      limit={12}
                    />

                    <TextInput
                      label="Last Name"
                      name="person3LastName"
                      placeholder="Enter last name"
                      fieldCounter="(9-1-2 of 16)"
                      limit={18}
                    />

                    <TextInput
                      label="Rank"
                      name="person3Rank"
                      placeholder="Enter rank"
                      fieldCounter="(9-2 of 16)"
                      limit={4}
                    />

                    <DateSelectorExtended
                      label="Date of Injury/Death"
                      name="injuryDate3"
                      value={values.injuryDate3}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('injuryDate3', val)}
                      fieldCounter="(9-3 of 16)"
                    />

                    <DropDownExtended
                      label="Please check one"
                      name="checkOptions3"
                      data={checkOptionsData}
                      fieldCounter="(9-4 of 16)"
                    />

                    {values.checkOptions3 === 'Other' && (
                      <TextInput
                        label="Please specify"
                        name="checkOptionsOther3"
                        placeholder="specify other"
                      />
                    )}

                    <TextInput
                      label="Unit assignment during incident(Such as, division, wing, battalion, cavalry, ship)"
                      name="unitAssignmentDuringIncident4"
                      placeholder="Enter unit assignment during incident"
                      fieldCounter="(9-5 of 16)"
                      multiline={true}
                      rows={4}
                      limit={300}
                    />

                    <Divider title="Second Person's Information" lightTitle />
                    <TextInput
                      label="First Name"
                      name="person4FirstName"
                      placeholder="Enter first name"
                      fieldCounter="(10-1-1 of 16)"
                      limit={12}
                    />

                    <TextInput
                      label="Last Name"
                      name="person4LastName"
                      placeholder="Enter last name"
                      fieldCounter="(10-1-2 of 16)"
                      limit={18}
                    />

                    <TextInput
                      label="Rank"
                      name="person4Rank"
                      placeholder="Enter rank"
                      fieldCounter="(10-2 of 16)"
                      limit={4}
                    />

                    <DateSelectorExtended
                      label="Date of Injury/Death"
                      name="injuryDate4"
                      value={values.injuryDate4}
                      placeholder="Select Date"
                      onChange={(val) => setFieldValue('injuryDate4', val)}
                      fieldCounter="(10-3 of 16)"
                    />

                    <DropDownExtended
                      label="Please check one"
                      name="checkOptions4"
                      data={checkOptionsData}
                      fieldCounter="(10-4 of 16)"
                    />

                    {values.checkOptions4 === 'Other' && (
                      <TextInput
                        label="Please specify"
                        name="checkOptionsOther4"
                        placeholder="specify other"
                      />
                    )}

                    <TextInput
                      label="Unit assignment during incident(Such as, division, wing, battalion, cavalry, ship)"
                      name="unitAssignmentDuringIncident5"
                      placeholder="Enter unit assignment during incident"
                      fieldCounter="(10-5 of 16)"
                      multiline={true}
                      rows={4}
                      limit={300}
                    />
                  </>
                </>

                <SectionTitle title="Section III: Remarks" />
                <>
                  <TextInput
                    label="Remarks"
                    name="remarks"
                    placeholder="Enter remarks if any"
                    fieldCounter="(14 of 16)"
                    limit={1500}
                    hasCounter
                    multiline
                  />
                </>

                <SectionTitle title="Section IV: Certification and Signature" />
                <>
                  <p className="mb-5 text-sm leading-relaxed text-gray-700 dark:text-white-light md:text-base">
                    I{' '}
                    <span className="font-bold">
                      hereby certify that the information{' '}
                    </span>
                    I have given on this form is true and correct to the best of
                    my knowledge and belief.
                  </p>

                  <OptionSelector
                    name="signatureOption"
                    options={signatureOption}
                    multiSelect={false}
                    isOtherAllowed={false}
                    lockOption={true}
                  />

                  <DateSelectorExtended
                    label="Date Signed"
                    name="dateSigned"
                    value={values.dateSigned}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('dateSigned', val)}
                    fieldCounter="(16 of 16)"
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
