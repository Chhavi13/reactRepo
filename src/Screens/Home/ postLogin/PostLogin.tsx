import React, { useEffect, useState } from 'react'
import { Container, Row, Image, Card } from 'react-bootstrap'
import hi_icon from "../../../Assets/img/homepage/hi-green.svg";
import "./PostLogin.scss";
import heart_outline from "../../../Assets/img/course/heart-outline.svg";
import Like from "../../../Assets/img/icons/like.svg";
import VideoThumbnail from "../../../Assets/img/asknurse/Panel.jpg";
import blog_featured from "../../../Assets/img/homepage/Panel.png";
import blog_thumb1 from "../../../Assets/img/homepage/Panel(1).png";
import blog_thumb2 from "../../../Assets/img/homepage/Panel(2).png";
import blog_thumb3 from "../../../Assets/img/homepage/Panel(3).png";
import { ClassNames } from '@emotion/react';
import profile_progess from "../../../Assets/img/homepage/Progress-Profile.png";
import { getPostLoginDataApi } from '../../../Service/postLogin';
import CourseCard from '../../../Common/CourseCard/CourseCard';
import EventCard from '../../../Common/EventCard/EventCard';
import { COURSE } from '../../../Routes/RouteConstent';
import { useNavigate } from 'react-router-dom';
import Free30Min from '../../../Common/FreeConsult/30MinFree';
import LockScreen from '../../../Common/LockScreen/LockScreen';
import { useDispatch } from 'react-redux';
import { getCourse, getFavCourse } from '../../../Redux/Course/CourseReducer';
import { favCoursesetState } from '../../../Utils/course/fav';
import { likeCourseSetState } from '../../../Utils/course/like';
import { getFavEvent, getUpComingEvent } from '../../../Redux/Events/EventsReducer';
import { getUserID } from '../../../Service/getLocalStorage';
import { EventFavSetSate } from '../../../Utils/Events/Fav';
import { EventLikeSetState } from '../../../Utils/Events/Like';
import { Box, CircularProgress } from '@mui/material';
import profile from "../../../Assets/img/profile.png";



const PostLogin = () => {

  const [course, setCourse] = useState<any>([])
  const [event, setEvent] = useState<any>([])
  const [data, setData] = useState<any>([])
  const [onGoingCourse, setOnGoingCourse] = useState<any>([])
  const [pastEvent, setPastEvent] = useState<any>([])

  const Navigate = useNavigate();
  const dispatch = useDispatch();


  const getData = async () => {
    try {
      let res: any = await getPostLoginDataApi()

      setCourse(res?.data?.courses)
      setEvent(res?.data?.upcoming_event)
      setData(res?.data)
      setOnGoingCourse(res?.data?.ongoing_courses)
      setPastEvent(res?.data?.registered_event)
    } catch (error: any) {

    }
  }

  useEffect(() => {
    getData()
  }, [])
  const navigateTo = (to: any) => {
    Navigate(to)
  }

  console.log("all data", data)
  const courseLikeFav = (type: any, res: any, isUpdate: boolean, isSuccess: boolean) => {
    let id = getUserID()
    if (isSuccess) {
      dispatch(getCourse({ user_id: id }))
      dispatch(getFavCourse({ user_id: id }))
      return;
    }
    if (type === "fav") {
      favCoursesetState(res, course, setCourse)
    } else if (type === "like") {
      likeCourseSetState(res, course, setCourse)
    }
  }
  const onGoingCourseFavLike = (type: any, res: any, isUpdate: boolean, isSuccess: boolean) => {
    let id = getUserID()
    if (isSuccess) {
      dispatch(getCourse({ user_id: id }))
      dispatch(getFavCourse({ user_id: id }))
      return;
    }
    if (type === "fav") {
      favCoursesetState(res, onGoingCourse, setOnGoingCourse)
    } else if (type === "like") {
      likeCourseSetState(res, onGoingCourse, setOnGoingCourse)
    }
  }

  const eventLikeFav = (type: string, crrdata: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getUpComingEvent())
      dispatch(getFavEvent())
      return;
    }
    if (type === "fav") {
      EventFavSetSate(crrdata, event, setEvent)
    } else if (type === "like") EventLikeSetState(crrdata, event, setEvent, isUpdate)
    // eventLikeUpdRedux(crrdata, data, dispatch, updateEventFav, isUpdate)

  }

  const pastEventLikeFav = (type: string, crrdata: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getUpComingEvent())
      dispatch(getFavEvent())
      return;
    }
    if (type === "fav") {
      EventFavSetSate(crrdata, pastEvent, setPastEvent)
    } else if (type === "like") EventLikeSetState(crrdata, pastEvent, setPastEvent, isUpdate)
    // eventLikeUpdRedux(crrdata, data, dispatch, updateEventFav, isUpdate)

  }


  return (
    <div className='page-inner-section post-login'>
      <section className="members-banner m-3 position-relative">
        <div className='container-fluid banner mob-banner' style={{ 'backgroundImage': `url(${data?.banner?.image})` }}>
          <div className='row'>
            <div className='col-lg-12 col-md-12'>
              <Container>
                <Row>
                  <div className="banner-content-box py-5 py-md-0 pe-0 pe-md-5 mt-5 w-md-50" >
                    <div><img src={hi_icon} /></div>
                    <h1 className="text-white text-start fs-1">Welcome to <span className='strong d-block'>Nurture by Naps<span className='sup'>™</span></span></h1>
                    <p className="text-white lh-1.5 my-4 ">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                  </div>
                  {/* <div className="col-12 col-md-4 col-lg-4">
                    
                  </div> */}
                </Row>
              </Container>
            </div>
          </div>
        </div>
        {data?.is_membership && <div className='container'>
          <Row className='member-info my-3'>
            <div className='col-lg-12 col-md-12'>
              <div className='position-absolute member-info-container container ps-0'>
                <div className='d-flex align-itmes-start flex-column flex-md-row'>
                  <div className='profile-info d-flex align-items-center position-relative'>
                    <div className='pp d-flex position-relative align-items-center justify-content-center'>
                      <Box sx={{ paddingRight: 2 }} className='d-flex align-items-center justify-content-center'> <CircularProgress variant="determinate" className='profile-progress' value={87} stroke-width={2} />
                        <div className='profile-pic-container'><div className='profile-pic' style={{ 'backgroundImage': `url(${data?.user_profile?.photo ? data?.user_profile?.photo : profile})` }}></div>
                          {/* <img src={data?.user_profile?.photo} /> */}
                        </div>
                      </Box>

                    </div>
                    <div className='pe-md-3 me-md-3 pe-lg-5 me-lg-5'>

                      <h3>Hi {data?.user_profile?.name} !</h3>
                      <p className='mb-1'>Complete your profile and get a free 30 minute consult with one of our nurses.</p>
                      <div className='ms-3 edit-profile'>Edit Profile</div>
                    </div>
                  </div>
                  <div className='random-messages d-flex align-items-center mt-3 mt-md-0'>
                    <div>
                      <h3 className='ps-md-5 ms-md-3 me-md-3 pe-md-3'>{data?.user_profile?.quote}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>}
      </section>

      <div className="non-member-content pale-bg">
        {onGoingCourse.length > 0 && <section className='ongoing-course'>
          <Container>
            <Row>
              <div className="ongoing-course-inner col-lg-12 mt-3 mb-0 py-2 py-md-5">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="section-heading mb-3 pt-2 text-start">Your Ongoing <span className="head-bold">Course</span></h2>
                  </div>
                </div>
                <div className="row">
                  <CourseCard data={onGoingCourse} upDateData={onGoingCourseFavLike} />
                </div>
                {/* <div className="row mt-5">
                  <div className="col-md-12 text-center">
                    <button className="btn w-auto primary-blue-btn px-5">View All</button>
                  </div>
                </div> */}
              </div>
            </Row>
          </Container>
        </section>}

        <div className='container custom-hr'>
          <div className='col-lg-12 col-md-12'>
            <hr className='grey'></hr>
          </div>
        </div>

        {pastEvent.length > 0 && <section className='ongoing-course'>
          <Container>
            <Row>
              <div className="ongoing-course-inner col-lg-12 mt-3 mb-0">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="section-heading mb-3 pt-2 text-start">Your <span className="head-bold">Upcoming Events</span></h2>
                  </div>
                </div>
                <EventCard data={pastEvent} upDateData={pastEventLikeFav} />
                {/* <div className="row mt-5">
                  <div className="col-md-12 text-center">
                    <button className="btn w-auto primary-blue-btn px-5">View All</button>
                  </div>
                </div> */}
              </div>
            </Row>
          </Container>
        </section>}

        <section className='get-ready'>
          <Container>
            <Row>
              <div className="get-ready-inner col-lg-12 mt-3 mb-0 py-5">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="section-heading mb-3 pt-2">Get ready <span className="head-bold">for Baby!</span></h2>
                  </div>
                </div>
                <div className="row">
                  <CourseCard data={course} upDateData={courseLikeFav} />
                </div>
                <div className="row mt-5">
                  <div className="col-md-12 text-center">
                    <button className="btn w-auto primary-blue-btn px-5" onClick={() => navigateTo(COURSE)}>View All</button>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </section>

        <section className='Upcoming-event-container pt-5 pb-3 margineLR-0'>
          <Container>
            <Row>
              <div className='col-lg-12 text-center'><h2 className='section-heading'>Your <span className='head-bold'>Ongoing Events</span></h2></div>
            </Row>
            <EventCard data={event} upDateData={eventLikeFav} />
          </Container>
        </section>

        <section className='recommended-classes'>
          <Container>
            <Row>
              <div className="recommended-classes-inner col-lg-12 mt-3 mb-0 py-5">
                {/* <Container className='paddingLR-00'>
                  
                </Container> */}

                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="section-heading mb-3 pt-2">Recommended <span className="head-bold">Services</span></h2>
                  </div>
                </div>
                <div className="row">
                  <div className='col-lg-4 col-md-6 mb-4'>
                    <Card className='video-container-main'>
                      <div className='video-container-inner'>
                        <Image fluid src={VideoThumbnail} className='image-fluid' />
                      </div>
                      <Card.Body className='position-relative'>
                        <div className='d-flex align-items-center justify-content-between mb-2'>
                          <Card.Title>Pregnancy Stage</Card.Title>
                        </div>
                        <Card.Text>
                          <p>Feel prepared for labor, delivery & recovery. Dive into an array of classes on parenting & newborn care. Lorem Ipsum dolor sit amet. </p>
                        </Card.Text>
                        <div className='instructor-dtls w-100 '>
                          <div className='d-flex align-items-center'>
                            <div className='instructor-profile me-2' style={{ 'backgroundImage': `url(../../../../Assets/img/homepage/instructor-profile.png)` }}>
                            </div>
                            <div className='instructor-name'>
                              <p> Emily Silver</p>
                            </div>
                          </div>
                        </div>
                        <hr className='grey' />
                      </Card.Body>

                      {/* <Card.Body>
                          <div className='progress-bar-container'>
                            <div className='pregress-bar-caption'>You haven't started this course yet</div>
                          </div>
                        </Card.Body> */}
                      <div className="card-body">
                        <div className="d-flex justify-content-between card-footer-con">
                          <div className="">
                            <button className="buy_now btn buy-now">View more</button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className='col-lg-4 col-md-6 mb-4'>
                    <Card className='video-container-main'>
                      <div className='video-container-inner'>
                        <Image fluid src={VideoThumbnail} className='image-fluid' />
                      </div>
                      <Card.Body className='position-relative'>
                        <div className='d-flex align-items-center justify-content-between mb-2'>
                          <Card.Title>Pregnancy Stage</Card.Title>
                        </div>
                        <Card.Text>
                          <p>Feel prepared for labor, delivery & recovery. Dive into an array of classes on parenting & newborn care. Lorem Ipsum dolor sit amet. </p>
                        </Card.Text>
                        <div className='instructor-dtls w-100 '>
                          <div className='d-flex align-items-center'>
                            <div className='instructor-profile me-2' style={{ 'backgroundImage': `url(../../../../Assets/img/homepage/instructor-profile.png)` }}>
                            </div>
                            <div className='instructor-name'>
                              <p> Emily Silver</p>
                            </div>
                          </div>
                        </div>
                        <hr className='grey' />
                      </Card.Body>

                      {/* <Card.Body>
                          <div className='progress-bar-container'>
                            <div className='pregress-bar-caption'>You haven't started this course yet</div>
                          </div>
                        </Card.Body> */}
                      <div className="card-body">
                        <div className="d-flex justify-content-between card-footer-con">
                          <div className="">
                            <button className="buy_now btn buy-now">View more</button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className='col-lg-4 col-md-6 mb-4'>
                    <Card className='video-container-main'>
                      <div className='video-container-inner'>
                        <Image fluid src={VideoThumbnail} className='image-fluid' />
                      </div>
                      <Card.Body className='position-relative'>
                        <div className='d-flex align-items-center justify-content-between mb-2'>
                          <Card.Title>Pregnancy Stage</Card.Title>
                        </div>
                        <Card.Text>
                          <p>Feel prepared for labor, delivery & recovery. Dive into an array of classes on parenting & newborn care. Lorem Ipsum dolor sit amet. </p>
                        </Card.Text>
                        <div className='instructor-dtls w-100 '>
                          <div className='d-flex align-items-center'>
                            <div className='instructor-profile me-2' style={{ 'backgroundImage': `url(../../../../Assets/img/homepage/instructor-profile.png)` }}>
                            </div>
                            <div className='instructor-name'>
                              <p> Emily Silver</p>
                            </div>
                          </div>
                        </div>
                        <hr className='grey' />
                      </Card.Body>

                      {/* <Card.Body>
                          <div className='progress-bar-container'>
                            <div className='pregress-bar-caption'>You haven't started this course yet</div>
                          </div>
                        </Card.Body> */}
                      <div className="card-body">
                        <div className="d-flex justify-content-between card-footer-con">
                          <div className="">
                            <button className="buy_now btn buy-now">View more</button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-12 text-center">
                    <button className="btn w-auto primary-blue-btn px-5">View All</button>
                  </div>
                </div>

              </div>
            </Row>
          </Container>
        </section>



        <section className='free-consult'>
          <Container>
            {
              data?.is_membership ? <Free30Min />
                : <LockScreen />
            }
          </Container>
        </section>

        <section className='latest-news mt-3 pb-5'>
          <Container>
            <Row>
              <div className='col-lg-12 col-md-12'>
                <Row>
                  <div className='col-lg-12 text-left'><h2 className='section-heading'>Latest <span className='head-bold'>News</span></h2></div>
                </Row>

                <Row>
                  <div className='col-lg-6 col-md-6 mb-5 mb-md-0 featured-blog-main'>
                    <div className='featured-blog d-flex flex-column'>
                      <div className='featured-blog-img mb-3'>
                        <img src={blog_featured} className='img-responsive' />
                      </div>
                      <div className='blog-details d-flex flex-column ms-0 ms-md-3'>
                        <div className='blog-date my-2'>
                          <span>2 Days Ago</span>
                        </div>
                        <div className='blog-title'>
                          <h3>We’re happy to announce a new course: </h3>
                        </div>
                        <div className='blog-description'>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-6 blog-list-container'>
                    <div className='d-flex flex-column'>
                      <div className='blog-list'>
                        <div className='d-flex flex-column flex-md-row'>
                          <div className='blog-thumb me-3'>
                            <img src={blog_thumb1} className="img-responsive" />
                          </div>
                          <div className='blog-details d-flex flex-column'>
                            <div className='blog-date my-2'>
                              <span>2 Days Ago</span>
                            </div>
                            <div className='blog-title'>
                              <h3>We’re happy to announce a new course: </h3>
                            </div>
                            <div>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='blog-list'>
                        <div className='d-flex flex-column flex-md-row'>
                          <div className='blog-thumb me-0 me-md-3'>
                            <img src={blog_thumb2} className="img-responsive" />
                          </div>
                          <div className='blog-details d-flex flex-column'>
                            <div className='blog-date my-2'>
                              <span>2 Days Ago</span>
                            </div>
                            <div className='blog-title'>
                              <h3>We’re happy to announce a new course: </h3>
                            </div>
                            <div>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='blog-list'>
                        <div className='d-flex flex-column flex-md-row'>
                          <div className='blog-thumb me-3'>
                            <img src={blog_thumb3} className="img-responsive" />
                          </div>
                          <div className='blog-details d-flex flex-column'>
                            <div className='blog-date my-2'>
                              <span>2 Days Ago</span>
                            </div>
                            <div className='blog-title'>
                              <h3>We’re happy to announce a new course: </h3>
                            </div>
                            <div>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  )
}

export default PostLogin;