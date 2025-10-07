import FrontLayout from '@/components/layouts/FrontLayout';
import { useRouter } from 'next/router';
import { fetchBuddyRequests, setBuddyRequestData, deleteBuddyRequestData } from '@/firebase/firebaseOperations';
import { useEffect, useState, useRef } from 'react';
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
import { sendDocToWitness } from '@/store/slices/buddySlice';
import OptionSelector from '@/components/Common/OptionSelector';
import { setSelectedBuddyStatement } from '@/store/slices/formSlice';
import SectionTitle from '@/components/Common/SectionTitle';
import Divider from '@/components/Common/Divider';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData } from '@/utils/staticData';
import SubscriptionRequired from '@/components/Common/SubscriptionRequired';


export default function BuddyRequests() {
  const pageTitle = 'Buddy Requests';
  const router = useRouter();
  const sigCanvas = useRef(null);
  const dispatch = useDispatch();
  const { user, uid } = useSelector((state) => state.auth);
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [buddyRequests, setBuddyRequests] = useState([]);
  const [open, setOpen] = useState(false)
  const [responseOpen, setResponseOpen] = useState(false)
  const [requestModificationOpen, setRequestModificationOpen] = useState(false)
  const [openCompleteFormModal, setOpenCompleteFormModal] = useState(false)
  const [requestChangesToastOpen, setRequestChangesToastOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false);
  const [outerToastOpen, setOuterToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [changeText, setChangeText] = useState("");
  const [messageError, setMessageError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState({
    dateSigned: '',
    docId: '',
    id: '',
    message: '',
    relationship: '',
    signature: '',
    statement: '',
    status: '',
    userId: '',
    witness_first_name: '',
    witness_last_name: '',
    witness_phone: '',
    witness_primary_email: '',
    witness_secondary_email: '',
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
    if (!isSubscribed) return;
    fetchForms();
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
    setSelectedRequest({...request});
    if(request.status === "witness_submitted" || request.status === "modification_requested") {
        setResponseOpen(true);
    } else if(request.status === "completed") {
        setOpenCompleteFormModal(true);
    }
  };

  const onPress = async (request) => {
    console.log("onPress >> ", request);
    dispatch(setSelectedBuddyStatement(request));
    router.push({ pathname: '/forms/buddy-form'});
  };

  const onRequestModification = async (request) => {
    console.log("onRequestModification >> ", request);
    setSelectedRequest({...request});
    setRequestModificationOpen(true);
  };

  const onRequestChangesAction = (e) => {
    e.preventDefault();
    if (!validateMessage(changeText.trim())) {
        toast.error("Please enter a meaningful message");
        return;
    }

    console.log("Submitted message:", changeText);

    setToastConfig({
        title: 'VetEZ Claim',
        message: `Are you sure you want to send modification request to your witness?`,
        primaryButtonText: 'Sure',
        primaryButtonAction: async () => {
            setRequestChangesToastOpen(false);
            setRequestModificationOpen(false);
            await sendMessageToWitness(changeText);
        },
        secondaryButtonText: 'Cancel',
        secondaryButtonAction: () => {
            setRequestChangesToastOpen(false);
        },
    });
    setRequestChangesToastOpen(true);
  };


  const sendMessageToWitness = async (message) => {
    setIsLoading(true);
    try {

    const docId = selectedRequest.docId;
    const sendData = {
        message: message,
        witness_primary_email: selectedRequest.witness_primary_email,
        firebase_document_id: docId,
        url: `https://admin.vetezclaim.com/buddy-statement?doc_id=${docId}&uid=${uid}`,
    };
    
    const response = await dispatch(sendDocToWitness(sendData)).unwrap(); 

    console.log("Response payload: ", response);

    console.log(">>>> Saving buddy request to Firebase");
    await setBuddyRequestData(uid, selectedRequest, docId, "modification_requested", true);
    await fetchForms(false);
    toast.success("Modification request sent to witness successfully");

    } catch (error) {
    console.error("Error sending request:", error);
    toast.error("Failed to send email to witness. Please try again later.");
    } finally {
    setIsLoading(false);
    }
  };

  const validateMessage = (text) => {
    const meaningfulTextPattern = /[a-zA-Z]{2,}/;  
    if (!meaningfulTextPattern.test(text)) {
        setMessageError('Please enter a meaningful message');
        return false;
    }
    setMessageError('');
    return true;
  };

  const requestModal = (
    <div className=''> 
        <Modal open={open} onClose={() => setOpen(false)} title="Provide Buddy's Details" >
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
                        await setBuddyRequestData(uid, values, docId, "email_sent", false);
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
        <div className="max-h-[88vh] overflow-y-auto">
                <Formik initialValues={selectedRequest}>
                {({
                    values,
                    setValues,
                    setFieldValue,
                    errors,
                    touched,
                    setTouched,
                    validateForm,
                }) => {

                useEffect(() => {
                    if (sigCanvas.current && values.signature) {
                          sigCanvas.current.fromDataURL(values.signature); 
                    }
                }, [values.signature]);

                return (
                        <div className="p-1"> 
                            <Form className="space-y-4">
                                <ToastModal
                                    {...toastConfig}
                                    isOpen={toastOpen}
                                    onClose={() => setToastOpen(false)}
                                />  
                                {values.statement && (     
                                    <TextInput  
                                        label="Statement of Witness"
                                        name="statement"
                                        multiline
                                        readOnly
                                    />
                                )}
                                {values.witness_first_name && (
                                    <TextInput
                                        label="Witness's First Name"
                                        name="witness_first_name"
                                        readOnly
                                    />
                                )}
                                {values.witness_last_name && (
                                    <TextInput
                                        label="Witness's Last Name"
                                        name="witness_last_name"
                                        readOnly
                                    />
                                )}
                                {values.witness_phone && (
                                    <TextInput
                                        label="Witness's Phone Number"
                                        name="witness_phone"
                                        readOnly
                                    />
                                )}
                                {values.witness_primary_email && (
                                    <TextInput
                                        label="Witness's Email Address" 
                                        name="witness_primary_email"
                                        readOnly
                                    />
                                )}
                                {values.relationship && (
                                    <TextInput
                                        label="Relationship to Veteran"
                                        name="relationship"
                                        readOnly
                                    />
                                )}
                                {values.signature && (
                                <div className="w-full border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                                    <img
                                    src={values.signature}
                                    alt="Signature"
                                    className="w-full h-auto bg-white rounded-lg object-contain"
                                    />
                                </div>
                                )}
                                {values.dateSigned && (
                                    <TextInput
                                        label="Date Signed"
                                        name="dateSigned"
                                        readOnly
                                    />
                                )}
                                <br />
                                {values.certify && (
                                  <OptionSelector
                                    name="signatureOption"
                                    options={[
                                         {
                                           option: 'I certify that the information provided is true and correct to the best of my knowledge.',
                                           isSelected: values.certify,
                                         },
                                       ]}
                                    multiSelect={false}
                                    isOtherAllowed={false}
                                    lockOption={true}
                                  />
                                  
                                )}
                            </Form>
                        </div>
                    );
                }}
                </Formik>
            </div>
            
        </Modal>
    </div>
  )

  const requestChangesModal = (
    <div>
        <Modal open={requestModificationOpen} onClose={() => {
            setRequestModificationOpen(false)
            setChangeText("")
            setMessageError("")
        }} title="Request Changes">
            <ToastModal
                {...toastConfig}
                isOpen={requestChangesToastOpen}
                onClose={() => setRequestChangesToastOpen(false)}
            />  
            <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-1"> 
                    <form onSubmit={onRequestChangesAction} className="space-y-4">
                        <textarea
                            value={changeText}
                            onChange={(e) => {
                                setChangeText(e.target.value);
                                validateMessage(e.target.value);
                            }}
                            placeholder="Write a meaningful change request to your witness."
                            rows={4}
                            className={`w-full border border-gray-300 rounded-md p-2 text-sm text-black bg-white`}
                        />
                        {messageError && (
                            <p className="text-red-500 text-sm">{messageError}</p>
                        )}

                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    </div>
  )

  const completeFormModal = (
    <Modal open={openCompleteFormModal} onClose={() => setOpenCompleteFormModal(false)} title="Submitted Form">
        <div className="max-h-[89vh] overflow-y-auto">
            <Formik 
            initialValues={selectedRequest}
            >
            {({
                values,
            }) => {
                return (
                    <div className="p-1"> 
                        <Form className="space-y-4">
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
                                <TextInput
                                    label="Country"
                                    name="country"
                                    
                                    readOnly
                                />
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
                                
                                <div className="w-full border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                                    <img
                                    src={values.signature}
                                    alt="Signature"
                                    className="w-full h-auto bg-white rounded-lg object-contain"
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
                                        option: 'I certify that the information provided is true and correct to the best of my knowledge.',
                                        isSelected: values.certify || false,
                                        },
                                    ]}
                                    multiSelect={false}
                                    isOtherAllowed={false}
                                    lockOption={true}
                                />
                            </>
                        </Form>
                    </div>
                )
            }}
            </Formik>
        </div>
    </Modal>
  )

  return (
    <>
        <ToastModal
            {...toastConfig}
            isOpen={outerToastOpen}
            onClose={() => setOuterToastOpen(false)}
        />  
        {!isSubscribed && <SubscriptionRequired />}
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
                            className="flex items-center gap-2 rounded-md px-6 py-2 text-sm text-white cursor-pointer bg-primary hover:bg-primaryHover"
                        >
                            <FaPlusCircle /> New Buddy Request
                        </button>
                    </div>
                </div>
            </div>
            {requestModal}
            {responseViewModal}
            {requestChangesModal}
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
                        onRequestModification={(request)=>{
                            onRequestModification(request);
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
