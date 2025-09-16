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

export const CourtFormsValidationSchema = yup.object().shape({
  boardDecisionDate: yup.string().required('This field is required to save'),
  appeallantName: yup
    .string()
    .matches(
      nameRegex,
      'Only letters, single spaces, and single periods allowed'
    )
    .required('This field is required to save PDF'),
  appeallantSsn: yup
    .string()
    .matches(/^\d{8,9}[A-Z]?$/, 'Invalid SSN/VA file number format')
    .required('This field is required to save PDF'),
  phone: yup
    .string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Phone number must be in the format xxx-xxx-xxxx'
    )
    .required('This field is required to save PDF'),
  email: emailValidation,
  appeallantAddress: yup
    .string()
    .matches(
      addressRegex,
      'Enter address in the following format: Street, City, Province'
    )
    .required('This field is required to save PDF'),
  relationshipToAppeallant: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  personFillingSignatureDateSigned: yup
    .string()
    .required('This field is required to save PDF'),

  hardshipDocketNo: yup.string().when('financialHardship', {
    is: 'Yes',
    then: () =>
      yup
        .string()
        .matches(
          /^(\d{2}-?\d{5})$/,
          'Docket number must be in the format YY-NNNNN or YYNNNNN with digits only.'
        ),
    otherwise: () => yup.string(),
  }),
  hardshipAppeallant: yup.string().when('financialHardship', {
    is: 'Yes',
    then: () =>
      yup
        .string()
        .matches(
          nameRegex,
          'Only letters, single spaces, and single periods allowed'
        )
        .required('This field is required to save PDF'),
    otherwise: () => yup.string(),
  }),
  hardshipDateSignedAppeallant: yup.string().when('financialHardship', {
    is: 'Yes',
    then: () => yup.string().required('This field is required to save PDF'),
    otherwise: () => yup.string(),
  }),
  hardshipPhone: yup.string().when('financialHardship', {
    is: 'Yes',
    then: () =>
      yup
        .string()
        .matches(
          /^\d{3}-\d{3}-\d{4}$/,
          'Phone number must be in the format xxx-xxx-xxxx'
        )
        .required('This field is required to save PDF'),
    otherwise: () => yup.string(),
  }),
  hardshipEmail: yup.string().when('financialHardship', {
    is: 'Yes',
    then: () =>
      yup
        .string()
        .email('Invalid email format')
        .max(100, 'Email cannot exceed 100 characters')
        .matches(
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
          'Please enter a valid email address'
        )
        .required('This field is required to save PDF'),
    otherwise: () => yup.string(),
  }),
  signature: yup.string().required('This field is required to save PDF'),
});

export const FinancialHardshipValidationSchema = yup.object().shape({
  docketNo: yup
    .string()
    .matches(
      /^(\d{2}-?\d{5})$/,
      'Docket number must be in the format YY-NNNNN or YYNNNNN with digits only.'
    ),
  appeallant: yup
    .string()
    .matches(
      nameRegex,
      'Only letters, single spaces, and single periods allowed'
    )
    .required('This field is required to save PDF'),
  dateSignedAppeallant: yup
    .string()
    .required('This field is required to save PDF'),
  phone: yup
    .string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Phone number must be in the format xxx-xxx-xxxx'
    )
    .required('This field is required to save PDF'),
  email: yup
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      'Please enter a valid email address'
    )
    .required('This field is required to save PDF'),
  signature: yup.string().required('This field is required to save PDF'),
});

export const NewClaimFileValidation = yup.object().shape({
  program: yup.string().required('This field is required to save PDF'),
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  claim: yup.string().required('This field is required to save PDF'),
  currentVa: vaFileNumberValidation,
  birthday: yup.string().required('This field is required to save PDF'),
  serviceNumber: serviceNumberValidationAlt,
  bddDate: yup.string(),
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  street: validStreetCharacters.required('This field is required to save PDF'),
  unitNumber: unitNumberValidation,
  city: yup
    .string()
    .matches(cityRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true,
    })
    .required('This field is required to save PDF'),
  province: yup.string().required('This field is required to save PDF'),
  country: yup.string().required('This field is required to save PDF'),
  zipCode: zipCodeValidation,
  email: emailValidation,
  typeAddressChange: yup.string().default(''),
  newAddressstreet: yup.string().when('typeAddressChange', {
    is: (value) => value === 'Permanent' || value === 'Temporary',
    then: (schema) =>
      schema
        .matches(streetRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true,
        })
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  newAddressunitNumber: unitNumberValidation,
  newAddresscity: yup.string().when('typeAddressChange', {
    is: (value) => value === 'Permanent' || value === 'Temporary',
    then: (schema) =>
      schema
        .matches(cityRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true,
        })
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  newAddressprovince: yup.string().when('typeAddressChange', {
    is: (value) => value === 'Permanent' || value === 'Temporary',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  newAddresscountry: yup.string().when('typeAddressChange', {
    is: (value) => value === 'Permanent' || value === 'Temporary',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  newAddresszipCode: yup
    .string()
    .when('typeAddressChange', {
      is: (value) => value === 'Permanent' || value === 'Temporary',
      then: (schema) => schema.required('This field is required to save PDF'),
      otherwise: (schema) => schema.notRequired(),
    })
    .matches(
      /^\d{5}(-\d{4})?$/,
      'Zip Code must be in the format XXXXX or XXXXX-XXXX'
    ),
  newAddressEffectiveBeginning: yup.string().when('typeAddressChange', {
    is: (value) => value === 'Permanent' || value === 'Temporary',
    then: (schema) => schema.required('This field is required.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  newAddressEffectiveEnding: yup.string().when('typeAddressChange', {
    is: (value) => value === 'Permanent' || value === 'Temporary',
    then: (schema) => schema.required('This field is required.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  currentlyHomeless: yup
    .string()
    .required('This field is required to save PDF'),
  currentlyHomelesslivingSituation: yup.string().when('currentlyHomeless', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  currentlyHomelessspecify: yup
    .string()
    .when(
      ['currentlyHomeless', 'currentlyHomelesslivingSituation'],
      ([currentlyHomeless, currentlyHomelesslivingSituation], schema) => {
        if (
          currentlyHomeless === 'Yes' &&
          currentlyHomelesslivingSituation === 'Other'
        ) {
          return schema.required('This field is required to save PDF');
        }
        return schema.notRequired();
      }
    ),
  riskOfHomeless: yup.string().when('currentlyHomeless', {
    is: (value) => value === 'No',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  riskOfHomelesslivingSituation: yup.string().when('riskOfHomeless', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  riskOfHomelessspecify: yup
    .string()
    .when(
      ['riskOfHomeless', 'riskOfHomelesslivingSituation'],
      ([riskOfHomeless, riskOfHomelesslivingSituation], schema) => {
        if (
          riskOfHomeless === 'Yes' &&
          riskOfHomelesslivingSituation == 'Other'
        ) {
          return schema.required('This field is required to save PDF');
        }
        return schema.notRequired();
      }
    ),
  pointOfContactName: yup
    .string()
    .matches(nameRegex, 'Name can only contain letters')
    .min(2, 'Name must be at least 2 characters'),
  toxicExposures: yup.string().required('This field is required to save PDF'),
  hazardLocation: yup.string(),
  hazardLocationDateFrom: yup.string(),
  hazardLocationDateTo: yup.string(),
  herbicideLocation: yup.string(),
  herbicideLocationDateFrom: yup.string(),
  herbicideLocationDateTo: yup.string(),
  herbicideLocationList: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  haveExposed_Asbestos: yup.boolean(),
  haveExposed_MustardGas: yup.boolean(),
  haveExposed_Radiation: yup.boolean(),
  haveExposed_SHAD: yup.boolean(),
  haveExposed_MOSRelatedToxin: yup.boolean(),
  haveExposed_ContaminatedWater: yup.boolean(),
  haveExposed_Other: yup.boolean(),
  haveExposed_OtherSpecify: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  haveExposed_multipleTimes: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  haveExposed_dateFrom: yup.string(),
  haveExposed_dateTo: yup.string(),
  disabilities: yup.array().of(
    yup.object().shape({
      currentDisability: yup
        .string()
        .matches(disabilityRegex, {
          message: 'Enter as: Disability Code: Description (e.g., 1212: Acen.)',
          excludeEmptyString: true,
        })
        .required('This is required to save PDF'),
      specifications: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true,
      }),
      explanation: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true,
      }),
      date: yup.string(),
    })
  ),
  treatmentFacilities: yup.array().of(
    yup.object().shape({
      facility: yup
        .string()
        .matches(validCharactersRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true,
        })
        .required('This is required to save PDF'),
      date: yup.string(),
    })
  ),
  anotherName: yup.string().required('This field is required to save PDF'),
  anotherNamenamesList: yup.string().when('anotherName', {
    is: (value) => value === 'Yes',
    then: (schema) =>
      schema
        .matches(validCharactersRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true,
        })
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  branchOfService: yup.string().required('This field is required to save PDF'),
  component: yup.string(),
  recentDatesFrom: yup.string().required('This field is required.'),
  recentDatesTo: yup.string().required('This field is required.'),
  placeOfSeparation: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  combatZone: yup.string(),
  combatZoneDateFrom: yup.string(),
  combatZoneDateTo: yup.string(),
  reservesNationalGuard: yup.string(),
  reservesNationalGuardComponent: yup.string().when('reservesNationalGuard', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  reservesNationalGuardDateFrom: yup.string().when('reservesNationalGuard', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  reservesNationalGuardDateTo: yup.string().when('reservesNationalGuard', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  reservesNationalGuardNameAddressUnit: yup
    .string()
    .when('reservesNationalGuard', {
      is: (value) => value === 'Yes',
      then: (schema) =>
        schema
          .matches(validCharactersRegex, {
            message: 'Must contain valid characters',
            excludeEmptyString: true,
          })
          .required('This field is required to save PDF'),
      otherwise: (schema) => schema.notRequired(),
    }),
  reservesNationalGuardPhoneNumber: yup.string().when('reservesNationalGuard', {
    is: (value) => value === 'Yes',
    then: (schema) =>
      schema
        .matches(
          /^\d{3}-\d{3}-\d{4}$/,
          'Phone number must be in the format xxx-xxx-xxxx'
        )
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  reservesNationalGuardTrainingPay: yup.string().when('reservesNationalGuard', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  federalsOrders: yup.string(),
  federalsOrdersActivationDate: yup.string().when('federalsOrders', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  federalsOrdersSeparationDate: yup.string().when('federalsOrders', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  prisionerOfWar: yup.string(),
  prisionerOfWarOneDateFrom: yup.string().when('prisionerOfWar', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  prisionerOfWarOneDateTo: yup.string().when('prisionerOfWar', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  prisionerOfWarTwoDateFrom: yup.string(),
  prisionerOfWarTwoDateTo: yup.string(),
  retiredPay: yup.string(),
  retiredPayFuture: yup.string(),
  retiredPayExplanation: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  retiredPayBranchOfService: yup
    .string()
    .when(['retiredPay', 'retiredPayFuture'], {
      is: (retiredPay, retiredPayFuture) =>
        retiredPay === 'Yes' || retiredPayFuture === 'Yes',
      then: (schema) => schema.required('This field is required to save PDF'),
      otherwise: (schema) => schema.notRequired(),
    }),
  retiredPayMonthlyAmount: yup
    .string()
    .when(['retiredPay', 'retiredPayFuture'], {
      is: (retiredPay, retiredPayFuture) =>
        retiredPay === 'Yes' || retiredPayFuture === 'Yes',
      then: (schema) =>
        schema
          .matches(/^\d+$/, {
            message: 'Amount must contain only digits',
            excludeEmptyString: true,
          })
          .required('This field is required to save PDF'),
      otherwise: (schema) => schema.notRequired(),
    }),
  retiredPayRetiredStatus: yup
    .string()
    .when(['retiredPay', 'retiredPayFuture'], {
      is: (retiredPay, retiredPayFuture) =>
        retiredPay === 'Yes' || retiredPayFuture === 'Yes',
      then: (schema) => schema.required('This field is required to save PDF'),
      otherwise: (schema) => schema.notRequired(),
    }),
  separationPay: yup.string(),
  separationPayPaymentDate: yup.string().when('separationPay', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  separationPayBranchOfService: yup.string().when('separationPay', {
    is: (value) => value === 'Yes',
    then: (schema) => schema.required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  separationPayAmountReceived: yup.string().when('separationPay', {
    is: (value) => value === 'Yes',
    then: (schema) =>
      schema
        .matches(/^\d+$/, {
          message: 'Amount must contain only digits',
          excludeEmptyString: true,
        })
        .required('This field is required to save PDF'),
    otherwise: (schema) => schema.notRequired(),
  }),
  veteranDateSigned: yup
    .string()
    .required('This field is required to save PDF'),
  pointOfContactTelephone: phoneValidation,
  pointOfContactTelephoneI: internationalPhoneValidation,
  directDepositAccountType: yup.string(),
  directDepositRoutingNumber: yup
    .string()
    .matches(/^\d{9}$/, 'Routing Number must be exactly 9 digits'),
  directDepositAccountNumber: yup
    .string()
    .matches(/^\d{15}$/, 'Account Number must be exactly 15 digits'),
  directDepositFinancialInstitution: yup
    .string()
    .matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true,
    }),
  signature: yup.string(),
  firstWitness: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  secondWitness: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true,
  }),
  alternateSignatureDate: yup.string(),
  poaSignatureDate: yup.string(),
});


export const RequestCFileValidation = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation,
  signature: yup.string().required('This field is required to save PDF'),
  alien: yup.string().matches(/^A?\d{1,10}$/, {
    message: 'Invalid Alien number format',
    excludeEmptyString: true
  }),
  birthday: yup.string().required('This field is required to save PDF'),
  placeBirth: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  street: validStreetCharacters,
  unitNumber: unitNumberValidation,
  insuranceNumber: yup.string().matches(/^\d+$/, 'Only numbers are allowed'),
  city: yup.string().required('This field is required to save PDF').matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  province: yup.string().required('This field is required to save PDF').matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  country: yup.string().required('This field is required to save PDF'),
  zipCode: zipCodeValidation,
  phone: phoneValidation.required('This field is required to save PDF'),
  phoneTwo: phoneValidation,
  phoneITwo: internationalPhoneValidation,
  phoneI: internationalPhoneValidation,
  faxTwo: yup.string().matches(/^\d{10}$/, 'Fax number must be in 10 digits'),
  faxITwo: yup.string().matches(/^\d+$/, 'Fax number must contain only digits'),
  fax: yup.string().matches(/^\d{10}$/, 'Fax number must be in 10 digits'),
  faxI: yup.string().matches(/^\d+$/, 'Fax number must contain only digits'),
  email: emailValidation,
 
  firstNameTwo: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed'),
  lastNameTwo: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed'),
  organization: containValidCharacters,
  streetTwo: validStreetCharacters,
  unitNumberTwo: unitNumberValidation,
  cityTwo: yup.string().matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  provinceTwo: containValidCharacters,
  countryTwo: containValidCharacters,
  zipCodeTwo: yup.string().matches(/^\d{5}(-\d{4})?$/, 'Zip Code must be in the format XXXXX or XXXXX-XXXX'),
  firstNameThree: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed'),
  lastNameThree: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed'),
  ssnThree: yup.string().matches(/^\d{9}$/, 'Social Security Number must be exactly 9 digits'),
  alienThree: yup.string().matches(/^A?\d{1,10}$/, {
    message: 'Invalid Alien number format',
    excludeEmptyString: true
  }),
  currentVaThree: yup.string().matches(/^\d{8,9}[A-Z]?$/, 'Invalid VA File Number format'),
  typeOfRecords: yup
    .object()
    .shape({
      claimsFile: yup.bool(),
      serviceTreatment: yup.bool(),
      ddForm214: yup.bool(),
      disabilityExaminations: yup.bool(),
      pensionBenefit: yup.bool(),
      humanResourceRecords: yup.bool(),
      lifeInsuranceBenefitRecords: yup.bool(),
      lifeInsuranceRecords: yup.bool(),
      homeLoanBenefitRecords: yup.bool(),
      vocationalRehabilitationRecords: yup.bool(),
      fiduciaryServicesRecords: yup.bool(),
      militaryToCivilianTransition: yup.bool(),
      educationBenefitRecords: yup.bool(),
      financialRecords: yup.bool(),
      other: yup.object().shape({
        value: yup.bool(),
        specify: containValidCharacters,
      }),
    })
    .test('is-valid', 'Select at least one option.', value => {
      const {
        claimsFile,
        serviceTreatment,
        ddForm214,
        disabilityExaminations,
        pensionBenefit,
        humanResourceRecords,
        lifeInsuranceBenefitRecords,
        lifeInsuranceRecords,
        homeLoanBenefitRecords,
        vocationalRehabilitationRecords,
        fiduciaryServicesRecords,
        militaryToCivilianTransition,
        educationBenefitRecords,
        financialRecords,
        other,
      } = value;
      return (
        claimsFile ||
        serviceTreatment ||
        ddForm214 ||
        disabilityExaminations ||
        pensionBenefit ||
        humanResourceRecords ||
        lifeInsuranceBenefitRecords ||
        lifeInsuranceRecords ||
        homeLoanBenefitRecords ||
        vocationalRehabilitationRecords ||
        fiduciaryServicesRecords ||
        militaryToCivilianTransition ||
        educationBenefitRecords ||
        financialRecords ||
        other?.value
      );
    }),
  ssnWillingnessToPay: yup.string().matches(/^\d{9}$/, 'Social Security Number must be exactly 9 digits'),
  remarks: remarkValidation,
  amount: yup.string().when('checkApplicableFees', {
    is: (arr) => arr?.[0]?.isSelected === true, 
    then: () =>
      yup
        .string()
        .matches(/^\d{1,4}$/, 'Digit only')
        .required('This field is required to save PDF'),
    otherwise: () => yup.string(),
  }),
  feeWaiver: yup.string().when('checkFeeWaiver', {
    is: (arr) => arr?.[0]?.isSelected === true, 
    then: () =>
      yup
        .string()
        .matches(validCharactersRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true,
        })
        .required('This field is required to save PDF'),
    otherwise: () => yup.string(),
  }),
  dateSignedOne: yup.string().required('This field is required to save PDF'),
 


})

export const SupplementalClaimValidationSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation,
  birthday:  yup.string().required('This field is required to save PDF'),
  serviceNumber: serviceNumberValidationAlt,
  insuranceNumber: yup.string().matches(/^\d+$/, 'Only numbers are allowed'),
  claimantsName: yup
    .string()
    .required('Claimant\'s first name is required')
    .matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'Claimant\'s name must be at least 2 characters'),
  claimantsLastName: yup
    .string()
    .required('Claimant\'s last first name is required')
    .matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'Claimant\'s last name must be at least 2 characters'),
  claimantsRelationship: yup.string().required('This field is required to save PDF'),
  claimantsRelationshipOther: yup.string().when('claimantsRelationship', {
    is: 'Other',
    then: schema => schema.required('This field is required to save PDF').matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }),
    otherwise: schema => schema.notRequired(),
  }),
  street: validStreetCharacters,
  unitNumber: unitNumberValidation,
  city: yup.string().required('This field is required to save PDF').matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  province: yup.string().required('This field is required to save PDF').matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  country: yup.string(),
  zipCode: zipCodeValidation,
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: emailValidation,
  benefitType: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }).required('This field is required to save PDF'),
  issues: yup.array().of(
    yup.object().shape({
      specificIssue: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }).required('This field is required to save PDF'),
      date: yup.string(),
    }),
  ),
  federalRecords: yup.array().of(
    yup.object().shape({
      facilityName: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }).required('This field is required to save PDF'),
      dateOfRecords: yup.string(),
    }),
  ),
  noticeAcknowledgement: yup.string(),
  dic: yup.bool(),
  veteranDateSigned: yup.string().required('This field is required to save PDF'),
  vaAuthorizedRepresentative: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  veteranDateSignedAS: yup.string(),
  alternateSignerName: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  signature: yup.string().required('Add your signature on profile section'),
});

export const HigherLevelReviewValidationSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation,
  serviceNumber: serviceNumberValidationAlt,
  birthday: yup.string().required('This field is required to save PDF'),
  street: validStreetCharacters.required('This field is required to save PDF'),
  unitNumber: unitNumberValidation,
  insuranceNumber: yup.string()
    .matches(/^\d+$/, 'Only numbers are allowed'),
  city: yup.string().matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }).required('This field is required to save PDF'),
  province: yup.string().required('This field is required to save PDF'),
  country: yup.string().required('This field is required to save PDF'),
  zipCode: zipCodeValidation,
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: emailValidation,
  claimantsName: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'First name must be at least 2 characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsLastName: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'Last name must be at least 2 characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsSsn: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(/^\d{9}$/, 'Social Security Number must be exactly 9 digits').test('valid-ssn', 'Invalid Social Security Number', value => {
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
    otherwise: schema => schema.notRequired(),
  }),
  claimantsBirthday: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsStreet: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(streetRegex, 'Must contain valid characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsUnitNumber: yup.string().when('vet', {
    is: true,
    then: schema => schema.matches(unitNumberRegex, 'Please enter a valid Apt/Unit (e.g. A1, 2B)'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsCity: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(cityRegex, 'Must contain valid characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsProvince: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(validCharactersRegex, 'Must contain valid characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsCountry: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(validCharactersRegex, 'Must contain valid characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsZipCode: yup.string().when('vet', {
    is: true,
    then: schema =>
      schema.matches(
        /^\d{5}(-\d{4})?$/,
        'Zip Code must be in the format XXXXX or XXXXX-XXXX',
      ).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsPhone: yup.string().when('vet', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the format xxx-xxx-xxxx'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsPhoneI: yup.string().when('vet', {
    is: true,
    then: schema => schema.matches(/^\d{1,15}$/, 'Use digit only format (e.g. 1234567890)'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsEmail: yup.string().when('vet', {
    is: true,
    then: schema =>
      schema.email('Invalid email format').max(100, 'Email cannot exceed 100 characters').matches(
       /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please enter a valid email address').required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),

  benefitType: yup.string().required('This field is required to save PDF'),
  informalConferenceContact: yup.string().when('isInformalConference', {
    is: true,
    then: schema => schema.required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),

  rName: yup
    .string()
    .matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'First name must be at least 2 characters'),
  rLastName: yup
    .string()
    .matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'Last name must be at least 2 characters'),
  rPhone: yup
    .string()
    .matches(
    /^\d{3}-\d{3}-\d{4}$/,
    'Phone number must be in the format xxx-xxx-xxxx',
    ),
  rEmail: yup
    .string()
    .email('Invalid email format')
    .max(100, 'Email cannot exceed 100 characters')
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      'Please enter a valid email address'
    ),
  issues: yup.array().of(
    yup.object().shape({
      date: yup.string(),
      specificIssue: yup
        .string()
        .matches(validCharactersRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true
        })
        .required('This field is required to save PDF'),
    }),
  ),
  dateSigned: yup.string().required('This field is required to save PDF'),
  veteranDateSigned: yup
    .string()
    .required('This field is required to save PDF'),
  veteranFirstName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').required('This field is required to save PDF'),
  veteranLastName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').required('This field is required to save PDF'),
  vet: yup.bool(),
  signature: yup.string().required('Add your signature on profile section'),
});

export const BoardAppealValidationSchema = yup.object().shape({
  name: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').required('This field is required to save PDF'),
  fileNumber: vaFileNumberValidation,
  birthday: yup.string().required('This field is required to save PDF'),
  notVetName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed'),
  notVetBirthday: yup.string(),
  street: validStreetCharacters.required('This field is required to save PDF'),
  phone: phoneValidation,
  email: emailValidation,
  rName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed'),
  


  lawJudge: yup.string().required('This field is required to save PDF'),
  hearingType: yup.string().when('lawJudge', {
    is: '10C',
    then: schema => schema.required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  issueDecided: yup.string().required('This field is required to save PDF'),
  issues: yup.array().of(
    yup.object().shape({
      specificIssue: yup
        .string()
        .matches(validCharactersRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true
        })
        .required('This field is required to save PDF'),
      date: yup.string(),
    }),
  ),
  dateSigned: yup.string().required('This field is required to save PDF'),
  signature: yup.string().required('Add your signature on profile section'),
});

export const SupportOfClaimValidationSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation,
  serviceNumber: serviceNumberValidationAlt,
  birthday: yup.string().required('This field is required to save PDF'),
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: emailValidation,
  street: validStreetCharacters.required('This field is required to save PDF'),
  unitNumber: unitNumberValidation,
  city: yup.string().matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }).required('This field is required to save PDF'),
  province: containValidCharacters.required('This field is required to save PDF'),
  country: containValidCharacters.required('This field is required to save PDF'),
  zipCode: zipCodeValidation,
  claimBenefits: containValidCharacters.required('This field is required to save PDF'),
  veteranDateSigned: yup.string().required('This field is required to save PDF'),
  signature: yup.string().required('Add Signature on your Profile'),
});


export const PTSDStressorValidationSchema = yup.object().shape({
  // section I
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation, // optional
  birthday: yup.string().required('This field is required to save PDF'),
  serviceNumber: serviceNumberValidationAlt, // optional

  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: yup.string().max(100, 'Email cannot exceed 100 characters').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Please enter a valid email address'),


  // section II
  incidentDate1: yup.string().required('This field is required to save PDF'),
  dateOfAssignmentFrom1: yup.string().required('This field is required'),
  dateOfAssignmentTo1: yup.string().required('This field is required'),
  incidentLocation1: containValidCharacters.required('This field is required to save PDF'),
  unitAssignmentDuringIncident0: containValidCharacters.required('This field is required to save PDF'),
  descriptionOfIncident1: containValidCharacters.required('This field is required to save PDF'),
  medalReceived1: containValidCharacters.required('This field is required to save PDF'),

  person1FirstName: firstNameValidation,
  person1LastName: lastNameValidation,
  person1Rank: containValidCharacters,
  injuryDate1: yup.string().required('This field is required to save PDF'),
  checkOptions1: yup.string().required('This field is required to save PDF'),
  checkOptionsOther1: yup.string().when('checkOptions1', {
    is: (value) => value === 'Other',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  unitAssignmentDuringIncident1: containValidCharacters.required('This field is required to save PDF'),

  person2FirstName: firstNameValidation,
  person2LastName: lastNameValidation,
  person2Rank: containValidCharacters,
  injuryDate2: yup.string().required('This field is required to save PDF'),
  checkOptions2: yup.string().required('This field is required to save PDF'),
  checkOptionsOther2: yup.string().when('checkOptions2', {
    is: (value) => value === 'Other',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  unitAssignmentDuringIncident2: containValidCharacters.required('This field is required to save PDF'),


  incidentDate2: yup.string(), // optional
  dateOfAssignmentFrom2: yup.string(), // optional
  dateOfAssignmentTo2: yup.string(), // optional
  incidentLocation2: containValidCharacters,
  unitAssignmentDuringIncident3: containValidCharacters,
  descriptionOfIncident2: containValidCharacters,
  medalReceived2: containValidCharacters,


  person3FirstName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').min(2, 'First name must be at least 2 characters'),
  person3LastName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').min(2, 'Last name must be at least 2 characters'),
  person3Rank: containValidCharacters,
  injuryDate3: yup.string(), // optional
  checkOptions3: yup.string(), // optional
  checkOptionsOther3: yup.string().when('checkOptions3', {
    is: (value) => value === 'Other',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  unitAssignmentDuringIncident4: containValidCharacters,
  

  person4FirstName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').min(2, 'First name must be at least 2 characters'),
  person4LastName: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').min(2, 'Last name must be at least 2 characters'),
  person4Rank: containValidCharacters, // optional
  injuryDate4: yup.string(),  
  checkOptions4: yup.string(), 
  checkOptionsOther4: yup.string().when('checkOptions4', {
    is: (value) => value === 'Other',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  unitAssignmentDuringIncident5: containValidCharacters,

  remarks: remarkValidation, // optional
  hasSignature: yup.bool().required('This field is required to save PDF'),
  signature: yup.string().required('This field is required to save PDF'),
  dateSigned: yup.string().required('This field is required to save PDF'),
});

export const MedicalRecordsValidationSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation,
  serviceNumber: serviceNumberValidationAlt,
  birthday: yup.string().required('This field is required to save PDF'),
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: emailValidation,
  street: validStreetCharacters.required('This field is required to save PDF'),
  unitNumber: unitNumberValidation,
  city: yup.string().matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }).required('This field is required to save PDF'),
  province: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }).required('This field is required to save PDF'),
  country: yup.string().required('This field is required to save PDF'),
  zipCode: zipCodeValidation,
  veteranDateSigned: yup
    .string()
    .required('This field is required to save PDF'),
  emailE: yup.bool(),
  isVeteran: yup.bool(),
  claimantsName: yup.string().when('isVeteran', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'First name must be at least 2 characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsLastName: yup.string().when('isVeteran', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(nameRegex, 'Only letters, single spaces, and single periods allowed')
    .min(2, 'Last name must be at least 2 characters'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsSsn: yup.string().when('isVeteran', {
    is: true,
    then: schema => schema.required('This field is required to save PDF').matches(/^\d{9}$/, 'Social Security Number must be exactly 9 digits')
    .min(9, 'Social Security Number must be exactly 9 digits'),
    otherwise: schema => schema.notRequired(),
  }),
  claimantsCurrentVa: vaFileNumberValidation.when('isVeteran', {
    is: true,
    then: schema => schema.matches(/^\d{8,9}[A-Z]?$/, 'Invalid VA File Number format').required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  medicalProvider: yup.array().of(
    yup.object().shape({
      provider: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }).required('This field is required to save PDF'),
      conditions: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }).required('This field is required to save PDF'),
      dateTreatmentFrom: yup.string(),
      dateTreatmentTo: yup.string(),
      medicalStreet: validStreetCharacters.required('This field is required to save PDF'),
      medicalApartment: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }),
      medicalCity: yup.string().matches(cityRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }).required('This field is required to save PDF'),
      medicalState: yup.string().matches(validCharactersRegex, {
        message: 'Must contain valid characters',
        excludeEmptyString: true
      }).required('This field is required to save PDF'),
      medicalCountry: yup
        .string().matches(validCharactersRegex, {
          message: 'Must contain valid characters',
          excludeEmptyString: true
        })
        .required('This field is required to save PDF'),
      medicalZipCode: zipCodeValidation,
    }),
  ),
  consent: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  printedName: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  printedLastName: yup.string().matches(validCharactersRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }),
  signature: yup.string().required('Add Signature on your Profile'),
  hasSignature: yup.bool(),
});

export const TDIUFormValidationSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  ssn: ssnValidation,
  currentVa: vaFileNumberValidation,
  serviceNumber: serviceNumberValidationAlt,
  birthday: yup.string().required('This field is required to save PDF'),
  street: validStreetCharacters,
  unitNumber: unitNumberValidation,
  city: yup.string().matches(cityRegex, {
    message: 'Must contain valid characters',
    excludeEmptyString: true
  }).required('This field is required to save PDF'),
  province: yup.string().required('This field is required to save PDF').matches(
    validCharactersRegex,
    'Must contain valid characters'
  ),
  country: yup.string().required('This field is required to save PDF'),
  zipCode: zipCodeValidation,
  phone: phoneValidation,
  phoneI: internationalPhoneValidation,
  email: emailValidation,
  emailE: yup.bool(),
  gainfulOccupation: yup
    .string()
    .matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    })
    .required('This field is required to save PDF'),
  doctorCare: yup.string(),
  dateTreatmentFrom: yup.string(),
  dateTreatmentTo: yup.string(),
  nameAddressDoctors: yup.string().matches(nameRegex, 'Only letters, single spaces, and single periods allowed').min(2, 'First name must be at least 2 characters'),
  nameAddressHospital: containValidCharacters,
  dateHospitalizationFrom: yup.string(),
  dateHospitalizationTo: yup.string(),
  dateFullTimeEmployment: yup.string().required('This field is required to save PDF'),
  dateFullTimeWorked: yup.string().required('This field is required to save PDF'),
  dateDisabledWork: yup.string().required('This field is required to save PDF'),
  amountEarnedYear: yup.string().matches(/^\d{1,10}$/, 'Only digits are allowed'),
  whatYear: yup.string().matches(/^\d{1,10}$/, 'Only digits are allowed'),
  occupationDuring: containValidCharacters,
  employmentStatement: yup.array().of(
    yup.object().shape({
      nameAddress: containValidCharacters.required('This field is required to save PDF'),
      typeWork: containValidCharacters.required('This field is required to save PDF'),
      hoursPerWeek: yup.string()
        .matches(/^\d{1,3}$/, 'Only digits are allowed')
        .test('hours-range', 'Hours per week must be between 0 and 168', function(value) {
          if (!value) return true; // Let required handle empty values
          const hours = parseInt(value, 10);
          return hours >= 0 && hours <= 168;
        })
        .required('This field is required to save PDF'),
      dateEmploymentFrom: yup.string().required('This field is required'),
      dateEmploymentTo: yup.string().required('This field is required'),
      timeLostIllness: yup.string().matches(/^\d{1,3}$/, 'Only digits are allowed').required('This field is required to save PDF'),
      amountGross: yup.string().matches(/^\d{1,6}$/, 'Only digits are allowed').required('This field is required to save PDF'),
    }),
  ).notRequired(),
  disabilityMilitary: yup.string(),
  disabilityJobSelf: yup.string(),
  amountTotal12Months: yup.string().matches(/^\d{1,10}$/, 'Only digits are allowed'),
  amountTotalMonthly: yup.string().matches(/^\d{1,10}$/, 'Only digits are allowed'),
  disabilityReceiveExpect: yup.string(),
  workersReceiveExpect: yup.string(),
  disabledWork: yup.string(),

  employerNameAddress1: yup.string().when('disabledWork', {
    is: 'Yes',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }), 
  typeOfWork1: yup.string().when('disabledWork', {
    is: 'Yes',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  dateApplied1: yup.string().when('disabledWork', {
    is: 'Yes',
    then: schema => schema.required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  employerNameAddress2: containValidCharacters, 
  typeOfWork2: containValidCharacters,
  dateApplied2: yup.string(),
  employerNameAddress3: containValidCharacters, 
  typeOfWork3: containValidCharacters,
  dateApplied3: yup.string(),


  education: yup.string().required('This field is required to save PDF'),
  educationDisabledWorkOne: yup.string(),

  typeOfTrainingOne: yup.string().when('educationDisabledWorkOne', {
    is: 'Yes',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  dateOfTrainingOneFrom: yup.string().when('educationDisabledWorkOne', {
    is: 'Yes',
    then: schema => schema.required('This field is required'),
    otherwise: schema => schema.notRequired(),
  }),
  dateOfTrainingOneTo: yup.string().when('educationDisabledWorkOne', {
    is: 'Yes',
    then: schema => schema.required('This field is required'),
    otherwise: schema => schema.notRequired(),
  }),

  educationDisabledWorkTwo: yup.string(),
  typeOfTrainingTwo: yup.string().when('educationDisabledWorkTwo', {
    is: 'Yes',
    then: schema => schema.matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }).required('This field is required to save PDF'),
    otherwise: schema => schema.notRequired(),
  }),
  dateOfTrainingTwoFrom: yup.string().when('educationDisabledWorkTwo', {
    is: 'Yes',
    then: schema => schema.required('This field is required'),
    otherwise: schema => schema.notRequired(),
  }),
  dateOfTrainingTwoTo: yup.string().when('educationDisabledWorkTwo', {
    is: 'Yes',
    then: schema => schema.required('This field is required'),
    otherwise: schema => schema.notRequired(),
  }),

  remarks: remarkValidation,

  hasSignature: yup.bool(),
  signature: yup.string(),
  veteranDateSigned: yup
    .string()
    .required('This field is required to save PDF.'),
});

export const BuddyRequestsValidationSchema = yup.object().shape({
    witness_first_name: firstNameValidation,
    witness_last_name: lastNameValidation,
    witness_primary_email: emailValidation,
    message: yup.string().matches(validCharactersRegex, {
      message: 'Must contain valid characters',
      excludeEmptyString: true
    }),
  });
  