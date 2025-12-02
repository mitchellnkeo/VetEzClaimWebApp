// buddyStatementThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '@/utils/apiService';

export const sendDocToWitness = createAsyncThunk(
  'buddyStatement/sendDocToWitness',
  async (values, thunkAPI) => {
    process.env.NODE_ENV === 'development' &&
      console.log('Here values >> ', values);

    return ApiService.post(`/buddy-statement/send-doc-to-wetness`, values, {
      noAuth: true,
    }).then((response) => {
      process.env.NODE_ENV === 'development' &&
        console.log('Here response >> ', response);
      return response.data;
    });
  }
);

export const sendMessageToWitness = createAsyncThunk(
  'buddyStatement/sendMessageToWitness',
  async (values, thunkAPI) => {
    try {
      const response = await ApiService.post(
        '/buddy-statement/send-doc-to-wetness',
        values,
        { noAuth: true }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to send message to witness.'
      );
    }
  }
);
