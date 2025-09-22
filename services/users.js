import ApiService from '@/utils/apiService';

export const me = () => {
  return ApiService.get(`/users/me`).then((res) => {
    return res;
  });
};

export const updateProfile = (payload) => {
  return ApiService.put(`/users`, payload).then((res) => {
    return res;
  });
};

export const changePassword = (payload) => {
  return ApiService.post(`/users/change-password`, payload).then((res) => {
    return res;
  });
};
