import React, { useState, useEffect } from 'react'

function GetUserDataList() {
    const [userData, setUserData] = useState([])
    try {
        const FetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json()
            //const newData =data.slice(data[4])
            console.log(userData)
            setUserData(data)
            console.log(data)
        }
        useEffect(() => {
            FetchData()
        }, [])

    } catch (error) {
        console.log(error)
    }
    return (
        <>
            <table border="1">
               
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                    </tr>

             

                {userData.map(users =>


                    <tr>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.username}</td>
                        <td>{users.email}</td>
                    </tr>


                )


                }

            </table>

            {/* <ol>
                {userData.map(users => (

                    <li key={users.id}>{users.name}</li>
                ))}
            </ol> */}

        </>
    )
}

export default GetUserDataList