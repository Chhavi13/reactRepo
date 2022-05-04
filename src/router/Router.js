import { Routes, Route } from 'react-router-dom'
import Home from '../component/Home'
import Login from '../component/Login'
import Registration from '../component/Registration'
import React from 'react'





const Router = () => {
    return (
        <div>
            <Routes>

                <Route exact path='/' element={< Home />}></Route>
                <Route  path='/register' element={< Registration />}></Route>
                <Route exact path='/login' element={< Login />}></Route>
            </Routes>


        </div>
    )
}

export default Router