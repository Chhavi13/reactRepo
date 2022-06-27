import { createSlice ,createAsyncThunk,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../app/store";

 interface Posts{
    id:string,
    title:string,
    albumId:string
}
type InitialState ={
    loading:boolean,
    posts:Posts[],
    error:string
}

const initialState :InitialState={
    loading:false,
    posts:[],
    error:""
}
export const fetchPost:any  =createAsyncThunk('post/fetchPost',async()=>{
  try{
  
    let res = await axios.get('https://jsonplaceholder.typicode.com/photos', {

    })
 
    // console.log("details", res.data)
    // debugger
    let PostDetail = res.data.slice(0,50)
    // // console.log("postdetails", PostDetail)

    // debugger
    return PostDetail;
  } catch(error){
    console.log(error)
  }
    
})
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPost.fulfilled, (state, action:PayloadAction<Posts[]>) => {
            state.loading = false
            state.posts = action.payload
            state.error = ''

        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.error.message || "something went wrong"
        })
    }
})
export default postSlice.reducer