import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review } from "../models/Reviews";
import { BASEURL } from "@/utils/baseUrl";

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    pageSize: number;
    totalReviews: number;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
    currentPage: 1,
    pageSize: 5,
    totalReviews: 0,
}

export const fetchReviews = createAsyncThunk<
    Review[],
    { userId: string; page?: number; pageSize?: number },
    { rejectValue: string }
>(
    'reviews/fetchReviews',
    async (params, thunkAPI) => {
        try {
            const { userId, page = 1, pageSize = 5 } = params;
            let url = BASEURL.BASE_REVIEW_URL;
            const query = new URLSearchParams();
            if (userId) query.set('userId', userId);
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
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
                state.totalReviews = action.payload.length; // Giả sử API trả về tổng số
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch reviews';
            });
    },
})
export const { setCurrentPage, setPageSize } = reviewSlice.actions;

export default reviewSlice.reducer;