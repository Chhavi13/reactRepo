import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Logo from "../../Assets/img/login/signup.svg"
// import CardComp from './CardComp';
// import user_profile from "../../user-profile.png";
// import CardMedia from '@mui/material/CardMedia';
// import CardActions from '@mui/material/CardActions';
// import video_list_thumb from '../../Assets/img/profile/video-list-thumb.png'
// import { ClassNames } from '@emotion/react';
import "./ProfileUser.scss";
import { Container, Row, Col, Card, Button, Image, ListGroup, ProgressBar } from 'react-bootstrap';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import profile_thumb from '../../Assets/img/unsplash_rDEOVtE7vOs.png'
import master_card_img from '../../Assets/img/master-card.png';
import visa_card_img from '../../Assets/img/visa-card.png';
import gift_icon from '../../Assets/img/profile/gift-icon.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import gift_Sicon from '../../Assets/img/service/gift-icon.svg';
import lavender_gift_icon from '../../Assets/img/service/lavender-gift-icon.svg';
import add_more_icon from '../../Assets/img/service/add-con.svg';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import Step4 from './step/step4';
// import Step5 from './step/step4';
import StepperMenu from './step/step';
import { AskNurseProfileAPI, CourseCompletedAPI, CourseFavouriteAPI, CoursePurchased, CourseStartedApi, FavouriteEventAPI, GiftCardRecieveAPI, GiftCardSendAPI, PastEventAPI, PastServiceAPI, UpcomingEventAPI, UpcomingServiceAPI } from '../../Service/edit_profile';

import heart_outline from "../../Assets/img/course/heart-outline.svg";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import video_thumbnail from "../../Assets/img/course/Panel.png";
import StepBottom from './step/stepBottom';
import { EDITPROFILE } from '../../Routes/RouteConstent';
import Step5 from './step/step5';
import { getUserProfileEdit } from '../../Service/update_profile';
import { Avatar, Stack } from '@mui/material';
import EditProfileToolTip from '../../Common/EditProfileToolTip/toolTip';
import { useDispatch } from 'react-redux';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { favCoursesetState } from '../../Utils/course/fav';
import { likeCourseSetState } from '../../Utils/course/like';
import { getFavEvent, getUpComingEvent } from '../../Redux/Events/EventsReducer';
import { EventFavSetSate } from '../../Utils/Events/Fav';
import { EventLikeSetState } from '../../Utils/Events/Like';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ProfileUser = (props: any) => {
    const [expanded, setExpanded] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState('MyCourses');
    const [profileData, setProfileData] = useState<any>({})
    const [earnCon, SetEarnCon] = useState<any>([])

    const [subStep, setSubStep] = useState<number>()
    const [subStep1, setSubStep1] = useState<number>(1)
    const [subStep2, setSubStep2] = useState<number>(1)
    const [subStep3, setSubStep3] = useState<number>(1)

    const [allCourse, setAllCourse] = useState<any>([])
    const [startCourses, setStartCourses] = useState<any>([])
    const [completeCourses, setCompletedCourses] = useState<any>([])
    const [favCourses, setFavCourses] = useState<any>([])
    const [recStart, setRecStart] = useState<any>([])
    const [recComplete, setRecComplete] = useState<any>([])
    const [recFav, setRecFav] = useState<any>([])
    const [purchased, setPurchased] = useState<any>([])

    const [upComeEvt, setUpComeEvt] = useState<any>([])
    const [pastEvt, setPastEvt] = useState<any>([])
    const [favEvt, setFavEvt] = useState<any>([])
    const [recUpcomeEvt, setRecUpcomeEvt] = useState<any>([])
    const [recPastEvt, setRecPastEvt] = useState<any>([])
    const [recFavEvt, setRecFavEvt] = useState<any>([])

    const [upComeService, setUpComeService] = useState<any>([])
    const [pastService, setPastService] = useState<any>([])
    const [recUpService, setRecUpService] = useState<any>([])
    const [recPastService, setRecPastService] = useState<any>([])


    const [giftRecieve, setGiftRecieve] = useState<any>([])
    const [giftSent, setGiftSent] = useState<any>([])
    const [recGiftCard, setRecGiftCard] = useState<any>([])

    const [askNurse, setAskNurse] = useState<any>([])
    const [mobileOpen, setMobileOpen] = useState(false)
    const [notify, setNotify] = useState<any>([])

    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID);

    // userID = JSON.parse(userID)?.id;
    const Navigator = useNavigate()
    const dispatch = useDispatch();


    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const courseLikeFav = (type: any, data: any, isUpdate: boolean, isSuccess: boolean) => {
        if (isSuccess) {
            dispatch(getCourse({ user_id: userID?.id }))
            dispatch(getFavCourse({ user_id: userID?.id }))
            return;
        }
        if (type === "fav") {
            if (subStep == 1) {
                favCoursesetState(data, recStart, setRecStart)
            } else if (subStep == 2) {
                favCoursesetState(data, recComplete, setRecComplete)
            } else {
                favCoursesetState(data, recFav, setRecFav)
            }
        } else if (type === "like") {
            if (subStep == 1) {
                likeCourseSetState(data, recStart, setRecStart)
            } else if (subStep == 2) {
                likeCourseSetState(data, recComplete, setRecComplete)
            } else {
                likeCourseSetState(data, recFav, setRecFav)
            }
            //   likeCourseSetState(data, recFav, setRecFav)
        }
    }

    const eventLikeFav = (type: string, data: any, isUpdate: boolean, isSuccess: boolean) => {
        if (isSuccess) {
            dispatch(getUpComingEvent())
            dispatch(getFavEvent())
            return;
        }
        if (type === "fav") {
            if (subStep1 == 1) {
                EventFavSetSate(data, recUpcomeEvt, setRecUpcomeEvt)
            } else if (subStep1 == 2) {
                EventFavSetSate(data, recPastEvt, setRecPastEvt)
            } else {
                EventFavSetSate(data, recFavEvt, setRecFavEvt)
            }
            //   EventFavSetSate(crrdata, eventData, setEventData)
        } else if (type === "like") {
            if (subStep1 == 1) {
                EventLikeSetState(data, recUpcomeEvt, setRecUpcomeEvt, isUpdate)
            } else if (subStep1 == 2) {
                EventLikeSetState(data, recPastEvt, setRecPastEvt, isUpdate)
            } else {
                EventLikeSetState(data, recFavEvt, setRecFavEvt, isUpdate)
            }
            // EventLikeSetState(crrdata, eventData, setEventData, isUpdate)
        }
        // eventLikeUpdRedux(crrdata, data, dispatch, updateEventFav, isUpdate)

    }

    function getStepContent(stepIndex: any) {
        switch (stepIndex) {
            // case 'Activity':
            //     return (<Step1 />);
            case 'MyCourses':
                return (<Step1 data={subStep == 1 ? startCourses : subStep == 2 ? completeCourses : subStep == 3 ? favCourses : subStep == 4 ? purchased : allCourse} subStep={subStep} />);
            case 'MyEvents':
                return (<Step2 data={subStep1 == 1 ? upComeEvt : subStep1 == 2 ? pastEvt : subStep1 == 3 ? favEvt : allCourse} getUpcomingEventAPI={getUpcomingEventAPI} subStep1={subStep1} />);
            case 'MyServices':
                return (<Step3 data={subStep2 == 1 ? upComeService : subStep2 == 2 ? pastService : subStep2 == 3 ? giftRecieve : upComeService} subStep2={subStep2} getUpcomingServiceAPI={getUpcomingServiceAPI} />);
            case 'Ask_a_Nurse':
                return (<Step4 data={askNurse} setNotify={setNotify} notify={notify} />);
            case 'gift':
                return (<Step5 data={subStep3 == 1 ? giftRecieve : subStep3 == 2 ? giftSent : giftRecieve} subStep3={subStep3} />);
            default:
                return "";
        }
    }

    function getStepBottom(stepIndex: any) {
        switch (stepIndex) {
            case 'MyCourses':
                return (<StepBottom title='Courses you might be interested in' data={subStep == 1 ? recStart : subStep == 2 ? recComplete : subStep == 3 ? recFav : recStart} upDateData={courseLikeFav} />);
            case 'MyEvents':
                return (<StepBottom title='Events you might be interested in' data={subStep1 == 1 ? recUpcomeEvt : subStep1 == 2 ? recPastEvt : subStep1 == 3 ? recFavEvt : recUpcomeEvt} upDateData={eventLikeFav} />);
            case 'MyServices':
                return (<StepBottom title='Consults you might be interested in' data={subStep2 == 1 ? recUpService : subStep2 == 2 ? recPastService : subStep2 == 3 ? recGiftCard : recUpService} upDateData={courseLikeFav} />);
            case 'Ask_a_Nurse':
                return (<StepBottom title='' datas={askNurse} />);
            case 'gift':
                return (<StepBottom title='Consults you might be interested in' data={recGiftCard} />)
            default:
                return "";
        }
    }

    const getProfileUser = async () => {
        try {
            let id: any = { user_id: userID?.id }
            let res: any = await getUserProfileEdit(id)

            setProfileData(res?.data)
            SetEarnCon(res?.data?.earn_consult)
        } catch (err) {
            console.log(err)
        }
    }

    const getCoursesStartedApi = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await CourseStartedApi(id)
            setStartCourses(res?.data?.data)
            setRecStart(res?.data?.recommended_course_data)
        } catch (err) {
            console.log(err)
        }
    }

    const getCourseCompletedAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await CourseCompletedAPI(id)
            setCompletedCourses(res?.data?.data)
            setRecComplete(res?.data?.recommended_course_data)
        } catch (err) {
            console.log(err)
        }
    }

    const getCourseFavouriteAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await CourseFavouriteAPI(id)
            setFavCourses(res?.data?.data)
            setRecFav(res?.data?.recommended_course_data)
        } catch (err) {
            console.log(err)
        }
    }

    const getUpcomingEventAPI = async () => {
        try {
            let data: any = {
                user_id: userID?.id,
                type: "live"
            }
            let res: any = await UpcomingEventAPI(data)

            setUpComeEvt(res?.data?.data)
            setRecUpcomeEvt(res?.data?.upcoming_event)
        } catch (err) {
            console.log(err)
        }
    }

    const getPastEventAPI = async () => {
        try {
            let data: any = {
                user_id: userID?.id,
                type: "past"
            }
            let res: any = await PastEventAPI(data)

            setPastEvt(res?.data?.data)
            setRecPastEvt(res?.data?.upcoming_event)
        } catch (err) {
            console.log(err)
        }
    }

    const getFavouriteEventAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await FavouriteEventAPI(id)
            setFavEvt(res?.data?.data)
            setRecFavEvt(res?.data?.upcoming_event)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const getUpcomingServiceAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await UpcomingServiceAPI(id)
            setUpComeService(res?.data?.data)
            setRecUpService(res?.data?.recommended_course_data)
        } catch (err) {
            console.log(err)
        }
    }
    const getPastServiceAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await PastServiceAPI(id);
            setPastService(res?.data?.data)
            setRecPastService(res?.data?.recommended_course_data)
        } catch (err) {
            console.log(err)
        }
    }
    const getGiftCardRecieveAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await GiftCardRecieveAPI(id)
            setGiftRecieve(res?.data?.data)
            setRecGiftCard(res?.data?.recommended_course_data)
        } catch (err) {
            console.log(err)
        }
    }
    const sendGiftCardAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await GiftCardSendAPI(id)

            setGiftSent(res?.data?.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getAskNurseProfileAPI = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }

            let res: any = await AskNurseProfileAPI(id)
         
            setAskNurse(res?.data?.data)
            if (userID.is_membership === 1) {
                let unseenMsg: any = localStorage.getItem("NapsUnseenMsg")
                if (!unseenMsg) { unseenMsg = [] }
                else unseenMsg = JSON.parse(unseenMsg)
                const isAlreadyUnseen = unseenMsg.find((item: any) => {
                    return item === res?.data?.data[0]?.id
                })

                if (!isAlreadyUnseen) unseenMsg.push(res?.data?.data[0]?.id)
                if (unseenMsg) localStorage.setItem("NapsUnseenMsg", JSON.stringify(unseenMsg))


            }
            console.log(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    const getCoursePurchased = async () => {
        try {
            let id: any = {
                user_id: userID?.id
            }
            let res: any = await CoursePurchased(id)

            setPurchased(res?.data?.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCoursesStartedApi()
        getCourseCompletedAPI()
        getCourseFavouriteAPI()
        getUpcomingEventAPI()
        getPastEventAPI()
        getFavouriteEventAPI()
        getUpcomingServiceAPI()
        getPastServiceAPI()
        getGiftCardRecieveAPI()
        getAskNurseProfileAPI()
        sendGiftCardAPI()
        getCoursePurchased()
        getProfileUser()
    }, [])

    useEffect(() => {
        if (userID?.is_membership == 0) {
            setSubStep(4)
            setActiveStep('MyCourses')
        } else {
            setSubStep(1)
            setActiveStep('MyCourses')
        }
    }, [])
    useEffect(() => {
        return () => {
            let stableState: any = { state: 'MyCourses' }
            localStorage.setItem('stabeleComponent', JSON.stringify(stableState))
            let id: any = { step: 1 }
            localStorage.setItem('stabeleStep', JSON.stringify(id))
        }
    }, [])
    console.log(profileData)
    let location = useLocation()

    // localStorage.setItem("user_profile_location",JSON.stringify(location))
    console.log(location)
    return (
        <div className="profileContainer pale-bg">
            <Container fluid>
                <div className='profile-header-container mb-4'>
                    <Container fluid >
                        <Row className='profile-header px-md-5 px-0 py-md-5 py-4'>
                            <div className='col-lg-12 col-md-12'>
                                <Container className='paddingLR-0'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className='d-flex profile-header-inner justify-container-center align-items-center'>
                                                <div className='d-flex align-items-center profile-info-section'>
                                                    <div className='user-profie-img px-0 px-md-4'>
                                                        <Stack direction="row" spacing={2}>
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src={profileData?.about_you?.photo}
                                                                sx={{ width: 106, height: 106 }}
                                                            />
                                                        </Stack>
                                                        {/* <img src={profile_thumb} className="img-responsive" /> */}
                                                    </div>
                                                    <div className='user-info px-2 px-sm-2 px-md-4'>
                                                        <h3 className='user-name'>{profileData?.about_you?.name}</h3>
                                                        <button className='secondary-teal-btn px-3' onClick={() => { Navigator(EDITPROFILE) }} ><EditOutlinedIcon /> Edit Profile</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6 mt-3 mt-md-0'>
                                            {
                                                userID?.is_membership == 0 &&
                                                <div className='profile-becomemember-info w-md-75 w-100 me-0 ms-auto'>
                                                    <div className='d-flex w-100 justify-content-between align-items-center'>
                                                        <div className='member-title'><h4 className='p-0 m-0'>Become a member </h4></div>
                                                        <div className='member-price d-flex align-items-center'>from <span className='value ms-1'> ${profileData?.become_a_member}</span></div>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                userID?.is_membership == 1 &&
                                                <div className='profile-progress-info w-md-75 w-100 me-0 ms-auto'>
                                                    {/* <div className='profile-progress me-3'>
                                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                        <CircularProgress variant="determinate" {...props} />
                                                        <Box
                                                            sx={{
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            right: 0,
                                                            position: 'absolute',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Typography
                                                            variant="caption"
                                                            component="div"
                                                            color="text.secondary"
                                                            >{`${Math.round(props.value)}%`}</Typography>
                                                        </Box>
                                                    </Box>
                                                </div> */}
                                                    <div className='progress-msg position-absolute'>
                                                        {/* Complete your profile and get a <a href='#'>free 30 minute consult </a> with one of our nurses. */}
                                                        {/* <Card>
                                                        <CardHeader
                                                            avatar={
                                                                <div className='profile-progress me-3'>
                                                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                                        <CircularProgress variant="determinate" {...props} />
                                                                        <Box
                                                                            sx={{
                                                                                top: 0,
                                                                                left: 0,
                                                                                bottom: 0,
                                                                                right: 0,
                                                                                position: 'absolute',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant="caption"
                                                                                component="div"
                                                                                color="text.secondary"
                                                                            >{`${Math.round(props.value)}%`}</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </div>
                                                            }
                                                            action={
                                                                <ExpandMore
                                                                    expand={expanded}
                                                                    onClick={handleExpandClick}
                                                                    aria-expanded={expanded}
                                                                    aria-label="show more"
                                                                >
                                                                    <ExpandMoreIcon />
                                                                </ExpandMore>
                                                            }
                                                            title="Complete your profile and get a free 30 minute consult with one of our nurses."

                                                        />

                                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                            <CardContent className='pt-0'>
                                                                <List
                                                                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                                    aria-label="contacts"
                                                                    className='profile-steps'
                                                                >
                                                                    <ListItem disablePadding>
                                                                        <ListItemButton>
                                                                            <ListItemIcon>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary="Upload a profile photo" className='text-start' />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                                    <ListItem disablePadding className='completed'>
                                                                        <ListItemButton>
                                                                            <ListItemIcon>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText inset primary="Invite a friend" className='text-start' />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                                    <ListItem disablePadding className='completed'>
                                                                        <ListItemButton>
                                                                            <ListItemIcon>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText inset primary="Book a Service" className='text-start' />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                                    <ListItem disablePadding>
                                                                        <ListItemButton>
                                                                            <ListItemIcon>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText inset primary="Post on the Message Board" />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                                    <ListItem disablePadding>
                                                                        <ListItemButton>
                                                                            <ListItemIcon>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText inset primary="Complete a course" />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                                    <ListItem disablePadding>
                                                                        <ListItemButton>
                                                                            <ListItemIcon>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText inset primary="Ask a Nurse" />
                                                                        </ListItemButton>
                                                                    </ListItem>
                                                                </List>
                                                            </CardContent>
                                                        </Collapse>
                                                    </Card> */}
                                                        <EditProfileToolTip value={profileData?.earn_consult_progress} data={earnCon} />
                                                    </div>
                                                </div>
                                            }


                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </Row>
                    </Container>
                </div>
                {/* end of profile */}
                <Row>
                    <div className='col-lg-12 col-md-12'>
                        <Container className='paddingLR-0'>
                            <Row>
                                <StepperMenu activeStep={activeStep} setActiveStep={setActiveStep}
                                    subStep={subStep} setSubStep={setSubStep} subStep1={subStep1}
                                    setSubStep1={setSubStep1} subStep2={subStep2} setSubStep2={setSubStep2}
                                    subStep3={subStep3} setSubStep3={setSubStep3} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setNotify={setNotify} notify={notify} />
                                <div className='col-lg-9 col-md-9'>
                                    {getStepContent(activeStep)}
                                </div>
                            </Row>
                        </Container>
                        <div className={`${activeStep === "MyEvents" && "event-container pt-1"} container-fluid profile-section-bottom`}>
                            <div className='Row mt-5'>
                                <div className={`${activeStep === "MyCourses" && 'seperator'} container paddingLR-0`}>
                                    {getStepBottom(activeStep)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>

            </Container>

        </div>
    )
    // return <CircularProgressWithLabel value={20} />;
}



export default ProfileUser
