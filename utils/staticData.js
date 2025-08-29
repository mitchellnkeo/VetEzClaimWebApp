export const StateData = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
    selected: false,
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
    selected: false,
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS',
    selected: false,
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    selected: false,
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
    selected: false,
  },
  {
    name: 'California',
    abbreviation: 'CA',
    selected: false,
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    selected: false,
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
    selected: false,
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
    selected: false,
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
    selected: false,
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
    selected: false,
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
    selected: false,
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    selected: false,
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
    selected: false,
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
    selected: false,
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
    selected: false,
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
    selected: false,
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
    selected: false,
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
    selected: false,
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
    selected: false,
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
    selected: false,
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
    selected: false,
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
    selected: false,
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH',
    selected: false,
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
    selected: false,
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
    selected: false,
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
    selected: false,
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
    selected: false,
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
    selected: false,
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
    selected: false,
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
    selected: false,
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
    selected: false,
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
    selected: false,
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
    selected: false,
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
    selected: false,
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
    selected: false,
  },
  {
    name: 'New York',
    abbreviation: 'NY',
    selected: false,
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    selected: false,
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
    selected: false,
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP',
    selected: false,
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    selected: false,
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
    selected: false,
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
    selected: false,
  },
  {
    name: 'Palau',
    abbreviation: 'PW',
    selected: false,
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    selected: false,
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR',
    selected: false,
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
    selected: false,
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
    selected: false,
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
    selected: false,
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    selected: false,
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
    selected: false,
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
    selected: false,
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
    selected: false,
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
    selected: false,
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
    selected: false,
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
    selected: false,
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
    selected: false,
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
    selected: false,
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
    selected: false,
  },
];

export const branchOfServiceData = [
  'Army',
  'Navy',
  'Marine Corps',
  'Air Force',
  'Coast Guard',
  'Space Force',
  'NOAA',
  'USPHA',
];

export const menuData = [
  {
    id: 'request_cfile',
    title: 'Request C-file/DD 214',
    status: true,
    submenu: [
      {
        id: 'req_cfile_1',
        title: 'Request C-File/DD 214 (Form 20-10206)',
        path: '/forms/request-c-file',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'misc_forms',
    title: 'Sworn Statements and Misc Forms',
    status: true,
    submenu: [
      {
        id: 'misc_1',
        title: 'PTSD Stressor Statement (Form 21-0781)',
        path: '/forms/ptsd-stressor',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'misc_2',
        title: 'Statement in Support of Claim (Form 21-4138)',
        path: '/forms/ptsd-stressor',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'misc_3',
        title: 'Medical Records Release (Form 21-4142)',
        path: '/forms/medical-records',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'misc_3',
        title: 'Increased Rating due to TDIU (Unemployability) (Form 21-8940)',
        path: '/forms/tdiu',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'file_appeal',
    title: 'File An Appeal',
    status: true,
    submenu: [
      {
        id: 'appeal_1',
        title: 'Higher Level Review (Form 20-0995)',
        path: '/forms/higher-level-review',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'appeal_2',
        title: 'Board Appeal (Form 20-0995)',
        path: '/forms/board-appeal',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'appeal_3',
        title: 'Supplemental Claim Appeal',
        path: '/forms/supplemental-claim',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'court_appeal',
    title: 'Court of Appeals for Veterans Claims-File Appeal',
    status: true,
    submenu: [
      {
        id: 'court_1',
        title: 'Notice of Appeal (NOA) & Optional Fee Waiver',
        path: '/forms/noa',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'court_2',
        title: 'Declaration of Financial Hardship (Fee Waiver)',
        path: '/forms/fee-waiver',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
  {
    id: 'submit_claim',
    title: 'Submit a Claim',
    status: true,
    submenu: [
      {
        id: 'claim_1',
        title: 'New Claim or Increase (Form 21-526EZ)',
        path: '/forms/new-claim',
        disabled: false,
        onPress: () => {},
      },
      {
        id: 'claim_2',
        title: 'Supplemental Claim & Reopening (Form 20-0995)',
        path: '/forms/supplemnetal-claim-reopening',
        disabled: false,
        onPress: () => {},
      },
    ],
  },
];
