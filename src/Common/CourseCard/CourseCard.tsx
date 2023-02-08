import React from 'react';
import { Card, Image, ProgressBar } from 'react-bootstrap';
import "./CourseCard.scss";
import heart_outline from "../../Assets/img/course/heart-outline.svg";
import heart_fill from "../../Assets/img/course/heart-fill.svg";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
// import { PaymentDetail } from '../../Screens';
import { COURSEVIEW } from '../../Routes/RouteConstent';
import { useNavigate } from 'react-router-dom';
import { upDateCourseData } from '../../Redux/Course/CourseReducer';
import FavouriteHandler from '../../Utils/course/fav';
import courseLikeHandler from '../../Utils/course/like';

interface Props {
    data: any,
    upDateData?: any
}
const CourseCard = (props: Props) => {
    let { data, upDateData } = props;
    let Navigate = useNavigate()

    const onFavourite = async (crrData: any, b: any, c: any, d: any) => {
        upDateData("fav", crrData, true, false)
        let isFav = await FavouriteHandler(crrData)
        upDateData("fav", crrData, isFav, isFav)

    }

    const onLike = async (res: any, b: any) => {
        upDateData("like", res, true, false)
        let isLike: any = await courseLikeHandler(res)
        upDateData("like", res, isLike, isLike)
    }
    const button_name = (res: any) => {
        // debugger
        function secondFunc() {
            if (res?.is_membership || res?.is_course) {
                return "Get started";
            } else {
             return "Buy Now"
            }
        }
        if (res?.course_video_progress) {
            if (res?.course_video_progress?.progress / res?.course_video_progress.duration * 100 > 99) {
                return "Restart"
            } 
            else {
                return "Continue"
            }
        } else {
            return secondFunc()
        }

    }

    return (
        <>
            {data?.map((res: any, index: number) => (
                <div key={index} className='col-lg-4 col-md-6 mb-4'>
                    <Card className='video-container-main'>
                        <div className='video-container-inner'>
                            <Image fluid src={res?.image} className='image-fluid' />
                            <div className='tags-likes d-flex justify-content-between'>
                                <div className='tags-row'>
                                    {Array.isArray(res?.tag) && res?.tag?.map((res: any) => (<span className='tag1 tags' style={{ backgroundColor: res?.color_code }}>{res?.name}</span>))}
                                </div>
                                <div className='fav-container' onClick={() => onFavourite(res, !res.favourite, "all", index)}>
                                    <img src={res?.favourite ? heart_fill : heart_outline} alt="heart" className='img-responsive' />
                                </div>
                            </div>
                        </div>
                        <Card.Body className='position-relative'>
                            <div className='d-flex align-items-start justify-content-between mb-2'>
                                <Card.Title>{res?.title}</Card.Title>
                                <div className='like' onClick={() => onLike(res, "all")}>
                                    {/* <p className="like" onClick={() => onLike(res, "all")}> */}
                                    <img
                                        src={res?.like ? Liked : Like}
                                        className="mr-2"
                                        alt="like"
                                    />{" "}
                                    {res?.like_count}
                                    {/* </p> */}
                                </div>
                            </div>
                            <Card.Text>
                                {res?.summary}
                            </Card.Text>
                            <div className='d-block view-details'><a onClick={() => { Navigate(COURSEVIEW + res?.id) }}>View Details</a ></div>
                            {(res?.is_membership || res?.is_course) &&
                                <div className='progress-bar-container'>
                                    {res?.course_video_progress ? <ProgressBar now={res?.course_video_progress.progress / res?.course_video_progress.duration * 100} /> :
                                        <div className='pregress-bar-caption'>You haven't started this course yet</div>}
                                </div>
                            }
                        </Card.Body>
                        <Card.Body>
                            <div className='d-flex justify-content-between card-footer-con'>
                                {(!res?.is_course && !res?.is_membership) && <div className='course-price'> ${res?.amount}</div>}
                                <div className=''>
                                    <button className="buy_now btn buy-now" onClick={() => Navigate(COURSEVIEW + res?.id)} >
                                        {
                                            // res?.course_video_progress?.progress / res?.course_video_progress.duration * 100 > 99 ? "Compleate" : (res?.is_membership || res?.is_course) ? "continue" : "Buy Now"
                                            button_name(res)
                                        }
                                    </button>
                                </div>
                            </div>
                            {/* <button className="btn video-getstarted">Get Started</button> */}
                        </Card.Body>
                    </Card>
                </div>

            ))}
        </>
    )
}

export default CourseCard