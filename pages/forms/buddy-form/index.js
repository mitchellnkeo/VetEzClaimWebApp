import { useState, useEffect } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form, ErrorMessage } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { BuddyFormValidationSchema } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import OptionSelector from '@/components/Common/OptionSelector';
import { GetErrorFieldsString } from '@/utils/utils';
import { BuddyFormFileMap } from '@/utils/FormikFieldMap';
import ToastModal from '@/components/Common/ToastModal';
import {
  updateBuddyStatementData,
  getBuddyFormData,
} from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '@/components/Common/Loader';
import { generateBuddyFormPdfObject } from '@/utils/pdfObjectMaker';
import { generatePdfService } from '@/services/pdfGenerationService';
import { getFaxBodyData, sendViaSRFax } from '@/services/faxPdfService';
import moment from 'moment';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/Common/Breadcrumb';
import DropDownExtended from '@/components/Common/DropDownExtended';
import Divider from '@/components/Common/Divider';
import { StateData } from '@/utils/staticData';
import Modal from '@/components/Common/Modal';
import { deleteBuddyRequestData } from '@/firebase/firebaseOperations';

const receivingEmail = [
  {
    option:
      'I agree to receive electronic correspondence from VA in regards to my claim',
    isSelected: false,
  },
];

export default function BuddyForm() {
  const formTitle = 'Request Buddy Statement (Form 21-10210)';
  const formId = 'Buddy form';
  const formName = '21-10210';
  const collectionName = 'buddy_statement';
  const docName = 'buddyStatement';

  const [isLoading, setIsLoading] = useState(false);
  const { user, uid } = useSelector((state) => state.auth);
  const buddyStatement = useSelector(
    (state) => state.form.selectedBuddyStatement
  );
  const [buddyData, setBuddyData] = useState(buddyStatement);
  const [recordExists, setRecordsExists] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [timestamp, setTimestamp] = useState('');

  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    ssn: '',
    claim: false,
    current_va: '',
    birthday: '',
    insurance_number: '',
    street: '',
    unit_number: '',
    city: '',
    province: '',
    country: 'US',
    zip_code: '',
    phone_number: '',
    email: '',
    receivingEmailOpt: receivingEmail,
  });

  const reviewModal = (
    <>
      <Modal
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        title="Review & Submit to VA"
      >
        <div className="max-h-[89vh] overflow-y-auto">
          <Formik initialValues={buddyData}>
            {({ values }) => {
              const onSubmitToVA = async (e) => {
                e.preventDefault();
                process.env.NODE_ENV === 'development' &&
                  console.log(' onSubmit Now>> ', buddyData);
                setToastConfig({
                  title: 'VetEZ Claim',
                  message: `Are you sure you want to submit to VA?`,
                  primaryButtonText: 'Sure',
                  primaryButtonAction: async () => {
                    setOpenSubmitModal(false);
                    setOpenReviewModal(false);
                    await reviewAndSubmitAction(buddyData);
                  },
                  secondaryButtonText: 'Cancel',
                  secondaryButtonAction: () => {
                    setOpenSubmitModal(false);
                  },
                });
                setOpenSubmitModal(true);
              };

              const reviewAndSubmitAction = async (data) => {
                setIsLoading(true);
                process.env.NODE_ENV === 'development' &&
                  console.log('1  faxData >> ', data);
                const pdfObject = await generateBuddyFormPdfObject(data);
                process.env.NODE_ENV === 'development' &&
                  console.log('2  faxData >> ', pdfObject);
                await generatePdfService(
                  pdfObject,
                  'generate-buddy-statement-pdf'
                )
                  .then(async (res) => {
                    process.env.NODE_ENV === 'development' &&
                      console.log(res.download_url);
                    const faxBody = await getFaxBodyData(
                      'buddy-statement.pdf',
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
                      const completeForm = {
                        ...data,
                        isSaved: true,
                        recordExists: recordExists,
                        formId: formId,
                        formUploadedToVA: true,
                        guid: faxResponse.Result,
                        status: 'completed',
                        pdf: true,
                        timestamp: `${moment().format(
                          'MM/DD/YYYY'
                        )}|${timestamp}`,
                        urlDocspring: res?.permanent_download_url,
                        url: res?.download_url,
                      };

                      const saveStatus = await saveAction(completeForm);
                      if (saveStatus) {
                        setToastConfig({
                          title: 'VetEZ Claim',
                          message: `Your submission has been successfully uploaded to VA.`,
                          primaryButtonText: 'Ok',
                          primaryButtonAction: async () => {
                            setToastOpen(false);
                            router.push('/forms/buddy-requests');
                          },
                        });
                        setToastOpen(true);
                      } else {
                        toast.error('Error uploading to VA. Try again later.');
                      }
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
              };

              return (
                <div className="p-1">
                  <Form className="space-y-4">
                    <ToastModal
                      {...toastConfig}
                      isOpen={openSubmitModal}
                      onClose={() => setOpenSubmitModal(false)}
                    />

                    <SectionTitle title="Section I:  Veteran's Identification Information" />
                    <>
                      <TextInput
                        label={`Veteran's First Name`}
                        name="first_name"
                        placeholder="Enter first name"
                        limit={12}
                        readOnly
                      />
                      <TextInput
                        label="Veteran's Last Name"
                        name="last_name"
                        placeholder="Enter file number"
                        limit={18}
                        readOnly
                      />
                      <TextInput
                        label="Social Security Number"
                        name="ssn"
                        placeholder="Enter ssn"
                        readOnly
                        limit={9}
                      />
                      <TextInput
                        label="VA File Number"
                        name="current_va"
                        placeholder="Enter va file number"
                        readOnly
                        limit={9}
                      />

                      <TextInput
                        label="Date of Birth"
                        name="birthday"
                        readOnly
                      />
                      <TextInput
                        label="VA Insurance File Number"
                        name="insurance_number"
                        placeholder="Enter insurance number"
                        readOnly
                        limit={20}
                      />

                      <Divider title="Mailing Address" />
                      <TextInput
                        label="No. & Street"
                        name="street"
                        placeholder="Enter street"
                        readOnly
                        limit={30}
                      />
                      <TextInput
                        label="Apt./Unit Number"
                        name="unit_number"
                        placeholder="Enter apt/unit number"
                        readOnly
                        limit={5}
                      />
                      <TextInput
                        label="City"
                        name="city"
                        placeholder="Enter city"
                        readOnly
                      />
                      <DropDownExtended
                        label="State/Province"
                        name="province"
                        data={StateData}
                        readOnly
                      />
                      <TextInput label="Country" name="country" readOnly />
                      <TextInput
                        label="ZIP Code/Postal Code"
                        name="zip_code"
                        placeholder="Enter zip/postal code"
                        readOnly
                        limit={10}
                      />
                      <TextInput
                        label="International Telephone Number"
                        name="phone_number"
                        placeholder="Enter international telephone number"
                        readOnly
                      />

                      <TextInput
                        label="Email Address"
                        name="email"
                        placeholder="Enter email"
                        readOnly
                      />
                      <br />

                      <OptionSelector
                        name="receivingEmailOpt"
                        options={values.receivingEmailOpt}
                        multiSelect={true}
                        isOtherAllowed={false}
                        readOnly
                        lockOption={true}
                      />
                      <br />
                      <br />
                    </>

                    <SectionTitle title="Section II:  Witness's Response" />
                    <>
                      <TextInput
                        label="Statement of Witness"
                        name="statement"
                        multiline
                        readOnly
                      />
                      <TextInput
                        label="Witness's First Name"
                        name="witness_first_name"
                        readOnly
                      />
                      <TextInput
                        label="Witness's Last Name"
                        name="witness_last_name"
                        readOnly
                      />
                      <TextInput
                        label="Witness's Phone Number"
                        name="witness_phone"
                        readOnly
                      />
                      <TextInput
                        label="Witness's Email Address"
                        name="witness_primary_email"
                        readOnly
                      />
                      <TextInput
                        label="Relationship to Veteran"
                        name="relationship"
                        readOnly
                      />

                      <div className="w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
                        <img
                          src={values.signature}
                          alt="Signature"
                          className="h-auto w-full rounded-lg bg-white object-contain"
                        />
                      </div>

                      <TextInput
                        label="Date Signed"
                        name="dateSigned"
                        readOnly
                      />

                      <br />

                      <OptionSelector
                        name="signatureOption"
                        options={[
                          {
                            option:
                              'I certify that the information provided is true and correct to the best of my knowledge.',
                            isSelected: values.certify || false,
                          },
                        ]}
                        multiSelect={false}
                        isOtherAllowed={false}
                        lockOption={true}
                      />
                    </>

                    <button
                      type="submit"
                      className="mt-4 w-full rounded-md bg-[#016092] px-4 py-2 text-white hover:bg-[#014a66]"
                      onClick={onSubmitToVA}
                    >
                      Submit to VA
                    </button>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );

  const saveAction = async (data) => {
    try {
      await updateBuddyStatementData(uid, {
        formId: formId,
        recordExists: recordExists,
        ...data,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <FrontLayout title={formTitle}>
      <Breadcrumb
        preUrl="/forms/buddy-requests"
        preTitle="Buddy Requests"
        currentTitle={formTitle}
      />
      {reviewModal}
      <Formik
        initialValues={initialValues}
        validationSchema={BuddyFormValidationSchema}
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
              first_name: user.firstName ? user.firstName : '',
              last_name: user.lastName ? user.lastName : '',
              ssn: user.ssn ? user.ssn : '',
              birthday: user.dob ? user.dob : '',
              email: user.email ? user.email : '',
              street: user.street ? user.street : '',
              unit_number: user.unitNumber ? user.unitNumber : '',
              city: user.city ? user.city : '',
              province: user.province ? user.province : '',
              zip_code: user.zipCode ? user.zipCode : '',
            });
          };

          const loadDataFromFirebase = async (data) => {
            const dataBody = {
              ...data,
              receivingEmailOpt: [
                { ...receivingEmail[0], isSelected: data.claim || false },
              ],
            };

            process.env.NODE_ENV === 'development' &&
              console.log('dataBody : >> ', dataBody);
            setValues(dataBody);
          };

          const loadData = async () => {
            setIsLoading(true);
            try {
              const data = await getBuddyFormData(uid, buddyStatement.docId);
              if (data) {
                setRecordsExists(true);
              }
              if (data && data.isSaved) {
                process.env.NODE_ENV === 'development' &&
                  console.log('data : >> ', data);
                setTimestamp(
                  data?.timestamp === undefined ? '' : data.timestamp
                );
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
              } else {
                await loadDataFromLocalStorage();
                setIsLoading(false);
              }
            } catch (error) {
              await loadDataFromLocalStorage();
              setIsLoading(false);
              process.env.NODE_ENV === 'development' &&
                console.log('error : >> ', error);
            } finally {
              setIsLoading(false);
            }
          };

          useEffect(() => {
            if (!buddyStatement.docId) return;
            loadData();
          }, [uid, buddyStatement.docId]);

          const transformFormValues = async (formData) => {
            return {
              ...formData,
            };
          };

          const saveData = async (fields, isFromSaveData = false) => {
            process.env.NODE_ENV === 'development' &&
              console.log('>> save Data :  isFromSaveData : ', isFromSaveData);
            const formData = { ...buddyStatement, ...values, ...fields };
            process.env.NODE_ENV === 'development' &&
              console.log('>> save Data : ', formData);
            const saveStatus = await saveAction(formData);
            if (saveStatus) {
              return true;
            } else {
              if (isFromSaveData) {
                toast.error('Save failed. Something went wrong!');
              }
              return false;
            }
          };

          const handleSaveOperation = async () => {
            setIsLoading(true);
            var saveStatus = await saveData({ isSaved: true }, true);
            setIsLoading(false);
            if (saveStatus) {
              toast.success('Saved successfully!');
            }
          };

          const generatePdf = async (formValues, isFromGeneratePdf = false) => {
            setIsLoading(true);
            const formData = await transformFormValues(formValues);
            const pdfObject = await generateBuddyFormPdfObject(formData);
            await generatePdfService(pdfObject, 'generate-buddy-statement-pdf')
              .then(async (res) => {
                if (isFromGeneratePdf) {
                  await saveData(
                    {
                      isSaved: true,
                      pdf: true,
                      pdfUrl: res?.download_url,
                      urlDocspring: res?.permanent_download_url,
                    },
                    false
                  );
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

          const onCancelForm = async () => {
            process.env.NODE_ENV === 'development' &&
              console.log('onCancel >> ', buddyStatement);
            try {
              setToastConfig({
                title: 'VetEZ Claim',
                message: `Are you sure you want to cancel this request?`,
                secondaryButtonText: 'Cancel',
                secondaryButtonAction: async () => {
                  setToastOpen(false);
                },
                primaryButtonText: 'Sure',
                primaryButtonAction: async () => {
                  setToastOpen(false);
                  setIsLoading(true);
                  await deleteBuddyRequestData(uid, buddyStatement.id);
                  toast.success('Buddy request cancelled successfully');
                  router.push('/forms/buddy-requests');
                },
              });
              setToastOpen(true);
            } catch (error) {
              process.env.NODE_ENV === 'development' &&
                console.error('Error cancelling buddy request:', error);
              toast.error(
                'Failed to cancel buddy request. Please try again later.'
              );
            } finally {
              setIsLoading(false);
            }
          };

          const onSave = async () => {
            setTouchedAction();
            const allErrors = await validateForm();
            const [hasErrors, missingFields] = GetErrorFieldsString(
              allErrors,
              BuddyFormFileMap
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
              BuddyFormFileMap
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
              BuddyFormFileMap
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
              setBuddyData({ ...buddyStatement, ...values });
              setOpenReviewModal(true);
            }
          };

          return (
            <FormContent
              title={formTitle}
              onViewDetails={onCancelForm}
              onSave={onSave}
              onReview={onReview}
              onSubmit={onSubmit}
              isBuddyForm={true}
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
                    name="first_name"
                    placeholder="Enter first name"
                    fieldCounter="(1 of 8)"
                    limit={12}
                  />
                  <TextInput
                    label="Veteran's Last Name"
                    name="last_name"
                    placeholder="Enter file number"
                    fieldCounter="(1-2 of 8)"
                    limit={18}
                  />
                  <TextInput
                    label="Social Security Number"
                    name="ssn"
                    placeholder="Enter ssn"
                    fieldCounter="(2 of 8)"
                    limit={9}
                  />
                  <TextInput
                    label="VA File Number"
                    name="current_va"
                    placeholder="Enter va file number"
                    fieldCounter="(3 of 8)"
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
                    fieldCounter="(4 of 8)"
                  />

                  <TextInput
                    label="VA Insurance File Number"
                    name="insurance_number"
                    placeholder="Enter insurance number"
                    fieldCounter="(5 of 8)"
                    limit={20}
                  />

                  <Divider title="Mailing Address" />
                  <TextInput
                    label="No. & Street"
                    name="street"
                    placeholder="Enter street"
                    fieldCounter="(6 of 8)"
                    limit={30}
                  />
                  <TextInput
                    label="Apt./Unit Number"
                    name="unit_number"
                    placeholder="Enter apt/unit number"
                    fieldCounter="(6-2 of 8)"
                    limit={5}
                  />
                  <TextInput
                    label="City"
                    name="city"
                    placeholder="Enter city"
                    fieldCounter="(6-3 of 8)"
                    limit={18}
                  />
                  <DropDownExtended
                    label="State/Province"
                    name="province"
                    data={StateData}
                    fieldCounter="(6-4 of 8)"
                  />
                  <TextInput
                    label="Country"
                    name="country"
                    fieldCounter="(6-5 of 8)"
                    limit={2}
                    readOnly
                  />
                  <TextInput
                    label="ZIP Code/Postal Code"
                    name="zip_code"
                    placeholder="Enter zip/postal code"
                    fieldCounter="(6-6 of 8)"
                    limit={10}
                  />
                  <TextInput
                    label="International Telephone Number"
                    name="phone_number"
                    placeholder="Enter international telephone number"
                    fieldCounter="(7-2 of 8)"
                    limit={15}
                    hasCounter
                  />

                  <TextInput
                    label="Email Address"
                    name="email"
                    placeholder="Enter email"
                    fieldCounter="(6 of 8)"
                  />
                  <br />

                  <OptionSelector
                    name="receivingEmailOpt"
                    options={values.receivingEmailOpt}
                    multiSelect={true}
                    isOtherAllowed={false}
                    onSelectionChange={async (options) => {
                      await setFieldValue('claim', options[0].isSelected);
                    }}
                  />
                  <br />
                  <br />
                </>
              </Form>
            </FormContent>
          );
        }}
      </Formik>
    </FrontLayout>
  );
}
