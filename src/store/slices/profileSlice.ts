import { BASEURL } from '@/utils/baseUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProfileInfo {
  firstName: string;
  lastName: string;
  headline: string;
  description: string;
  language: string;
}

interface Links {
  website: string;
  x: string;
  linkedin: string;
  youtube: string;
  facebook: string;
}

interface ProfileState {
  profileInfo: ProfileInfo;
  imagePreview: string | null;
  imageLabel: string;
  links: Links;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profileInfo: {
    firstName: '',
    lastName: '',
    headline: '',
    description: '',
    language: '',
  },
  imagePreview: null,
  imageLabel: '',
  links: {
    website: '',
    x: '',
    linkedin: '',
    youtube: '',
    facebook: '',
  },
  loading: false,
  error: null,
};

// Async thunk để lấy dữ liệu hồ sơ từ API
export const fetchProfile = createAsyncThunk<
  { profileInfo: ProfileInfo; imagePreview: string | null; imageLabel: string; links: Links },
  void,
  { rejectValue: string }
>('profile/fetchProfile', async (_, thunkAPI) => {
  try {
    const response = await fetch(BASEURL.BASE_USER_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (result.code === 200) {
      return {
        profileInfo: {
          firstName: result.data.firstName || '',
          lastName: result.data.lastName || '',
          headline: result.data.headline || '',
          description: result.data.description || '',
          language: result.data.language || '',
        },
        imagePreview: result.data.imagePreview || null,
        imageLabel: result.data.imageLabel || '',
        links: {
          website: result.data.links.website || '',
          x: result.data.links.x || '',
          linkedin: result.data.links.linkedin || '',
          youtube: result.data.links.youtube || '',
          facebook: result.data.links.facebook || '',
        },
      };
    } else {
      return thunkAPI.rejectWithValue(result.message || 'Failed to fetch profile');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
  }
});

// Async thunk để lưu dữ liệu hồ sơ
export const saveProfile = createAsyncThunk<
  void,
  { profileInfo: ProfileInfo; imagePreview: string | null; imageLabel: string; links: Links },
  { rejectValue: string }
>('profile/saveProfile', async (profileData, thunkAPI) => {
  try {
    const response = await fetch(BASEURL.BASE_USER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: profileData.profileInfo.firstName,
        lastName: profileData.profileInfo.lastName,
        headline: profileData.profileInfo.headline,
        description: profileData.profileInfo.description,
        language: profileData.profileInfo.language,
        imagePreview: profileData.imagePreview,
        imageLabel: profileData.imageLabel,
        links: {
          website: profileData.links.website,
          x: profileData.links.x,
          linkedin: profileData.links.linkedin,
          youtube: profileData.links.youtube,
          facebook: profileData.links.facebook,
        }
      }),
    });

    const result = await response.json();
    if (result.code === 200) {
      return;
    } else {
      return thunkAPI.rejectWithValue(result.message || 'Failed to save profile');
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
  }
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileInfo: (
      state,
      action: PayloadAction<Partial<ProfileInfo>>
    ) => {
      state.profileInfo = { ...state.profileInfo, ...action.payload };
    },
    setImagePreview: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.imagePreview = action.payload;
    },
    setImageLabel: (
      state,
      action: PayloadAction<string>
    ) => {
      state.imageLabel = action.payload;
    },
    updateLinks: (
      state,
      action: PayloadAction<Partial<Links>>
    ) => {
      state.links = { ...state.links, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileInfo = action.payload.profileInfo;
        state.imagePreview = action.payload.imagePreview;
        state.imageLabel = action.payload.imageLabel;
        state.links = action.payload.links;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save profile';
      });
  },
});

export const { updateProfileInfo, setImagePreview, setImageLabel, updateLinks } =
  profileSlice.actions;
export default profileSlice.reducer;