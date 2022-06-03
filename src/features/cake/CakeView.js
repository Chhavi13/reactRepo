import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ordered, restocked } from './cakeSlice'

export const CakeView = () => {
  const numberOfCakes = useSelector((state)=>state.cake.numberOfCakes)
  const dispatch =useDispatch()
  const [value,setValue]=useState()

  return (
    <div >
        <h3>Number of Cakes - {numberOfCakes}</h3>
        <button onClick={()=>dispatch(ordered())}>order cake</button>
        <input type="number" placeholder='enter the number to restoked iceCreame' onChange={(e)=>setValue(parseInt(e.target.value))} />
        <button onClick={()=>dispatch(restocked(value))}>restoked Cake</button>

    </div>
  )
}
