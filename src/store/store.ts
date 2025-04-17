import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/slice'
import courseSlice from './slices/courseSlice'
import reviewSlice  from './slices/reviewSlice'
import mentorSlice from './slices/mentorSlice'
import profileSlice from './slices/profileSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseSlice,
    review: reviewSlice,
    mentor : mentorSlice,
    profile : profileSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch