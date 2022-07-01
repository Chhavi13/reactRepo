import { createSlice } from '@reduxjs/toolkit'

interface todoList{
    id:number,
    content:any

}
type InitialState ={
    todoList:todoList[],
 
}
const initialState :InitialState={
    todoList :   [
        //  { id: 1, content: "Hit the gym" },
        //  { id: 2, content: "Meet George"}
       ]
}
export const toDoSlider = createSlice({
 name: 'toDo',
 initialState,
 reducers: {
   addToDo: (state, action) => {
     let newTodo = {
       id: Date.now(),
       content: action.payload
     }
     console.log("new todod",newTodo) 
       state.todoList.push(newTodo);
   console.log("payload slice",state)
   },

   
  },
})
// Action creators are generated for each case reducer function
export const { addToDo } = toDoSlider.actions
export default toDoSlider.reducer;










































//    deleteToDo: (state, action) => {
//      let { todoList } = state;
//      state.todoList = todoList.filter((item) => 
//          item.id !==action.payload.id);
//    },
//    editTodo: (state, action) => {
//      let { todoList } = state;
//      state.todoList = todoList.map((item) => 
//        item.id === action.payload.id ? action.payload : item);
//    }