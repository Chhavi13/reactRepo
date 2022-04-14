import React, { useState, useEffect } from 'react'
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { link } from 'react-router-dom'
const FormCrud = () => {

    const [userData, setUserData] = useState({
        myname: "", city: "", emailadd: ""
    }
    )
    const [data, setData] = useState([])
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null)

    const changeDetails = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };
    const transferValue = (event) => {
        event.preventDefault();
        // console.log('userData', userData)
        if (!userData.myname || !userData.city || !userData.emailadd) {
            alert("plz fill data")
        }
        else if (userData && !toggleSubmit) {
            console.log(userData + !toggleSubmit)
            // debugger
            setData(
                data.map((elem) => {
                    if (elem.id === isEditItem) {
                        return ({ ...userData })
                    }
                    return elem
                })
            )
            setToggleSubmit(true)
            setUserData({
                myname: "",
                city: "",
                emailadd: ""
            })
            setIsEditItem(null)


        }
        else {
            const obj = {
                myname: userData.myname,
                city: userData.city,
                emailadd: userData.emailadd,
                id: data.length + 1
            }
            console.log(obj)
            setData([...data, obj]);
            clearState();
        }


    };
    // console.log("data", data)

    const clearState = () => {
        setUserData({
            myname: "",
            city: "",
            emailadd: ""
        });
    };
    const deleteData = (id) => {
        const filterData = data.filter((element) => {
            return element.id !== id
        })
        setData(filterData)
    };
    const editData = (id) => {
        console.log(id)
        const newArr = data.find(obj => {
            return (obj.id === id)
        });
        console.log("+++++++++++", newArr)
        setToggleSubmit(false)
        setUserData(newArr)
        setIsEditItem(id)

    }

    return (
        <>
            <label>Name</label>
            <input type="text" name='myname' value={userData.myname} onChange={changeDetails} />
            <label>City</label>
            <input type="text" name='city' value={userData.city} onChange={changeDetails} />
            <label>Email</label>
            <input type="text" name='emailadd' value={userData.emailadd} onChange={changeDetails} />
            <br /> <div>&nbsp;</div>
            {toggleSubmit ? <button onClick={transferValue} style={{ color: 'red' }} > Add </button> : <button onClick={transferValue} style={{ color: 'green' }}> update </button>}
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div >
                <table border="1" >
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>city</th>
                            <th>update</th>
                            <th>delete</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <td>{val.id}</td>
                                        <td>{val.myname}</td>
                                        <td>{val.emailadd}</td>
                                        <td>{val.city}</td>

                                        <td className='edit-btn' >

                                            <Icon icon={edit2} onClick={() => editData(val.id)} />

                                        </td>
                                        <td className='delete-btn' onClick={() => deleteData(val.id)} >
                                            <Icon icon={trash} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>



    )

}
export default FormCrud