import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  verifyOtpToUser,
  sendOtpToUser,
  googleLogin,
} from '@/store/slices/authSlice';
import Button from '../FormInputs/Button';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { CutIcon } from '@/components/icons/SvgIcons';
import { getBrowserName, getOS, getPlatform } from '@/utils';
import { FaRegUser } from 'react-icons/fa';
import { GoLock } from 'react-icons/go';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const { uid } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const deviceModel = `${getOS()}-${getPlatform()} ${getBrowserName()}`;
  const formikRef = useRef(null);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const rememberInfo = getCookie('rememberInfo');
  let isRemember = rememberInfo && JSON.parse(rememberInfo);

  // Formik Init Values
  const initialValues = {
    email: isRemember?.email || '',
    password: isRemember?.password || '',
    rememberMe: isRemember?.rememberMe || '',
    otp: '',
  };

  // Validators
  const loginValidationSchema = object().shape({
    email: string()
      .required('Email is required.')
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        'Invalid email address format'
      )
      .email('Invalid email address.'),
    password: string().required('Password is required.'),
  });

  const otpValidationSchema = object().shape({
    otp: string().length(6, 'OTP must be 6 digits').required('OTP is required'),
  });

  // Handlers
  const handleKeyDown = (e) => {
    if (e && e.getModifierState) {
      const capsLockIsOn = e.getModifierState('CapsLock');
      setCapsLockOn(capsLockIsOn);
    }
  };

  const handleClickShowPassword = () => {
    setEye(!eye);
  };

  const handleLogin = async () => {
    const { values, validateForm, setTouched, setSubmitting } =
      formikRef.current;

    setSubmitting(true);
    console.log(' >> handleLogin >> ', values);

    // validate form
    const validationErrors = await validateForm();
    const loginFields = ['email', 'password'];
    const hasLoginErrors = loginFields.some((field) => validationErrors[field]);

    if (hasLoginErrors) {
      setTouched({ email: true, password: true });
      setSubmitting(false);
      return;
    }

    // prepare data
    const userPass = {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    };

    // rememberMe cookie
    if (values.rememberMe.length > 0 && values.rememberMe[0] === 'remember') {
      const options = { sameSite: 'Lax', path: '/' };
      setCookie('rememberInfo', userPass, options);
    } else {
      deleteCookie('rememberInfo');
    }

    setError('');
    try {
      const postBody = { email: values.email, password: values.password };
      const response = await dispatch(loginUser(postBody)).unwrap();
      await dispatch(
        sendOtpToUser({ id: response.uid, email: values.email })
      ).unwrap();

      setIsOtpSent(true);
      toast.success('OTP sent. Please verify to continue.');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(err || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const result = await dispatch(googleLogin()).unwrap();
      toast.success('Login Success!');
      setTimeout(() => {
        window.location.replace('/');
      }, 500);
      console.log('User:', result);
    } catch (err) {
      toast.error(err || 'Authentication failed!');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleOtpSubmission = async () => {
    setError('');
    const { values, validateForm, setTouched, setSubmitting } =
      formikRef.current;

    const validationErrors = await validateForm();

    if (validationErrors.otp) {
      setTouched({ otp: true });
      setSubmitting(false);
      return;
    }

    try {
      setSubmitting(true);
      const postBody = {
        id: uid,
        otp: values.otp,
      };
      await dispatch(verifyOtpToUser(postBody)).unwrap();
      toast.success('OTP verified successfully');
      setTimeout(() => {
        window.location.replace('/');
      }, 500);
    } catch (error) {
      setError(error);
      setSubmitting(false);
      toast.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setError('');
    setIsOtpSent(false);
  };

  return (
    <div>
      <Link href="/">
        <img
          src="/assets/images/logo.png"
          alt="image"
          className="m-auto w-[100px] object-cover"
        />
      </Link>
      {error && (
        <div
          className={`
        dark:bg-danger-dark-light'} mb-2 flex items-center rounded bg-danger-light p-3.5 text-danger 
        `}
        >
          <span className="capitalize ltr:pr-2 rtl:pl-2">{error}</span>
          <button
            onClick={() => {
              setError('');
            }}
            type="button"
            className="hover:opacity-80 ltr:ml-auto rtl:mr-auto"
          >
            <CutIcon />
          </button>
        </div>
      )}

      <Formik
        innerRef={formikRef} // 🔑 Attach Formik ref
        initialValues={initialValues}
        validationSchema={
          isOtpSent ? otpValidationSchema : loginValidationSchema
        }
        onSubmit={() => {
          // Optional: Leave blank or for fallback
          console.log('onSubmit triggered');
        }}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form  
            onSubmit={(e) => {
              e.preventDefault();
              if (isOtpSent) {
                handleOtpSubmission();
              } else {
                handleLogin();
              }
            }}
          >
            {!isOtpSent && (
              <>
                <div className="mt-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    autoComplete="off"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter Email"
                    type="email"
                  />
                  <span className="absolute -ml-6 mt-3 cursor-pointer">
                    <FaRegUser className="text-lg text-black" />
                  </span>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-danger"
                  />
                </div>
                <div className="mt-5">
                  <label htmlFor="password">Password</label>
                  <Field
                    autoComplete="off"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter Password"
                    onKeyDown={handleKeyDown}
                    type={eye ? 'text' : 'password'}
                  />
                  <span
                    onClick={handleClickShowPassword}
                    className="absolute -ml-6 mt-3 cursor-pointer"
                  >
                    {eye ? (
                      <AiOutlineEye className="text-lg text-black" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-lg text-black" />
                    )}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-danger"
                  />
                  {capsLockOn && (
                    <p className="mt-3 text-warning">
                      <span className="badge bg-warning">
                        WARNING! Caps lock is ON
                      </span>
                    </p>
                  )}
                </div>
              </>
            )}

            {isOtpSent && (
              <div>
                <label htmlFor="otp">OTP</label>
                <Field
                  autoComplete="off"
                  id="otp"
                  name="otp"
                  className="form-input"
                  placeholder="Enter OTP"
                  type="text"
                  maxLength={6}
                />
                <span className="absolute -ml-6 mt-3 cursor-pointer">
                  <GoLock className="text-lg text-black" />
                </span>
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="mt-1 text-danger"
                />
              </div>
            )}

            {!isOtpSent && (
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  {/* Remember Me */}
                  <label className="flex cursor-pointer items-center gap-2">
                    <Field
                      type="checkbox"
                      className="form-checkbox"
                      name="rememberMe"
                      value="remember"
                    />
                    <span className="text-white">Remember me</span>
                  </label>

                  {/* Forgot Password */}
                  <a
                    href="/forgot-password"
                    className="font-bold text-green-400 hover:no-underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            )}

            <div className="mt-4">
              <Button
                type="submit"
                loading={isSubmitting}
                // onClick={isOtpSent ? handleOtpSubmission : handleLogin}
              >
                {isOtpSent ? 'Submit OTP' : 'Sign In'}
              </Button>
            </div>

            {!isOtpSent && (
              <div className="mt-4">
                <Button
                  type="button"
                  disabled={loadingGoogle}
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {loadingGoogle ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent"></span>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 533.5 544.3"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M533.5 278.4c0-18.9-1.5-37-4.4-54.6H272.1v103.5h147.6c-6.4 34.5-25.4 63.7-54.3 83.3v69.3h87.5c51.2-47.2 80.6-116.5 80.6-201.5z"
                          fill="#4285F4"
                        />
                        <path
                          d="M272.1 544.3c73.7 0 135.6-24.5 180.8-66.5l-87.5-69.3c-24.3 16.3-55.2 25.9-93.3 25.9-71.7 0-132.5-48.4-154.1-113.4H30.1v71.3c45.5 89.6 137.5 152 242 152z"
                          fill="#34A853"
                        />
                        <path
                          d="M118 321.4c-10.6-31.6-10.6-65.7 0-97.3V152.8H30.1c-43.1 84.3-43.1 184.7 0 269l87.9-69.4z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M272.1 107.8c38.8 0 73.4 13.3 100.9 39.4l75.5-75.5C408.1 24.5 346.2 0 272.1 0 167.6 0 75.5 62.4 30.1 152.8l87.9 71.3c21.6-65 82.4-113.4 154.1-113.4z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </Button>
              </div>
            )}
            {isOtpSent && (
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handleBackToLogin}
                  className="flex w-full items-center justify-end gap-2 px-1 py-2 font-bold text-white hover:text-gray-300"
                >
                  {/* Back arrow icon */}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className=" text-green-400 ">Back to Login</span>
                </Button>
              </div>
            )}

            {!isOtpSent && (
              <div className="mt-4">
                <p className="forgot-password flex items-center justify-end gap-1 text-right">
                  <span>Not registered?</span>
                  <a
                    href="/registration"
                    className="font-bold text-green-400  hover:no-underline"
                  >
                    Register
                  </a>
                </p>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
