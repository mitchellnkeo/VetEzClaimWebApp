// store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    selectedForm: null,
  },
  reducers: {
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    clearSelectedForm: (state) => {
      state.selectedForm = null;
    },
  },
});

export const { setSelectedForm, clearSelectedForm } = formSlice.actions;
export default formSlice.reducer;
