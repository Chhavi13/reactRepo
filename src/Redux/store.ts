import { configureStore } from '@reduxjs/toolkit'
import CourseSlice from "./Course/CourseReducer"
import EventSlice from "./Events/EventsReducer";

export const store = configureStore({
  reducer: {
    courseData: CourseSlice,
    events:EventSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch