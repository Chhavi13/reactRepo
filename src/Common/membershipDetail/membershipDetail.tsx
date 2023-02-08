import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { BUYCOURSE } from '../../Routes/RouteConstent';
import { getCoupenData } from '../../Service/membership';
import "./membershipDetail.scss";
import parse from 'html-react-parser';

const MembershipDetail = ({ data, handleNext, loading, setLoading, type }: any) => {
    let tax = 0;
    let Navigate = useNavigate()
    const [coupon, setCoupon] = useState<string>("")
    const [couponLoading, setCouponLoading] = useState(false)
    const [couponSaving, setCouponSaving] = useState<any>(null)
     let [calculationTax, setCalculationTax] = useState<number>(data?.amount ? Number(data?.amount) * tax / 100 : 0)
    const [finalAmt, setFinalAmt] = useState(0)
    const [couponId, setCouponId] = useState<any>(null)
    const [couponErr, setCoponErr] = useState<any>("")


    const finalAmount = () => {
        if (type === "member") {
            data?.price_deduction ? setFinalAmt((Number(data?.price_deduction) * tax / 100) + Number(data?.price_deduction)) :
                setFinalAmt((Number(data?.amount) * tax / 100) + Number(data?.amount))
        } else {

            setFinalAmt((Number(data?.amount) * tax / 100) + Number(data?.amount))
        }
    }
    const taxCalculateFun = () => {
        setCalculationTax(Number(data?.amount) * tax / 100)
    }
    useEffect(() => {

        finalAmount();
    }, [])


    let user: any = localStorage.getItem("Nurture_user_data")
    user = JSON.parse(user)

    let coupenHandler = async () => {
        try {
            if (!coupon) return;
            setCouponLoading(true)
            setCoponErr("")
            let res: any = await getCoupenData({ coupon_code: coupon, user_id: user.id })
            let isSucess = res.data.success;
            let msgArray = res.data.message;
            let msg: any = "";

            for (let i = 0; i < msgArray.length; i++) {
                msg += msgArray[i]
            }
            if (!isSucess) {
                setCoponErr(msg)
            }
            if (isSucess) {
                let resData = res.data.data;
                if (resData.type === "amount") {
                    if (type === "member") {
                        if (data?.price_deduction) {
                            // setCouponSaving(resData?.amount)
                            let discount = Number(resData?.amount) > Number(data?.price_deduction) ?Number(data?.price_deduction):Number(resData?.amount)
                            let discountAmt = Number(data?.price_deduction) - discount;    
                            setCouponSaving(discount)    
                            setCalculationTax(discountAmt * tax / 100)
                            // setFinalAmt((discountAmt * tax / 100) + Number(data?.amount))
                            setFinalAmt((discountAmt * tax / 100) + discountAmt)                            
                        } else {
                            setCouponSaving(resData?.amount) 
                            let discount = Number(resData?.amount) > Number(data?.price_deduction) ?Number(data?.price_deduction):Number(resData?.amount)                           
                            let discountAmt = Number(data?.amount) - discount;
                            setCalculationTax(discountAmt * tax / 100)
                            // setFinalAmt((discountAmt * tax / 100) + Number(data?.amount))
                            setFinalAmt((discountAmt * tax / 100) + discountAmt)                            
                        }
                    } else {

                        setCouponSaving(resData?.amount)
                        let discount = Number(resData?.amount) > Number(data?.amount) ?Number(data?.amount):Number(resData?.amount)
                        let discountAmt = Number(data?.amount) - discount;
                        setCalculationTax(discountAmt * tax / 100)
                        // setFinalAmt((discountAmt * tax / 100) + Number(data?.amount))
                        setFinalAmt((discountAmt * tax / 100) + discountAmt)
                    }
                }
                if (resData.type === "percentage") {
                   
                    if (type === "member") {
                        if (data?.price_deduction) {
                            let Amount = Number(data?.price_deduction)
                            let discount = Number(resData?.amount)
                            let withDisc = Amount * discount / 100;
                            let calculationTaxes = (Amount - discount) * tax / 100;
                            setCouponSaving(withDisc)
                            setCalculationTax(calculationTaxes)
                            setFinalAmt(calculationTaxes + (Amount - withDisc))
                        } else {
                            let Amount = Number(data?.amount)
                            let discount = Number(resData?.amount)
                            let withDisc = Amount * discount / 100;
                            let calculationTaxes = (Amount - discount) * tax / 100;
                            setCouponSaving(withDisc)
                            setCalculationTax(calculationTaxes)
                            setFinalAmt(calculationTaxes + (Amount - withDisc))
                        }
                    } else {

                        let Amount = Number(data?.amount)
                        let discount = Number(resData?.amount)
                        let withDisc = Amount * discount / 100;
                        let calculationTaxes = (Amount - discount) * tax / 100;
                        setCouponSaving(withDisc)
                        setCalculationTax(calculationTaxes)
                        setFinalAmt(calculationTaxes + (Amount - withDisc))
                    }
                }
                setCouponId(resData.id)
            }
            setCouponLoading(false)
        } catch (error) {
            setCouponLoading(false)
        }
    }
    let removeCoupon = () => {
        setCoupon("")
        setCouponSaving("")
        setCouponId(null)
        finalAmount()
        taxCalculateFun()
    }
    let handlePayment = () => {
        if (type === "course") {
            let obj = {
                course_id: data?.id,
                coupon_id: couponId,
                tax,
                amount: data?.amount,
                total_amount: finalAmt,
                coupon_amount: couponSaving,
                tax_amount: calculationTax
            }
            Navigate(BUYCOURSE, { state: { obj } })
            
        } else {
            let amt;
            if (data?.price_deduction) {
                amt = data?.price_deduction;
            } else {
                amt = data.amount;
            }
            let obj = {


                amount: amt,
                total_amount: finalAmt,
                tax,
                membership_id: data.id,
                coupon_amount: couponSaving,
                coupon_id: couponId,
                tax_amount: calculationTax
            }

            handleNext(obj)
        }
    }

    return (
        <div>
            <div>
                <ToastContainer />
                <div className="step-innercontent detail-step4">
                    <div>
                        <h3>{type === "member" ? "Membership" : "Course"} <span className="strong">Details</span></h3>
                        {type === "member" && <p className="pb-3 text-center">You will be charged only after the 7-day free trial ends.</p>}
                        <div className="inner-monthdiv">
                            <div className='monthly-membership'>
                                <div className='payment-details' style={{ border: `1px solid ${data?.color_code}` }}>
                                    <div className="monthbox">
                                        <div className='monthbox-head' style={{ backgroundColor: `${data?.color_code}` }}>
                                            <div className='d-flex justify-content-between align-items-center membership-nm' >
                                                <h4>{data?.title} Membership</h4>
                                                <div className="d-flex justify-content-end Plan-price flex-column">
                                                    <div>
                                                        {/* <span className="pCost-old">${data?.base_price} </span> */}
                                                        {/* <span className="pCost">${type === "member" ? data?.price_deduction ? data?.price_deduction : data?.amount : data?.amount} </span><span className="membership-cycle">{type === "member" && "/mo"}</span> */}
                                                        <span className="pCost">${type === "member" ? data?.amount : data?.amount} </span><span className="membership-cycle">{type === "member" && "/mo"}</span>
                                                    </div>
                                                    <div>
                                                      {type === "member"?<p className='text-end'><span className='strong'>${type === "member" ? data?.price_deduction ? data?.price_deduction : data?.amount : data?.amount} </span> {data?.sub_title}</p>:""}  
                                                    </div>
                                                </div>
                                                {/* <p className="pricepara">${data?.amount}</p> */}
                                            </div>
                                        </div>

                                        <div className='monthbox-details'>
                                            <p>{parse(String(data?.description))}</p>
                                        </div>

                                        {/* <h4>{data?.title}</h4>
                                        <p className="pricepara">${data?.amount}</p> */}
                                        {/* <p>Monthly access to our members-only classes, Q&As, nursing forum and more! You will be charged $97 each month for access to our full membership program and all member perks.
                                        Enjoy special discounts on lactation and sleep consults. This subscription renews every month.</p> */}
                                        {/* <p>{data?.description}</p> */}
                                    </div>
                                    <div className="apply-couponcode">
                                        <h6 className="apply-heading">Apply Coupon Code</h6>
                                        <div className="position-relative">
                                            <div className='d-flex justify-content-between'><input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="form-control" />
                                                <button className="btn primary-blue-btn ms-2" disabled={couponLoading || couponId} onClick={coupenHandler} style={{ background: `${data?.color_code}` }}>{couponLoading ? <CircularProgress size="1rem" /> : couponId ? "applied" : "Apply"}</button></div>
                                            <span className="error">{couponErr}</span>
                                        </div>
                                    </div>
                                    {/* <div className="apply-couponcode">
                                        <h6 className="apply-heading">Apply Coupon Code</h6>
                                        <div className="position-relative">
                                            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} className="form-control" />
                                            <button className="btn" disabled={couponLoading || couponId} onClick={coupenHandler}>{couponLoading ? <CircularProgress size="1rem" /> : couponId ? "applied" : "apply"}</button>
                                            <span className="error">{couponErr}</span>
                                        </div>
                                    </div> */}
                                    {couponSaving && <div className="coupon-applied d-flex justify-content-between">
                                        <div className='d-flex justify-content-between flex-column'>
                                            <h6>Coupon Applied</h6>
                                            <p><span>${couponSaving}</span> Coupan saving</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <a onClick={removeCoupon} className="">Remove</a>
                                        </div>

                                    </div>}
                                </div>
                                <div className="bill-details" style={{ border: `1px solid ${data?.color_code}` }}>
                                    <h6 style={{ backgroundColor: `${data?.color_code}` }}>Billing Details</h6>
                                    <ul className="first">
                                        <li>
                                            <span className="headingspan">{type !== "course" ? "Consult" : "Course"}  Total</span>
                                            <span className="pricespan">${type === "member" ? data?.price_deduction ? data?.price_deduction : data?.amount : data?.amount}</span>
                                        </li>
                                        <li className="inner-spans coupon-discount">
                                            <span>Coupon Discount</span>
                                            <span>- ${couponSaving ? couponSaving : "0"}</span>
                                        </li>
                                        <li className="inner-spans">
                                            <span>Taxes & Charges</span>
                                            <span>+${calculationTax}</span>
                                        </li>
                                    </ul>
                                    <ul className="pay-list">
                                        <li>
                                            <span className="payspan">Total:</span>
                                            <span className="pay-total">${finalAmt}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn primary-blue-btn mt-3 mb-5" onClick={handlePayment} style={{ backgroundColor: `${data?.color_code}` }}>Confirm & Pay</button>
                </div>
            </div>
        </div>
    )
}

export default MembershipDetail