import moment from 'moment'
import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CONSULTS, DATECONSULTS, HOME, MULTIPLECLASS, NURSECONSULTS, PREBABYBOOTCAMP, PRIVATECLASS, PRIVATECLASS2, PRIVATESLEEPCONSULT, VIRTUALCLASSCONSULTS } from '../../../Routes/RouteConstent';
import Delete_Popup from './deletePop';
import { getGroupConsultApi, gethostNameApi, getMultipleClassApi, getVirtualClassDateApi } from '../../../Service/Cousult.service';
import { CircularProgress } from '@mui/material';
import HostCommonComponent from '../../../Common/CommonHost/hostComponent';
import CalendarComponent from '../../../Common/CommonHost/calendarComponent';

function Step3({ data, subStep2, getUpcomingServiceAPI }: any) {
  const Navigate = useNavigate();
  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)
  const [loading, setLoading] = useState<boolean>(false)
  const [dateVisible, setDateVisible] = useState<any>([])
  const [dateVisible1, setDateVisible1] = useState<any>([])
  const [showClass, setShowClass] = useState<any>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<any>({})

  const [host, setHost] = useState<any>([])
  const [hostDate, setHostDate] = useState<any>([])
  const [hostVisible, setHostVisible] = useState<any>([])
  const [calendarVisible, setCalendarVisible] = useState<any>([])
  const [date, setDate] = useState<any>({})


  console.log('stepper from step3', data)
  console.log("++", subStep2)

  const handleBookAgain = (serName: string) => {
    if (serName === 'service_1') {
      Navigate(CONSULTS, { state: { param: serName } })
    }
    if (serName === 'service_2') {
      Navigate(NURSECONSULTS, { state: { param: serName } })
    }
    if (serName === 'service_3') {
      Navigate(NURSECONSULTS, { state: { param: serName } })
    }
    if (serName === 'service_4') {
      Navigate(DATECONSULTS, { state: { param: serName } })
    }
    if (serName === 'service_5') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'service_6') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'service_7') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'service_8') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'service_9') {
      Navigate(VIRTUALCLASSCONSULTS, { state: { param: serName } })
    }
    if (serName === 'service_10') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'service_11') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'service_12') {
      Navigate(MULTIPLECLASS, { state: { param: serName } })
    }
    if (serName === 'CPR and first aid private class') {
      Navigate(PRIVATECLASS, { state: { param: serName } })
    }
    if (serName === 'Initial lactation consult private class') {
      Navigate(PRIVATECLASS2, { state: { param: serName } })
    }
    if (serName === 'service_13') {
      Navigate(PREBABYBOOTCAMP, { state: { param: serName } })
    }
    if (serName === 'service_14') {
      Navigate(PRIVATESLEEPCONSULT, { state: { param: serName } })
    }
  }

  const codeCopFun = () => {
    var copyText: any = document.getElementById('codeInput');
    navigator.clipboard.writeText(copyText.value);
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

  const handleDownload = (url: string) => {
    window.open(url, "_blank")
  }
  const handleRemoveService = async (id: number) => {
    let param: any = {
      id: id,
      user_id: userID?.id
    }
    setOpen(true)
    setValue(param)
  }
  const handleRescedule = async (serviceID: string, id: number) => {
    try {
      if (serviceID === 'service_1' || serviceID === 'service_2' || serviceID === 'service_3' || serviceID === 'service_14') {
        if (!calendarVisible.includes(id)) {
          setCalendarVisible([id])
          setHostVisible([])
        } else {
          let index = calendarVisible.filter((item: number) => item !== id)
          setCalendarVisible(index)
        }

        setLoading(true)
        let response: any = await gethostNameApi({ service_prefix: serviceID })
        if (response?.data?.success) {
          setHostDate(response?.data?.data)
          setLoading(false)
        }
      } else {
        if (!hostVisible.includes(id)) {
          setHostVisible([id])
          setCalendarVisible([])
          setHost([])
        } else {
          let index = hostVisible.filter((item: number) => item !== id)
          setHostVisible(index)
        }
        let res: any
        if (serviceID === 'service_4') {
          res = await getGroupConsultApi({ service_prefix: serviceID })
        }

        const prefix = {
          service_prefix: serviceID
        }
        if (serviceID === 'service_5' || serviceID === 'service_6' || serviceID === 'service_7' || serviceID === 'service_8') {
          setLoading(true)          
          res = await getMultipleClassApi(serviceID, prefix)
        }
        if(serviceID === 'service_9' || serviceID === 'service_10' || serviceID === 'service_11' || serviceID === 'service_12'){
          res = await getVirtualClassDateApi(serviceID,prefix)
        }
        if (res?.data?.success) {
          setHost(res?.data?.data)
          setLoading(false)
        }
      }

    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  // console.log(calendarVisible[0])
  return (
    <div>
      <Delete_Popup open={open} setOpen={setOpen} data={value} getUpcomingServiceAPI={getUpcomingServiceAPI} text='Are you sure you want to cancel your service registration?' type='Service' />
      <Row>
        <div className='col-lg-12 col-md-12'>
          {
            data?.map((val: any, i: any) => (
              <div className='profile-container-main p-4 p-md-2 mb-3'>
                <div className='d-flex align-items-md-center align-items-start profile-container-inner flex-column flex-md-row '>
                  <div className='profile-section-thumbnail mb-3 mb-md-0'>
                    {/* {'Certificated is not uploaded yet'} */}
                    <img src={val?.image} className='img-responsive' />
                  </div>
                  <div className='profile-section-detail d-flex w-100 flex-column mx-0 mx-md-3'>
                    <div className='profile-sec-info profile-services-info'>
                      {subStep2 == 3 &&
                        <div className='senderinfo my-1'>
                          {val?.sender_name} <span className='sender-email'> ({val?.sender_email})</span> gifted you a
                        </div>
                      }
                      <h3 className='section-title'>
                        {val?.title}
                      </h3>
                      <div className='section-time-container'>
                        <span className='time-stamp fw-normal'>{moment(val?.event_date_time).format('DD MMM , YYYY')} - {val?.event_start_time.toUpperCase()}  to {val?.event_end_time.toUpperCase()} </span>
                        {
                          val?.slots?.length &&
                          <a className='showcls' onClick={() => showClasses(val)} >{dateVisible?.includes(val?.id) && showClass ? "Hide" : "Show"} Class times</a>
                        }
                        <ul>
                          {
                            (dateVisible?.includes(val?.id) && Array.isArray(val?.slots)) && val?.slots?.map((res: any) => (

                              <li><p>{res?.name} {moment(res?.event_date_time).format('DD MMM , YYYY')} - {res?.event_start_time.toUpperCase()}  to {res?.event_end_time.toUpperCase()} </p></li>

                            ))
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="coupencode-container mt-2">
                      {
                        subStep2 == 3 &&
                        <div className="position-relative">
                          <form>
                            <input type='text' value={val?.code} className='w-100 coupon-code-text' id='codeInput' />
                            <div className='copy-code position-absolute' onClick={codeCopFun}>
                              Copy
                            </div>
                          </form>
                        </div>
                      }

                    </div>

                  </div>

                  <div className='btn-conatainer mx-0 mx-md-3 mt-3 mt-md-0'>
                    <div className="book-download text-center">
                      {
                        subStep2 == 2 && <button className='primary-blue-small-btn-40 btn px-2 me-3' onClick={() => handleBookAgain(val?.service_id)}>Book Again</button>
                      }

                      {
                        (subStep2 == 1 && val?.status !== 3) && (<>
                          <button className='primary-blue-small-btn-40 btn mb-2' onClick={() => handleRescedule(val?.service_id, val?.id)} >Reschedule</button>
                          <button className='primary-blue-small-btn-40 btn' onClick={() => handleRemoveService(val?.id)} >Cancel</button>
                        </>)
                      }

                      {
                        (subStep2 == 1 && val?.status === 3) &&
                        <div className="upcoming me-0 me-md-3">
                          <label className='fw-normal text-white px-3 py-2 rounded-pill'>Cancelled</label>
                        </div>
                      }

                      {
                        (subStep2 == 2 && val?.is_certificate == 1) &&
                        <i className="fa fa-download" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" onClick={() => handleDownload(val?.download_url)}></i>
                      }

                    </div>
                  </div>
                </div>
                {calendarVisible?.includes(val?.id) && <CalendarComponent data={hostDate} value={date} setValue={setDate} loadingWash={loading} dateVisible={dateVisible1} setDateVisible={setDateVisible1} id={calendarVisible[0]}
                  setCalendarVisible={setCalendarVisible} getUpcomingServiceAPI={getUpcomingServiceAPI} />}
                {hostVisible?.includes(val?.id) && <HostCommonComponent data={host} value={date} setValue={setDate} loading={loading} dateVisible={dateVisible1} setDateVisible={setDateVisible1} service_id={val?.service_id} id={hostVisible[0]}
                setHostVisible={setHostVisible} getUpcomingServiceAPI={getUpcomingServiceAPI} />}
              </div>
            ))
          }
        </div>
      </Row>

      {
        (!data?.length && subStep2 == 1) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container service-icon'>

          </div>
          <h3>No Upcoming <strong>Services</strong></h3>
          <p>You don’t have any upcoming service. When you book a service it will appear here.</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={() => { Navigate(HOME) }} >View Services</button>
        </div>
      }

      {
        (!data?.length && subStep2 == 2) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container service-icon'>

          </div>
          <h3>No Past <strong>Services</strong></h3>
          <p>You don’t have any past service. All your past services  will appear here.</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={() => { Navigate(HOME) }} >View Services</button>
        </div>
      }
    </div>
  )
}

export default Step3



