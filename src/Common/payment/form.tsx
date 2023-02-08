import { CreditCard } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useStripe, useElements, PaymentElement, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import React, { useState } from "react";
import Lock from "../../Assets/img/lock.svg";
import { StripePayment } from "../../Service/payment";
import { ToastContainer, toast } from 'react-toastify';
// import CongratsModel from './congratsModel';
import CongratsModel from '../../Screens/Membership/congratsModel';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { useDispatch } from 'react-redux';

export function FormSripe({ membership }: any) {

    const dispatch = useDispatch()
    let user_id: any = localStorage.getItem("Nurture_user_data")
    user_id = JSON.parse(user_id).id
    const stripe = useStripe();
    const elements: any = useElements();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<any>({})
    const [error, setError] = useState<any>({})
    const [congrats, setCongrats] = useState<boolean>(false)

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let name = e.target.name;
        let values = e.target.value;
        if (e.target.type === "checkbox") {
            setValue({
                ...value,
                [name]: e.target.checked
            })
            return;
        }
        setValue({
            ...value,
            [name]: values
        })

    }

    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        try {
            if (!value?.first_name || !value?.last_name || !value.zip_code) {
                // let errors: any = {}
                // if (!value?.first_name) {
                //     errors.first_name = "First name is required"
                // }
                // if (!value?.last_name) {
                //     errors.last_name = "Last name is required"
                // }
                // if (!value.zip_code) {
                //     errors.zip_code = "zip code is required"
                // }
                // setError(errors)
                toast.error("All field is mandatory")
                return;
            }
            console.log("all elements", elements)
            if (!stripe || !elements) {
                // Stripe.js has not yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
            }
            const paymentMethodObj: any = {
                type: 'card',
                card: elements.getElement(CardNumberElement),

                // billing_details: {
                //     name: "Test",
                //     user_id:5
                // },
            };
            setLoading(true)
            const result = await stripe.createPaymentMethod(paymentMethodObj);

            if (result.error) {
                // Show error to your customer (for example, payment details incomplete)
                // console.log(result.error.message);
                toast.error(result.error.message)
                setLoading(false)
            } else {
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
                let data = {
                    token: result.paymentMethod.id,
                    user_id: user_id,
                    first_name: value?.first_name,
                    last_name: value?.last_name,
                    zip_code: value?.zip_code,
                    is_saveCard: value?.is_saveCard,
                    amount: membership?.amount,
                    total_amount: membership?.total_amount,
                    tax: membership?.tax,
                    membership_id: membership?.membership_id,
                    coupon_amount: membership?.coupon_amount,
                    coupon_id: membership?.coupon_id,
                    tax_amount: membership?.tax_amount
                }


                let res: any = await StripePayment(data)
                if (res.data.success === true) {
                    dispatch(getCourse({ user_id: user_id }))
                    dispatch(getFavCourse({ user_id: user_id }))
                    setCongrats(true)
                }
                setLoading(false)
            }
        } catch (error: any) {
            setLoading(false)
        }
    };
    // "user_id": "5",
    // "first_name": "Test",
    // "last_name": "Test2",
    // "card_number" : "345678990",
    // "month": "12",
    // "year": "2027",
    // "cvc": "123",
    // "token": "hgfdhfhdfhhjhhhj",
    // "membership_id": 1,
    // "coupon_id":1,
    // "gst":12,
    // "amount": 45

    
    console.log(stripe)
    return (
        <>
            <ToastContainer />
            <CongratsModel open={congrats} setOpen={setCongrats} />
            {/* <PaymentElement /> */}
            {/* <CardElement/> */}
            {/* <CreditCard/> */}
            
                
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" name="first_name"
                            value={value?.first_name}
                            className="form-control"
                            onChange={handleChange} />
                        <p className='error'>{error.first_name} </p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" name="last_name"
                            value={value?.last_name}
                            className="form-control"
                            onChange={handleChange} />
                        <p className='error'>{error.last_name} </p>

                    </div>
                    <div className="form-group col-md-12">
                        <label> Credit card number</label>
                        <CardNumberElement className='form-control stripe_input' />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Expiration date</label>
                        <CardExpiryElement className='form-control stripe_input' />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Cvv</label>
                        <CardCvcElement className='form-control stripe_input' />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Zip Code</label>
                        <input type="text" name="zip_code"
                            value={value?.zip_code}
                            // accept="number"
                            className="form-control" onChange={handleChange} />
                        <p className='error'>{error.zip_code} </p>

                    </div>
                    <div className="col-md-12 lock-section pt-3">
                        <img src={Lock} />
                        <a href="">Your transaction is secure</a>
                    </div>
                    <div className="col-md-12 pt-4 save-checkbox">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox"
                                className="custom-control-input"
                                name="is_saveCard"
                                onChange={handleChange}
                                checked={value.is_saveCard === true}
                                id="customChecksave" />
                            <label className="custom-control-label" htmlFor="customChecksave">Save this card for easier use in the future</label>
                        </div>
                    </div>
                    <button className="btn next-button" disabled={loading || !stripe} onClick={handleSubmit}>{loading ? <CircularProgress /> : "Confirm"}</button>
            
            {/* <button disabled={!stripe} onClick={handleSubmit}>Submit</button> */}
        </>
    )
}