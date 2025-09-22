import React, { useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase'; // make sure this is your firebase config
import Button from '../FormInputs/Button';
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ForgotPasswordForm = () => {
  const formikRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues = { email: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required.')
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        'Invalid email address format'
      )
      .email('Invalid email address.'),
  });

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);

      toast.success(`Reset link sent to: ${email}`);
    } catch (error) {
      console.log('Reset password error =>', error);
      if (error.code === 'auth/user-not-found') {
        toast.error(`No user found with this email`);
      } else if (error.code === 'auth/invalid-email') {
        toast.error(`Invalid Email`);
      } else {
        toast.error(`Something went wrong.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="mx-auto max-w-md">
      <img
        src="/assets/images/logo.png"
        alt="logo"
        className="m-auto w-[100px] object-cover"
      />

      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await resetPassword(values.email);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <div className="mt-3">
              <label htmlFor="email">Enter Email</label>
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

            <div className="mt-4">
              <Button
                type="submit"
                loading={loading || isSubmitting}
                disabled={!isValid || isSubmitting || loading}
              >
                Reset Password Link
              </Button>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                onClick={handleBackToLogin}
                className="flex w-full items-center justify-end gap-2 px-1 py-2 font-bold text-white hover:text-gray-300"
              >
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
