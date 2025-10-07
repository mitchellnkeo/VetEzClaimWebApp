import ApiService from '@/utils/apiService';

export const docsAnalyzerService = async (base64Pdf, uid, instruction) => {
  const formData = {
    uid: uid,
    base64Pdf: base64Pdf,
    instruction: instruction,
  }
  try {
    const response = await ApiService.post('/agent/doc-analyze', formData, {
      noAuth: true,
    });
    return response;
  } catch (error) {
    console.error('Docs Analyzer API Error:', error);
    throw error;
  }
};