import React, { useState, useEffect, useCallback, useRef, createContext } from 'react';
import { useDispatch, useSelector } from "react-redux"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
// import { Tabs, Tab } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import * as images from '../images'
import Button from 'react-bootstrap/Button'
import "./mUserProfile.scss";
import TabIcon from '../tabs/tabs';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../editUserProfile/editUserProfile.scss'
import * as authService from "../../services/auth.service";
import * as offer from "../../services/offer.service";
import { videoExtentionType, imgExtentionTypes } from '../editUserProfile/editUserProfile'
import { ReadMore } from "../readMore/readMore"
import { getPersonalDetailAction, getUserProfileMediaAction } from '../../redux/action/authActions/authActions';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Carousel, { ModalGateway, Modal } from 'react-images';
import { getItemLocalStorage } from '../../utils/Utils';
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import Gift from '../../assets/images/mobileimages/gift.svg';
import Horse from '../../assets/images/mobileimages/center.svg';
import BottomPopup from '../../components/bottomPopup/bottomPopup';
import { SubscribePopup } from "./subscribePopup";
import { InvestPopup } from "./investPopup";
import Chip from '@material-ui/core/Chip';
import { getLoyaltyById, loyalityData } from '../../services/loyalty.service';
import SingleLineImageList from "./imageList"
import ImageListItem from '@material-ui/core/ImageListItem';
import { Popup } from './popup';
import UnSubscribePopup from './unSubscribePopup';
import { PhotoGallery } from '../../components/gallery/photoGallery';
import moment from 'moment';



interface IProps { }

class PhotosVM {
  position: number | undefined;
  src: any | undefined;
  type: string | undefined;
}


const useStylesFacebook = makeStyles((theme: any) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});


function MemberCircularProgress({ progress }: any) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress variant="static" style={{ color: "#000", transform: "rotate(93deg)" }} value={progress} />
    </div>
  );
}


function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}




let carouselPhotos: any = [];

export const PassionContext = createContext({ isActive: false, enableActive: () => { } });

export const MUserProfile: React.FC<IProps> = () => {
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);
  const [isSubscribeModal, setSubscribeModal] = React.useState(false);
  const [isInvestModal, setInvestModal] = React.useState(false);
  const [data, setData] = React.useState<any>({})
  const [tier, setTier] = React.useState<any>({})
  const [classValue,setClassValue] = React.useState<any>("")
  const history = useHistory()
  const param: any = useParams()
  // const getId: any = parseInt(param?.id ? param?.id : 0 );
  const getId: any = param?.id ? parseInt(param?.id) : false;
  // for image cropper
  let [show, setShow] = useState(false);
  const [progress, setProgress] = useState(50);

  const [userPhotos, setUserPhotos] = useState<PhotosVM[]>([]);
  const [showPassions, setShowPassions] = useState<boolean>(false)
  const handleShowPassions = () => setShowPassions(!showPassions);

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const playerRef: any = useRef();
  const [userProfileData, setUserProfileData] = useState<any>([]);
  const [investerData, setInvesterdata] = useState<any>({});
  const [points, setPoints] = useState<any>({});
  const [investor, setInvestor] = useState<any>({})
  const [popup, setPopup] = useState<any>(false)
  const [isReport, setIsReport] = useState<any>(false)
  const [unSubscribe, setUnSubscribe] = useState<any>(false)

  let [isOpenCarousel, setIsOpenCarousel] = useState<boolean>(false);
  let [galleryImage, setGalleryImage] = useState<any>({});
  let [galleryImageArray, setGalleryImageArray] = useState<any>([]);



  const dispatch = useDispatch()
  let profileDataRedux: any = useSelector((state: any) => {
    return state.authReducer?.personalData
  })

  let mediaDataRedux = useSelector((state: any) => {
    return state.authReducer?.media?.data
  })


  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };


  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };


  const isToggleUploadPic = () => {
    show = !show;
    setShow(show);
  }

  const Review = () => {
    history.push('/review');
  }

  //console.log('subscrinber dataiii',data.subscript_cost);

  // const readFile = (file: any) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     //reader.addEventListener('load', () => resolve(reader.result), false)
  //     reader.readAsDataURL(file)
  //     reader.onload = (event) => {
  //       setProgress(Math.round((100 * event.loaded) / event.total));
  //       resolve(reader.result)
  //       setUploadingFile(false);
  //     }
  //     setProgress(0)
  //   })
  // }

  // const getCroppedImage = async (file: any) => {
  //   try {
  //     //let formData = new FormData()

  //     let formData = "s";
  //     // formData.append("profile_pic", croppedImage)
  //     // setUploadingProfile(true);
  //     setUploadingFile(true);
  //     let image = await readFile(file)
  //     setProfilepic(image)
  //     setShow(false)
  //   } catch (err) {
  //     setUploadingFile(false);
  //     // setUploadingProfile(false);
  //   }
  // }
  function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }



  const openLightbox = useCallback((item) => {
    const index = carouselPhotos.findIndex((x: any) => x.position === item.position);
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const getMediaData = (media: any) => {
    let data: any = [];
    if (media) {
      media.filter((item: any, i: number) => {
        const splitLink = item.file.split('.');
        const ext = splitLink[splitLink.length - 1];
        if (videoExtentionType.includes(ext)) {
          data.push({ src: item.file, type: 'video', position: i });
        } else if (imgExtentionTypes.includes(ext)) {
          data.push({ src: item.file, type: 'image', position: i });
        }
      });
    }
    if (data.length <= 4) {
      for (let index = 0; index < 4; index++) {
        const element = data[index];
        if (!element) {
          data.push({ src: '', type: '', position: index + 1 });
        }
      }
    }
    const availablePhotos: any = data.filter((x: any) => (x.src && x.type === 'image'));
    carouselPhotos = availablePhotos;
    setUserPhotos([...data]);
  }

  const getMedia = async () => {
    try {
      const response: any = await dispatch(getUserProfileMediaAction())
      getMediaData(response.payload.data)

    } catch (err) {

    }
  }
  const getLoyaltyData = async () => {
    let res: any = await loyalityData()
    setTier({
      ["tier"]: res?.data?.data,
      ["minpoints1"]: res?.data?.data[0]?.min_points,
      ["minpoints2"]: res?.data?.data[1]?.min_points,
      ["minpoints3"]: res?.data?.data[2]?.min_points,
      ["name1"]: res?.data?.data[0]?.benefits_name,
      ["name2"]: res?.data?.data[1]?.benefits_name,
      ["name3"]: res?.data?.data[2]?.benefits_name,
      ["image1"]: res?.data?.data[0]?.image,
      ["image2"]: res?.data?.data[1]?.image,
      ["image3"]: res?.data?.data[2]?.image
    })

  }

  useEffect(() => {
    window.scrollTo(0, 1)
    const getProfileU = async () => {
      try {
        const response: any = await authService.getProfile();
        setUserProfileData({ ...response.data.data });
        setData({ ...response.data.data });
        setPoints({
          'point': response.data.data.my_points
        })
      } catch (err) {

      }
    }
    // !getId && (profileDataRedux ? (setUserProfileData({ ...profileDataRedux?.data?.data }) |setData({ ...profileDataRedux?.data?.data })) : getProfileU())
    !getId && (mediaDataRedux ? getMediaData(mediaDataRedux) : getMedia());
    !getId && getProfileU()
    !getId && getLoyaltyData()
    // if(!getId){  
    //   if(profileDataRedux){
    //     debugger
    //     setUserProfileData({...profileDataRedux?.data?.data})
    //     setData({...profileDataRedux?.data?.data})
    //   }else{
    //     getProfileU()
    //   }
    // }

  }, [setUserProfileData, profileDataRedux, window.location.pathname]);

  // console.log("profile data redu",profileDataRedux)
  const getUserDataByID = async () => {
    try {
      let response: any = await authService.getUserProfileDetail(getId);
      const media: any = response?.data?.data?.user_media_files.map((item: any) => item = { 'file': item });
      setUserProfileData({ ...response.data.data });

      setPoints({
        ...points,
        ["point"]: response.data.data.points
      })

      setData(response.data.data)
      getMediaData(media);
    } catch (error) {
      console.log(error)
    }
  }

  const getUserIDLocalstorage = () => {
    let data: any = getItemLocalStorage('authData')

    // console.log(data?.id)
    // data?.id && console.log(data?.id)
    return data?.id
  }

  const getloyaltyData = async () => {
    let res: any = await getLoyaltyById(getId)

    setTier({
      ["tier"]: res?.data?.data,
      ["minpoints1"]: res?.data?.data[0]?.min_points,
      ["minpoints2"]: res?.data?.data[1]?.min_points,
      ["minpoints3"]: res?.data?.data[2]?.min_points,
      ["name1"]: res?.data?.data[0]?.name,
      ["name2"]: res?.data?.data[1]?.name,
      ["name3"]: res?.data?.data[2]?.name,
      ["image1"]: res?.data?.data[0]?.image,
      ["image2"]: res?.data?.data[1]?.image,
      ["image3"]: res?.data?.data[2]?.image

    })

  }
   // condition for tab 1 class as per requirement
   const tabOne = () => {
    // return "MuiTab-root-btnone"
    if(tier?.tier?.length === 0){

      setClassValue("MuiTab-root-btnone")
    }
  }
  // condition for tab 1 class as per requirement
  useEffect(() => {
    // tabOne()
    getId && getUserDataByID();
    getId && getloyaltyData()
  }, [getId])


  const getInvestors = async () => {
    let res: any = await offer.getInvestor()
    let investerdata: any = res?.data?.data
    //let subscribedata:any = res?.data?.data?.passions
    //console.log("getInvestor data", data)
    setInvesterdata({
      investerdata: investerdata,
      invest_tier1: investerdata[0],
      invest_tier2: investerdata[1]
    })
  }
  const getInvestorsById = async () => {
    let res: any = await offer.getInvestorById(getId)
    let investerdata: any = res?.data?.data?.investment_tiers
    if (investerData) {

      setInvesterdata({
        investerdata: investerdata,
        invest_tier1: investerdata[0] && investerdata[0],
        invest_tier2: investerdata[1] && investerdata[1]
      })
    }

  }
  useEffect(() => {
    getId ? getInvestorsById() : getInvestors()
    if (getId)tabOne();
  }, [])
  function exitFullscreen() {
    if (!exitFullscreen) {

    } else {

    }
  }


  const openModel = (props: any) => {
    setInvestor(props)
    setInvestModal(!isInvestModal)
  }

  const openCarousel = (imgItem: any, itemID: any) => {
    const selectedOffer: any = userProfileData?.event_offer_creator?.filter((x: any) => x.id === itemID);
    setGalleryImageArray(selectedOffer[0]?.event_offer_images)
    setGalleryImage(imgItem)
    setIsOpenCarousel(true)
  }

 
  return (

    <div className="mobilemaincontainer">
      <BottomPopup
        isToggleSidebar={isToggleSidebar}
        id={getId}
        setIsToggleSidebar={setIsToggleSidebar}
      />
      <SubscribePopup
        isSubscribeModal={isSubscribeModal}
        setPoints={setPoints}
        points={points}
        setData={setData}
        getMediaData={getMediaData}
        setSubscribeModal={setSubscribeModal}
        data={data}
        id={getId}
        setUserProfileData={setUserProfileData}
      />
      <UnSubscribePopup
        unSubscribe={unSubscribe}
        setUnSubscribe={setUnSubscribe}
      />
      <InvestPopup
        isInvestModal={isInvestModal}
        setInvestModal={setInvestModal}
        data={data}
        investor={investor}
      />
      <Popup
        isPopup={popup}
        setIsPopup={setPopup}
        isReport={isReport}
        setIsReport={setIsReport}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={carouselPhotos.map((x: any) => ({
                ...x,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>

      <PhotoGallery
        isOpenCarousel={isOpenCarousel}
        setIsOpenCarousel={setIsOpenCarousel}
        image={galleryImage}
        imageArray={galleryImageArray}
      />

      <div>
        {/* for uploading cropper image */}
        {/*
          <UploadImage
              show={show}
              isToggleUploadPic={isToggleUploadPic}
              getCroppedImage={getCroppedImage}
              progress={progress}
              uploadingFile={uploadingFile}
              setUploadingFile={setUploadingFile}
          />
      */}
      </div>

      <div className="mobile_container profilemainuser">
        <div className="profileheader_container user_image_profile1">
          <img src={userProfileData?.cover_image ? userProfileData?.cover_image : images.userbg} className="profile-user-img" alt="user" />
          <div className="profileimgmaincontainer">
            <p className="imagesshow">
              {/* <FavoriteBorderOutlinedIcon className="icon_color" /> */}
              <ForumOutlinedIcon className="icon_color" />
              <LaunchOutlinedIcon className="icon_color" />
              <MoreVertOutlinedIcon className="icon_color" onClick={() => setPopup(true)} />
            </p>
          </div>
        </div>
        <div className="sabrinamainscroll sbrinamargin_container">
          <div className="reviewlivechat">
            <Row>
              <Col md={8} xs={8} className="sabrinabrandcontainer text-left">
                <span onClick={isToggleUploadPic}>
                  <img
                    src={userProfileData?.profile_image ?
                      userProfileData?.profile_image : images.mobheader1}
                    className="sbrinaprofilereview" alt="profile" />
                </span>

                <p className="sbrinatext">{userProfileData?.first_name}</p>
                <p className="number_fans">
                  <span><span className="numberfansspan">{userProfileData?.total_subscribers}</span>subscriber</span>
                </p>
              </Col>

              {(!getId || getUserIDLocalstorage() === getId) && <Button variant="primary" className="mb-3 btn_primary_profile" onClick={() => { history.push("/edit-user-profile/") }}>
                edit profile
              </Button>}
              {/* <Col md={4} xs={4} className="review_container mt-5" onClick={Review}>
                <p>87 reviews</p>
                <span>4.5</span>
                <p>
                  <img src={images.Star4} alt="" />
                  <img src={images.Star4} alt="" />
                  <img src={images.Star4} alt="" />
                  <img src={images.Star4} alt="" />
                  <img src={images.Star4} alt="" />
                </p>
              </Col> */}
            </Row>


            <Row>

              <PassionContext.Provider
                value={{ isActive: showPassions, enableActive: handleShowPassions }}>
                <p className="bio-text-pro pb-1">
                  <ReadMore>
                    {userProfileData?.company_bio ? userProfileData.company_bio : ''}
                  </ReadMore>
                </p>
              </PassionContext.Provider>

              <div
                // className="profile_para" 
                className="ml-1  mr-1"
                style={showPassions ? { display: "block" } : { display: "none" }}
              >
                <br />
                {/* {userProfileData?.passions && userProfileData?.passions.map((item: any, i: any) => {
                  return (
                    <Chip
                      key={i}
                      className="ml-3 mb-2 pl-1 pr-1"
                      label={item.title}
                      variant="outlined"
                    />
                  )
                })} */}
              </div>
            </Row>
          </div>

          <hr className="divider-line-profile" />

          <div className="userprofilemainyogaavailable mob_scroll">
            <div className="media_section mb-1">
              <h5 className="page_head mb-3">Media</h5>
              <div className="media_gallery">
                <SingleLineImageList img={userPhotos} openLightbox={openLightbox} exitFullscreen={exitFullscreen} />
              </div>
            </div>


            {getId && <div className="three_tabs_member pb-3">
            <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="off"
                  aria-label="scrollable prevent tabs example"
                >
                  <Tab icon={<StarsRoundedIcon />} aria-label="star" {...a11yProps(0)}
                    className={`${tier?.tier?.length === 0 && "d-none" ||investerData?.investerdata?.length === 0 && tier?.tier?.length != 0 && "MuiTab-root-btntwo"}`}
                  />
                  {/* className={`${!data.invest_tier1 || !data.invest_tier2 ? "d-none" : ""}`} */}
                  <Tab className={`${tier?.tier?.length === 0 && investerData?.investerdata?.length === 0 && "MuiTab-root-btnone" ||
                   tier?.tier?.length != 0 && investerData?.investerdata?.length === 0 &&"MuiTab-root-btntwo" 
                   ||tier?.tier?.length === 0 && investerData?.investerdata?.length != 0 && "MuiTab-root-btntwo"  
                    // tier?.tier?.length != 0 ? investerData?.investerdata?.length === 0 : "" tier?.tier?.length != 0 && investerData?.investerdata?.length != 0 && "" 
                }`} icon={<SentimentVerySatisfiedOutlinedIcon />}  aria-label="notification" {...a11yProps(1)}
                  />
                  {investerData?.investerdata?.length != 0 &&
                   <Tab className={`${investerData?.investerdata?.length != 0 && tier?.tier?.length === 0 && "MuiTab-root-btntwo"}`} icon={value === 2 ?  <AssessmentRoundedIcon /> : <AssessmentOutlinedIcon />} aria-label="price" {...a11yProps(2)} />
                   } 
                </Tabs>
              </AppBar>

              {tier?.tier?.length != 0 && 
              <TabPanel value={value} index={0}>
              <div className="text-center member_tab pt-3">
                <h4>
                  {Number(points?.point) < Number(tier?.minpoints1) && tier?.name1 ||
                    Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) < Number(tier?.minpoints2) && tier?.name2 ||
                    Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) > Number(tier?.minpoints2) && tier?.name3
                  }
                </h4>
                <p className="first_para mb-5">
                  {Number(points?.point) < Number(tier?.minpoints1) && tier?.name1 && moment(tier?.tier && tier?.tier[0]?.created_at).add(1, 'months').format('DD MMMM YYYY')}
                  valid until june 2022
                </p>
                <div className="progress_bar_member text-center mt-4 mb-5">
                  <img src={Number(points?.point) < Number(tier?.minpoints1) && tier?.image1 ||
                    Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) < Number(tier?.minpoints2) && tier?.image2 ||
                    Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) > Number(tier?.minpoints2) && tier?.image3
                  } />
                  <MemberCircularProgress progress={
                    // Math.round(Number(points?.point * 100/tier?.minpoints1))
                    tier?.minpoints1 && !tier?.minpoints2 && !tier?.minpoints3 && Number(points?.point) * 100 / Number(tier?.minpoints1) ||
                    tier?.minpoints1 && tier?.minpoints2 && !tier?.minpoints3 && Number(points?.point) * 100 / Number(tier?.minpoints2) ||
                    tier?.minpoints1 && tier?.minpoints2 && tier?.minpoints3 && Number(points?.point) * 100 / Number(tier?.minpoints3)

                  } />
                  <div className="progress_point">
                    {tier?.minpoints3 && <span></span>}

                    {tier?.minpoints3 && <span ></span>}
                    {tier?.minpoints2 && <span ></span>}
                    <span></span>
                    <p>
                      <span></span>
                    </p>
                  </div>
                </div>

                <p className="points_para">
                  <span className="pr-2">
                    {points?.point} {(points?.point || points?.point === 0) && "points"}
                  </span>
                  {getId && <div>
                    {points?.minpoints1}
                    {Number(points?.point) < Number(tier?.minpoints1) && Number(tier?.minpoints1) - Number(points?.point)}
                    {Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) < Number(tier?.minpoints2) && Number(tier?.minpoints2) - Number(points?.point)}
                    {" "} more to  {Number(points?.point) < Number(tier?.minpoints1) && tier?.name1
                    }
                    {Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) < Number(tier?.minpoints2) && tier?.name2}
                    {Number(points?.point) > Number(tier?.minpoints1) && Number(points?.point) > Number(tier?.minpoints1) && tier?.name3}
                  </div>}
                </p>

                <Button variant="outline-primary" className="benefit-btn mb-5" onClick={() => setIsToggleSidebar(!isToggleSidebar)}>
                  <img src={Gift} className="mr-1" alt="Image" />  tier benefits
                </Button>
              </div>
            </TabPanel>
            }
            {/* subscribe now */}
            <TabPanel value={value} index={1}>
              <p className="subscribe-now-read-more">
                <ReadMore>
                  {data?.subscript_description ? data?.subscript_dsescription : ''}
                </ReadMore>
              </p>
              <br />
              <Button variant="primary" className={`subscribe-now-btn ${data?.me_subscribed && "subscribed"}`} onClick={() => data?.me_subscribed ? setUnSubscribe(!unSubscribe) : setSubscribeModal(!isSubscribeModal)} >
                {data?.me_subscribed ? "Subscribed" : `Subscribe now for ${data.subscript_cost}/M`}
              </Button>
            </TabPanel>
            {/* subscribe now */}

            {/* Invest me */}
            {investerData?.investerdata?.length != 0 && <TabPanel value={value} index={2}>
              <div className="invest_content mt-4">


                <div className="yoga_para m-0">
                  <ReadMore>
                    {userProfileData?.invest_description ?
                      userProfileData.invest_description :
                      ''
                    }
                  </ReadMore>
                </div>

                <div className="mt-2 btn_amount">
                  <Button variant="outline-primary" onClick={() => openModel(investerData.invest_tier1)}>${investerData.invest_tier1?.invest_amount_tier}</Button>
                  <Button variant="outline-secondary" onClick={() => openModel(investerData.invest_tier2)}>${investerData.invest_tier2?.invest_amount_tier}</Button>
                </div>

                {/* <Button variant="primary" className="mt-3 mb-3 btn_primary_common" onClick={() => setInvestModal(!isInvestModal)}>invest me for $100</Button>

                  <span className="info_line mb-3">
                    in $100 you will get lorem ipsum dollar text
                  </span> */}

              </div>
            </TabPanel>}
            {/* Invest me */}
          </div>}



          {
            userProfileData?.event_offer_creator &&
            userProfileData?.event_offer_creator.map((item: any, i: number) => (
              <OfferDetail item={item} index={i} openCarousel={openCarousel} />
            ))
          }



        </div>
      </div>
      {!isToggleSidebar && <TabIcon />}
    </div>
    </div >
  )
}