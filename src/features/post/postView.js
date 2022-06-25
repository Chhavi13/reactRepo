import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPost } from './Post';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom'
import Pagination from '../../component/pagination/Pagination';

export const PostView = () => {
    //const navigate = useNavigate()
    const [searchField, setSearchField] = useState("")
    const [filterResult, setfilterResult] = useState([])

    const dispatch = useDispatch()
    const { posts, loading, error } = useSelector((state) => state.post)
    
    // console.log("post", posts)
    // const [data, showData] = useState([])
    
    
    useEffect(()=>{
        // debugger
        if(!loading && (!posts ||!posts.length)&& !error){
            dispatch(getAllPost())

        }else{
            setfilterResult(posts)
        }

    },[posts])

    // useEffect(() => {       
    //  dispatch(getAllPost())

    // }, [])


    // async function fetchData() {

    //     const response = await dispatch(getAllPost())
    //    //console.log("++",response)
    //    setfilterResult(response.payload)
    //   }
    // useEffect(() => {
    // //     debugger
    // // const data = await dispatch(getAllPost())
    // //       setfilterResult(data)

    //   fetchData()


    // },[])



    const handlechange = (e) => {
        const { value } = e.target
        setSearchField(value)
        //  debugger

        if (value) {
            const filterData = posts.filter(item => {
                return Object.keys(item).some(key =>
                    item[key].toString().toLowerCase().includes(value.toString().toLowerCase()))
            })
            //  debugger
            setfilterResult(filterData)
        } else {
            //  debugger
            setfilterResult(posts)

        }


    

        // const filtered = !value
        // ? post.posts
        // :post.posts.filter(item => {
        //     Object.keys(item).some(key =>
        //         item[key].toString().toLowerCase().includes(value.toString().toLowerCase()))

        // })
        // setfilterResult (filtered)

    }

    return (
         <>
       <Container className='container my-5 py-5'>
        
         <div className='form-row align-items-center'>
            <input type="text" placeholder="Search.." value={searchField} onChange={handlechange} />
          </div>&nbsp;
        
                <div className='row row-cols-4' >
                    {filterResult.map((postData) => (
                <div key={postData.id} >    
                 { (postData.id%2==0)?(<Card style={{ width: '18rem',backgroundColor:"red" }} >
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
                        <Button variant="primary">Go somewhere</Button>
                     </Card.Body>
                 </Card> ) : (<Card style={{ width: '18rem' }} >
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
                        <Button variant="primary">Go somewhere</Button>
                     </Card.Body>
                 </Card> )
                 }
              </div>     
                                
                        
         ))} 
        </div>
        <div>
        <Pagination />   
        </div>
       
</Container>        
</> )
}

















{/* {filterResult.map((postData) => (


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


                    )} */}

                    // pani nhi to pani bhrdo ie agr post ni h to hi dispatch krnaother wise show krdo
                    // useEffect(()=>{
                    //     if(!loading && (!posts.length)&& !error){
                    //         dispatch(getAllPost())
                
                    //     }else{
                    //         setfilterResult(posts)
                    //     }
                
                    // },[posts])

                    