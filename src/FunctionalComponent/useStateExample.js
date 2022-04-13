import React, { useState } from 'react'

export default function () {
  
   // const [data,setData]=useState("hi ");
   const [data,setData]=useState(0)
   let myFun =()=>{
    //   setData("hello data is updated")
     setData(data+1)
   }
  return (
    <div>
    
        <h1>{data}</h1>
       <button onClick={myFun} >mybtn</button>

    </div>
  )
}
