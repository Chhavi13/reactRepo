import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box } from '@mui/system';

import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { deleteTask, editTask, getTasks } from '../../redux/features/todo/TodoSlice';
import AddTodo from './AddTodo';

const TodoList = () => {
  const [checked, setChecked] = React.useState([0]);
 
  const todos = useSelector((state: any) => state.todo.todoList);
  const [data, setData] = useState<any>([])
  const [toggleSubmit, setToggleSubmit] = useState<any>(true)


  const dispatch = useDispatch()

  useEffect(() => {
    //  debugger
    if ((!todos || !todos.length)) {
      dispatch(getTasks());

    } else {
      setData(todos)
    }

  }, [todos]);
  // debugger
  // console.log(todos)

  const handleToggle = (value: number) => () => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const deleteTodos = async (id: any) => {
    const newData: any = data.filter((item: any) => {
      // console.log(item)
      return item._id !== id
    })
    setData(newData)

    const res: any = await dispatch(deleteTask(id))
  }


  const editTodos = async (value: any) => {
    console.log(value)

    // const res :any= await dispatch(editTask(value))
  setData(value)



  }


  return (

    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'inherite', paddingLeft: 50 }}>
        {data.map((value: any) => {

          const labelId = `checkbox-list-label-${value._id}`;

          return (
            <ListItem
              key={value._id}
              secondaryAction={
                <Box sx={{ paddingLeft: 10, color: "green" }}>
                  <IconButton edge="end" aria-label="edit"  onClick={()=>editTodos(value)} >
                  

                    <FaEdit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTodos(value._id)}>


                    <AiFillDelete />
                  </IconButton>
                </Box>


              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={` ${value.content}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

       <AddTodo />
    </>
  )
}

export default TodoList






















// {
//   todos.length > 0 &&
//     todos.map((todo: any) => (
//       <div key={todo.id} >
//         <h2>{todo.id}</h2>
//         <h2>{todo.content}</h2>

//       </div>))
// }


   // const newData:any  = data.filter((item:any) => {
    //   // console.log(item)
    //   return item._id !== res.payload.response._id
    // })
    // setData(newData)