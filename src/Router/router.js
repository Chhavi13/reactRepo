import React from 'react'
import {Route,Routes} from 'react-router-dom'
import  Hideandshow from '../FunctionalComponent/hideandshow';
import Form from '../FunctionalComponent/Form';
import FormClass from '../ClassComponents/FormClass'
import TableData from '../FunctionalComponent/table';
import Header from '../FunctionalComponent/Header';
import FormCrud from '../FunctionalComponent/FormCrud';
function Router() {
    return (
        <div>

            <Routes>
                <Route path='/' element={<Hideandshow />} />
                <Route exact path='/form' element={<Form />} />
                <Route exact path='/formclass' element={<FormClass />} />
                <Route exact path='/crudform' element={<FormCrud />} />
                <Route exact path='/header' element={<Header />} />
            </Routes>
        </div>
    )
}

export default Router