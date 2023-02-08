import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { getCoupenData } from '../../../../Service/membership';

function AppoinmentDetail({host, objName, data, setData, handleSubmit, handlePrev, handleNext, loading, price,setPrice, setStep, setDateVisible, dateVisible,setSlots,setAddOn,setSelectClasses,setSelectSlots,setClassTime }: any) {

    const [coupon, setCoupon] = useState("")
    const [couponLoading, setCouponLoading] = useState(false)
    const [coponErr, setCoponErr] = useState("");
    const [showDetail, setShowDetail] = useState<any>(false)
    const [couponSaving, setCouponSaving] = useState<any>(null)
    const [showClass, setShowClass] = useState<any>(false)

    const disPlayTime = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("LT")
    }
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
    let tax = 0;
    console.log("data", data)

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
                    //     ["coupon_amount"]: resData?.amount,
                    //     ["tax_amount"]: discountAmt * tax / 100,
                    //     ["final_amount"]: (discountAmt * tax / 100) + discountAmt,
                    //     ["coupon_code"]: coupon
                    // })
                }
                if (resData.type === "percentage") {
                    // let Amount = Number(data?.amount)
                    let Amount = Number(data?.amount) < data.total_ammount?data.total_ammount:Number(data?.amount)
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
    const convertDateToUtc = (data: any) => {
        const Cdate = new Date(data);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    const displayDate = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    let removeCoupon = () => {
        setCoupon("")
        setCouponSaving("")
        // setCouponId(null)
        // finalAmount()
        // taxCalculateFun()
        setData({
            ...data,
            ["final_amount"]: Number(data?.final_amount) + Number(data?.coupon_amount),
            ["coupon_amount"]: "",
            ["coupon_code"]: ""
        })
    }
    useEffect(() => {
        setCouponSaving(data?.coupon_amount)
    }, [])
    const handleChangeDate = () => {
        setStep(0)
        setData({})
        setDateVisible([])
        setSlots([])
        setAddOn({})
        setSelectClasses([])
        setPrice(host[0]?.price)
        setSelectSlots([])
        setClassTime([])
        // setDuplicateObj([])
    }
    const getTotalDuration = (slots: any) => {
        var totalDuration = slots?.reduce(function (accumulator: Number, value: any) {
            return accumulator + value.duration;
        }, 0);

        return <React.Fragment><span className='strong consult-time'>{Math.floor(totalDuration / 60)} hours {totalDuration % 60} minutes </span><span className='consult-time'>over {slots?.length} Classes</span></React.Fragment>
    }
    let showClasses: any = (res: any) => {
        if (dateVisible.includes(res?.id)) {


            let newValue = dateVisible?.filter((data: any) => data !== res?.id)
            setDateVisible(newValue)
            setShowClass(false)
        } else {

            setDateVisible([res.id])
            setShowClass(true)
        }

    }
    console.log('price',host[0].price)
    console.log("value",data?.total_ammount)
    console.log('final',data?.final_amount)
    return (
        <section className='step-container step3'>
            <div className='consult-section-heading text-center'>
                <h3 className='my-5'>Your Appointment</h3>
            </div>

            <div className="consult-card-container selected-consult-container py-3 py-md-4 px-3 px-md-4">
                <div className='d-flex justify-content-between flex-column flex-md-row'>
                    <div className='d-flex flex-column w-100'>
                        <div className='consult-date-time d-flex justify-content-between'>
                            <div><h3 className='selected-consult-title'>{objName?.name}</h3></div>                            
                            <div className='consult-cost'>
                                {/* <span className='text-decoration-line-through me-1 total-actual-value'>${data?.all_price}</span>
                                    <h2 className='text-start'>${data?.total_ammount}</h2> */}
                                <h2 className='text-start m-0 p-0'><span className="text-decoration-line-through actual-price me-2">{data?.total_ammount > Number(data?.amount) ? '+$499' : ""}</span><span className="strong reduced-price">${data?.total_ammount}</span></h2>
                            </div>
                        </div>


                        {/* <div className='consult-date my-2'>{moment(data?.time).format("LLLL")}</div> */}

                        <div >
                            <div className='consult-date'>{displayDate(objName?.time)}</div>
                            <span className='consult-time strong'> {disPlayTime(objName?.time)} EST  </span>
                            <span className='author-name'>| by {objName?.calendar}</span><br />
                            <span> {getTotalDuration(objName?.multipleSlots)}</span>
                        </div>


                        <div className='d-flex' >
                            <div className='change-date' onClick={handleChangeDate}>Change Date</div>
                            &nbsp; &nbsp; &nbsp;
                            <a className='showcls' onClick={() => showClasses(data)} >{showClass ? "Hide" : "Show"} Class times</a>
                        </div>
                        {/* {dateVisible?.includes(objName?.id) && <ul className='show-class-slots p-0 m-0 mt-2'>
                            {data?.slots && data?.slots.map((Rdate: any) => (
                                <li><p>{moment(Rdate?.appointment_date_time).format("dddd DD MMM YYYY")},{disPlayTime(Rdate?.appointment_date_time)} EST</p></li>))
                            }

                        </ul>} */}
                        
                        {
                            dateVisible.includes(data?.id) &&
                            <ul className='show-class-slots p-0 m-0 mt-2'>
                                {objName?.multipleSlots?.map((date: any) => (
                                    <li><p>{date?.localeTime}</p></li>

                                ))
                                }
                            </ul>
                        }
                    </div>

                </div>&nbsp;
                {/* <div className='subtotal d-flex mx-3 mx-md-5 pb-3 pt-3'>
                    </div> */}

            
                {
                    data?.slots?.length > 1 && <div className='d-flex justify-content-between flex-column flex-md-row additional-class-container'>
                        <div className='d-flex flex-column'>
                            <div className='me-md-4 pe-md-5 me-2'>
                                <h3 className='selected-consult-title'>+{data?.slots?.length - 1} additional prenatal classes</h3>
                            </div>
                            <div className='Show-details' onClick={() => setShowDetail(true)}>{!showDetail && "Show details"}</div>
                            {/* {showDetail && <p>15% OFF (two of the following: Labor Prep, Newborn Essentials, Breastfeeding Basics, Infant/Child CPR)</p>
                            } */}
                            {showDetail &&
                                data?.slots.map((val: any, i: any) => (
                                    <p className='mt-1 mb-0 p-0'>{i > 0 && data?.addition_class}  {i > 0 && convertDateToUtc(val?.appointment_date_time)} {i > 0 && disPlayTime(val?.appointment_date_time)}</p>
                                ))
                            }
                            <div className='Show-details' onClick={() => setShowDetail(false)}>{showDetail && "Show less"}</div>
                        </div>
                        <div className='additional-cost'>
                            <h2 className='text-start m-0 p-0'></h2>
                        </div>
                    </div>

                }
                <hr />
                <div className='coupon-container'>
                    <div className="apply-couponcode mb-4 ">
                        <h6 className="apply-heading">Apply Coupon Code</h6>
                        <div className="position-relative">
                            <div className="d-flex justify-content-between ">
                                <input type="text" className="form-control" value={coupon || data?.coupon_code} onChange={(e: any) => setCoupon(e.target.value)} />
                                <button className="btn secondary-teal-btn ms-2" onClick={coupenHandler}>{couponLoading ? <CircularProgress /> : "Apply"}</button></div>
                            <span className="error">{coponErr}</span>
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
                <div className='subtotal d-flex pb-3 pt-3'>
                    <span className='ms-0 me-auto'><h2 className='m-0 p-0'>Subtotal</h2></span>
                    <span className='price me-0 ms-auto'><h2 className='m-0 p-0'>${couponSaving ? data?.final_amount : data?.total_ammount}</h2></span>
                </div>
            </div>

            <div className="bill-details">
                <h6>Bill Detail</h6>
                <ul className="first py-3 py-md-3 px-3 px-md-4">
                    <li className='d-flex justify-content-between consult-total'><span className="headingspan">Consult Total</span><span className="pricespan">${data?.total_ammount}</span></li>
                    <li className="d-flex justify-content-between coupon-discount "><span>Coupon Discount</span><span>- ${data?.coupon_amount ? data?.coupon_amount : 0}</span></li>
                    <li className="d-flex justify-content-between"><span>Taxes &amp; Charges</span><span>+${data?.tax_amount ? data?.tax_amount : 0}</span></li>
                </ul>

                <ul className="pay-list px-3 px-md-4">
                    <li className="d-flex justify-content-between"><span className="payspan">To Pay</span><span className="pay-total">${couponSaving ? data?.final_amount : data?.total_ammount}</span></li>
                </ul>
            </div>
            <div className='section-navigation my-5 d-flex justify-content-between'>
                <button className='primary-blue-small-btn previous' onClick={handlePrev}>Previous</button>
                {
                    data?.final_amount === 0 ?
                        <button className='primary-blue-small-btn next' disabled={loading} onClick={() => handleSubmit()}>{loading ? <CircularProgress /> : "Confirm"}</button> :
                        <button className='primary-blue-small-btn next' onClick={handlePayment}>Next</button>
                }
                {/* <button className='primary-blue-small-btn next' onClick={handlePayment}>Next</button> */}
            </div>
        </section>

    )
}

export default AppoinmentDetail
