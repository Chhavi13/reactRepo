import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice'
import icecreameReducer from '../features/icecreame/icecreameSlice'
import userReducer from '../features/users/userSlice'

//const logger = reduxLogger.createLogger()
const store = configureStore({
    reducer:{
        cake:cakeReducer,
        icecreame:icecreameReducer,
        user:userReducer
    },
  //  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})
export default store