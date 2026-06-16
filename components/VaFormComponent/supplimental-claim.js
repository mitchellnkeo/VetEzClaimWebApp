import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { SupplementalClaimValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData } from '@/utils/staticData';
import Divider from '@/components/Common/Divider';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { SupplementalClaimFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateSupplementalClaimPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import Breadcrumb from '@/components/Common/Breadcrumb';

const yesNoData = ['Yes', 'No'];
const claimantTypeData = [
  'Veteran',
  "Veteran's spouse",
  "Veteran's child",
  "Veteran's parent",
  'Other',
];

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

const optInOption = [
  {
    option:
      'Check this box if any listed issue is being withdrawn from the legacy appeals process. OPT-IN from SOC/SSOC',
    isSelected: false,
  },
];

const alternateSignerOption = [
  {
    option: 'Signature of Alternate Signer',
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

const signatureOption = [
  {
    option: "Veteran/Claimant's Signature (Required)",
    isSelected: true,
  },
];

export default function SupplementalClaimForm({
  docName = 'supplementalclaim',
  formTitle = 'Supplemental Claim & Reopening (Form 20-0995)',
  inProgress = false,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user, uid } = useSelector((state) => state.auth);
  const [recordExists, setRecordsExists] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [urlDocspring, setUrlDocspring] = useState('');
  const [guid, setGuid] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [count, setCount] = useState(0);

  // process.env.NODE_ENV === 'development' && console.log('>> Reloaded :: ', router.query, inProgress);

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    currentVa: '',
    birthday: '',
    serviceNumber: '',
    insuranceNumber: '',
    claimantsName: '',
    claimantsLastName: '',
    claimantsRelationship: '',
    claimantsRelationshipOther: '',
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    country: 'US',
    zipCode: '',
    phone: '',
    phoneI: '',
    email: '',
    benefitType: '',
    optIn: optInOption,
    issues: [{ specificIssue: '', date: '' }],
    federalRecords: [{ facilityName: '', dateOfRecords: '' }],
    noticeAcknowledgement: '',
    veteranDateSigned: '',
    vaAuthorizedRepresentative: '',
    veteranDateSignedAS: '',
    alternateSignerName: '',
    dic: true,
    alternateSignerOption: alternateSignerOption,
    signature: '',
    signatureOption: signatureOption,
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
        validationSchema={SupplementalClaimValidationSchema}
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
              optIn: data.optIn
                ? [{ ...optInOption[0], isSelected: true }]
                : [...optInOption],
            };

            setValues(dataBody);
          };

          const loadData = async () => {
            setIsLoading(true);
            const data = await getFormData({
              uid: uid,
              formName: docName,
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
            loadData();
          }, [uid]);

          const transformFormValues = async (formData) => {
            return {
              ...formData,
              optIn: formData.optIn?.[0]?.isSelected || false,
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
                docName: docName,
                uid: uid,
                formId: '20-0995',
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
            const pdfObject = await generateSupplementalClaimPdfObject(
              formData
            );
            await generatePdfService(pdfObject, 'generatepdf4')
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
              SupplementalClaimFileMap
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
              SupplementalClaimFileMap
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
              SupplementalClaimFileMap
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
              const pdfObject = await generateSupplementalClaimPdfObject(
                formData
              );
              process.env.NODE_ENV === 'development' &&
                console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf4')
                .then(async (res) => {
                  process.env.NODE_ENV === 'development' &&
                    console.log(res.download_url);
                  const faxBody = await getFaxBodyData(`${docName}.pdf`, false);
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
                      docName: docName,
                      uid: uid,
                      formId: '20-0995',
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

                <SectionTitle title="Section I: Claimant's Identifying Information" />
                <>
                  <TextInput
                    label="Veteran's First Name"
                    name="firstName"
                    placeholder="Enter first name"
                    fieldCounter="(1 of 18)"
                    limit={12}
                  />
                  <TextInput
                    label="Veteran's Last Name"
                    name="lastName"
                    placeholder="Enter last name"
                    fieldCounter="(1-2 of 18)"
                    limit={18}
                  />
                  <TextInput
                    label="Social Security Number"
                    name="ssn"
                    placeholder="Enter ssn"
                    fieldCounter="(2 of 18)"
                    limit={9}
                  />
                  <TextInput
                    label="VA File Number"
                    name="currentVa"
                    placeholder="Enter va file number"
                    fieldCounter="(3 of 18)"
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
                    fieldCounter="(4 of 18)"
                  />
                  <TextInput
                    label="Veteran's Service Number"
                    name="serviceNumber"
                    placeholder="Enter service number"
                    fieldCounter="(5 of 18)"
                    limit={9}
                  />
                  <TextInput
                    label="VA Insurance Policy Number"
                    name="insuranceNumber"
                    placeholder="Enter service number"
                    fieldCounter="(6 of 18)"
                    limit={18}
                  />
                  <TextInput
                    label="Claimant's First Name"
                    name="claimantsName"
                    placeholder="Enter first name"
                    fieldCounter="(7 of 18)"
                    limit={12}
                  />
                  <TextInput
                    label="Claimant's Last Name"
                    name="claimantsLastName"
                    placeholder="Enter last name"
                    fieldCounter="(7-2 of 18)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="Claimant's Type"
                    name="claimantsRelationship"
                    data={claimantTypeData}
                    fieldCounter="(8 of 18)"
                  />

                  {values.claimantsRelationship === 'Other' && (
                    <TextInput
                      label="Other (Specify)"
                      name="claimantsRelationshipOther"
                      placeholder="Enter other"
                      limit={18}
                    />
                  )}

                  <Divider title="Mailing Address" />
                  <TextInput
                    label="No. & Street"
                    name="street"
                    placeholder="Enter street"
                    fieldCounter="(9 of 18)"
                    limit={20}
                  />
                  <TextInput
                    label="Apt./Unit Number"
                    name="unitNumber"
                    placeholder="Enter apt/unit number"
                    fieldCounter="(9-2 of 18)"
                    limit={5}
                  />
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Enter city"
                    fieldCounter="(9-3 of 18)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="State/Province"
                    name="province"
                    data={StateData}
                    fieldCounter="(9-4 of 18)"
                  />
                  <TextInput
                    label="Country"
                    name="country"
                    fieldCounter="(9-5 of 18)"
                    limit={2}
                    readOnly
                  />
                  <TextInput
                    label="ZIP Code/Postal Code"
                    name="zipCode"
                    placeholder="Enter zip/postal code"
                    fieldCounter="(9-6 of 18)"
                    limit={10}
                  />
                  <Divider title=" Contact" />
                  <TextInput
                    label="Telephone Number"
                    name="phone"
                    placeholder="Enter telephone number"
                    fieldCounter="(10 of 18)"
                    limit={12}
                  />
                  <TextInput
                    label="Email Address"
                    name="email"
                    placeholder="Enter email"
                    fieldCounter="(11 of 18)"
                    limit={40}
                  />

                  <DropDownExtended
                    label="Benifit Type (If you would like to file for multiple benefit types, you must complete a separate VA Form 20-0995 for each benefit type.)"
                    name="benefitType"
                    data={benefitTypeData}
                    fieldCounter="(12 of 18)"
                  />
                </>

                <SectionTitle title="Section II: Issue(s) for supplemental claim" />
                <>
                  <p className="dark:text-white-light">
                    {' '}
                    You must list each issue decided by VA that you would like
                    VA to review as part of your{' '}
                    <strong> SUPPLEMENTAL CLAIM. </strong>{' '}
                  </p>
                  <p className="dark:text-white-light">
                    {' '}
                    Please refer to your decision notice(s) for a list of the
                    issues that have been adjudicated. For each issue, please
                    provide the date of the VA's decision.(You can attach extra
                    sheets of paper if needed. Make sure to include your name
                    and file number on each additional sheet.)
                  </p>

                  <OptionSelector
                    name="optIn"
                    options={values.optIn}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />

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
                        disabled={values.issues.length >= 7}
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

                <SectionTitle title="Section III: New and Relevant Evidence" />
                <>
                  <p className="dark:text-white-light">
                    To complete your application, you must provide new and
                    relevant evidence to the VA or let us know about any new and
                    relevant evidence that the VA can help you gather in support
                    of your supplemental claim. If you have records in your
                    possession, please attach them to this form. Please include
                    your name and file number on each page. If you would like VA
                    to request <strong>non-federal records</strong>, please
                    review your decision notification letter for the appropriate
                    authorization forms to complete and submit to VA with this
                    request form.
                  </p>
                  <br></br>
                  <p className="dark:text-white-light">
                    Do you want VA to get federal records?
                  </p>
                  <br></br>
                  <p className="dark:text-white-light">
                    List below any VA Medical Centers (VAMC),{' '}
                    <strong>
                      {' '}
                      VA treatment facilities, or federal departments or
                      agencies{' '}
                    </strong>{' '}
                    that have new and relevant evidence that you are authorizing
                    VA to obtain in support of your supplemental claim. You may
                    attach additional sheets of paper if necessary. Please list
                    your name and file number on each additional sheet.
                  </p>

                  <>
                    {values.federalRecords.map((item, ind) => {
                      return (
                        <div key={ind} className="mt-10">
                          <TextInput
                            label={`Name and Location #${ind + 1}`}
                            name={`federalRecords[${ind}].facilityName`}
                            placeholder="Enter name"
                            hasCounter
                            limit={150}
                          />

                          <DateSelectorExtended
                            label="Date(s) of Records"
                            name={`federalRecords[${ind}].dateOfRecords`}
                            value={values.federalRecords[ind].dateOfRecords}
                            placeholder="Select Date"
                            onChange={(val) =>
                              setFieldValue(
                                `federalRecords[${ind}].dateOfRecords`,
                                val
                              )
                            }
                          />
                        </div>
                      );
                    })}

                    <div className="mt-5 grid grid-cols-2 gap-6">
                      <button
                        className="cursor-pointer rounded bg-gray-200 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-gray-300"
                        disabled={values.federalRecords.length >= 3}
                        onClick={() => {
                          setValues({
                            ...values,
                            federalRecords: [
                              ...values.federalRecords,
                              {
                                facilityName: '',
                                dateOfRecords: '',
                              },
                            ],
                          });
                        }}
                      >
                        Add Facility
                      </button>

                      <button
                        className="cursor-pointer rounded bg-yellow-400 px-5 py-2.5 text-[15px] font-bold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                        hidden={values.federalRecords.length <= 1}
                        onClick={() => {
                          if (values.federalRecords.length > 1) {
                            const updatedRecords = [...values.federalRecords];
                            updatedRecords.pop();
                            setValues({
                              ...values,
                              federalRecords: [...updatedRecords],
                            });
                          }
                        }}
                      >
                        Remove Facility
                      </button>
                    </div>
                  </>
                </>

                <SectionTitle
                  title="Section IV: 5103 Notice Acknowledgment"
                  subtitle="(This section applies to Compensation benefit claims only)"
                />
                <>
                  <p className="dark:text-white-light">
                    {' '}
                    <strong>Note: </strong>If we issued your decision within the
                    past year, you can skip this section.
                  </p>
                  <DropDownExtended
                    label="I CERTIFY THAT I have received or reviewed the notice of evidence needed to support a claim for Veterans Disability Compensation and related benefits as provided at https://www.va.gov/disability/how-to-file-claim/evidence-needed/"
                    name="noticeAcknowledgement"
                    data={yesNoData}
                    fieldCounter="(16 of 18)"
                  />
                </>

                <SectionTitle title="Section V: Certification and Signature" />
                <>
                  <>
                    <p className="dark:text-white-light">
                      {' '}
                      <strong>Note: </strong>This section is{' '}
                      <strong>mandatory</strong> , and you must complete it to
                      process your claim. If anything is missing, it may delay
                      the processing of your claim.
                    </p>
                    <br></br>
                    <p className="dark:text-white-light">
                      {' '}
                      <strong> VA AUTHORIZED REPRESENTATIVES ONLY: </strong>I
                      confirm that the claimant has given me permission to file
                      this supplemental claim on their behalf and that the
                      claimant is aware of and agrees with the information in
                      this document. I also confirm that the claimant has
                      authorized me to state that they certify the information
                      in this document is true and complete to the best of their
                      knowledge.
                    </p>
                    <br></br>
                    <p className="dark:text-white-light">
                      {' '}
                      <strong> NOTE:</strong> A Power of Attorney (POA)
                      signature will only be accepted if, at the time of
                      submitting this claim, there is a valid VA Form 21-22
                      (Appointment of Veterans Service Organization as
                      Claimant's Representative) or VA Form 21-22a (Appointment
                      of Individual as Claimant's Representative) on record with
                      the VA, showing the appropriate POA.{' '}
                    </p>
                    <br></br>
                  </>

                  <OptionSelector
                    name="signatureOption"
                    options={values.signatureOption}
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
                    fieldCounter="(17-2 of 18)"
                  />

                  <TextInput
                    label="Name of VA Authorized Representative"
                    name="vaAuthorizedRepresentative"
                    placeholder="Enter representative info"
                    fieldCounter="(17-3 of 18)"
                  />
                </>

                <SectionTitle title="Alternate Signer Certification and Signature" />
                <>
                  <>
                    <p className="dark:text-white-light">
                      {' '}
                      <strong>I Certify That </strong> by signing on behalf of
                      the claimant, that I am a court-appointed representative;{' '}
                      <strong>OR</strong>, an attorney in fact or agent
                      authorized to act on behalf of a claimant under a durable
                      power of attorney; <strong>OR</strong>, a person who is
                      responsible for the care of the claimant, to include but
                      not limited to a spouse or other relative; OR, a manager
                      or principal officer acting on behalf of an institution
                      which is responsible for the care of an individual;{' '}
                      <strong>AND</strong>, that the claimant is under the age
                      of 29; <strong>OR</strong>, is mentally incompetent to
                      provide substantially accurate information needed to
                      complete the form, or to certify that the statements made
                      on the form are true and complete; <strong>OR</strong>, is
                      physically unable to sign this form.
                      {'\n\n'}I understand that I may be asked to confirm the
                      truthfulness of the answers to the best of my knowledge
                      under penalty of perjury. I also understand that VA may
                      request further documentation or evidence to verify or
                      confirm my authorization to sign or complete an
                      application on behalf of the claimant if necessary.
                      Examples of evidence which VA may request include: Social
                      Security Number (SSN) or Taxpayer Identification Number
                      (TIN); a certificate or order from a court with competent
                      jurisdiction showing your authority to act for the
                      claimant with a judge's signature and a date/time stamp;
                      copy of documentation showing appointment of fiduciary;
                      durable power of attorney showing the name and signature
                      of the claimant and your authority as attorney in fact or
                      agent; health care power of attorney, affidavit or
                      notarized statement from an institution or person
                      responsible for the care of the claimant indicating the
                      capacity or responsibility of care provided; or any other
                      documentation showing such authorization.{' '}
                    </p>
                    <br></br>
                  </>

                  <OptionSelector
                    name="alternateSignerOption"
                    options={values.alternateSignerOption}
                    multiSelect={false}
                    isOtherAllowed={false}
                    lockOption={true}
                  />

                  <DateSelectorExtended
                    label="Date Signed (Required)"
                    name="veteranDateSignedAS"
                    value={values.veteranDateSignedAS}
                    placeholder="Select Date"
                    onChange={(val) =>
                      setFieldValue('veteranDateSignedAS', val)
                    }
                    fieldCounter="(18-2 of 18)"
                  />

                  <TextInput
                    label="Name of Alternate Signer"
                    name="alternateSignerName"
                    placeholder="Enter alternate signer"
                    fieldCounter="(18-3 of 18)"
                  />

                  <p className="dark:text-white-light">
                    <strong className="dark:text-white-light">Penalty: </strong>
                    The law provides severe penalties which include a fine,
                    imprisonment, or both, for the willful submission of any
                    statement or evidence of a material fact, knowing it to be
                    false.
                  </p>
                </>
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
