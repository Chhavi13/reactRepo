import React from 'react'
import "./Membership.scss";
import { CircularProgress } from '@mui/material';
import { useStripe, useElements, CardCvcElement, CardExpiryElement, CardNumberElement, Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeForm } from '../../Common/payment/stipePayment';


const string = 'pk_test_51KnieNSJOtah767fE2TNMOGal0sN39G6V3jgxO7Lx9roJeAAB8XI2tQXYuhzBptol1YWFJi7mFFOf1giIiUjA5Uk00eS7xxDfN';
const stripePromise = loadStripe(string)

const Step5 = ({ value, loading, setValue, handleNext, yesValue, setYesValue, error, setError, noValue, setNoValue, noError, setNoError }: any) => {

    const options = {
        // passing the client secret obtained from the server
        // clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <div>
            <div className="step-innercontent step5 payment-step5">
                <div>
                    <h3>Payment</h3>
                    {/* <p className="top-para">You will be billed $250.00 for 6 months membership</p> */}
                    <form className="mt-5">
                        <div className="row">
                            <Elements stripe={stripePromise} >
                                <StripeForm membership={value} type="member"/>
                            </Elements>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Step5
