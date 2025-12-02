import ApiService from '@/utils/apiService';

export const docsAnalyzerService = async (docFile, instructions) => {
  const formData = new FormData();
  formData.append('file', docFile);
  formData.append('instructions', instructions);
  try {
    const response = await ApiService.post('/agent/analyze', formData, {
      noAuth: true,
    });
    return response;
  } catch (error) {
    process.env.NODE_ENV === 'development' &&
      console.error('Docs Analyzer API Error:', error);
    throw error;
  }
};
