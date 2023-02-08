import React from 'react'
import { Container, Row } from 'react-bootstrap';
import "./AllCourse.scss"
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../../Common/CourseCard/CourseCard';
import { useDispatch } from 'react-redux';
import { UpdateFunType } from '../../../Types/Course/updateFunction';
import { FavCourseRedux } from '../../../Utils/course/fav';
import { getFavCourse, upDateCourseData } from '../../../Redux/Course/CourseReducer';
import { courseLikeRedux } from '../../../Utils/course/like';
import { getUserID } from '../../../Service/getLocalStorage';
import LockScreen from '../../../Common/LockScreen/LockScreen';



const AllCourse = ({ courseData }: any) => {

    const dispatch = useDispatch()

    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;
    function updateData(type: string, data: UpdateFunType, isUpdate: UpdateFunType, isSuccess: UpdateFunType): void {
        if (isSuccess) {
            dispatch(getFavCourse({ user_id: userID }))
            return;
        }
        if (type === "fav") {

            FavCourseRedux(data, courseData, dispatch, upDateCourseData, isUpdate)

        } else if (type === "like") courseLikeRedux(data, courseData, dispatch, upDateCourseData, isUpdate)


    }
    let id = getUserID()
    return (
        <Container fluid className='p-0'>
            <Row>
                <div className="tab_main_courseContent col-lg-12 col-md-12 py-5">
                    <Container className='paddingLR-00'>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 text-left"><h2>All Courses</h2></div>
                        </div>
                        <div className="row">

                            {id ?
                                <CourseCard data={courseData} upDateData={updateData} />
                                : <LockScreen />
                            }
                        </div>
                    </Container>
                </div>
            </Row>
        </Container>
    )
}

export default AllCourse;