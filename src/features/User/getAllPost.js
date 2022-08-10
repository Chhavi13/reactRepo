import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    isLoading:false,
    PostData:[],
    isError:false,
    isSuccess:false
}
export const getAllPost = createAsyncThunk('post/getAllPost', async (token, { rejectWithValue }) => {
    try {
       
        let res = await axios.get('http://localhost:5000/posts/getallposts', {
            headers: {
              'content-type': 'application/json',
              'Authorization':token
            },
          } )
        return res;
    } catch (error) {
   // debugger

       return rejectWithValue(error.response.data)
    }

})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: 
        (builder)=>{
            builder.addCase(getAllPost.pending,(state)=>{
                state.isLoading=true
            })
            builder.addCase(getAllPost.fulfilled,(state,action)=>{
                state.isLoading=false
                state.PostData= action.payload
                state.isSuccess =true
    
            })
            builder.addCase(getAllPost.rejected,(state,action)=>{
                state.isLoading=false
                state.isError= true
                state.PostData =null
            })

    }

})
export default postSlice.reducer
// export const {  } = postSlice.actions