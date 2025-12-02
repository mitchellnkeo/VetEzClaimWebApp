import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { HigherLevelReviewValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData } from '@/utils/staticData';
import Divider from '@/components/Common/Divider';
import OptionSelector from '@/components/Common/OptionSelector';
import Switch from '@/components/Common/Switch';
import { GetErrorFieldsString } from '@/utils/utils';
import { HigherLevelReviewFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateHigherLevelReviewPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import SubscriptionRequired from '@/components/Common/SubscriptionRequired';

const benefitTypeData = [
  'Compensation',
  'Pensions/Survivors Benefits',
  'Fiduciary',
  'Life Insurance',
  'Veterans Health Administration',
  'Veteran Readiness and Employment',
  'Loan Guaranty',
  'Education',
  'National Cemetery Administration',
];

const homelessOption = [
  {
    option: 'I am experiencing homelessness or am at risk of homelessness',
    isSelected: false,
  },
];

const isInformalConferenceOption = [
  {
    option:
      'I would like an optional informal conference. I understand I will not be able to discuss or introduce new evidence that was not part of my file at the time of the decision at issue, and that VA may be able to make a decision faster if I do not request an informal conference. By requesting an informal conference, I understand VA may contact me or my representative in an available manner, such as mail, telephone, electronic notice, or by other means to schedule my conference.',
    isSelected: false,
  },
];

const contactOption = [
  {
    option:
      'Contact the veteran/claimant. If contact will be by phone, contact in the morning hours based on time zone.',
    isSelected: false,
    value: 'b8:12',
  },
  {
    option:
      'Contact the veteran/claimant. If contact will be by phone, contact in the afternoon hours based on time zone.',
    isSelected: false,
    value: 'b12:4.30',
  },
  {
    option:
      'Contact the representative. If contact will be by phone, contact in the morning hours based on time zone.',
    isSelected: false,
    value: 'rb8:12',
  },
  {
    option:
      'Contact the representative. If contact will be by phone, contact in the afternoon hours based on time zone.',
    isSelected: false,
    value: 'rb12:4.30',
  },
];

const signatureOption = [
  {
    option: 'Signature of veteran/claimant/authorized agent (Required)',
    isSelected: true,
  },
];

export default function HigherLevelReviewForm() {
  const formTitle = 'Higher Level Review (Form 20-0996)';
  const formId = 'higherlevelreview';
  const formName = '20-0996';

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
    insuranceNumber: '',
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    country: 'US',
    zipCode: '',
    phone: '',
    phoneI: '',
    email: '',
    homeless: homelessOption,
    vet: false,

    //   section II
    claimantsName: '',
    claimantsLastName: '',
    claimantsSsn: '',
    claimantsBirthday: '',

    claimantsStreet: '',
    claimantsUnitNumber: '',
    claimantsCity: '',
    claimantsProvince: '',
    claimantsCountry: 'US',
    claimantsZipCode: '',
    claimantsPhone: '',
    claimantsPhoneI: '',
    claimantsEmail: '',

    // section III
    benefitType: '',
    isInformalConference: isInformalConferenceOption,
    informalConferenceContact: '',
    informalConferenceContactOption: contactOption,
    //   section IV
    rName: '',
    rLastName: '',
    rPhone: '',
    rEmail: '',
    issues: [{ specificIssue: '', date: '' }],
    dateSigned: '',
    veteranDateSigned: '',
    veteranFirstName: '',
    veteranLastName: '',

    // extra
    signature: '',
  });

  return (
    <FrontLayout title={formTitle}>
      <Breadcrumb
        preUrl="/forms/menu"
        preTitle="Form Menu"
        currentTitle={formTitle}
      />
      {!isSubscribed && <SubscriptionRequired />}
      <Formik
        initialValues={initialValues}
        validationSchema={HigherLevelReviewValidationSchema}
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
          const contactOptionChange = async (options) => {
            const selectedItem = options.find((item) => item.isSelected);
            let newValue = '';
            if (selectedItem) {
              switch (selectedItem.option) {
                case 'Contact the veteran/claimant. If contact will be by phone, contact in the morning hours based on time zone.':
                  newValue = 'b8:12';
                  break;
                case 'Contact the veteran/claimant. If contact will be by phone, contact in the afternoon hours based on time zone.':
                  newValue = 'b12:4.30';
                  break;
                case 'Contact the representative. If contact will be by phone, contact in the morning hours based on time zone.':
                  newValue = 'rb8:12';
                  break;
                case 'Contact the representative. If contact will be by phone, contact in the afternoon hours based on time zone.':
                  newValue = 'rb12:4.30';
                  break;
              }
            }
            await setValues({
              ...values,
              informalConferenceContactOption: options,
              informalConferenceContact: newValue,
            });
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
            let updatedContactOption = [...contactOption];

            if (data.informalConferenceContact) {
              updatedContactOption = contactOption.map((item) => ({
                ...item,
                isSelected: item.value === data.informalConferenceContact,
              }));
            }

            const dataBody = {
              ...data,
              isInformalConference: data.isInformalConference
                ? [{ ...isInformalConferenceOption[0], isSelected: true }]
                : [...isInformalConferenceOption],
              homeless: data.homeless
                ? [{ ...homelessOption[0], isSelected: true }]
                : [...homelessOption],
              informalConferenceContactOption: updatedContactOption,
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
              isInformalConference:
                formData.isInformalConference?.[0]?.isSelected || false,
              homeless: formData.homeless?.[0]?.isSelected || false,
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
            const pdfObject = await generateHigherLevelReviewPdfObject(
              formData
            );
            await generatePdfService(pdfObject, 'generatepdf12')
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
              HigherLevelReviewFileMap
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
              HigherLevelReviewFileMap
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
              HigherLevelReviewFileMap
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
              const pdfObject = await generateHigherLevelReviewPdfObject(
                formData
              );
              process.env.NODE_ENV === 'development' &&
                console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf12')
                .then(async (res) => {
                  process.env.NODE_ENV === 'development' &&
                    console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'higherlevelreview.pdf',
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

                <SectionTitle title="Section I: Veteran's Identification Information" />
                <>
                  <TextInput
                    label="Veteran's First Name"
                    name="firstName"
                    placeholder="Enter first name"
                    fieldCounter="(1 of 20)"
                    limit={12}
                  />
                  <TextInput
                    label="Veteran's Last Name"
                    name="lastName"
                    placeholder="Enter last name"
                    fieldCounter="(1-2 of 20)"
                    limit={18}
                  />
                  <TextInput
                    label="Social Security Number"
                    name="ssn"
                    placeholder="Enter ssn"
                    fieldCounter="(2 of 20)"
                    limit={9}
                  />
                  <TextInput
                    label="VA File Number"
                    name="currentVa"
                    placeholder="Enter va file number"
                    fieldCounter="(3 of 20)"
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
                    fieldCounter="(4 of 20)"
                  />
                  <TextInput
                    label="VA Insurance Policy Number"
                    name="insuranceNumber"
                    placeholder="Enter insurance policy number"
                    fieldCounter="(5 of 20)"
                    limit={18}
                  />

                  <Divider title="Mailing Address" />
                  <TextInput
                    label="No. & Street"
                    name="street"
                    placeholder="Enter street"
                    fieldCounter="(6 of 20)"
                    limit={20}
                  />
                  <TextInput
                    label="Apt./Unit Number"
                    name="unitNumber"
                    placeholder="Enter apt/unit number"
                    fieldCounter="(7-2 of 21)"
                    limit={5}
                  />
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Enter city"
                    fieldCounter="(7-3 of 21)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="State/Province"
                    name="province"
                    data={StateData}
                    hasCounter={true}
                    fieldCounter="(7-4 of 21)"
                  />
                  <TextInput
                    label="Country"
                    name="country"
                    fieldCounter="(7-5 of 21)"
                    limit={2}
                    readOnly
                  />
                  <TextInput
                    label="ZIP Code/Postal Code"
                    name="zipCode"
                    placeholder="Enter zip/postal code"
                    fieldCounter="(7-6 of 21)"
                    limit={10}
                  />
                  <OptionSelector
                    name="homeless"
                    options={values.homeless}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />
                  <Divider title=" Contact" />
                  <TextInput
                    label="Telephone Number"
                    name="phone"
                    placeholder="Enter telephone number"
                    fieldCounter="(7 of 20)"
                    limit={12}
                  />
                  <TextInput
                    label="International Phone Number"
                    name="phoneI"
                    placeholder="Enter international phone number"
                    fieldCounter="(7-2 of 20)"
                    limit={15}
                    hasCounter
                  />
                  <TextInput
                    label="Email Address"
                    name="email"
                    placeholder="Enter email"
                    fieldCounter="(8 of 20)"
                    limit={40}
                  />
                </>

                <SectionTitle
                  title="Section II: Claimant's Identification Information"
                  subtitle="(If other than veteran)"
                />
                <>
                  <Switch
                    name="vet"
                    label="Non-veteran Claimant filling ability coming soon"
                  />
                  {values.vet && (
                    <>
                      <TextInput
                        label="Claimant's First Name"
                        name="claimantsName"
                        placeholder="Enter first name"
                        fieldCounter="(9 of 20)"
                        limit={12}
                      />
                      <TextInput
                        label="Claimant's Last Name"
                        name="claimantsLastName"
                        placeholder="Enter last name"
                        fieldCounter="(9-2 of 20)"
                        limit={18}
                      />
                      <TextInput
                        label="Social Security Number"
                        name="claimantsSsn"
                        placeholder="Enter ssn"
                        fieldCounter="(10 of 20)"
                        limit={9}
                      />

                      <DateSelectorExtended
                        label="Date of Birth"
                        name="claimantsBirthday"
                        value={values.claimantsBirthday}
                        placeholder="Select Date"
                        onChange={(val) =>
                          setFieldValue('claimantsBirthday', val)
                        }
                        isDOB
                        fieldCounter="(11 of 20)"
                      />
                      <Divider title="Mailing Address" />
                      <TextInput
                        label="No. & Street"
                        name="claimantsStreet"
                        placeholder="Enter street"
                        fieldCounter="(12 of 20)"
                        limit={20}
                      />
                      <TextInput
                        label="Apt./Unit Number"
                        name="claimantsUnitNumber"
                        placeholder="Enter apt/unit number"
                        fieldCounter="(12-2 of 20)"
                        limit={5}
                      />
                      <TextInput
                        label="City"
                        name="claimantsCity"
                        placeholder="Enter city"
                        fieldCounter="(12-3 of 20)"
                        limit={18}
                      />
                      <DropDownExtended
                        label="State/Province"
                        name="claimantsProvince"
                        data={StateData}
                        hasCounter={true}
                        fieldCounter="(12-4 of 20)"
                      />
                      <TextInput
                        label="Country"
                        name="claimantsCountry"
                        fieldCounter="(12-5 of 20)"
                        limit={2}
                        readOnly
                      />
                      <TextInput
                        label="ZIP Code/Postal Code"
                        name="claimantsZipCode"
                        placeholder="Enter zip/postal code"
                        fieldCounter="(12-6 of 20)"
                        limit={10}
                      />
                      <Divider title=" Contact" />
                      <TextInput
                        label="Telephone Number"
                        name="claimantsPhone"
                        placeholder="Enter telephone number"
                        fieldCounter="(13 of 20)"
                        limit={12}
                      />
                      <TextInput
                        label="International Phone Number"
                        name="claimantsPhoneI"
                        placeholder="Enter international phone number"
                        fieldCounter="(13-2 of 20)"
                        limit={15}
                        hasCounter
                      />
                      <TextInput
                        label="Email Address"
                        name="claimantsEmail"
                        placeholder="Enter email"
                        fieldCounter="(14 of 20)"
                        limit={40}
                      />
                    </>
                  )}
                </>

                <SectionTitle title="Section III: Benefit Type" />
                <>
                  <DropDownExtended
                    label="Select Only One (If you file for multiple benefit types, you must complete a separate VA Form 20-0996 for each benefit type.)"
                    name="benefitType"
                    data={benefitTypeData}
                    hasCounter={true}
                    fieldCounter="(15 of 20)"
                  />
                </>

                <SectionTitle title="Section IV: Optional Informal Conference" />
                <>
                  <h6 className="mb-5 dark:text-white-light">
                    {' '}
                    You or your authorized representative may request an
                    informal conference. (VA will only conduct one informal
                    conference associated with this request for Higher-Level
                    Review.)
                  </h6>

                  <OptionSelector
                    name="isInformalConference"
                    options={values.isInformalConference}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />

                  {values.isInformalConference[0].isSelected && (
                    <>
                      <OptionSelector
                        label="If you selected the box above, VA will make two attempts to contact you or your representative to schedule the informal conference. Indicate one preference by checking the appropriate box:"
                        name="informalConferenceContactOption"
                        options={values.informalConferenceContactOption}
                        multiSelect={false}
                        isOtherAllowed={false}
                        onSelectionChange={(val) => {
                          contactOptionChange(val);
                        }}
                      />
                    </>
                  )}

                  <h6 className="my-5">
                    If you would like VA to contact your representative, you
                    must provide your representative's contact information
                    below.
                  </h6>

                  <TextInput
                    label="Representative's First Name"
                    name="rName"
                    placeholder="Enter first name"
                    fieldCounter="(17 of 20)"
                    limit={12}
                  />

                  <TextInput
                    label="Representative's Last Name"
                    name="rLastName"
                    placeholder="Enter last name"
                    fieldCounter="(17-2 of 20)"
                    limit={18}
                  />

                  <TextInput
                    label="Representative's Telephone Number (Include Area Code)"
                    name="rPhone"
                    placeholder="Enter telephone number"
                    fieldCounter="(17-3 of 20)"
                    limit={12}
                  />

                  <TextInput
                    label="Representative's Email Address"
                    name="rEmail"
                    placeholder="Enter email"
                    fieldCounter="(17-4 of 20)"
                    hasCounter
                    limit={30}
                  />
                </>

                <SectionTitle title="Section V: Issues for Higher-Level Review" />
                <>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-white-light">
                    If you are responding to a Statement of the Case (SOC) or a
                    Supplemental Statement of the Case (SSOC): By submitting
                    this form, you are withdrawing the eligible legacy appeal
                    issue(s) listed in 18A in their entirety, and any associated
                    hearing requests, and opting for the issues to be decided in
                    the modernized review system. You acknowledge you cannot
                    return to the legacy appeals system for the issue(s)
                    withdrawn.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-white-light">
                    <span className="font-semibold">IDENTIFY IN ITEM 18A</span>{' '}
                    EACH ISSUE DECIDED BY VA FOR WHICH YOU ARE REQUESTING A
                    HIGHER-LEVEL REVIEW. Refer to your decision notification
                    letter(s) for your issue(s) VA has previously decided. For
                    each issue, identify the date of VA's most recent decision
                    on the issue in Item 18B. If the space below is insufficient
                    to include the information regarding your issue(s), it is
                    acceptable to indicate that in the space below and attach
                    additional pages to this form to complete your request.
                    Include your name and file number on each page attached.
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-white-light">
                    <strong>IMPORTANT:</strong> You may only list issues for the
                    benefit type selected in Item 15, Section III.
                  </p>
                  <>
                    {values.issues.map((item, ind) => {
                      return (
                        <div key={ind} className="mt-10">
                          <TextInput
                            label={`Specific Issue #${ind + 1}`}
                            name={`issues[${ind}].specificIssue`}
                            placeholder="Enter specific issue"
                            hasCounter
                            limit={150}
                          />

                          <DateSelectorExtended
                            label="Date of VA Decision Notice"
                            name={`issues[${ind}].date`}
                            value={values.issues[ind].date}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue(`issues[${ind}].date`, val)
                            }
                          />
                        </div>
                      );
                    })}

                    <div className="mt-5 grid grid-cols-2 gap-6">
                      <button
                        className="cursor-pointer rounded bg-gray-200 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-gray-300"
                        disabled={values.issues.length >= 13}
                        onClick={() => {
                          setValues({
                            ...values,
                            issues: [
                              ...values.issues,
                              {
                                specificIssue: '',
                                date: '',
                              },
                            ],
                          });
                        }}
                      >
                        Add Issue
                      </button>

                      <button
                        className="cursor-pointer rounded bg-yellow-400 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                        hidden={values.issues.length <= 1}
                        onClick={() => {
                          if (values.issues.length > 1) {
                            const updatedIssue = [...values.issues];
                            updatedIssue.pop();
                            setValues({
                              ...values,
                              issues: [...updatedIssue],
                            });
                          }
                        }}
                      >
                        Remove Issue
                      </button>
                    </div>
                  </>
                </>

                <SectionTitle title="Section VI: Certification and Signature" />
                <>
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
                    fieldCounter="(19 of 20)"
                  />
                </>

                <SectionTitle title="Section VII: Authorized Representative Signature" />
                <>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-white-light">
                    <span className="font-extrabold">I CERTIFY</span> that the
                    statements on this form are true and correct to the best of
                    my knowledge and belief.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white-light">
                    <span className="font-extrabold">NOTE:</span> A
                    representative's signature will not be accepted unless at
                    the time of submission of this request a valid VA Form
                    21-22, Appointment of Veterans Service Organization as
                    Claimant's Representative, or VA Form 21-22a, Appointment of
                    Individual as Claimant's Representative, indicating the
                    appropriate representative is of record with VA or included
                    with this application.
                  </p>

                  <TextInput
                    label="First Name of VA authorized representative"
                    name="veteranFirstName"
                    placeholder="Enter first name"
                    fieldCounter="(20 of 20)"
                    limit={12}
                  />

                  <TextInput
                    label="Last Name of VA authorized representative"
                    name="veteranLastName"
                    placeholder="Enter last name"
                    fieldCounter="(20-2 of 20)"
                    limit={18}
                  />

                  <DateSelectorExtended
                    label="Date Signed"
                    name="veteranDateSigned"
                    value={values.veteranDateSigned}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('veteranDateSigned', val)}
                    fieldCounter="(20-3 of 20)"
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
