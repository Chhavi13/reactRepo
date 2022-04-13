import React, { useState } from 'react'

export default function ConditionalRendering() {

    const [data, setData] = useState(false)

    // let msg;
    // if (data) {
    //     msg = <h4>your are logged in</h4>
    // }
    // else {
    //     msg = <h4>your are not logged in</h4>


    // }
    // return (
    //     <>

    //         {msg}

    //         <button onClick={() => setData(true)}>click to change</button>
    //     </>
    // )

    return (
        <>

            {data ? <h4>your are logged in</h4> : <h4>your are not logged in</h4>   }{/*  ternry oprtor*/}
            
         {data &&  <h4>your are logged in</h4> }  {/* short circuit*/}
            <button onClick={() => setData(true)}>click to change</button>
        </>
    )


}
