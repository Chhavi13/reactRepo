import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
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

import { FaEdit} from 'react-icons/fa';
import { AiFillDelete} from 'react-icons/ai';
import { getTasks } from '../../redux/features/todo/TodoSlice';

const TodoList = () => {
  const [checked, setChecked] = React.useState([0]);
  const todos = useSelector((state: any) => state.todo.todoList);
  const dispatch =useDispatch()
  
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
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
// const editTodos =(id:number)=>{
//  dispatch(editTodo(id))
// }


  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'inherite', paddingLeft: 50 }}>
        {todos.map((value: any) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <Box sx={{ paddingLeft: 10, color: "green" }}>
                  <IconButton edge="end" aria-label="edit">
                  {/* onClick={()=>editTodos(value.id)} */}
                  
                    <FaEdit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" >
                  {/* onClick={() => dispatch(removeTodo(value.id))} */}
                    
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
                <ListItemText id={labelId} primary={` ${value.content }`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>


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