import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { BoardAppealValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { BoardAppealFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateBoardAppealPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';

const benefitTypeData = [
    'Compensation',
    'Pensions/Survivors Benefits',
    'Fiduciary',
    'Life Insurance',
    'Veterans Health Administration',
    'Veteran Readiness and Employment',
    'Loan Guaranty',
    'Education',
    'National Cemetery Administration'
];

const condition1 = '10A. Direct Review by a Veterans Law Judge: I do not want a Board hearing, and will not submit any additional evidence in support of my appeal. (Choosing this option often results in the Board issuing its decision most quickly.)';
const condition2 = '10B. Evidence Submission Reviewed by a Veterans Law Judge: I have additional evidence in support of my appeal that I will submit to the Board with my VA Form 10182 or within the 90 days of the Board\'s receipt of my VA Form 10182. (Choosing this option will extend the time it takes for the Board to decide your appeal.)';
const condition3 = '10C. Hearing with a Veterans Law Judge: I want a Board hearing and the opportunity to submit additional evidence in support of my appeal that I will provide within 90 days after my hearing. I want the hearing type below: (Choosing this option will extend the time it takes for the Board to decide your appeal.)';

const specificIssue1 = 'Check here if you are including a request for an extension of time to file the VA Form 10182 due to good cause and then attach additional sheets explaining why you believe there is good cause for the extension.';
const specificIssue2 = 'Check here if you are appealing a denial of benefits by the Veterans Health Administration (VHA).';

const hearingType1 = 'Central Office Hearing (I will attend in person in Washington, DC)'
const hearingType2 = 'Videoconference Hearing (I will go to a Regional Office)'
const hearingType3 = 'Virtual Telehearing (I will attend using an internet-connected device)'



const homelessOption = [
    {
      option: 'I am experiencing homelessness',
      isSelected: false,
    },
];

const additionalIssueOption = [
  {
    option:'Check here if you attached additional sheets. Include the Veteran\'s last name and the file number.',
    isSelected: false,
  },
];

const signatureOption = [
  {
    option: 'Signature (Appellant or appointed representative) (Required)',
    isSelected: true,
  },
];

const lawJudgeOption = [
  {
    option: condition1,
    isSelected: false,
    value: '10A',
  },
  {
    option: condition2,
    isSelected: false,
    value: '10B',
  },
  {
    option: condition3,
    isSelected: false,
    value: '10C',
  },
];

const specificIssueOption = [
  {
    option: specificIssue1,
    isSelected: false,
    value: 'va10182',
  },
  {
    option: specificIssue2,
    isSelected: false,
    value: 'vha',
  },
];

const hearingTypeOption = [
  {
    option: hearingType1,
    isSelected: false,
    value: 'centralOffice',
  },
  {
    option: hearingType2,
    isSelected: false,
    value: 'videoconference',
  },
  {
    option: hearingType3,
    isSelected: false,
    value: 'virtualTelehearing',
  },
];



export default function BoardAppealForm() {
  const formTitle       = 'Board Appeal (Form 10182)';
  const formId          = 'boardappeal';
  const formName        = '10182';


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
    name: '',
    fileNumber: '',
    birthday: '',
    notVetName: '',
    notVetBirthday: '',
    street: '',
    homelessness: false,
    homelessnessOpt: homelessOption,
    phone: '',
    email: '',
    rName: '',
    lawJudge: '',
    lawJudgeOpt: lawJudgeOption,
    hearingType: '',
    hearingTypeOpt: hearingTypeOption,
    issueDecided: '',
    issueDecidedOpt: specificIssueOption,
    issues: [{specificIssue: '', date: ''}] ,
    additionalIssue: false,
    additionalIssueOpt: additionalIssueOption,
    dateSigned: '',
    signature: '',
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
        validationSchema={BoardAppealValidationSchema}
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
                name: user.firstName ? user.firstName + ' ' + user.lastName : '',
                birthday: user.dob ? user.dob : '',
                phone: user.phone ? user.phone : '',
                email: user.email ? user.email : '',
                street: user.street ? user.street + ', ' + user.unitNumber + ', ' + user.city + ', ' + user.province + ', ' + 'US' + ', ' + user.zipCode : '',
                signature: user.signature ? user.signature : '',
            });
          };

          const loadDataFromFirebase = async (data) => {
            let homelessOpt = [...homelessOption];
            let lawJudgeOpt = [...lawJudgeOption];
            let hearingTypeOpt = [...hearingTypeOption];
            let issueDecidedOpt = [...specificIssueOption];
            let additionalIssueOpt = [...additionalIssueOption];
            
            if (data.homelessness) {
              homelessOpt = homelessOpt.map((item) => ({
                ...item,
                isSelected: true,
              }));
            }
            if (data.lawJudge) {
              lawJudgeOpt = lawJudgeOpt.map((item) => ({
                ...item,
                isSelected: item.value === data.lawJudge,
              }));
            }
            if (data.hearingType) {
              hearingTypeOpt = hearingTypeOpt.map((item) => ({
                ...item,
                isSelected: item.value === data.hearingType,
              }));
            }
            if (data.issueDecided) {
              issueDecidedOpt = issueDecidedOpt.map((item) => ({
                ...item,
                isSelected: item.value === data.issueDecided,
              }));
            }
            if (data.additionalIssue) {
              additionalIssueOpt = additionalIssueOpt.map((item) => ({
                ...item,
                isSelected: true,
              }));
            }
          
            const dataBody = {
              ...data,
              homelessnessOpt: homelessOpt,
              lawJudgeOpt: lawJudgeOpt,
              hearingTypeOpt: hearingTypeOpt,
              issueDecidedOpt: issueDecidedOpt,
              additionalIssueOpt: additionalIssueOpt,
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
            const pdfObject = await  generateBoardAppealPdfObject(formData);
            await generatePdfService(pdfObject, 'generatepdf11')
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
              BoardAppealFileMap
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
              BoardAppealFileMap
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
              BoardAppealFileMap
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
              const pdfObject = await generateBoardAppealPdfObject(formData);
              console.log('2  faxData >> ', pdfObject);

              await generatePdfService(pdfObject, 'generatepdf11')
                .then(async (res) => {
                  console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'boardappeal.pdf',
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

                <SectionTitle title="Section I: Personal Information" />
                <> 
                    <TextInput
                        label={`Veteran's Name (First, Middle Initial, Last)`}
                        name="name"
                        placeholder="Enter name"
                        fieldCounter="(1 of 13)"
                    />
                    <TextInput
                        label="Veteran's File Number"
                        name="fileNumber"
                        placeholder="Enter file number"
                        fieldCounter="(2 of 13)"
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
                        fieldCounter="(3 of 13)"  
                    />
                    <TextInput
                        label="If I'm not the veteran, my name is: (First name, middle initial, last name)"
                        name="notVetName"
                        placeholder="Enter name"
                        fieldCounter="(4 of 13)"
                        limit={41}
                        hasCounter
                    />
                    <DateSelectorExtended
                        label="My Date of Birth"
                        name="notVetBirthday"
                        value={values.notVetBirthday}
                        placeholder="Select Date"
                        onChange={(val) => setFieldValue('notVetBirthday', val)}
                        isDOB
                        fieldCounter="(5 of 13)"  
                    />
                    <TextInput
                        label="My Preferred Mailing Address\n(Number and street or rural route, P.O. Box, City, State, ZIP Code and Country)"
                        name="street"
                        placeholder="Enter mailing address"
                        fieldCounter="(6 of 13)"
                        limit={133}
                        hasCounter
                    />
                    <OptionSelector
                        name="homelessnessOpt"
                        options={values.homelessnessOpt}
                        multiSelect={true}
                        isOtherAllowed={false}
                        onSelectionChange={(options) => {
                            setFieldValue('homelessness', options[0].isSelected)
                        }}
                    />
                    <TextInput
                        label="My Preferred Telephone\nNumber (Include Area Code)"
                        name="phone"
                        placeholder="Enter telephone number"
                        fieldCounter="(7 of 13)"
                        limit={12}
                        hasCounter
                    />
                    <TextInput
                        label="My Preferred Email Address"
                        name="email"
                        placeholder="Enter email"
                        fieldCounter="(8 of 13)"
                    />
                    <TextInput
                        label="My Representative's Name"
                        name="rName"
                        placeholder="Enter representative's name"
                        fieldCounter="(9 of 13)"
                        limit={34}
                        hasCounter
                    />
                </>

                <SectionTitle title="Section II: Board Review Option" />
                <> 
                    <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-5">
                        A Veterans Law Judge will consider your appeal in the order in which it is
                        received, depending on which of the following review options you select.{" "}
                        <span className="italic">
                            (For additional explanation of your options, please see the attached
                            information and instructions.)
                        </span>
                    </p>

                    <OptionSelector
                        name="lawJudgeOpt"
                        options={values.lawJudgeOpt}
                        multiSelect={false}
                        isOtherAllowed={false}
                        onSelectionChange={(options) => {
                            console.log('options >> ', options);
                            const selectedOption = options.find(item => item.isSelected);
                            let lawJudgeStr = '' 
                            if (selectedOption) {
                                switch (selectedOption.option) {
                                    case condition1:
                                        lawJudgeStr = '10A';
                                        break;
                                    case condition2:
                                        lawJudgeStr = '10B';
                                        break;
                                    case condition3:
                                        lawJudgeStr = '10C';
                                        break;
                                }
                            }
                            setFieldValue('lawJudge', lawJudgeStr)
                        }}
                    />
                    <ErrorMessage name="lawJudge" component="div" style={{ fontSize: '12px', color: 'red' }} />

                    {values.lawJudge === '10C' && (
                    <>
                        <OptionSelector
                            label="Please select the type of hearing you would like to attend."
                            name="hearingTypeOpt"
                            options={values.hearingTypeOpt}
                            multiSelect={false}
                            isOtherAllowed={false}
                            onSelectionChange={(options) => {
                                console.log('options >> ', options);
                                const selectedOption = options.find(item => item.isSelected);
                                let hearingTypeStr = '' 
                                if (selectedOption) {
                                    switch (selectedOption.option) {
                                        case hearingType1:
                                            hearingTypeStr = 'centralOffice';
                                            break;
                                        case hearingType2:
                                            hearingTypeStr = 'videoconference';
                                            break;
                                        case hearingType3:
                                            hearingTypeStr = 'virtualTelehearing';
                                            break;
                                    }
                                }
                                setFieldValue('hearingType', hearingTypeStr)
                            }}
                        />
                        <ErrorMessage name="hearingType" component="div" style={{ fontSize: '12px', color: 'red' }} />
                    </>
                    )}
                </>

                <SectionTitle title="Section III: Specific Issue(s) to be Appealed to a Veterans Law Judge at the Board" />
                <> 
                    <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-5">
                        Please list each issue decided by VA that you would like to appeal. Please
                        refer to your decision notice(s) for a list of adjudicated issues. For each
                        issue, please identify the date of VA's decision and the area of disagreement{" "}
                        <span className="italic">
                            (e.g., service connection, disability evaluation, or effective date of
                            award).
                        </span>
                    </p>


                    <OptionSelector
                        name="issueDecidedOpt"
                        options={values.issueDecidedOpt}
                        multiSelect={false}
                        isOtherAllowed={false}
                        onSelectionChange={(options) => {
                            console.log('options >> ', options);
                            const selectedOption = options.find(item => item.isSelected);
                            let issueDecidedStr = '' 
                            if (selectedOption) {
                                switch (selectedOption.option) {
                                    case specificIssue1:
                                        issueDecidedStr = 'va10182';
                                        break;
                                    case specificIssue2:
                                        issueDecidedStr = 'vha';
                                        break;
                                }
                            }
                            setFieldValue('issueDecided', issueDecidedStr)
                        }}
                    />
                    <ErrorMessage name="issueDecided" component="div" style={{ fontSize: '12px', color: 'red' }} />

                    <div className="mb-10">
                        {values.issues.map((item, ind) => {
                        return (
                            <div key={ind} className="mt-10">
                            <TextInput
                                label={`Issues #${ ind + 1}`}
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
                                    setFieldValue(
                                    `issues[${ind}].date`,
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
                            disabled={values.issues.length >= 5}
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
                                const updatedIssue = [
                                ...values.issues,
                                ];
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
                    </div>

                    <OptionSelector
                        name="additionalIssueOpt"
                        options={values.additionalIssueOpt}
                        multiSelect={true}
                        isOtherAllowed={false}
                        onSelectionChange={(options) => {
                            console.log('options >> ', options);
                            setFieldValue('additionalIssue', options[0].isSelected)
                        }}
                    />
                </>

                <SectionTitle title="Section VI: Certification and Signature" />
                <> 

                    <p className="text-[14px] text-left font-normal text-blue-600 mt-3">
                        I certify that the statements on this form are true and correct to the best of
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
                    fieldCounter="(13 of 13)"
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
