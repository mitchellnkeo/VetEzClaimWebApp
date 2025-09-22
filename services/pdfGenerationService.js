import ApiService from '@/utils/apiService';

export const generatePdfService = async (pdfObject, apiEndpoint) => {
  return ApiService.post(`/docspring/${apiEndpoint}`, pdfObject, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};
