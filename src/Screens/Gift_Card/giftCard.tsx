import React, { useEffect, useState } from 'react'
import card_cover from "../../Assets/img/giftcard/card-cover.svg";
// import React from 'react'
import card_cover1 from "../../Assets/img/giftcard/VeteranMomSupportGroup.png";
import card_cover2 from "../../Assets/img/giftcard/New_Mom_Support_Group.png";
import card_cover3 from "../../Assets/img/giftcard/Daytime_Overnight_Infant_Care.png";
import card_cover4 from "../../Assets/img/giftcard/Nursing_Consult.png";
import card_cover5 from "../../Assets/img/giftcard/Remote_Lactation_Consult.png";
import card_cover6 from "../../Assets/img/giftcard/Prebaby_Bootcamp.png";
import card_cover7 from "../../Assets/img/giftcard/Private_Sleep_Consult.png";
import card_cover8 from "../../Assets/img/giftcard/Group_Sleep_Consultation.png";
import card_cover9 from "../../Assets/img/giftcard/Labor_and_Delivery_Prep.png";
import card_cover10 from "../../Assets/img/giftcard/Breastfeeding_basics.png";
import card_cover11 from "../../Assets/img/giftcard/Newbornessentials.png";
import card_cover12 from "../../Assets/img/giftcard/infant_and_child_CPR_with_first_aid.png";
import naps_gift_card from "../../Assets/img/giftcard/naps-gift-card-featured.png";
import support_img1 from "../../Assets/img/giftcard/alternative-gift.png";
import support_img2 from "../../Assets/img/giftcard/group-gift.png";
import support_img3 from "../../Assets/img/giftcard/moms_gift.png";
import support_img4 from "../../Assets/img/giftcard/parenting-stage.png";



import "./giftCard.scss";
import or_img from "../../Assets/img/giftcard/Or.svg";
import TextField from '@mui/material/TextField';
import GiftCardConfirmModel from './giftCardModel';
import { getApiGiftCardService } from '../../Service/giftCardService';
import { Input, InputAdornment } from '@mui/material';
import { emailRegex } from '../../Utils/Regex';
import {ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GIFTCARDPURCHASE } from '../../Routes/RouteConstent';

const GiftCard = () => {
    const [values, settValues] = useState<any>({})
    const [error, setError] = useState<any>({})
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any>([])
    const [selectedId, setSelectedId] = useState<any>([])
    const navigator: any = useNavigate()
    const handleChange = (e: any) => {
        let re = /^[-+]?[0-9]+\.[0-9]+$/;
        // if (e.target.name === "price") {
        //     let val = e.target.value
        //     if (val.match(re)) {
        //         setError({
        //             ...error,
        //             [e.target.name]: "Please enter non decimal value"
        //         })
        //         return
        //     } else {
        //         settValues({
        //             ...values,
        //             [e.target.name]: val
        //         })
        //     }
        // }
        // debugger
        if (e.target.name === "friend_name") {
            settValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
        if (e.target.name === "email") {
            settValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
        if (e.target.name === "price") {
            setSelectedId([])
            settValues({
                ...values,
                [e.target.name]: e.target.value,
                ["amount"]: "",
                ["title"]:"Gift Amount"
            })

        }
        setError({
            ...error,
            [e.target.name]: ""
        })
    }
    const handleConfirmGift = () => {    
        let re = /^[-+]?[0-9]+\.[0-9]+$/;
        if (!values?.friend_name || !values?.email || !emailRegex.test(values?.email) || !values?.price || values?.price?.match(re) || values?.price < 50) {
            let errors: any = {}
            if (!values?.friend_name) {
                errors.friend_name = "Please enter name"
            }
            if (!values?.email) {
                errors.email = "Please enter email"
            }
            if (!emailRegex.test(values?.email)) {
                errors.email = "Please enter valid email"
            }
            if (!values?.price) {
                errors.price = "Please enter amount"
            }
            if (values?.price?.match(re)) {
                errors.price = "Please enter non-decimal value"
            }
            if(values?.price < 50){
                errors.price = "Minimum amount should be $50"
            }
            setError(errors)

        } else {
            // setOpen(true)
            settValues({
                ...values,
                ["amount"]: "",
            })
            let obj:any = {
                value:values,
                type:"All"
            }
            navigator(GIFTCARDPURCHASE, { state:obj })
        }
    }

    const getGiftService = async () => {
        try {
            let res: any = await getApiGiftCardService()
            // debugger
            if (res?.data?.success) {
                setData(res?.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getGiftService()
    }, [])

    const handleSelected = (res: any) => {
        if (selectedId.includes(res?.id)) {
            let newValue = selectedId.filter((data: any) => data !== res?.unique_id)
            setSelectedId(newValue)
        } else {
            setSelectedId([res?.unique_id])
            settValues({
                ...values,
                ["id"]: res?.id,
                ["amount"]: res?.price_deduction || res?.amount,
                ["price"]: "",
                ["membership_id"]: res?.type === "membership" ? res?.id : "",
                ["service_id"]: res?.type === "service" ? res?.id : "",
                ["type"]: res?.type,
                ["title"]:res?.title
            })
            setError({
                ...error,
                ["amount"]: "",
            })
            setError({
                ...error,
                ["price"]: ""
            })
            return
        }
    }
    const handleAllConfirmGift = () => {
        if (!values?.friend_name || !values?.email || !emailRegex.test(values?.email) || !values?.amount) {
            let errors: any = {}
            if (!values?.friend_name) {
                errors.friend_name = "Please enter name"
            }
            if (!values?.email) {
                errors.email = "Please enter email"
            }
            if (!emailRegex.test(values?.email)) {
                errors.email = "Please enter valid email"
            }
            if (!values?.amount) {
                errors.price = ""
                toast.error("Please select card")
            }
            setError(errors)
            let errorClass: any = document.getElementsByClassName("error-scroll")
            errorClass[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            // setOpen(true)
            setError({
                ...error,
                ["amount"]: ""
            })
            let obj:any = {
                value:values,
                // type:"All"
            }
            navigator(GIFTCARDPURCHASE, { state:obj })
        }
    }
    console.log(values)
    // console.log(data)
    // console.log(selectedId)
    // console.log(error)
    return (
        <div>
            <ToastContainer />
            <GiftCardConfirmModel open={open} setOpen={setOpen} type="All" value={values} />
            <section className='giftcard-banner p-3'>
                <div className='container-fluid gft-banner mob-banner'>

                </div>
            </section>
            <section className='naps-gift-card p-3'>
                <div className='container-fluid'>
                    <div className='row my-2 my-md-5'>
                        <div className='col-lg-12 col-md-12'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12 col-md-12'>
                                        <p className='custom-lead text-center mx-0 mx-md-5'>Looking for something incredibly unique and thoughtful?
                                            Give the ultimate show of support with a customized gift card for NAPS services or membership. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='naps-gift-container row py-5'>
                        <div className='col-lg-12 my-0 my-md-3'>
                            <div className='container'>
                                <div className='row justify-content-center align-items-center'>
                                    <div className='col-lg-4'>
                                        <img src={naps_gift_card} className="img-fluid gift-feaatured_img" />
                                    </div>
                                    <div className='col-lg-6 ms-0 ms-md-5 naps-card-info mt-3 mt-md-0'>
                                        <h3 className=''>NAPS <span className="strong">Gift Cards</span></h3>
                                        <p className='pe-0 pe-md-5 m-0'>What has more staying power than baby gear, onesies, blankets and even diapers? A membership for complete parenting support and education from pregnancy through toddlerhood. We make it easy to help your loved one feel confident, empowered and supported. We offer many gift card options for memberships, lactation consults, sleep consults, mom support groups and more.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="gift-support row py-5">
                        <div className='col-lg-12'>
                            <div className='container padding-lt-rt'>
                                <div className='row'>
                                    <div className='col-lg-10 mx-auto my-5'>
                                        <h3 className='text-center gift-friend-caption'>The Gift of <span className="strong red">Support</span></h3>
                                    </div>
                                </div>

                                <div className='row justify-content-center align-items-center mb-5'>
                                    <div className='col-lg-5 order-1 order-md-0'>
                                        <h3 className='support-title mb-3'><span className='creative'>1.</span> Creative alternative to ‘typical’ shower gifts</h3>
                                        <p>A NAPS gift card stands out as a gift that supports the whole family: Mom, her baby and even her spouse.</p>
                                    </div>
                                    <div className='col-lg-5 ms-3 order-0 mb-3 mb-md-0 order-md-1'>
                                        <img src={support_img1} className='img-fluid gift-support-img' />
                                    </div>
                                </div>

                                <div className='row justify-content-center align-items-center my-5'>
                                    <div className='col-lg-5 mb-3 mb-md-0'>
                                        <img src={support_img2} className='img-fluid gift-support-img' />
                                    </div>
                                    <div className='col-lg-5 ms-3'>
                                        <h3 className='support-title m-0 mb-3'><span className='membership'>2.</span> Memberships make a great group gift idea</h3>
                                        <p>Looking to support your friend who’s expecting? A 1-year membership to Nurture by NAPS is a huge surprise for any virtual shower! </p>
                                    </div>
                                </div>

                                <div className='row justify-content-center align-items-center my-5'>
                                    <div className='col-lg-5 order-1 order-md-0'>
                                        <h3 className='support-title mb-3'><span className='lift'>3.</span> Lift up a mom in your life </h3>
                                        <p>The demands on mothers are intense right now. We help new (and experienced) moms get the answers and support they need.</p>
                                    </div>
                                    <div className='col-lg-5 ms-3 order-0 mb-3 mb-md-0 order-md-1'>
                                        <img src={support_img3} className='img-fluid gift-support-img' />
                                    </div>
                                </div>

                                <div className='row justify-content-center align-items-center my-5'>
                                    <div className='col-lg-5 mb-3 mb-md-0'>
                                        <img src={support_img4} className='img-fluid gift-support-img' />
                                    </div>
                                    <div className='col-lg-5 ms-3'>
                                        <h3 className='support-title mb-3'><span className='gift'>4.</span> Gift cards provide help for any parenting stage</h3>
                                        <p>Our membership platform and 1:1 consults (always with a Registered Nurse!) target challenges from newborn through toddlerhood. </p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <hr className="my-5"></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='gift-friend'>
                <div className='container'>
                    <div className='row mb-3'>
                        <div className='col-lg-10 mx-auto mb-5'>
                            <h3 className='text-center gift-friend-caption'>Gift Your <span className="strong teal">Friend</span></h3>
                        </div>
                        <div className='col-lg-10 mx-auto'>
                            <form className="step-form row">
                                <div className="form-group-m col-lg-12 mb-3">
                                    <div className="row">
                                        <div className="form-group birthday-box col-lg-6 col-md-6">
                                            <label>Friend's name</label>
                                            <input type="text" name="friend_name" className={`${!values.friend_name && "error-scroll"} form-control`} onChange={handleChange} id="" placeholder="Enter name" />
                                            <h4 className="error-msgtext">{error?.friend_name}</h4>
                                        </div>

                                        <div className="form-group col-lg-6 col-md-6">
                                            <label>Friend's email addresss</label>
                                            <input type="email" name="email" className={`${!values?.email && "error-scroll"} ${!emailRegex.test(values?.email) && "error-scroll"} form-control`} onChange={handleChange} id="" placeholder="Enter email" />
                                            <h4 className="error-msgtext">{error?.email}</h4>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='container-fluid pale-bg'>
                    <div className='row'>
                        <div className='col-lg-12 col-xl-12'>
                            <div className='container'>
                                <div className='row custom-gift-card mt-5'>
                                    <div className='col-lg-12 col-xl-12'>
                                        <div className='d-flex w-100 flex-column gift-card-container px-3 px-md-4 py-5 py-md-4'>
                                            <div className='gift-card-info'>
                                                <h3>Gift Card</h3>
                                                <p> Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                                <div className='d-flex amount-container align-items-center flex-column flex-md-row'>
                                                    <div className='amount-field-container me-0 me-md-2'>
                                                        <form>

                                                            <Input type='number' name='price' value={values?.price} onChange={handleChange} placeholder={'Amount'} className="amount-field"
                                                                startAdornment={<InputAdornment position="start"><span className='currency'>$</span></InputAdornment>}
                                                                style={{ display: "flex" }}
                                                            />
                                                            <h4 className="error-msgtext">{error?.price}</h4>
                                                        </form>
                                                    </div>
                                                    <div className='btn-container'>
                                                        <button className='btn send-gift mt-3 mt-md-0' onClick={handleConfirmGift}>Send Gift</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-5'>
                                    <div className='col-lg-12 text-center'>
                                        <img src={or_img} className='img-fluid mx-auto'></img>
                                    </div>
                                </div>

                                <div className='row'>
                                    <h2 className='text-center sec-title'>Membership</h2>
                                    <h4 className="error-msgtext">{error?.amount}</h4>
                                    <div className='upgrade-membership col-lg-12 col-xl-12 mb-3'>
                                        <div className='row'>

                                            {
                                                data?.membership?.map((Mdata: any, i: any) => (
                                                    <div className='col-lg-4 col-md-6 membership-col-container'>
                                                        <div className={`plan-option${i} member_plan monthy-plan mb-3 mb-md-0 ${selectedId.includes(Mdata?.unique_id) && "selected"}`} onClick={() => handleSelected(Mdata)}>
                                                            <div className="plan_head px-4 py-4">
                                                                <h3><span className="plan-nm">{Mdata?.title}</span> Membership</h3>
                                                            </div>
                                                            <div className="plan_content px-4 py-4">
                                                                <div className="Plan-price-main d-flex flex-column">
                                                                    {
                                                                        Number(Mdata?.percentage) !== 0 && <div className="plan-saving strong">Save {Mdata?.percentage}%</div>
                                                                    }
                                                                    {/* <div className="plan-saving strong">Save {Mdata?.percentage}%</div> */}
                                                                    <div className="plan-saving strong"></div>
                                                                    <div className="d-flex Plan-price">
                                                                        {Mdata?.base_price && <span className="pCost-old"> ${Mdata?.base_price}</span>}
                                                                        <span className="pCost" >{Mdata?.symbol}{Mdata?.amount} </span>
                                                                        <span className="membership-cycle" >/mo</span>
                                                                    </div>
                                                                    <div className="plan-price-Total">
                                                                        {/* <span className="strong">{Mdata?.symbol}{Mdata?.base_price}</span> {Mdata?.sub_title} */}
                                                                        <span className="strong">{Mdata?.symbol}{Mdata?.price_deduction}</span> {Mdata?.sub_title}
                                                                    </div>
                                                                </div>
                                                                <div className="plan-details-list">
                                                                    <p className='m-0'>
                                                                        All the benefits of a membership. Renews monthly, cancel any time.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                            {/* <div className='col-lg-4 col-md-6 membership-col-container'>
                                                <div className='plan-option1 member_plan monthy-plan mb-3 mb-md-0'>
                                                    <div className="plan_head px-4 py-4">
                                                        <h3><span className="plan-nm">3-Month </span> Membership</h3>
                                                    </div>
                                                    <div className="plan_content px-4 py-4">
                                                        <div className="Plan-price-main d-flex flex-column">
                                                            <div className="plan-saving" >Save 25%</div>
                                                            <div className="d-flex Plan-price">
                                                                <span className="pCost-old"> $1000</span>
                                                                <span className="pCost" >$97 </span>
                                                                <span className="membership-cycle" >/mo</span>
                                                            </div>
                                                            <div className="plan-price-Total">
                                                                <span className="strong">$97</span> Every 3 months
                                                            </div>
                                                        </div>
                                                        <div className="plan-details-list">
                                                            <p className='m-0'>
                                                                All the benefits of a membership. Renews monthly, cancel any time.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-md-6 membership-col-container'>
                                                <div className='plan-option2 member_plan monthy-plan '>
                                                    <div className="plan_head px-4 py-4">
                                                        <h3><span className="plan-nm">3-Month </span> Membership</h3>
                                                    </div>
                                                    <div className="plan_content px-4 py-4">
                                                        <div className="Plan-price-main d-flex flex-column">
                                                            <div className="plan-saving" >Save 25%</div>
                                                            <div className="d-flex Plan-price">
                                                                <span className="pCost-old"> $1000</span>
                                                                <span className="pCost" >$97 </span>
                                                                <span className="membership-cycle" >/mo</span>
                                                            </div>
                                                            <div className="plan-price-Total">
                                                                <span className="strong">$97</span> Every 6 months
                                                            </div>
                                                        </div>
                                                        <div className="plan-details-list">
                                                            <p className='m-0'>
                                                                All the benefits of a membership. Renews monthly, cancel any time.
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <hr className='my-5' />

                                <div className='row mb-3'>
                                    <h2 className='text-center sec-title'>Services</h2>

                                    {
                                        data?.services?.map((Sdata: any, i: any) => (
                                            <div className='col-lg-4 mb-4'>
                                                <div className={`card gift-card ${selectedId.includes(Sdata?.unique_id) && "selected"}`} onClick={() => handleSelected(Sdata)}>
                                                    <div className="card-inner">
                                                        <img src={Sdata?.image} className="image-fluid img-fluid w-100" />
                                                    </div>
                                                    <div className="card-body position-relative">
                                                        <div className="card-title"> <h5>${Sdata?.price}</h5></div>
                                                        <p className="card-text">{Sdata?.title}</p>
                                                        {/* <div className='button-container mb-1'>
                                                    <button className="btn primary-blue-small-btn-40">Send Gift</button>
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='row my-5'>
                                    <div className='col-lg-12 text-center'>
                                        <div className='button-container mb-1'>
                                            <button className="btn primary-blue-small-btn-40 px-5" onClick={handleAllConfirmGift} >Send Gift</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GiftCard
