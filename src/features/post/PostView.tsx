import React, { useEffect, useState } from 'react'
import { fetchPost } from './PostSlice'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../app/store'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";



const PostView = () => {
  const { posts, loading, error } = useSelector((state: RootState) => state.post)
  // console.log(posts)

  const [searchField, setSearchField] = useState<any>("")
  const [filterResult, setfilterResult] = useState<any>([])
  const navigate = useNavigate()
  

  const dispatch = useDispatch()
  useEffect(() => {

    if (!loading && (!posts || !posts.length) && !error) {
      dispatch(fetchPost())

    } else {
      setfilterResult(posts)
    }

  }, [posts])

  const handlechange = (e: any) => {
    const { value } = e.target
    setSearchField(value)
    //  debugger

    if (value) {
      const filterData: any = posts.filter((item: any) => {
        return Object.keys(item).some(key =>
          item[key].toString().toLowerCase().includes(value.toString().toLowerCase()))
      })
      //  debugger
      setfilterResult(filterData)
    } else {
      //  debugger
      setfilterResult(posts)

    }
  }
  const viewPostDetails = (id: number) => {
    console.log(id)
    navigate(`/viewpostdetails/${id}`)


  }
  return (

    <>
      <Container className='container my-5 py-5'>

        <div className='form-row align-items-center'>
          <input type="text" placeholder="Search.." value={searchField} onChange={handlechange} />
        </div>&nbsp;
        <div className='row row-cols-4' >
          {filterResult.map((postData: any) => (
            <div key={postData.id} >
              {(postData.id % 2 == 0) ? (<Card style={{ width: '18rem', backgroundColor: "red" }} >
                <Card.Body >
                  <Card.Img variant="top" src={postData.url} />
                  <Card.Text>
                    #{postData.id}
                  </Card.Text>  <Card.Title>
                    {postData.title}
                  </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Card.Text>
                    {postData.albumId}
                  </Card.Text>
                  <Button variant="primary" onClick={() => viewPostDetails(postData.id)}>view details</Button>
                </Card.Body>
              </Card>) : (<Card style={{ width: '18rem' }} >
                <Card.Body >
                  <Card.Img variant="top" src={postData.url} />
                  <Card.Text>
                    #{postData.id}
                  </Card.Text>  <Card.Title>
                    {postData.title}
                  </Card.Title>

                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Card.Text>
                    {postData.albumId}
                  </Card.Text>
                  <Button variant="primary" onClick={() => viewPostDetails(postData.id)}>view details</Button>
                </Card.Body>
              </Card>)
              }
            </div>


          ))}
        </div>
        <div>
          {/* <Pagination />    */}
        </div>

      </Container>
    </>
  )
}

export default PostView

