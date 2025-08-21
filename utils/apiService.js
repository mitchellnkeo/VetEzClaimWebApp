import axios from 'axios';
import getConfig from 'next/config';
import { getAccessToken } from '@/helpers/sessionHelper';

const { publicRuntimeConfig } = getConfig();

const ApiService = axios.create({
  baseURL: publicRuntimeConfig.baseApiUrl,
});

ApiService.interceptors.request.use(
  async (config) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Timezone'] = timezone;
    if (config.file) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    if (!config?.noAuth) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    return response?.data || {};
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default ApiService;
