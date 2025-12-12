import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  deleteUser,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInAnonymously,
} from 'firebase/auth';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db, provider } from '@/firebase/firebase';
import { sendOtp, verifyOtp } from '@/services/auth';
import { seed, deltCookie } from '@/helpers/sessionHelper';
import { signInWithPopup, signOut } from 'firebase/auth';

export const loginAnnonymousUser = createAsyncThunk(
  "auth/loginAnnonymousUser",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInAnonymously(auth);
      const uid = result.user.uid;
      localStorage.setItem('anonymousUid', uid);
      // console.log("[loginAnnonymousUser] uid >>>", uid,);
      return uid;
    } catch (error) {
      return rejectWithValue(error.message || "Anonymous login failed");
    }
  }
);

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
      process.env.NODE_ENV === 'development' &&
        console.log('Login Error : >> ', error);
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

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user) {
        return rejectWithValue('No user found');
      }

      const profileRef = doc(db, 'profile', user.uid);
      const profileSnap = await getDoc(profileRef);
      const profileData = profileSnap.data();
      if (
        profileData?.isDeactivated ||
        (profileData?.deletionDate && profileData.deletionDate.length > 0)
      ) {
        if (profileData.isDeactivated) {
          await signOut(auth);
          return rejectWithValue('Your account is deactivated.');
        } else {
          const delDate = profileData.deletionDate.slice(3, 5);
          const deletionMonth = profileData.deletionDate.slice(0, 2);
          const todaysDate = new Date().getDate().toString();
          const currentMonth = new Date().getMonth() + 1;
          const currentMonthStr =
            currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();

          if (todaysDate === delDate && deletionMonth === currentMonthStr) {
            await deleteDoc(profileRef);
            await user.delete();
            await signOut(auth);
            return rejectWithValue('Invalid email or password.');
          } else {
            await signOut(auth);
            return rejectWithValue('Your account is scheduled for deletion.');
          }
        }
      } else if (!profileData) {
        await deleteDoc(profileRef);
        await user.delete();
        await signOut(auth);
        return rejectWithValue('Register with email and password first.');
      }
      seed(user.uid);
      return {
        uid: user.uid,
        email: user.email,
        profileData: profileData,
        accessToken: user.uid,
      };
    } catch (error) {
      process.env.NODE_ENV === 'development' && console.log('err >> ', error);
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
      } else if (
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/user-cancelled'
      ) {
        errorMsg = `Authentication failed.`;
      } else {
        errorMsg = `Something went wrong.`;
      }

      return rejectWithValue(errorMsg || 'Authentication failed.');
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
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);   
      console.log("current user >>>", auth.currentUser);
      thunkAPI.dispatch(logout());
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/update',
  async (profileData, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'profile', profileData.uid);
      await updateDoc(docRef, { ...profileData });

      return profileData; // this will be used to update state.user
    } catch (error) {
      // process.env.NODE_ENV === 'development' && console.error('error while updating profile', error);
      return rejectWithValue(error.message || 'Profile update failed');
    }
  }
);

export const updateSessionId = createAsyncThunk(
  'auth/updateSessionId ',
  async ({ uid, sessionId }, { rejectWithValue }) => {
    try {
      // console.log("[updateSessionId] uid >>>", uid);
      // console.log("[updateSessionId] sessionId >>>", sessionId);
      const docRef = doc(db, 'profile', uid);
      await updateDoc(docRef, { sessionId: sessionId });

      return sessionId; // this will be used to update state.user
    } catch (error) {
      // process.env.NODE_ENV === 'development' && console.error('error while updating profile', error);
      return rejectWithValue(error.message || 'Session ID update failed');
    }
  }
);

export const updateLocalSessionId = createAsyncThunk(
  'auth/updateLocalSessionId ',
  async (sessionId, { rejectWithValue }) => {
    try {
      localStorage.setItem('chatSessionId', sessionId);
      return sessionId;
    } catch (error) {
      return rejectWithValue(error.message || 'Session ID update failed');
    }
  }
);

export const updateRedirectTo = createAsyncThunk(
  'auth/updateRedirectTo ',
  async (redirectTo, { rejectWithValue }) => {
    try {
      localStorage.setItem('redirectTo', redirectTo);
      return redirectTo;
    } catch (error) {
      return rejectWithValue(error.message || 'Redirect To update failed');
    }
  }
);

export const updateReloadChat = createAsyncThunk(
  'auth/updateReloadChat ',
  async (reloadChat, { rejectWithValue }) => {
    try {
      return reloadChat;
    } catch (error) {
      return rejectWithValue(error.message || 'Reload Chat update failed');
    }
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {},
    uid: null,
    sessionId: null,
    accessToken: null,
    isLoading: false,
    redirectTo: null,
    reloadChat: false,
    error: {},
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      state.uid = null;
      state.sessionId = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.redirectTo = null;
      state.reloadChat = false;
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
      state.sessionId = action.payload.profileData.sessionId;
      state.error = {};
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.sessionId = null;
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

    // google login
    builder.addCase(googleLogin.pending, (state) => {
      state.isLoading = true;
      state.sessionId = null;
      state.error = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
      state.user = action.payload.profileData;
      state.accessToken = action.payload.accessToken;
      state.sessionId = action.payload.profileData.sessionId;
      state.error = null;
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.sessionId = null;
      state.error = action.payload || 'Login failed';
    });

    // update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.sessionId = null;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.sessionId = action.payload.profileData.sessionId;
      state.error = null;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Update failed';
      state.sessionId = null;
    });
    // update session id
    builder.addCase(updateSessionId.pending, (state) => {
      state.isLoading = true;
      state.sessionId = null;
      state.error = null;
    });
    builder.addCase(updateSessionId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sessionId = action.payload;
      state.error = null;
    });
    builder.addCase(updateSessionId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Session ID update failed';
    });
    // update local session id
    builder.addCase(updateLocalSessionId.pending, (state) => {
      state.isLoading = true;
      state.sessionId = null;
      state.error = null;
    });
    builder.addCase(updateLocalSessionId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sessionId = action.payload;
      state.error = null;
    });
    builder.addCase(updateLocalSessionId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Session ID update failed';
    });
    // loginAnnonymousUser
    builder.addCase(loginAnnonymousUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginAnnonymousUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uid = action.payload;
      state.error = null;
    });
    builder.addCase(loginAnnonymousUser.rejected, (state, action) => {
      state.isLoading = false;
      state.uid = null;
      state.error = action.payload;
    });
    // update redirect to
    builder.addCase(updateRedirectTo.pending, (state) => {
      state.isLoading = true;
      state.redirectTo = null;
      state.error = null;
    });
    builder.addCase(updateRedirectTo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.redirectTo = action.payload;
      state.error = null;
    });
    builder.addCase(updateRedirectTo.rejected, (state, action) => {
      state.isLoading = false;
      state.redirectTo = null;
      state.error = 'Redirect To update failed';
    });
    // update reload chat
    builder.addCase(updateReloadChat.pending, (state) => {
      state.isLoading = true;
      state.reloadChat = false;
      state.error = null;
    });
    builder.addCase(updateReloadChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reloadChat = action.payload;
      state.error = null;
    });
    builder.addCase(updateReloadChat.rejected, (state, action) => {
      state.isLoading = false;
      state.reloadChat = false;
      state.error = 'Reload Chat update failed';
    });
  },
});

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      // Re-authenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Now update password
      await updatePassword(user, newPassword);
      return 'Password updated successfully';
    } catch (error) {
      process.env.NODE_ENV === 'development' && console.log('error', error);
      return rejectWithValue({ code: error.code, message: error.message });
    }
  }
);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
