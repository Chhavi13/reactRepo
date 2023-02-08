import React from 'react'
import { ProgressBar, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import video_list_thumb from '../../.././Assets/img/profile/video-list-thumb.png'
import { COURSE, COURSEVIEW } from '../../../Routes/RouteConstent'
import { Percentage } from '../.././../Utils/calculation/percantage'
// import fav_video_icon from '../../Assets/img/course/fav-icon-video.svg'
import heart_outline from "../../../Assets/img/course/heart-outline.svg";
import Like from "../../../Assets/img/icons/like.svg";
import Liked from "../../../Assets/img/icons/liked.svg";
import video_thumbnail from "../../../Assets/img/course/Panel.png";

function Step1({ data, subStep }: any) {
  //  debugger
  let user: any = localStorage.getItem("Nurture_user_data");
  user = JSON.parse(user)
  console.log('stepperCourses---->>>>', data)
  console.log(subStep)
  let Navigate = useNavigate()
  const nonMemberViews = (isMember: number, step: number, val: any) => {
    if (isMember == 0) {
      if (step == 4) {
        return ''
      }
      if (step == 3) {
        return ''
      } else {
        return (
          <div className='progress-bar-container w-75'>
            <ProgressBar now={val?.course_video_progress?.progress / val?.course_video_progress?.duration * 100} />
            <div className='pregress-bar-caption'>{Percentage(val?.course_video_progress?.duration, val?.course_video_progress?.progress)}% complete</div>
          </div>
        )
      }
    } else {
      if (val?.course_video_progress?.completed) {
        return (
          <div className='progress-bar-container w-75'>
            {/* <ProgressBar now={val?.course_video_progress?.progress / val?.course_video_progress?.duration * 100} /> */}
            <div className='pregress-bar-caption'>Completed</div>
          </div>
        )
      } else {
        return (
          <div className='progress-bar-container w-75'>
            <ProgressBar now={val?.course_video_progress?.progress / val?.course_video_progress?.duration * 100} />
            <div className='pregress-bar-caption'>{Percentage(val?.course_video_progress?.duration, val?.course_video_progress?.progress)}% complete</div>
          </div>
        )
      }
    }
  }

  const nonMemberBtn = (isMember: number, step: number, val: any) => {
    if (isMember == 0) {
      if (val?.is_course) {
        return (
          <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Play Now</button>
        )
      } else {
        return (
          <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Buy Now</button>
        )
      }
    } else {
      if (val?.course_video_progress?.completed == 0) {
        return (
          <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Continue</button>
        )
      } else {
        return (
          <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>See again</button>
        )
      }
    }

    // if (val?.is_course && val?.course_video_progress?.completed == 0) {
    //   return (
    //     <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Play Now</button>
    //   )
    // } else if(val?.is_course && val?.course_video_progress?.completed == 1) {
    //   return (
    //     <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>See again</button>
    //   )
    // }else{
    //   return(
    //     <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Buy Now</button>          
    //   )
    // }
  }
  return (
    <Row >
      <div className='col-lg-12 col-md-12'>
        {
          data?.map((val: any, i: number) => (
            <div className='profile-container-main p-4 p-md-2 mb-3'>
              <div className='d-flex align-items-md-center align-items-start profile-container-inner flex-column flex-md-row '>
                <div className='profile-section-thumbnail mb-3 mb-md-0'>
                  <img src={val?.image} className='img-responsive' />
                </div>
                <div className='profile-section-detail d-flex align-items-md-center align-items-start mx-0 mx-md-3'>
                  <div className='profile-sec-info'>
                    <h3 className='section-title'>
                      {val?.title}
                    </h3>
                    <p className='sec-description'>
                      {/* Dive into a robust course covering the first signs of labor to the birth of your baby and postpartum recovery. See live demonstrations of breathing, massage and relaxation techniques and an overview of pain medication. */}
                      {val?.summary}
                    </p>

                    {/* {
                    val?.course_video_progress?.completed == 0 &&
                    <div className='progress-bar-container w-75'>
                      <ProgressBar now={val?.course_video_progress?.progress / val?.course_video_progress.duration * 100} />
                      <div className='pregress-bar-caption'>50% complete</div>
                    </div>
                  } */}
                    {/* {
                      user?.is_membership == 0 && subStep == 4 ? "" :
                        <div className='progress-bar-container w-75'>
                          <ProgressBar now={val?.course_video_progress?.progress / val?.course_video_progress?.duration * 100} />
                          <div className='pregress-bar-caption'>{Percentage(val?.course_video_progress?.duration, val?.course_video_progress?.progress)}% complete</div>
                        </div>
                    } */}
                    {nonMemberViews(user?.is_membership, subStep, val)}
                  </div>
                  <div className='btn-conatainer ms-md-auto ms-0 me-md-0 me-auto mt-3 mt-md-2 mt-lg-0 ps-md-0 ps-lg-2 ps-0'>
                    {/* {
                      val?.course_video_progress?.completed == 0 && <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Continue</button>
                    }
                    {
                      val?.course_video_progress?.completed == 1 && <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>See again</button>
                    } */}
                    {/* {
                      (user?.is_membership == 0 && val?.is_course) && <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Play Now</button>
                    }
                    {
                      (user?.is_membership == 0 && !val?.is_course) && <button className='primary-blue-small-btn-40 btn' onClick={() => { Navigate(COURSEVIEW + val?.id) }}>Boy Now</button>
                    } */}
                    {nonMemberBtn(user?.is_membership, subStep, val)}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {
        (!data?.length && subStep == 1) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container startrd-course'>

          </div>
          <h3>Start a <strong>Course</strong></h3>
          <p>You haven’t started any courses yet</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(COURSE)}} >View Courses</button>
        </div>
      }

      {
        (!data?.length && subStep == 2) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container startrd-course'>

          </div>
          <h3>Complete <strong>Courses</strong></h3>
          <p>You haven’t started any courses yet</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(COURSE)}}>View Courses</button>
        </div>
      }

      {
        (!data?.length && subStep == 3) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container favorite'>

          </div>
          <h3>Collect your <strong>Favorite</strong></h3>
          <p>Your favorite courses will appear here</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(COURSE)}} >View Courses</button>
        </div>
      }

      {
        (!data?.length && subStep == 4) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container startrd-course'>

          </div>
          <h3>Porchase <strong>Courses</strong></h3>
          <p>You haven’t purchased any courses yet</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(COURSE)}} >View Courses</button>
        </div>
      }

    </Row>

  )
}

export default Step1