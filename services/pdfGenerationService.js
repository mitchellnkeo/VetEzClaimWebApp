import ApiService from '@/utils/apiService';

export const generateSubmitToIntentFormPdf = async (pdfObject) => {
  return ApiService.post(`/docspring/generate`, pdfObject, {
    noAuth: true,
  }).then((res) => {
    return res;
  });
};
