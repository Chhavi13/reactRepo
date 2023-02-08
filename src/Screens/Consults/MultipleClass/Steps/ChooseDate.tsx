import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import LoaderWash from '../../../../Common/Loader/LoaderWash';
import "../../consult";

const ChooseDate = ({ data, value, setValue, loadingWash, handleNext, setDateVisible, dateVisible ,setObjName}: any) => {

  const [showClass, setShowClass] = useState<any>(false)


  const chooseDateHandler = (res: any) => {
    let slots: any = []

    res?.multipleSlots && res?.multipleSlots.map((dValue: any) => {
      slots.push({
        appointment_date_time: dValue?.time,
        calendar_id: dValue?.calendarID, appointment_type_id: dValue?.appointmentTypeID
      })
    })
    setObjName(res)
    setValue({
      ["slots"]: slots,
      ["amount"]: res?.price,
      ["final_amount"]: res?.price
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
  console.log(showClass)
  return (
    <section className='step-container step1'>
      <div>
        <div className='consult-section-heading text-center'>
          <h3 className='my-5'>Choose an Appointment</h3>
          <p className='my-5'>Please choose a class time from the scheduler below that works best for your schedule.</p>
        </div>
        {
          loadingWash ? <div className='loader-wash'> <CircularProgress /> </div>
            :
            (
              <>
                {data?.data?.map((res: any) => (<div className="consult-card-container">
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
                        {/* <span className='consult-time'><span className='strong'> {disPlayTime(res?.time)}</span> {res?.duration} </span>
                        <span className='author-name'>| by {res?.calendar}</span> */}

                        <span className='consult-time'><span className='strong'> {disPlayTime(res?.time)} EST</span>  </span>
                        <span className='author-name'>| by {res?.calendar}</span><br />
                        <span> {getTotalDuration(res.multipleSlots)}</span>
                      </div>
                      <div className="show-class-tm">
                        <a className='showcls'onClick={() => showClasses(res)} >{showClass?"Hide":"Show"} Class times</a>
                        {dateVisible.includes(res?.id) && <ul className='show-class-slots p-0 m-0 mt-2'>
                          {res?.multipleSlots.map((date: any) => (
                            <li><p>{date?.localeTime}</p></li>

                          ))
                          }

                        </ul>}
                      </div>
                      <div className='btn-container mt-3'>
                        <button className='btn primary-blue-small-btn-40' onClick={() => chooseDateHandler(res)}>Book</button>
                      </div>
                    </div>

                  </div>
                </div>))}
              </>
            )
        }
      </div>
      {/* <LoaderWash loadingWash={loadingWash} /> */}
    </section>

  )
}

export default ChooseDate