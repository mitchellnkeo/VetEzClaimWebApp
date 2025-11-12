// services/chatbotService.js
import ApiService from '@/utils/apiService';

export const sendChatMessage = async ({ message, userId, sessionId, file }) => {
  if (!message || !userId) {
    throw new Error('message and userId are required');
  }

  const formData = new FormData();
  formData.append('message', message);
  formData.append('userId', userId);
  if (sessionId) formData.append('sessionId', sessionId);
  if (file) formData.append('file', file);

  try {
    const response = await ApiService.post('/chatbot/chat', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      noAuth: true,
    });
    return response;
  } catch (error) {
    console.error('Chatbot API Error:', error);
    throw error;
  }
};

export const getChatMessages = async ({ userId, sessionId }) => {
  if (!userId || !sessionId) {
    throw new Error("userId and sessionId are required-Local");
  }

  try {
    const response = await ApiService.get(`/chatbot/messages/${userId}/${sessionId}`, {
      noAuth: true,
    });
    return response;
  } catch (error) {
    console.error("Chatbot getMessages API Error:", error);
    throw error;
  }
};