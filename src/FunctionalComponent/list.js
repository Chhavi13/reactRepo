import React, { useState } from 'react'

function List() {
    const [personList, setDataList] = useState([
        {
            names: "chhavi",
            language: "java"
        },
        {
            names: "mahesh",
            language: "react"
        },
        {
            names: "eshita",
            language: "python"
        }
    ])




    return (<div>{


        personList.map((data, i) => (
            <h2 key={i}>{i}  my name is  {data.names} and i am working on {data.language}</h2>
        ))



    }</div>)
}

export default List