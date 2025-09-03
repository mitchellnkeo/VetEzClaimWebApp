import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { FinancialHardshipValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { FinancialHardshipFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import { postFormData, getFormData } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateFinancialHardshipPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';

const hardshipSignatureOption = [
  {
    option: 'Signature of Appellant/Petitioner',
    isSelected: true,
  },
];

export default function FeeWaiverForm() {
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
    docketNo: '',
    appeallant: '',
    signatureOfAppeallant: hardshipSignatureOption,
    dateSignedAppeallant: '',
    phone: '',
    email: '',
    signature: '',
  });

  return (
    <FrontLayout title="Declaration of Financial Hardship (Fee Waiver)">
      <Formik
        initialValues={initialValues}
        validationSchema={FinancialHardshipValidationSchema}
      >
        {({ values, setValues, setFieldValue, setTouched, validateForm }) => {
          const loadDataFromLocalStorage = async () => {
            console.log('loading data from local storage : ', user);
            await setValues({
              ...values,
              appeallant: user.firstName
                ? `${user.firstName} ${user.lastName}`
                : '',
              phone: user.phone ? user.phone : '',
              email: user.email ? user.email : '',
              signature: user.signature ? user.signature : '',
            });
          };

          const loadDataFromFirebase = async (data) => {
            var dataBody = {
              ...data,
              signatureOfAppeallant: data.signatureOfAppeallant
                ? [{ ...hardshipSignatureOption[0], isSelected: true }]
                : [...hardshipSignatureOption],
            };
            setValues(dataBody);
          };

          const loadData = async () => {
            setIsLoading(true);
            const data = await getFormData({
              uid: uid,
              formName: 'financial_hardship',
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
              signatureOfAppeallant:
                formData.signatureOfAppeallant?.[0]?.isSelected || false,
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            console.log('>> save Data :  isFromSaveData : ', isFromSaveData);
            var formData = await transformFormValues(values);
            formData = { ...formData, ...fields };
            console.log('>> save Data : ', formData);
            try {
              await postFormData({
                docName: 'financial_hardship',
                uid: uid,
                formId: 'Fee Waiver',
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
            const pdfObject = await generateFinancialHardshipPdfObject(
              formData
            );
            await generatePdfService(
              pdfObject,
              'generate-financial-hardship-pdf'
            )
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
              FinancialHardshipFileMap
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
              FinancialHardshipFileMap
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
              FinancialHardshipFileMap
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
              const pdfObject = await generateFinancialHardshipPdfObject(
                formData
              );
              console.log('2  faxData >> ', pdfObject);

              await generatePdfService(
                pdfObject,
                'generate-financial-hardship-pdf'
              )
                .then(async (res) => {
                  console.log(res.download_url);
                  const faxBody = await getFaxBodyData(
                    'financialhardship.pdf',
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
                      docName: 'financial_hardship',
                      uid: uid,
                      formId: 'Fee Waiver',
                      recordExists: recordExists,
                      formData: completeForm,
                    });

                    setToastConfig({
                      title: 'VetEZ Claim',
                      message: `Your submission has been successfully uploaded to court. Do you want to submit another?`,
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
              title="Declaration of Financial Hardship (Fee Waiver)"
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

                <>
                  <SectionTitle title="DECLARATION OF FINANCIAL HARDSHIP" />

                  <TextInput
                    label="Docket No."
                    name="docketNo"
                    placeholder="Enter docket no"
                    fieldCounter="(1 of 5)"
                    limit={8}
                    hasCounter
                  />

                  <TextInput
                    label="Appellant/Petitioner"
                    name="appeallant"
                    placeholder="Enter appellant/petitioner"
                    fieldCounter="(2 of 5)"
                  />

                  <div className="my-5 text-base text-gray-700">
                    I am the appellant/petitioner. I declare by my signature
                    below that payment of the fifty dollar ($50.00) filing fee
                    referenced in Rule 3(f) and Rule 21(a) of the Court's Rules
                    of Practice and Procedure would be a financial hardship for
                    me.
                    <br />
                    <br />
                    <span className="font-bold">
                      Pursuant to 28 U.S.C. § 1746, I certify, under penalty of
                      perjury under the laws of the United States of America,
                      that the foregoing is true and correct.
                    </span>
                  </div>

                  <OptionSelector
                    name="signatureOfAppeallant"
                    options={values.signatureOfAppeallant}
                    multiSelect={true}
                    isOtherAllowed={false}
                  />

                  <DateSelectorExtended
                    label="Date Signed"
                    name="dateSignedAppeallant"
                    value={values.dateSignedAppeallant}
                    placeholder="Select Date"
                    onChange={(val) =>
                      setFieldValue('dateSignedAppeallant', val)
                    }
                    fieldCounter="(3 of 5)"
                  />

                  <TextInput
                    label="Telephone Number"
                    name="phone"
                    placeholder="Enter phone"
                    fieldCounter="(4 of 5)"
                  />

                  <TextInput
                    label="E-mail address"
                    name="email"
                    placeholder="Enter email address"
                    fieldCounter="(5 of 5)"
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
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
