import FrontLayout from '@/components/layouts/FrontLayout';
import { useRouter } from 'next/router';
import { fetchBuddyRequests, setBuddyRequestData, deleteBuddyRequestData } from '@/firebase/firebaseOperations';
import { useEffect, useState } from 'react';
import Loader from '@/components/Common/Loader';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { FaPlusCircle, FaSync } from 'react-icons/fa';
import Modal from '@/components/Common/Modal';
import { Form, Formik } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { BuddyRequestsValidationSchema } from '@/utils/validators';
import { GetErrorFieldsString } from '@/utils/utils';
import { BuddyRequestsFileMap } from '@/utils/FormikFieldMap';
import { useDispatch, useSelector } from 'react-redux';
import ToastModal from '@/components/Common/ToastModal';
import { toast } from 'react-toastify';
import BuddyRequestCell from '@/components/VaFormComponent/buddy-request-cell';
import {
    sendDocToWitness,
    sendMessageToWitness,
  } from '@/store/slices/buddySlice';


export default function BuddyRequests() {
  const pageTitle = 'Buddy Requests';
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, uid } = useSelector((state) => state.auth);
  const [buddyRequests, setBuddyRequests] = useState([
        {
          docId: "92n7ij3j09vv27auhql5g",
          fcm_token: "...",
          formId: "Buddy form",
          id: "92n7ij3j09vv27auhql5g",
          message: "Hello Rob",
          status: "email_sent",
          userId: "sg7PGldSsKaFyLVzx01PfIv54Zi1",
          witness_first_name: "Rob",
          witness_last_name: "Start",
          witness_primary_email: "testy8519@gmail.com"
        },
        {
          docId: "92n7ij3j09vv27auhql6h",
          id: "92n7ij3j09vv27auhql6h",
          message: "Hi John",
          status: "completed",
          witness_first_name: "John",
          witness_last_name: "Doe",
          witness_primary_email: "john@example.com"
        }, 
        {
            docId: "92n7ij3j09vv27auhql6h",
            id: "92n7ij3j09vv27auhql6h",
            message: "Hi John",
            status: "witness_submitted",
            witness_first_name: "John",
            witness_last_name: "Doe",
            witness_primary_email: "john@example.com"
          }, {
            docId: "92n7ij3j09vv27auhql6h",
            id: "92n7ij3j09vv27auhql6h",
            message: "Hi John",
            status: "modification_requested",
            witness_first_name: "John",
            witness_last_name: "Doe",
            witness_primary_email: "john@example.com"
          }
    ]);
  const [open, setOpen] = useState(false)
  const [responseOpen, setResponseOpen] = useState(false)
  const [completeFormOpen, setCompleteFormOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false);
  const [outerToastOpen, setOuterToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({
    witness_response: '',
    witness_first_name: '',
    witness_last_name: '',
    witness_primary_email: '',
    status: '',
    witness_relationship: '',
    witness_signature: '',
    witness_date_signed: '',
    witness_certify: false,
    message: '',
  })


  const [initialValues, setInitialValues] = useState({
    witness_first_name: '',
    witness_last_name: '',
    witness_primary_email: '',
    message: '',  
    }) ;

  const fetchForms = async (showLoader = true) => {
    setIsLoading(showLoader);
    try {
      const bRequests = await fetchBuddyRequests(uid);
      console.log('buddy request >> ', bRequests);

      setBuddyRequests(bRequests);
    } catch (error) {
      console.error('Error fetching in-progress forms:', error);
    } finally {
        if(showLoader) {
            setIsLoading(false);
        }
    }
  };

  useEffect(() => {
    if (!uid) return;
   // fetchForms();
  }, [uid]);

  const onCancel = async (request) => {
    console.log("onCancel >> ", request);
    try {
        setToastConfig({
            title: 'VetEZ Claim',
            message: `Are you sure you want to cancel this request?`,
            secondaryButtonText: 'Cancel',
            secondaryButtonAction: async () => {
            setOuterToastOpen(false);
            },
            primaryButtonText: 'Sure',
            primaryButtonAction : async () => {
                setOuterToastOpen(false);
                setIsLoading(true);
                await deleteBuddyRequestData(uid, request.id);
                await fetchForms(false);
                toast.success("Request cancelled successfully");
            },
        });
        setOuterToastOpen(true);
    } catch (error) {
        console.error("Error cancelling request:", error);
        toast.error("Failed to cancel request. Please try again later.");
    } finally {
        setIsLoading(false);
    }
  };

  const onView = async (request) => {
    console.log("onView >> ", request);
    setSelectedRequest(
        {
            witness_response: 'LoremipsumdolorsitametconsecteturadipiscingelitSeddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtEnimadminimveniamquisnostrudexercitationullamcolaborisnisiutaliquipexeacommodoconsequatDuisautemvelEumiriuredolorinhendreritinvolutpatvelitesse molestie consequatvelillumdoloreeufugiatnullafacilisisatveroerosetaccumsanetjustoodioDignissimquiblanditpraesentluptatumzzril delenitaugue duis doloretefeugaitnullafacilisiLoremipsumdolorsitamet consectetueradipiscingelitAeneancommodo ligulaeget dolorAeneanmassaCumsociisnatoquepenatibusetmagnisdisparturient montesnascetur ridiculus musDonecquamfelisultriciesnec pellentesqueeupretiumquissemNullaconsequatmassaquisenimDonec pedejustofringillavelaliquetnec vulputate eget arcuInenimjusto rhoncusutimperdietavenenatisvitaejustoNullamdictumfeliseu pede mollis pretiumInteger tinciduntCrasdapibusVivamus elementum semper nisiAenean vulputateeleifend tellusAenean leo ligula porttitor euconsequatvitaeeleifendac enimAliquameratvolutpatMaurisnequelaciniautTellusdoloreu.',
            witness_first_name: request.witness_first_name,
            witness_last_name: request.witness_last_name,
            witness_primary_email: request.witness_primary_email,
            message: request.message,
            status: request.status,
            witness_relationship: request.witness_relationship,
            witness_signature: request.witness_signature,
            witness_date_signed: request.witness_date_signed,
            witness_certify: request.witness_certify,
        }
    );
    if(request.status === "witness_submitted" || request.status === "modification_requested") {
        setResponseOpen(true);
    } else if(request.status === "completed") {
        setCompleteFormOpen(true);
    }
  };

  const onPress = async (request) => {
    console.log("onPress >> ", request);
  };

  const requestModal = (
    <div> 
        <Modal open={open} onClose={() => setOpen(false)} title="Provide Buddy's Details">
            <div className="max-h-[90vh] overflow-y-auto">
                <Formik 
                initialValues={initialValues}
                validationSchema={BuddyRequestsValidationSchema}
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

                    const onSendRequest = async () => {
                        setIsLoading(true);
                        try {
                        const docId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        const sendData = {
                            message: values.message,
                            witness_primary_email: values.witness_primary_email,
                            firebase_document_id: docId,
                            url: `https://admin.vetezclaim.com/buddy-statement?doc_id=${docId}&uid=${uid}`,
                        };
                    
                        const response = await dispatch(sendDocToWitness(sendData)).unwrap(); // success payload
                    
                        console.log("Response payload: ", response);
                    
                        console.log(">>>> Saving buddy request to Firebase");
                        await setBuddyRequestData(uid, values, docId);
                        await fetchForms(false);
                        toast.success("Request sent to witness successfully");
                    
                        } catch (error) {
                        console.error("Error sending request:", error);
                        toast.error("Failed to send email to witness. Please try again later.");
                        } finally {
                        setIsLoading(false);
                        }
                    };
                    
                    const onSubmit = async (e) => {
                        e.preventDefault();
                        setTouchedAction();
                        const allErrors = await validateForm();
                        const [hasErrors, missingFields] = GetErrorFieldsString(
                        allErrors,
                        BuddyRequestsFileMap
                        );
                        if (!hasErrors) {
                            if (values.witness_primary_email !== user.email) {
                                setToastConfig({
                                    title: 'VetEZ Claim',
                                    message: `Are you sure you want to send request to your witness?`,
                                    secondaryButtonText: 'Cancel',
                                    secondaryButtonAction: async () => {
                                    setToastOpen(false);
                                    },
                                    primaryButtonText: 'Sure',
                                    primaryButtonAction : async () => {
                                        setToastOpen(false);
                                        setOpen(false);
                                        await onSendRequest();
                                    },
                                });
                                setToastOpen(true);
                            }else {
                                setToastConfig({
                                    title: 'VetEZ Claim',
                                    message: `Use your Buddy's email address.`,
                                    primaryButtonText: 'Ok',
                                    primaryButtonAction: () => {
                                    setToastOpen(false);
                                    },
                                });
                                setToastOpen(true);
                            }
                        }else {
                            setToastConfig({
                                title: 'VetEZ Claim',
                                message: `The following fields are missing: ${missingFields}`,
                                primaryButtonText: 'Ok',
                                primaryButtonAction: () => {
                                setToastOpen(false);
                                },
                            });
                            setToastOpen(true);
                        }
                    }

                    return (
                        <div className="p-1"> 
                            <Form
                                onSubmit={(e) => {
                                    onSubmit(e);
                                }}
                                className="space-y-4"
                            >
                                <ToastModal
                                    {...toastConfig}
                                    isOpen={toastOpen}
                                    onClose={() => setToastOpen(false)}
                                />  

                                <TextInput  
                                label="Witness's First Name"
                                name="witness_first_name"
                                placeholder="Enter first name"
                                limit={12}
                                />
                                <TextInput
                                label="Witness's Last Name"
                                name="witness_last_name"
                                placeholder="Enter last name"
                                limit={18}
                                />
                                <TextInput
                                label="Witness's Primary Email"
                                name="witness_primary_email"
                                placeholder="Enter primary email"
                                limit={40}
                                />
                                <TextInput
                                label="Information Requested"
                                name="message"
                                placeholder="Detail the information you are requesting the witness to provide in their statement"
                                multiline
                                />
                                

                                <button
                                type="submit"
                                className="mt-4 w-full rounded-md bg-[#016092] px-4 py-2 text-white hover:bg-[#014a66]"
                                >
                                Send Request
                                </button>
                            </Form>
                        </div>
                    )
                }}
                </Formik>
            </div>
        </Modal>
    </div>
  )

  const responseViewModal = (
    <div>
        <Modal open={responseOpen} onClose={() => setResponseOpen(false)} title="Witness Response">
        <div className="max-h-[85vh] overflow-y-auto">
                <Formik initialValues={selectedRequest}>
                {(
                        <div className="p-1"> 
                            <Form className="space-y-4">
                                <ToastModal
                                    {...toastConfig}
                                    isOpen={toastOpen}
                                    onClose={() => setToastOpen(false)}
                                />  

                                <TextInput  
                                    label="Statement of Witness"
                                    name="witness_response"
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
                                    label="Witness's Relationship"
                                    name="witness_relationship"
                                    readOnly
                                />
                                <TextInput
                                    label="Witness's Signature"
                                    name="witness_signature"
                                    readOnly
                                />
                                <TextInput
                                    label="Witness's Date Signed"
                                    name="witness_date_signed"
                                    readOnly
                                />
                                <TextInput
                                    label="Witness's Certify"
                                    name="witness_certify"
                                    readOnly
                                />
                            </Form>
                        </div>
                    )
                }
                </Formik>
            </div>
            
        </Modal>
    </div>
  )

  const completeFormModal = (
    <div>
        <Modal open={completeFormOpen} onClose={() => setCompleteFormOpen(false)} title="Complete Form">

        </Modal>
    </div>
  )


  return (
    <>
        <ToastModal
            {...toastConfig}
            isOpen={outerToastOpen}
            onClose={() => setOuterToastOpen(false)}
        />  
        <FrontLayout title={pageTitle}>
        <Loader show={isloading} />
        <Breadcrumb
            preUrl="/forms"
            preTitle="Forms"
            currentTitle={pageTitle}
        />
            <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
                <div className="invoice-table">
                    {/* Top row: Title + Refresh button */}
                    <div className="mb-4.5 flex items-center justify-between px-5">
                    <h1 className="text-2xl">{pageTitle}</h1>
                    <button
                        onClick={() => {
                            fetchForms();
                        }}
                        className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <FaSync /> 
                    </button>
                    </div>

                    {/* New line: Centered New Buddy Request button */}
                    <div className="flex w-full justify-center">
                        <button
                            onClick={() => {
                                setOpen(true)
                            }}
                            className="flex items-center gap-2 rounded-md px-6 py-2 text-sm text-white cursor-pointer bg-[#035F92] hover:bg-[#024b70]"
                        >
                            <FaPlusCircle /> New Buddy Request
                        </button>
                    </div>
                </div>
            </div>
            {requestModal}
            {responseViewModal}
            {completeFormModal}
            <div className="mt-10 space-y-4">
                {buddyRequests.length > 0 ? (
                buddyRequests.map((request, index) => (
                    <BuddyRequestCell
                        key={request.id}
                        request={request}
                        onPress={(request)=>{
                            onPress(request);
                        }}
                        onCancel={(request)=>{
                            onCancel(request);
                        }}
                        onView={(request)=>{
                            onView(request);
                        }}
                    />
                ))
                ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-sm">
                    No Request Found!
                </div>
                )}
            </div> 
        </FrontLayout>
    </>
  );
}
