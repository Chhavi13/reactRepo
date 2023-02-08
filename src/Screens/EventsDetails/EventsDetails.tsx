import React, { useEffect, useState } from 'react'
import { Container, Row, ProgressBar } from 'react-bootstrap';
import "./EventsDetails.scss";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LiveEventSIcon from "../../Assets/img/liveevents/LiveEventSIcon.svg";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EventDetailApi, EventLikeApi, EventVideoProgressApi, FavEventApi } from '../../Service/Events';
import moment from 'moment';
import { EventFavSetSate } from '../../Utils/Events/Fav';
import { favCoursesetState } from '../../Utils/course/fav';
import { EventLikeSetState } from '../../Utils/Events/Like';
import { likeCourseSetState } from '../../Utils/course/like';
import DetailPopup from './detailFormPopup';
import { ToastContainer, toast } from 'react-toastify';
import CongratsModel from '../../Common/CongratsPopoup/congratsModel';
import Vimeo from '@u-wave/react-vimeo';
import { BUYCOURSEDETAIL, COURSEVIEW, EVENTS, PROFILEUSER } from '../../Routes/RouteConstent';
import parse from "html-react-parser";
import CourseCard from '../../Common/CourseCard/CourseCard';
import { useDispatch } from "react-redux"
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import EventCard from '../../Common/EventCard/EventCard';
import { getFavEvent, getUpComingEvent } from '../../Redux/Events/EventsReducer';


const EventsDetails = () => {

  const param = useParams()
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const { state }: any = useLocation()


  console.log("location", state)
  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)?.id;

  //  let user_profile_location:any =localStorage.getItem("user_profile_location")
  //  user_profile_location=JSON.parse(user_profile_location)

  const [show, setShow] = useState<any>(false)
  const handleClose = () => {
    setShow(false)
  }

  const [data, setData] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false)
  const [upcomingEvent, setUpcomingEvent] = useState<any>([]);
  const [courseData, setCourseData] = useState<any>([]);
  const getData = async () => {
    try {
      let data = {
        event_id: param?.id,
        user_id: userID
      }
      let res: any = await EventDetailApi(data)      
      if (res?.data?.success) {
        setData(res?.data?.data)
        setUpcomingEvent(res.data.upcoming_event)
        setCourseData(res?.data?.course_rows)
      }
      // dispatch(getEventDetail(data))
    } catch (error) {
      console.log(error)
    }
  }
  const handleEventLike = async (datas: any) => {
    try {
      let newData = {
        user_id: userID,
        event_id: data?.id
      }

      data.like_count = !data.like ? data.like_count + 1 : data.like_count - 1

      data.like = !data.like
      setData({ ...data })
      let res: any = await EventLikeApi(newData)
      if (!res?.data?.success) {
        data.like_count = !data.like ? data.like_count + 1 : data.like_count - 1
        data.like = !data.like
        setData({ ...data })
      }
    } catch (err) {
      data.like_count = !data.like ? data.like_count + 1 : data.like_count - 1

      data.like = !data.like
      setData({ ...data })
      console.log(err)
    }
  }
  useEffect(() => {
    
    getData()
    // console.log(param?.id)
  }, [Navigate])



  const trigPopup = () => {
    setOpen(true)
  }

  const courseLikeFav = (type: any, data: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getCourse({ user_id: userID }))
      dispatch(getFavCourse({ user_id: userID }))
      return;
    }
    if (type === "fav") {
      favCoursesetState(data, courseData, setCourseData)
    } else if (type === "like") {
      likeCourseSetState(data, courseData, setCourseData)
    }
  }

  const handleBack = () => {
    // if(user_profile_location?.pathname ==="/user-profile"){
    //   debugger
      Navigate(-1)

    // }else{

      // Navigate(EVENTS, { state: { tab: state?.tab } })
    // }
    // debugger
  }

  const onVidePause = async (info: any) => {
    let videoProgress = await EventVideoProgressApi({ user_id: userID, event_id: data?.id, duration: info.duration, progress: info.seconds })
    console.log('-osofofofosofos==>', videoProgress)
  }

  const eventLikeFav = (type: string, crrdata: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getUpComingEvent())
      dispatch(getFavEvent())
      return;
    }
    if (type === "fav") {
      EventFavSetSate(crrdata, upcomingEvent, setUpcomingEvent)
    } else if (type === "like") EventLikeSetState(crrdata, upcomingEvent, setUpcomingEvent, isUpdate)
  }

  return (
    <div className='events-detail-container' >
      <CongratsModel
        open={open} setOpen={setOpen}
        text="Thanks for registering on this event"
      />
      <ToastContainer />
      <DetailPopup show={show} setData={setData} setOpen={setOpen} trigPopup={trigPopup} handleClose={handleClose} value={data} toast={toast} />
      <Container fluid >
        <Row>
          <div className='col-lg-12 py-2'>
            <div className='back-pg' onClick={handleBack}> <ArrowBackIosNewIcon />Back</div>
          </div>
        </Row>
        <Row>
          <div className='col-lg-12 selected-event-fulldetail'>
            <Container>
              <Row>

                <div className='col-lg-12'>
                  <Row className='py-3'>
                    <div className='col-lg-6 col-md-6'>
                      <div className='d-felx flex-column selected-event-video-sec'>
                        <div>
                          {data?.type == ("Past" || "past") ?
                            <>
                              {data?.video ?
                                <Vimeo className='w-100'
                                  video={data?.video}
                                  onPause={(e) => { onVidePause(e) }}
                                  onEnd={(e) => { onVidePause(e) }}
                                  onSeeked={(e) => { onVidePause(e) }}
                                  start={Number(data?.course_video_progress?.progress)}
                                // width={ 100% }
                                // video="https://vimeo.com/644908467"
                                />
                                : <img src={data?.image} className="img-responsive" />
                              }
                            </>
                            : <img src={data?.image} className="img-responsive" />}
                        </div>
                        <div className='live-event-footer d-flex justify-content-between my-3'>
                          <div className='like'><img src={data?.like ? Liked : Like} onClick={(datas) => handleEventLike(datas)} /> {data?.like_count} Parents like this</div>
                        </div>
                        <div>
                          {data?.event_video_progress && <ProgressBar now={data?.event_video_progress?.progress * data?.event_video_progress?.duration / 100} />}

                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6 selected-event-details'>
                      <div className='d-flex flex-column'>
                        <div className='tags-row'><span className='tag2 tags'>{data.type === "Past"?"Past Events":data.type}</span></div>
                        <div className='event-title my-2'>
                          {/* Pediatric Dietitian, Ashley */}
                          {data?.title}
                        </div>
                        {
                          data?.type === ('Live' || 'live') &&

                          <div className='live-event-desc-sche py-3 px-5'>
                            <div className='d-flex justify-content-center'>
                              <div className='me-4'><img src={LiveEventSIcon} /></div>
                              <div className='event-time'>
                                {moment(data?.event_date).format('LLLL')} <br />
                              </div>
                            </div>
                          </div>
                        }
                        <div className='event-description'>
                          <p>
                            {/* Help your family transition into toddlerhood with less meal time stress and more feeding success! Ashley will equip you with the feeding tools you need to tackle any meal time challenge. Learn how to apply her Love it, Like it, Learning it ® framework so that you feel confident in structuring meals, offering variety, and minimizing mental fatigue around food. You will leave the time together with expert advice and encouragement that keeps your family out of a feeding rut but rather moving forward to a healthier relationship with food.  Join us live so we can answer YOUR personal questions as well!Ashley is a Pediatric Dietitian, mom to 3 children and founder of @veggiesandvirtue (follow her page on Instagram!) */}
                            {parse(String(data?.description))}&nbsp;

                          </p>
                        </div>
                        {data?.type !== ("Past" || "past") && <button className='primary-blue-btn w-100' disabled={data?.is_book ? true : false || data?.type == ("past" || "Past") && true} onClick={() => setShow(true)}>{data?.is_book ? "Registered" : "Register Now"}</button>}
                        {/* <button onClick={() => setShow(true)}>Fire popup</button> */}
                      </div>
                    </div>
                  </Row>
                </div>
              </Row>
              <Row>
                <div className='col-lg-12'>
                  <div className='recorder-session-ntf-block w-100 py-4 px-5 mb-5'>
                    <div className='d-flex justify-content-center align-items-center flex-column mx-auto px-5 sec-caption'>
                      <h2>Can’t make it live? <span className='head-bold'>No problem!</span></h2>
                      <p className='mb-0'>All webinars are recorded, and the recording is available to all registered participants even after the event has ended
                      </p>
                      <button className="btn primary-blue-small-btn-40 mt-5">Learn More</button>
                    </div>
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        </Row>
        <Row>
          <div className='col-lg-12 paddingLR-0'>
            <div className='Upcoming-event-container pt-5 pb-3'>
              <Container>
                <Row>
                  <div className='col-lg-12 text-center'><h2 className='section-heading'>Upcoming <span className='head-bold'>Events</span></h2></div>
                </Row>

                <EventCard data={upcomingEvent} upDateData={eventLikeFav} />
              </Container>
            </div>
          </div>
        </Row>
        <Row className='mt-3 mb-3'>
          <div className='col-lg-12 get-readyf-baby-container pt-5 pb-3'>
            <Container>
              <Row>
                <div className='col-lg-12 text-left'>
                  <h2 className='section-heading mb-2 pb-0'>Get ready <span className='head-bold'>for Baby!</span></h2>
                  <h4 className='mb-4'>Courses for your stage</h4>
                </div>
              </Row>
              <Row>
                <CourseCard data={courseData} upDateData={courseLikeFav} />
              </Row>
              <Row>
                {/* <div className='col-lg-12 col-md-12 text-center'>
                  <button className='btn primary-blue-small-btn me-auto ms-auto'>View All</button>
                </div> */}
              </Row>
            </Container>
          </div>

        </Row>
      </Container>
    </div >
  )
}

export default EventsDetails;