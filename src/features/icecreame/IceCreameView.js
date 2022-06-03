import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ordered, restocked } from './icecreameSlice'

export const IcecreameView = () => {
  const [value,setValue] = useState(1)//1 bhi rakh skte h
  const numberOfIcecreame = useSelector((state) => state.icecreame.numberOfIcecreame)
  const dispatch = useDispatch()

  const inputHandler =(e)=>{
    setValue(parseInt(e.target.value))

  }
  return (
    <div >
      <h3>Number of Icecreame :- { numberOfIcecreame}</h3>
      <button onClick={()=>dispatch(ordered())}>order Icecreame</button>
      <input type="number" placeholder='enter the value to restoked..'value={value} onChange={inputHandler}/>
      <button onClick={()=>dispatch(restocked(value))}>restoked Icecreame</button>

    </div>
  )
}

//use of useselector to read the data from the redux store
