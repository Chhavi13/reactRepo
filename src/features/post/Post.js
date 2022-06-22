import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    posts: [],
    error: ''
}

export const getAllPost = createAsyncThunk('post/getAllPost', async (token, { rejectWithValue }) => {
    try {


        let res = await axios.get('https://jsonplaceholder.typicode.com/photos', {

        })
        //debugger
        // console.log("details", res.data)
        let PostDetail = res.data.slice(0,50)
        // // console.log("postdetails", PostDetail)
        // // PostDetail.map((post) => post.id)
        // debugger
        return PostDetail;

    } catch (error) {

        console.log("error", error)
        return rejectWithValue(error)
    }

})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.error = ''

        })
        builder.addCase(getAllPost.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.error.message
        })
    }
})
export default postSlice.reducer
