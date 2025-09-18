import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { revenueCatManager } from '@/services/subscriptionService';

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
    updateSubscriptionStatus: (state, action) => {
      state.isSubscribed = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeRevenueCat.fulfilled, (state, action) => {
        console.log('>> initializeRevenueCat.fulfilled:', action.payload);
        state.isInitialized = true;
        state.isSubscribed = action.payload;
        state.error = null;
      })
      .addCase(initializeRevenueCat.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutRevenueCat.fulfilled, (state, action) => {
        state.isInitialized = false;
        state.isSubscribed = false;
        state.error = null;
      });
  },
});

export const { resetRevenueCatState, updateSubscriptionStatus } = revenueCatSlice.actions;
export default revenueCatSlice.reducer;
