import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./editProfile.scss";
import { Container, Row, Col, Card, Button, Image, ListGroup, ProgressBar } from 'react-bootstrap';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import StepperMenu from './step/step';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import { getProfileBabyAPI, getUserBillingAPI, getUserProfileEdit } from '../../Service/update_profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfileToolTip from '../../Common/EditProfileToolTip/toolTip';
import { Avatar, Stack } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const EditProfile = (props: any) => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState('edit');

  const [subStep, setSubStep] = useState<number>(0)
  const [subStep1, setSubStep1] = useState<number>(0)
  const [subStep2, setSubStep2] = useState<number>(0)

  const [formData1, setFormData1] = useState<any>({})
  const [formData2, setFormData2] = useState<any>({})
  const [formData3, setFormData3] = useState<any>({})
  const [formData4, setFormData4] = useState<any>({})
  const [feedingChoice, setFeedingChoice] = React.useState<any>([])

  const [userMember, setUserMember] = useState<any>({})
  const [memberData, setMemberData] = useState<any>([])
  const [payHistory, setPayHistory] = useState<any>([])
  const [payDetail, setPayDetail] = useState<any>([])

  const [earnCon, SetEarnCon] = useState<any>([])
  const [formInvite, setFormInvite] = useState<any>({})
  const [myOffer, setMyOffer] = useState<any>([])

  const [error, setError] = useState<any>({})

  const [profileData, setProfileData] = useState<any>({})
  const [openPop, setOpenPop] = React.useState<boolean>(false)


  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)?.id;
  const Navigator = useNavigate()

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

  function getStepContent(stepIndex: any) {
    switch (stepIndex) {
      case 'edit':
        return (<Step1
          formNo={subStep} formData1={formData1} setFormData1={setFormData1} feedingChoice={feedingChoice} setFeedingChoice={setFeedingChoice}
          formData2={formData2} setFormData2={setFormData2} formData3={formData3} setFormData3={setFormData3}
          formData4={formData4} setFormData4={setFormData4} error={error} setError={setError}
          openPop={openPop} setOpenPop={setOpenPop} profileData={profileData} getProfileBaby={getProfileBaby}
        />
        );
      case 'billing':
        return (<Step2 billingNo={subStep1} userMember={userMember} memberData={memberData} payHistory={payHistory} payDetail={payDetail} />);
      case 'promotion':
        return (<Step3 promoNo={subStep2} props={props} earnConst={earnCon} inputVal={formInvite} setInputVal={setFormInvite} offer={myOffer} value={profileData?.earn_consult_progress} getProfileBaby={getProfileBaby} />);
      // case 'MyEvents':
      //     return (<Step2 data={subStep1 == 1 ? upComeEvt : subStep1 == 2 ? pastEvt : subStep1 == 3 ? favEvt : allCourse} />);
      // case 'MyServices':
      //     return (<Step3 data={subStep2 == 1 ? upComeService : subStep2 == 2 ? pastService : subStep2 == 3 ? giftRecieve : upComeService} subStep2={subStep2} />);
      // case 'Ask_a_Nurse':
      //     return (<Step4 data={askNurse} />);
      default:
        return "";
    }
  }

  const getProfileBaby = async () => {
    try {
      let id: any = { user_id: userID }
      let res: any = await getUserProfileEdit(id)
      // debugger
      setProfileData(res?.data)
      setFormData1(res?.data?.about_you)
      setFormData2(res?.data?.about_your_baby)
      setFormData3(res?.data?.about_your_partner)
      SetEarnCon(res?.data?.earn_consult)
      setMyOffer(res?.data?.my_offer)
    } catch (err) {
      console.log(err)
    }
  }

  const getUserbillingData = async () => {
    try {
      let id: any = { user_id: userID }
      let res: any = await getUserBillingAPI(id)
      // debugger
      setUserMember(res?.data?.user_membership)
      setMemberData(res?.data?.membership)
      setPayDetail(res?.data?.payment_details)
      setPayHistory(res?.data?.payment_history)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getProfileBaby()
    getUserbillingData()
  }, [])
  useEffect(() => {
    return () => {
      localStorage.removeItem('stabeleComponent')
      localStorage.removeItem('stabeleStep')
    }
  }, [])
  console.log(profileData)
  return (
    <>
      <ToastContainer />
      <div className="profileContainer pale-bg">
        <Container fluid>
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
                              <Stack direction="row" spacing={2}>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={profileData?.about_you?.photo}
                                  sx={{ width: 122, height: 122 }}
                                />
                              </Stack>
                              {/* <img src={profile_thumb} className="img-responsive" /> */}
                            </div>
                            <div className='user-info px-1 px-sm-2 px-md-4'>
                              <h3 className='user-name'>{profileData?.about_you?.name}</h3>
                              <button className='secondary-teal-btn px-3' ><EditOutlinedIcon /> Edit Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 mt-3 mt-md-0'>
                        {
                          profileData?.about_you?.is_membership == 0 &&
                          <div className='profile-becomemember-info w-md-75 w-100 me-0 ms-auto'>
                            <div className='d-flex w-100 justify-content-between align-items-center'>
                              <div className='member-title'><h4 className='p-0 m-0'>Become a member </h4></div>
                              <div className='member-price d-flex align-items-center'>from <span className='value ms-1'> ${profileData?.become_a_member}</span></div>
                            </div>
                          </div>
                        }
                        {
                          profileData?.about_you?.is_membership == 1 &&
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

          <Row>
            <div className='col-lg-12 col-md-12'>
              <Container className='paddingLR-0'>
                <Row>
                  <StepperMenu activeStep={activeStep} setActiveStep={setActiveStep}
                    subStep={subStep} setSubStep={setSubStep} subStep1={subStep1}
                    setSubStep1={setSubStep1} subStep2={subStep2} setSubStep2={setSubStep2} />
                  <div className='col-lg-9 col-md-9'>
                    {getStepContent(activeStep)}
                  </div>
                </Row>
              </Container>
            </div>
          </Row>
        </Container>
      </div>
    </>
  )
}



export default EditProfile
