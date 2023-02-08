import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import "./detailPopup.scss";
import Instructors2 from "../../Assets/img/Instructors2.png";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Nabs from "../../Assets/img/naps.png";
import Bgheart from "../../Assets/img/icons/bg_heart.png";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import { CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import Borderheart from "../../Assets/img/icons/border_heart.png";
import produce from 'immer';
import { FavoriteApi, LikeApi } from '../../Service/Course';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { useDispatch } from 'react-redux';
import Congratulation from './congratulationPopup';
// import FavouriteHandler from '../../Utils/course/fav';
import { useNavigate } from "react-router-dom";
import { BUYCOURSEDETAIL, COURSEDETAILS } from "../../Routes/RouteConstent";
const DetailPopup = (props: any) => {

  const [modalShow, setModalShow] = React.useState(false);
  let { data, setData } = props;
  let userID: any = localStorage.getItem("Nurture_user_data");
  if (userID) userID = JSON.parse(userID).id;
  let dispatch = useDispatch()
  const Navigate = useNavigate()

  let FavouriteHandler = async () => {
    try {
      let newData = produce(data, (res: any) => {
        res.favourite = !res.favourite
      })
      setData(newData)
      let FaveRes: any = await FavoriteApi({ user_id: userID, course_id: data.id })
      if (!FaveRes?.data?.success) {
        let newData = produce(data, (res: any) => {
          res.favourite = res.favourite
        })
        setData(newData)
      }
      if (FaveRes?.data?.success) {
        dispatch(getCourse({ user_id: userID }))
        dispatch(getFavCourse({ user_id: userID }))
      }
    } catch (error) {
      let newData = produce(data, (res: any) => {
        res.favourite = res.favourite
      })
      setData(newData)
    }
  }

  let LikeHandler = async () => {
    try {

      let newData = produce(data, (res: any) => {
        // res.like = !res.like,
        res.like = !res.like
        if (res.like) {
          res.like_count = res.like_count + 1
        } else {
          res.like_count = res.like_count - 1
        }
      })
      setData(newData)
      let LikeRes: any = await LikeApi({ user_id: userID, course_id: data.id })
      if (LikeRes.data.success) {
        dispatch(getCourse({ user_id: userID }))
      } else {

        let newData = produce(data, (res: any) => {
          // res.like = !res.like,
          res.like = res.like
          res.like_count = res.like_count

        })
        setData(newData)
      }
    } catch (error) {

      let newData = produce(data, (res: any) => {
        // res.like = !res.like,
        res.like = res.like
        res.like_count = res.like_count

      })
      setData(newData)
    }

  }

  const congratulationModelOpen = (data:any) =>{
    //setModalShow(true);
      Navigate(BUYCOURSEDETAIL, { state: { data } })
  }
  return (
    <div>
      <Congratulation
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
      >
        
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <h4 className="mob_none">{data?.title} </h4>
          <div className="row justify-content-md-center">
            <div className="col-lg-8">
            <p className="mob_none">
            {data?.description}
          </p>
            </div>
          </div>
          {Array.isArray(data?.instructor) && data?.instructor?.map((res:any) => (<div className="person mob_none ">
            <img src={res?.profile} alt="" className="rounded-circle" />  <span>{res?.name}</span>
          </div>))}
          <div className="row pop_up">
            <div className="col-lg-6">
              <div className="image_box">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={data?.image}
                      alt="image"
                      className='card_img'
                    />



                    <span className="like_course" onClick={() => FavouriteHandler()}>
                      <img src={data?.favourite ? Bgheart : Borderheart} alt="heart" />
                    </span>

                  </CardActionArea>
                </Card>
                <p className="course_category" style={{ background: data?.progress?.color }}>{data?.progress?.name}</p>
              </div>
              <div className='row'>
                <div className="col-lg-4 col-md-4 col-4">
                  <div className="mony">
                    &#36; {data?.amount}
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-8">
                  <div className="mony_like" onClick={LikeHandler}>
                    <img
                      src={data?.like ? Liked : Like}
                      className="mr-2"
                      alt="like"
                    />{" "}
                    <span>  {data?.like_count} parents like this</span>

                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-6">
              <h4 className="desk_none">How to Manage Short  Daytime Naps </h4>
              <p className="desk_none">
                Feel prepared for labor, delivery & recovery. Dive into an array of classes on parenting & newborn care.
              </p>
              <div className="person desk_none">
                <img src={Instructors2} alt="" />  <span>Jamie O’Day</span>
              </div>
              <div className="course_view">
                <h3>Course Overview</h3>
                <p>Taught by a Registered Nurse and Certified Lactation Consultant.</p>
                <h5>Topics Include:</h5>
                <ul>
                  <li> Normal newborn behaviors </li>
                  <li> What to expect right after delivery </li>
                  <li> Newborn poops and pees </li>
                  <li> Newborn sleep cycles </li>
                  <li> Newborn feeding patterns and ways to feed (breastfeeding vs. bottle feeding) </li>
                  <li>Feeding your baby, diapering your baby and bathing your baby  </li>
                  <li> Soothing your baby </li>
                  <li> Newborn safety, screening and vaccinations </li>
                  <li> Car seat safety </li>
                  <li>Review our complete curriculum listed below for a full list of topics.  </li>
                </ul>
                <button onClick={() => { congratulationModelOpen(data) }}>  Buy Now </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DetailPopup