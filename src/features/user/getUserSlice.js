import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    loading:false,
    users:[],
    error:''
}

export const getAllUser = createAsyncThunk('user/getAllUser', async (token, { rejectWithValue }) => {
    try {
        
       
        let res = await axios.get('https://jsonplaceholder.typicode.com/photos', {
        
          } )
          //debugger
          console.log("details",res)
        // let userDetail = res.data
        // console.log("userdetails",userDetail)
        // userDetail.map((user)=>user.id)
        // return userDetail;
    } catch (error) {

        console.log("error",error)
       return rejectWithValue(error)
    }

})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(getAllUser.fulfilled,(state,action)=>{
            state.loading=false
            state.users= action.payload
            state.error=''

        })
        builder.addCase(getAllUser.rejected,(state,action)=>{
            state.loading=false
            state.users= []
            state.error= action.error.message
        })
    }
})
export default userSlice.reducer
