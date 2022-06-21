import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/post/Post'

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
