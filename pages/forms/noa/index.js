import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { SubmitIntentFileValidation } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import OptionSelector from '@/components/Common/OptionSelector';
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

const receivingEmail = [
  {
    option:
      'By initialing here, Appellant requests that the Court send all appeal-related documents by email instead of mail.',
    isSelected: false,
  },
];

const hardshipSignatureOption = [
  {
    option: 'Signature of Appellant/Petitioner',
    isSelected: true,
  },
];

const courtSignatureOption = [
  {
    option: 'Signature of person filing this notice',
    isSelected: true,
  },
];

export default function NoaForm() {
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

  console.log('>> Reloaded :: ', router.query, inProgress);

  const [initialValues, setInitialValues] = useState({
    boardDecisionDate: '',
    appeallantName: '',
    appeallantSsn: '',
    appeallantAddress: '',
    phone: '',
    email: '',
    relationshipToAppeallant: '',
    receiveEmail: receivingEmail,
    courtSignature: courtSignatureOption,
    selectedAppearance: {
      attachedAppearance: false,
      limitedToFiling: false,
    },
    personFillingSignatureDateSigned: '',
    financialHardship: '',
    hardshipDocketNo: '',
    hardshipAppeallant: '',
    hardshipSignatureOfAppeallant: hardshipSignatureOption,
    hardshipDateSignedAppeallant: '',
    hardshipPhone: '',
    hardshipEmail: '',
    signature: '',
  });

  return (
    <FrontLayout title="Notice of Appeal (NOA) & Optional Fee Waiver">
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
              title="Notice of Appeal (NOA) & Optional Fee Waiver"
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
                <SectionTitle
                  title="NOTICE OF APPEAL (NOA)"
                  subtitle="The following named Appellant appeals to the Court from a final
            Board of Veterans' Appeals (Board) decision."
                />
                <DateSelectorExtended
                  label="The Board's decision was dated"
                  name="boardDecisionDate"
                  value={values.boardDecisionDate}
                  placeholder="Select Date"
                  onChange={(val) => setFieldValue('boardDecisionDate', val)}
                  fieldCounter="(1 of 14)"
                />
                <TextInput
                  label="Appeallant's printed name"
                  name="appeallantName"
                  placeholder="Enter name"
                  fieldCounter="(2 of 14)"
                />
                <TextInput
                  label="SSN or VA claims file number"
                  name="appeallantSsn"
                  placeholder="Enter ssn or va file number"
                  fieldCounter="(3 of 14)"
                  limit={9}
                  hasCounter
                />
                <TextInput
                  label="Appellant's telephone number"
                  name="phone"
                  placeholder="Enter phone number"
                  fieldCounter="(4 of 14)"
                  limit={12}
                  hasCounter
                />
                <TextInput
                  label="Appellant's email address"
                  name="email"
                  placeholder="Enter email"
                  fieldCounter="(5 of 14)"
                />
                <TextInput
                  label="Appellant's address"
                  name="appeallantAddress"
                  placeholder="Enter address"
                  fieldCounter="(6 of 14)"
                />
                <TextInput
                  label="If other than Appellant, your name/relationship to Appellant"
                  name="relationshipToAppeallant"
                  placeholder="Enter name/relationship"
                  fieldCounter="(7 of 14)"
                />
                <OptionSelector
                  name="receiveEmail"
                  options={values.receiveEmail}
                  multiSelect={true}
                  isOtherAllowed={false}
                />
                <OptionSelector
                  name="courtSignature"
                  options={values.courtSignature}
                  multiSelect={true}
                  isOtherAllowed={false}
                />

                <DateSelectorExtended
                  label="Date Signed"
                  name="personFillingSignatureDateSigned"
                  value={values.personFillingSignatureDateSigned}
                  placeholder="Select Date"
                  onChange={(val) =>
                    setFieldValue('personFillingSignatureDateSigned', val)
                  }
                  fieldCounter="(8 of 14)"
                />

                <div className="mb-5 mt-2 text-sm text-gray-600">
                  (*You may electronically sign by typing "/s/" and then your
                  name in the signature block above: for example, /s/John Doe,
                  or you may sign with an electronic signature from a commercial
                  provider such as DocuSign, Adobe Sign, SignRequest, etc.)
                </div>

                <DropDownExtended
                  label="Do you want to complete Declaration of Financial Hardship (Fee Waiver)?"
                  name="financialHardship"
                  data={yesNoData}
                  fieldCounter="(9 of 14)"
                />

                {values.financialHardship === 'Yes' && (
                  <>
                    <SectionTitle title="DECLARATION OF FINANCIAL HARDSHIP" />

                    <TextInput
                      label="Docket No."
                      name="hardshipDocketNo"
                      placeholder="Enter docket no"
                      fieldCounter="(10 of 14)"
                      limit={8}
                      hasCounter
                    />

                    <TextInput
                      label="Appellant/Petitioner"
                      name="hardshipAppeallant"
                      placeholder="Enter appellant/petitioner"
                      fieldCounter="(11 of 14)"
                    />

                    <div className="my-5 text-base text-gray-700">
                      I am the appellant/petitioner. I declare by my signature
                      below that payment of the fifty dollar ($50.00) filing fee
                      referenced in Rule 3(f) and Rule 21(a) of the Court's
                      Rules of Practice and Procedure would be a financial
                      hardship for me.
                      <br />
                      <br />
                      <span className="font-bold">
                        Pursuant to 28 U.S.C. § 1746, I certify, under penalty
                        of perjury under the laws of the United States of
                        America, that the foregoing is true and correct.
                      </span>
                    </div>

                    <OptionSelector
                      name="hardshipSignatureOfAppeallant"
                      options={values.hardshipSignatureOfAppeallant}
                      multiSelect={true}
                      isOtherAllowed={false}
                    />

                    <DateSelectorExtended
                      label="Date Signed"
                      name="hardshipDateSignedAppeallant"
                      value={values.hardshipDateSignedAppeallant}
                      placeholder="Select Date"
                      onChange={(val) =>
                        setFieldValue('hardshipDateSignedAppeallant', val)
                      }
                      fieldCounter="(12 of 14)"
                    />

                    <TextInput
                      label="Telephone Number"
                      name="hardshipPhone"
                      placeholder="Enter phone"
                      fieldCounter="(13 of 14)"
                    />

                    <TextInput
                      label="E-mail address"
                      name="hardshipEmail"
                      placeholder="Enter email address"
                      fieldCounter="(14 of 14)"
                    />

                    <div className="my-5 text-base text-gray-700">
                      (*To be signed by Appellant/Petitioner, NOT
                      Appellant's/Petitioner's representative. You may
                      electronically sign by typing "/s/" and then your name in
                      the signature block above: for example, /s/John Doe.{' '}
                      <span className="font-extrabold">
                        If you are filing this form, do not pay the $50 filing
                        fee.)
                      </span>
                    </div>
                  </>
                )}

                <SectionTitle title="INSTRUCTIONS" />
                <div className="my-5 text-base text-gray-700">
                  The NOA must be received by the Court, or properly addressed
                  and postmarked by the U.S. Postal Service, not later than 120
                  days after the date on which the Board mailed notice of the
                  decision being appealed. The Court may accept an NOA filed
                  after that date as timely in limited circumstances. See Court
                  Rules of Practice and Procedure 4 and 25.
                  <br />
                  <br />
                  You may file an NOA by either (1) emailing it to
                  self-rep@uscourts.cavc.gov for self-represented parties, or
                  esubmission@uscourts.cavc.gov for represented parties,{' '}
                  <span className="font-extrabold">OR</span> (2) faxing it to
                  (202) 501-5848, <span className="font-extrabold">OR</span> (3)
                  mailing it to: Clerk, US Court of Appeals for Veterans Claims,
                  625 Indiana Avenue, NW, Suite 900, Washington, DC 20004-2950.
                  <br />
                  <br />
                  There is a $50 filing fee for an appeal. Please wait to pay
                  until you have received your USCAVC case number. You may pay
                  through pay.gov
                  (http://www.uscourts.cavc.gov/fee_filingfee.php) or you may
                  send a check or money order, payable to "US Court of Appeals
                  for Veterans Claims."{' '}
                  <span className="font-extrabold">DO NOT SEND CASH.</span> To
                  request a waiver of the filing fee, email, fax, or mail the
                  Court a completed Form 4 (Declaration of Financial Hardship).
                </div>
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
