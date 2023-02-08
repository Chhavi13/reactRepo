import Icon from '@mui/material/Icon';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image, ListGroup, Card, ListGroupItem, ProgressBar } from 'react-bootstrap';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import "./FaqList.scss";
import RegisterNurseTag from "../../Assets/img/asknurse/RegisteredNurseTag.svg";
import Header from './Header';
import TabsButton from './Tabs';
import MarkFav from "../../Assets/img/icons/heart-outline.svg";
import LikeSec from "../../Assets/img/icons/liked.svg";
import VideoThumbnail from "../../Assets/img/asknurse/Panel.jpg";
import { getChatDetailApi, questionLikeApi, tagFilterCourse } from '../../Service/ask_a_nurse';
import { useParams } from 'react-router-dom';
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import onCourseLike, { likeCourseSetState } from '../../Utils/course/like';
import FavouriteHandler, { favCoursesetState } from '../../Utils/course/fav';
import heart_outline from "../../Assets/img/course/heart-outline.svg";
import heart_fill from "../../Assets/img/course/heart-fill.svg";
import CourseCard from '../../Common/CourseCard/CourseCard';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { useDispatch } from 'react-redux';
import Popup_Ask_A_Nurse from './Popup_Ask_A_Nurse';

function FaqList({socket}:any) {
  const param = useParams()
  const dispatch = useDispatch()
  const [data, setData] = useState<any>({})
  const [course, setCourse] = useState<any>([])
  const [popupOpen, setPopupOpen] = useState<any>(false)
  const [filterData,setFilterData] = useState<any>([])

  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)?.id;
  const getFaqData = async () => {
    try {
      let res: any = await getChatDetailApi({
        ask_nurse_question_id: param?.id,
        user_id: userID
      });

      if (res?.data?.success) {
        setData(res?.data)
        setCourse(res?.data?.course_rows)

      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFaqData()
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }, [])

  // on course like
  const CourseLike = async (res: any) => {
    // await onCourseLike("state", res, course, setCourse)
  }
  const likeQuestion = async () => {
    try {
      data.question.like_count = !data?.question?.like ? data.question.like_count + 1 : data.question.like_count - 1;
      data.question.like = !data?.question?.like;
      setData({ ...data })

      let newData = {
        user_id: userID,
        ask_nurse_question_id: data?.question?.id
      }
      let res: any = await questionLikeApi(newData)
      if (!res.data.success) {
        data.question.like_count = !data?.question?.like ? data.question.like_count + 1 : data.question.like_count - 1;
        data.question.like = !data?.question?.like;
        setData({ ...data })
      }

    } catch (error) {
      data.question.like_count = !data?.question?.like ? data.question.like_count + 1 : data.question.like_count - 1;
      data.question.like = !data?.question?.like;
      setData({ ...data })
      console.log(error)
    }
  }
  const courseFavHandle = async (res: any) => {
    // await FavouriteHandler("state", res, course, "fav", setCourse,)
  }
  const courseLikeFav = (type: any, data: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getCourse({ user_id: userID }))
      dispatch(getFavCourse({ user_id: userID }))
      return;
    }
    if (type === "fav") {
      favCoursesetState(data, course, setCourse)
    } else if (type === "like") {
      likeCourseSetState(data, course, setCourse)
    }
  }
  const handleClickOpen = () => {
    setPopupOpen(true)
  }

  let getApiForTag = async () => {
    try {
      let res: any = await tagFilterCourse()
      setFilterData(res?.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getApiForTag()
  }, [])
  return (
    <div>
      <Header handleClickOpen={handleClickOpen} />
      <Popup_Ask_A_Nurse
        open={popupOpen}
        setOpen={setPopupOpen}
        list={filterData}
        socket={socket}
      />
      {/* <TabsButton
       
      /> */}
      <Container className='Faq-details'>
        <Row>
          <div className='col-lg-12 faq-details' >
            <Row className='justify-content-start'>
              <div className='col-lg-10 faq-question-selected'>
                {/* Quisque pulvinar, felis ac lacinia pulvinar, orci tellus eleifend neque, eget consectetur risus sapien non mauris. Integer laoreet a ante id aliquam.? */}
                {data?.question?.question}<br></br>
                {data?.question?.image && data?.question?.image !== "undefined" && <img src={data?.question?.image}
                  style={{ height: 100, width: 200 }}
                />}
                <div className='like-count-container mt-3' onClick={() => likeQuestion()}> <ThumbUpAltOutlinedIcon /> <span className='like-count'>{data?.question?.like_count}</span></div>
              </div>
            </Row>
            {data?.question?.instructor && <Row className='justify-content-end '>
              <div className='col-lg-10 selected-faq-answer position-relative'>
                <div className='d-flex flex-column '>
                  <div className='nurse-info d-flex align-items-center mb-3'>
                    <div className='nurse-profile' style={{ 'backgroundImage': `url(${data?.question?.instructor?.photo})` }}>
                      {/* <img src={data?.question?.instructor?.photo} /> */}
                    </div>
                    <div className='nurse-personalinfo ms-3'>
                      <div className='nurse-name'>{data?.question?.instructor?.name} </div>
                      <div className='register-tag'>Registered Nurse</div>
                    </div>
                  </div>
                  <div>
                    <p className='answer-name'>
                      {/* Quisque pulvinar, felis ac lacinia pulvinar, orci tellus eleifend neque, eget consectetur risus sapien non mauris. Integer laoreet a ante id aliquam.?... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
                      {data?.question?.answer}
                    </p>
                  </div>
                </div>
                <div className='register-tag-icon'>
                  <img src={RegisterNurseTag} />
                </div>
              </div>
            </Row>}
          </div>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <div className='col-lg-12'>
            <div className='other-services-main'>
              <div className='d-flex'>
                <div className='service-option'><h3>Helpful <span className="strong"> Resources</span></h3></div>
                <div className='service-option'><h5>Book A Sleep Consultation</h5></div>
                <div className='service-option'><h5>Courses for your stage</h5></div>
                <div className='service-option'><h5>Live Event</h5></div>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div className='col-lg-12 col-md-12'>
            <div className='related-course-main my-3 py-5'>
              <Container>
                <Row>
                  <div className='col-lg-12 col-md-12 text-center'><h2 className='section-heading'>Related <span className='head-bold'>Courses</span></h2></div>
                </Row>
                <Row>
                  <CourseCard data={course} upDateData={courseLikeFav} />

                </Row>
              </Container>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default FaqList