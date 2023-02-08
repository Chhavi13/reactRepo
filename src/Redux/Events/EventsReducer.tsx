import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FavEventApi, getEventsData,EventDetailApi } from "../../Service/Events";

let userID: any = localStorage.getItem("Nurture_user_data");
userID = JSON.parse(userID)?.id;

export const getPastEventData: any = createAsyncThunk("events/pastEvents", async (undefined, { rejectWithValue }: any) => {
    try {
        let res: any = await getEventsData({
            user_id: userID,
            type: "past"
        })

        return res?.data?.data;
    } catch (error: any) {
        rejectWithValue(error)
    }
})

export const getUpComingEvent: any = createAsyncThunk("events/upComingEvents", async (undefined, { rejectWithValue }: any) => {
    try {
        let res: any = await getEventsData({
            user_id: userID,
            type: "live"
        })

        return res?.data?.data;
    } catch (error) {
        rejectWithValue(error)
    }
})

export const getFavEvent: any = createAsyncThunk("events/fav", async (undefined, { rejectWithValue }: any) => {
    try {
        let res: any = await FavEventApi({ user_id: userID })
        return res?.data?.data;
    } catch (error) {
        rejectWithValue(error)
    }
})

export const getEventDetail:any = createAsyncThunk("events/getEventDetail",async(data,{rejectWithValue}:any)=>{
    try{
        let res: any = await EventDetailApi(data)
        return res?.data?.data
    }catch(error){
        rejectWithValue(error)
    }
})

interface EventSlice {
    pastEvents: any,
    upComingEvents: any,
    pastLoading: boolean,
    getEventDetail:any,
    getEventDetailLoading:boolean,
    upcomingLoading: boolean,
    error: any,
    favEvent:any,
    favEventLoading:boolean
}

const initialState = {
    pastEvents: undefined,
    upComingEvents: undefined,
    favEvent:undefined,
    getEventDetail:undefined,
    getEventDetailLoading:false,
    pastLoading: false,
    upcomingLoading: false,
    favEventLoading:false,
    error: []
} as EventSlice


const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        upDateLiveEventsData(state: any, { payload }: any) {
            state.upComingEvents = payload;
        },
        upDatePastEventsData(state: any, { payload }: any) {
            state.pastEvents = payload;
        },
        updateEventFav(state: any, { payload }: any){
            state.favEvent = payload;
        }
    },
    extraReducers: {
        [getPastEventData.pending]: (state, { payload }) => {
            state.pastLoading = true;
        },
        [getPastEventData.fulfilled]: (state, { payload }) => {
            state.pastLoading = false;
            state.pastEvents = payload
        },
        [getPastEventData.rejected]: (state, { payload }) => {
            state.pastLoading = false;
            state.error = payload;
        },
        [getUpComingEvent.pending]: (state, { payload }) => {
            state.upcomingLoading = true
        },
        [getUpComingEvent.fulfilled]: (state, { payload }) => {
            state.upcomingLoading = true
            state.upComingEvents = payload
        },
        [getUpComingEvent.rejected]: (state, { payload }) => {
            state.upcomingLoading = false
            state.error = payload
        },
        [getFavEvent.pending]: (state, { payload }) => {
            state.favEventLoading = true
        },
        [getFavEvent.fulfilled]: (state, { payload }) => {
            state.favEvent = payload
            state.favEventLoading = false
        },
        [getFavEvent.rejected]: (state, { payload }) => {
            state.favEventLoading = false
        },

        [getEventDetail.pending]: (state, { payload }) => {
            state.getEventDetailLoading = true
        },
        [getEventDetail.fulfilled]: (state, { payload }) => {
            state.getEventDetail = payload
            state.getEventDetailLoading = false
        },
        [getEventDetail.rejected]: (state, { payload }) => {
            state.getEventDetailLoading = false
        }
    }
})

export const { upDateLiveEventsData, upDatePastEventsData,updateEventFav } = eventSlice.actions
export default eventSlice.reducer;