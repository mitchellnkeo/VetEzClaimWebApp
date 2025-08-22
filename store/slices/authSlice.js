import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';
import { sendOtp, verifyOtp } from '@/services/auth';
import { seed, deltCookie } from '@/helpers/sessionHelper';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const profileRef = doc(db, 'profile', uid);
      const profileSnap = await getDoc(profileRef);
      const profileData = profileSnap.data();

      // Check profile validity
      if (!profileData) {
        throw new Error('Invalid email or password.');
      }

      if (
        profileData.isDeactivated ||
        (profileData.deletionDate && profileData.deletionDate.length > 0)
      ) {
        if (profileData.isDeactivated) {
          throw new Error('Your account is deactivated.');
        } else {
          const delDate = profileData.deletionDate.slice(3, 5);
          const deletionMonth = profileData.deletionDate.slice(0, 2);
          const todaysDate = new Date().getDate().toString();
          const currentMonth = new Date().getMonth() + 1;
          const currentMonthStr =
            currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();

          if (todaysDate === delDate && deletionMonth === currentMonthStr) {
            await deleteDoc(profileRef);
            if (user) await deleteUser(user);
            throw new Error(`Invalid email or password.`);
          } else {
            throw new Error(`Your account is scheduled for deletion.`);
          }
        }
      }
      return { uid, profileData };
    } catch (error) {
      let errorMsg = error.message;
      if (
        error.message === 'Invalid email or password.' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/missing-password'
      ) {
        errorMsg = `Invalid email or password.`;
      } else if (error.code === 'auth/user-disabled') {
        errorMsg = `Your account is disabled.`;
      } else if (error.code === 'auth/network-request-failed') {
        errorMsg = `Check your internet connection.`;
      } else if (error.code === 'auth/user-disabled') {
        errorMsg = `Your account is disabled.`;
      } else {
        errorMsg = `Something went wrong.`;
      }

      return rejectWithValue(errorMsg || 'Login failed');
    }
  }
);

export const sendOtpToUser = createAsyncThunk(
  'auth/send-otp',
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const response = await sendOtp({ id, email });
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to send OTP');
      }
      return {
        id,
        email,
        message: response.message || 'OTP sent successfully',
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to send OTP');
    }
  }
);

export const verifyOtpToUser = createAsyncThunk(
  'auth/verify-user',
  async ({ id, otp }, { rejectWithValue }) => {
    try {
      await verifyOtp({ id, otp });
      seed(id);
      return { accessToken: id };
    } catch (error) {
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return thunkAPI.dispatch(logout());
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {},
    uid: null,
    accessToken: null,
    isLoading: false,
    error: {},
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      state.uid = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      deltCookie();
    },
  },
  extraReducers: (builder) => {
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uid = action.payload.uid;
      state.user = action.payload.profileData;
      state.error = {};
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // verifyUser
    builder.addCase(verifyOtpToUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyOtpToUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.error = {};
    });
    builder.addCase(verifyOtpToUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
