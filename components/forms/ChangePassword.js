import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/FormInputs/Button';
import { object, string } from 'yup';
import { changePassword } from '@/store/slices/authSlice';
import { showAlert } from '@/utils';
import { useRouter } from 'next/router';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const ChangePasswordForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const [eyeForOldPass, setEyeForOldPass] = useState(false);
  const [eyeForNewPass, setEyeForNewPass] = useState(false);
  const [eyeForConfirmPass, setEyeForConfirmPass] = useState(false);
  const dispatch = useDispatch();

  const getFriendlyError = (errorCode) => {
    process.env.NODE_ENV === 'development' &&
      console.log('errorCode : ', errorCode);
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'Your current password is incorrect.';
      case 'auth/requires-recent-login':
        return 'Please log in again to change your password.';
      case 'auth/weak-password':
        return 'New password is too weak. Please choose a stronger one.';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  const handlePasswordChange = async (values, setSubmitting, resetForm) => {
    const { oldPassword, newPassword } = values;
    try {
      const currentPassword = oldPassword;
      const response = await dispatch(
        changePassword({ currentPassword, newPassword })
      ).unwrap();

      showAlert(response, 'success');
      resetForm();
    } catch (error) {
      const errorCode = error.code || 'unknown';
      const friendlyMessage = getFriendlyError(errorCode);
      showAlert(friendlyMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = object().shape({
    oldPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password length must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
      <h6 className="mb-5 text-lg font-bold">Change Password</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handlePasswordChange(values, setSubmitting, resetForm);
            }}
            enableReinitialize={true}
          >
            {({
              values,
              handleSubmit,
              errors,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form>
                <div className="mt-2">
                  <label htmlFor="password">Current Password</label>
                  <Field
                    id="oldPassword"
                    name="oldPassword"
                    className="form-input relative"
                    placeholder="Enter Old Password"
                    type={eyeForOldPass ? 'text' : 'password'}
                  />
                  <span
                    onClick={() => setEyeForOldPass(!eyeForOldPass)}
                    className="absolute -ml-6 mt-3 cursor-pointer"
                  >
                    {eyeForOldPass ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="mt-1 text-danger"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="password">New Password</label>
                  <Field
                    autoComplete="off"
                    id="newPassword"
                    name="newPassword"
                    className="form-input"
                    placeholder="Enter New Password"
                    type={eyeForNewPass ? 'text' : 'password'}
                  />
                  <span
                    onClick={() => setEyeForNewPass(!eyeForNewPass)}
                    className="absolute -ml-6 mt-3 cursor-pointer"
                  >
                    {eyeForNewPass ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>

                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="mt-1 text-danger"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="password">Confirm Password</label>
                  <Field
                    autoComplete="off"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    className="form-input"
                    placeholder="Enter Confirm Password"
                    type={eyeForConfirmPass ? 'text' : 'password'}
                  />
                  <span
                    onClick={() => setEyeForConfirmPass(!eyeForConfirmPass)}
                    className="absolute -ml-6 mt-3 cursor-pointer"
                  >
                    {eyeForConfirmPass ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                  <ErrorMessage
                    name="confirmNewPassword"
                    component="div"
                    className="mt-1 text-danger"
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" loading={isSubmitting}>
                    Change Password
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {error?.message && (
            <span className="my-0 font-bold text-white">{error?.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
