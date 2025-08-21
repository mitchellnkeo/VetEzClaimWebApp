import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const TABLE_NAME = {
  profile: 'profile',
  fileappeal: 'fileappeal',
  fillform: 'fillform',
  miscform: 'miscform',
  requestfile: 'requestfile',
  submitclaim: 'submitclaim',
};

export const BaseImageURl = '/';
// export const BaseImageURl = publicRuntimeConfig.cloudFront;
