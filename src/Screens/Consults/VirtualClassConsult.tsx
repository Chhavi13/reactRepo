import React from 'react';
import { useLocation } from 'react-router-dom';
import StepsForVirtualClass from './VirtualClassConsults/StepsForVirtualClass';

const VirtualClassConsult = () => {
  const {state} = useLocation()

  return (
    <div>
      <StepsForVirtualClass state={state} />
    </div>
  )
}

export default VirtualClassConsult
