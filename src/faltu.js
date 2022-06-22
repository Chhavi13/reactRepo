import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPost } from './Post';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const PostView = () => {
    const [searchField, setSearchField] = useState("")
    const [filterResult, setfilterResult] = useState([])

    const dispatch = useDispatch()
    const post = useSelector((state) => state.post)
    // console.log(post.posts.length

    useEffect(() => {
        dispatch(getAllPost())

    }, [])

   


    const handlechange = (e) => {
        const { value } = e.target
        setSearchField(value)
        // debugger
        // if (value !== "") {
        //     const filterData = post.posts.filter(item => {
        //         Object.keys(item).some(key =>
        //             item[key].toString().toLowerCase().includes(value.toString().toLowerCase()))

        //     })
        //     // debugger
        //     setfilterResult(filterData)
        // } else {
        //     // debugger
        //     setfilterResult(post.posts)

        // }
        const filtered = !value
        ? post.posts
        :post.posts.filter(item => {
            Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(value.toString().toLowerCase()))

        })
        setfilterResult (filtered)
    }

    return (
        <Container>
            <div className='offset-4' >
            <div style={{ marginRight: 560 ,marginTop:10}}>
                
                <input type="text"  placeholder="Search.." value={searchField} onChange={handlechange} /></div>

               &nbsp;

            {
                     
                (searchField.length > 1) ?((!post.loading && post.posts.length) && filterResult.map((postData) => {
                    
                    return (
                        <div key={postData.id}>
                            <Card style={{ width: '18rem', }}>

                                <Card.Body>

                                    <Card.Img variant="top" src={postData.url} />
                                    <Card.Title>{postData.title}</Card.Title>
                                    <Card.Text>
                                        {postData.id}
                                    </Card.Text>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Card.Text>
                                        {postData.albumId}
                                    </Card.Text>


                                </Card.Body>
                            </Card> </div>


                    )


                }))
                : ((!post.loading && post.posts.length) && post.posts.map((postData) => {

                    return (
                        <div key={postData.id}>
                            <Card style={{ width: '18rem', }}>

                                <Card.Body>

                                    <Card.Img variant="top" src={postData.url} />
                                    <Card.Title>{postData.title}</Card.Title>
                                    <Card.Text>
                                        {postData.id}
                                    </Card.Text>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                    <Card.Text>
                                        {postData.albumId}
                                    </Card.Text>


                                </Card.Body>
                            </Card> </div>


                    )
                }

                ))
            }
            <Button variant="primary">Go somewhere</Button>


        </div>
        </Container>

        
    )
}
