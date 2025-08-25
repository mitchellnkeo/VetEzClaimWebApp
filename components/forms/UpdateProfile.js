import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Button from '@/components/FormInputs/Button';
import { updateProfile } from '@/store/slices/authSlice';
import TextError from '@/components/TextError';
import { showAlert } from '@/utils';
import DateSelector from '../Common/DateSelector';
import { useRouter } from 'next/router';
import { profileValidation } from '@/utils/validators';
import { db } from '@/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../Common/Loader';
import { StateData } from '@/utils/staticData';
import DropDown from '../Common/DropDown';
import SignatureField from '../Common/SignatureField';

const branchOfServiceData = [
  'Army',
  'Navy',
  'Marine Corps',
  'Air Force',
  'Coast Guard',
  'Space Force',
  'NOAA',
  'USPHA',
];

const UpdateProfileForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, uid } = useSelector((state) => state.auth);
  const { id } = user || {};
  const [isLoading, setLoading] = useState(false);
  const sigPadRef = useRef(null);
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    ssn: '',
    email: '',
    branchOfService: '',
    signature: '',
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    country: 'US',
    zipCode: '',
  });

  const fetchDataOnMount = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(db, 'profile', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userDataNode = userDocSnap.data();
        setInitialValues({
          firstName: userDataNode.firstName || '',
          lastName: userDataNode.lastName || '',
          dob: userDataNode.birthday || '',
          phone: userDataNode.phone || '',
          email: userDataNode.email || '',
          ssn: userDataNode.ssn || '',
          branchOfService: userDataNode.branchOfService || '',
          signature: userDataNode.signature || '',
          city: userDataNode.city || '',
          street: userDataNode.street || '',
          province: userDataNode.province || '',
          unitNumber: userDataNode.unitNumber || '',
          zipCode: userDataNode.zipCode || '',
          country: 'US',
        });
      } else {
        console.log('User data does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // fetch profile data on mount
  useEffect(() => {
    if (uid) {
      fetchDataOnMount();
    }
  }, [uid]);

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      const updatePostBody = Object.fromEntries(
        Object.entries(values).filter(
          ([, value]) => value !== '' && value !== null
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
        <div className="mb-5 flex items-center rounded bg-primary-light p-3.5 text-primary dark:bg-primary-dark-light">
          <h6 className="text-lg font-bold">General Information</h6>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={profileValidation}
          onSubmit={handleUpdateProfile}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="space-y-5">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    placeholder="Enter First Name"
                    maxLength={100}
                  />
                  <ErrorMessage name="firstName" component={TextError} />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    placeholder="Enter Last Name"
                    maxLength={100}
                  />
                  <ErrorMessage name="lastName" component={TextError} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <DateSelector
                    name="dob"
                    value={values.dob}
                    placeholder="Select Date"
                    onChange={(val) => setFieldValue('dob', val)}
                    isDOB
                  />
                  <ErrorMessage name="dob" component={TextError} />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="Enter Phone Number"
                    maxLength={12}
                  />
                  <ErrorMessage name="phone" component={TextError} />
                </div>
              </div>

              {/* Row 3: SSN & Dropdown */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="ssn">Social Security Number</label>
                  <Field
                    type="text"
                    id="ssn"
                    name="ssn"
                    className="form-input"
                    placeholder="Enter SSN"
                    maxLength={9}
                  />
                  <ErrorMessage name="ssn" component={TextError} />
                </div>
                <div>
                  <DropDown
                    label="Branch of Service"
                    data={branchOfServiceData}
                    value={values.branchOfService}
                    onChange={(val) => {
                      setFieldValue('branchOfService', val);
                    }}
                  />
                  <ErrorMessage name="branchOfService" component={TextError} />
                </div>

                {/* <div>
                  <label htmlFor="branchOfService">Branch of Service</label>
                  <Field
                    as="select"
                    id="branchOfService"
                    name="branchOfService"
                    className="form-input"
                  >
                    <option value="">Select</option>
                    {branchOfServiceData.map((branch) => (
                      <option
                        key={branch}
                        value={branch.toLowerCase().replace(/\s+/g, '')} // normalize value if needed
                      >
                        {branch}
                      </option>
                    ))}
                  </Field>
                </div> */}
              </div>

              {/* Mailing Address */}
              <div className="mb-5 flex items-center rounded bg-primary-light p-3.5 text-primary dark:bg-primary-dark-light">
                <h6 className="text-lg font-bold">Mailing Address</h6>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="street">Street</label>
                  <Field
                    type="text"
                    id="street"
                    name="street"
                    className="form-input"
                    placeholder="Street"
                    maxLength={30}
                  />
                  <ErrorMessage name="street" component={TextError} />
                </div>
                <div>
                  <label htmlFor="unitNumber">Apt./Unit Number</label>
                  <Field
                    type="text"
                    id="unitNumber"
                    name="unitNumber"
                    className="form-input"
                    placeholder="Apt / Suite"
                    maxLength={5}
                  />
                  <ErrorMessage name="unitNumber" component={TextError} />
                </div>
              </div>

              {/* Country & Zip */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="city">City</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className="form-input"
                    maxLength={18}
                    placeholder="Enter City"
                  />
                  <ErrorMessage name="city" component={TextError} />
                </div>
                <div>
                  <DropDown
                    label="State/Province"
                    data={StateData}
                    value={values.province}
                    onChange={(val) => {
                      setFieldValue('province', val);
                    }}
                  />
                  <ErrorMessage name="province" component={TextError} />
                </div>
                <div>
                  <label htmlFor="country">
                    Country<small> * read-only</small>{' '}
                  </label>
                  <Field
                    type="text"
                    id="country"
                    name="country"
                    className="form-input"
                    maxLength={2}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="zipCode">Zip Code</label>
                  <Field
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="form-input"
                    maxLength={10}
                    placeholder="Enter Zip Code"
                  />
                  <ErrorMessage name="zipCode" component={TextError} />
                </div>
              </div>

              {/* Mailing Address */}
              <div className="mb-5 flex items-center rounded bg-primary-light p-3.5 text-primary dark:bg-primary-dark-light">
                <h6 className="text-lg font-bold">Signature</h6>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <SignatureField
                  value={values.signature}
                  onChange={(val) => setFieldValue('signature', val)}
                  imgWidth={500}
                  imgHeight={220}
                  style={`.m-signature-pad { border: 1px solid #ccc; }`}
                />
                <ErrorMessage name="signature" component={TextError} />
              </div>

              {/* Submit Button */}
              <div className="mt-2 w-1/5">
                <Button type="submit" loading={isSubmitting}>
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdateProfileForm;
