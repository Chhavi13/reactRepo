import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getCoupenData } from '../../../../Service/membership';

const AppoinmentDetail = ({ serviceName, hostObj, data, setData, handleSubmit, handlePrev, setPrice,
    handleNext, loading, setStep, objName, addOn, setAddOn, setDateVisible, setSlots, price, setPriceDisplay, setPriceArry,
    setSelectClasses, setSelectSlots, setClassTime, priceDisplay }: any) => {
    let tax = 0;
    const [coupon, setCoupon] = React.useState("")
    const [couponLoading, setCouponLoading] = React.useState(false)
    const [coponErr, setCoponErr] = React.useState("");
    const [showDetail, setShowDetail] = useState<any>(false)
    const [couponSaving, setCouponSaving] = useState<any>(null)
    let [calculationTax, setCalculationTax] = useState<number>(data?.amount ? Number(data?.amount) * tax / 100 : 0)
    let user: any = localStorage.getItem("Nurture_user_data")
    user = JSON.parse(user)

    const handlePayment = () => {

        if (!data?.coupon_amount || !data?.tax || !data?.tax_amount || !data?.final_amount) {
            let misingField: any = {}
            if (!data?.coupon_amount) {
                misingField.coupon_amount = ""
            }
            if (!data?.tax_amount) {
                misingField.tax_amount = ""
            }
            if (!data?.final_amount) {
                misingField.tax_amount = ""
            }
            if (!data?.tax) {
                misingField.tax = ""
            }
            setData({
                ...data,
                ...misingField
            })
        } else {

            setData({
                ...data,
                ["tax"]: tax
            })
        }
        handleNext()
    }
    const finalAmount = () => {
        let tAmt = Number(data?.amount) * tax / 100 - Number(data?.amount);
        setData({
            ...data,
            ["tax_amount"]: tAmt
        })
    }
    const taxCalculateFun = () => {
        setCalculationTax(Number(data?.amount) * tax / 100)
    }
    useEffect(() => {

        finalAmount();
    }, [])



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
                    let discount = Number(resData?.amount) > Number(data?.total_ammount) ? Number(data?.total_ammount) : Number(resData?.amount)
                    let discountAmt = Number(data?.total_ammount) - discount;
                    if (discount > 0) {
                        setCouponSaving(discount)
                        setData({
                            ...data,
                            ["coupon_amount"]: discount,
                            ["tax_amount"]: discountAmt * tax / 100,
                            ["final_amount"]: (discountAmt * tax / 100) + discountAmt,
                            ["coupon_code"]: coupon
                        })
                    } else {
                        setCoponErr("Please enter a valid coupon")
                        // setCoupon("")
                        setData({
                            ...data,
                            ["coupon_code"]: ""
                        })
                    }
                    // setCouponSaving(discount)
                    // setData({
                    //     ...data,
                    //     ["coupon_amount"]: discount,
                    //     ["tax_amount"]: discountAmt * tax / 100,
                    //     ["final_amount"]: (discountAmt * tax / 100) + discountAmt,
                    //     // ["total_ammount"]: data?.,
                    //     ["coupon_code"]: coupon
                    // })
                }
                if (resData.type === "percentage") {
                    let Amount = data?.total_ammount
                    let discount = Number(resData?.amount)
                    let withDisc = Amount * discount / 100;
                    let calculationTaxes = (Amount - discount) * tax / 100;
                    setCouponSaving(withDisc)
                    setData({
                        ...data,
                        ["coupon_amount"]: withDisc,
                        ["tax_amount"]: calculationTaxes,
                        ["final_amount"]: calculationTaxes + (Amount - withDisc)
                    })
                }
                // setCouponId(resData.id)
            }
            setCouponLoading(false)
        } catch (error) {
            setCouponLoading(false)
        }
    }
    const disPlayTime = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        let NewDate = moment(converted_date).format("LT")

        return NewDate;
        // return converted_date
    }
    // console.log(coupon)
    console.log(data.slots)

    const convertDateToUtc = (data: any) => {
        const Cdate = new Date(data);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    const getFirstCapital = (strg: string) => {
        const arr = strg.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2;
    };
    let removeCoupon = () => {
        setCoupon("")
        setCouponSaving("")
        // setCouponId(null)
        // finalAmount()
        // taxCalculateFun()
        setData({
            ...data,
            ["final_amount"]: Number(data?.final_amount) + Number(data?.coupon_amount),
            ["coupon_amount"]: '',
            ["total_ammount"]: Number(data?.final_amount) + Number(data?.coupon_amount),
            ["coupon_code"]: ""
        })
    }
    useEffect(() => {
        setCouponSaving(data?.coupon_amount)
    }, [])
    // let percantageCalc = (val: any) => {
    //     if (data?.slots?.length > 1 && data?.slots?.length < 3) {
    //         let discount = data?.addtion_amount * 10 /100
    //         let withDisc = data?.addtion_amount - discount
    //         return withDisc

    //     }
    //     if (data?.slots?.length > 2 && data?.slots?.length<4) {
    //         let discount = data?.addtion_amount * 15 /100
    //         let withDisc = data?.addtion_amount - discount
    //         return withDisc
    //     }
    //     if (data?.slots?.length > 3) {
    //         let discount = data?.addtion_amount * 20 /100
    //         let withDisc = data?.addtion_amount - discount
    //         return withDisc
    //     }
    // }
    // useEffect(()=>{
    //     let per:any = percantageCalc(data)
    //     setData({
    //         ...data,
    //         ["per_amount"]:per,
    //         ["total_ammount"]: Number(data?.amount) + per
    //     })
    // },[])
    // console.log(percAmt)
    console.log("data slots", data?.slots)
    const handleChangeDate = () => {
        setStep(0)
        setData({})
        setAddOn([])
        setDateVisible([])
        setSlots([])
        setSelectClasses([])
        setSelectSlots([])
        setClassTime([])
        setPrice(hostObj?.price)
        setPriceDisplay({
            price: hostObj?.price,
            actualPrice: hostObj?.price
        })
        setPriceArry({})
    }
    console.log('data', data)
    console.log('price', price)
    return (
        <>
            <section className='step-container step3'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Your Appointment</h3>
                </div>

                <div className="consult-card-container selected-consult-container py-3 py-md-4 px-4 px-md-3">
                    <div className='d-flex justify-content-between flex-column flex-md-row'>
                        <div className='d-flex flex-column w-100'>
                            <div className='consult-date-time d-flex justify-content-between'>
                                <div>
                                    <h3 className='selected-consult-title'>{getFirstCapital(serviceName?.service_name)}</h3>
                                </div>
                                <div className='consult-cost'>
                                    {/* <span className='text-decoration-line-through me-1 total-actual-value'>${data?.all_price}</span>
                                    <h2 className='text-start'>${data?.total_ammount}</h2> */}
                                    <h2 className='text-start m-0 p-0'><span className="text-decoration-line-through actual-price me-2">{priceDisplay.price > priceDisplay.actualPrice && `$${priceDisplay?.price}`}</span><span className="strong reduced-price">${data?.total_ammount}</span></h2>
                                    {/* <h2 className='text-start'>${data?.total_ammount}</h2> */}
                                </div>
                            </div>
                            {/* <div className='consult-date-time d-flex flex-column flex-md-row my-2 my-md-3'> */}
                            <div className='consult-date'>{convertDateToUtc(objName?.time)}</div>
                            <div className='consult-time'><span className='strong'> {disPlayTime(objName?.time)} EST</span> <span className='author-name'>| by {objName?.calendar}</span> </div>
                            {/* </div> */}

                            <span className='mt-1'>Duration: {objName?.duration} Minutes</span>

                            <div className='change-date' onClick={handleChangeDate}>Change Date</div>
                        </div>
                    </div>
                    &nbsp;
                    {

                        data?.slots?.length > 0 && <div className='d-flex justify-content-between flex-column flex-md-row additional-class-container'>
                            <div className='d-flex flex-column'>
                                <div className='me-md-4 pe-md-5 me-2'>
                                    <h3 className='selected-consult-title'>+{data?.slots?.length} additional prenatal classes</h3>
                                </div>
                                <div className='Show-details' onClick={() => setShowDetail(true)}>{!showDetail && "Show details"}</div>

                                {showDetail &&
                                    data?.slots.map((val: any, i: any) => (
                                        <p className='mt-1 mb-0 p-0'>{addOn[i]?.name}  {val?.addition_class} {convertDateToUtc(val?.appointment_date_time)} {disPlayTime(val?.appointment_date_time)}</p>
                                    ))
                                }
                                <div className='Show-details' onClick={() => setShowDetail(false)}>{showDetail && "Show less"}</div>
                            </div>
                            <div className='additional-cost'>
                                <h2 className='text-start m-0 p-0'><span className="text-decoration-line-through actual-price me-2"></span><span className="strong reduced-price"></span></h2>
                            </div>
                        </div>

                    }
                    {/* <div className='d-flex justify-content-between flex-column flex-md-row additional-class-container'>
                        <div className='d-flex flex-column'>
                            <div className='me-md-4 pe-md-5 me-2'>
                                <h3 className='selected-consult-title'>+{data?.slots?.length - 1} additional prenatal classes</h3>
                            </div>
                            <div className='Show-details' onClick={() => setShowDetail(true)}>Show Details</div>
                            {showDetail && <p>15% OFF (two of the following: Labor Prep, Newborn Essentials, Breastfeeding Basics, Infant/Child CPR)</p>
                            }
                            <div className='Show-details' onClick={() => setShowDetail(false)}>Show less</div>
                        </div>
                        <div className='additional-cost'>
                            <h2 className='text-start m-0 p-0'><span className="text-decoration-line-through actual-price me-2">+${data?.addtion_amount}</span><span className="strong reduced-price">+${data?.addtion_amount}</span></h2>
                        </div>
                    </div> */}
                    <hr />
                    <div className='coupon-container'>
                        <div className="apply-couponcode mb-4">
                            <h6 className="apply-heading">Apply Coupon Code</h6>
                            <div className="position-relative">
                                <div className="d-flex justify-content-between">
                                    <input type="text" className="form-control" value={coupon || data?.coupon_code} onChange={(e: any) => setCoupon(e.target.value)} />
                                    <button className="btn secondary-teal-btn ms-2" onClick={coupenHandler} >{couponLoading ? <CircularProgress /> : "Apply"}</button></div><span className="error">{coponErr}</span>
                            </div>
                        </div>
                        {couponSaving && <div className="coupon-applied d-flex justify-content-between" >
                            <div className='d-flex justify-content-between flex-column'>
                                <h6>Coupon Applied</h6>
                                <p><span>${couponSaving}</span> Coupan saving</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <a onClick={removeCoupon} className="remove">Remove</a>
                            </div>

                        </div>}
                    </div>

                    <hr />
                    <div className='subtotal d-flex'>
                        <span className='ms-0 me-auto'><h2 className='m-0 p-0'>Subtotal</h2></span>
                        <span className='price me-0 ms-auto'><h2 className='m-0 p-0'>${couponSaving ? data?.final_amount : data?.total_ammount}</h2></span>
                    </div>
                </div>

                <div className="bill-details">
                    <h6>Billing Details</h6>
                    <ul className="first py-3 py-md-3 px-3 px-md-4">
                        <li className='d-flex justify-content-between consult-total'><span className="headingspan">Consult Total</span><span className="pricespan">${data?.total_ammount}</span></li>
                        <li className="d-flex justify-content-between coupon-discount "><span>Coupon Discount</span><span>- ${couponSaving ? couponSaving : 0}</span></li>
                        <li className="d-flex justify-content-between"><span>Taxes &amp; Charges</span><span>+${calculationTax}</span></li>
                    </ul>

                    <ul className="pay-list px-3 px-md-4">
                        <li className="d-flex justify-content-between"><span className="payspan">To Pay</span><span className="pay-total">${couponSaving ? data?.final_amount : data?.total_ammount}</span></li>
                    </ul>
                </div>

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn' onClick={handlePrev} >Previous</button>
                    {
                        data?.final_amount === 0 ?
                            <button className='primary-blue-small-btn next' disabled={loading} onClick={() => handleSubmit()}>{loading ? <CircularProgress /> : "Confirm"}</button> :
                            <button className='primary-blue-small-btn next' onClick={handlePayment}>Next</button>
                    }
                    {/* <button className='primary-blue-small-btn next' onClick={handlePayment}>Next</button> */}
                </div>
            </section>


        </>
    )
}

export default AppoinmentDetail