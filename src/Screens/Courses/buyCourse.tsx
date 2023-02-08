import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { StripeForm } from '../../Common/payment/stipePayment'
import { COURSEVIEW } from '../../Routes/RouteConstent';
// import "./Membership.scss";
import "../Membership/Membership.scss"

const string = 'pk_test_51KnieNSJOtah767fE2TNMOGal0sN39G6V3jgxO7Lx9roJeAAB8XI2tQXYuhzBptol1YWFJi7mFFOf1giIiUjA5Uk00eS7xxDfN';
const stripePromise = loadStripe(string)

const BuyCourse = () => {
    const location: any = useLocation()
    const Navigate = useNavigate()
    const callBack = (token: any, MemberCourseId: any) => {
        //  Navigate(COURSEVIEW + MemberCourseId);
    }
    return (
        <div className='nonMember'>
            <div className="step-innercontent step5 payment-step5">
                <div>
                    <h3>Payment details</h3>
                    {/* <p className="top-para">You will be billed $250.00 for 6 months membership</p> */}
                    <form className="mt-5">
                        <div className="row">
                            <Elements stripe={stripePromise} >
                                <StripeForm membership={location?.state?.obj} type="course" callBack={callBack} />
                            </Elements>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default BuyCourse