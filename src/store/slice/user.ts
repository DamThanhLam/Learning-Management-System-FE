import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../model/User'
import { Response } from '../model/Response';
import encryptPassword from '@/utils/rsa';

interface AuthState {
  user: User | null;
  authentication: boolean;
}
const initialState:AuthState = {
  user: null,
  authentication:false
}
export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "account/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: encryptPassword(credentials.password),
        }),
        credentials: "include", // Allows sending cookies from the server
      });

      const result: Response = await response.json();

      if (result.code === 200 ) {
        console.log("Response:", result);
        return result.data;
      } else {
        return thunkAPI.rejectWithValue("Login failed");
      }
    } catch (error: any) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
    }
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state,actions) => {
        state.user = actions.payload
        state.authentication = true
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer