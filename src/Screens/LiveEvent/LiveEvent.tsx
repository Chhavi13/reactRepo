import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../Assets/img/login/signup.svg"
import "./LiveEvent.scss";
import "./empty-states.scss";
import "./edit-profile.scss";
import { Container, Row, Col, Card, Button, Image, ListGroup, ProgressBar } from 'react-bootstrap';
import CardComp from './CardComp';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import user_profile from "../../user-profile.png";
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import video_list_thumb from '../../Assets/img/profile/video-list-thumb.png'
import profile_thumb from '../../Assets/img/unsplash_rDEOVtE7vOs.png'
import { ClassNames } from '@emotion/react';
import master_card_img from '../../Assets/img/master-card.png';
import visa_card_img from '../../Assets/img/visa-card.png';
import default_consult_img from '../../Assets/img/profile/Psychic-default.png';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import Camera from "../../Assets/img/icons/camera.svg";
import Eye from "../../Assets/img/eye.svg"

import gift_icon from '../../Assets/img/profile/gift-icon.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import gift_Sicon from '../../Assets/img/service/gift-icon.svg';
import lavender_gift_icon from '../../Assets/img/service/lavender-gift-icon.svg';
import add_more_icon from '../../Assets/img/service/add-con.svg';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import Step4 from './step/step4';
import Step5 from './step/step5';
import StepperMenu from './step/step';
import { CourseStartedApi } from '../../Service/edit_profile';
// import Step6 from './step/step6';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const LiveEvent = (props: any) => {


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

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;

    const [activeStep, setActiveStep] = React.useState('Activity');
    const [value, setValue] = React.useState<Date | null>(new Date());

    function getStepContent(stepIndex: any) {
        switch (stepIndex) {
            case 'Activity':
                return (<Step1 />);
            case 'MyCourses':
                return (<Step2 />);
            case 'MyEvents':
                return (<Step3 />);
            case 'MyServices':
                return (<Step4 />);
            case 'Ask_a_Nurse':
                return (<Step5 />);
            default:
                return "No Content";
        }
    }
    // function CircularProgressWithLabel(
    //     props: CircularProgressProps & { value: 20 },
    // )
    // 
    const getCoursesStartedApi = async () => {
        try {
            let id:any ={
                user_id:userID
            }
            let res = await CourseStartedApi(id)
            // debugger
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCoursesStartedApi()
    }, [])

    const baby_gender = [
        { label: 'Type 1', value: 1 },
        { label: 'Type 2', value: 2 },
        ]

    function handleDateChange(){}

    return (
        <div className="profileContainer pale-bg">
            <Container fluid >
                <div className='profile-header-container mb-4'>
                    <Container fluid>
                        <Row className='profile-header px-md-5 px-0 py-md-5 py-4'>
                            <div className='col-lg-12 col-md-12'>
                                <Container className='paddingLR-0'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className='d-flex profile-header-inner justify-container-center align-items-center'>
                                                <div className='d-flex align-items-center profile-info-section'>
                                                    <div className='user-profie-img px-0 px-md-4'>
                                                        <img src={profile_thumb} className="img-responsive" />
                                                    </div>
                                                    <div className='user-info px-1 px-sm-2 px-md-4'>
                                                        <h3 className='user-name'>Sophia  Gonzales</h3>
                                                        <button className='secondary-teal-btn' ><EditOutlinedIcon /> Edit Profile</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6 mt-3 mt-md-0'>
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
                                                    <Card>
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
                                                    </Card>
                                                </div>
                                            </div>
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
                            <ul className="list-unstyled ps-0 sidebar-nav">
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    My Course
                                    </button>
                                    <div className="collapse show collapsible-nav" id="home-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="active">All</a></li>
                                        <li><a href="#" className="">Started</a></li>
                                        <li><a href="#" className="link-dark rounded">Completed</a></li>
                                        <li><a href="#" className="link-dark rounded">Favorites</a></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                    My Events
                                    </button>
                                    <div className="collapse" id="dashboard-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-dark rounded">All</a></li>
                                        <li><a href="#" className="link-dark rounded">Upcoming</a></li>
                                        <li><a href="#" className="link-dark rounded">Past</a></li>
                                        <li><a href="#" className="link-dark rounded">Favorites</a></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                    My Services
                                    </button>
                                </li>
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                    Ask a Nurse <span className='notification'>1</span>
                                    </button>
                                </li>
                                
                             </ul>
                                {/* <div className='col-lg-2 col-md-2'>
                                    <ul className='list-unstyled d-flex flex-column text-decoration-none parent-ul'>
                                        <li><a href='#'>Activity</a></li>
                                        <li><a href='#'>My Courses</a>
                                            <ul className='list-unstyled d-flex flex-column text-decoration-none child'>
                                                <li><a href='#' className='active'>All</a></li>
                                                <li><a href='#'>Started</a></li>
                                                <li><a href='#'>Completed</a></li>
                                                <li><a href='#'>Favorites</a></li>
                                            </ul>
                                        </li>
                                        <li><a href='#'>My Events</a></li>
                                        <li><a href='#'>My Services</a></li>
                                        <li><a href='#'>Ask a Nurse <span className='notification'> 1 </span></a></li>
                                    </ul>
                                </div> */}
                                <StepperMenu setActiveStep={setActiveStep} />
                                <div className='col-lg-10 col-md-10'>
                                    {getStepContent(activeStep)}
                                </div>
                            </Row>

                            <Row>
                                <div className="col-lg-4 col-md-6 mb-4 profile-consult-card">
                                    <div className="consult-container-main card">
                                        <div className="consult-container-inner">
                                            <img src={default_consult_img} />
                                        </div>
                                        <div className='card-body'>
                                            <div className='card-title'>
                                                Breastfeeding Basics Classes
                                            </div>
                                            <p className='card-text'>
                                            These classes are tailored to expectant women who want to prepare for feeding their baby after birth. 
                                            </p>
                                        </div>
                                        <div className='position-absolute profile-consult-footer'>
                                            <div className='d-flex justify-content-between'>
                                                <button className="btn primary-blue-small-btn-40">Book Now</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4 profile-consult-card">
                                    <div className="consult-container-main card">
                                        <div className="consult-container-inner">
                                            <img src={default_consult_img} />
                                        </div>
                                        <div className='card-body'>
                                            <div className='card-title'>
                                                Breastfeeding Basics Classes
                                            </div>
                                            <p className='card-text'>
                                            These classes are tailored to expectant women who want to prepare for feeding their baby after birth. 
                                            </p>
                                        </div>
                                        <div className='position-absolute profile-consult-footer'>
                                            <div className='d-flex justify-content-between'>
                                                <button className="btn primary-blue-small-btn-40">Book Now</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4 profile-consult-card">
                                    <div className="consult-container-main card">
                                        <div className="consult-container-inner">
                                            <img src={default_consult_img} />
                                        </div>
                                        <div className='card-body'>
                                            <div className='card-title'>
                                                Breastfeeding Basics Classes
                                            </div>
                                            <p className='card-text'>
                                                These classes are tailored to expectant women who want to prepare for feeding their baby after birth. 
                                            </p>
                                        </div>
                                        <div className='position-absolute profile-consult-footer'>
                                            <div className='d-flex justify-content-between'>
                                                <button className="btn primary-blue-small-btn-40">Book Now</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Row>


                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Your Membership
                                </div>
                                <div className='col-lg-10 col-md-10 your-membership-main'>
                                    <div className='your-membership'>
                                        <h5 className='section-title'>Your Membership</h5>
                                        <div className='my-3 d-flex w-100 ur-membership-container py-3 justify-content-center'>
                                            <p className='m-0 d-flex align-items-center'>You have a Monthly Membership<span className='plan-price ms-1'> $97 </span>/mo Every month</p>
                                        </div>
                                    </div>

                                    <div className='upgrade-membership'>
                                        <h3 className='upgrade-msg mt-4 py-2'>Upgrade your membership <span className='strong'>and save up to 45%</span></h3>
                                        <div className='d-flex w-100 flex-column flex-md-row'>
                                            <div className='plan-option1 member_plan monthy-plan w-50 me-md-2 me-0 mb-3 mb-md-0'>
                                                <div className="plan_head px-4 py-4">
                                                    <h3><span className="plan-nm">3-Month </span> Membership</h3>
                                                </div>
                                                <div className="plan_content px-4 py-4">
                                                    <div className="Plan-price-main d-flex flex-column">
                                                        <div className="plan-saving" >Save 25%</div>
                                                        <div className="d-flex Plan-price">
                                                            <span className="pCost-old"> $1000</span>
                                                            <span className="pCost" >$97 </span>
                                                            <span className="membership-cycle" >/mo</span>
                                                        </div>
                                                        <div className="plan-price-Total">
                                                            <span className="strong">$97</span> Every Monthly membership
                                                        </div>
                                                    </div>
                                                    <div className="plan-details-list">
                                                        <p className="strong">
                                                            Unlock full access to the Nurture by NAPS program.
                                                        </p>
                                                        <div className="plan-details-list">
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn_trial">
                                                        Upgrade your membership
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='plan-option2 member_plan monthy-plan w-50 ms-md-2 ms-0'>
                                                <div className="plan_head px-4 py-4">
                                                    <h3><span className="plan-nm">3-Month </span> Membership</h3>
                                                </div>
                                                <div className="plan_content px-4 py-4">
                                                    <div className="Plan-price-main d-flex flex-column">
                                                        <div className="plan-saving" >Save 25%</div>
                                                        <div className="d-flex Plan-price">
                                                            <span className="pCost-old"> $1000</span>
                                                            <span className="pCost" >$97 </span>
                                                            <span className="membership-cycle" >/mo</span>
                                                        </div>
                                                        <div className="plan-price-Total">
                                                            <span className="strong">$97</span> Every Monthly membership
                                                        </div>
                                                    </div>
                                                    <div className="plan-details-list">
                                                        <p className="strong">
                                                            Unlock full access to the Nurture by NAPS program.
                                                        </p>
                                                        <div className="plan-details-list">
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn_trial">
                                                        Upgrade your membership
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Payment
                                </div>
                                <div className='col-lg-10 col-md-10 payment-main'>
                                    <div className='user-payment-details'>
                                        <h5>Payment Detail</h5>
                                        <div className='my-3 d-flex w-100 payment-details-container py-3 px-4 flex-column'>
                                            <div className='payment-method w-100 d-flex justify-content-between align-items-center my-2'>
                                                <div className='payment-method-logo'>
                                                    <img src={master_card_img}></img>
                                                </div>
                                                <div className=''>
                                                    <p className='card-number m-0'>X X X X X X X X X X X X X - 1 2 3 4</p>
                                                </div>
                                                <div>
                                                    <p className='card-holder-name m-0'>Cameron Williamson</p>
                                                </div>
                                                <div>
                                                    <p className='exp-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='cvv-num m-0'>cvv</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>Edit</a></p>
                                                </div>
                                            </div>
                                            <div className='payment-method w-100 d-flex justify-content-between align-items-center my-2'>
                                                <div className='payment-method-logo'>
                                                    <img src={visa_card_img}></img>
                                                </div>
                                                <div className=''>
                                                    <p className='card-number m-0'>X X X X X X - 1 2 3 4</p>
                                                </div>
                                                <div>
                                                    <p className='card-holder-name m-0'>Cameron Williamson</p>
                                                </div>
                                                <div>
                                                    <p className='exp-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='cvv-num m-0'>cvv</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>Edit</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Payment History
                                </div>
                                <div className='col-lg-10 col-md-10 payment-history-main'>
                                    <div className='payment-history-details'>
                                        <h5>Payment History</h5>
                                        <div className='my-3 d-flex w-100 payment-history-container py-3 px-4 flex-column'>
                                            <div className='payment-history-list w-100 d-flex justify-content-between align-items-center my-2'>

                                                <div className=''>
                                                    <p className='payment-name m-0'>Veterans Moms’ Survival Group</p>
                                                </div>

                                                <div>
                                                    <p className='payment-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='paid-amount m-0'>October 14, 2021</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>View details</a></p>
                                                </div>
                                            </div>
                                            <div className='payment-history-list w-100 d-flex justify-content-between align-items-center my-2'>

                                                <div className=''>
                                                    <p className='payment-name m-0'>Veterans Moms’ Survival Group</p>
                                                </div>

                                                <div>
                                                    <p className='payment-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='paid-amount m-0'>October 14, 2021</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>View details</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Earn Consult
                                </div>
                                <div className='col-lg-10 col-md-10 payment-main'>
                                    <h5 className='section-title'> Earn Consult</h5>
                                    <div className='earn-consult-container py-3 px-4 d-flex flex-column'>
                                        <div className='progress-bar-container pb-4 d-flex align-items-center'>
                                            <div className='progress-bar'>
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
                                                {/* <CircularProgressWithLabel value={progress} /> */}
                                            </div>
                                            <div className='profile-competion-msg'>
                                                <p>Complete your profile and get a <span>free 30 minute consult </span> with one of our nurses.</p>
                                            </div>
                                        </div>
                                        <div className='profile-completion-container'>
                                            <List
                                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                                                aria-label="contacts"
                                                className='profile-steps'
                                            >
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <CheckIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Upload a profile photo" className='text-start' />
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
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
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <CheckIcon />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Complete a course" />
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <CheckIcon />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Ask a Nurse" />
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Invite Friend
                                </div>
                                <div className='col-lg-10 col-md-10 invite-friend-main'>
                                    <h5 className='section-title'> Invite Friend </h5>
                                    <div className='invite-friend-container profile-container py-5 py-md-5 px-4 d-flex flex-column justify-content-center'>
                                        <div className='invite-friend-inner'>
                                            <form>
                                                <div className="form-group mb-3">
                                                    <label>Name</label>
                                                    <input type="text" name="friend-name" className=" form-control" id="" placeholder="Ruhama" /><p className="error">Please enter name</p>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Email</label>
                                                    <input type="email" name="email" className=" form-control" id="" placeholder="Type something" value="dmpampi17@gmail.comm" /><p className="error">Please enter email</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <button type="button" className="primary-blue-small-btn btn w-50 me-2">Send</button>
                                                    <button type="button" className="primary-outline-btn h50 btn w-50 ms-2">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    My offer
                                </div>
                                <div className='col-lg-10 col-md-10 payment-main'>
                                    <h5 className='section-title'> My offer </h5>
                                    <div className='offer-container-main d-flex flex-wrap'>
                                        <div className='offer-container w-50 pe-0 pe-md-3 mb-4'>
                                            <div className='offer1 container-inner'>
                                                <div className=''>
                                                    <div className=''><img src={gift_icon} /></div>
                                                    <div className='discounted-offer'>
                                                        <div className='discounted-offer-inner'>
                                                            <span className='value'>20% off </span>Any consult
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='offer-info my-3'>
                                                    <h3 className='offer-title'>Premium Offering: </h3>
                                                    <p>Just  copy code to get 20% off any consult when you schedule your appointment</p>
                                                </div>
                                                <div className='coupon-container d-flex justify-content-between align-items-center'>
                                                    <div className='coupon-value'>NAPS2020</div>
                                                    <div><a href='#'>Copy</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='offer-container w-50 ps-0 ps-md-3 mb-4'>
                                            <div className='offer2 container-inner'>
                                                <div className=''>
                                                    <div className=''><img src={gift_icon} /></div>
                                                    <div className='discounted-offer'>
                                                        <div className='discounted-offer-inner'>
                                                            <span className='value'>20% off </span>Any consult
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='offer-info my-3'>
                                                    <h3 className='offer-title'>Premium Offering: </h3>
                                                    <p>Just  copy code to get 20% off any consult when you schedule your appointment</p>
                                                </div>
                                                <div className='coupon-container d-flex justify-content-between align-items-center'>
                                                    <div className='coupon-value'>NAPS2020</div>
                                                    <div><a href='#'>Copy</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='offer-container w-50 pe-0 pe-md-3 mb-4'>
                                            <div className='offer3 container-inner'>
                                                <div className=''>
                                                    <div className=''><img src={gift_icon} /></div>
                                                    <div className='discounted-offer'>
                                                        <div className='discounted-offer-inner'>
                                                            <span className='value'>20% off </span>Any consult
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='offer-info my-3'>
                                                    <h3 className='offer-title'>Premium Offering: </h3>
                                                    <p>Just  copy code to get 20% off any consult when you schedule your appointment</p>
                                                </div>
                                                <div className='coupon-container d-flex justify-content-between align-items-center'>
                                                    <div className='coupon-value'>NAPS2020</div>
                                                    <div><a href='#'>Copy</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </div>
                </Row>
            </Container>

            <Container fluid >
                <div className='profile-header-container mb-4'>
                    <Container fluid>
                        <Row className='profile-header px-md-5 px-0 py-md-5 py-4'>
                            <div className='col-lg-12 col-md-12'>
                                <Container className='paddingLR-0'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-6'>
                                            <div className='d-flex profile-header-inner justify-container-center align-items-center'>
                                                <div className='d-flex align-items-center profile-info-section'>
                                                    <div className='user-profie-img px-0 px-md-4'>
                                                        <img src={profile_thumb} className="img-responsive" />
                                                    </div>
                                                    <div className='user-info px-1 px-sm-2 px-md-4'>
                                                        <h3 className='user-name'>Sophia  Gonzales</h3>
                                                        <button className='secondary-teal-btn px-3' ><EditOutlinedIcon /> Edit Profile</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6 mt-3 mt-md-0'>
                                            <div className='profile-becomemember-info w-md-75 w-100 me-0 ms-auto'>
                                                <div className='d-flex w-100 justify-content-between align-items-center'>
                                                    <div className='member-title'><h4 className='p-0 m-0'>Become a member </h4></div>
                                                    <div className='member-price d-flex align-items-center'>from <span className='value ms-1'> $76.50</span></div>
                                                </div>
                                            </div>
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
                                <div className='col-lg-2 col-md-3'>
                                    <ul className="list-unstyled ps-0 sidebar-nav edit-profile">
                                        <li className="mb-1">
                                            <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#edit-profile" aria-expanded="true">
                                            Edit Profile
                                            </button>
                                            <div className="collapse show collapsible-nav" id="edit-profile">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li><a href="#" className="active">About you</a></li>
                                                <li><a href="#" className="">About your Baby</a></li>
                                                <li><a href="#" className="link-dark rounded">About your Partner</a></li>
                                                <li><a href="#" className="link-dark rounded">Account Settings</a></li>
                                            </ul>
                                            </div>
                                        </li>
                                        <li className="mb-1">
                                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#billing-nav" aria-expanded="false">
                                            Billing
                                            </button>
                                            <div className="collapse collapsible-nav" id="billing-nav">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li><a href="#" className="link-dark rounded">Your Membership</a></li>
                                                <li><a href="#" className="link-dark rounded">Payment</a></li>
                                            </ul>
                                            </div>
                                        </li>
                                        <li className="mb-1">
                                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#promotion-nav" aria-expanded="false">
                                            Promotional
                                            </button>
                                            <div className="collapse collapsible-nav" id="promotion-nav">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li><a href="#" className="link-dark rounded">Earn Consult</a></li>
                                                <li><a href="#" className="link-dark rounded">Invite Friend</a></li>
                                                <li><a href="#" className="link-dark rounded">My offer</a></li>
                                            </ul>
                                            </div>
                                        </li>
                                        
                                        
                                    </ul>
                                </div>
                                    
                                
                                <div className='col-lg-10 col-md-9'>
                                    <h3>Tell us about your self</h3>
                                    <div className='edit-profile-container py-5'>
                                        <div className="step-innercontent step2">
                                            <div className="yourself-main">
                                                
                                                <div className="profile-updaterdiv text-center">
                                                    <div className=" mt-5 mb-3">
                                                        <img className="img-upload"  alt="" />
                                                        <img src={Camera} className="img-upload-icon" alt="" />
                                                    </div>
                                                    <input type="file" accept="image/png, image/gif, image/jpeg" name="photo" className="d-none" />
                                                    <h4 className="error-msgtext text-center"></h4>
                                                </div>

                                        <form className="step-form row">
                                            <div className="form-group-m col-lg-12 mb-3">
                                                <div className="row">
                                                    <div className={`form-group birthday-box col-lg-6 col-md-6`}>
                                                        <label>What’s your birthdate?</label>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <Stack spacing={3}>
                                                                <MobileDatePicker
                                                                    value={""}
                                                                    toolbarTitle="Choose date"
                                                                    disableFuture
                                                                    onChange={handleDateChange}
                                                                    renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                                                />
                                                            </Stack>
                                                        </LocalizationProvider>
                                                        <h4 className="error-msgtext"> error msg </h4>
                                                    </div>

                                                    <div className="form-group col-lg-6 col-md-6">
                                                        <label>What’s your zip code?</label>
                                                        <input type="number"
                                                            
                                                            name='zip_code'
                                                            className='form-control'
                                                            // value={value?.zip_code}
                                                            id=""
                                                        />
                                                        <h4 className="error-msgtext">erroe msg</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group-m col-lg-12 col-md-12 mb-3">
                                                <div className="row">
                                                    <div className="form-group col-lg-12 col-md-12 gender-box ">
                                                        <label>What are your preferred pronouns?</label>
                                                        <Autocomplete
                                                        disablePortal
                                                        id="Gender"
                                                        // value={" "}
                                                        options={ baby_gender }

                                                        renderInput={(params) => <TextField {...params} name="gender" />}
                                                        />
                                                        <h4 className="error-msgtext">error msg </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                        <div className="radio-area mb-3">
                                            <h4>What best describes you?</h4>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="customCheck1" value="full time working parent" /><label className="form-check-label">Full time working parent</label>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" value="part time working parent" /><label className="form-check-label" >Part time working parent</label>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" value="Stay at home parent" /><label className="form-check-label" >Stay at home parent</label>
                                                    </div>
                                                </div>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" value="Self employed" /><label className="form-check-label">Self employed</label>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" value="unemployed" /><label className="form-check-label">unemployed</label>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" value="other" /><label className="form-check-label" >Other</label>
                                                </div>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" value="I prefer not to say" />
                                                    <label className="form-check-label">I prefer not to say</label>
                                                </div>
                                            </div><h4 className="error-msgtext"></h4>
                                            </div>
                                            </div>

                                        
                                            <div className="radio-area">
                                <h4>What’s your current life status?</h4>
                                <div className="custom-control custom-radio">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="current_life_status" value="I’m Single" id="flexRadioDefault1" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            I’m Single
                                        </label>
                                    </div>
                                </div>
                                <div className="custom-control custom-radio">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="current_life_status" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            I have a Partner or Support Person
                                        </label>
                                    </div>
                                </div>
                                
                                <h4 className="error-msgtext">error msg</h4>
                                        </div>


                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <div className='col-lg-2 col-md-3'>
                                    <ul className="list-unstyled ps-0 sidebar-nav edit-profile">
                                        <li className="mb-1">
                                            <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#edit-profile" aria-expanded="true">
                                            Edit Profile
                                            </button>
                                            <div className="collapse show collapsible-nav" id="edit-profile">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li><a href="#" className="active">About you</a></li>
                                                <li><a href="#" className="">About your Baby</a></li>
                                                <li><a href="#" className="link-dark rounded">About your Partner</a></li>
                                                <li><a href="#" className="link-dark rounded">Account Settings</a></li>
                                            </ul>
                                            </div>
                                        </li>
                                        <li className="mb-1">
                                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#billing-nav" aria-expanded="false">
                                            Billing
                                            </button>
                                            <div className="collapse collapsible-nav" id="billing-nav">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li><a href="#" className="link-dark rounded">Your Membership</a></li>
                                                <li><a href="#" className="link-dark rounded">Payment</a></li>
                                            </ul>
                                            </div>
                                        </li>
                                        <li className="mb-1">
                                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#promotion-nav" aria-expanded="false">
                                            Promotional
                                            </button>
                                            <div className="collapse collapsible-nav" id="promotion-nav">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                <li><a href="#" className="link-dark rounded">Earn Consult</a></li>
                                                <li><a href="#" className="link-dark rounded">Invite Friend</a></li>
                                                <li><a href="#" className="link-dark rounded">My offer</a></li>
                                            </ul>
                                            </div>
                                        </li>
                                        
                                        
                                    </ul>
                                </div>

                                <div className='col-lg-10 col-md-9'>
                                    <h3>About your  Baby</h3>
                                        <div className='edit-profile-container py-5'>
                                            <div className='step-innercontent step4'>
                                            <form className="step-form">
                                            <div className="radio-area pb-4 ">
                                                <h4>Are you currently expecting?</h4>
                                                <div className="custom-radio custom-control-inline">
                                                    <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                                        className="custom-control-input form-check-input"

                                                    />
                                                    <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                                                    <input
                                                        type="radio"
                                                        id="customRadio2"
                                                        name="pregnant"
                                                        value="no" className="custom-control-input form-check-input"

                                                    />
                                                    <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                                                </div>
                                                
                                            </div>
                                            <div>
                                                
                                                <div className="form-group birthday-box mb-3">
                                                    <label>Baby’s Birthdate</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <Stack spacing={3}>
                                                                <MobileDatePicker
                                                                    value={""}
                                                                    toolbarTitle="Choose date"
                                                                    disableFuture
                                                                    onChange={handleDateChange}
                                                                    renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                                                />
                                                            </Stack>
                                                        </LocalizationProvider>
                                                    <h5 className="error-msgtext">
                                                        error msg
                                                    </h5>
                                                </div>

                                                <div className="form-group birthday-box mb-3">
                                                    <label>Expected due date</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <Stack spacing={3}>
                                                                <MobileDatePicker
                                                                    value={""}
                                                                    toolbarTitle="Choose date"
                                                                    disableFuture
                                                                    onChange={handleDateChange}
                                                                    renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                                                />
                                                            </Stack>
                                                        </LocalizationProvider>
                                                    <h5 className="error-msgtext">
                                                    error msg
                                                    </h5>
                                                </div>
                                                <div className="form-group mb-3 baby-gender">
                                                    <label>Baby’s Gender</label>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="Gender"
                                                        // value={" "}
                                                        options={ baby_gender }

                                                        renderInput={(params) => <TextField {...params} name="gender" />}
                                                    />
                                                    <h4 className="error-msgtext">error msg</h4>
                                                </div>
                                            </div>
                                    
                                            <div>
                                                <div className="form-group mb-3">
                                                    <label>Baby’s First Name</label>
                                                    <input type="text" name="baby_first_name"
                                                        className="form-control" id=""
                                                        placeholder="First-name" />
                                                    <h5 className="error-msgtext">
                                                        error msg
                                                    </h5>
                                                </div>

                                                <div className="form-group birthday-box mb-3">
                                                    <label>Baby’s Birthdate</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <Stack spacing={3}>
                                                                <MobileDatePicker
                                                                    value={""}
                                                                    toolbarTitle="Choose date"
                                                                    disableFuture
                                                                    onChange={handleDateChange}
                                                                    renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                                                />
                                                            </Stack>
                                                        </LocalizationProvider>
                                                    <h5 className="error-msgtext">
                                                        error msg
                                                    </h5>
                                                </div>

                                                <div className="form-group mb-3 baby-gender">
                                                    <label>Baby’s Gender</label>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="Gender"
                                                        // value={" "}
                                                        options={ baby_gender }

                                                        renderInput={(params) => <TextField {...params} name="gender" />}
                                                    />
                                                    <h4 className="error-msgtext">error msg </h4>
                                                </div>

                                                <div className="radio-area mb-3">
                                                    <h4>How are you feeding your baby? </h4>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio3" name="feeding_choice" value="Breastfeeding" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio3">Breast-feeding</label>

                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio4" name="feeding_choice" value="Pumping" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio4">Pumping</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio5" name="feeding_choice" value="Formulafeeding" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio4">Formula Feeding</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio5" name="feeding_choice" value="Donorbreastmilk" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio4">Donor Breastmilk</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio5" name="feeding_choice" value="All" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio5">Select All</label>
                                                    </div>
                                                    <h5 className="error-msgtext">
                                                        error msg
                                                    </h5>
                                                </div>

                                                <div className="radio-area mb-3">
                                                    <h4>Was your baby born prematurely (prior to 37 weeks)?</h4>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio6" name="premature"  value="yes" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio6">yes</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio7" name="premature"  className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio7">no</label>
                                                    </div>
                                                    <h5 className="error-msgtext">
                                                    error msg
                                                    </h5>
                                                </div>

                                                <div className="radio-area mb-3">
                                                    <h4>How did you welcome your baby?</h4>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio3" name="delivery_choice"  value="Vaginal delivery" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio3">Vaginal delivery</label>

                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio4" name="delivery_choice" value="C-section" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio4">C-section</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio5" name="delivery_choice"  value="Surrogacy" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio5">Surrogacy</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio5" name="delivery_choice" value="Adoption" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio5">Adoption</label>
                                                    </div>

                                                    <h5 className="error-msgtext">
                                                    error msg
                                                    </h5>
                                                </div>

                                                <div className="radio-area mb-3">
                                                    <h4>Did you struggle with fertility?</h4>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio6" name="fertility_question" value="yes" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio6">yes</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="customRadio7" name="fertility_question"  value="no" className="custom-control-input form-check-input" />
                                                        <label className="custom-control-label step_two" htmlFor="customRadio7">no</label>
                                                    </div>
                                                    <h5 className="error-msgtext">
                                                    error msg
                                                    </h5>
                                                </div>
                                            </div>
                                
                                        </form>
                                        </div>
                                       
          
                                        </div>
                                </div>
                            </Row>


                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Your Membership
                                </div>
                                <div className='col-lg-10 col-md-10 your-membership-main'>
                                    <div className='your-membership'>
                                        <h5 className='section-title'>Your Membership</h5>
                                        <div className='my-3 d-flex w-100 ur-membership-container py-3 justify-content-center'>
                                            <p className='m-0 d-flex align-items-center'>You have a Monthly Membership<span className='plan-price ms-1'> $97 </span>/mo Every month</p>
                                        </div>
                                    </div>

                                    <div className='upgrade-membership'>
                                        <h3 className='upgrade-msg mt-4 py-2'>Upgrade your membership <span className='strong'>and save up to 45%</span></h3>
                                        <div className='d-flex w-100 flex-column flex-md-row'>
                                            <div className='plan-option1 member_plan monthy-plan w-50 me-md-2 me-0 mb-3 mb-md-0'>
                                                <div className="plan_head px-4 py-4">
                                                    <h3><span className="plan-nm">3-Month </span> Membership</h3>
                                                </div>
                                                <div className="plan_content px-4 py-4">
                                                    <div className="Plan-price-main d-flex flex-column">
                                                        <div className="plan-saving" >Save 25%</div>
                                                        <div className="d-flex Plan-price">
                                                            <span className="pCost-old"> $1000</span>
                                                            <span className="pCost" >$97 </span>
                                                            <span className="membership-cycle" >/mo</span>
                                                        </div>
                                                        <div className="plan-price-Total">
                                                            <span className="strong">$97</span> Every Monthly membership
                                                        </div>
                                                    </div>
                                                    <div className="plan-details-list">
                                                        <p className="strong">
                                                            Unlock full access to the Nurture by NAPS program.
                                                        </p>
                                                        <div className="plan-details-list">
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn_trial">
                                                        Upgrade your membership
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='plan-option2 member_plan monthy-plan w-50 ms-md-2 ms-0'>
                                                <div className="plan_head px-4 py-4">
                                                    <h3><span className="plan-nm">3-Month </span> Membership</h3>
                                                </div>
                                                <div className="plan_content px-4 py-4">
                                                    <div className="Plan-price-main d-flex flex-column">
                                                        <div className="plan-saving" >Save 25%</div>
                                                        <div className="d-flex Plan-price">
                                                            <span className="pCost-old"> $1000</span>
                                                            <span className="pCost" >$97 </span>
                                                            <span className="membership-cycle" >/mo</span>
                                                        </div>
                                                        <div className="plan-price-Total">
                                                            <span className="strong">$97</span> Every Monthly membership
                                                        </div>
                                                    </div>
                                                    <div className="plan-details-list">
                                                        <p className="strong">
                                                            Unlock full access to the Nurture by NAPS program.
                                                        </p>
                                                        <div className="plan-details-list">
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                            <p>As a member, you attend webinars, live Q&As, special member events and more for free. </p>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn_trial">
                                                        Upgrade your membership
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-3 col-md-3'>
                                    Payment
                                </div>
                                <div className='col-lg-9 col-md-9 payment-main'>
                                    <div className='user-payment-details'>
                                        <h5>Payment Detail</h5>
                                        <div className='my-3 d-flex w-100 payment-details-container py-3 px-4 flex-column'>
                                            <div className='payment-method w-100 d-flex justify-content-between align-items-center my-2'>
                                                <div className='payment-method-logo'>
                                                    <img src={master_card_img}></img>
                                                </div>
                                                <div className=''>
                                                    <p className='card-number m-0'>X X X X X X X X X X X X X - 1 2 3 4</p>
                                                </div>
                                                <div>
                                                    <p className='card-holder-name m-0'>Cameron Williamson</p>
                                                </div>
                                                <div>
                                                    <p className='exp-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='cvv-num m-0'>cvv</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>Edit</a></p>
                                                </div>
                                            </div>
                                            <div className='payment-method w-100 d-flex justify-content-between align-items-center my-2'>
                                                <div className='payment-method-logo'>
                                                    <img src={visa_card_img}></img>
                                                </div>
                                                <div className=''>
                                                    <p className='card-number m-0'>X X X X X X - 1 2 3 4</p>
                                                </div>
                                                <div>
                                                    <p className='card-holder-name m-0'>Cameron Williamson</p>
                                                </div>
                                                <div>
                                                    <p className='exp-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='cvv-num m-0'>cvv</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>Edit</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Payment History
                                </div>
                                <div className='col-lg-10 col-md-10 payment-history-main'>
                                    <div className='payment-history-details'>
                                        <h5>Payment History</h5>
                                        <div className='my-3 d-flex w-100 payment-history-container py-3 px-4 flex-column'>
                                            <div className='payment-history-list w-100 d-flex justify-content-between align-items-center my-2'>

                                                <div className=''>
                                                    <p className='payment-name m-0'>Veterans Moms’ Survival Group</p>
                                                </div>

                                                <div>
                                                    <p className='payment-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='paid-amount m-0'>October 14, 2021</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>View details</a></p>
                                                </div>
                                            </div>
                                            <div className='payment-history-list w-100 d-flex justify-content-between align-items-center my-2'>

                                                <div className=''>
                                                    <p className='payment-name m-0'>Veterans Moms’ Survival Group</p>
                                                </div>

                                                <div>
                                                    <p className='payment-date m-0'>10/2022</p>
                                                </div>
                                                <div>
                                                    <p className='paid-amount m-0'>October 14, 2021</p>
                                                </div>
                                                <div>
                                                    <p className='action m-0'><a href='#'>View details</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Earn Consult
                                </div>
                                <div className='col-lg-10 col-md-10 payment-main'>
                                    <h5 className='section-title'> Earn Consult</h5>
                                    <div className='earn-consult-container py-3 px-4 d-flex flex-column'>
                                        <div className='progress-bar-container pb-4 d-flex align-items-center'>
                                            <div className='progress-bar'>
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
                                                {/* <CircularProgressWithLabel value={progress} /> */}
                                            </div>
                                            <div className='profile-competion-msg'>
                                                <p>Complete your profile and get a <span>free 30 minute consult </span> with one of our nurses.</p>
                                            </div>
                                        </div>
                                        <div className='profile-completion-container'>
                                            <List
                                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                                                aria-label="contacts"
                                                className='profile-steps'
                                            >
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <CheckIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Upload a profile photo" className='text-start' />
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
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
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <CheckIcon />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Complete a course" />
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <CheckIcon />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Ask a Nurse" />
                                                        <span className='mr-0 ml-auto'><a href='#'>View</a></span>
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    Invite Friend
                                </div>
                                <div className='col-lg-10 col-md-10 invite-friend-main'>
                                    <h5 className='section-title'> Invite Friend </h5>
                                    <div className='invite-friend-container profile-container py-5 py-md-5 px-4 d-flex flex-column justify-content-center'>
                                        <div className='invite-friend-inner'>
                                            <form>
                                                <div className="form-group mb-3">
                                                    <label>Name</label>
                                                    <input type="text" name="friend-name" className=" form-control" id="" placeholder="Ruhama" /><p className="error">Please enter name</p>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Email</label>
                                                    <input type="email" name="email" className=" form-control" id="" placeholder="Type something" value="dmpampi17@gmail.comm" /><p className="error">Please enter email</p>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <button type="button" className="primary-blue-small-btn btn w-50 me-2">Send</button>
                                                    <button type="button" className="primary-outline-btn h50 btn w-50 ms-2">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row className='mt-3'>
                                <div className='col-lg-2 col-md-2'>
                                    My offer
                                </div>
                                <div className='col-lg-10 col-md-10 payment-main'>
                                    <h5 className='section-title'> My offer </h5>
                                    <div className='offer-container-main d-flex flex-wrap'>
                                        <div className='offer-container w-50 pe-0 pe-md-3 mb-4'>
                                            <div className='offer1 container-inner'>
                                                <div className=''>
                                                    <div className=''><img src={gift_icon} /></div>
                                                    <div className='discounted-offer'>
                                                        <div className='discounted-offer-inner'>
                                                            <span className='value'>20% off </span>Any consult
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='offer-info my-3'>
                                                    <h3 className='offer-title'>Premium Offering: </h3>
                                                    <p>Just  copy code to get 20% off any consult when you schedule your appointment</p>
                                                </div>
                                                <div className='coupon-container d-flex justify-content-between align-items-center'>
                                                    <div className='coupon-value'>NAPS2020</div>
                                                    <div><a href='#'>Copy</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='offer-container w-50 ps-0 ps-md-3 mb-4'>
                                            <div className='offer2 container-inner'>
                                                <div className=''>
                                                    <div className=''><img src={gift_icon} /></div>
                                                    <div className='discounted-offer'>
                                                        <div className='discounted-offer-inner'>
                                                            <span className='value'>20% off </span>Any consult
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='offer-info my-3'>
                                                    <h3 className='offer-title'>Premium Offering: </h3>
                                                    <p>Just  copy code to get 20% off any consult when you schedule your appointment</p>
                                                </div>
                                                <div className='coupon-container d-flex justify-content-between align-items-center'>
                                                    <div className='coupon-value'>NAPS2020</div>
                                                    <div><a href='#'>Copy</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='offer-container w-50 pe-0 pe-md-3 mb-4'>
                                            <div className='offer3 container-inner'>
                                                <div className=''>
                                                    <div className=''><img src={gift_icon} /></div>
                                                    <div className='discounted-offer'>
                                                        <div className='discounted-offer-inner'>
                                                            <span className='value'>20% off </span>Any consult
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='offer-info my-3'>
                                                    <h3 className='offer-title'>Premium Offering: </h3>
                                                    <p>Just  copy code to get 20% off any consult when you schedule your appointment</p>
                                                </div>
                                                <div className='coupon-container d-flex justify-content-between align-items-center'>
                                                    <div className='coupon-value'>NAPS2020</div>
                                                    <div><a href='#'>Copy</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </div>
                </Row>
            </Container>

            <div className='service-container'>
                <Container fluid>
                    <Row className='service-header'>
                        <div className='col-lg-12 col-md-12 '>
                            <div className='row service-header-container g-0'>
                                <div className='col-lg-6 col-md-6 service-caption-container'>
                                    <Row className='justify-content-end'>
                                        <div className='col-lg-10 col-sm-12'>
                                            <div className='d-flex flex-column service-content py-md-5 p-3 me-md-5 pe-md-5'>
                                                <div className='page-nav'>
                                                    <span className='parent-link'>Virtual className</span> <span className='right-angle'> <ChevronRightIcon /></span> <span>Breastfeeding Basics Classes</span>
                                                </div>
                                                <h1 className='service-name text-start mt-3 mb-1'>
                                                    Daytime & Overnight <span className='strong'>Infant Care </span>
                                                </h1>
                                                <h3 className='survice-subtitle'>
                                                    adszxf
                                                </h3>
                                                <div className='service-description'>
                                                    <p>Get the sleep you and your baby need with expert help from a pediatric Nurse Practitioner specializing in newborn sleep behaviors.</p>
                                                    <p>
                                                        Are you suffering from sleep deprivation because your baby or toddler is not sleeping through the night? Have you been co-sleeping, or has your baby been sleeping somewhere other than her crib? Our pediatric Nurse Practitioner will walk you through a customized action plan including one or more sleep techniques.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                                <div className='col-lg-6 col-md-6 service-banner-img'>

                                </div>
                            </div>
                        </div>
                    </Row>
                    
                </Container>
            </div>

            <Container>
                <Row className='my-4'>
                    <div className='col-lg-2 col-md-3'>
                        <ul className="list-unstyled ps-0 sidebar-nav edit-profile">
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#edit-profile" aria-expanded="true">
                                Edit Profile
                                </button>
                                <div className="collapse show collapsible-nav" id="edit-profile">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="active">About you</a></li>
                                    <li><a href="#" className="">About your Baby</a></li>
                                    <li><a href="#" className="link-dark rounded">About your Partner</a></li>
                                    <li><a href="#" className="link-dark rounded">Account Settings</a></li>
                                </ul>
                                </div>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#billing-nav" aria-expanded="false">
                                Membership
                                </button>
                                <div className="collapse collapsible-nav" id="billing-nav">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Your Membership</a></li>
                                    <li><a href="#" className="link-dark rounded">Payment</a></li>
                                </ul>
                                </div>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#promotion-nav" aria-expanded="false">
                                Promotional
                                </button>
                                <div className="collapse collapsible-nav" id="promotion-nav">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Earn Consult</a></li>
                                    <li><a href="#" className="link-dark rounded">Invite Friend</a></li>
                                    <li><a href="#" className="link-dark rounded">My offer</a></li>
                                </ul>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className='col-lg-10 col-md-10 invite-friend-main'>
                        <h5 className='section-title'>About your Partner</h5>
                        <div className='invite-friend-container profile-container py-5 py-md-5 px-4 d-flex flex-column justify-content-center'>
                            <div className='invite-friend-inner'>
                                <form>
                                    <div className="form-group mb-3">
                                        <label>Partner or Support Person’s First Name</label>
                                        <input type="text" name="friend-name" className=" form-control" id="" placeholder="Name" />
                                        <p className="error">Please enter name</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Partner or Support Person’s Last Name</label>
                                        <input type="text" name="" className=" form-control" id="" placeholder="Beaton" />
                                        <p className="error">Please enter last name</p>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Partner or Support Person’s Email</label>
                                        <input type="text" name="friend-name" className=" form-control" id="" placeholder="Beaton@gmail.com" />
                                        <p className="error">Please enter email</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <button type="button" className="primary-blue-small-btn btn w-50 me-2">Save Changes</button>
                                        <button type="button" className="primary-outline-btn h50 btn w-50 ms-2">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Row>

                <Row className='my-4'>
                    <div className='col-lg-3 col-md-3'>
                        <ul className="list-unstyled ps-0 sidebar-nav edit-profile">
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#edit-profile" aria-expanded="true">
                                Edit Profile
                                </button>
                                <div className="collapse show collapsible-nav" id="edit-profile">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="active">About you</a></li>
                                    <li><a href="#" className="">About your Baby</a></li>
                                    <li><a href="#" className="link-dark rounded">About your Partner</a></li>
                                    <li><a href="#" className="link-dark rounded">Account Settings</a></li>
                                </ul>
                                </div>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#billing-nav" aria-expanded="false">
                                Membership
                                </button>
                                <div className="collapse collapsible-nav" id="billing-nav">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Your Membership</a></li>
                                    <li><a href="#" className="link-dark rounded">Payment</a></li>
                                </ul>
                                </div>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#promotion-nav" aria-expanded="false">
                                Promotional
                                </button>
                                <div className="collapse collapsible-nav" id="promotion-nav">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" className="link-dark rounded">Earn Consult</a></li>
                                    <li><a href="#" className="link-dark rounded">Invite Friend</a></li>
                                    <li><a href="#" className="link-dark rounded">My offer</a></li>
                                </ul>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className='col-lg-9 col-md-9 invite-friend-main'>
                        <h5 className='section-title'>Account Settings</h5>
                        <div className='invite-friend-container profile-container py-5 py-md-5 px-4 d-flex flex-column justify-content-center'>
                            <div className='invite-friend-inner'>
                                <form>
                                    <div className="form-group position-relative mb-3">
                                        <label>Current Password</label>
                                        <input
                                            // type="password"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="***********************"
                                            // onChange={handleChange}
                                        />
                                        <img src={Eye} alt="" className="eye-passimg" />
                                        <p className="error">Password wrong</p>
                                    </div>

                                    <div className="form-group position-relative mb-3">
                                        <label>New Password</label>
                                        <input
                                            // type="password"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="exampleInputPassword2"
                                            placeholder="***********************"
                                            // onChange={handleChange}
                                        />
                                        <img src={Eye} alt="" className="eye-passimg" />
                                        <p className="error">Password wrong</p>
                                    </div>

                                    <div className="form-group position-relative mb-3">
                                        <label>Confirm Password</label>
                                        <input
                                            // type="password"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="exampleInputPassword3"
                                            placeholder="***********************"
                                            // onChange={handleChange}
                                        />
                                        <img src={Eye} alt="" className="eye-passimg" />
                                        <p className="error">Password wrong</p>
                                    </div>

                                    <div className='d-flex justify-content-between'>
                                        <button type="button" className="primary-blue-small-btn btn w-50 me-2">Save Chnages</button>
                                        <button type="button" className="primary-outline-btn h50 btn w-50 ms-2">Cancel</button>
                                    </div>

                                    <div className="text-center mt-4">
                                        <a href="#" className="deactivate-link text-center fw-bold n-signup">Deactivate Account</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Row>

                <Row className='my-4'>
                    <div className='col-lg-3 col-md-3'>
                        Empty States
                    </div>

                    <div className='col-lg-9 col-md-9 empty-states'>
                        <h5 className='section-title'>Started course</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container startrd-course'>
                                
                            </div>
                            <h3>Start a <strong>Course</strong></h3>
                            <p>You haven’t started any courses yet</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Courses</button>
                        </div>

                        <h5 className='section-title'>Complete courses</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container startrd-course'>
                                
                            </div>
                            <h3>Complete <strong>Courses</strong></h3>
                            <p>You haven’t started any courses yet</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Courses</button>
                        </div>

                        <h5 className='section-title'>Complete courses</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container favorite'>
                                
                            </div>
                            <h3>Collect your <strong>Favorite</strong></h3>
                            <p>Your favorite courses will appear here</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Courses</button>
                        </div>

                        <h5 className='section-title'>Upcoming event</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container event-icon'>
                                
                            </div>
                            <h3>No Upcoming <strong>Event</strong></h3>
                            <p>You don’t have any upcoming event. When you book an event it will appear here.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Event</button>
                        </div>

                        <h5 className='section-title'>Past event</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container event-icon'>
                                
                            </div>
                            <h3>No Past <strong>Event</strong></h3>
                            <p>You don’t have any past event. All your past events will appear here.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Event</button>
                        </div>

                        <h5 className='section-title'>Fav event</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container favorite'>
                                
                            </div>
                            <h3>Collect your <strong>Favorite</strong></h3>
                            <p>Your favorite events will appear here</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Event</button>
                        </div>

                        <h5 className='section-title'>Upcoming Services</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container service-icon'>
                                
                            </div>
                            <h3>No Upcoming <strong>Services</strong></h3>
                            <p>You don’t have any upcoming service. When you book a service it will appear here.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Services</button>
                        </div>

                        <h5 className='section-title'>Past Services</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container service-icon'>
                                
                            </div>
                            <h3>No Past <strong>Services</strong></h3>
                            <p>You don’t have any past service. All your past services  will appear here.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Services</button>
                        </div>

                        <h5 className='section-title'>Fav event</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container favorite'>
                                
                            </div>
                            <h3>Collect your <strong>Favorite</strong></h3>
                            <p>Your favorite events will appear here.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">View Event</button>
                        </div>

                        <h5 className='section-title'>Gift Card Received</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container gift-card-icon'>
                                
                            </div>
                            <h3><strong>Gift Card</strong>Received</h3>
                            <p>You haven’t received  any Gift Card yet.</p>
                            {/* <button className="btn primary-blue-small-btn-40 mt-3">View Services</button> */}
                        </div>

                        <h5 className='section-title'>Gift Card Sent</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container gift-card-icon'>
                                
                            </div>
                            <h3><strong>Gift Card</strong>Received</h3>
                            <p>You haven’t Sent any Gift Card yet.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">Gift your friend</button>
                        </div>

                        <h5 className='section-title'>Ask a Nurset</h5>
                        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
                            <div className='icon-container ask-nurse-icon'>
                                
                            </div>
                            <h3>Ask a <strong>Nurse</strong></h3>
                            <p>You didn’t ask any question yet.</p>
                            <button className="btn primary-blue-small-btn-40 mt-3">Ask a Nurse</button>
                        </div>
                    </div>
                </Row>

            </Container>
        </div>
    )
    {/* return <CircularProgressWithLabel value={20} />; */}
}



export default LiveEvent
