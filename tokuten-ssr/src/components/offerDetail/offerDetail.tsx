import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from '@material-ui/core/Box';
import InsertInvitationOutlinedIcon from '@material-ui/icons/InsertInvitationOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import * as images from '../../screens/images'
import Sliders from '../Slider/Slider';
import "./offerDetail.scss";
import moment from 'moment';
import { ReadMore } from '../../screens/readMore/readMore'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shareUrl } from '../Share/share';
import * as offer from "../../services/offer.service";
import BottomPopup from '../bottomPopup/bottomPopup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { ImageLists } from '../../components/ImageList/imageList';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { MetaDataCardDetails } from '../../components/metaCardDetails/metaCardDetails';
import { lowerCase } from 'lodash';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 500,
      height: 'auto',
    },
  }),
);

interface IProps {
  item: any;
  index?: number;
  stepperCase?: number;
  isPreview?: boolean;
  setActiveStep?: any;
  params?: number;
  sliderImages?: any;
  openCarousel?: any;
  setValue?:any;
}

export const OfferDetail = ({count, item, setLike, index, stepperCase, isPreview,
  setActiveStep, params, sliderImages, openCarousel, offerBio = false, isLockIcon = true, setValue }: any) => {

  const history = useHistory();
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState<boolean>();
  const [heartIcon, setHeartIcon] = useState<boolean>(false);
  const path: string = window?.location?.pathname
  const [isToggleSidebar, setIsToggleSidebar] = useState<boolean>(false);
  const [offerImages, setOfferImages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const todaysDate = new Date();
  const offerDate = new Date(moment(item?.starts_at).format('DD MMMM YYYY'));
  const daysCount = Math.round((todaysDate.getTime() - offerDate.getTime()) / (1000 * 60 * 60 * 24))
  const itemName = item?.secondary_tag?.name;

    if (itemName === "Buy" || itemName === "Gain") {
       item.background = "#67CA92"
    }
    if (itemName === "Sell" || itemName === "Loss" || itemName === "News") {
      item.background = "#FF8C8C"
    }
    if (itemName === "Yolo") {
      item.background = "#2F80ED"
    }
    if (itemName === "Analysis") {
      item.background = "#F69475"
    }
    if (itemName === "Learn") {
      item.background = "#F2C94C"
    }
    if (itemName === "Meme") {
      item.background = "#5D5FEF"
    }
    if (itemName === "Discuss") {
      item.background = "#D3B0EE"
    }
    if (itemName === "Chart") {
      item.background = "#3E4480"
    }
  
    const getdata:any = ()=>{}

  const setMedia = () => {
    let data: any = [];
    if (sliderImages) {
      sliderImages?.filter((imgItem: any, i: number) => {
        data.push({ file: imgItem, position: i })
      })
    } else {
      item?.event_offer_images?.filter((imgItem: any, i: number) => {
        data.push({ file: imgItem.file, position: i })
      })
    }
    setOfferImages(data)
  }

  useEffect(() => {
    (path === '/create-offer' || (stepperCase && stepperCase === 2))
      ? setShowButtons(false)
      : setShowButtons(true);

    setMedia();
    setHeartIcon(item?.is_liked)
    // setOfferImages(sliderImages ? sliderImages : item?.event_offer_images)
  }, [item, sliderImages, setLike])



  const bookNow = (item: any) => {
    stepperCase && stepperCase === 1 && setActiveStep(2)
    if (!item?.is_private && !item?.is_subscribed)
      history.push(`/preview/${item?.id}`)
  }

  const profile = (item: any) => {
    path === '/dashboard' && history.push(`user/${item.username}/${item?.user_id}`);
  }

  const redirectToBuy = () => {
    history.push(`/buy-now/${params}`);
  }

  //local storage userid

  var userData: any = localStorage.getItem("authData");
  var userId: any = JSON.parse(userData);
  const getUserId: any = userId?.id;


  const setLikeHandler = async () => {
    const payload = { likes: getUserId };
    try {
      if(loading){
        return;
      }
      setLoading(true)
      const response: any = await offer.likeOfferById(item?.id, payload);
      // waits until the request completes...
      var icon: any = response.data.data;
      setLike(response.data.data)
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      console.log("like Offer Error", err)
    }
  }

  // console.log("render offer list", item)

  const setCols = (i: number) => {
    if (offerImages.length > 1) {
      if (offerImages.length % 2 && (i) === offerImages.length) return 2;
      else return 1;
    }
    else return 2;
  }
  // useEffect(() => {

  // }, [item]);


  return (
    <>
      <BottomPopup
        isToggleSidebar={isToggleSidebar}
        setIsToggleSidebar={setIsToggleSidebar}
        showInnerContent={"offerUnlock"}
        offerId={item?.id}
      />

      <div className="yogatrainercontainer new_dash1" key={index}>
        {
          !stepperCase &&
          <div className="sbrina_container mt-0">
            <div className="sbrinamain_container">
              <div className="yoga_trainer">
                <LazyLoadImage effect="blur" onClick={() => profile(item)}
                  src={item?.profile_image ? item?.profile_image : images.mobheader1} className="sbrinaprofileimg"
                />
                <div className="sbrinacontainer">
                  <p className="sbrinatext_name">{item?.username}
                    {/* <img src={images.sbrinastart} className="bigimgshow pl-2" /> */}
                  </p>
                  {
                    item?.audience &&
                    <span className="sbrina_subscribe">{item?.audience?.name}</span>
                  }
                  {/* <p className="yogatext">{item?.username}</p> */}
                </div>
              </div>
              <p className="bigimgshowcontainer">
                {!stepperCase && <CollectionsBookmarkOutlinedIcon className="mr-3"
                // onClick={() => imageBookmarkClick()} 
                />}
                {/* {heartIcon ? <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={() => setLike()}   className=" animate__animated animate__heartBeat mr-3" /> : <FavoriteBorderOutlinedIcon className="mr-3" onClick={() => setLike()} />} */}
                {/* <FavoriteBorderOutlinedIcon className="mr-2" /> */}
                <LaunchOutlinedIcon onClick={() => shareUrl(`offer/comment/${item.id}`)} />
              </p>
            </div>
            {/* <p className="bigimgshowcontainer">
              {!stepperCase && <CollectionsBookmarkOutlinedIcon className="mr-3" />}
              {heartIcon ? <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={() => setLike()} className=" animate__animated animate__heartBeat mr-3" /> : <FavoriteBorderOutlinedIcon className="mr-3" onClick={() => setLike()} />}
              <LaunchOutlinedIcon onClick={() => shareUrl(`preview/${item.id}`)} />
            </p> */}
          </div>
        }
        {/* <Sliders image={item?.event_offer_images} item={item} /> */}

        <div className="img_bg">
          {/* <Sliders image={sliderImages ? sliderImages : item?.event_offer_images} /> */}
          <div className={classes.root}>
            {/* <ImageList
              // rowHeight={160}
              className={classes.imageList}
            >

              {
                // itemData
                offerImages?.map((ImageItem: any, i: number) => {
                  if (i < 4) {
                    return (
                      <ImageListItem
                        key={i}
                        cols={setCols(i + 1)}>
                        <img
                          src={ImageItem?.file || ImageItem}
                          alt={ImageItem?.title || i}
                          onClick={() => openCarousel && openCarousel(ImageItem, item.id)}
                        />
                        {
                          offerImages.length > 4 && i === 3 &&
                          // itemData.length > 4 && i === 3 &&
                          <ImageListItemBar
                            // title={`+ ${itemData.length - 4}`}
                            title={`+ ${offerImages.length - 4}`}
                          />
                        }
                      </ImageListItem>
                    )
                  }
                })}

            </ImageList> */}
            {item?.event_offer_images?.length > 0 && <ImageLists item={item} openCarousel={openCarousel} />}
            {item.meta_description && <MetaDataCardDetails
              image={item?.meta_image} 
              title={item?.meta_title}
              description={item?.meta_description}
              url={item?.meta_url} />
            }
          </div>
          {
            stepperCase &&
            <LaunchOutlinedIcon className="list_share"
              style={{ color: '#fff' }}
              onClick={() => shareUrl(`preview/${item?.id}`)}
            />
          }
        </div>

        <div className="detail_dash">
          <div className="first_section">
            <Row className="secondry-tags-offer">
              <Col md={6} xs={6}>
                {
                  item?.secondary_tag &&
                  <span className="deatil_tag" style={{ background: item.background }}>
                    {item?.secondary_tag?.name}
                  </span>
                }
              </Col>
              {
                !stepperCase && <Col md={6} xs={6}>
                  <p className="days_count">
                    {
                      daysCount > 2
                        ? `${daysCount} days ago`
                        : (daysCount === 1 ? 'Today' : 'YesterDay')
                    }
                  </p>
                </Col>
              }
            </Row>

            <p className="yoga_para event_para text">
              <ReadMore>{item?.offer_title}</ReadMore>
            </p>
            {
              (item?.general_tag?.length > 0 || item?.primary_tag) &&
              <div className="btn_div_dash">
                <Row>
                  <Col md={6} xs={6}>
                    {
                      item?.general_tag?.map((tag: any) => {
                        return (
                          <span className="detail_type_btn">{tag?.name || tag}</span>
                        )
                      })
                    }
                  </Col>

                  <Col md={6} xs={6} className="text-right">
                    {
                      item?.primary_tag &&
                      <span className="stock_btn">
                        <img src={item?.primary_tag?.icon} className="primary-img mr-2" alt="img" />{item?.primary_tag?.name}
                      </span>
                    }
                  </Col>
                </Row>
              </div>
              
            }
            </div>

            {
              !stepperCase &&
              <div className="like_commment_section">
                <Row>
                  <Col md={3} xs={3} className="text-center">
                    <span className="like_commment_btn">
                      {item.is_liked ? 
                        <FavoriteOutlinedIcon style={{ color: 'red' }}
                          onClick={() => setLikeHandler()} className="animate__animated animate__heartBeat mr-1" /> :
                        <FavoriteBorderOutlinedIcon className="mr-1" onClick={() => setLikeHandler()} />
                      }
                      {item?.likes_count > 0 ? item?.likes_count : ""}
                    </span>
                  </Col>

                  <Col md={3} xs={3}>
                    <span className="like_commment_btn" onClick={()=>setValue(0)} >  
                      <HistoryOutlinedIcon className="mr-1 clock_icon1"/>
                      {item?.followup_count}
                    </span>
                  </Col>

                  <Col md={3} xs={3} onClick={getdata}>
                    <span className="like_commment_btn" onClick={()=>setValue(1)}>
                      <SmsOutlinedIcon className="mr-1" />
                      {item?.comment_count}
                    </span>
                  </Col>

                  <Col md={3} xs={3} className="text-center">
                    <span className="like_commment_btn">
                      {lowerCase(item?.audience?.name) === 'all' ?
                        <LockOpenOutlinedIcon onClick={() =>  history.push(`/offer/comment/${item.id}`) } /> :
                        <LockOutlinedIcon onClick={() => setIsToggleSidebar(true)} />
                      }
                    </span>
                  </Col>

                  {/* {
                    isLockIcon && 
                    <Col md={4} xs={4} className="text-center">
                      <span className="lock_btn d-block like_commment_btn">
                        { lowerCase(item?.audience?.name) === 'all' ? 
                          <LockOpenOutlinedIcon onClick={ () => setIsToggleSidebar(true) } /> :
                          <LockOutlinedIcon onClick={ () => setIsToggleSidebar(true) } /> 
                        }
                      </span>
                    </Col>
                  } */}
                </Row>
              </div>
            }
          
        </div>

        {
          (item?.offer_bio && offerBio) &&
          <div style={{ borderTop: '1px solid #E6E5EB' }}>
            <p className={`yoga_para mb-0 ${stepperCase === 2 && "event_para"}`}>
              {path.includes('offer/comment') && <ReadMore>{item?.offer_bio && item?.offer_bio}</ReadMore>}
            </p>
          </div>
        }

        {/* {
        (stepperCase && stepperCase === 2) &&
        <div className="list_event mob_scroll">
          <div className="pl-3 pt-2 pr-2">
            <Row>
              <Col md={7} xs={7}>
                <h5 className="">
                  <img src={images.clock} className="pr-2" alt="Clock" />
                  14:00:00 left
                </h5>
              </Col>

              <Col md={5} xs={5}>
                <span className="text-right d-block">
                  1 remaining
                </span>
              </Col>
            </Row>
          </div>
        </div>
      }

      {
        showButtons &&
        <p className="booknowcontainer" onClick={() => bookNow(item)}>
          {
            stepperCase
              ? 'Buy Now'
              : (item?.is_private ? 'Unlock Now' : item?.is_subscribed ? 'Subscribers only' : 'Book Now')
          }
          <img src={images.bookarrow} className="bookarrowimg" alt="bookarrow" />
        </p>
      }

      <p className="booknowhkcontainer">
        <span>$HK <span className="hk-price">{item?.cost}</span>
          <span className="dolar_text">00</span></span>
        {
          !(stepperCase && stepperCase === 2) &&
          <span className="remainingtext">1 remaining</span>
        }
      </p>
      <p className="small_group">
        {item?.offer_title}
        {/* {
            !stepperCase &&
            <CollectionsBookmarkOutlinedIcon style={{ float: 'right' }} />
          } }
      </p>

      <p className={`yoga_para mb-0 ${stepperCase === 2 && "event_para"}`}>
        {!(stepperCase === 1) && <ReadMore>{item?.offer_bio && item?.offer_bio}</ReadMore>}
      </p>

      <div className="datecontainerbotfix">
        {item?.offer_location &&
          <p className="location-date-time">
            <LocationOnOutlinedIcon className="location-pin" />
            <Tooltip title={item?.offer_location} arrow placement="top-start">
              <Box
                textOverflow="ellipsis"
                overflow="hidden">
                {item?.offer_location}
              </Box>
            </Tooltip>
          </p>
        }
        <p className="location-date-time">
          {item?.expires_at &&
            <><InsertInvitationOutlinedIcon className="date-pic-icon" /> <span>{moment(item?.expires_at).format('Do MMMM, YYYY hh:mm A')}</span></>
          }
        </p>
      </div>
      {

        (stepperCase && stepperCase === 2) &&
        <div>

          <div className="event_notes">
            <h4>NOTES:</h4>
            <span>{item?.additional_notes}</span>
          </div>

          {

            isPreview &&
            <div className="list_buy mb-5">
              <Row>
                <Col md={12} xs={12}>
                  <h5 className="text-center" onClick={redirectToBuy}>
                    Buy now
                  </h5>
                </Col>
              </Row>
            </div>
          }
        </div>
      } */}
      </div>
    </>
  )
}


// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     position:1
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     position:2
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     position:3
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     position:4
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     position:5
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     position:6
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     position:7
//   },

// ];