import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { SubmitIntentFileValidation } from '@/utils/validators';
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
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';

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

const signatureOption = [
  {
    option: 'Signature of veteran/claimant/authorized agent (Required)',
    isSelected: true,
  },
];

export default function SubmitToIntentForm() {
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
    email: '',
    emailE: receivingEmail,
    claimantsName: '',
    claimantsLastName: '',
    claimantsSsn: '',
    claimantsClaim: '',
    claimantsCurrentVa: '',
    claimantsRelationship: '',
    claimantOther: '',
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
    claimantsEmailE: receivingEmail,
    dic: dicOption,
    veteranDateSigned: '',
    benefitElection: beifitOption,
    vet: false,
    signature: '',
    signatureOption: signatureOption,
  });

  return (
    <FrontLayout title="Submit To Intent">
      <Formik
        initialValues={initialValues}
        validationSchema={SubmitIntentFileValidation}
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
            loadData();
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
            await generatePdfService(pdfObject, 'generate')
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

              await generatePdfService(pdfObject, 'generate')
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
                      docName: 'fillform',
                      uid: uid,
                      formId: 'Submit\nIntent',
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
              title="Submit To Intent"
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
                <TextInput
                  label="Veteran's First Name"
                  name="firstName"
                  placeholder="Enter first name"
                  fieldCounter="(1 of 21)"
                  limit={18}
                />
                <TextInput
                  label="Veteran's Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  fieldCounter="(1-2 of 21)"
                  limit={12}
                />
                <TextInput
                  label="Social Security Number"
                  name="ssn"
                  placeholder="Enter ssn"
                  fieldCounter="(2 of 21)"
                  limit={9}
                />
                <DropDownExtended
                  label="Has the Veteran Ever Filed a Claim With VA?"
                  hintsMessage="If 'YES', Complete Item 4"
                  name="claim"
                  data={yesNoData}
                  fieldCounter="(3 of 21)"
                />
                <TextInput
                  label="VA File Number"
                  name="currentVa"
                  placeholder="Enter va file number"
                  fieldCounter="(4 of 21)"
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
                  fieldCounter="(5 of 21)"
                />
                <TextInput
                  label="Veteran's Service Number"
                  name="serviceNumber"
                  placeholder="Enter service number"
                  fieldCounter="(6 of 21)"
                  limit={9}
                />
                <Divider title="Mailing Address" />

                <TextInput
                  label="No. & Street"
                  name="street"
                  placeholder="Enter street"
                  fieldCounter="(7 of 21)"
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
                <Divider title=" Contact" />
                <TextInput
                  label="Telephone Number"
                  name="phone"
                  placeholder="Enter telephone number"
                  fieldCounter="(8 of 21)"
                  limit={12}
                />
                <TextInput
                  label="Enter International Phone Number"
                  name="phoneI"
                  placeholder="Enter international phone number"
                  fieldCounter="(8-2 of 21)"
                  limit={15}
                  hasCounter
                />

                <TextInput
                  label="Email Address"
                  name="email"
                  placeholder="Enter email"
                  fieldCounter="(9 of 21)"
                  limit={40}
                />
                <OptionSelector
                  name="emailE"
                  options={values.emailE}
                  multiSelect={true}
                  isOtherAllowed={false}
                />
                <SectionTitle
                  title="Section II: Claimant's Identification Information"
                  subtitle="(Complete this section ONLY if the claimant is not the veteran)"
                />
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
                      fieldCounter="(10 of 21)"
                      limit={18}
                    />
                    <TextInput
                      label="Claimant's Last Name"
                      name="claimantsLastName"
                      placeholder="Enter last name"
                      fieldCounter="(10-2 of 21)"
                      limit={12}
                    />
                    <TextInput
                      label="Social Security Number"
                      name="claimantsSsn"
                      placeholder="Enter ssn"
                      fieldCounter="(11 of 21)"
                      limit={9}
                    />
                    <DropDownExtended
                      label="Has the Veteran Ever Filed a Claim With VA?"
                      hintsMessage="If 'YES', Complete Item 13"
                      name="claimantsClaim"
                      data={yesNoData}
                      fieldCounter="(12 of 21)"
                    />
                    <TextInput
                      label="VA File Number"
                      name="claimantsCurrentVa"
                      placeholder="Enter va file number"
                      fieldCounter="(13 of 21)"
                      limit={9}
                      hasCounter
                    />

                    <DropDownExtended
                      label="Relationship to Veteran"
                      name="claimantsRelationship"
                      data={relationshipToVeteranData}
                      fieldCounter="(14 of 21)"
                    />
                    {values.claimantsRelationship === 'Other' && (
                      <>
                        <TextInput
                          label="Other (Specify)"
                          name="claimantOther"
                          placeholder="specify"
                          limit={9}
                          hasCounter
                        />
                      </>
                    )}
                    <DateSelectorExtended
                      label="Claimant's Date of Birth"
                      name="claimantsBirthday"
                      value={values.claimantsBirthday}
                      placeholder="Select Date"
                      onChange={(val) =>
                        setFieldValue('claimantsBirthday', val)
                      }
                      isDOB
                      fieldCounter="(15 of 21)"
                    />
                    <Divider title="Mailing Address" />
                    <TextInput
                      label="No. & Street"
                      name="claimantsStreet"
                      placeholder="Enter street"
                      fieldCounter="(16 of 21)"
                      limit={20}
                    />
                    <TextInput
                      label="Apt./Unit Number"
                      name="claimantsUnitNumber"
                      placeholder="Enter apt/unit number"
                      fieldCounter="(16-2 of 21)"
                      limit={5}
                    />
                    <TextInput
                      label="City"
                      name="claimantsCity"
                      placeholder="Enter city"
                      fieldCounter="(16-3 of 21)"
                      limit={18}
                    />
                    <DropDownExtended
                      label="State/Province"
                      name="claimantsProvince"
                      data={StateData}
                      hasCounter={true}
                      fieldCounter="(16-4 of 21)"
                    />
                    <TextInput
                      label="Country"
                      name="claimantsCountry"
                      fieldCounter="(16-5 of 21)"
                      limit={2}
                      readOnly
                    />
                    <TextInput
                      label="ZIP Code/Postal Code"
                      name="claimantsZipCode"
                      placeholder="Enter zip/postal code"
                      fieldCounter="(16-6 of 21)"
                      limit={10}
                    />
                    <Divider title=" Contact" />
                    <TextInput
                      label="Telephone Number"
                      name="claimantsPhone"
                      placeholder="Enter telephone number"
                      fieldCounter="(17 of 21)"
                      limit={12}
                    />
                    <TextInput
                      label="Enter International Phone Number"
                      name="claimantsPhoneI"
                      placeholder="Enter international phone number"
                      fieldCounter="(17-2 of 21)"
                      limit={15}
                      hasCounter
                    />

                    <TextInput
                      label="Email Address"
                      name="claimantsEmail"
                      placeholder="Enter email"
                      fieldCounter="(9 of 21)"
                      limit={40}
                    />
                    <OptionSelector
                      name="claimantsEmailE"
                      options={values.claimantsEmailE}
                      multiSelect={true}
                      isOtherAllowed={false}
                    />
                  </>
                )}

                <SectionTitle
                  title="Section III: General Benefit Election"
                  subtitle="IMPORTANT: VA may not be
            able to use this form to establish an effective date for benefits if
            you do not select one or more of the general benefits listed below"
                />
                <OptionSelector
                  label="I intend to file for the general benefit(s) checked below:"
                  name="benefitElection"
                  options={values.benefitElection}
                  multiSelect={true}
                  isOtherAllowed={false}
                  fieldCounter="(19 of 21)"
                />

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
