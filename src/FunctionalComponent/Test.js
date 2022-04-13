import React, { useState } from 'react'

export default function Test() {
    const [showText, setShowText] = useState(false)
    console.log(showText)
    const onClick = () => setShowText(true)
    let Text =()=>{
        return <>clicked</>
    }


    return (
        <div>

            <button onClick={onClick}>click me</button>
            {showText ? <Text /> : null}

        </div>
    )

}

