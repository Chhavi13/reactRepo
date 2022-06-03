import React, { useEffect, useState ,useContext} from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import { ShowPost } from './ShowPost';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Home = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)
  const FetchData = async () => {
    try {
      console.log("yess home ", localStorage.getItem('token'))
      const token = localStorage.getItem('token')
      let url = "http://localhost:4000/users/getalluser"
      if (token) {
        const AuthStr = 'Bearer '.concat(token);
        axios.get(url, { headers: { Authorization: AuthStr } })
          .then(response => {
            // If request is good...
            //  / console.log(response);
          })
          .catch((error) => {
            console.log('error ' + error);
          });
        //   })
        // console.log(response)

      } else {
        navigate("/login")
      }

    } catch (error) {
      navigate("/login")
    }
  }

  useEffect(() => {
    FetchData()
  }, [])





  return (<>

    <CreatePost />
    {/* <Link to="/showpost">ShowPost</Link> */}
  </>
  )
}

export default Home








 // console.log("yess home ", localStorage.getItem('token'))
    // const token = localStorage.getItem('token')
    // let url = "http://localhost:4000/users/getalluser"
    // let options ={
    //   method:'GET',
    //   url:url,
    // headers:{
    //   'content-type': 'text/json',
    // ' Authorization':`basic ${localStorage.getItem('token')}`

    // }
    // }


    // let response = await axios.get('http://localhost:4000/users/getalluser',
    //   {
    //     headers: {
    //       ' Authorization': token

    //     }