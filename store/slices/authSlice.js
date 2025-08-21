import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, verifyPortalUser } from '@/services/auth';
import * as usersApi from '@/services/users';
import { seed, deltCookie } from '@/helpers/sessionHelper';
import ApiService from '@/utils/apiService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await login(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyUser = createAsyncThunk(
  'auth/verify-user',
  async (payload, { rejectWithValue }) => {
    try {
      return await verifyPortalUser(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async ({}, thunkAPI) => {
    try {
      return thunkAPI.dispatch(logout());
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const currentUser = createAsyncThunk(
  'users/me',
  async (payload, { rejectWithValue }) => {
    try {
      return await usersApi.me();
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'users/users',
  async (payload, { rejectWithValue }) => {
    try {
      return ApiService.put(
        `/users/${payload?.id}`,
        payload.updatePostBody
      ).then((res) => {
        return res;
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (payload, { rejectWithValue }) => {
    try {
      return ApiService.post(`/users/change-password`, payload).then((res) => {
        return res;
      });
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {},
    accessToken: null,
    isLoading: false,
    error: {},
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.accessToken = null;
      state.isLoggedIn = false;
      deltCookie();
    },
    setUser: (state, action) => {
      state.user = action.payload?.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.accessToken = action.payload?.data?.token;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = {};
      seed(action.payload?.data?.token);
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(currentUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.user = typeof data != 'undefined' ? data : {};
      state.isLoading = false;
      state.error = {};
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.isLoading = false;
    });

    // updateProfile
    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = {};
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Change Password
    builder.addCase(changePassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = {};
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { logout, setUser, setLoadingStatus } = authSlice.actions;

export default authSlice.reducer;
