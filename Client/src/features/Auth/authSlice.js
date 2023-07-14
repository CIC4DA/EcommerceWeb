import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,logInUser,signOut,checkAuth, resetPasswordRequest, resetPassword,resetPasswordRequestUser, resetPasswordUser} from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUserToken : null,
  status: 'idle',
  error : null,
  userChecked : false,
  resetPasswordUser: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const logInUserAsync = createAsyncThunk(
  'user/logInUser',
  async (signinuserData, {rejectWithValue}) => {
    try {
      const response = await logInUser(signinuserData);
      return response.data;      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    return response.data;
  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async (data, {rejectWithValue}) => {
    try {
      const response = await checkAuth(data);
      return response.data;      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email, {rejectWithValue}) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data, {rejectWithValue}) => {
    try {
      const response = await resetPassword(data);
      return response.data;      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const resetPasswordRequestUserAsync = createAsyncThunk(
  'user/resetPasswordRequestUser',
  async (email, {rejectWithValue}) => {
    try {
      const response = await resetPasswordRequestUser(email);
      return response.data;      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
export const resetPasswordUserAsync = createAsyncThunk(
  'user/resetPasswordUser',
  async (data, {rejectWithValue}) => {
    try {
      const response = await resetPasswordUser(data);
      return response.data;      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const authSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetPasswordLink = action.payload;
      })
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError= (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
