import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../models/Course';
import { BASEURL } from '@/utils/BaseURL';


interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  search: string;
  sortBy: 'relevance' | 'newest' | 'topRated' | '';
  currentPage: number;
  pageSize: number;
  totalCourses: number;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  search: '',
  sortBy: '',
  currentPage: 1,
  pageSize: 9,
  totalCourses: 0,
};

export const fetchCourses = createAsyncThunk<
  Course[],
  { category?: string; search?: string; page?: number; pageSize?: number },
  { rejectValue: string }
>(
  'courses/fetchCourses',
  async (params, thunkAPI) => {
    try {
      const { category, search, page = 1, pageSize = 9 } = params;
      let url = BASEURL.BASE_URL_COURSE_SERVICE;
      const query = new URLSearchParams();

      if (category) query.set('category', category);
      if (search) query.set('courseName', search);
      if (page) query.set('page', page.toString());
      if (pageSize) query.set('pageSize', pageSize.toString());
      if (query.toString()) url += `?${query.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });


      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue(result.message || 'Failed to fetch courses');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      console.log("Search:", action.payload);

      state.search = action.payload;
      state.currentPage = 1; // Reset về trang 1 khi tìm kiếm
    },
    setSortBy: (state, action: PayloadAction<'relevance' | 'newest' | 'topRated'>) => {
      console.log("Sort By:", action.payload);
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.totalCourses = action.payload.length; // Giả sử API trả về tổng số
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch courses';
      });
  },
});

export const { setSearch, setSortBy, setCurrentPage } = courseSlice.actions;
export default courseSlice.reducer;