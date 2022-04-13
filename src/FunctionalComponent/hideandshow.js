import React, { useState } from 'react'

export default function Hideandshow() {
    const [show, setShow] = useState(false);
    
    let showInput=()=>{
      setShow(true)
    }

      
    let showText=()=>{
        setShow(false)
    }


    return (
        <div>

            <button onClick={showInput} >show Field</button><br/>
            {
                show?<input type='text' />:<span>chhavi</span>
            }
            
            <button onClick={showText}> hide Field</button>



        </div>
    )
}
