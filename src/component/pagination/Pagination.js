import React from 'react'
import Button from '@mui/material/Button';
import '../pagination/pagination.css'
import Box from '@mui/material/Box'
import { flexbox } from '@mui/system';


const Pagination = () => {
    return (
        <Box className='button1'>
            <Button variant="contained" size="medium">
                Previous
            </Button>
            <Button variant="contained" size="medium">
                Next
            </Button>
        </Box>
    )
}

export default Pagination