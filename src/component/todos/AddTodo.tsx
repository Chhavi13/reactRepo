import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Icon, TextField, Typography, InputAdornment } from '@mui/material';
import { Container } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import "./Todos.css"
import { createTask, editTask } from '../../redux/features/todo/TodoSlice';



const AddTodo = () => {
    const [inputField, setInputField] = useState({
        content: ""
    })
       let dispatch = useDispatch()

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInputField({ ...inputField, [name]: value })

    }

    const addTodo = async (e: any) => {
        e.preventDefault()
        if(inputField.content === ""){
            dispatch(createTask(inputField))
            setInputField({ content: "" })
        }
        else{
            dispatch(editTask(inputField))
        }
}
const getEditValue = (value: any) => {
    // console.log(value)
    setInputField(value)
   

}

return (
    <>    
        <Container maxWidth="xl" className="sm py-4">
            <Box sx={{
                paddingTop: 10
            }} >
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
                    <TextField id="outlined-basic" name='content' label="Add something.." style={{ width: 500 }} value={inputField.content} variant="outlined" onChange={handleChange} InputProps={{
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
                <TodoList passData={getEditValue} />
            </Box>

        </Container>



    </>)
}

export default AddTodo