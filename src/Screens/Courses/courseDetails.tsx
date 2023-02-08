import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Button, CardActionArea } from "@mui/material";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import Borderheart from "../../Assets/img/icons/border_heart.png";
import Bgheart from "../../Assets/img/icons/bg_heart.png";
import Donload1 from "../../Assets/img/download.png";
import Backarrow from "../../Assets/img/back.png";
import image2 from "../../Assets/img/course/sleep1.png";
import Stack from '@mui/material/Stack';
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Transcript from "./transcript";
// import YouTube from "react-youtube";
import Vimeo from '@u-wave/react-vimeo';
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FavoriteApi, getCourseDetailApi, LikeApi, videoProgresApi } from "../../Service/Course";
import { getCourse, getFavCourse } from "../../Redux/Course/CourseReducer";
import { useDispatch } from "react-redux";
import { COURSEDETAILS } from "../../Routes/RouteConstent";
import moment from "moment"
import { Percentage } from "../../Utils/calculation/percantage";
import onCourseLike from "../../Utils/course/like";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));


const CourseDetails = () => {
  //state declaration
  const [showComponent, setShowComponent] = useState<Boolean>(false);
  const [moreLess, setMoreLess] = useState<boolean>(false)
  const [details, setDetails] = useState<any>({})
  const [course, setCourse] = useState<any>([])
  //state declaration end

  //variable declaration 
  const playerRef: any = useRef()
  let ytRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const param = useParams()
  const Navigate = useNavigate()

  let userID: any = localStorage.getItem("Nurture_user_data");
  if (userID) userID = JSON.parse(userID).id;

  let dispatch = useDispatch()
  const opts = {
    width: '100%',
    height: '450',
    playerVars: {
      autoplay: 0,
      start: 60 / 60
    },
  }
  // variable declaration end

  const HandleDetails = (data: any) => {
    window?.scrollTo(0, 0)
    Navigate(`${COURSEDETAILS}${data?.id}`, { state: { data } })
  }

  const getDetails = async () => {
    try {
      if (!param?.id || param?.id === null) return
      let data = {
        course_id: Number(param?.id),
        user_id: userID
      }
      let res: any = await getCourseDetailApi(data)
      if (res?.data?.success) {
        setDetails(res?.data)
        setCourse(res?.data?.other_data)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getDetails()
  }, [param?.id])
  const modelHandler = () => {
    setShowComponent(true);
  }

  const pdfHandler = (Doc: any) => {


  }

  // handle on like 
  const onLike = async (resData: any, isLike: boolean, type: string) => {
    try {
      if (type === "main") {
        resData.like = !isLike
        if (isLike) {
          resData.like_count = resData.like_count - 1
        } else {
          resData.like_count = resData.like_count + 1
        }
        setDetails({ ...details, data: resData })

      }
      if (type === "other") {
        // let onUserLike = await onCourseLike("state", resData, course, setCourse)
        return
      }
      let LikeRes: any = await LikeApi({ user_id: userID, course_id: resData.id })
      if (LikeRes.data.success) {
        dispatch(getCourse({ user_id: userID }))
        dispatch(getFavCourse({ user_id: userID }))
      }
      if (!LikeRes.data.success) {
        if (type === "main") {
          resData.like = !isLike
          if (isLike) {
            resData.like_count = resData.like_count + 1
          } else {
            resData.like_count = resData.like_count - 1
          }
          setDetails({ ...details, data: resData })
        }
      }
    } catch (error) {
      if (type === "main") {
        resData.like = !isLike
        if (isLike) {
          resData.like_count = resData.like_count - 1
        } else {
          resData.like_count = resData.like_count + 1
        }
        setDetails({ ...details, data: resData })
      }
    }
  }


  // handle on favroute
  const onFavourite = async (resData: any, fav: boolean, type: String) => {
    try {
      if (type === "main") {
        resData.favourite = !resData.favourite;
        setDetails({ ...details, data: resData })

      }
      if (type === "other") {

        let updateData = details.other_data.map((res: any) => {
          if (res.id === resData.id) {
            res.favourite = !res.favourite
          }
          return res;
        })
        // let oDetail =  {...details,data:details.data};
        setDetails({ ...details, other_data: updateData })
      }



      let FaveRes: any = await FavoriteApi({ user_id: userID, course_id: resData.id })
      
      if (FaveRes?.data?.success) {
        dispatch(getCourse({ user_id: userID }))
        dispatch(getFavCourse({ user_id: userID }))
      }


      // if (FaveRes?.data?.success) {
      //   dispatch(getCourse({ user_id: userID }))
      // }
      if (FaveRes?.data?.success === false) {
        if (type === "other") {

          let updateDataFalse = details.other_data.map((res: any) => {
            if (res.id === resData.id) {
              res.favourite = !resData.favourite
            }
            return res;
          })
          setDetails({ ...details, other_data: updateDataFalse })
        }
        if (type === "main") {
          resData.favourite = !resData.favourite;
          setDetails({ ...details, data: resData })
        }
      }

    } catch (error) {
      if (type === "main") {
        resData.favourite = !resData.favourite;
        setDetails({ ...details, data: resData })
      }
      if (type === "other") {
        let updateDataFalse = details.other_data.map((res: any) => {
          if (res.id === resData.id) {
            res.favourite = !resData.favourite
          }
          return res;
        })
        setDetails({ ...details, other_data: updateDataFalse })
      }

    }
  }

  let getTimeOnPause = async (play: any) => {
    try {
      let getWatchTime = play?.target?.getCurrentTime()
      let getDuration = play?.target?.getDuration()
      let watchTime = convertToTime(getWatchTime)
      let duration = convertToTime(getDuration)
      sendVideoDuration(duration, watchTime)
    } catch (err) {
      console.log(err)
    }

  }
  const sendVideoDuration = async (duration: any, progress: any) => {
    try {
      let videoProgress = await videoProgresApi({ user_id: userID, course_id: details?.data?.id, duration: duration, progress: progress })
      console.log('-osofofofosofos==>', videoProgress)
    } catch (error) {

    }
  }
  let onBackHandle = async (e: any) => {
    e.preventDefault();
    Navigate(-1)
    // let res = await playerRef.current.getInternalPlayer().getPlayerState()
    // if (res == 1) {
    //   let getDuration = await playerRef.current.internalPlayer.getDuration()
    //   let getCrrTime = await playerRef.current.internalPlayer.getCurrentTime()
    //   let watchTime = convertToTime(getCrrTime)
    //   let duration = convertToTime(getDuration)
    //   sendVideoDuration(duration, watchTime)
    // }
  }
  let getTimeOnEndState = async (time: any) => {
    try {
      let getWatchTime = time?.target?.getCurrentTime()
      let getDuration = time?.target?.getDuration()
      let watchTime = convertToTime(getWatchTime)
      let duration = convertToTime(getDuration)
      sendVideoDuration(duration, watchTime)
    } catch (err) {
      console.log(err)
    }
  }
  let convertToTime = (time: any) => {
    if (!time) {
      return 0
    }
    let timeValue = moment().startOf('day').add(time, 'seconds').format('m.ss')
    return timeValue;
  }

  return (
    <div>
      <Transcript open={showComponent} setOpen={setShowComponent} data={details?.data?.transcript} />
      <div className="container-fluid login-page course_detail course_content_page mt-5 mb-4">
        <div className="course_page">
          <div className="row">
            <div className="col-lg-7 col-md-12">
              <div className="video_sec">
                <a onClick={onBackHandle}> <img src={Backarrow} className="" alt="image" />   Back </a>
                {/* <YouTube
                  videoId={details?.data?.video?.includes("youtube") && details?.data?.video?.match(ytRegex)[1]}
                  opts={opts}
                  ref={playerRef}
                  onPause={getTimeOnPause}
                  onReady={(event: any) => event.target.pauseVideo()}
                  onEnd={getTimeOnEndState}
                /> */}
                <Vimeo
                  video="https://vimeo.com/644908467"
                />
                <div className="row px-3 parents_div">
                  <div className="col-lg-6 col-md-6 col-6 pt-4">
                    <p className="like" onClick={() => onLike(details?.data, details?.data.like, "main")}>
                      <img
                        src={details?.data?.like ? Liked : Like}
                        className="mr-2"
                        alt="image"
                      />{" "}
                      {details?.data?.like_count} parents like this
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-6 pt-4 text-right">
                    <img src={Donload1} className="" alt="image" />
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-5 col-md-12">
              <div className="card_video">
                <div className="d-flex justify-content-between routines">
                  <h2>
                    {details?.data?.title}
                  </h2>
                  <span className="like_course" onClick={() => onFavourite(details?.data, !details?.data?.favourite, "main")}>
                    <img src={details?.data?.favourite ? Bgheart : Borderheart} alt="Image" />
                  </span>
                </div>
                <p>
                  {moreLess ? details?.data?.description : details?.data?.description.substring(0, 100) + "..."}
                </p>
                <p className="read_more_text mt-2 mb-2" onClick={() => setMoreLess(!moreLess)}>{moreLess ? "Less" : "More"}</p>
                <h5>Instructors</h5>

                <div className="row   user_name">
                  {Array.isArray(details?.data?.instructor) && details?.data?.instructor?.map((res: any) => (<div className="col-lg-6 col-md-6 col-6">
                    <div className="d-flex align-items-center">
                      <img src={res?.profile} alt="" />
                      <div className="name">
                        {res?.name}
                      </div>
                    </div>
                  </div>))}
                </div>

                <Stack spacing={2} direction="row" className="tipsButton">
                  <Button variant="contained" onClick={() => pdfHandler(`${details?.data?.doc}`)} className="tips tips_bg">Download Quick Tips</Button>
                  <Button variant="contained" onClick={modelHandler} className="tips"> Transcript</Button>
                </Stack>

                <div className="row px-3 parents_div_show">
                  <div className="col-lg-6 col-md-6 col-8 ">
                    <p className="like">
                      <img
                        src={Like}
                        className="mr-2"
                        alt="image"
                      />{" "}
                      {details?.data?.like_count} parents like this
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-6 col-4  text-right">
                    <img src={Donload1} className="" alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="what_next login-page">
            <h2 className="mt-5">What’s Next?</h2>
            <p className="sleep_para mb-4">Book A Sleep Consultation</p>

            <div className="row">
              <div className="col-md-4 col-sm-6 col-12 card_space">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image2}
                      alt="image"
                    />
                    <p className="course_category">Live</p>
                    <span className="like_course">
                      <img src={Borderheart} alt="Image" />
                    </span>
                    <CardContent>
                      <div className="row">
                        <div className="col-md-12 col-12">
                          <Typography gutterBottom variant="h5" component="div">
                            Live with Pediatric Dietitian, Ashley
                          </Typography>

                          <p className="next_para">
                            A registered dietician nutritionist and mom to 3
                            children, as well as the founder of
                            @veggiesandvirtue
                          </p>

                          <div className="time_date">
                            <p className="mb-4">
                              Thursday, September 30, 2021 <br /> 7:30 PM 8:30
                              PM
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-6">
                          <button className="btn startnow-btn">Join</button>
                        </div>

                        <div className="col-md-6 col-6 text-right">
                          <p className="like">
                            <img
                              src={Like}
                              className="mr-2 pt-2"
                              alt="image"
                            />{" "}
                            40
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>

          <div className="other_course">
            <h2 className="mt-3 mb-5">Others Courses You Might Like</h2>
            <div className="row">
              {course?.map((res: any, index: any) => (<div className="col-md-4 col-sm-6 col-12 card_space">
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={res?.image}
                      alt="image"
                    />

                    <p className="course_category" style={{ background: res?.progress?.color }}>{res?.progress?.name}</p>

                    <span className="like_course" onClick={() => onFavourite(res, !res.favourite, "other")}>
                      <img src={res?.favourite ? Bgheart : Borderheart} alt="Image" />
                    </span>
                    <CardContent>
                      <div className="row">
                        <div className="col-lg-9 col-md-8 col-sm-8 col-9">
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {res?.title}
                          </Typography>
                        </div>
                        <div className="col-lg-3 col-md-4  col-sm-4 col-3 text-right">
                          <p className="like" onClick={() => onLike(res, res.like, "other")}>
                            <img
                              src={res?.like ? Liked : Like}
                              className="mr-2"
                              alt="image"
                            />{" "}
                            {res?.like_count}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 mb-3">
                        <Box sx={{ flexGrow: 1 }}>
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                          />
                          <p className="text_progress">
                            {Percentage(res?.video_progress?.duration, res?.video_progress?.progress)}%
                          </p>
                        </Box>
                        {(res?.is_membership || res?.is_course) ?
                          <p className="read_more_text mt-3 mb-3" onClick={() => HandleDetails(res)}>
                            Read More
                          </p>
                          :
                          <div className="view_detail">
                            <div className="row">
                              <div className="col-lg-6">
                                <button className="view"
                                //  onClick={() => { detailModelOpen(res) }}
                                >
                                  View Detail
                                </button>
                              </div>
                              <div className="col-lg-6">
                                <button className="buy_now"
                                // onClick={() => paymentDetail(res)}
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CourseDetails;
