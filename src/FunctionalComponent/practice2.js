import React from 'react'

function Practice2() {
    let data = [{
        id: 0, myName: "chhavi choursiya", tech: "javasript"
    },
    {
        id: 1, myName: "shivi sharma", tech: "javasript"
    },
    {
        id: 3, myName: "Ankit jain", tech: "Asp.net"
    }


    ]
console.log(data)


    return (
        <>
            {
                // data.map((CurrEle)=>{
                //     return <h2>Name : {CurrEle.myName } and technology :{ CurrEle.tech}</h2>
                  
                // })
                data.map((CurrEle)=>
                    <h4 key={CurrEle.id}>Name : {CurrEle.myName } and technology :{ CurrEle.tech}</h4>
                  
                )




            }

        </>
    )
}

export default Practice2