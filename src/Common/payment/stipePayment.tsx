import { CreditCard } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useStripe, useElements, PaymentElement, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, Elements } from '@stripe/react-stripe-js';
import React, { useRef, useState } from "react";
import Lock from "../../Assets/img/lock.svg";
import { StripePayment } from "../../Service/payment";
import { ToastContainer, toast } from 'react-toastify';
// import CongratsModel from './congratsModel';
import CongratsModel from '../../Screens/Membership/congratsModel';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { useDispatch } from 'react-redux';
import { buyCourseApi } from '../../Service/Course';
import Congratulation from '../../Screens/Courses/congratulationPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { COURSE, COURSEVIEW } from '../../Routes/RouteConstent';
import { buyGiftCard } from '../../Service/giftCardService';
import GiftCardModel from '../../Screens/Gift_Card/giftCardModel';

export function StripeForm({ membership, giftPay, type, typeGiftAmt, callBack = {} }: any) {
    const dispatch = useDispatch()
    const location = useLocation();
    console.log('location', location);
    let user_id: any = localStorage.getItem("Nurture_user_data")
    user_id = JSON.parse(user_id).id
    const stripe = useStripe();
    const elements: any = useElements();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<any>({})
    const [error, setError] = useState<any>({})
    const [congrats, setCongrats] = useState<boolean>(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [giftpop, setGiftpop] = useState<boolean>(false)


    const Navigate = useNavigate()
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let name = e.target.name;
        let values = e.target.value;
        setError({
            ...error,
            [name]: ""
        })

        setValue({
            ...value,
            [name]: values
        })

    }

    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.

        event.preventDefault();
        let allField = document.getElementsByClassName("error-input")
        try {
            let cardNumber = elements.getElement(CardNumberElement)
            let cvcNumber = elements.getElement(CardCvcElement)
            let expNumber = elements.getElement(CardExpiryElement)

            if (!value?.first_name || !value?.last_name || !value.zip_code ||
                cardNumber?._implementation?._empty || cvcNumber?._implementation?._empty || expNumber?._implementation?._empty

            ) {
                let errors: any = {}
                if (!value?.first_name) {
                    errors.first_name = "First name is required"
                }
                if (!value?.last_name) {
                    errors.last_name = "Last name is required"
                }
                if (!value.zip_code) {
                    errors.zip_code = "zip code is required"
                }
                if (cardNumber?._implementation?._empty) {
                    errors.card = "Please enter the credit card number"
                }
                if (cvcNumber?._implementation?._empty) {
                    errors.cvc = "Please enter the cvv code"
                }
                if (expNumber?._implementation?._empty) {
                    errors.exp = "Please enter the expiration of your card"
                }
                await setError(errors)
                allField[0]?.scrollIntoView({ behavior: "smooth", block: "center" })
                return;
            }
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
                toast.error(result.error.message)
                setLoading(false)
            } else {
                // Your customer will be redirected to your `return_url`. For some payment
                // methods like iDEAL, your customer will be redirected to an intermediate
                // site first to authorize the payment, then redirected to the `return_url`.
                let data;
                let res: any;
                let response: any;

                if (type === "member") {
                    data = {
                        token: result.paymentMethod.id,
                        user_id: user_id,
                        first_name: value?.first_name,
                        last_name: value?.last_name,
                        zip_code: value?.zip_code,
                        amount: membership?.amount,
                        total_amount: membership?.total_amount,
                        tax: membership?.tax,
                        membership_id: membership?.membership_id,
                        coupon_amount: membership?.coupon_amount,
                        coupon_id: membership?.coupon_id,
                        tax_amount: membership?.tax_amount
                    }
                    res = await StripePayment(data)

                }
                if (type === "course") {

                    data = {
                        token: result.paymentMethod.id,
                        total_amount: membership?.total_amount,
                        coupon_amount: membership?.coupon_amount,
                        user_id: user_id,
                        first_name: value?.first_name,
                        last_name: value?.last_name,
                        zip_code: value?.zip_code,
                        course_id: membership?.course_id,
                        coupon_id: membership?.coupon_d,
                        tax: membership?.tax,
                        amount: membership?.amount
                    }
                    res = await buyCourseApi(data)

                }
                if (type === "consult") {
                    callBack(result.paymentMethod.id)
                    // setLoading(false)
                    return
                }


                if (giftPay?.type === "membership" || "service" || "") {
                    let param = {
                        type: giftPay?.type || typeGiftAmt,
                        token: result.paymentMethod.id,
                        user_id: user_id,
                        first_name: value?.first_name,
                        last_name: value?.last_name,
                        zip_code: value?.zip_code,
                        friend_name: giftPay?.friend_name,
                        email: giftPay?.email,
                        amount: giftPay?.amount || giftPay?.price,
                        membership_id: giftPay?.membership_id,
                        service_id: giftPay?.service_id
                    }
                    response = await buyGiftCard(param)
                    if (response.data.success) {
                        setGiftpop(true)
                    }
                }

                if (res.data.success) {

                    dispatch(getCourse({ user_id: user_id }))
                    dispatch(getFavCourse({ user_id: user_id }))
                    if (type === "course") {
                        setCongrats(true);
                        callBack(result.paymentMethod.id, membership?.course_id)
                        return

                        // setTimeout(() => {
                        //     Navigate(COURSEVIEW + membership?.course_id)
                        // }, 10000);

                    } else {
                        if (type === "member") {
                            localStorage.setItem("Nurture_user_data", JSON.stringify(res?.data?.data));
                        }
                        setCongrats(true)
                    }


                }
                setLoading(false)
            }
        } catch (error: any) {
            setLoading(false)
        }
    };

    const CardOnChange = (e: any) => {

        if (e.empty) {
            setError({
                ...error,
                ["card"]: "credit card number is required"
            })

        }

        if (!e.complete) {
            setError({
                ...error,
                ["card"]: "enter a valid card number"
            })
        }

        if (!e.empty && e.complete) {

            setError({
                ...error,
                ["card"]: ""
            })
        }
    }

    const cvcOnChange = (e: any) => {

        if (e.complete === false) {
            setError({
                ...error,
                ["cvc"]: "Please enter proper cvv code"
            })
        }

        if (e.empty) {
            setError({
                ...error,
                ["cvc"]: "cvv is required"
            })
        }
        if (!e.empty && e.complete) {
            setError({
                ...error,
                ["cvc"]: ""
            })
        }
    }
    const expOnChange = (e: any) => {


        if (e.complete === false) {
            setError({
                ...error,
                ["exp"]: "Please enter proper expiration date"
            })
        }
        if (e.empty) {
            setError({
                ...error,
                ["exp"]: "expiration date is required"
            })

        }

        if (!e.empty && e.complete) {
            setError({
                ...error,
                ["exp"]: ""
            })
        }
    }

    function courseModal(type1: any, type2: any) {

        setModalShow(false)

    }
    console.log('dsdfsdafsfsdf', giftpop)
    return (
        <>
            <ToastContainer />
            <CongratsModel text={"Thanks for your Purchase!"} type={membership?.type || type} open={congrats} setOpen={setCongrats} membership_id={membership?.course_id} />
            <Congratulation
                show={modalShow}
                onHide={courseModal}
            />
            <GiftCardModel text={"Wohoo! You successfully gifted a gift card to your friend."} open={giftpop} setOpen={setGiftpop} />
            {/* <PaymentElement /> */}
            {/* <CardElement/> */}
            {/* <CreditCard/> */}


            <div className="form-group col-md-6 mb-3">
                <label>First Name</label>
                <input type="text" name="first_name"
                    value={value?.first_name}
                    className={`${error?.first_name && "error-input"} form-control`}
                    onChange={handleChange} />
                <p className='error'>{error?.first_name} </p>
            </div>
            <div className="form-group col-md-6 mb-3">
                <label>Last Name</label>
                <input type="text" name="last_name"
                    value={value?.last_name}
                    className={`${error?.last_name && "error-input"} form-control`}
                    onChange={handleChange} />
                <p className='error'>{error?.last_name} </p>

            </div>
            <div className="form-group col-md-12 mb-3">
                <label> Credit card number</label>
                <CardNumberElement onChange={CardOnChange} className={`${error?.card && "error-input"} form-control stripe_input`} />
                <p className='error'>{error?.card} </p>
            </div>
            <div className="form-group col-md-4 mb-3">
                <label>Expiration date</label>
                <CardExpiryElement onChange={expOnChange} className={`${error?.exp && "error-input"} form-control stripe_input`} />
                <p className='error'>{error?.exp} </p>
            </div>
            <div className="form-group col-md-4 mb-3">
                <label>CVV</label>
                <CardCvcElement onChange={cvcOnChange} className={`${error?.cvc && "error-input"} form-control stripe_input`} />
                <p className='error'>{error?.cvc} </p>
            </div>
            <div className="form-group col-md-4 mb-3">
                <label>Zip Code</label>
                <input type="number" name="zip_code"
                    value={value?.zip_code}
                    className={`${error?.zip_code && "error-input"} form-control`}
                    onChange={handleChange} />
                <p className='error'>{error?.zip_code} </p>

            </div>
            <div className="col-md-12 lock-section pt-3 ">
                <img src={Lock} className="me-1" />
                Your transaction is secure
            </div>
            {/* <div className="col-md-12 pt-4 save-checkbox">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                        className="custom-control-input"
                        name="is_saveCard"
                        onChange={handleChange}
                        checked={value.is_saveCard === true}
                        id="customChecksave" />
                    <label className="custom-control-label" htmlFor="customChecksave">Save this card for easier use in the future</label>
                </div>
            </div> */}
            <div className='col-md-12 col-lg-12'>
                <button className="btn primary-blue-btn mt-3 mb-5" disabled={loading || !stripe} onClick={handleSubmit}>{loading ? <CircularProgress /> : "Confirm"}</button>
            </div>

            {/* <button disabled={!stripe} onClick={handleSubmit}>Submit</button> */}
        </>
    )
}