import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import { debug } from 'console';
// import LoaderWash from '../../../../Common/Loader/LoaderWash';

const ChooseDate = ({hostObj, host, data, handleNext, dateVisible, loadingWash, setDateVisible, value, setValue,priceArry,setPriceArry,
     price, setPrice, setObjName, slots, setSlots,setAddOn,setSelectClasses,setSelectSlots,setClassTime,setPriceDisplay}: any) => {

    // const [slots, setSlots] = useState<any>([])
    const [error, setError] = useState<any>({})
    const disPlayTime = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("LT")
    }
    const openAddonClass = (res: any) => {
        let obj = {
            ["appointment_date_time"]: res?.time,
            ["appointment_type_id"]: res?.appointmentTypeID,
            ["calendar_id"]: res?.calendarID
        }
        if (dateVisible.includes(res?.id)) {
            let newValue = dateVisible.filter((data: any) => data !== res?.id)
            setDateVisible(newValue)
        } else {
            setDateVisible([...dateVisible, res.id])
        }
        handleNext()
        setObjName(res)
        setSlots(obj)

        setValue({
            ...value,
            ["appointment_date_time"]: res?.time,
            ["appointment_type_id"]: res?.appointmentTypeID,
            ["calendar_id"]: res?.calendarID            
        })
        setDateVisible([])
        setAddOn([])
        setSelectClasses([])
        setSelectSlots([])
        setClassTime([])
        setPrice(hostObj?.price)
        setPriceArry([])
        setPriceDisplay({price: hostObj?.price,
            actualPrice: hostObj?.price})

    }
    const handlePrice = (e: any, values: any) => {
        let newPrice
        if (e.target.checked) {
            newPrice = Number(values?.price) + Number(price)
        } else {
            newPrice = Number(price) - Number(values?.price)
        }
        setPrice(newPrice)
        setError({
            ...error,
            ["slot"]: ""
        })
    }
    const top100Films = [
        { label: 'Labor Prep', value: 1 },
        { label: 'Labor Prep', value: 2 },
        { label: 'Labor Prep', value: 3 },
    ]

    console.log(price)
    const optionObj = data.map((val: any, i: any) => {
        return {
            label: val.name
        }
    })

    const optionslot = data.map((val: any, i: any) => {
        return {
            label: val.localeTime
        }
    })
    const handleChange = (e: any, val: any) => {
        let obj = {
            ["appointment_date_time"]: val?.time,
            ["appointment_type_id"]: val?.appointmentTypeID,
            ["calendar_id"]: val?.calendarID
        }
        setSlots([...slots, obj])

    }
    const handleVirtualClass = (res: any) => {

        setValue({
            ["slots"]: slots,
            ["service_name"]: res?.name,
            ["appointment_date_time"]: res?.time,
            ["appointment_type_id"]: res?.appointmentTypeID,
            ["calendar_id"]: res?.calendarID,
            ["amount"]: res?.price,
            ["addtion_amount"]: price ? price - Number(res?.price) : 0,
            ["total_ammount"]: price
        })
        handleNext()
        setObjName(res)
    }
    console.log('==================>', value)
    console.log('[[[[[[[[[[[[[[[[', slots)
    console.log("price", price)
    console.log('priceArray',priceArry)

    // useEffect(()=>{
    //     setPrice(host[0]?.price)
    // },[])
    const convertDateToUtc = (data: any) => {
        const Cdate = new Date(data);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    return (
        <div>

            <section className='step-container step1'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-4'>Choose an Appointment</h3>
                    <p className='my-4'>Please choose a class time from the scheduler below that works best for your schedule.</p>
                </div>
                
                {
                    loadingWash ? <div className='loader-wash'><CircularProgress /></div> :
                        (
                            <>
                                {host.map((res: any) => (
                                    <div className="consult-card-container">
                                        <div className='d-flex py-3 px-3 justify-content-between '>
                                            <div className='consult-info d-flex flex-column w-100'>
                                                <div className='time-projection-details d-flex'>
                                                    <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                                                    <div className='availablity'>{res?.slotsAvailable}/{res?.slots} left</div>
                                                </div>
                                                <div className='consult-date-time d-flex justify-content-between mt-3 mb-1'>
                                                    <div className='consult-date'>{convertDateToUtc(res?.time)} </div>
                                                    <div className='consult-price'>
                                                        <span className='price'>${res?.price}</span>
                                                    </div>
                                                </div>

                                                <div className='consult-tm-dtls mb-3'>
                                                    <span className='consult-time'><span className='strong'> {disPlayTime(res?.time)} EST</span>  </span>
                                                    <span className='host-name'>| by {res?.calendar}</span>
                                                </div>
                                                <div className='btn-container'>
                                                    <button className='btn primary-blue-small-btn-40' key={res?.id} onClick={() => openAddonClass(res)}>Book</button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))
                                }
                            </>
                        )
                }



            </section>
        </div>
    )
}

export default ChooseDate