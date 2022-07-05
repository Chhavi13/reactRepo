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
    "todo/createTask",
    async (task, { rejectWithValue }) => {
      try {
       //debugger
        const response:any = await axios.post(`${baseURL}/api/todo/create`, task);
        return response.data.response;
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
       // debugger
        const response = await axios.get(`${baseURL}/api/todos/`);
        return response.data;
      } catch (error) {
        return error
      }
    }
  );
  export const deleteTask:any = createAsyncThunk(
    "todo/deleteTask",
    async (id:any,{ rejectWithValue }) => {
      console.log(id)
      try {
       //debugger
        const response = await axios.delete(`${baseURL}/api/todo/${id}/delete`);
        return response.data;
        
      } catch (error) {
        // debugger
        
        return rejectWithValue(error);
      }
    }
  );
  export const editTask:any =createAsyncThunk(
   "todo/editTask",
  async (task:any,{rejectWithValue}) => {
    try{
      // debugger
   const res = await axios.patch(`${baseURL}/api/todo/${task._id}/update`,task)
  return res.data;
      
    }catch(error){
      console.log(error)
      return rejectWithValue(error);
    }
    
  }
  )

export const toDoSlider = createSlice({
    name: 'todo',
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
            todoList: [...state.todoList, action.payload],
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
        },
        [getTasks.pending]: (state, action) => {
          return {
            ...state,
            responseStatus: "pending",
          }
        },
        [getTasks.fulfilled]: (state, action) => {
          return {
            ...state,
            todoList: action.payload,
            responseStatus: "success",
          }
        },
        [getTasks.rejected]: (state, action) => {
          return {
            ...state,
            responseStatus: "rejected",
            responseMessage: action.payload,
          }
        },
        [deleteTask.pending]: (state, action) => {
          return {
            ...state,
            responseStatus: "pending",
          }
        },
        [deleteTask.fulfilled]: (state, action) => {
          // debugger
          return {
            ...state,
            todoList: action.payload,
            responseStatus: "success",
          }
        },
        [deleteTask.rejected]: (state, action) => {
          return {
            ...state,
            responseStatus: "rejected",
            responseMessage: action.payload,
          }
        },
        [editTask.pending]: (state, action) => {
          return {
            ...state,
            responseStatus: "pending",
          }
        },

        [editTask.fulfilled]: (state, action) => {
          
          return {
            ...state,
            todoList: action.payload,
            responseStatus: "success",
          }
        },
        [editTask.rejected]: (state, action) => {
          return {
            ...state,
            responseStatus: "rejected",
            responseMessage: action.payload,
          }
        }

      },
     


    
})
// Action creators are generated for each case reducer function
// export const { addToDo, removeTodo, editTodo } = toDoSlider.actions
export default toDoSlider.reducer;
