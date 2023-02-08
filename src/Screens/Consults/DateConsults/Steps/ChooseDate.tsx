import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
// import LoaderWash from '../../../../Common/Loader/LoaderWash';

const ChooseDate = ({ data, setData, handleNext, value, loadingWash, setValue, setObjName }: any) => {

    const chooseDateHandler = (res: any) => {
        // debugger
        setValue({
            ["service_name"]: res?.name,
            ["appointment_date_time"]: res?.time,
            ["appointment_type_id"]: res?.appointmentTypeID,
            ["calendar_id"]: res?.calendarID
        })
        setObjName(res)
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
    function getMonthDifference(startDate: any, endDate: any) {
        return (
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }
    

    return (
        <div>
            <section className='step-container step1'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-4'>Choose an Appointment</h3>
                    <p className='my-5'>Please choose a class time from the scheduler below that works best for your schedule.</p>
                </div>

                {
                    loadingWash ? <div className='loader-wash'> <CircularProgress /> </div>
                        :
                        (
                            <>
                                {Array.isArray(data?.data) && data?.data.map((res: any) => {
                                    // const daysDiff = moment(new Date(res?.time)).diff(moment(new Date()), 'days') 
                                    // const monthDiff = Math.floor(daysDiff/30) + 1                       

                                    let monthAlpha = ["this month","in next month","in next two month","in next three monts","in next four month","in next five month","in next six month"]
                                    
                                    let result = getMonthDifference(new Date(), new Date(res?.time))                            
                                    
                                    return (<div className="consult-card-container">
                                        <div className='d-flex py-3 px-3 justify-content-between'>
                                            <div className='consult-info d-flex flex-column w-100'>
                                                <div className='time-projection-details d-flex'>
                                                    {/* {console.log("tttt------>", (new Date(res?.time)?.getMonth()- new Date().getMonth())+1, 'month')} */}
                                                    {/* <div className='time-projection'>{ monthDiff <=1 ? "in a month": `in ${monthDiff} months`}</div> */}
                                                    {/* <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div> */}
                                                    <div className='time-projection'>{monthAlpha[result]}</div> 
                                                    <div className='availablity'> {res?.slotsAvailable} /{res?.slots} spots left</div>
                                                </div>
                                                <div className='consult-date-time d-flex justify-content-between mt-3 mb-2'>
                                                    <div className='consult-date'> {displayDate(res?.time)} </div>
                                                    <div className='consult-price'>
                                                        <span className='price'>{res?.price?res?.price:"Free"}</span>
                                                    </div>
                                                </div>

                                                <div className='consult-tm-dtls mb-1'>
                                                    <span className='consult-time'><span className='strong'> {disPlayTime(res?.time)} EST</span>  </span>
                                                    <span className='author-name'>| by {res?.calendar}</span><br />
                                                    <span>Duration: {res?.duration} Minutes</span>
                                                </div>

                                                <div className='btn-container mt-3'>
                                                    <button className='btn primary-blue-small-btn-40' onClick={() => chooseDateHandler(res)}>Book</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </>
                        )
                }
                {/* <LoaderWash loadingWash={loadingWash} /> */}
            </section>
        </div>
    )
}

export default ChooseDate