import moment from 'moment'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { groupSlotBookingUpdateAPI, serviceBookingUpdate } from '../../Service/Cousult.service'
import Rescedule_Popup from './reschedulePopup'

function HostCommonComponent({ data, dateVisible, setDateVisible, value, setValue, service_id, id, getUpcomingServiceAPI, setHostVisible }: any) {
    console.log(service_id)
    console.log(id)
    console.log(data)
    const [open, setOpen] = useState<any>(false)
    const [item, setItem] = useState<any>({})
    const [showClass, setShowClass] = useState<any>(false)
    const [loading, setLoading] = useState(false)
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)
    const displayDate = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("dddd DD MMM YYYY")
    }
    const disPlayTime = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("LT")
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
    const chooseDateHandler = async (e: any, res: any) => {
        try {
            let slots: any = []
            if (service_id === 'service_4') {
                let param = {
                    appointment_date_time: res?.time,
                    appointment_type_id: res?.appointmentTypeID,
                    calendar_id: res?.calendarID,
                    user_id: userID?.id,
                    id: id
                }
                setLoading(true)
                let response: any = await serviceBookingUpdate(param)
                let message = response.data.message
                let msg = "";
                for (let i = 0; i < message.length; i++) {
                    msg += message[i];
                }
                if (response?.data?.success) {
                    toast.success(msg)
                    setLoading(false)
                    setOpen(false)
                    getUpcomingServiceAPI()
                    setTimeout(() => {
                        setHostVisible([])
                    }, 4500)
                }
            } else {

                res?.multipleSlots && res?.multipleSlots.map((dValue: any) => {
                    slots.push({
                        appointment_date_time: dValue?.time,
                        calendar_id: dValue?.calendarID, appointment_type_id: dValue?.appointmentTypeID
                    })
                })
                // setObjName(res)
                setValue({
                    ["slots"]: slots,
                    ["amount"]: res?.price,
                    ["final_amount"]: res?.price,

                    ["appointment_date_time"]: res?.time,
                    ["appointment_type_id"]: res?.appointmentTypeID,
                    ["calendar_id"]: res?.calendarID,
                    ["user_id"]: userID?.id,
                    ["id"]: id,
                })
                let param = {
                    slots: slots,
                    id: id,
                    user_id: userID?.id
                }
                let result: any = await groupSlotBookingUpdateAPI(param)
                debugger
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }

        // handleNext()
    }
    const openPopConfirm = (res: any) => {
        setOpen(true)
        setItem(res)
    }

    const getHostStepper = (item: any) => {
        if (service_id === 'service_9' || service_id === 'service_10' || service_id === 'service_11' || service_id === 'service_12') {
            return (
                item?.map((res: any) => (
                    <div className='step-container step1 mt-5'>
                        <div className="consult-card-container">
                            <div className='d-flex py-3 px-3 justify-content-between'>
                                <div className='consult-info d-flex flex-column'>
                                    <div className='time-projection-details d-flex'>
                                        <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                                        <div className='availablity'>{res?.slotsAvailable} /{res?.slots} spots left</div>
                                    </div>
                                    <div className='consult-date my-3'><span className='strong'>{displayDate(res?.time)} </span></div>
                                    <div className='consult-tm-dtls mb-3'>
                                        <span className='consult-time'><span className='strong'>{disPlayTime(res?.time)} EST </span>  </span>
                                        <span className='host-name'>| by {res?.calendar}</span>
                                    </div>
                                    <div className='btn-container'>
                                        <button className='btn primary-blue-small-btn-40' onClick={(e) => openPopConfirm(res)} >Book</button>
                                    </div>
                                </div>
                                <div className='consult-price'>
                                    <span className='price'>$100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
        } else if (service_id === 'service_4') {
            return (
                item?.map((res: any) => (
                    <div className='step-container step1 mt-5'>
                        <div className="consult-card-container">
                            <div className='d-flex py-3 px-3 justify-content-between'>
                                <div className='consult-info d-flex flex-column'>
                                    <div className='time-projection-details d-flex'>
                                        <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                                        <div className='availablity'>{res?.slotsAvailable} /{res?.slots} spots left</div>
                                    </div>
                                    <div className='consult-date my-3'><span className='strong'>{displayDate(res?.time)} </span></div>
                                    <div className='consult-tm-dtls mb-3'>
                                        <span className='consult-time'><span className='strong'>{disPlayTime(res?.time)} EST </span>  </span>
                                        <span className='host-name'>| by {res?.calendar}</span>
                                    </div>
                                    <div className='btn-container'>
                                        <button className='btn primary-blue-small-btn-40' onClick={(e) => openPopConfirm(res)} >Book</button>
                                    </div>
                                </div>
                                <div className='consult-price'>
                                    <span className='price'>$100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
        } else {
            return (
                item.map((res: any) => (
                    <div className='step-container step1 mt-5'>
                        <div className="consult-card-container">
                            <div className='d-flex py-3 px-3 justify-content-between'>
                                <div className='consult-info d-flex flex-column w-100'>
                                    <div className='time-projection-details d-flex'>
                                        <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                                        <div className='availablity'> {res?.slotsAvailable} /{res?.slots} spots left</div>
                                    </div>
                                    <div className='consult-date-time d-flex justify-content-between my-3'>
                                        <div className='consult-date'> {displayDate(res?.time)} </div>
                                        <div className='consult-price'>
                                            <span className='price'>${res?.price}</span>
                                        </div>
                                    </div>
                                    <div className='consult-tm-dtls mb-1'>
                                        <span className='consult-time'><span className='strong'> {disPlayTime(res?.time)} EST</span>  </span>
                                        <span className='author-name'>| by {res?.calendar}</span><br />
                                        <span> {getTotalDuration(res.multipleSlots)}</span>
                                    </div>
                                    <div className="show-class-tm">
                                        <a className='showcls' onClick={() => showClasses(res)} >{showClass ? "Hide" : "Show"} Class times</a>
                                        {dateVisible.includes(res?.id) && <ul className='show-class-slots p-0 m-0 mt-2'>
                                            {res?.multipleSlots?.map((date: any) => (
                                                <li><p>{date?.localeTime}</p></li>
                                            ))
                                            }
                                        </ul>}
                                    </div>
                                    <div className='btn-container mt-3'>
                                        <button className='btn primary-blue-small-btn-40' onClick={() => openPopConfirm(res)}>Book</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            )
        }
    }
    return (
        <>
            <Rescedule_Popup open={open} setOpen={setOpen} data={item} text='Are you sure you want to rescedule your service registration?' handleBookPop={chooseDateHandler} loading={loading} />
            <ToastContainer />
            {/* {data?.map((res: any) => (
                <div className='step-container step1 mt-5'>
                    <div className="consult-card-container">
                        {
                            service_id === 'service_4' ? (
                                <div className='d-flex py-3 px-3 justify-content-between'>
                                    <div className='consult-info d-flex flex-column'>
                                        <div className='time-projection-details d-flex'>
                                            <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                                            <div className='availablity'>{res?.slotsAvailable} /{res?.slots} spots left</div>
                                        </div>
                                        <div className='consult-date my-3'><span className='strong'>{displayDate(res?.time)} </span></div>
                                        <div className='consult-tm-dtls mb-3'>
                                            <span className='consult-time'><span className='strong'>{disPlayTime(res?.time)} EST </span>  </span>
                                            <span className='host-name'>| by {res?.calendar}</span>
                                        </div>
                                        <div className='btn-container'>
                                            <button className='btn primary-blue-small-btn-40' onClick={(e) => openPopConfirm(res)} >Book</button>
                                        </div>
                                    </div>
                                    <div className='consult-price'>
                                        <span className='price'>$100</span>
                                    </div>
                                </div>) : (
                                <div className='d-flex py-3 px-3 justify-content-between'>
                                    <div className='consult-info d-flex flex-column w-100'>
                                        <div className='time-projection-details d-flex'>
                                            <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                                            <div className='availablity'> {res?.slotsAvailable} /{res?.slots} spots left</div>
                                        </div>
                                        <div className='consult-date-time d-flex justify-content-between my-3'>
                                            <div className='consult-date'> {displayDate(res?.time)} </div>
                                            <div className='consult-price'>
                                                <span className='price'>${res?.price}</span>
                                            </div>
                                        </div>
                                        <div className='consult-tm-dtls mb-1'>
                                            <span className='consult-time'><span className='strong'> {disPlayTime(res?.time)} EST</span>  </span>
                                            <span className='author-name'>| by {res?.calendar}</span><br />
                                            <span> {getTotalDuration(res.multipleSlots)}</span>
                                        </div>
                                        <div className="show-class-tm">
                                            <a className='showcls' onClick={() => showClasses(res)} >{showClass ? "Hide" : "Show"} Class times</a>
                                            {dateVisible.includes(res?.id) && <ul className='show-class-slots p-0 m-0 mt-2'>
                                                {res?.multipleSlots?.map((date: any) => (
                                                    <li><p>{date?.localeTime}</p></li>

                                                ))
                                                }
                                            </ul>}
                                        </div>
                                        <div className='btn-container mt-3'>
                                            <button className='btn primary-blue-small-btn-40' onClick={() => openPopConfirm(res)}>Book</button>
                                        </div>
                                    </div>

                                </div>

                            )
                        }

                    </div>
                </div>
            ))} */}


            {getHostStepper(data)}

        </>
    )
}

export default HostCommonComponent