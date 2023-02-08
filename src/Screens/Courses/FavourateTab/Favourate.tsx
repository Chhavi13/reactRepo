import React from 'react'
import { Container, Row } from 'react-bootstrap';
import "./Favourate.scss"
import CourseCard from '../../../Common/CourseCard/CourseCard';
import { UpdateFunType } from '../../../Types/Course/updateFunction';
import { getCourse, upDateFavData } from '../../../Redux/Course/CourseReducer';
import { useDispatch } from "react-redux"
import { courseLikeRedux } from '../../../Utils/course/like';
import fav_video_icon from '../../../Assets/img/course/fav-icon-video.svg'
import { ClassNames } from '@emotion/react';

const Favourate = ({ favData }: any) => {
    const dispatch = useDispatch()
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;

    const favLikeFavCourse = (type: string, data: UpdateFunType, isUpdate: UpdateFunType, isSuccess: UpdateFunType) => {
        if (isSuccess) {
            dispatch(getCourse({ user_id: userID }))
            return;
        }
        if (type === "fav") {
            if (isUpdate) {
                let newFavValue = favData.filter((res: any) => res.id !== data.id)
                dispatch(upDateFavData(newFavValue))
            } else {
                dispatch(upDateFavData(favData))
            }
        } else if (type === "like") {
            courseLikeRedux(data, favData, dispatch, upDateFavData, isUpdate)
        }
    }
    return (
        <>
            <Container fluid className='p-0'>
                <Row>
                    <div className="tab_main_courseContent col-lg-12 col-md-12 py-5">
                        <Container className='paddingLR-00'>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 text-left"><h2>Favorites</h2></div>
                            </div>
                            <div className="row">
                                <CourseCard data={favData} upDateData={favLikeFavCourse} />
                            </div>

                            <div className='row justify-content-center'>
                                <div className="col-lg-6 col-md-6 text-center">
                                    <div className='d-flex flex-column justify-content-center'>
                                        <div className='d-flex justify-content-center align-items-center fav-icon-cont mx-auto'>
                                            <img src={fav_video_icon}/>
                                        </div>
                                        <h2 className='text-center my-3 pt-3 pb-0'>Collect your <span className='strong'> Favorite</span></h2>
                                        <p>Your Favorite courses will appear here</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Fav placeholder  */}

                            <div className="row my-5">
                                <div className="col-md-12 text-center">
                                    {/* <button className="btn primary-blue-small-btn">
                                        Show More
                                    </button> */}
                                </div>
                            </div>
                        </Container>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Favourate;