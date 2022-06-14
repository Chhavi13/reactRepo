import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from '../component/Home'
import Login from '../component/Login'
import Registration from '../component/Registration'
import React, { useEffect } from 'react'
import { ProtectedRoute } from '../component/ProtectedRoute'
import { Error } from '../component/Error'
import About from '../component/About'
import ShowPost from '../component/ShowPost'
// import { UserContext } from '../App'
import EditPost from '../component/EditPost'
import { useSelector } from 'react-redux'
import CreatePost from '../component/CreatePost'

const Router = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    // useEffect(() => {
    //    const user = JSON.parse(localStorage.getItem("user")) 
    //     console.log("token<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>", user)

    //       if(user){
    //           navigate("/")
    //       }
    //       else{
    //           navigate("/login")
    //       }
    // }, [])

    return (
        <>


            <Routes>


                <Route exact path='/' element={<ProtectedRoute Component={Home} />}></Route>
                <Route path='/register' element={< Registration />}></Route>
                <Route path='/login' element={< Login />}></Route>
                <Route path='/createpost' element={<ProtectedRoute Component={CreatePost} />}></Route>
                <Route path="/showpost" element={<ShowPost />}></Route>
                <Route exact path="/posts/editpost/:id" element={<EditPost />}></Route>
                <Route path="*" element={< Error />}></Route>
                {/* <Route path="/login" element={<Login />}></Route> */}
            </Routes>


        </>
    )
}

export default Router