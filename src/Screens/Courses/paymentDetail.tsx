import React from 'react'
import MembershipDetail from '../../Common/membershipDetail/membershipDetail'
import { useLocation } from 'react-router-dom';
const PaymentDetail = () => {
    const { state }: any = useLocation();
  
    return (
        <div className='nonMember'>
            <MembershipDetail
                data={state?.data}
                type="course"
            />
        </div>
    )
}

export default PaymentDetail