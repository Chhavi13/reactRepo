import React from 'react'
import { CircularProgress } from '@mui/material';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeForm } from '../../../../Common/payment/stipePayment';
// import { StripeForm } from '../../Common/payment/stipePayment';


const string = 'pk_test_51KnieNSJOtah767fE2TNMOGal0sN39G6V3jgxO7Lx9roJeAAB8XI2tQXYuhzBptol1YWFJi7mFFOf1giIiUjA5Uk00eS7xxDfN';
const stripePromise = loadStripe(string)

const Step5 = ({ value, loading,setLoading, setValue, handleNext, yesValue, setYesValue, error, setError, noValue, setNoValue, noError, setNoError }: any) => {

  const callBack =  (token: any) => {

    
      handleNext(token)

    
  }
  return (
    <div>
      <div className="step-innercontent step5 payment-step5">
        <div className='consult-section-heading text-center'>
          <h3 className='my-5 p-0'>Payment</h3>
        </div>
        <div>
          {/* <h3>Payment</h3>
          <p className="top-para">You will be billed $250.00 for 6 months membership</p> */}
          <form className="mt-5">
            <div className="row">
              <Elements stripe={stripePromise} >
                <StripeForm membership={value} type="consult" callBack={callBack} />
              </Elements>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Step5
