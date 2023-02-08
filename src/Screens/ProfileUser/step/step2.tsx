import moment from 'moment'
import React from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import video_list_thumb from '../../.././Assets/img/profile/video-list-thumb.png'
import { EVENTS, EVENTSDETAIL } from '../../../Routes/RouteConstent'
import parse from 'html-react-parser';
import { deleteEventAPI } from '../../../Service/edit_profile'
import Delete_Popup from './deletePop'

function Step2({ data, subStep1, getUpcomingEventAPI }: any) {
  console.log(data)
  console.log(subStep1)
  let Navigate = useNavigate()
  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<any>({})
  const handleRemoveEvent = async (id: number) => {
    // try {
    //   let param: any = {
    //     id: id,
    //     user_id: userID?.id
    //   }
    //   setLoading(true)
    //   let res: any = await deleteEventAPI(param)
    //   if (res?.data?.success) {
    //     getUpcomingEventAPI()
    //     setLoading(false)
    //   }
    // } catch (err) {
    //   console.log(err)
    //   setLoading(false)
    // }
    let param: any = {
      id: id,
      user_id: userID?.id
    }
    setOpen(true)
    setValue(param)
  }
  return (
    <div>
      <Delete_Popup open={open} setOpen={setOpen} data={value} getUpcomingEventAPI={getUpcomingEventAPI} text='Are you sure you want to cancel your event registration?' type="Event" />
      <Row>
        <div className='col-lg-12 col-md-12'>
          {
            data?.map((res: any, i: any) => (
              <>
                <div className='profile-container-main p-4 p-md-2 mb-3'>
                  <div className='d-flex align-items-md-center align-items-start profile-container-inner flex-column flex-md-row '>
                    <div className='profile-section-thumbnail mb-3 mb-md-0'>
                      <img src={res?.image} className='img-responsive' />
                    </div>
                    <div className='profile-section-detail d-flex flex-column flex-md-row align-items-center mx-0 mx-md-3'>
                      <div className='profile-sec-info'>
                        <h3 className='section-title'>
                          {/* Pregnant Mom’s Survival Group™ */}
                          {res?.title}
                        </h3>
                        <p className='sec-description'>
                          {parse(String(res?.description))}
                          {/* Dive into a robust course covering the first signs of labor to the birth of your baby and postpartum recovery. See live demonstrations of breathing, massage and relaxation techniques and an overview of pain medication. */}
                        </p>
                        <div className='section-time-container w-75'>
                          <span className='time-stamp'>{moment(res?.event_date_time).format('dddd, MMMM DD, YYYY')} <br /> {res?.event_start_time} - {res?.event_end_time}</span>
                        </div>
                      </div>

                      <div className='btn-conatainer ms-md-auto ms-0 me-md-0 me-auto mt-3 mt-md-2 mt-lg-0 ps-md-0 ps-lg-2 ps-0'>
                        {
                          res?.type === "Past" &&
                          <button className='primary-blue-small-btn-40 btn mb-1 me-1 me-md-0' onClick={() => { Navigate(EVENTSDETAIL + res?.id) }} >View Now</button>
                        }
                        {/* {
                          res?.type === "" && 
                          <button className='primary-blue-small-btn-40 btn mb-1 me-1 me-md-0' onClick={()=>{Navigate(EVENTSDETAIL + res?.id)}} >Upcoming</button>
                        } */}
                        {/* <button className='primary-blue-small-btn-40 btn mb-1 me-1 me-md-0' onClick={()=>{Navigate(EVENTSDETAIL + res?.id)}} >Reschedule</button> */}
                        {/* <button className='primary-outline-btn btn' onClick={()=>{Navigate(EVENTSDETAIL + res?.id)}} >Cancel</button> */}
                      </div>
                    </div>
                    {
                      (res?.type === 'Live' && res?.status !== 3) &&
                      <div className="upcoming me-0 me-md-3">
                        <label className='fw-normal text-white px-3 py-2 rounded-pill'>Upcoming</label>
                        <button className='primary-blue-small-btn-40 btn px-3 py-2' onClick={() => handleRemoveEvent(res?.id)} >Cancel</button>
                      </div>
                    }
                    {
                      (res?.type === 'Live' && res?.status === 3) &&
                      <div className="upcoming me-0 me-md-3">
                        <label className='fw-normal text-white px-3 py-2 rounded-pill'>Cancelled</label>
                      </div>
                    }

                  </div>
                </div>
              </>
            ))
          }
        </div>
      </Row>

      {
        (!data?.length && subStep1 == 1) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container event-icon'>

          </div>
          <h3>No Upcoming <strong>Event</strong></h3>
          <p>You don’t have any upcoming event. When you book an event it will appear here.</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(EVENTS)}} >View Event</button>
        </div>
      }

      {
        (!data?.length && subStep1 == 2) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container event-icon'>

          </div>
          <h3>No Past <strong>Event</strong></h3>
          <p>You don’t have any past event. All your past events will appear here.</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(EVENTS)}} >View Event</button>
        </div>
      }

      {
        (!data?.length && subStep1 == 3) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container favorite'>

          </div>
          <h3>Collect your <strong>Favorite</strong></h3>
          <p>Your favorite events will appear here</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(EVENTS)}} >View Event</button>
        </div>
      }

    </div>
  )
}

export default Step2