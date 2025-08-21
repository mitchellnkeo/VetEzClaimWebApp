import ApiService from '@/utils/apiService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const list = createAsyncThunk(
  '/profile/list',
  async (payload, { rejectWithValue }) => {
    const { page, pageSize, search, searchDate } = payload;
    // const searchParam = search ? `&q=${search}` : '';
    // const searchByDate = searchDate ? `&date=${searchDate}` : '';
    try {
      return ApiService.get(
        `/profiles/?limit=${pageSize}&page=${page - 1}`
      ).then((res) => {
        return res;
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const remove = createAsyncThunk(
  '/category/remove',
  async (payload, { rejectWithValue }) => {
    try {
      return ApiService.delete(`/category/${payload.id}`).then((res) => {
        return res;
      });
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const selectByID = createAsyncThunk(
  '/category/selectByID',
  async (payload, { rejectWithValue }) => {
    try {
      return ApiService.get(`/category/${payload}`).then((res) => {
        return res;
      });
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: [],
    singleData: [],
    isLoading: false,
    error: {},
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    getSingleData: (state, action) => {
      const id = action.payload;
      const existingData = state.data.find((item) => item.id === id);
      // state.singleData = existingData
    },
  },
  extraReducers: (builder) => {
    // List
    builder.addCase(list.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(list.fulfilled, (state, action) => {
      state.data = action.payload.data.rows;
      state.isLoading = false;
      state.error = {};
    });
    builder.addCase(list.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Remove
    builder.addCase(remove.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      const id = action.payload.data.id;
      if (id) {
        state.data = state.data.filter((ele) => ele.id !== id);
      }
      state.isLoading = false;
      state.error = {};
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // selectByID
    builder.addCase(selectByID.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(selectByID.fulfilled, (state, action) => {
      state.singleData = action.payload;
      state.isLoading = false;
      state.error = {};
    });
    builder.addCase(selectByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setLoadingStatus, getSingleData } = profileSlice.actions;

export default profileSlice.reducer;
