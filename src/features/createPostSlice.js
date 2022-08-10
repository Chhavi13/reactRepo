import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
        posts: null,
        isError: false,
        isSuccess: false,
        isLoading: false,


}

export const createPost = createAsyncThunk('post/createPost', async ({formData,token}, { rejectWithValue }) => {
        try {
               // debugger
                let res = await axios.post('http://localhost:5000/posts/createpost',formData,
                        {
                                headers: {
                                        'content-type': 'multipart/form-data',
                                         Authorization: `Bearer ${token}` 
                                       
                                     
                                },

                        })
                       // debugger
                return res.data;
                console.log("call")
        } catch (error) {
                //debugger
                // console.log("}}}}}}}}}}",error.response.data)

                return rejectWithValue(error.response.data)
        }

})

export const createPostSlice = createSlice({
        name: 'createPost',
        initialState,
        reducers: {
        },
        extraReducers:
                (builder) => {
                        builder.addCase(createPost.pending, (state) => {
                                state.isLoading = true
                        })
                        builder.addCase(createPost.fulfilled, (state, action) => {
                                state.isLoading = false
                                state.posts = action.payload
                                state.isSuccess = true

                        })
                        builder.addCase(createPost.rejected, (state, action) => {
                                state.isLoading = false
                                state.isError = true
                                state.posts = null
                        })

                }

})
export default createPostSlice.reducer
