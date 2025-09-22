// store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    selectedForm: null,
    selectedBuddyStatement: null,
  },
  reducers: {
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    clearSelectedForm: (state) => {
      state.selectedForm = null;
    },
    setSelectedBuddyStatement: (state, action) => {
      state.selectedBuddyStatement = action.payload;
    },
    clearSelectedBuddyStatement: (state) => {
      state.selectedBuddyStatement = null;
    },
  },
});

export const { setSelectedForm, clearSelectedForm, setSelectedBuddyStatement, clearSelectedBuddyStatement } = formSlice.actions;
export default formSlice.reducer;
