import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getCourseApi, getFavriteApi } from '../../Service/Course'

export const getCourse: any = createAsyncThunk("course/getCourse", async (token, { rejectWithValue }) => {
    try {
        let res: any = await getCourseApi(token)

        return res.data.data;
    } catch (error) {
        rejectWithValue(error)
    }

})
export const getFavCourse: any = createAsyncThunk("course/getFavlist", async (data, { rejectWithValue }) => {
    try {
        let res: any = await getFavriteApi(data)
        return res.data.data;
    } catch (error) {
        rejectWithValue(error)
    }
})
interface CounterState {
    data: [],
    loading: boolean,
    isSuccess: boolean,
    favCourse: []
}

const initialState = {
    data: [],
    loading: false,
    isSuccess: false

} as CounterState

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        upDateCourseData(state: any, action: any) {
            state.data = action.payload;
        },
        upDateFavData(state: any, action: any) {
            state.favCourse = action.payload;
            
        }
    },
    extraReducers: {
        [getCourse.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getCourse.fulfilled]: (state, { payload }) => {
            state.isSuccess = true
            // state.loading = false,
            state.data = payload
        },
        [getCourse.rejected]: (state, { payload }) => {
            state.isSuccess = false
            state.data = payload
            // state.loading = false
        },
        [getFavCourse.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getFavCourse.fulfilled]: (state, { payload }) => {
            state.isSuccess = true
            // state.loading = false,
            state.favCourse = payload
        },
        [getFavCourse.rejected]: (state, { payload }) => {
            state.isSuccess = false
            state.favCourse = payload
            // state.loading = false
        }

    }
})

export const { upDateCourseData, upDateFavData } = courseSlice.actions
export default courseSlice.reducer