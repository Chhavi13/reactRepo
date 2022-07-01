import React from 'react'
import { useSelector } from 'react-redux';

const TodoList = () => {
  
  const todos = useSelector((state:any) => state.todo.todoList);
  console.log(todos)
  return (
    <>TodoList</>
  )
}

export default TodoList