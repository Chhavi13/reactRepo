import React from 'react'
import { useLocation } from 'react-router-dom'
import StepForPrebabyConsults from "./PrebabyConsults/StepForPrebabyConsults"

function PrebabyConsult() {
    const {state}:any = useLocation()
  return (
    <div>
        <StepForPrebabyConsults state={state} />      
    </div>
  )
}

export default PrebabyConsult
