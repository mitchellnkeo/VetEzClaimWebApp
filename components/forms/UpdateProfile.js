import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@/components/FormInputs/Button';
import { updateProfile } from '@/store/slices/authSlice';
import * as Yup from 'yup';
import TextError from '@/components/TextError';
import MaskedInput from 'react-text-mask';
import moment from 'moment';
import { showAlert } from '@/utils';
import { useRouter } from 'next/router';

const UpdateProfileForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id, firstName, lastName, email } = user || {};

  const initialValues = {
    firstName,
    lastName,
    email,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, '* minimum 2 character')
      .max(20, 'Max 20 character limit')
      .matches(
        /[^\s*].*[^\s*]/g,
        '* This field cannot contain only blankspaces'
      ),
    lastName: Yup.string()
      .required('Last Name is required')
      .min(2, '* minimum 2 character')
      .max(20, 'Max 20 character limit')
      .matches(
        /[^\s*].*[^\s*]/g,
        '* This field cannot contain only blankspaces'
      ),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email'
      ),
  });

  const handleFieldValueChange = (name, value, setFieldValue) => {
    setFieldValue(name, value);
  };

  const handleUpdateProfile = async (values, setSubmitting) => {
    try {
      const updatePostBody = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== '' && value !== null
        )
      );
      const response = await dispatch(
        updateProfile({ id, updatePostBody })
      ).unwrap();
      if (response) {
        showAlert('Update done!', 'success');
        router.push('/');
      }
    } catch (error) {
      showAlert(error.message, 'error');
      console.log('error', error);
    }
  };

  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
      <div className="mb-5 flex items-center rounded bg-primary-light p-3.5 text-primary dark:bg-primary-dark-light">
        <span className="flex gap-2 ltr:pr-2 rtl:pl-2">
          <h6 className="text-lg font-bold">General Information</h6>
        </span>
      </div>
      <div className="mb-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleUpdateProfile(values, setSubmitting);
          }}
          enableReinitialize={true}
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
            setFieldError,
          }) => (
            <Form className="space-y-5">
              <div className="grid grid-cols-2 gap-6">
                <div className="left">
                  <div className="mt-2">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      autoComplete="off"
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage name="firstName" component={TextError} />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      autoComplete="off"
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage name="lastName" component={TextError} />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="email">
                      Email <small>* Admin email change not allowed</small>
                    </label>
                    <Field
                      readonly="true"
                      autoComplete="off"
                      type="email"
                      id="email"
                      name="email"
                      className="form-input bg-gray-50"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                </div>
              </div>
              <div className="mt-2 w-1/5">
                <Button type="submit">Update</Button>
                {/* <Button type="submit" loading={isSubmitting}>
                  Update
                </Button> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex flex-col sm:flex-row"></div>
    </div>
  );
};

export default UpdateProfileForm;
