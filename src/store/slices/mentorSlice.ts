import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Mentor } from '../models/Mentor';
import { BASEURL } from '@/utils/baseUrl';



interface MentorState {
  mentor: Mentor | null;
  loading: boolean;
  error: string | null;
}

const initialState: MentorState = {
  mentor: null,
  loading: false,
  error: null,
};

export const fetchMentor = createAsyncThunk<
  Mentor,
  string,
  { rejectValue: string }
>(
  'mentor/fetchMentor',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL.BASE_MENTOR_URL}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue(result.message || 'Failed to fetch mentor');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentor.fulfilled, (state, action) => {
        state.loading = false;
        state.mentor = action.payload;
      })
      .addCase(fetchMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch mentor';
      });
  },
});

export default mentorSlice.reducer;