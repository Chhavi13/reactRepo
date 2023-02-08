
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form } from 'react-bootstrap';

function MultipleSlots({ objName, hostObj, data, handleNext,
    setPriceDisplay, priceDisplay, setPriceArry, classTime, setClassTime, value,
    setValue, price, slots, setSlots, priceArry, addOn, setAddOn, selectClasses, setSelectClasses, selectSlots, setSelectSlots }: any) {

    const [error, setError] = useState<any>({})
    const [errorAdd, setErrorAdd] = useState<any>([])
    const [selectSlot, setSelectSlot] = useState<any>([])
    // const [selectClasses, setSelectClasses] = useState<any>([])
    // const [selectSlots, setSelectSlots] = useState<any>([])

    const disPlayTime = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("LT")
    }
    const displayDate = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    const convertDateToUtc = (data: any) => {
        const Cdate = new Date(data);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }


    const handlePrice = async (e: any, data: any, values: any, errorCls: any, index: any) => {
        let isChecked = e.target.checked;
        let disPrice;
        let discount;
        if (!data?.appointment_date_time || data?.appointment_date_time === 'Select Appoinment' || !selectClasses[index]?.name || errorCls) {
            let error: any = {}
            if (!data?.appointment_date_time) {
                error.app = "please select appoinment date"
            }
            if (data?.appointment_date_time === 'Select Appoinment') {
                error.app = "please select valid date and time"
            }
            if (!selectClasses[index]?.name) {
                error.class = "please select class"
            }
            if (errorCls) {
                error.class = "please select valid class name"
            }
            e.target.checked = false
            setErrorAdd(
                {
                    ...errorAdd,
                    [index]: error
                })
            return;
        }
        setSelectSlots({
            ...selectSlots,
            [index]: {
                ...selectSlots[index],
                isChecked
            }
        })
        if (isChecked) {
            priceArry[index] = {
                id: e.target.value,
            }
            await setPriceArry({
                ...priceArry
            })

            if (Object.keys(priceArry).length === 1) {

                discount = (Number(price) + Number(values.price)) * 10 / 100
                disPrice = Number(price) + Number(values.price) - discount;
                setPriceDisplay(
                    {
                        ...priceDisplay,
                        ["price"]: Number(price) + Number(values.price),
                        ["actualPrice"]: disPrice
                    }
                )
            }
            if (Object.keys(priceArry).length === 2) {

                discount = (Number(priceDisplay.price) + Number(values?.price)) * 15 / 100;
                disPrice = Number(priceDisplay.price) + Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) + Number(values.price),
                    ["actualPrice"]: disPrice
                })
            }
            if (Object.keys(priceArry).length === 3) {
                discount = (Number(priceDisplay.price) + Number(values?.price)) * 20 / 100;
                disPrice = Number(priceDisplay.price) + Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) + Number(values.price),
                    ["actualPrice"]: disPrice
                })
            }
            // setAddOn({
            //     ...addOn,
            //     [index]:selectClasses[index]?.name
            // })
            addOn[index] = {
                name: selectClasses[index]?.name
            }

            await setAddOn({
                ...addOn
            })
        } else {
            if (Object.keys(priceArry).length === 1) {
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(values.price),
                    ["actualPrice"]: Number(values.price)
                })
            }
            if (Object.keys(priceArry).length === 2) {
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 10 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;

                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price) - Number(values.price),
                    ["actualPrice"]: disPrice

                })
            }
            if (Object.keys(priceArry).length === 3) {

                discount = (Number(priceDisplay.price) - Number(values?.price)) * 15 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) - Number(values.price),
                    ["actualPrice"]: disPrice

                })
            }
            delete priceArry[index]
            setPriceArry({
                ...priceArry
            })

            delete selectSlots[index]
            setSelectSlots({ ...selectSlots })

            delete selectClasses[index]
            setSelectClasses({ ...selectClasses })
            // setAddOn({})
            delete addOn[index]
            setAddOn({ ...addOn })
        }

    }



    const serviceClassFun = (dVal: any) => {
        setValue({
            ["slots"]: slots,
            ["service_name"]: hostObj?.name,
            ["appointment_date_time"]: hostObj?.time,
            ["appointment_type_id"]: hostObj?.appointmentTypeID,
            ["calendar_id"]: hostObj?.calendarID,
            ["amount"]: hostObj?.price,
            ["addtion_amount"]: price ? price - Number(hostObj?.price) : 0,
            ["total_ammount"]: price
        })

        handleNext()
    }
    const handleVirtualClass = () => {
        let bookSlots: any = []
        if (Object.keys(selectSlots).length > 0) {
            for (const prop in selectSlots) {
                if (selectSlots[prop]?.isChecked) {
                    bookSlots.push({
                        appointment_date_time: selectSlots[prop].appointment_date_time, appointment_type_id: selectSlots[prop].appointment_type_id, calendar_id: selectSlots[prop].calendar_id
                    })
                }
            }
        }
        if (bookSlots.length > 0) {
            setValue({
                ...value,
                ["slots"]: bookSlots,
                ["service_name"]: hostObj?.name,
                // ["appointment_date_time"]: hostObj?.time,
                // ["appointment_type_id"]: hostObj?.appointmentTypeID,
                // ["calendar_id"]: hostObj?.calendarID,
                ["amount"]: priceDisplay.actualPrice ? priceDisplay.actualPrice : price,
                ["all_price"]: priceDisplay.price ? priceDisplay.price : price,
                ["addtion_amount"]: price ? price - Number(hostObj?.price) : 0,
                ["total_ammount"]: priceDisplay.actualPrice ? priceDisplay.actualPrice : price,
                ["addition_class"]: addOn,
                ["slot_time"]: addOn,
                ["someCheck_id"]: addOn
            })
        } else {
            setValue({
                ...value,
                ["service_name"]: hostObj?.name,
                // ["appointment_date_time"]: hostObj?.time,
                // ["appointment_type_id"]: hostObj?.appointmentTypeID,
                // ["calendar_id"]: hostObj?.calendarID,
                ["amount"]: priceDisplay.actualPrice ? priceDisplay.actualPrice : price,
                ["all_price"]: price,
                ["addtion_amount"]: price ? price - Number(hostObj?.price) : 0,
                ["total_ammount"]: priceDisplay.price ? priceDisplay.price : price,
                ["addition_class"]: addOn,
                ["slot_time"]: addOn,
                ["someCheck_id"]: addOn
            })
        }


        handleNext()
    }
    useEffect(() => {
        const optionslot = data.map((val: any, i: any) => displayDate(val.time))
        setSelectSlot(optionslot)
    }, [])

    useEffect(() => {
        const optionslot = data.map((val: any, i: any) => val.time)
        setSelectSlot(optionslot)
        // setAddClass()        
    }, [])



    const classChange = (e: any, data: any, values: any, index: number) => {
        let discount;
        let disPrice;
        if (e.target.value === "Select Class") {
            setError(
                {
                    ...error,
                    [index]: "please select valid class name"
                })

            if (Object.keys(priceArry).length === 1) {
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(values.price),
                    ["actualPrice"]: Number(values.price)
                })
            }
            if (Object.keys(priceArry).length === 2) {
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 10 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;

                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price) - Number(values.price),
                    ["actualPrice"]: disPrice

                })
            }
            if (Object.keys(priceArry).length === 3) {

                discount = (Number(priceDisplay.price) - Number(values?.price)) * 15 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) - Number(values.price),
                    ["actualPrice"]: disPrice

                })
            }



            delete priceArry[index]
            setPriceArry({ ...priceArry })

            delete selectSlots[index]
            setSelectSlots({ ...selectSlots })

            delete selectClasses[index]
            setSelectClasses({ ...selectClasses })

            delete addOn[index]
            setAddOn({ ...addOn })
        }
        let allValue = JSON.parse(e.target.value)
        setClassTime({ ...classTime, [index]: [] })
        setClassTime({ ...classTime, [index]: allValue })
        setSelectClasses({
            ...selectClasses,
            [index]: {
                ...selectClasses[index],
                name: allValue.name,
                calendar_id: allValue.calendarID,
                appointment_type_id: allValue.appointmentTypeID
            }
        })
        setErrorAdd({
            ...errorAdd,
            [index]: {
                ...errorAdd[index],
                ["class"]: ""
            }
        })
        setError(
            {
                ...error,
                [index]: ""
            })

        



        if (priceArry[index]) {            
            if (Object.keys(priceArry).length === 1) {
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(values.price),
                    ["actualPrice"]: Number(values.price)
                })
            }
            if (Object.keys(priceArry).length === 2) {
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 10 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
    
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price) - Number(values.price),
                    ["actualPrice"]: disPrice
    
                })
            }
            if (Object.keys(priceArry).length === 3) {
    
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 15 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) - Number(values.price),
                    ["actualPrice"]: disPrice
    
                })
            }

            delete priceArry[index]
            setPriceArry({ ...priceArry })

            delete selectSlots[index]
            setSelectSlots({ ...selectSlots })

            // delete selectClasses[index]
            // setSelectClasses({ ...selectClasses })

            delete addOn[index]
            setAddOn({ ...addOn })
        }
    }

    const slotChange = (e: any, data: any, values: any, index: any) => {
        let discount;
        let disPrice;
        if (e.target.value === "Select Appoinment") {
            if (Object.keys(priceArry).length === 1) {
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(values.price),
                    ["actualPrice"]: Number(values.price)
                })
            }
            if (Object.keys(priceArry).length === 2) {
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 10 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;

                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price) - Number(values.price),
                    ["actualPrice"]: disPrice

                })
            }
            if (Object.keys(priceArry).length === 3) {

                discount = (Number(priceDisplay.price) - Number(values?.price)) * 15 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) - Number(values.price),
                    ["actualPrice"]: disPrice

                })
            }

            delete priceArry[index]
            setPriceArry({ ...priceArry })

            delete selectSlots[index]
            setSelectSlots({ ...selectSlots })

            delete selectClasses[index]
            setSelectClasses({ ...selectClasses })

            delete addOn[index]
            setAddOn({ ...addOn })

        }
        setSelectSlot({ ...selectSlot, [index]: [] })
        setSelectSlot({ ...selectSlot, [index]: e.target.value })
        setSelectSlots({
            ...selectSlots,
            [index]: {
                ...selectSlots[index],
                appointment_date_time: e.target.value,
                calendar_id: data?.calendarID,
                appointment_type_id: data?.appointmentTypeID
            }
        })

        if (data?.calendarID == selectClasses?.calendar_id) {
            setSelectClasses({
                ...selectClasses,
                [index]: {
                    ...selectClasses[index],
                    appointment_date_time: e.target.value
                }
            })
        }
        setErrorAdd({
            ...errorAdd,
            [index]: {
                ...errorAdd[index],
                ["app"]: ""
            }
        })

        

        if(priceArry[index]){            
            if (Object.keys(priceArry).length === 1) {               
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(values.price),
                    ["actualPrice"]: Number(values.price)
                })
            }
            if (Object.keys(priceArry).length === 2) {
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 10 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
    
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price) - Number(values.price),
                    ["actualPrice"]: disPrice
    
                })
            }
            if (Object.keys(priceArry).length === 3) {
    
                discount = (Number(priceDisplay.price) - Number(values?.price)) * 15 / 100;
                disPrice = Number(priceDisplay.price) - Number(values?.price) - discount;
                setPriceDisplay({
                    ...priceDisplay,
                    ["price"]: Number(priceDisplay.price ? priceDisplay.price : 0) - Number(values.price),
                    ["actualPrice"]: disPrice
    
                })
            }

            delete priceArry[index]
            setPriceArry({ ...priceArry })

            // delete selectSlots[index]
            // setSelectSlots({ ...selectSlots })

            // delete selectClasses[index]
            // setSelectClasses({ ...selectClasses })

            delete addOn[index]
            setAddOn({ ...addOn })
        }
    }

    console.log(priceDisplay)
    // console.log(addOn)
    console.log(priceArry)
    console.log(Object.keys(priceArry).length)
    // console.log(selectSlot)
    console.log(price)

    return (
        <div>
            <section className='step-container step1'>
                <div className="consult-card-container">
                    <div className='d-flex pt-3 px-3 justify-content-between'>
                        <div className='consult-info d-flex flex-column w-100'>
                            <div className='time-projection-details d-flex'>
                                <div className='time-projection'>{moment(objName?.time).startOf('day').fromNow()}</div>
                                <div className='availablity'>{objName?.slotsAvailable}/{objName?.slots} left</div>
                            </div>
                            <div className='consult-date-time d-flex justify-content-between mt-3 mb-1'>
                                <div className='consult-date'>
                                    {/* {moment(objName?.time).format("dddd DD MMM YYYY")} */}
                                    {convertDateToUtc(objName?.time)}
                                </div>
                                <div className='consult-price'>
                                    <span className='price'>${objName?.price}</span>
                                </div>
                            </div>
                            <div className='consult-tm-dtls mb-3'>
                                <span className='consult-time'><span className='strong'> {disPlayTime(objName?.time)} EST</span>  </span>
                                <span className='host-name'>| by {objName?.calendar}</span>
                            </div>
                            {/* <div className='btn-container'>
                                {/* <button
                                    className='btn primary-blue-small-btn-40'
                                    key={objName?.id}
                                    onClick={() => serviceClassFun(objName)}>
                                    Book
                                </button> */}
                            {/* </div> */}
                        </div>

                    </div>

                    <div className='additional-class pb-3 px-3'>
                        <hr />
                        <h2 className='text-start pb-0 mb-2 add-head' >Bundle and Save</h2>
                        <p className='additional-class-discount'>( 10% off on 1 additional class, 15% off on 2 additional classes AND 20% of on all additional classes ) </p>
                        <p>Add on additional classes to your Infant and Child CPR course including <strong>Labor Prep, Newborn Essentials, and/or Breastfeeding Basics.</strong></p>
                        <hr />

                        {
                            data?.map((val: any, i: any) => {
                                return (
                                    <>
                                        <div className='class-list mb-3'>
                                            <div className='class-list-inner w-100 d-flex flex-column flex-md-row '>
                                                <div className="me-md-2 me-0 mb-3 mb-md-0 class-container">

                                                    <label>Select Class {i + 1}</label>


                                                    <Form.Select aria-label="Default select example" name='class_name' onChange={(e) => classChange(e, val, classTime[i], i)} >
                                                        <option value={'Select Class'}>Select Class</option>
                                                        {data?.map((clVal: any) => (
                                                            <option
                                                                selected={selectClasses[i]?.appointment_type_id === clVal?.appointmentTypeID}
                                                                value={JSON.stringify(clVal)}>{clVal.name}</option>
                                                        ))}
                                                    </Form.Select>
                                                    <h4 className="error-msgtext">{errorAdd[i]?.class}</h4>

                                                </div>

                                                <div className="me-md-2 me-0 mb-3 mb-md-0 appointment-container">

                                                    <label>Select Appointment</label>
                                                    <Form.Select aria-label="Default select example" onChange={(e) => slotChange(e, val, classTime[i], i)} >
                                                        <option>Select Appoinment</option>
                                                        {Array.isArray(classTime[i]?.multipleSlots) && classTime[i]?.multipleSlots.map((clVal: any) => (
                                                            <option
                                                                selected={selectSlots[i]?.appointment_date_time === clVal?.time}
                                                                value={clVal.time}>{convertDateToUtc(clVal.time)} {disPlayTime(clVal.time)}</option>
                                                        ))}

                                                    </Form.Select>
                                                    <h4 className="error-msgtext">{errorAdd[i]?.app}</h4>

                                                </div>

                                                <div className='me-md-0 me-auto ms-md-auto ms-0 price-container'>
                                                    <div className='d-flex justify-content-end flex-md-column'>
                                                        <div className='ms-auto me-0'>
                                                            <input
                                                                type='checkbox'
                                                                className='form-check-input me-0 ms-auto'
                                                                name='price'
                                                                value={classTime[i]?.appointmentTypeID}
                                                                onChange={(e) => handlePrice(e, selectSlots[i], classTime[i], error[i], i)}
                                                                checked={Number(priceArry[i]?.id) == Number(classTime[i]?.appointmentTypeID)}
                                                            />

                                                        </div>
                                                        <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0'><span className=''></span><span className='strong actual-price'>+${val?.price}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="error-msgtext">{error?.errorIndex}</h4>
                                        </div>
                                    </>
                                )
                            })
                        }

                        <hr />
                        <div className='total-amt d-flex justify-content-between'>
                            <div className='total-amount'>Total <span className='text-decoration-line-through me-1 total-actual-value'>{priceDisplay.price > priceDisplay.actualPrice && priceDisplay?.price}</span><span className='total-discounted'>${priceDisplay.actualPrice ? priceDisplay.actualPrice : price}</span></div>
                            <div><button className='primary-blue-small-btn-40 btn' onClick={() => handleVirtualClass()}>Buy Now</button></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MultipleSlots
