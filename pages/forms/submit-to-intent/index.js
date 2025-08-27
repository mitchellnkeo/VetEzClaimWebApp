import { useState } from 'react';
import FormContent from '@/components/Common/FormContent';
import FrontLayout from '@/components/layouts/FrontLayout';
import { Formik, Form } from 'formik';
import TextInput from '@/components/Common/TextInput';
import { SubmitIntentFileValidation } from '@/utils/validators';
import SectionTitle from '@/components/Common/SectionTitle';
import DateSelectorExtended from '@/components/Common/DateSelectorExtended';
import DropDownExtended from '@/components/Common/DropDownExtended';
import { StateData } from '@/utils/staticData';
import Divider from '@/components/Common/Divider';
import OptionSelector from '@/components/Common/OptionSelector';

const yesNoData = ['Yes', 'No'];
const optionsList = [
  { option: 'Option 1', isSelected: false },
  { option: 'Option 2', isSelected: true },
];

const receivingEmail = [
  {
    option:
      'I agree to receive electronic correspondence from VA in regards to my claim',
    isSelected: false,
  },
];

const dicOption = [
  {
    option:
      'Survivors pension and/or dependency and indemnity compensation (DIC)',
    isSelected: false,
  },
];

export default function SubmitToIntentForm() {
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    claim: '',
    currentVa: '',
    birthday: '',
    serviceNumber: '',
    street: '',
    unitNumber: '',
    city: '',
    province: '',
    country: 'US',
    zipCode: '',
    phone: '',
    phoneI: '',
    email: '',
    emailE: receivingEmail,
    claimantsName: '',
    claimantsLastName: '',
    claimantsSsn: '',
    claimantsClaim: '',
    claimantsCurrentVa: '',
    claimantsRelationship: '',
    claimantOther: '',
    claimantsBirthday: '',
    claimantsStreet: '',
    claimantsUnitNumber: '',
    claimantsCity: '',
    claimantsProvince: '',
    claimantsCountry: 'US',
    claimantsZipCode: '',
    claimantsPhone: '',
    claimantsPhoneI: '',
    claimantsEmail: '',
    claimantsEmailE: false,
    dic: dicOption,
    veteranDateSigned: '',
    benefitElection: [
      {
        name: 'COMPENSATION',
        selected: false,
      },
      {
        name: 'PENSION',
        selected: false,
      },
    ],
    vet: false,
    signature: '',
  });

  return (
    <FrontLayout title="Submit To Intent">
      <FormContent
        title="Submit To Intent"
        onViewDetails={() => console.log('View Details')}
        onSave={() => console.log('Save')}
        onReview={() => console.log('Review PDF')}
        onSubmit={() => console.log('Submit')}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={SubmitIntentFileValidation}
          onSubmit={(values) => {
            console.log('values >> ', values);
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <SectionTitle title="Section I: Veteran's Identification Information" />
              <TextInput
                label="Veteran's First Name"
                name="firstName"
                placeholder="Enter first name"
                fieldCounter="(1 of 21)"
                limit={18}
              />
              <TextInput
                label="Veteran's Last Name"
                name="lastName"
                placeholder="Enter last name"
                fieldCounter="(1-2 of 21)"
                limit={12}
              />
              <TextInput
                label="Social Security Number"
                name="ssn"
                placeholder="Enter ssn"
                fieldCounter="(2 of 21)"
                limit={9}
              />
              <DropDownExtended
                label="Has the Veteran Ever Filed a Claim With VA?"
                hintsMessage="If 'YES', Complete Item 4"
                name="claim"
                data={yesNoData}
                hasCounter={true}
                fieldCounter="(3 of 21)"
              />
              <TextInput
                label="VA File Number"
                name="currentVa"
                placeholder="Enter va file number"
                fieldCounter="(4 of 21)"
                limit={9}
                hasCounter
              />
              <DateSelectorExtended
                label="Date of Birth"
                name="birthday"
                value={values.birthday}
                placeholder="Select Date"
                onChange={(val) => setFieldValue('birthday', val)}
                isDOB
                fieldCounter="(5 of 21)"
              />
              <TextInput
                label="Veteran's Service Number"
                name="serviceNumber"
                placeholder="Enter service number"
                fieldCounter="(6 of 21)"
                limit={9}
              />
              <Divider title="Mailing Address" />

              <TextInput
                label="No. & Street"
                name="street"
                placeholder="Enter street"
                fieldCounter="(7 of 21)"
                limit={20}
              />
              <TextInput
                label="Apt./Unit Number"
                name="unitNumber"
                placeholder="Enter apt/unit number"
                fieldCounter="(7-2 of 21)"
                limit={5}
              />
              <TextInput
                label="City"
                name="city"
                placeholder="Enter city"
                fieldCounter="(7-3 of 21)"
                limit={18}
              />
              <DropDownExtended
                label="State/Province"
                name="province"
                data={StateData}
                hasCounter={true}
                fieldCounter="(7-4 of 21)"
              />
              <TextInput
                label="Country"
                name="country"
                placeholder="Enter street"
                fieldCounter="(7-5 of 21)"
                limit={2}
                readOnly
              />
              <TextInput
                label="ZIP Code/Postal Code"
                name="zipCode"
                placeholder="Enter zip/postal code"
                fieldCounter="(7-6 of 21)"
                limit={10}
              />
              <Divider title=" Contact" />
              <TextInput
                label="Telephone Number"
                name="phone"
                placeholder="Enter telephone number"
                fieldCounter="(8 of 21)"
                limit={12}
              />
              <TextInput
                label="Enter International Phone Number"
                name="phoneI"
                placeholder="Enter international phone number"
                fieldCounter="(8-2 of 21)"
                limit={15}
                hasCounter
              />

              <TextInput
                label="Email Address"
                name="email"
                placeholder="Enter email"
                fieldCounter="(9 of 21)"
                limit={40}
              />
              <OptionSelector
                name="emailE"
                options={values.emailE}
                multiSelect={true}
                isOtherAllowed={false}
              />
              <SectionTitle title="Section II: Claimant's Identification Information" />
              <SectionTitle
                title="Section III: General Benefit Election"
                subtitle="IMPORTANT: VA may not be
            able to use this form to establish an effective date for benefits if
            you do not select one or more of the general benefits listed below"
              />

              <OptionSelector
                label="Note: Only check the box below if you are a surviving dependent of the veteran."
                name="selections"
                options={values.dic}
                multiSelect={true}
                isOtherAllowed={false}
              />

              <SectionTitle title="Section IV: Declartion Of Intent And Signature" />
            </Form>
          )}
        </Formik>
      </FormContent>
    </FrontLayout>
  );
}

/* 
<TextInput
                label=""
                name=""
                placeholder="Enter "
                fieldCounter="(of 21)"
                limit={}
              />

*/
