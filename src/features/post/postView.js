import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPost } from './Post';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const PostView = () => {
    const [searchField, setSearchField] = useState("")

    const dispatch = useDispatch()
    const post = useSelector((state) => state.post)
    // console.log(post.posts.length)
    useEffect(() => {
        dispatch(getAllPost())

    }, [])

    const filtered = !searchField
        ? post.posts
        : post.posts.filter((data) =>
         data.title.toLowerCase().includes(searchField.toLowerCase())
        );

    return (


        <div className='offset-4' >
            <h6>Search data</h6>
            <input type="text" placeholder="Search.." value={searchField} onChange={(e) => setSearchField(e.target.value)} />

            <Card style={{ width: '18rem', }}>

                <Card.Body>

                    {
                        (!post.loading && post.posts.length) && filtered.map((postData) => {
                            if (postData.id <= 50) {
                                return (
                                    <div key={postData.id}>
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
                                    </div>

                                )
                            }

                        })}
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>


        </div>
    )
}
