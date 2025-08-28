import * as yup from 'yup';

const validCharactersRegex =
  /^(?!^\d+[_#~@\/:;&'"-?!])(?!^\d+\s*$)(?!.*\d[^\s\d]+\d)(?=.*[a-zA-Z0-9])(?!.*[ ][.,?!@#$%&*+\-_=\/\\:;'"])(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ])\1)(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ]){2,})(?!.*[ ]{2,})(?!.*[.,?!@#$%&*+\-_=\/\\:;'"]{2,})(?!.*\([^)]*\([^)]*\))([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\s.,'"\/\-_&@#!?:;)]*(?:\s?\([a-zA-Z0-9\s.,'"\/\-_&@#!?:;]+\)[a-zA-Z0-9\s.,'"\/\-_&@#!?:;]*)*[a-zA-Z0-9.]?)$/;
const streetRegex =
  /^(?=.*[a-zA-Z0-9])(?!.*[ ]{2,})(?!.*[,]{2,})(?!.*[.]{2,})(?!.*[?]{2,})(?!.*[!]{2,})(?!.*[,] {2,})(?!.*[.] {2,})(?!.*[?] {2,})(?!.*[!] {2,})([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\s.,'"\/\-_()&@#!?:;]*[a-zA-Z0-9.])$/;

const unitNumberRegex = /^[A-Za-z0-9-]{0,5}$/;
const cityRegex =
  /^(?:[\p{L}]\.\s){0,3}(?:[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*['’]?)(?:[\s,.\-]+[\p{L}\p{N}'’]+)*\.?$/u;

const nameRegex =
  /^[A-Za-z]+(?:\.?[A-Za-z]+)*(?:(?: [A-Za-z]+)*|(?:\. ?[A-Za-z]+)*)*(\.)?$/;
const addressRegex =
  /^(?=.*[a-zA-Z0-9])(?!.*[ ]{2,})(?!.*[,]{2,})(?!.*[.]{2,})(?!.*[?]{2,})(?!.*[!]{2,})(?!.*[,] {2,})(?!.*[.] {2,})(?!.*[?] {2,})(?!.*[!] {2,})[a-zA-Z0-9][a-zA-Z0-9\s.,'"\/\-_()&@#!?:;]*[a-zA-Z0-9.]?,\s*(?:[\p{L}][\p{L}\p{N}'’\-\.]*(?:\s+[\p{L}\p{N}'’\-\.]+)*),\s*[\p{L}]{2,}$/u;

const disabilityRegex =
  /^(?:\d+: )(?!^\d+[_#~@\/:;&'"-?!])(?!^\d+\s*$)(?!.*\d[^\s\d./]+\d)(?=.*[a-zA-Z0-9])(?!.*[ ][.,?!@#$%*+\-_=\/\\:;'"])(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ])\1)(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ]){2,})(?!.*[ ]{2,})(?!.*[.,?!@#$%&*+\-_=\/\\:;'"]{2,})(?!.*\([^)]*\([^)]*\))([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\s.,'"\/\-_&@#!?:;)]*(?:\s?\([a-zA-Z0-9\s.,'"\/\-_&@#!?:;]+\)[a-zA-Z0-9\s.,'"\/\-_&@#!?:;]*)*[a-zA-Z0-9.]?)$/;
const remarkRegex =
  /^(?!^\d+[_#~@\/:;&'"-?!])(?!^\d+\s*$)(?!.*\d[^\s\d]+\d)(?=.*[a-zA-Z0-9])(?!.*[ ][.,?!@%*+\-_=\/\\:;'"])(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ])\1)(?!.*([.,?!@#$%&*+\-_=\/\\:;'"][ ]){2,})(?!.*[ ]{2,})(?!.*[.,?!@#$%&*+\-_=\/\\:;'"]{2,})(?!.*\([^)]*\([^)]*\))([a-zA-Z0-9]|[^\$?\d+|\d+\$$]|[a-zA-Z0-9][a-zA-Z0-9\s.,'"\/\-_&@#!?:;$%)]*(?:\s?\([a-zA-Z0-9\s.,'"\/\-_&@#!?:;$%]+\)[a-zA-Z0-9\s.,'"\/\-_&@#!?:;$%]*)*[a-zA-Z0-9.]?)$/;

const today = new Date();
const maxDOB = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

const ssnValidation = yup
  .string()
  .required('SSN is required')
  .matches(/^\d{9}$/, 'Social Security Number must be exactly 9 digits')
  .test('valid-ssn', 'Invalid Social Security Number', (value) => {
    if (!value) return true; // Allow Yup to handle 'required' case

    const firstThree = value.substring(0, 3);
    const middleTwo = value.substring(3, 5);
    const lastFour = value.substring(5);

    // SSN cannot start with 000, 666, or be in the range 900-999
    if (
      firstThree === '000' ||
      firstThree === '666' ||
      parseInt(firstThree) >= 900
    ) {
      return false;
    }

    // The middle two digits cannot be "00"
    if (middleTwo === '00') {
      return false;
    }

    // The last four digits cannot be "0000"
    if (lastFour === '0000') {
      return false;
    }

    return true;
  });

const firstNameValidation = yup
  .string()
  .required('First name is required')
  .matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
  .min(2, 'First name must be at least 2 characters');

const lastNameValidation = yup
  .string()
  .required('Last name is required')
  .matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
  .min(2, 'Last name must be at least 2 characters');

const emailValidation = yup
  .string()
  .required('Email is required')
  .email('Invalid email format')
  .max(100, 'Email cannot exceed 100 characters')
  .matches(
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    'Please enter a valid email address'
  );

const vaFileNumberValidation = yup
  .string()
  .matches(/^\d{8,9}[A-Z]?$/, 'Invalid VA File Number format');

const zipCodeValidation = yup
  .string()
  .required('Zip Code is required')
  .matches(
    /^\d{5}(-\d{4})?$/,
    'Zip Code must be in the format XXXXX or XXXXX-XXXX'
  );

const phoneValidation = yup
  .string()
  .matches(
    /^\d{3}-\d{3}-\d{4}$/,
    'Phone number must be in the format xxx-xxx-xxxx'
  )
  .notRequired();

const internationalPhoneValidation = yup
  .string()
  .matches(/^\d{1,15}$/, 'Use digit only format (e.g. 1234567890)')
  .notRequired();

const serviceNumberValidation = yup
  .string()
  .matches(/^(?:[A-Z]{0,2})?\d{7,8}$/, 'Enter a valid Service Number');

const serviceNumberValidationAlt = yup.string().matches(/^\d+$/, {
  message: 'Service number must contain only digits',
  excludeEmptyString: true,
});

const containValidCharacters = yup.string().matches(validCharactersRegex, {
  message: 'Must contain valid characters',
  excludeEmptyString: true,
});

const remarkValidation = yup.string().matches(remarkRegex, {
  message: 'Must contain valid characters',
  excludeEmptyString: true,
});

const validStreetCharacters = yup.string().matches(streetRegex, {
  message: 'Must contain valid characters',
  excludeEmptyString: true,
});

const unitNumberValidation = yup.string().matches(unitNumberRegex, {
  message: 'Please enter a valid Apt/Unit (e.g. A1, 2B)',
  excludeEmptyString: true,
});

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required.')
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      'Invalid email address format'
    )
    .email('Invalid email address.'),
  password: yup.string().required('Password is required.'),
});

export const SignUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(nameRegex, 'Letters, spaces, periods only')
    .min(2, 'Too Short!'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(nameRegex, 'Letters, spaces, periods only')
    .min(2, 'Too Short!'),
  email: emailValidation,
  password: yup
    .string()
    .min(8, 'Minimum length for password is 8 Characters.')
    .required('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*()_+{}\[\]:;<=>?,.\/\\|~`-])(?=.{8,})/,
      'Must use uppercase, lowercase, number & symbol.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required.')
    .oneOf([yup.ref('password'), ''], "Password didn't match."),
  birthday: yup
    .string()
    .required('Birthdate is required.')
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
      'Must be in MM/DD/YYYY format'
    )
    .test('min-age', 'Must be at least 18 years', (value) => {
      if (!value) return true; // required check handled separately
      const [month, day, year] = value.split('/').map(Number);
      const dobDate = new Date(year, month - 1, day);
      return dobDate <= maxDOB;
    }),
  phone: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number is not valid.')
    .required('Phone number is required.'),
  agreeToTerms: yup
    .bool()
    .oneOf([true], 'You need to agree to the terms and conditions.')
    .required('You must agree to the terms and conditions.'),
  agreeToPolicies: yup
    .bool()
    .oneOf([true], 'You need to agree to receive mails regarding updates.')
    .required('You need to agree to receive mails regarding updates.'),
});

export const profileValidation = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  birthday: yup.string().required('Date of Birth is required'),
  phone: yup
    .string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Phone number must be in the format xxx-xxx-xxxx.'
    )
    .required('Phone Number is required.'),
  ssn: ssnValidation,
  branchOfService: yup.string().required('Branch of Service is required.'),
  street: validStreetCharacters.required('Street is required'),
  unitNumber: unitNumberValidation,
  city: yup
    .string()
    .matches(cityRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true,
    })
    .required('City is required'),
  province: yup
    .string()
    .matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true,
    })
    .required('Province is required'),
  country: yup.string().required('Country is required'),
  zipCode: zipCodeValidation,
  signature: yup.string().required('Signature is required'),
});

export const SubmitIntentFileValidation = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  claim: yup.string().required('This field is required to save PDF'),
  currentVa: vaFileNumberValidation,
  serviceNumber: serviceNumberValidationAlt,
  birthday: yup.string().required('This field is required to save PDF'),
  street: validStreetCharacters.required('This field is required to save PDF'),
  unitNumber: unitNumberValidation,
  city: yup
    .string()
    .matches(cityRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true,
    })
    .required('This field is required to save PDF'),
  province: containValidCharacters.required(
    'This field is required to save PDF'
  ),
  country: containValidCharacters.required(
    'This field is required to save PDF'
  ),
  zipCode: zipCodeValidation,
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: emailValidation,
  vet: yup.bool(),
  claimantsName: yup.string().when('vet', {
    is: true,
    then: (schema) =>
      schema
        .required('This field is required to save PDF')
        .matches(
          nameRegex,
          'Only letters, single spaces, and single periods allowed'
        )
        .min(2, 'First name must be at least 2 characters'),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsLastName: yup.string().when('vet', {
    is: true,
    then: (schema) =>
      schema
        .required('This field is required to save PDF')
        .matches(
          nameRegex,
          'Only letters, single spaces, and single periods allowed'
        )
        .min(2, 'Last name must be at least 2 characters'),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsSsn: yup
    .string()
    .when('vet', {
      is: true,
      then: (schema) =>
        schema
          .required('This field is required to save PDF')
          .matches(/^\d{9}$/, 'Social Security Number must be exactly 9 digits')
          .min(9, 'Social Security Number must be exactly 9 digits'),
      otherwise: (schema) => schema.notRequired(),
    })
    .test('valid-ssn', 'Invalid Social Security Number', (value) => {
      if (!value) return true; // Allow Yup to handle 'required' case

      const firstThree = value.substring(0, 3);
      const middleTwo = value.substring(3, 5);
      const lastFour = value.substring(5);

      // SSN cannot start with 000, 666, or be in the range 900-999
      if (
        firstThree === '000' ||
        firstThree === '666' ||
        parseInt(firstThree) >= 900
      ) {
        return false;
      }

      // The middle two digits cannot be "00"
      if (middleTwo === '00') {
        return false;
      }

      // The last four digits cannot be "0000"
      if (lastFour === '0000') {
        return false;
      }
      return true;
    }),
  claimantsClaim: yup.string().when('vet', {
    is: true,
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsCurrentVa: vaFileNumberValidation,
  claimantsRelationship: yup.string().when('vet', {
    is: true,
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.nonNullable(),
  }),
  claimantOther: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  claimantsBirthday: yup.string(),
  claimantsStreet: yup.string().when('vet', {
    is: true,
    then: (schema) =>
      schema
        .required('This field is required to save PDF')
        .matches(streetRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true,
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsUnitNumber: unitNumberValidation,
  claimantsCity: yup.string().when('vet', {
    is: true,
    then: (schema) =>
      schema.required('This field is required to save PDF').matches(cityRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true,
      }),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsProvince: yup.string().when('vet', {
    is: true,
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsCountry: yup.string().when('vet', {
    is: true,
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsZipCode: yup.string().when('vet', {
    is: true,
    then: (schema) =>
      schema
        .matches(
          /^\d{5}(-\d{4})?$/,
          'Zip Code must be in the format XXXXX or XXXXX-XXXX'
        )
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  claimantsPhone: yup
    .string()
    .when('vet', {
      is: true,
      then: (schema) =>
        schema
          .required('This field is required to save PDF')
          .matches(
            /^\d{3}-\d{3}-\d{4}$/,
            'Phone number must be in the format xxx-xxx-xxxx'
          ),
      otherwise: (schema) => schema.notRequired(),
    })
    .matches(/^[0-9+\-() ]+$/, 'Phone number contains invalid characters'),
  claimantsPhoneI: yup
    .string()
    .matches(/^\d{1,15}$/, 'Use digit only format (e.g. 1234567890)'),
  claimantsEmail: yup.string().when('vet', {
    is: true,
    then: (schema) =>
      schema
        .email('Not a valid email.')
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  benefitElection: yup
    .array()
    .of(
      yup.object().shape({
        option: yup.string(),
        isSelected: yup.boolean(),
      })
    )
    .test(
      'at-least-one-selected',
      'This field is required to save PDF',
      (benefits) => benefits?.some((benefit) => benefit.isSelected)
    ),
  veteranDateSigned: yup
    .string()
    .required('This field is required to save PDF'),
  signature: yup.string().required('Add signature to Profile'),
});
