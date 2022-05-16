import { Routes, Route } from 'react-router-dom'
import Home from '../component/Home'
import Login from '../component/Login'
import Registration from '../component/Registration'
import React from 'react'
import { ProtectedRoute } from '../component/ProtectedRoute'
import { Error } from '../component/Error'
import About from '../component/About'
import  ShowPost  from '../component/ShowPost'

const Router = () => {
    return (
        <>
            <Routes>

                <Route exact path='/' element={<ProtectedRoute Component={Home} />}></Route>
                <Route  path='/register' element={< Registration />}></Route>
                <Route  path='/login' element={< Login />}></Route>
                <Route path='/about' element={<ProtectedRoute Component={About} />}></Route>
                <Route  path="/showpost" element={<ShowPost/>}></Route>
                <Route  path="*" element={< Error />}></Route>
              
            </Routes>


        </>
    )
}

export default Router