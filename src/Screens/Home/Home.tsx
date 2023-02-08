import React, { useEffect, useMemo, useState } from 'react';
import "./Home.scss";

import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import Form from './Form';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CongratsModel from '../Membership/congratsModel';
import { CONSULTS, DATECONSULTS, ILACATATIONCONSULTS, LIVEWEBINAR, LOGIN, MEMBERSHIP, MULTIPLECLASS, NURSECONSULTS, PODCASTQUESTION, PREBABYBOOTCAMP, PRIVATECLASS, PRIVATECLASS2, PRIVATESLEEPCONSULT, SIGNUP, SPONSORSHIP, VIRTUALCLASSCONSULTS } from '../../Routes/RouteConstent';
import { getConsultApi } from '../../Service/Cousult.service';
import { breast_feeding_consult, initial_lactation_consult, nursing_consult } from '../../Utils/constant';




const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");



const Home = () => {
    const Navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [cousultData, setCousultData] = useState([])
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)
    let is_email: any = localStorage.getItem("Nurture_is_email_verify")
    is_email = JSON.parse(is_email)


    const options = useMemo(
        () => ({
            style: {
                base: {
                    //   fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#727272"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        []
    );
    const getConsultsList = async () => {
        try {
            let res: any = await getConsultApi()
            if (res.data.success) {
                setCousultData(res.data.data)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getConsultsList()
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    return (
        <div className='row home my-5'>
            <div className='col-lg12'>
                <div className='d-flexalign-items-center'>
                    <div className='col-lg-12'>
                        {/* <div className=''> */}
                        <div className='home-text'>
                            <h1>Welcome to <b> Nurture by Naps </b> </h1>
                            <p>Total support,
                                from pregnancy through childhood</p>
                        </div>

                        {/* <Elements stripe={stripePromise} >
                    <Form />
                </Elements> */}


                        {/* </div> */}
                    </div>
                    <div className='col-lg-12'>
                        <div className='d-flex justify-content-center mb-2'>
                            {/* <Button onClick={()=>setOpen(true)}>Popup</Button> */}
                            {!user?.is_membership  && <Button className="mx-2" onClick={() => Navigate(MEMBERSHIP)}>Membership</Button>}
                            {!user &&
                                <>
                                    <Button className="mx-2" onClick={() => Navigate(LOGIN)}>Login</Button>
                                    <Button className="mx-2" onClick={() => Navigate(SIGNUP)}>Signup</Button>
                                </>
                            }                           

                        </div>

                        {(user && user?.is_email_verify == 1) && <div className='d-flex justify-content-center flex-wrap '>

                            <Button className="mx-2 mb-2" onClick={() => Navigate(CONSULTS, { state: { param: "service_1" } })}>30 minute prospective client call</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(NURSECONSULTS, { state: { param: nursing_consult } })}>30 minute nurse consultation</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(NURSECONSULTS, { state: { param: initial_lactation_consult } })}>Remote lactation consult </Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(DATECONSULTS, { state: { param: breast_feeding_consult } })}>Virtual Breastfeeding Support Group</Button>
                            {/* <Button className="mx-2 mb-2" onClick={() => Navigate(NURSECONSULTS)}>Breastfeeding Virtual Classes </Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(SIGNUP)}>Breastfeeding Private Class </Button> */}
                            <Button className="mx-2 mb-2" onClick={() => Navigate(MULTIPLECLASS, { state: { param: "service_5" } })}>Veteran Mom Support Group</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(MULTIPLECLASS, { state: { param: "service_6" } })}>Working Mom Support Group</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(MULTIPLECLASS, { state: { param: "service_7" } })}>New Mom Support Group </Button>

                            <Button className="mx-2 mb-2" onClick={() => Navigate(MULTIPLECLASS, { state: { param: "service_8" } })}>Group Sleep Consultation</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(VIRTUALCLASSCONSULTS, { state: { param: "service_9" } })}>Breastfeeding basics</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(VIRTUALCLASSCONSULTS, { state: { param: "service_10" } })}> Infant and child CPR with first aid</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(VIRTUALCLASSCONSULTS, { state: { param: "service_11" } })}>Newborn essentials</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(VIRTUALCLASSCONSULTS, { state: { param: "service_12" } })}>Labor and Delivery Prep</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(PRIVATECLASS, { state: { param: "CPR and first aid private class" } })}>Infant and child CPR with first aid</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(PRIVATECLASS2, { state: { param: "Initial lactation consult private class" } })}>Initial Lactation Private Class</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(PREBABYBOOTCAMP, { state: { param: "service_13" } })}>Pre Baby Bootcamp</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(PRIVATESLEEPCONSULT, { state: { param: "service_14" } })}>Private Sleep Consultation</Button>

                            <Button className="mx-2 mb-2" onClick={() => Navigate(PODCASTQUESTION, { state: { param: "service_14" } })}>Podcast Question Submission</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(SPONSORSHIP, { state: { param: "service_14" } })}>Sponsorship & Collabs</Button>
                            <Button className="mx-2 mb-2" onClick={() => Navigate(LIVEWEBINAR, { state: { param: "service_14" } })}>Live Webinars & Events</Button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home
