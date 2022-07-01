import { createSlice } from '@reduxjs/toolkit'
interface todoList {
    id: number,
    content: any
}
type InitialState = {
    todoList: todoList[],
}
const initialState: InitialState = {
    todoList: [
        { id: 1, content: "hii" },
        { id: 2, content: "hello" }
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
            //  console.log("new todod",newTodo)
            state.todoList.push(newTodo);
            //    console.log("payload slice",state)
        },

        removeTodo: (state, action) => {
            console.log(state.todoList)
            // debugger
            state.todoList = state.todoList.filter((item) =>
                item.id !== action.payload);
        },
        editTodo: (state, action) => {
            let { todoList } = state;
            debugger
            state.todoList = todoList.map((item) =>
                item.id === action.payload ? action.payload : item);


        }

    },
})
// Action creators are generated for each case reducer function
export const { addToDo, removeTodo, editTodo } = toDoSlider.actions
export default toDoSlider.reducer;
