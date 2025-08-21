import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useFormik } from "formik";
import * as Yup from "yup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "@/components/Common/Loading";
const collectionId = "buddy_statement";
export default function BuddyStatement() {
  const sigCanvas = useRef(null);
  const router = useRouter();
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true)
  const [token, settoken] = useState(null)
  const [status, setstatus] = useState(null)
  const { doc_id, message, uid } = router.query;
  const fetchData = async () => {
    try {
     const docRef = doc(db, 'buddy_statement', uid, 'buddyStatement', doc_id) 
     const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        settoken(docSnap.data().fcm_token)
        setstatus(docSnap.data().status)
        formik.setValues({
          witness_first_name: `${docSnap.data().witness_first_name}`,
          witness_last_name: docSnap.data().witness_last_name || "",
          witness_secondary_email: docSnap.data().witness_primary_email || "",
          relationship: docSnap.data().relationship || "",
          signature: docSnap.data().signature || "",
          dateSigned: docSnap.data().dateSigned || "",
          certify: docSnap.data().certify || "",
          statement: docSnap.data().statement || "",
          witness_phone: docSnap.data().witness_phone || "",
        });
        setdata(docSnap.data());
        setloading(false)
      } else {
        console.log("No such document!");
        router.push("/404");
        setloading(false)
      }
    } catch (error) {
      setloading(false)
      console.error("Error getting document: ", error);
    }
  };
  useEffect(() => {
    if (doc_id) {
      fetchData()
    }
  }, [doc_id])
  useEffect(() => {
    if (sigCanvas.current && data?.signature) {
      sigCanvas.current.fromDataURL(data.signature);
    }
  }, [data])
  const formik = useFormik({
    initialValues: {
      statement: "",
      witness_first_name: "",
      witness_last_name: "",
      witness_phone: "",
      witness_secondary_email: "",
      relationship: "",
      signature: "",
      dateSigned: "",
      certify: false,
    },
    validationSchema: Yup.object({
      statement: Yup.string().required("Statement is required").matches(  /^(?!^\d+[_#~@\/:;&'"-?!])(?!^\d+\s*$)(?!.*\d[^\s\d]+\d)(?=.*[a-zA-Z0-9])(?!.*[ ][.,?!@%*+\-_=\/\\:;'"])(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ])\1)(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ]){2,})(?!.*[ ]{2,})(?!.*[.,?!@#$%&*+\-_=\/\\:;'"]{2,})(?!.*\([^)]*\([^)]*\))([a-zA-Z0-9]|[^\$?\d+|\d+\$$]|[a-zA-Z0-9][a-zA-Z0-9\s.,'"\/\-_&@#!?:;$%)]*(?:\s?\([a-zA-Z0-9\s.,'"\/\-_&@#!?:;$%]+\)[a-zA-Z0-9\s.,'"\/\-_&@#!?:;$%]*)*[a-zA-Z0-9.]?)$/, "Must contain valid characters" ),
      witness_first_name: Yup.string().required("Witness first name is required").matches(/^[A-Za-z]+(?:\.?[A-Za-z]+)*(?:(?: [A-Za-z]+)*|(?:\. ?[A-Za-z]+)*)*(\.)?$/, 'Only letters, single spaces, and single periods allowed').min(2, 'First name must be at least 2 characters'),
      witness_last_name: Yup.string().required("Witness last name is required").matches(/^[A-Za-z]+(?:\.?[A-Za-z]+)*(?:(?: [A-Za-z]+)*|(?:\. ?[A-Za-z]+)*)*(\.)?$/, 'Only letters, single spaces, and single periods allowed').min(2, 'Last name must be at least 2 characters'),
      witness_phone: Yup.string().required("Witness phone number is required").matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number must be in the format xxx-xxx-xxxx"),
      witness_secondary_email: Yup.string().email("Invalid email address").required("Witness email is required").matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please enter a valid email address').max(100, 'Email cannot exceed 100 characters'),
      relationship: Yup.string().required("Relationship is required"),
      signature: Yup.string().required("Signature is required"),
      dateSigned: Yup.date().required("Date signed is required"),
      certify: Yup.boolean().oneOf([true], "You must certify the information"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const docRef =doc(db, collectionId, uid, 'buddyStatement', doc_id) 
        await updateDoc(docRef, {
            statement: values.statement,
            witness_first_name: values.witness_first_name,
            witness_phone: values.witness_phone,
            witness_secondary_email: values.witness_secondary_email,
            relationship: values.relationship,
            signature: values.signature,
            dateSigned: values.dateSigned,
            certify: values.certify,
            status: 'witness_submitted'
          });
        fetchData()
        sendPushNotification()
        resetForm()
      } catch (error) {
        console.error("Error adding document:", error);
        alert("Error submitting form.");
      }
      setSubmitting(false);
    },
  });
  const sendPushNotification = async () => {
    const response = await axios.post('https://api.vetezclaim.com/api/buddy-statement/notify-to-system-user', {
      token: token,
      msg: "Buddy statement has been submitted by your witness", // Or any other message you want to send
    });
    if (response.status !== 200) {
      throw new Error('API request failed');
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setloading(true)
        formik.handleSubmit();
      } else {
        formik.setTouched({
          statement: true,
          witness_first_name: true,
          witness_last_name: true,
          witness_phone: true,
          witness_secondary_email: true,
          relationship: true,
          signature: true,
          dateSigned: true,
          certify: true,
        });
      }
    });
  };
  const clearSignature = () => {
    sigCanvas.current.clear();
    formik.setFieldValue("signature", null);
  };
  const saveSignature = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature.");
      return;
    }
    const signatureData = sigCanvas.current.toDataURL();
    formik.setFieldValue("signature", signatureData);
    alert("Signature saved successfully.");
  };
  if (loading) {
    return <div className="flex items-center justify-center h-screen w-full">
      <Loading />
    </div>
  }
  if (status === 'witness_submitted' || status === 'section_one_submitted' || status === 'completed') {
    return <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md text-center">
        <div class="flex justify-center">
          <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="mt-4 text-2xl font-semibold text-gray-800">Success!</h2>
        <p class="mt-2 text-gray-600">You have {status === 'section_one_submitted' || status === 'completed' ? 'already' : 'successfully'} submitted the form.</p>
      </div>
    </div>
  } else {
    return (
      <div className="max-w-6xl mx-auto p-6 w-full bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">VA Lay/Witness Statement Form</h2>
        {message && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded" role="alert">
            <h4 className="text-sm font-semibold mb-1">Request Message</h4>
            <p className="font-medium">"{message}"</p>
            <p className="text-sm mt-2">Please keep this message in mind while completing the statement form below.</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg">
            <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Section III: Statement</h3>
              <div className="mb-3">
                <label htmlFor="statement" className="block font-medium mb-2">Statement:</label>
                <textarea
                  id="statement"
                  className="w-full p-3 border rounded-lg"
                  rows="25"
                  placeholder="Describe what you know or have observed..."
                  name="statement"
                  value={formik.values.statement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.statement && formik.errors.statement ? (
                  <div className="text-red-500 text-sm">{formik.errors.statement}</div>
                ) : null}
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Section IV: Witness Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-3">
                  <label htmlFor="witness_first_name" className="block font-medium mb-2">First Name:</label>
                  <input
                    type="text"
                    id="witness_first_name"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Witness First Name"
                    name="witness_first_name"
                    value={formik.values.witness_first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.witness_first_name && formik.errors.witness_first_name ? (
                    <div className="text-red-500 text-sm">{formik.errors.witness_first_name}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="witness_last_name" className="block font-medium mb-2">Last Name:</label>
                  <input
                    type="text"
                    id="witness_last_name"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Witness Last Name"
                    name="witness_last_name"
                    value={formik.values.witness_last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.witness_last_name && formik.errors.witness_last_name ? (
                    <div className="text-red-500 text-sm">{formik.errors.witness_last_name}</div>
                  ) : null}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="witness_phone" className="block font-medium mb-2">Phone Number:</label>
                <input
                  type="tel"
                  id="witness_phone"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Witness Phone Number"
                  name="witness_phone"
                  value={formik.values.witness_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.witness_phone && formik.errors.witness_phone ? (
                  <div className="text-red-500 text-sm">{formik.errors.witness_phone}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="witness_secondary_email" className="block font-medium mb-2">Email:</label>
                <input
                  type="email"
                  id="witness_secondary_email"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Witness Email"
                  name="witness_secondary_email"
                  value={formik.values.witness_secondary_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.witness_secondary_email && formik.errors.witness_secondary_email ? (
                  <div className="text-red-500 text-sm">{formik.errors.witness_secondary_email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="relationship" className="block font-medium mb-2">Relationship to Veteran:</label>
                <select
                  id="relationship"
                  className="w-full p-2 border rounded-lg"
                  name="relationship"
                  value={formik.values.relationship}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Relationship</option>
                  <option value="Family/Friend">Family/Friend</option>
                  <option value="Coworker/Supervisor">Coworker/Supervisor</option>
                  <option value="Served with Veteran">Served with Veteran</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.relationship && formik.errors.relationship ? (
                  <div className="text-red-500 text-sm">{formik.errors.relationship}</div>
                ) : null}
              </div>
              <h3 className="text-xl font-semibold mb-2 mt-6">Section V: Certification of Statement</h3>
              <div className="mb-3">
                <label htmlFor="signature" className="block font-medium mb-2">Signature:</label>
                <div className="border rounded-lg p-2 bg-white">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: "w-full h-full border rounded-lg",
                    }}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={saveSignature}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Signature
                  </button>
                </div>
                {formik.touched.signature && formik.errors.signature ? (
                  <div className="text-red-500 text-sm">{formik.errors.signature}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="dateSigned" className="block font-medium mb-2">Date Signed:</label>
                <input
                  type="date"
                  id="dateSigned"
                  className="w-full p-2 border rounded-lg"
                  name="dateSigned"
                  value={formik.values.dateSigned}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  max={new Date().toISOString().split('T')[0]}
                  min={new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().split('T')[0]}
                />
                {formik.touched.dateSigned && formik.errors.dateSigned ? (
                  <div className="text-red-500 text-sm">{formik.errors.dateSigned}</div>
                ) : null}
              </div>
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  className="mr-2"
                  name="certify"
                  checked={formik.values.certify}
                  onChange={(e) => formik.setFieldValue('certify', e.target.checked)}
                  onBlur={formik.handleBlur}
                />
                <p className="text-xs">I certify that the information provided is true and correct to the best of my knowledge.</p>
              </label>
              {formik.touched.certify && formik.errors.certify ? (
                <div className="text-red-500 text-sm">{formik.errors.certify}</div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Statement
          </button>
        </form>
      </div>
    );
  }
}
