import React from 'react'
import heart_outline from "../../../Assets/img/course/heart-outline.svg";
import heart_fill from "../../../Assets/img/course/heart-fill.svg";
import Like from "../../../Assets/img/icons/like.svg";
import Liked from "../../../Assets/img/icons/liked.svg";
import video_thumbnail from "../../../Assets/img/course/Panel.png";
import video_list_thumb from '../../.././Assets/img/profile/video-list-thumb.png'
import { useNavigate } from 'react-router-dom';
import { type } from 'os';
import { COURSEVIEW, EVENTSDETAIL } from '../../../Routes/RouteConstent';
import { Percentage } from '../.././../Utils/calculation/percantage'
import { ProgressBar } from 'react-bootstrap';
import FavouriteHandler from '../../../Utils/course/fav';
import courseLikeHandler from '../../../Utils/course/like';
import { FavEventHandle } from '../../../Utils/Events/Fav';
import { EventLikeHandler } from '../../../Utils/Events/Like';

const StepBottom = ({ title, data, datas, upDateData }: any) => {
  console.log('stepper_bottom', data)
  console.log('bottom', title)
  let Navigate = useNavigate()

  const onFavourite = async (crrData: any, b: any, c: any, d: any, title: string) => {
    if (title === 'Courses you might be interested in') {
      upDateData("fav", crrData, true, false)
      let isFav = await FavouriteHandler(crrData)
      upDateData("fav", crrData, isFav, isFav)
    }
    if (title === 'Events you might be interested in') {
      upDateData("fav", crrData, true, false)
      let isFav = await FavEventHandle(crrData)
      upDateData("fav", crrData, isFav, isFav)
    }
    // upDateData("fav", crrData, true, false)
    // let isFav = await FavouriteHandler(crrData)
    // upDateData("fav", crrData, isFav, isFav)

  }

  const onLike = async (res: any, b: any, title: string) => {
    if (title === 'Courses you might be interested in') {
      upDateData("like", res, true, false)
      let isLike: any = await courseLikeHandler(res)
      upDateData("like", res, isLike, isLike)
    }
    if (title === 'Events you might be interested in') {
      upDateData("like", res, true, false)
      let isLike = await EventLikeHandler(res)
      upDateData("like", res, isLike, isLike)
    }
    // upDateData("like", res, true, false)
    // let isLike: any = await courseLikeHandler(res)
    // upDateData("like", res, isLike, isLike)
  }

  const handleGetStarted = (id: number) => {
    if (title === 'Courses you might be interested in') {
      Navigate(COURSEVIEW + id)
    }
    if (title === 'Events you might be interested in') {
      Navigate(EVENTSDETAIL + id)
    }
    if (title === 'Consults you might be interested in') {
      Navigate(COURSEVIEW + id)
    }
  }
  return (
    <>
      <div className='row'>
        <div className='col-lg-12 col-md-12'>
          <h2>{title}</h2>
        </div>

        <div className='col-lg-12 col-md-12'>
          <div className='row'>
            {
              data?.map((res: any, index: any) => (
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="video-container-main card">
                    <div className="video-container-inner">
                      <img src={res?.image} />
                      <div className="tags-likes d-flex justify-content-between">
                        <div className="tags-row">
                          {Array.isArray(res?.tag) && res?.tag?.map((res: any) => (<span className='tag1 tags' style={{ backgroundColor: res?.color_code }}>{res?.name}</span>))}
                          {/* <span className="tag3 tags">virtual class</span> */}
                        </div>
                        <div className="fav-container" onClick={() => onFavourite(res, !res.favourite, "all", index, title)}>
                          <img src={res?.favourite ? heart_fill : heart_outline} alt="heart" className="img-responsive" />
                        </div>
                      </div>
                    </div>
                    <div className="position-relative card-body">
                      <div className="d-flex align-items-start justify-content-between mb-2">
                        <div className="card-title h5">{res?.title}</div>
                        <div className="like" onClick={() => onLike(res, "all", title)}>
                          <img src={res?.like ? Liked : Like} className="mr-2" alt="like" /> {res?.like_count}</div>
                      </div>
                      <p className="card-text">Learn what to look for in and ways to foster your 3-6 months old's development</p>

                      <div className="progress-bar-container">
                        {(res?.is_membership || res?.is_course) &&
                          <div className="progress">
                            <div role="progressbar" className="progress-bar">
                              <ProgressBar now={res?.course_video_progress?.progress / res?.course_video_progress?.duration * 100} />
                              <div className='pregress-bar-caption'>{Percentage(res?.course_video_progress?.duration, res?.course_video_progress?.progress)}% complete</div>
                            </div>
                          </div>
                        }

                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between card-footer-con">
                        <div className="">
                          <button className="buy_now btn buy-now" onClick={() => handleGetStarted(res?.id)}>Get Started</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }


            {/* <div className="col-lg-4 col-md-6 mb-4">
            <div className="video-container-main card">
              <div className="video-container-inner">
                <img src={video_thumbnail} />
                  <div className="tags-likes d-flex justify-content-between">
                    <div className="tags-row"><span className="tag3 tags">virtual class</span></div>
                      <div className="fav-container">
                        <img src={heart_outline} alt="heart" className="img-responsive" />
                      </div>
                    </div>
                  </div>
                  <div className="position-relative card-body">
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <div className="card-title h5">Developmental Milestones for 9 months</div>
                    <div className="like">
                      <img src={Like} className="mr-2" alt="like" /> 12</div>
                    </div>
                    <p className="card-text">Learn what to look for in and ways to foster your 3-6 months old's development</p>
                   
                    <div className="progress-bar-container">
                      <div className="progress">
                        <div role="progressbar" className="progress-bar"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between card-footer-con">
                      <div className=""><button className="buy_now btn buy-now">Get Started</button></div>
                    </div>
                  </div>
              </div>
          </div> */}

            {/* <div className="col-lg-4 col-md-6 mb-4">
            <div className="video-container-main card">
              <div className="video-container-inner">
                <img src={video_thumbnail} />
                  <div className="tags-likes d-flex justify-content-between">
                    <div className="tags-row"><span className="tag3 tags">virtual class</span></div>
                      <div className="fav-container">
                        <img src={heart_outline} alt="heart" className="img-responsive" />
                      </div>
                    </div>
                  </div>
                  <div className="position-relative card-body">
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <div className="card-title h5">Developmental Milestones for 9 months</div>
                    <div className="like">
                      <img src={Like} className="mr-2" alt="like" /> 12</div>
                    </div>
                    <p className="card-text">Learn what to look for in and ways to foster your 3-6 months old's development</p>
                   
                    <div className="progress-bar-container">
                      <div className="progress">
                        <div role="progressbar" className="progress-bar"></div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between card-footer-con">
                      <div className=""><button className="buy_now btn buy-now">Get Started</button></div>
                    </div>
                  </div>
              </div>
          </div> */}


          </div>
        </div>
        {
          datas?.length > 5 ? '' :
            <div className='col-lg-12 col-md-12 text-center'>
              <button className="btn primary-blue-small-btn-40 my-5 mx-auto">View All</button>
            </div>
        }

      </div>
    </>
  )
}

export default StepBottom
