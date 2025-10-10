import axios from 'axios';
import getConfig from 'next/config';
import { getAccessToken } from '@/helpers/sessionHelper';

const { publicRuntimeConfig } = getConfig();

const ApiService = axios.create({
  baseURL: publicRuntimeConfig.baseApiUrl,
});

ApiService.interceptors.request.use(
  async (config) => {
    // Default content type
    config.headers['Content-Type'] = 'application/json';

    // If sending FormData, override content type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    // Add auth if required
    if (!config?.noAuth) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
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
