import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



const ViewPostDetails = () => {
    let { id } = useParams();
    const [details, setDetails] = useState<any>([])
    const location = useLocation()
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
            let data =location.state
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
            <Container className='container my-4 py-5'>


                <div className='row' style={{ display: "flex", justifyContent: 'center' }}>

                    <h6>view post details</h6>
                    <Card style={{ width: '18rem' }} >
                        <Card.Body >
                            <Card.Img variant="top" src={details.url} />
                            <Card.Text>
                                #{details.id}
                            </Card.Text>  <Card.Title>
                                {details.title}
                            </Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Card.Text>
                                {details.albumId}
                            </Card.Text>

                        </Card.Body>
                    </Card>





                    {/* <Pagination />    */}
                </div>

            </Container>
        </>
    )
}

export default ViewPostDetails