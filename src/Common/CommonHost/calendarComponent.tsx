import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify'
// import "./step.scss"
import { CircularProgress } from '@mui/material';
import { getAvilableDatesApi, getCalenderTimeApi, serviceBookingUpdate } from '../../Service/Cousult.service';
import Rescedule_Popup from './reschedulePopup';

let anyId: any = "anyAvailable"
function CalendarComponent({ data, handleNext, value, setValue, dateVisible, loadingWash, setDateVisible, id, setCalendarVisible, getUpcomingServiceAPI }: any) {
    const [date, setDate] = useState<any>()
    const [timeAv, setTimeAv] = useState<any>([])
    const [selectedTime, setSelectedTime] = useState("")
    const [slot, setSlot] = useState("")
    const [isAny, setIsAny] = useState(false)
    const [error, setError] = useState<any>({})
    const [availableDate, setAvailableDate] = useState<any>([])
    // const [slotAvai, setSlotAvai] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState<any>({})
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)

    const getAvailableTime = async (value: any, resData: any) => {
        try {

            if (resData === null) {
                setTimeAv({
                    ...timeAv,
                    ["any"]: []
                })
            } else {
                setTimeAv({
                    ...timeAv,
                    [resData?.calendar_id]: []
                })
            }
            let param: any = {
                acuity_calendar_id: resData === null ? "" : resData?.calendar_id,
                acuity_appointment_type_id: resData?.acuity_appointment_type_id,
                date: moment(value).format('YYYY-MM-DD')
            }
            const res: any = await getCalenderTimeApi(param)

            if (!res?.data?.success) {
                let message = res?.data?.message
                let allMsg = "";
                for (let i = 0; i < message.length; i++) {
                    allMsg += message[i]
                }
                alert(allMsg)
            }

            if (res.data.data.length === 0) {
                setSlot("No slot available ")

            } else {
                setSlot("")

            }
            if (res.data.success) {
                if (resData === null) {
                    setTimeAv({
                        ...timeAv,
                        ["any"]: res?.data?.data
                    })
                } else {
                    setTimeAv({
                        ...timeAv,
                        [resData?.calendar_id]: res?.data?.data
                    })
                }

            }
        } catch (error: any) {

        }
    }

    const changeDate = (value: any, res: any) => {

        if (res === null) {
            setDate({
                ...date,
                [res?.calendar_id]: ""
            })
        } else {

            setDate({
                ...date,
                [res?.calendar_id]: value
            })
        }
        getAvailableTime(value, res)

    }
    const dateTimeHandler = (dateTime: any, res: any, Event: any) => {

        Event.stopPropagation()
        setError({
            ...error,
            [res?.id]: ""
        })

        if (res === null) {
            setSelectedTime("isAny" + dateTime)
        } else {
            setSelectedTime(res?.calendar_id + dateTime + res?.id)
        }
        setValue({
            ...value,
            ["appointment_date_time"]: dateTime,
            // ["service_id"]: data?.service_id,
            ["calendar_id"]: res ? res?.calendar_id : "",
            ["appointment_type_id"]: res ? res?.acuity_appointment_type_id : "",
            ["user_id"]: userID?.id,
            ["id"]: id
            // ["service_name"]: data?.service_name
        })
    }
    const toggleDate = async (res: any) => {
        if (dateVisible?.includes(res?.id)) {
            let newValue = dateVisible.filter((data: any) => data !== res?.id)
            setDateVisible(newValue)

        } else {
            setDateVisible([res.id])
            setIsAny(false)
            let apiRes: any = await getAvilableDatesApi({
                acuity_calendar_id: res?.calendar_id,
                acuity_appointment_type_id: res?.acuity_appointment_type_id,
                year_date: new Date()
            })
            console.log("res", res)
            // setObjName(res)
            if (apiRes?.data?.success) {
                let changeToDate = []
                for (let i = 0; i < apiRes?.data?.data.length; i++) {

                    changeToDate.push(new Date(apiRes?.data?.data[i].date))

                }
                setAvailableDate({ ...availableDate, [res.id]: changeToDate })

            }
        }
    }

    const setDateAndTime = async (Event: any, res: any) => {
        try {
            Event.stopPropagation()
            if (!dateVisible?.includes(res?.id)) {
                toggleDate(res)
                return
            }
            if (!value?.appointment_date_time) {
                // toast.error("Please select date and time")
                setError({
                    ...error,
                    [res?.id]: "Please select date and time"
                })
            } else if (res?.calendar_id !== value?.calendar_id) {
                setError({
                    ...error,
                    [res?.calendar_id]: "Please select date and time of this consult"
                })
            } else {
                setLoading(true)
                let result: any = await serviceBookingUpdate(value)
                let message = result.data.message
                let msg = "";
                for (let i = 0; i < message.length; i++) {
                    msg += message[i];
                }
                if (result?.data?.success) {
                    toast.success(msg)
                    setLoading(false)
                    setOpen(false)
                    getUpcomingServiceAPI()
                    setTimeout(() => {
                        setCalendarVisible([])
                    }, 4500)
                }
                console.log(value)
                setDateVisible([])
                setError({
                    ...error,
                    [res?.id]: ""
                })
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }

    }
    const setDateAndTimeAny = (e: any, id: any) => {
        e.stopPropagation()
        let obj: any = {
            id: id,
            acuity_appointment_type_id: data?.acuity_appointment_type_id,
            acuity_calendar_id: '',
            year_date: new Date()
        }
        if (!isAny) {
            toggleDate(obj)
            setIsAny(true)
            setDateVisible([])
            return
        }
        if (!value?.appointment_date_time) {
            // toast.error("Please select date and time")
            setError({
                ...error,
                ["any"]: "Please select date and time"
            })
        } else if (value?.calendar_id) {
            setError({
                ...error,
                ["any"]: "Please select date and time of this consult"
            })
        } else {
            setError({
                ...error,
                ["any"]: ""
            })
            handleNext()
            setDateVisible([])
        }
    }
    const modifires: any = {
        highlight: 20
    }

    const openIsAny = async () => {
        setIsAny(!isAny)
        let apiRes: any = await getAvilableDatesApi({
            // acuity_calendar_id: res?.calendar_id,
            acuity_appointment_type_id: data?.acuity_appointment_type_id,
            year_date: new Date()
        })
        if (apiRes?.data?.success) {
            let changeToDate = []
            for (let i = 0; i < apiRes?.data?.data.length; i++) {

                changeToDate.push(new Date(apiRes?.data?.data[i].date))

            }
            setAvailableDate({ ...availableDate, ["isAny"]: changeToDate })
        }
    }
    console.log('dateVisible', dateVisible)
    const convertTimeToEst = (avTime: any) => {
        let date = new Date(avTime);
        let convertTime = date.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return convertTime;
    }

    const changeNavigate = async (value: any, res: any) => {
        try {
            let param: any = {
                acuity_calendar_id: res?.calendar_id,
                acuity_appointment_type_id: res?.acuity_appointment_type_id,
                year_date: moment(value).format('YYYY-MM')
            }
            let response: any = await getAvilableDatesApi(param)
            if (response?.data?.success) {
                let changeToDate = []
                for (let i = 0; i < response?.data?.data.length; i++) {

                    changeToDate.push(new Date(response?.data?.data[i].date))

                }
                setAvailableDate({ ...availableDate, [res.id]: changeToDate })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const changeAnyMonth = async (value: any, id: any) => {
        try {
            let apiRes: any = await getAvilableDatesApi({
                // acuity_calendar_id: res?.calendar_id,
                acuity_appointment_type_id: data?.acuity_appointment_type_id,
                year_date: moment(value).format('YYYY-MM')
            })
            if (apiRes?.data?.success) {
                let changeToDate = []
                for (let i = 0; i < apiRes?.data?.data.length; i++) {

                    changeToDate.push(new Date(apiRes?.data?.data[i].date))

                }
                setAvailableDate({ ...availableDate, [id]: changeToDate })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const openPopConfirm = (Event: any, res: any) => {
        Event.stopPropagation()
        if (!dateVisible?.includes(res?.id)) {
            toggleDate(res)
            return
        }
        if (!value?.appointment_date_time) {
            // toast.error("Please select date and time")
            setError({
                ...error,
                [res?.id]: "Please select date and time"
            })
        } else if (res?.calendar_id !== value?.calendar_id) {
            setError({
                ...error,
                [res?.calendar_id]: "Please select date and time of this consult"
            })
        } else {
            setOpen(true)
            setItem(res)
        }

    }
    // console.log(dateVisible)
    console.log(id)
    console.log(data)
    console.log(value)
    return (
        <div>
            <Rescedule_Popup open={open} setOpen={setOpen} data={item} text='Are you sure you want to rescedule your service registration?' handleBookPop={setDateAndTime} loading={loading} />
            <section className='step-container step1'>
                <ToastContainer />
                <div className='consult-section-heading text-center'>
                    <h3 className='my-4'>Choose an Appointment</h3>
                    <h5 className='mb-4'>30-minute Prospective Client Informational Call </h5>
                    <p className='mb-5'>Please use the calendar below to book an appointment on a day and time that works best for you.</p>
                </div>
                <div className="consult-card-container main-stepDiv py-4 px-3" onClick={openIsAny}>
                    <div className='card-container-inner d-flex flex-column flex-md-row justify-content-start justify-content-md-between align-items-md-center align-items-start'>
                        <div className='consult-info d-flex  align-items-center '>

                            <div className='consultant-name'>
                                <p className='m-0'>Any Available</p>
                            </div>

                        </div>
                        <div className={`btn-container-css  text-end ${isAny && "open-btn"}`}>
                            <button className='btn primary-blue-small-btn-40' onClick={(e) => setDateAndTimeAny(e, anyId)} >Book</button>
                        </div>
                        {/* <div className={`btn-container-css  text-end ${isAny && "open-btn"}`}>
                            <button className='btn primary-blue-small-btn-40' onClick={(e) => setDateAndTimeAny(e)} >Book</button>
                        </div> */}
                    </div>

                    {isAny && <>
                        <div className='calender-container' onClick={(e: any) => e.stopPropagation()}>
                            <p className='consult-inner-section text-center'>Select Date</p>
                            <div className='text-center consult-date'>
                                <DatePicker
                                    selected={date?.[data?.calendar_id]}
                                    onChange={(val) => changeDate(val, null)}
                                    inline
                                    minDate={new Date()}
                                    dateFormat='YYYY-MM-DD'
                                    popperModifiers={modifires}
                                    // renderDayContents
                                    onMonthChange={(e) => changeAnyMonth(e, anyId)}
                                    highlightDates={Array.isArray(availableDate[anyId]) && availableDate[anyId]}

                                />
                            </div>
                        </div>
                        <div className='timeslot-container text-center pb-3 mt-2'>
                            {Array.isArray(timeAv?.any) && < p className='consult-inner-section'>Select Time</p>}

                            {Array.isArray(timeAv?.any) && timeAv?.any.map((res: any) => <button className='btn time-btn' disabled={selectedTime === "isAny" + res?.time} onClick={(e) => dateTimeHandler(res?.time, null, e)} >
                                {moment(convertTimeToEst(res?.time)).format("LT")}</button>)}
                            <span className='error-msgtext d-block' ></span>
                            {slot}
                        </div>
                    </>}
                    <span className='error-msgtext bottom'>{error?.any}</span>
                </div>



                {/* <div className='section-navigation my-5 d-flex justify-content-end'>
                    <button className='primary-blue-small-btn next me-0 ms-auto' onClick={handleNext}>Next</button>
                </div> */}
                {/* <LoaderWash loadingWash={loadingWash} /> */}
                {
                    loadingWash ? <div className='loader-wash'> <CircularProgress /></div>
                        :
                        (
                            <>
                                {
                                    data?.map((res: any) => (
                                        <div className="consult-card-container main-stepDiv py-4 px-3" key={res?.id} onClick={() => toggleDate(res)} >
                                            <div className='card-container-inner d-flex flex-column flex-md-row justify-content-start justify-content-md-between align-items-md-center align-items-start'>
                                                <div className='consult-info d-flex  align-items-center '>
                                                    <div className='consultant-profile me-2' style={{ 'backgroundImage': `url(${res?.image})` }}>

                                                    </div>
                                                    <div className='consultant-name'>
                                                        <p className='m-0'>{res?.name}</p>
                                                    </div>

                                                </div>
                                                <div className={`btn-container-css  text-end ${dateVisible?.includes(res?.id) && "open-btn"}`}>
                                                    {timeAv[res?.calendar_id]?.length === 0 ? "" : <button className='btn primary-blue-small-btn-40' onClick={(e) => openPopConfirm(e, res)} > Book</button>}
                                                </div>
                                            </div>
                                            {dateVisible?.includes(res?.id) &&
                                                <>
                                                    <div className='calender-container' onClick={(e: any) => e.stopPropagation()}>
                                                        <p className='consult-inner-section text-center'>Select Date</p>
                                                        <div className='text-center consult-date'>
                                                            <DatePicker
                                                                selected={date?.[res?.calendar_id]}
                                                                onChange={(val) => changeDate(val, res)}
                                                                inline
                                                                minDate={new Date()}
                                                                dateFormat='YYYY-MM-DD'
                                                                // dateFormat="utc"
                                                                onMonthChange={(e) => changeNavigate(e, res)}
                                                                highlightDates={Array.isArray(availableDate[res?.id]) && availableDate[res?.id]}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className='timeslot-container text-center pb-3 mt-2'>
                                                        {(Array.isArray(timeAv[res?.calendar_id]) && timeAv[res?.calendar_id].length > 0) && <p className='consult-inner-section'>Select Time</p>}
                                                        {Array.isArray(timeAv[res?.calendar_id]) &&
                                                            timeAv[res?.calendar_id].map((t: any, index: number) => (
                                                                <button key={index} className='btn time-btn'
                                                                    disabled={selectedTime === res?.calendar_id + t?.time + res?.id}
                                                                    onClick={(e) => dateTimeHandler(t?.time, res, e)} >
                                                                    {moment(convertTimeToEst(t?.time)).format("LT")}

                                                                </button>
                                                            ))
                                                        }
                                                        {/* <span className='error-msgtext d-block' >{error?.[res?.id]}</span> */}
                                                        {slot}
                                                    </div>
                                                </>
                                            }

                                            <span className='error-msgtext bottom'>{error[res?.calendar_id]}</span>
                                        </div>
                                    ))
                                }
                            </>
                        )
                }

            </section >
        </div>
    )
}

export default CalendarComponent
