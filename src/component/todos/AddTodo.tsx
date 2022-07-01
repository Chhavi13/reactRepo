import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Icon, TextField, Typography, InputAdornment } from '@mui/material';
import { Container } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addToDo } from '../../redux/features/todo/TodoSlice';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import "./Todos.css"



const AddTodo = () => {
    const [inputField, setInputField] = useState("")
    const dispatch = useDispatch()

    const handleChange = (e: any) => {
        const { value } = e.target
        setInputField(value)

    }

    const addTodo = (e: any) => {
        e.preventDefault()
        // console.log(inputField)
        dispatch(addToDo(inputField))
        setInputField('')
        

    }

    return (
        <>
            <Container maxWidth="xl" className="sm py-4">
                <Box sx={{ bgcolor: 'cornsilk', height: '100vh', paddingTop: 10 }} >
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "darkblue", paddingLeft: 55 }}>
                            what's your plan Today..
                        </Typography>
                        <TextField id="outlined-basic" label="Add something.." style={{ width: 500 }} value={inputField} variant="outlined" onChange={handleChange} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box
                                        sx={{
                                            '& > :not(style)': {
                                                m: 2,                                                
                                            },
                                        }}
                                    ></Box>
                                    <AddBoxIcon color="secondary" onClick={addTodo} />
                                </InputAdornment>
                            ),
                        }} />
                      
                    </Box>
                    <TodoList />
                </Box>

            </Container>



        </>)
}

export default AddTodo