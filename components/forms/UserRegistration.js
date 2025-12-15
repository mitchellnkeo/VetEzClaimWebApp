import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { useRouter } from 'next/router';
import Button from '../FormInputs/Button';
import { showAlert } from '@/utils';
import { setPageTitle } from '@/store/slices/themeConfigSlice';
import { CutIcon } from '../icons/SvgIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { SignUpValidationSchema } from '@/utils/validators';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import moment from 'moment';
import DateSelector from '../Common/DateSelector';

const UserRegistration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { 'assist': aiAssistant } = router.query; // get ?ai-assistant=true
  const isAiAssistant = aiAssistant === 'true';

  console.log("[UserRegistration] isAiAssistant >>>", isAiAssistant);

  useEffect(() => {
    dispatch(setPageTitle('VetEZ - Registration'));
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPolicies: false,
  };
  const validationSchema = SignUpValidationSchema;

  const onSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const userRef = doc(db, 'profile', userCred.user.uid);
      await setDoc(userRef, {
        createdAt: moment(new Date()).format('MM/DD/YYYY'),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        birthday: values.birthday,
        phone: values.phone,
        street: '',
        unitNumber: '',
        city: '',
        province: '',
        country: '',
        zipCode: '',
        agreeToTerms: true,
        agreeToReceiveEmails: true,
        isDeactivated: false,
        isAccountLive: true,
        deletionDate: '',
        uid: userCred.user.uid,
      });
      resetForm();
      setShowSuccess(true);
    } catch (error) {
      process.env.NODE_ENV === 'development' &&
        console.log('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('The email address is already in use by another account.');
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Check your internet connection.');
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
          <div className="z-[10000] w-80 rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-black">
              Registration Successful 🎉
            </h2>
            <p className="mb-6 text-black">Please sign in to continue.</p>
            <button
              className="rounded-md bg-blue-600 px-4 py-2 text-white"
              onClick={() => {
                setShowSuccess(false);
                if (isAiAssistant) {
                  router.push(`/login?assist=true`);
                } else {
                  router.push('/login');
                }
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSignup}
      >
        {({
          isSubmitting,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          handleBlur,
          setFieldTouched,
        }) => (
          <Form className="space-y-3">
            <h2 className="mb-3 text-3xl font-bold">Registration</h2>
            <div className="m-1 flex gap-4">
              <div className="flex-1">
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  className="form-input w-full"
                  placeholder="Enter First Name"
                  type="text"
                  maxLength={100}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="mt-1 text-danger"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  className="form-input w-full"
                  placeholder="Enter Last Name"
                  type="text"
                  maxLength={100}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="mt-1 text-danger"
                />
              </div>
            </div>
            <div className="m-1">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter Email"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-danger"
              />
            </div>
            <div className="m-1 flex gap-4">
              <div className="flex-1">
                <label htmlFor="birthday">Date of Birth</label>
                <DateSelector
                  name="birthday"
                  label="Date of Birth"
                  value={values.birthday}
                  placeholder="MM/DD/YYYY"
                  onChange={(val) => {
                    setFieldValue('birthday', val);
                  }}
                  isDOB={true}
                />
              </div>

              <div className="flex-1">
                <label htmlFor="phone">Phone Number</label>
                <Field
                  id="phone"
                  name="phone"
                  className="form-input w-full"
                  placeholder="XXX-XXX-XXXX"
                  type="text"
                  maxLength={12}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="mt-1 text-danger"
                />
              </div>
            </div>
            <div className="m-1">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  className="form-input w-full pr-10" // padding for icon
                  placeholder="Enter Password"
                  type={showPassword ? 'text' : 'password'}
                  maxLength={100}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-danger"
              />
            </div>
            <div className="m-1">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input w-full pr-10" // padding for icon
                  placeholder="Re-enter Password"
                  type={showCPassword ? 'text' : 'password'}
                  maxLength={100}
                />
                <button
                  type="button"
                  onClick={() => setShowCPassword(!showCPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                >
                  {showCPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="mt-1 text-danger"
              />
            </div>
            <div className="m-1">
              <div className="items-top mb-2 flex">
                <Field
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className="form-checkbox"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="items-top ml-2 text-sm"
                >
                  I agree to all Terms and Conditions
                </label>
              </div>
              <ErrorMessage
                name="agreeToTerms"
                component="div"
                className="mt-1 text-danger"
              />
              <div className="items-top mt-1 flex">
                <Field
                  type="checkbox"
                  id="agreeToPolicies"
                  name="agreeToPolicies"
                  className="form-checkbox"
                />
                <label
                  htmlFor="agreeToPolicies"
                  className="items-top ml-2 text-sm"
                >
                  I agree to receive emails regarding updates to Policies and
                  Terms and Conditions
                </label>
              </div>
              <ErrorMessage
                name="agreeToPolicies"
                component="div"
                className="mt-1 text-danger"
              />
            </div>

            {msg && (
              <div
                className={`
              flex items-center rounded p-3.5 ${
                msg?.success
                  ? 'bg-success-light text-success dark:bg-success-dark-light'
                  : 'bg-danger-light text-danger dark:bg-danger-dark-light'
              } 
              `}
              >
                <span className="capitalize ltr:pr-2 rtl:pl-2">
                  {msg?.message}
                </span>
                <button
                  onClick={() => {
                    setMsg('');
                  }}
                  type="button"
                  className="hover:opacity-80 ltr:ml-auto rtl:mr-auto"
                >
                  <CutIcon />
                </button>
              </div>
            )}
            <Button type="submit" loading={isSubmitting}>
              Sign up
            </Button>

            <p className="forgot-password flex items-center justify-end gap-1 text-right">
              <span>Already registered?</span>
              <a
                href="/login"
                className="font-bold text-green-400  hover:no-underline"
              >
                Login
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default UserRegistration;
