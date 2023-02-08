import { SlowMotionVideoSharp } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import moment from 'moment'
import React, { useState } from 'react'
import "../../consult";

function ChooseDate({ host, value, setValue, loadingWash, handleNext, dateVisible,
  setDateVisible, setObjName, slots, setSlots, price, setPrice, setAddOn, setSelectClasses, setSelectSlots, setClassTime }: any) {
  // debugger  
  const [showClass, setShowClass] = useState<any>(false)
  const disPlayTime = (date: any) => {
    const Cdate = new Date(date);
    let converted_date = Cdate.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
    return moment(converted_date).format("LT")
  }

  const showHideClass = (id: any) => {
    if (dateVisible.includes(id)) {
      let newValue = dateVisible.filter((data: any) => data !== id)
      setDateVisible(newValue)
    } else {
      setDateVisible([...dateVisible, id])
    }
  }
  const displayDate = (date: any) => {
    const Cdate = new Date(date);
    let converted_date = Cdate.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
    return moment(converted_date).format("dddd DD MMM YYYY")
  }

  const chooseDateHandler = (res: any) => {
    // let slots:any = []   
    // res?.multipleSlots?.map((val:any)=>{
    //   slots.push({
    //     appointment_date_time:val?.time,
    //     appointment_type_id:val?.appointmentTypeID,
    //     calendar_id:val?.calendarID
    //   })
    // })   
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
    // debugger
    // setValue({
    //   ["slots"]: slots,
    //   ["amount"]: res?.price,
    //   ["time"]: res?.time
    // })
    handleNext()
    setObjName(res)
    let ids = slots.map((val: any, i: any) => val?.appointment_type_id)
    // if (!ids.includes(res?.appointmentTypeID)) {
    //   setSlots([...slots, obj])
    // } 
    if (ids.includes(res?.appointmentTypeID)) {
      setSlots([])
    }else{
      setSlots([obj])
    }    
    setValue({})
    setDateVisible([])
    setAddOn({})
    setSelectClasses([])
    setPrice(host[0]?.price)
    setSelectSlots([])
    setClassTime([])

    //  else {
    //   // let newVal = slots.filter((data: any) => data?.appointment_type_id !== res?.appointmentTypeID)
    //   let newVal = slots.filter((elem:any)=> !elem?.appointment_type_id && res?.appointmentTypeID)
    //   debugger
    //   setSlots(newVal)
    // }
    // setSlots([...slots, obj])
  }
  const getTotalDuration = (slots: any) => {
    var totalDuration = slots.reduce(function (accumulator: Number, value: any) {
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

  return (
    <section className='step-container step1'>
      <div>
        <div className='consult-section-heading text-center'>
          <h3 className='my-5'>Choose an Appointment</h3>
          <p className="my-5">Choose a bootcamp time from below.</p>
        </div>
        {
          loadingWash ? <div className='loader-wash'> <CircularProgress /> </div>
            : (
              <>
                {
                  host?.map((res: any) => {
                    return (
                      <div className="consult-card-container">
                        <div className='d-flex py-3 px-3 justify-content-between'>
                          <div className='consult-info d-flex flex-column w-100'>
                            <div className='time-projection-details d-flex'>
                              <div className='time-projection'>{moment(res?.time).startOf('day').fromNow()}</div>
                              <div className='availablity'> {res?.slotsAvailable}/{res?.slots} spots left</div>
                            </div>
                            <div className='consult-date-time d-flex justify-content-between mt-3 mb-1'>
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
                              <span>{getTotalDuration(res.multipleSlots)}</span>
                            </div>
                            <div className="show-class-tm">
                              <a className='showcls' onClick={() => showClasses(res)} >{showClass ? "Hide" : "Show"} PBB dates</a>
                              {
                                dateVisible.includes(res?.id) &&
                                <ul className='show-class-slots p-0 m-0 mt-2'>
                                  {res?.multipleSlots.map((date: any) => (
                                    <li><p>{date?.localeTime}</p></li>

                                  ))
                                  }
                                </ul>
                              }
                            </div>
                            <div className='btn-container mt-3'>
                              <button className='btn primary-blue-small-btn-40' onClick={() => chooseDateHandler(res)}>Book</button>
                            </div>
                          </div>

                        </div>
                      </div>
                    )
                  })
                }

              </>

            )

        }


      </div>

    </section>
  )
}

export default ChooseDate
