import React, { useEffect, useState } from 'react'
import { useParams, useLocation,useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid, Card,Button, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';


const ViewPostDetails = () => {
    let { id } = useParams();
    const [details, setDetails] = useState<any>([])
    const location = useLocation()
    const navigate=useNavigate()
    // console.log("+++++", id)
    const getData = async () => {
        try {
            // debugger
            // const res = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
            // console.log(res?.data)
            // let data =res?.data
            // setDetails(data)
            // debugger
            console.log(location.state)
            let data = location.state
            setDetails(data)
        } catch (error) {
            // debugger
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <CssBaseline />
            <Container className="sm py-4">

                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', paddingTop: 10 }} >
                    <Box ml={1} display='flex' justifyContent="left">
                    <Button  variant="outlined"  onClick={() => navigate(`/`)}>
                     Back
                    </Button>
                    </Box>
                    
                    <Typography variant="h5" component="div" color="text.secondary" mr={5}>
                        View Details
                    </Typography>
                    <Card sx={{ maxWidth: 345, marginLeft: 10 }}>
                        <Typography justifyContent="left">
                            #{details.id}
                        </Typography>
                        <CardMedia
                            component="img"
                            height="300"
                            image={details.url}
                        />
                    </Card>

                    <Grid container mt={-29} columnSpacing={4} mr={2} justifyContent="right" pr={8}>

                        <Grid item xs={7}>
                            <Box sx={{ bgcolor: "#fff",color:"navy", padding: 4 }}>{details.title}</Box>
                            
                        </Grid>

                        <Grid item xs={7}>
                            <Box sx={{ bgcolor: "lightgrey", padding: 2 }}>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Box>
                        </Grid>

                    </Grid>
                    
                </Box>
            </Container>

        </>
    )
}

export default ViewPostDetails