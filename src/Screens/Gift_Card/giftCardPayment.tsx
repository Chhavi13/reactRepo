
import React from 'react'
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripeForm } from '../../Common/payment/stipePayment';
import { useLocation } from 'react-router-dom';
// import { StripeForm } from '../../../../Common/payment/stipePayment';

const string = 'pk_test_51KnieNSJOtah767fE2TNMOGal0sN39G6V3jgxO7Lx9roJeAAB8XI2tQXYuhzBptol1YWFJi7mFFOf1giIiUjA5Uk00eS7xxDfN';
const stripePromise = loadStripe(string)


const GiftCardPayment = ({ handleNext }: any) => {
  const location: any = useLocation()
  // const callBack = (token: any) => {
  //   handleNext(token)
  // }

  return (
    <div>
      <div className='nonMember'>
        <div className="step-innercontent step5 payment-step5">
          <div className='container pt-5'>
            <div className='step-container step3'>
              <div className='selected-gift-container py-3 py-md-4 px-3 px-md-4'>
                <div className='d-flex justify-content-between'>
                  <div className='gift-name'>
                    <h2 className='selected-gift-title m-0 p-0'>{location?.state?.value?.type === "membership" ?`${location?.state?.value?.title} Membership` :location?.state?.value?.title}</h2>
                  </div>
                  <div className='gift-cost-container'>
                    <h2 className='gift-cost'>{'$'+(location?.state?.value?.amount || location?.state?.value?.price)}</h2>
                  </div>
                </div>
                <div className='receiver-info py-3 py-md-3 px-3 px-md-3 mt-3'>
                  <h4 className='receiver-heading mb-3'>You are sending this gift to:</h4>
                  <div className='d-flex justify-content-between'>
                    <div className='info-value'>{location?.state?.value?.friend_name}</div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div className='info-value'>{location?.state?.value?.email}</div>
                  </div>
                </div>
              </div>
              <div>
              </div>
              <h3>Payment</h3>
              {/* <p className="top-para">You will be billed $250.00 for 6 months membership</p> */}
              <form className="mt-5">
                <div className="row">
                  <Elements stripe={stripePromise} >
                    <StripeForm
                      giftPay={location?.state?.value}
                      typeGiftAmt={location?.state?.type} />
                  </Elements>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GiftCardPayment