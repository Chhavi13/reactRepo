import { createSlice } from '@reduxjs/toolkit'

// const createSlice = require('@reduxjs/toolkit').createSlice
import { ordered as cakeordered } from '../cake/cakeSlice'

const initialState ={
    numberOfIcecreame :20
}
const icecreameSlice = createSlice({
    name:'icecreame',
    initialState,
    reducers:{
        ordered:(state)=>{
            state.numberOfIcecreame--
        },
        restocked:(state,action)=>{
            state.numberOfIcecreame += action.payload
        }
    },
    // extraReducers:{
    //     ['cake/ordered']:(state)=>{
    //         state.numberOfIcecreame--
    //     }
    // }  //the alternate of this is builder method
    // extraReducers:(builder)=>{
    //     builder.addCase(cakeordered,(state)=>{
    //         state.numberOfIcecreame--
    //     })
    // }


})

export default icecreameSlice.reducer
export const {ordered,restocked} = icecreameSlice.actions