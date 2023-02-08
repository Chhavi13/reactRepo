import React, { useEffect, useState } from 'react'
import { Container, Row, ProgressBar, } from 'react-bootstrap';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./CourseView.scss"
import heart_outline from "../../Assets/img/course/heart-outline.svg";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import download_tips from "../../Assets/img/course/download.svg";
import transcriptImg from "../../Assets/img/course/transcript.svg";
import { useNavigate, useParams } from "react-router-dom"
import { FavoriteApi, getCourseDetailApi, LikeApi, videoProgresApi } from '../../Service/Course';
import parse from 'html-react-parser';
import moment from 'moment';
import Vimeo from '@u-wave/react-vimeo';
import heart_fill from "../../Assets/img/course/heart-fill.svg";
import { favCoursesetState } from '../../Utils/course/fav';
import { likeCourseSetState } from '../../Utils/course/like';
import { EventLikeSetState } from '../../Utils/Events/Like';
import { EventFavSetSate } from '../../Utils/Events/Fav';
import Transcript from './transcript';
import { BUYCOURSEDETAIL, COURSEVIEW, INSTRUCTOR } from '../../Routes/RouteConstent';
import CourseCard from '../../Common/CourseCard/CourseCard';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { useDispatch } from "react-redux";
import EventCard from '../../Common/EventCard/EventCard';
import { getFavEvent, getUpComingEvent } from '../../Redux/Events/EventsReducer';

const CourseView = () => {
  const param = useParams()
  const [data, setData] = useState<any>({})
  const [courseData, setCourseData] = useState<any>([])
  const [eventData, setEventData] = useState<any>([])
  const [transcript, setTranscript] = useState<boolean>(false)
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  let userID: any = localStorage.getItem("Nurture_user_data");
  if (userID) userID = JSON.parse(userID).id;

  const getDetails = async () => {
    try {
      if (!param?.id || param?.id === null) return
      let data = {
        course_id: Number(param?.id),
        user_id: userID
      }
      let res: any = await getCourseDetailApi(data)
      if (res?.data?.success) {
        setData(res?.data?.data)
        setCourseData(res?.data?.other_data)
        setEventData(res?.data?.upcoming_event)
        // setCourse(res?.data?.other_data)
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    getDetails()
  }, [param?.id])

  const singleCourseLike = async (resData: any) => {
    try {

      if (resData.like) {
        resData.like_count = resData.like_count - 1
      } else {
        resData.like_count = resData.like_count + 1
      }
      resData.like = !resData.like
      setData({ ...resData })
      let LikeRes: any = await LikeApi({ user_id: userID, course_id: resData.id })
      if (!LikeRes.data.success) {

        if (resData.like) {
          resData.like_count = resData.like_count - 1
        } else {
          resData.like_count = resData.like_count + 1
        }
        resData.like = !resData.like
        setData({ ...resData })
      }
      if (LikeRes) {
        dispatch(getCourse({ user_id: userID }))
        dispatch(getFavCourse({ user_id: userID }))
      }
    } catch (error) {
      if (resData.like) {
        resData.like_count = resData.like_count - 1
      } else {
        resData.like_count = resData.like_count + 1
      }
      resData.like = !resData.like
      setData({ ...resData })
    }

  }
  const singleCourseFav = async (resData: any) => {
    try {

      resData.favourite = !resData.favourite;
      setData({ ...resData })
      let FaveRes: any = await FavoriteApi({ user_id: userID, course_id: resData.id })
      if (!FaveRes?.data?.success) {
        resData.favourite = !resData.favourite;
        setData({ ...resData })
      }
      if (FaveRes) {
        dispatch(getCourse({ user_id: userID }))
        dispatch(getFavCourse({ user_id: userID }))
      }
    } catch (error: any) {

      resData.favourite = !resData.favourite;
      setData({ ...resData })

    }

  }
  const getInstructor = (id: any) => {
    Navigate(INSTRUCTOR + id)
  }
  const sendVideoDuration = async (duration: any, progress: any) => {
    try {
      let videoProgress = await videoProgresApi({
        user_id: userID, course_id: data?.id, duration: duration, progress: progress
        ,
        completed: progress / duration * 100 > 99 ? true : false
      })
      console.log('-osofofofosofos==>', videoProgress)

    } catch (error) {

    }
  }
  let convertToTime = (time: any) => {
    if (!time) {
      return 0
    }
    let timeValue = moment().startOf('day').add(time, 'seconds').format('m.ss')
    return timeValue;
  }
  const onVidePause = (info: any) => {
    sendVideoDuration(info.duration, info.seconds)

  }

  let onBack = () => {
    Navigate(-1)
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

  const eventLikeFav = (type: string, crrdata: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getUpComingEvent())
      dispatch(getFavEvent())
      return;
    }
    if (type === "fav") {
      EventFavSetSate(crrdata, eventData, setEventData)
    } else if (type === "like") EventLikeSetState(crrdata, eventData, setEventData, isUpdate)
    // eventLikeUpdRedux(crrdata, data, dispatch, updateEventFav, isUpdate)

  }

  return (
    <div className='course-view-page-container'>
      <Transcript open={transcript} setOpen={setTranscript} data={data?.transcript} />
      {/* <DetailPopup show={show} handleClose={handleClose} /> */}
      <div className="container-fluid course_detail_page mt-5 mb-4">
        <Row>
          <div className='col-lg-12 py-2'>
            <div className='back-pg' onClick={onBack}> <ArrowBackIosNewIcon />Back</div>
          </div>
        </Row>
        <Row>
          <div className='col-lg-12 selected-course-fulldetail'>
            <Container>
              <Row>
                <div className='col-lg-12'>
                  <Row className='py-3'>
                    <div className='col-lg-6 col-md-6'>
                      <div className='d-felx flex-column selected-course-video-sec'>
                        <div className='position-relative'>
                          {(data?.is_course ||
                            data?.is_membership) ?
                            <Vimeo
                              className='img-responsive'
                              video={data?.video}
                              onPause={(e) => { onVidePause(e) }}
                              onEnd={(e) => { onVidePause(e) }}
                              onSeeked={(e) => { onVidePause(e) }}
                              start={Number(data?.course_video_progress?.progress)}
                            // onProgress={(e) => { videoProgress(e) }}
                            />
                            : <img src={data?.image} className="img-responsive" />}
                          <div className="tags-likes d-flex justify-content-between">
                            {/* <div className="tags-row">
                                <span className="tag1 tags">tag 1</span><span className="tag2 tags">tag 2</span> 
                              </div> */}
                            <div className='fav-container' onClick={() => singleCourseFav(data)}>
                              <img src={data?.favourite ? heart_fill : heart_outline} className='img-responsive' />
                            </div>
                          </div>
                        </div>
                        {(data?.is_course ||
                          data?.is_membership) && data?.course_video_progress && < div className='progress-bar-container mt-4'>
                            <ProgressBar now={data?.course_video_progress?.progress / data?.course_video_progress?.duration * 100} />
                            <div className='pregress-bar-caption progress-status'>{(data?.course_video_progress?.progress / data?.course_video_progress?.duration * 100).toFixed()} % Completed</div>
                          </div>}
                        <div className='selected-course-footer mb-3'>
                          <div className='d-flex justify-content-between w-100'>
                            <div className='like d-flex align-items-center' onClick={() => singleCourseLike(data)}><img src={data?.like ? Liked : Like} className='me-2' /> {data?.like_count} parents like this </div>
                            <div className='video-dn-option'>
                              <div className='d-flex'>
                                {(data?.is_course ||
                                  data?.is_membership) && data?.doc && <div className='transcript px-2' onClick={() => window.open(data?.doc)}><img src={download_tips} /></div>}
                                {(data?.is_course ||
                                  data?.is_membership) && <div className='transcript ps-2' onClick={() => setTranscript(true)}><img src={transcriptImg} /></div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6 col-md-6 selected-course-details'>
                      <div className='d-flex flex-column ps-5 course-title-container'>
                        {/* <div className='tags-row'><span className='tag2 tags'>Live</span></div> */}
                        <div className='d-flex justify-content-between flex-column my-2'>
                          <div className='course-title me-md-2'>
                            {data?.title}
                          </div>
                          {(!data?.is_course &&
                            !data?.is_membership) && <div className='course-price'>${data?.amount}</div>}
                        </div>
                        <div className='course-description'>
                          <p>
                            {data?.summary}
                            {/* <br></br>
                            <span className='event-desc-more'>More</span> */}
                          </p>
                        </div>
                        <div className='instructor-details'>
                          <div className='d-flex flex-column'>
                            <div className='title-sec'>Instructor</div>
                            <div className='instrucrtor-info d-flex align-items-center my-1' onClick={() => getInstructor(data?.instructor?.id)}>
                              <div className='profile me-2' style={{ 'backgroundImage': `url(${data?.instructor?.photo})` }}>
                                {/* <img src={data?.instructor?.photo} /> */}
                              </div>
                              <div className='name'>
                                {data?.instructor?.name}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='course-ovrview my-3'>
                          <div className='d-flex flex-column'>
                            <div className='title-sec'>Course Overview</div>
                            {parse(String(data?.description))}
                            {/* <div className='overview-desc'>Taught by a Registered Nurse and Certified Lactation Consultant.</div>
                            <div className='topic-includes mt-2'>
                              <h3>Topics Include:</h3>
                              <ul>
                                <li>Normal newborn behaviors</li>
                                <li>What to expect right after deliver</li>
                              </ul>
                            </div> */}
                          </div>
                        </div>
                        {(!data?.is_course &&
                          !data?.is_membership) && <button className='primary-blue-btn w-100' onClick={() => Navigate(BUYCOURSEDETAIL, { state: { data } })}>Buy Now</button>}
                      </div>
                    </div>
                  </Row>
                </div>
              </Row>
            </Container>
          </div>
        </Row >
        <Row>
          <Container fluid>
            <Row>
              <div className="tab_main_courseContent get-ready col-lg-12 mt-3 mb-0 py-5">
                <Container className='paddingLR-00'>
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="section-heading mb-2 pb-0">Get ready <span className="head-bold">for Baby!</span></h2>
                      <h4 className="mb-4 text-center">Courses for your stage</h4>
                    </div>
                  </div>
                  <div className="row">
                    <CourseCard data={courseData} upDateData={courseLikeFav} />
                  </div>
                  <div className="row mt-5">
                    {/* <div className="col-md-12 text-center">
                      <button className="btn w-auto primary-blue-btn px-5">View All</button>
                    </div> */}
                  </div>
                </Container>
              </div>
            </Row>
          </Container>
        </Row>
        <Row>
          <div className='col-lg-12 paddingLR-0'>
            <div className='Upcoming-event-container pt-5 pb-3'>
              <Container>
                <Row>
                  <div className='col-lg-12 text-center'><h2 className='section-heading'>Upcoming <span className='head-bold'>Events</span></h2></div>
                </Row>
                <EventCard data={eventData} upDateData={eventLikeFav} />
              </Container>
            </div>
          </div>
        </Row>
        <Row>
          <div className='col-lg-12 col-md-12'>
            <div className='become-member my-4'>
              <div className='container'>
                <div className='col-lg-12 col-md-12'>
                  <div className='become-member-container p-5'>
                    <div className='row'>
                      <div className='col-lg-5'>
                        <div className='become-meber-captions'>
                          <h3>Become a Member
                            <span className="strong">for total access</span>
                          </h3>
                          <div className='price-dtls'>
                            <p>from <span className='pvalue strong'>$76.50</span> /mo</p>
                          </div>
                          <div>
                            <p>This is your all-access pass to our courses, videos, live webinars, Ask A Nurse, and more. </p>
                          </div>
                          <div>
                            <button className='secondary-teal-btn-small mt-4'>Read More</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div >
    </div >
  )
}

export default CourseView;