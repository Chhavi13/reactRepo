import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postReducer from '../features/post/PostSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
// export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
