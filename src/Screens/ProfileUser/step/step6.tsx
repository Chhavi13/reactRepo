import React from 'react'
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
// import Step1 from './step/step1';
// import Step2 from './step/step2';
// import Step3 from './step/step3';
// import Step4 from './step/step4';
// import Step5 from './step/step4';
// import StepperMenu from './step/step';
// import { CourseCompletedAPI, CourseFavouriteAPI, CourseStartedApi } from '../../Service/edit_profile';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

function Step6() {

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
  return (
    <div>
      <div className='activity-container'>
        <div className='activity-info-main py-3 px-4'>
          <div className='activity-type'>
            <p>You commented on <span className='activity-topic strong'>topic title</span> <span className='activity-time'>- 5 hours ago</span></p>
            <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p>
            <p className='navigateTo strong mb-0'>Go to comment</p>
          </div>
        </div>
        <div className='activity-info-main py-3 px-4'>
          <div className='activity-type'>
            <p>You started <span className='activity-topic strong'>Labor & Delivery Prep</span> <span className='activity-time'>- 2 days ago</span></p>
            {/* <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p> */}
            <p className='navigateTo strong mb-0'>Continue</p>
          </div>
        </div>
        <div className='activity-info-main py-3 px-4'>
          <div className='activity-type'>
            <p>You started <span className='activity-topic strong'>Labor & Delivery Prep</span> <span className='activity-time'>- 2 days ago</span></p>
            {/* <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p> */}
            <p className='navigateTo strong mb-0'>Continue</p>
          </div>
        </div>
      </div>



      <Row>
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

                <div className='payment-for-title'>
                  <p className='payment-name m-0'>Veterans Moms’ Survival Group</p>
                </div>

                <div className='payment-date'>
                  <p className='payment-date m-0'>10/2022</p>
                </div>
                <div className='payment-amount'>
                  <p className='paid-amount m-0'>October 14, 2021</p>
                </div>
                <div className='payment-details'>
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

                // error comment
                {/* <Box sx={{ position: 'relative', display: 'inline-flex' }}>
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
                </Box> */}
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
                                                    <span className='parent-link'>Virtual class</span> <span className='right-angle'> <ChevronRightIcon /></span> <span>Breastfeeding Basics Classes</span>
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
                    <Row className='my-5 consult-more-info'>
                        <div className='col-lg-12'>
                            <Container>
                                <Row>
                                    <div className='col-lg-6 col-md-6 pe-5'>
                                        <h3 className='text-start'>Overnight Nursing Care</h3>
                                        <p>Overnight care helps exhausted parents sleep for eight consecutive hours. Whether you just need to rest, need to catch an early flight or have a big presentation at work, an overnight session with a NAPS nurse gives you a night off bedtime and feeding duty</p>
                                        <p><span className='strong'>Class Duration: </span> 75 minutes</p>
                                        <p><span className='strong'>Series Details: </span> 75 minutes</p>
                                        <p><span className='strong'> Topics Include: </span>
                                            <ul>
                                                <li>Caring for your newborn</li>
                                                <li>Feeding and sleeping schedules</li>
                                                <li>Traveling with a baby</li>
                                                <li>Caring for your newborn</li>
                                                <li>Feeding and sleeping schedules</li>
                                                <li>Traveling with a baby</li>
                                            </ul>
                                        </p>

                                    </div>
                                    <div className='col-lg-6 col-md-6 position-relative'>
                                        <div className='position-sticky'>
                                            <div className='d-flex flex-column'>
                                                <div className='d-flex justify-content-start align-items-center service-primary-container service-btn-container mb-3'>
                                                    <div className='btn-container me-3'>
                                                        <button className='btn service-btn service-primary-btn'>Virtual Class <span className='me-0 ms-auto'>$100</span></button>
                                                    </div>
                                                    <div className='btn-container-right'>
                                                        <span className='me-2'><img src={gift_Sicon} /></span>Send as Gift
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-start align-items-center service-secondary-continer service-btn-container mb-3'>
                                                    <div className='btn-container me-3'>
                                                        <button className='btn service-btn service-primary-btn'>Book Private Class <span className='me-0 ms-auto'>$225</span></button>
                                                    </div>
                                                    <div className='btn-container-right'>
                                                        <span className='me-2'><img src={lavender_gift_icon} /></span>Send as Gift
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-start align-items-center service-tertiary-continer service-btn-container mb-3'>
                                                    <div className='btn-container me-3'>
                                                        <button className='btn service-btn service-primary-btn'>Become a member<span className='me-0 ms-auto'><span className='small d-none d-sm-none d-md-block d-lg-block d-xl-block'>from </span>$76.50</span></button>
                                                    </div>
                                                    <div className='btn-container-right'>
                                                        <span className='me-2'><img src={add_more_icon} /></span>Read More
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Row>

                                <Row>
                                    <div className='col-lg-12 col-md-12'>
                                        <div className='container become-member my-4 p-0'>
                                            <div className='col-lg-12 col-md-12'>
                                                <div className='become-member-container p-md-5 p-3'>
                                                    <div className='row'>
                                                        <div className='col-lg-5'>
                                                            <div className='become-meber-captions'>
                                                                <h3>Become a Member
                                                                    <span className="strong">for total access</span>
                                                                </h3>
                                                                {/* <div className='price-dtls'>
                                                                <p>from <span className='pvalue strong'>$76.50</span> /mo</p>
                                                            </div> */}
                                                                <div className='become-member-pointers'>
                                                                    <ol>
                                                                        <li><p> <span className='li-counter'>1</span><span className='strong'>Get access to everything: </span> courses, videos, live webinars, and more. </p></li>
                                                                        <li><p> <span className='li-counter'>2</span> Responses from <span className='strong'>real nurses within 24 hours</span></p></li>
                                                                        <li><p> <span className='li-counter'>3</span> Unfiltered answers <span className='strong'> any time, anywhere</span></p></li>
                                                                    </ol>
                                                                </div>
                                                                <div>
                                                                    <button className='secondary-teal-btn-small mt-4'>Read More</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='become-member my-4'>
                                       
                                        </div> */}
                                    </div>
                                </Row>
                            </Container>
                        </div>
                    </Row>
                </Container>
            </div>
    </div>
  )
}

export default Step6