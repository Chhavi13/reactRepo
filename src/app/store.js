import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'
import postReducer from '../features/User/getAllPost'
import createPostReducer from '../features/createPostSlice'

const store = configureStore({
  reducer: {
    user:userReducer,
    posts:postReducer,
    createPost:createPostReducer
  },
})

export default store