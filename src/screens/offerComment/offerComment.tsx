import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import selectimg from "../../assets/images/mobileimages/selectimg.svg";
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import * as images from '../images'
import Sliders from '../../components/Slider/Slider';
import "./offerComment.scss";
import "../../components/offerDetail/offerDetail.scss"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shareUrl } from '../../components/Share/share';
import Stock from "../../assets/images/sign1/stocks.png";
import Heart from "../../assets/images/mobileimages/heartblack.svg";
import Lock from "../../assets/images/mobileimages/nonlock.png";
import Follow from "../../assets/images/mobileimages/follow.png";
import Comment from "../../assets/images/mobileimages/bubble-chat.png";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Send from "../../assets/images/mobileimages/send.png";

import { Header } from '../../components/header/header'
import { addComments, addFollowUp, getComments, getFollowUp, getOfferListSingle } from '../../services/offer.service';
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import crossnew from "../../assets/images/mobileimages/cross.svg";
import Chip from "@material-ui/core/Chip";
import "./offerComment.scss";
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';
import Compressor from 'compressorjs';
import FollowUp from './followUp';
import Comments from './Comments';
import { error } from '../../services/AlertService';
import { Spinner } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


interface IProps {
  item: any;
  index?: number;
  stepperCase?: number;
  isPreview?: boolean;
  setActiveStep?: any;
  pageBack?: any;
  // params?: number;
  sliderImages?: any;
  base64ImagesURI?: any;
  actualAPIFiles?: any;
  pageData?: any;

}
export const OfferComment: React.FC<IProps> = ({ item, index, pageData, actualAPIFiles, base64ImagesURI, stepperCase, isPreview, setActiveStep, sliderImages, pageBack }: IProps) => {
  const history = useHistory();
  const [followUpData, setFollowUpData] = useState<any>([])
  const [followUp, setFollowUp] = useState<any>("")
  const [offerDetail, setOfferDetail] = useState<any>({});
  let [apiImages, setApiImages] = useState<any>([]);
  let [uriImages, setURIImages] = useState<any>([]);
  let [commentLoading, setCommentLoading] = useState<Boolean>(false);
  let [loadingFollowup, setLoadingFollowup] = useState<Boolean>(false);
  const [comment, setComment] = useState<String>("")
  const [getComment, setGetComment] = useState<any>([])
  const [refComments, setRefComments] = useState<any>([])

  const [commentLabel, setCommentLabel] = useState<any>("leave your comment")
  let [count, setCount] = useState<any>({
    Comment,
    followUP: 0
  })
  const [followUpImages, setFollowUpImages] = useState<any>({})
  const params: any = useParams();
  // get User Data function
  let userData:any = localStorage.getItem("authData")
  const getUserData:any = JSON.parse(userData)
  // get User Data function end


  // get followUp data
  const getFollowUpData = async () => {
    try {
      let res: any = await getFollowUp(params.offer_Id)
      count = {
        ...count,
        ["followUP"]: res.data.data.followup_count
      }
      setCount(count)
      setFollowUpData(res?.data?.data?.followups)
    } catch (error: any) {
      console.log(error)
    }
  }
  // get followUp data End

  // get comments data
  const getCommentsData = async () => {
    try {
      const comment: any = await getComments(params.offer_Id)
      count = {
        ...count,
        ["Comment"]: comment.data.data.comment_count
      }
      setCount(count)
      setGetComment(comment.data.data.comments)
    } catch (error) {

    }
  }
  // get comments data


  const getOfferDetail = async () => {
    try {
      const response: any = await getOfferListSingle(params.offer_Id)
      //console.log('offer response',response);
      if (response.status === 200) {
        setOfferDetail(response?.data?.data)
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOfferDetail();
    getFollowUpData();
    getCommentsData();
  }, [])


  const setLike = (item: any) => {
      setOfferDetail(item);
  }

  useEffect(() => {
    window.scrollTo(0, 1)
    if (pageBack) {
      if (base64ImagesURI)
        setURIImages(base64ImagesURI)
      if (actualAPIFiles)
        setApiImages(actualAPIFiles)
      if (pageData) {
        //  if (pageData && pageData.expires_at) {
        // setSelectedDate(pageData['expires_at']);
        // }
        //  if (pageData && pageData.general_tag.length > 0) {
        //   setIdeasTags(pageData.general_tag);
        // }
        //  setFormData(pageData);
      }
    }
    // createOfferStoreData && manageData()
    // createOfferStoreImages && manageImage()
  }, [pageBack])

  // useEffect(() => {
  //   uriImages.length > 0 && dispatch({ type: CREATE_OFFER_IMAGES, payload: uriImages })
  //   apiImages.length > 0 && dispatch({ type: CREATE_OFFER_APIIMAGES, payload: apiImages })
  // }, [uriImages, apiImages])


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Upload file handleclick
  const hiddenFileInput = React.useRef<any>(null);
  const fileUpload = () => {
    hiddenFileInput.current.click();
  }

  const handleFileChange = async (e: any) => {

    const file = e.target.files;
    if (!file) {
      return;
    }
    // for image compress
    const arrayFile: any = Array.from(file)
    // for object images
    await arrayFile?.map((file: any, i: number) => {
      return new Promise(() => {
        new Compressor(file, {
          quality: 0.2,
          success: (compressedResult) => {
            const blobToFile = new File([compressedResult], file.name, { type: file.type });
            setApiImages((prevapiImages: any) => prevapiImages.concat(blobToFile));


            /*covert to base64*/
            const reader = new FileReader()
            reader.readAsDataURL(compressedResult)
            reader.onload = function (e: any) {
              let results = e.target.result;
              setURIImages((images:any) => images.concat(results))
            };
            /*covert to base64*/
          },
        });
      });
    });
  }

  const deleteImage = (i: any) => {
    uriImages.splice(i, 1);
    setURIImages([...uriImages])
    apiImages.splice(i, 1);
    setApiImages([...apiImages])
  }

  let photo: any = uriImages.map((image: any, i: number) => {
    return (
      <>
        <li className='media-images' key={i}>
          <img src={image} className="media1" alt="" />
          <div className="cross_imge">
            <img src={crossnew} onClick={() => deleteImage(i)} alt="" />
          </div>
        </li>
      </>
    )
  })
  const subFollowData = async (e: any) => {
    try {
      if (!followUp) return;
      setLoadingFollowup(true)
      let formData = new FormData()
      formData.append("offer_followup", params.offer_Id)
      formData.append("follow_up", followUp)
      formData.append("creator", getUserData?.id)

      for (let i = 0; i < apiImages.length; i++) {
        formData.append('followup_images', apiImages[i]);
      }
      // formData.append("followup_images",apiImages)

      const res: any = await addFollowUp(formData)

      if (res) {
        if (res.status === 201) {
          setFollowUp("")
          setApiImages("")
          setURIImages([])
          followUpData.push(res?.data?.data)
          setFollowUpData(followUpData)

        }
        if (res.response.status === 400) {
          error(res?.response?.data?.message)
        }
      }
      setLoadingFollowup(false)
    } catch (error) {
      setLoadingFollowup(false)
      console.log(error)
    }
  }
  // add Comments function
  const AddComment = async () => {
    try {
      if (!comment) return;
      if (commentLabel?.offerId) {

        const payload = {
          comment_offer: params.offer_Id,
          // user: getUserData?.id,
          comment: comment,
          ref_comment: commentLabel?.offerId

        }
        const res = await addComments(payload)
        if (res.status === 201) {
          getComment.map((res: any) => {
            if (commentLabel?.offerId === res?.id) {
              res.replies_count = res.replies_count + 1
            }
            return res
          })
          let isReply = false
          refComments.map((res: any) => {
            if (res.ref_comment === commentLabel?.offerId) {
              return isReply = true
            }
            return isReply = false

          })
          if(isReply){
            refComments.push(res.data.data)
            setRefComments(refComments)
            
          }
          setGetComment(getComment)
          setComment("")
          setCommentLabel("")
        }
        return;
      }

      setCommentLoading(true)
      const payload = {
        comment_offer: params.offer_Id,
        // user: getUserData?.id,
        comment: comment,
        // ref_comments:""
      }
      const res = await addComments(payload)
      if (res.status === 201) {
        setComment("")
        getComment.push(res?.data?.data)
        setGetComment(getComment)
      }
      setCommentLoading(false)
    } catch (error) {
      setCommentLoading(false)
    }
  }

  // add Comments function End
  // get Reffrence comment 

  return (
    <div className="mobilemaincontainer content">
      <div className="mobile_container dash_tabs">
        <div className="sabrinamainscroll create_page">
          <Header back={true} enableback={() => history.goBack()} />

          <div className="new_dash1" key={index}>
            <OfferDetail 
              item={offerDetail} 
              setLike={setLike} 
              isLockIcon={false} 
              getOfferDetail={getOfferDetail} 
              count={count}
              setValue={setValue}
            />

            {
              // !stepperCase &&
              // <div className="sbrina_container p-2 mt-0 pt-0">
              //   <div className="sbrinamain_container">
              //     <div className="yoga_trainer">
              //       <LazyLoadImage effect="blur" src={item?.profile_image ? item?.profile_image : images.mobheader1} className="sbrinaprofileimg" />
              //       <div className="sbrinacontainer">
              //         <p className="sbrinatext_name">{item?.first_name}
              //           {/* <img src={images.sbrinastart} className="bigimgshow pl-2" /> */}
              //         </p>
              //         <span className="sbrina_subscribe">
              //           subscribers
              //         </span>
              //         {/* <p className="yogatext">{item?.username}</p> */}
              //       </div>
              //     </div>
              //     <p className="bigimgshowcontainer">
              // {!stepperCase && <CollectionsBookmarkOutlinedIcon className="mr-3" />}
              // {/* {heartIcon ? <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={() => setLike()}   className=" animate__animated animate__heartBeat mr-3" /> : <FavoriteBorderOutlinedIcon className="mr-3" onClick={() => setLike()} />} */}
              // {/* <FavoriteBorderOutlinedIcon className="mr-2" /> */}
              //       <LaunchOutlinedIcon onClick={() => shareUrl(`preview/${item.id}`)} />
              //     </p>
              //   </div>
              // </div>
            }
            {/* <Sliders image={item?.event_offer_images} item={item} /> */}

            {/* <div className="img_bg">
              <Sliders image={sliderImages ? sliderImages : item?.event_offer_images} /> */}
            {
              // stepperCase &&
              // <LaunchOutlinedIcon className="list_share"
              //   style={{ color: '#fff' }}
              //   onClick={() => shareUrl(`preview/${item?.id}`)}
              // />
            }
            {/* </div> */}

            <div className="detail_dash">
              <div className="first_section">
                {/* <Row>
                  <Col md={6} xs={6}>
                    <span className="deatil_tag">
                      long
                    </span>
                  </Col>

                  <Col md={6} xs={6}>
                    <p className="days_count">
                      2 days ago
                    </p>
                  </Col>
                </Row>

                <p className="description_para">
                  Nifty post record closing highs yet again closing highs yet again
                  <span>
                    ... see more
                  </span>
                </p>

                <div className="btn_div_dash">
                  <Row>
                    <Col md={6} xs={6}>
                      <span className="detail_type_btn">
                        $goog
                      </span>

                      <span className="detail_type_btn ml-2">
                        $aapl
                      </span>
                    </Col>

                    <Col md={6} xs={6} className="text-right">
                      <span className="stock_btn">
                        <img src={Stock} className="mr-2" alt="Image" /> stocks
                      </span>
                    </Col>
                  </Row>
                </div>

                <div className="like_commment_section">
                  <Row>
                    <Col md={8} xs={8}>
                      <span className="like_commment_btn">
                        <img src={Heart} className="" alt="Image" /> 110
                      </span>


                    </Col>

                    <Col md={4} xs={4} className="text-right">
                      <span className="lock_btn mt-1 d-block mr-1">
                        <img src={Lock} className="" alt="Image" />
                      </span>
                    </Col>
                  </Row>
                </div> */}


                {/* <div className="para_big_bottom">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus, elit bibendum pellentesque commodo magna sapien elementum tortor. Condimentum aliquam vitae nulla ut cras. Commodo iaculis sem nisi diam non eu. Et auctor nisi, gravida ac, ultrices.
                    <span>
                      ... see more
                    </span>
                  </p>
                </div> */}

                <div className="comment_follow_div count_follow">
                  <div className={classes.root}>
                    {/* <AppBar position="static">
                      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab icon={<img src={Follow} className="mr-1" alt="img" />} label={`${count?.followUP} Follow-Ups`} className='text-left' {...a11yProps(0)} />
                        </Tabs>/10 Follow-Ups </Tab>
                        <Tab label={` ${count?.Comment} Comments`} icon={<img src={Comment} className="mr-1 ml-1" alt="Image" />} className='text-right second_tab' {...a11yProps(1)} />

                      </Tabs>
                    </AppBar> */}
                    <TabPanel value={value} index={0}>
                      <div className="tab_data_section">
                        {/* follow up data  */}
                        {/* <h3>Follow Ups</h3> */}
                        <FollowUp data={followUpData} />
                        {/* follow up data end  */}
                        <div className="mt-4 form_div_follow">
                          <input type="file"
                            multiple
                            ref={hiddenFileInput}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                          />

                          {offerDetail?.user_id === getUserData?.id && <div className="media_textarea">
                            <form className={classes.root} noValidate autoComplete="off">
                              <Input
                                multiline
                                placeholder="Add a follow-up" inputProps={{ 'aria-label': 'description' }}
                                rows={3}
                                value={followUp}
                                onChange={(e) => setFollowUp(e.target.value)}
                                startAdornment={
                                  uriImages.length > 0 &&
                                  <div className="media-gallery-create-offer media_gallery">
                                    <ul className="pl-0 available-items">
                                      {photo}
                                    </ul>
                                  </div>
                                }
                              />
                              <div className="send_btn">
                                <PhotoSizeSelectActualOutlinedIcon onClick={fileUpload} />

                                {loadingFollowup ? <Spinner animation="grow" variant="info" size="sm" />
                                  : <img src={Send} alt="Image" onClick={subFollowData} />}
                              </div>
                            </form>
                          </div>}
                        </div>

                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <div className="tab_comment_div">
                        {/* <h3 className="mb-3">Comments</h3> */}

                        {/* Comments data */}

                        <Comments data={getComment} setRefComments={setRefComments} refComments={refComments} label={setCommentLabel} offerId={params.offer_Id} />
                        {/* Comments data end */}

                        <div className="mt-4 form_div_follow">
                          <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                            multiline
                            placeholder={commentLabel?.label ? ` reply to ${commentLabel?.label}` : "Leave your comment"}
                              id="standard-basic" label={commentLabel?.label} fullWidth variant="standard"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              inputProps={{ 'aria-label': 'description' }} />

                            <div className="send_btn">
                              {commentLoading ? <Spinner animation="grow" role="status" size="sm" variant="info" /> : <img src={Send} alt="comment Icon" onClick={AddComment} />}
                            </div>
                          </form>
                        </div>
                      </div>
                    </TabPanel>

                  </div>

                  {/* <Row>
                    <Col md={6} xs={6}>
                      <div className="count_follow">
                        <img src={Follow} className="mr-1" alt="Image" /> 10 Follow-Ups
                      </div>
                    </Col>

                    <Col md={6} xs={6}>
                      <div className="count_follow text-right">
                      1.2K Comments  <img src={Comment} className="ml-1" alt="Image" />
                      </div>
                    </Col>
                    </Row> */
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}