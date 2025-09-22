import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as utilsApi from '@/services/utils';
import * as authApi from '@/services/auth';
import { initialValues, validationSchema } from '@/form-schemas/registration';
import { formatPhoneNumber } from '@/helpers/textHelper';
import { PROVIDER_ROLES } from '@/constants/constants';
import TextError from '../TextError';
import Select from 'react-select';

const RegistrationForm = () => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [services, setServices] = useState([]);
  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState([]);
  const baseApiUrl = publicRuntimeConfig.baseApiUrl;
  const mapboxToken = publicRuntimeConfig.mapboxToken;


  const options1 = [
    { value: 'Hairstylists', label: 'Hair stylists', isDisabled: 'option--is-disabled' },
    { value: 'Extensions', label: 'Extensions' },
    { value: 'ColorSpecialist', label: 'Color Specialist' },
    { value: 'Barber', label: 'Barber' },
    { value: 'Blowouts', label: 'Blowouts' },
    { value: 'Bridal', label: 'Bridal' },

    { value: 'NailTechnician', label: 'Nail Technician'},

    { value: 'MakeupArtist', label: 'Makeup Artist' },
    { value: 'HealthWellnessCoach', label: 'Health & Wellness Coach', isDisabled: 'option--is-disabled' },
    { value: 'BarreInstructor', label: 'Barre Instructor' },
    { value: 'StrengthTrainer', label: 'Strength Trainer' },
    { value: 'Nutritionist', label: 'Nutritionist' },

    { value: 'Clothingstylist', label: 'Clothing stylist'},
    { value: 'Spraytan', label: 'Spray tan'},
    { value: 'Esthetics', label: 'Esthetics', isDisabled: 'option--is-disabled' },
    { value: 'Botox', label: 'Botox'},
    { value: 'Filler', label: 'Filler'},
    { value: 'Facials', label: 'Facials'},
    { value: 'Massage', label: 'Massage'},
    { value: 'Waxing', label: 'Waxing'},

    { value: 'Models', label: 'Models'},
    { value: 'Photographers', label: 'Photographers'},
    { value: 'LashEyebrowTech', label: 'Lash & Eyebrow Tech'},
    
];

  useEffect(() => {
    getPracticeAreas();
    getStates();
  }, []);

  /**
   * Get practice areas list
   */
  const getPracticeAreas = () => {
    utilsApi.practiceAreas().then((res) => {
      if (res.data?.practiceAreas) {
        const items = res.data?.practiceAreas.map((practiceArea) => {
          return {
            value: practiceArea?._id,
            label: practiceArea?.name,
          };
        });
        setPracticeAreas(items);
      }
    });
  };

  /**
   * Get services list
   */
  const getScopeOfServices = (provider) => {
    utilsApi.scopeOfServices(provider).then((res) => {
      if (res.data?.services) {
        const items = res.data?.services.map((service) => {
          return {
            value: service?._id,
            label: service?.name,
          };
        });
        setServices(items);
      }
    });
  };

  /**
   * Get states list
   */
  const getStates = () => {
    setLoading(true);
    utilsApi.states().then((res) => {
      if (res.data?.states) {
        const items = res.data?.states.map((state) => {
          return {
            value: state?._id,
            label: state?.name,
          };
        });
        setStates(items);
      }
      setLoading(false);
    });
  };

  /**
   * Get counties list
   */
  const getCounties = (stateId, setFieldValue) => {
    utilsApi.counties(stateId).then((res) => {
      if (res.data?.counties) {
        const items = res.data?.counties.map((county) => {
          return {
            value: county?._id,
            label: county?.name,
          };
        });
        setCounties(items);
      }
      setFieldValue('county', null);
    });
  };

  /**
   * Get cities list
   */
  const getCities = (cityId, setFieldValue) => {
    setLoading(true);
    utilsApi.cities(cityId).then((res) => {
      if (res.data?.cities) {
        const items = res.data?.cities.map((city) => {
          return {
            value: city?._id,
            label: city?.name,
          };
        });
        setCities(items);
      }
      setLoading(false);
      setFieldValue('city', null);
    });
  };

  const handleFieldValueChange = (name, value, setFieldValue) => {
    setFieldValue(name, value);
  };

  const handleRegistration = async (values, setSubmitting) => {
    setError({});
    // let payload = {
    //   role: values.role,
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   email: values.email,
    //   password: values.password,
    //   phoneNumberOffice: formatPhoneNumber(values.phoneNumberOffice),
    // };
    console.log('payload', values);
  };

  const languageOptions = [
    {
      label: "Chinese",
      value: "zh-CN"
    },
    {
      label: "English (US)",
      value: "en-US"
    },
    {
      label: "English (GB)",
      value: "en-GB"
    },
    {
      label: "French",
      value: "fr-FR"
    },
    {
      label: "Spanish",
      value: "es-ES"
    }
  ];

  return (
    <>
      <h2 className="mb-3 text-3xl font-bold">Sign up</h2>
      <p className="mb-7">Enter your details to registration</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, errors }) => {
          handleRegistration(values, setSubmitting);
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
        }) => (
          <Form>
            <div>
              <div className="mt-2">
                <label>Role</label>
                <div
                  role="role"
                  className='mb-4" flex items-center'
                  aria-labelledby="role"
                >
                  {PROVIDER_ROLES.map((role, index) => {
                    return (
                      <label
                        key={index}
                        className="ml-2 flex w-full gap-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        <Field
                          type="radio"
                          name="role"
                          value={role.value}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        {role.label}
                      </label>
                    );
                  })}
                  <ErrorMessage name="role" component={TextError} />
                </div>
              </div>

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
                <label htmlFor="email">Email</label>
                <Field
                  autoComplete="off"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter Email"
                  type="email"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="mt-2">
                <label htmlFor="phoneNumberOffice">Phone Number</label>
                <Field
                  autoComplete="off"
                  id="phoneNumberOffice"
                  name="phoneNumberOffice"
                  className="form-input"
                  placeholder="Enter Phone Number"
                  type="text"
                />
                <ErrorMessage name="phoneNumberOffice" component={TextError} />
              </div>

              {(values.role === "beautician") && (
                <div className="mt-2">
                <Select 
                placeholder="Select an provider Type" 
                id="providerType"
                isSearchable={true}
                name="providerType"
                options={options1} 
                isMulti 
                onChange={(value) => {
                  handleFieldValueChange(
                    "providerType",
                    value,
                    setFieldValue
                  );
                }}
                onBlur={() => {
                  setFieldTouched("providerType", true, true);
                }}
                />
                </div>
              )}

              <div className="mt-2">
                <label htmlFor="password">Password</label>
                <Field
                  autoComplete="off"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter Password"
                  type="password"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>
              <div className="mt-2">
                <label htmlFor="password">Confirm Password</label>
                <Field
                  autoComplete="off"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Enter Confirm Password"
                  type="password"
                />
                <ErrorMessage name="confirmPassword" component={TextError} />
              </div>


            </div>
            <button
              type="submit"
              // disabled={isSubmitting}
              className="btn btn-primary !mt-6"
            >
              Submit
              {/* {isSubmitting ? 'loading...' : 'Submit'} */}
            </button>

            <div>
              <p className="!mt-4 text-center text-gray-600">
                Already have an account ?{' '}
                <Link href="/login" className="font-bold">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
