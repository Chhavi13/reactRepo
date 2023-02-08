import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import { json } from 'stream/consumers';

// let priceArry: any = []
function SingleAddClass({ data, handleNext, objName, value, setValue, price,
    setPrice, slots, setSlots, priceArry, setPriceArry, addOn, setAddOn, selectClasses,
    setSelectClasses, selectSlots, setSelectSlots, classTime, setClassTime }: any) {

    const [addClass, setAddClass] = useState<any>("")
    const [error, setError] = useState<any>({})
    const [errorAdd, setErrorAdd] = useState<any>([])
    const [selectSlot, setSelectSlot] = useState<any>([])
    // const [classTime, setClassTime] = useState<any>([])

    const handleChange = (e: any, res: any, val: any) => {
        let obj = {
            ["addition_class"]: addClass,
            ["appointment_date_time"]: res,
            ["appointment_type_id"]: val?.appointmentTypeID,
            ["calendar_id"]: val?.calendarID
        }
        setSlots([...slots, obj])
        setError({
            ...error,
            ["slotTime"]: ""
        })
    };
    const handlePrice = (e: any, values: any, errorCls: any, index: number) => {
        if (!selectClasses[index]?.name || !selectSlots[index]?.appointment_date_time
            || selectSlots[index]?.appointment_date_time === 'Select Appointment' || errorCls) {
            let errors: any = {}
            if (!selectClasses[index]?.name) {
                errors.class = "Please select Class"
            }
            if (!selectSlots[index]?.appointment_date_time) {
                errors.app = "Please select appoinment date"
            }
            if (selectSlots[index]?.appointment_date_time === 'Select Appointment') {
                errors.app = "please select valid date and time"
            }
            if (errorCls) {
                errors.class = "please select valid class name"
            }
            setErrorAdd({
                ...errorAdd,
                [index]: errors
            })
            return;
        } else {
            let newPrice
            if (e.target.checked) {
                // newPrice = Number(values?.price) + Number(price)
                newPrice = 50 + Number(price)
                setSlots([...slots, selectSlots[index]])
                setPriceArry([selectSlots[index]?.appointment_type_id])
                let obj = {
                    ["add_class"]: selectClasses[index]?.name,
                    ["slots_time"]: selectSlots[index]?.appointment_date_time,
                    ["someCheckId"]: selectSlots[index]?.appointment_type_id
                }
                setAddOn(obj)
            } else {
                // newPrice = Number(price) - Number(values?.price)
                newPrice = Number(price) - 50

                let newValue = slots.filter((data: any) => data?.appointment_type_id !== addOn?.someCheckId)
                setSlots(newValue)

                let newValues = priceArry.filter((data: any) => data !== selectSlots[index]?.appointment_type_id)

                setPriceArry(newValues)
                setSelectSlots([])
                setSelectClasses([])
                setAddOn({})
            }
            setPrice(newPrice)

            // setAddOn(obj)
            // let slotData = selectSlots[index]
            // if(slots.includes(selectSlots[index])){                
            //     let newValue = slots.filter((data: any) => data.appointment_type_id !== values.appointmentTypeID)
            //     setSlots(newValue)
            // }else{
            //     setSlots([...slots,slotData])                
            // }
            setValue({
                ...value,
                ["someCheck_id"]: ""
            })

            setError({
                ...error,
                ["slot"]: "",
                ["addClass"]: "",
                ["slotTime"]: ""
            })

            // setError({
            //     ...error,
            //     ["addClass"]:"",
            // })
        }
        // let newPrice
        // if (e.target.checked) {
        //     newPrice = Number(values?.price) + Number(price)
        //     priceArry.push(values?.id)
        // } else {
        //     newPrice = Number(price) - Number(values?.price)
        //     let index = priceArry.indexOf(values?.id)
        //     priceArry.splice(index, 1)
        // }
        // setPrice(newPrice)
        // setError({
        //     ...error,
        //     ["slot"]: ""
        // })
    }
    const handleCommonClass = (dVal: any) => {
        setValue({
            ["slots"]: slots,
            ["service_name"]: dVal?.name,
            ["appointment_date_time"]: dVal?.time,
            ["appointment_type_id"]: dVal?.appointmentTypeID,
            ["calendar_id"]: dVal?.calendarID,
            ["amount"]: dVal?.price,
            ["addtion_amount"]: price ? price - Number(dVal?.price) : 0,
            ["total_ammount"]: price
        })
        handleNext()
    }
    const handlePrebabyClass = () => {
        setValue({
            ["slots"]: slots,
            ["service_name"]: objName?.name,
            ["appointment_date_time"]: objName?.time,
            ["appointment_type_id"]: objName?.appointmentTypeID,
            ["calendar_id"]: objName?.calendarID,
            ["amount"]: objName?.price,
            ["addtion_amount"]: price ? price - Number(objName?.price) : 0,
            ["total_ammount"]: price,
            ["addition_class"]: addOn?.add_class,
            ["slot_time"]: addOn?.slots_time,
            ["someCheck_id"]: addOn?.someCheckId
        })
        handleNext()
    }

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

    const getTotalDuration = (slots: any) => {
        var totalDuration = slots?.reduce(function (accumulator: Number, value: any) {
            return accumulator + value.duration;
        }, 0);

        return <React.Fragment><span className='strong consult-time'>{Math.floor(totalDuration / 60)} hours {totalDuration % 60} minutes </span><span className='consult-time'>over {slots?.length} Classes</span></React.Fragment>
    }

    const convertDateToUtc = (data: any) => {
        const Cdate = new Date(data);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    // useEffect(() => {
    //     let optionClass = data.map((val: any) => val.name)
    //     let optionSlot = data.map((val: any) => val.time)
    //     setSelectClass(optionClass)
    //     setSelectSlot(optionSlot)
    // }, [])

    const classChange = (e: any, data: any, index: number) => {
        // console.log(addOnSelect)
        // addOnSelect.current.value = "ishtiyaq khan"
        // debugger
        // return;        
        if (e.target.value === "Select Class") {
            setError({
                ...error,
                [index]: "please select valid class name"
            })
            setPriceArry([])
            setPrice(objName?.price)
            setClassTime([])
            setSelectSlots([])
            let newValue = slots.filter((data: any) => data?.appointment_type_id !== addOn?.someCheckId)
            setSlots(newValue)
        }
        let allValue = JSON.parse(e.target.value)
        setClassTime({ ...classTime, [index]: [] })
        setClassTime({ ...classTime, [index]: allValue.multipleSlots })
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
    }
    const slotChange = (e: any, data: any, index: any) => {

        setPriceArry([])
        setPrice(objName?.price)
        // setClassTime([])
        
        setSelectSlots([])
        let newValue = slots.filter((data: any) => data?.appointment_type_id !== addOn?.someCheckId)
        setSlots(newValue)

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

        setErrorAdd({
            ...errorAdd,
            [index]: {
                ...errorAdd[index],
                ["app"]: ""
            }
        })
        // setPriceArry([])
        // setPrice(objName?.price)
    }

    console.log(priceArry)
    console.log(price)
    console.log(objName)
    console.log(slots)
    return (
        <section className='step-container step1'>
            <div className="consult-card-container">
                <div className='d-flex pt-3 px-3 justify-content-between'>
                    <div className='consult-info d-flex flex-column w-100'>
                        <div className='time-projection-details d-flex'>
                            <div className='time-projection'>{moment(objName?.time).startOf('day').fromNow()}</div>
                            <div className='availablity'>{objName?.slotsAvailable}/{objName?.slots} left</div>
                        </div>
                        {/* <div className='consult-date my-3'>Wednesday <span className='strong'>13 May </span> 2022</div> */}
                        <div className='consult-date-time d-flex justify-content-between mt-3 mb-1'>
                            <div className='consult-date'>{displayDate(objName?.time)}</div>
                            <div className='consult-price'>
                                <span className='price'>${objName?.price}</span>
                            </div>
                        </div>
                        <div className='consult-tm-dtls mb-3'>
                            <span className='consult-time'><span className='strong'> {disPlayTime(objName?.time)} EST</span>  </span>
                            <span className='author-name'>| by {objName?.calendar}</span><br />
                            <span>{getTotalDuration(objName?.multipleSlots)}</span>
                        </div>

                        {/* <div className='btn-container'>
                            <button className='btn primary-blue-small-btn-40' onClick={() => handleCommonClass(objName)}>Book</button>
                        </div> */}
                    </div>

                </div>

                <div className='additional-class pb-3 px-3'>
                    <hr />
                    <h2 className='text-start pb-0 mb-2 add-head' >Bundle and Save</h2>
                    <p>Add on class to your Pre-baby bootcamp including CPR first aid for infants | Virtual Class.</p>
                    <hr />
                    {
                        data.map((val: any, i: any) => (
                            <>
                                <div className='class-list w-100 d-flex flex-column flex-md-row mb-3 mb-md-0'>
                                    <div className="mb-3 me-2 class-container">
                                        <label>Add On</label>
                                        {/* <Autocomplete
                                            disablePortal
                                            disableClearable
                                            id="class-id"
                                            options={selectclass}
                                            onChange={(e, value) => setAddClass(value)}
                                            className={'w-100, mu-custom-fields'}
                                            renderInput={(params) => <TextField {...params} placeholder='Select Class' />}
                                        /> */}
                                        <Form.Select aria-label="Default select example" onChange={(e) => classChange(e, val, i)} >
                                            <option value={'Select Class'}>Select Class</option>
                                            {data?.map((clVal: any) => (
                                                <option
                                                    selected={selectClasses[i]?.appointment_type_id === clVal?.appointmentTypeID}
                                                    value={JSON.stringify(clVal)} >
                                                    {clVal.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <h4 className="error-msgtext">{errorAdd[i]?.class}</h4>
                                    </div>

                                    <div className="mb-3 me-2 appointment-container">
                                        <label>Select Appointment</label>
                                        {/* <Autocomplete
                                            disablePortal
                                            disableClearable
                                            id="class-id"
                                            options={selectSlot}
                                            onChange={(e, value) => handleChange(e, value, val)}
                                            value={value?.appointment_date_time}
                                            className={'w-100, mu-custom-fields'}
                                            renderInput={(params) => <TextField {...params} placeholder='Choose slot' />}
                                        /> */}
                                        <Form.Select aria-label="Default select example" onChange={(e) => slotChange(e, val, i)} >
                                            <option>Select Appointment</option>
                                            {Array.isArray(classTime[i]) && classTime[i]?.map((clVal: any) => (
                                                <option
                                                    selected={selectSlots[i]?.appointment_date_time === clVal?.time}
                                                    value={clVal.time}>
                                                    {convertDateToUtc(clVal.time)} {disPlayTime(clVal.time)}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <h4 className="error-msgtext">{errorAdd[i]?.app}</h4>
                                    </div>

                                    <div className='me-md-0 me-auto ms-md-auto ms-0 '>
                                        <div className='d-flex justify-content-end flex-md-column'>
                                            <div className='ms-auto me-0'><input type='checkbox' className='form-check-input me-0 ms-auto' name='price' value={addOn?.someCheckId} onChange={(e) => handlePrice(e, val, error[i], i)} checked={priceArry.some((item: any, i: any) => item === addOn?.someCheckId)} /></div>
                                            <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0 d-flex'><span className='actual-price text-decoration-line-through'>+${val?.price}</span><span className='strong discounted-price ms-1'> $50</span></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <h4 className="error-msgtext">{errorAdd[i]}</h4> */}
                            </>
                        ))
                    }


                    {/* <div className='class-list w-100 d-flex flex-column flex-md-row mb-3 mb-md-0'>
                        <div className="mb-3 me-2">
                            <label>Select Class 1</label>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Labor Prep' />}
                            />
                        </div>

                        <div className="mb-3 me-2">
                            <label>Select Appointment</label>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Choose Later' />}
                            />
                        </div>

                        <div className='me-md-0 me-auto ms-md-auto ms-0'>
                            <div className='d-flex justify-content-end flex-md-column'>
                                <div className='ms-auto me-0'><input type='checkbox' className='form-check-input me-0 ms-auto' /></div>
                                <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0'><span className='text-decoration-line-through actual-price'>$100</span><span className='strong'>+$80</span></div>
                            </div>
                        </div>
                    </div>

                    <div className='class-list w-100 d-flex flex-column flex-md-row mb-3 mb-md-0'>
                        <div className="mb-3 me-2">
                            <label>Select Class 1</label>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Labor Prep' />}
                            />
                        </div>

                        <div className="mb-3 me-2">
                            <label>Select Appointment</label>
                            <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Choose Later' />}
                            />
                        </div>

                        <div className='me-md-0 me-auto ms-md-auto ms-0'>
                            <div className='d-flex justify-content-end flex-md-column'>
                                <div className='ms-auto me-0'><input type='checkbox' className='form-check-input me-0 ms-auto' /></div>
                                <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0'><span className='text-decoration-line-through actual-price'>$100</span><span className='strong'>+$80</span></div>
                            </div>
                        </div>
                    </div> */}

                    <hr />

                    <div className='total-amt d-flex justify-content-between'>
                        <div className='total-amount'>Total <span className="text-decoration-line-through actual-price me-2">{Number(objName?.price) < price ? '$499' : ''}</span><span className='total-value'>${price}</span></div>
                        <div><button className='primary-blue-small-btn-40 btn' onClick={() => handlePrebabyClass()} >Buy Now</button></div>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default SingleAddClass
