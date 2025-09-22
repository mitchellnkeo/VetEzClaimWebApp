import ApiService from '@/utils/apiService';

export const practiceAreas = () => {
  return ApiService.get(`/practice-areas`, { noAuth: true }).then((res) => {
    return res;
  });
};

export const scopeOfServices = (provider) => {
  return ApiService.get(`/services`, {
    noAuth: true,
    params: {
      provider,
    },
  }).then((res) => {
    return res;
  });
};

export const states = async () => {
  const res = await ApiService.get(`/countries/states`, {
    noAuth: true,
  });
  return res;
};

export const counties = (stateId) => {
  return ApiService.get(`/countries/counties/${stateId}`, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};

export const cities = (countyId) => {
  return ApiService.get(`/countries/cities/${countyId}`, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};

export const getPdf = (submissionId) => {
  return ApiService.get(`/docspring/pdf/${submissionId}`, {
    noAuth: true,
  }).then((res) => {
    // console.log('res >> ', res);
    return res;
  });
};
