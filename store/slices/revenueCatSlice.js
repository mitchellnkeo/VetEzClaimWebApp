import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { revenueCatManager } from '@/services/subscriptionService';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
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
      process.env.NODE_ENV === 'development' &&
        console.log('RevenueCat status:', status);
      return {
        isSubscribed: Boolean(status?.isPremium),
      };
    } catch (error) {
      process.env.NODE_ENV === 'development' &&
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
    } catch (error) {
      process.env.NODE_ENV === 'development' &&
        console.error('RevenueCat logout failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubscriptionStatus = createAsyncThunk(
  'revenueCat/updateSubscriptionStatus',
  async (uidAndCurrentStatus, { rejectWithValue }) => {
    process.env.NODE_ENV === 'development' &&
      console.log('>> updateSubscriptionStatus:', uidAndCurrentStatus);
    const { uid, currentStatus } = uidAndCurrentStatus;
    try {
      const docRef = doc(db, 'profile', uid);
      await updateDoc(docRef, { subscriptionStatus: currentStatus });
      const isSubscribed = currentStatus === 'true' ? true : false;
      return isSubscribed;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

export const getSubscriptionStatus = createAsyncThunk(
  'revenueCat/getSubscriptionStatus',
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'profile', uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return false; // or null if you prefer
      }
      const data = docSnap.data();
      return data ; // data.subscriptionStatus || false;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Subscription status retrieval failed'
      );
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
        process.env.NODE_ENV === 'development' &&
          console.log(
            '>> initializeRevenueCat.fulfilled:',
            action.payload.isSubscribed
          );
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
      .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
        state.isSubscribed = action.payload.subscriptionStatus || false;
        state.error = null;
      })
      .addCase(getSubscriptionStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetRevenueCatState } = revenueCatSlice.actions;
export default revenueCatSlice.reducer;
