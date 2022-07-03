import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const baseURL = "http://localhost:8000";
interface todoList {
    id: number,
    content: any
}
type InitialState = {
    todoList: todoList[],
    responseStatus: string,
  responseMessage: string,
}
const initialState: InitialState = {
    todoList: []  ,
    responseStatus: ""  ,
    responseMessage:""
    
}

export const createTask:any = createAsyncThunk(
    "toDo/createTask",
    async (task, { rejectWithValue }) => {
      try {
        debugger
        const response = await axios.post(`${baseURL}/api/todo/create`, task);
        return response.data;
      } catch (error) {
        console.log(error)
        return rejectWithValue(error);
      }
    }
  );


  export const getTasks:any = createAsyncThunk(
    "todo/getTasks",
    async () => {
      try {
        debugger
        const response = await axios.get(`${baseURL}/api/todos/`);
        return response.data;
      } catch (error) {
        return error
      }
    }
  );

export const toDoSlider = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
    },
    extraReducers: {
        [createTask.pending]: (state, action) => {
          return {
            ...state,
            responseStatus: "pending",
          }
        },
        [createTask.fulfilled]: (state, action) => {
          return {
            ...state,
            tasks: [...state.todoList, action.payload],
            responseStatus: "success",
            responseMessage: "Task created successfully",
          }
        },
        [createTask.rejected]: (state, action) => {
          return {
            ...state,
            responseStatus: "rejected",
            responseMessage: action.payload,
          }
        }



    }
})
// Action creators are generated for each case reducer function
// export const { addToDo, removeTodo, editTodo } = toDoSlider.actions
export default toDoSlider.reducer;
