import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const loginFun = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
    try {
      //  debugger
        let res = await axios.post('http://localhost:5000/users/login', user)
        return res.data;
    } catch (error) {
        //debugger
        // console.log("}}}}}}}}}}",error.response.data)

       return rejectWithValue(error.response.data)
    }

})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // reset: (state) => {
        //     state.isLoading = false
        //     state.isSuccess = false
        //     state.isError = false
        //     state.message = ''
        // }
    },
    extraReducers: 
        (builder)=>{
            builder.addCase(loginFun.pending,(state)=>{
                state.isLoading=true
            })
            builder.addCase(loginFun.fulfilled,(state,action)=>{
                state.isLoading=false
                state.user= action.payload
                state.isSuccess =true
    
            })
            builder.addCase(loginFun.rejected,(state,action)=>{
                state.isLoading=false
                state.isError= true
                state.message =action.payload.message
                state.user =null
            })

    }

})
export default userSlice.reducer
export const { reset } = userSlice.actions