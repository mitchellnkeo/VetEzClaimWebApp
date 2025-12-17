import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { MedicalRecordsValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { MedicalRecordsFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateMedicalRecordsPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import DropDownExtended from '@/components/Common/DropDownExtended';
import Divider from '@/components/Common/Divider';
import { StateData } from '@/utils/staticData';
import Switch from '@/components/Common/Switch';
import SubscriptionRequired from '@/components/Common/SubscriptionRequired';

const signatureOption = [
  {
    option: 'Signature Of Person Authorizing Disclosure (Required)',
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

export default function MedicalRecordsForm() {
  const formTitle = 'Medical Records Release (Form 21-4142)';
  const formId = 'medicalrecords';
  const formName = '21-4142';

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
    //seciton II
    isVeteran: false,
    claimantsName: '',
    claimantsLastName: '',
    claimantsSsn: '',
    claimantsCurrentVa: '',
    medicalProvider: [
      {
        provider: '',
        conditions: '',
        dateTreatmentFrom: '',
        dateTreatmentTo: '',
        medicalStreet: '',
        medicalApartment: '',
        medicalCity: '',
        medicalState: '',
        medicalCountry: 'US',
        medicalZipCode: '',
      },
    ],
    consent: '',
    veteranDateSigned: '',
    printedName: '',
    printedLastName: '',
    signature: '',
    hasSignature: false,
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
        validationSchema={MedicalRecordsValidationSchema}
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
              street: user.street ? user.street : '',
              unitNumber: user.unitNumber ? user.unitNumber : '',
              city: user.city ? user.city : '',
              province: user.province ? user.province : '',
              zipCode: user.zipCode ? user.zipCode : '',
              printedName: user.firstName ? user.firstName : '',
              printedLastName: user.lastName ? user.lastName : '',
              signature: user.signature ? user.signature : '',
              hasSignature: user.hasSignature ? user.hasSignature : false,
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
            const pdfObject = await generateMedicalRecordsPdfObject(formData);
            await generatePdfService(pdfObject, 'generatepdf16')
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
              MedicalRecordsFileMap
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
              MedicalRecordsFileMap
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
              MedicalRecordsFileMap
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
              const pdfObject = await generateMedicalRecordsPdfObject(formData);
              process.env.NODE_ENV === 'development' &&
                console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf16')
                .then(async (res) => {
                  process.env.NODE_ENV === 'development' &&
                    console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'medicalrecords.pdf',
                    false
                  );
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

                <SectionTitle title="Section I:  Veteran Identification Information" />
                <>
                  <TextInput
                    label={`Veteran's First Name`}
                    name="firstName"
                    placeholder="Enter first name"
                    fieldCounter="(1 of 15)"
                    limit={12}
                  />
                  <TextInput
                    label="Veteran's Last Name"
                    name="lastName"
                    placeholder="Enter file number"
                    fieldCounter="(1-2 of 15)"
                    limit={18}
                  />
                  <TextInput
                    label="Social Security Number"
                    name="ssn"
                    placeholder="Enter ssn"
                    fieldCounter="(2 of 15)"
                    limit={9}
                  />
                  <TextInput
                    label="VA File Number"
                    name="currentVa"
                    placeholder="Enter va file number"
                    fieldCounter="(3 of 15)"
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
                    fieldCounter="(4 of 15)"
                  />

                  <TextInput
                    label="Veteran's Service Number"
                    name="serviceNumber"
                    placeholder="Enter service number"
                    fieldCounter="(5 of 15)"
                    limit={9}
                    hasCounter
                  />

                  <Divider title="Mailing Address" />
                  <TextInput
                    label="No. & Street"
                    name="street"
                    placeholder="Enter street"
                    fieldCounter="(6 of 15)"
                    limit={30}
                  />
                  <TextInput
                    label="Apt./Unit Number"
                    name="unitNumber"
                    placeholder="Enter apt/unit number"
                    fieldCounter="(6-2 of 15)"
                    limit={5}
                  />
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Enter city"
                    fieldCounter="(6-3 of 15)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="State/Province"
                    name="province"
                    data={StateData}
                    fieldCounter="(6-4 of 15)"
                  />
                  <TextInput
                    label="Country"
                    name="country"
                    fieldCounter="(6-5 of 15)"
                    limit={2}
                    readOnly
                  />
                  <TextInput
                    label="ZIP Code/Postal Code"
                    name="zipCode"
                    placeholder="Enter zip/postal code"
                    fieldCounter="(6-6 of 15)"
                    limit={10}
                  />

                  <Divider title="Contact" />
                  <TextInput
                    label="Telephone Number"
                    name="phone"
                    placeholder="Enter telephone number"
                    fieldCounter="(7 of 15)"
                    limit={12}
                    hasCounter
                  />

                  <TextInput
                    label="International Telephone Number"
                    name="phoneI"
                    placeholder="Enter international telephone number"
                    fieldCounter="(7-2 of 15)"
                    limit={15}
                    hasCounter
                  />

                  <TextInput
                    label="Email Address"
                    name="email"
                    placeholder="Enter email"
                    fieldCounter="(8 of 15)"
                  />

                  <OptionSelector
                    name="receivingEmailOpt"
                    options={values.receivingEmailOpt}
                    multiSelect={true}
                    isOtherAllowed={false}
                    onSelectionChange={async (options) => {
                      await setFieldValue('emailE', options[0].isSelected);
                    }}
                  />
                </>

                <SectionTitle
                  title="Section II:  Patient Identification for Records VA Is Requesting"
                  subtitle="(If other than veteran)"
                />
                <>
                  <Switch
                    name="isVeteran"
                    label="Non-veteran Claimant filling ability coming soon"
                  />
                  {values.isVeteran && (
                    <>
                      <TextInput
                        label="Patient's First Name"
                        name="claimantsName"
                        placeholder="Enter first name"
                        fieldCounter="(9 of 15)"
                        limit={12}
                      />
                      <TextInput
                        label="Patient's Last Name"
                        name="claimantsLastName"
                        placeholder="Enter last name"
                        fieldCounter="(9-2 of 15)"
                        limit={18}
                      />
                      <TextInput
                        label="Social Security Number"
                        name="claimantsSsn"
                        placeholder="Enter ssn"
                        fieldCounter="(10 of 15)"
                        limit={9}
                      />
                      <TextInput
                        label="VA File Number"
                        name="claimantsCurrentVa"
                        placeholder="Enter va file number"
                        fieldCounter="(11 of 15)"
                        limit={9}
                        hasCounter
                      />
                    </>
                  )}
                </>

                <SectionTitle title="Section III: Medical Provider Information" />

                <>
                  {values.medicalProvider.map((item, ind) => {
                    return (
                      <div key={ind} className="mt-10">
                        <Divider
                          title={`Medical Provider #${ind + 1}`}
                          lightTitle
                        />
                        <TextInput
                          label={`Provider Or, Facility Name`}
                          name={`medicalProvider[${ind}].provider`}
                          placeholder="Enter provider or facility name"
                          hasCounter
                          limit={56}
                        />

                        <TextInput
                          label={`Conditions You Are Being Treated For`}
                          name={`medicalProvider[${ind}].conditions`}
                          placeholder="Enter conditions"
                          hasCounter
                          limit={56}
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
                              Date(s) Of Treatment
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <DateSelectorExtended
                              label="From"
                              allowRange={true}
                              name={`medicalProvider[${ind}].dateTreatmentFrom`}
                              referenceDate={
                                values.medicalProvider[ind].dateTreatmentTo
                              }
                              value={
                                values.medicalProvider[ind].dateTreatmentFrom
                              }
                              placeholder="Select Date"
                              onChange={(val) =>
                                setFieldValue(
                                  `medicalProvider[${ind}].dateTreatmentFrom`,
                                  val
                                )
                              }
                              isStartDate={true}
                            />

                            <DateSelectorExtended
                              label="To"
                              allowRange={true}
                              name={`medicalProvider[${ind}].dateTreatmentTo`}
                              value={
                                values.medicalProvider[ind].dateTreatmentTo
                              }
                              referenceDate={
                                values.medicalProvider[ind].dateTreatmentFrom
                              }
                              placeholder="Select Date"
                              onChange={(val) =>
                                setFieldValue(
                                  `medicalProvider[${ind}].dateTreatmentTo`,
                                  val
                                )
                              }
                              isStartDate={false}
                            />
                          </div>
                        </>

                        <TextInput
                          label="No. & Street"
                          name={`medicalProvider[${ind}].medicalStreet`}
                          placeholder="Enter street"
                          limit={30}
                        />
                        <TextInput
                          label="Apt./Unit Number"
                          name={`medicalProvider[${ind}].medicalApartment`}
                          placeholder="Enter apt/unit number"
                          limit={5}
                        />
                        <TextInput
                          label="City"
                          name={`medicalProvider[${ind}].medicalCity`}
                          placeholder="Enter city"
                          limit={18}
                        />
                        <DropDownExtended
                          label="State/Province"
                          name={`medicalProvider[${ind}].medicalState`}
                          data={StateData}
                        />
                        <TextInput
                          label="Country"
                          name={`medicalProvider[${ind}].medicalCountry`}
                          limit={2}
                          readOnly
                        />
                        <TextInput
                          label="ZIP Code/Postal Code"
                          name={`medicalProvider[${ind}].medicalZipCode`}
                          placeholder="Enter zip/postal code"
                          limit={10}
                        />
                      </div>
                    );
                  })}

                  <div className="mt-5 grid grid-cols-2 gap-6">
                    <button
                      className="cursor-pointer rounded bg-gray-200 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-gray-300"
                      disabled={values.medicalProvider.length >= 5}
                      onClick={() => {
                        setValues({
                          ...values,
                          medicalProvider: [
                            ...values.medicalProvider,
                            {
                              provider: '',
                              conditions: '',
                              dateTreatmentFrom: '',
                              dateTreatmentTo: '',
                              medicalStreet: '',
                              medicalApartment: '',
                              medicalCity: '',
                              medicalState: '',
                              medicalCountry: 'US',
                              medicalZipCode: '',
                            },
                          ],
                        });
                      }}
                    >
                      Add Provider
                    </button>

                    <button
                      className="cursor-pointer rounded bg-yellow-400 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      hidden={values.medicalProvider.length <= 1}
                      onClick={() => {
                        if (values.medicalProvider.length > 1) {
                          const updatedIssue = [...values.medicalProvider];
                          updatedIssue.pop();
                          setValues({
                            ...values,
                            medicalProvider: [...updatedIssue],
                          });
                        }
                      }}
                    >
                      Remove Provider
                    </button>
                  </div>
                </>

                <SectionTitle title="Section IV:  Authorization and Consent to Release Information to VA and Signature" />
                <>
                  <TextInput
                    label="If My consent to this information is limited, the limitation is written here (if this space is left blank, there is no limitation to records):"
                    name="consent"
                    placeholder="Enter limitation if any"
                    limit={200}
                    hasCounter
                    multiline
                  />

                  <OptionSelector
                    name="signatureOption"
                    options={signatureOption}
                    multiSelect={false}
                    isOtherAllowed={false}
                    lockOption={true}
                  />

                  <DateSelectorExtended
                    label="Date Signed"
                    name="veteranDateSigned"
                    value={values.veteranDateSigned}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('veteranDateSigned', val)}
                    fieldCounter="(14 of 15)"
                  />
                  <br />

                  <TextInput
                    label="Printed First Name of Person Signing"
                    name="printedName"
                    placeholder="Enter first name"
                    fieldCounter="(15 of 15)"
                    limit={12}
                    hasCounter
                  />
                  <TextInput
                    label="Printed Last Name of Person Signing"
                    name="printedLastName"
                    placeholder="Enter last name"
                    fieldCounter="(15-2 of 15)"
                    limit={18}
                    hasCounter
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
