import ApiService from '@/utils/apiService';

export const login = (payload) => {
  return ApiService.post(`/auth/`, payload, { noAuth: true }).then((res) => {
    return res;
  });
};

export const verifyPortalUser = (payload) => {
  return ApiService.post(`/auth/verify-user`, payload, { noAuth: true }).then(
    (res) => {
      return res;
    }
  );
};

export const verifyEmail = (token) => {
  return ApiService.get(`auth/verify-email/${token}`, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};

export const forgotPassword = (payload) => {
  return ApiService.post(`/auth/forgot-password`, payload, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};

export const resetPassword = (payload, token) => {
  return ApiService.post(`/auth/reset-password/${token}`, payload, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};
