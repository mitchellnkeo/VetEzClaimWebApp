import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { revenueCatManager } from '@/services/subscriptionService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const initializeRevenueCat = createAsyncThunk(
  'revenueCat/initialize',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      // Skip if already initialized
      if (state.revenueCat.isInitialized) {
        return true;
      }
    
      await revenueCatManager.initialize(userId);
      
      // Get initial subscription status
      const status = revenueCatManager.getCurrentStatus();
      console.log('RevenueCat status:', status);
      return {
        isSubscribed: Boolean(status?.isPremium),
      };
    } catch (error) {
      console.error('RevenueCat initialization failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutRevenueCat = createAsyncThunk(
  'revenueCat/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      await revenueCatManager.logout();
    }
    catch (error) {
      console.error('RevenueCat logout failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubscriptionStatus = createAsyncThunk(
  'revenueCat/updateSubscriptionStatus',
  async (uidAndCurrentStatus, { rejectWithValue }) => {
    console.log('>> updateSubscriptionStatus:', uidAndCurrentStatus);
    const { uid, currentStatus } = uidAndCurrentStatus;
    try {
      const docRef = doc(db, 'profile', uid);
      await updateDoc(docRef, {subscriptionStatus: currentStatus});
      const isSubscribed = currentStatus === 'true' ? true : false;
      return isSubscribed;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

const revenueCatSlice = createSlice({
  name: 'revenueCat',
  initialState: {
    isInitialized: false,
    isSubscribed: false,
    error: null,
  },
  reducers: {
    resetRevenueCatState: (state) => {
      state.isInitialized = false;
      state.isSubscribed = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeRevenueCat.fulfilled, (state, action) => {
        console.log('>> initializeRevenueCat.fulfilled:', action.payload.isSubscribed);
        state.isInitialized = true;
        state.isSubscribed = action.payload.isSubscribed || false;
        state.error = null;
      })
      .addCase(initializeRevenueCat.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutRevenueCat.fulfilled, (state, action) => {
        state.isInitialized = false;
        state.isSubscribed = false;
        state.error = null;
      })
      .addCase(updateSubscriptionStatus.fulfilled, (state, action) => {
        state.isSubscribed = action.payload;
        state.error = null;
      })
      .addCase(updateSubscriptionStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export const { resetRevenueCatState } = revenueCatSlice.actions;
export default revenueCatSlice.reducer;
