/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import * as images from '../images'
import "./dashboard.scss";
import TabIcon from '../tabs/tabs';
import dashboardDataJSON from '../../json/dashboard.json';
import { getOfferData } from '../../redux/action/getOffersAction';
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import Logo from "../../assets/images/new_landing/header-logo.png";
import Search from "../../assets/images/mobileimages/search.svg";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PhotoGallery } from '../../components/gallery/photoGallery';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Carousel, { ModalGateway, Modal } from 'react-images';
import { fetchCreatedPost } from '../../services/offer.service';
import { filter, isEmpty, debounce } from 'lodash';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import TvIcon from '@material-ui/icons/Tv';
import TuneIcon from '@material-ui/icons/Tune';
import ideas from "../../assets/images/dashboard/ideas.png";
import portfolio from "../../assets/images/dashboard/portfolio.png";
import track_record from "../../assets/images/dashboard/track_record.png";
import rubiks from "../../assets/images/dashboard/rubiks.png";
import game from "../../assets/images/dashboard/game.png";


const top100Films: any[] = [];

interface IProps { }
export const Dashboard: React.FC<IProps> = () => {
  const history = useHistory();
  const [inputSearchText, setInputSearchText] = React.useState<any>();
  const [tabKey, setTabKey] = useState<string | any>('tab1');
  const dispatch = useDispatch()
  let [offerList, setOfferList] = useState<any>([]);
  let [offerListClone, setOfferListClone] = useState<any>([]);
  let [channle, setChannel] = useState(dashboardDataJSON);
  let [searchTextList, setSearchTextList] = useState([]);
  let [galleryImage, setGalleryImage] = useState<any>({});
  let [galleryImageArray, setGalleryImageArray] = useState<any>([]);
  let [isOpenCarousel, setIsOpenCarousel] = useState<boolean>(false);


  // const onSearchChange = (event: any) => {
  //   channle = dashboardDataJSON;
  //   const searchText = event.target.value;
  //   let data = channle.filter((item: any) =>
  //     item.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setChannel(data);
  // }


  const getOffers = async () => {
    try {
      const res: any = await dispatch(getOfferData());
      const offerData: any = res.payload.data.data.results;
      setOfferList(offerData);
      // setOfferListClone(offerData);
    } catch (err: any) {
      console.log("get Offer Error", err);
    }
  }

  // const OnscrollFunction = (e: any) => {
  //   if ((e.target.scrollTop > 0) && (Math.ceil(e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight)) {
  //     //getAllDetails(pageNo,initialPromocodeId);
  //     console.log("content api");
  //     getOffers();
  //   }
  // }

  const getOfferState = useSelector((state: any) => {
    return state?.getOfferReducer?.offerList?.data?.data?.results
  });

  useEffect(() => {
    window.scrollTo(0, 1);
    if (getOfferState) {
      setOfferList(getOfferState);
    } else {
      getOffers();
    }
  }, [getOfferState]);

  const openCarousel = (imgItem: any, itemID: any) => {
    const selectedOffer: any = offerList?.filter((x: any) => x.id === itemID);
    setGalleryImageArray(selectedOffer[0]?.event_offer_images)
    setGalleryImage(imgItem)
    setIsOpenCarousel(true)
  }

  const setLike = (item: any) => {
    let updatedValue = offerList.map((res: any) => {
      if (item.id === res.id) {
        res.likes_count = item.likes_count
        res.is_liked = item.is_liked
      }
      return res
    })
    setOfferList(updatedValue)
  }

  const onFocusSearch = () => {
    history.push('/search post');
  }

  const skeleton = () => {
    return (
      <>
        <div className="skelton-div content" >
          <Box display="flex" alignItems="center">
            <Box margin={1}>
              <Skeleton animation="wave" variant="circle" width={50} height={50} />
            </Box>
            <Box width="100%">
              <Skeleton animation="wave" height={20} width="80%"></Skeleton>
              <Skeleton animation="wave" height={20} width="50%" />
            </Box>
          </Box>
          <Skeleton variant="rect" width="100%">
            <div style={{ paddingTop: '57%' }} />
          </Skeleton>
          <Skeleton animation="wave" height={20} style={{ marginBottom: 6, marginTop: 6 }} />
          <Skeleton animation="wave" height={20} width="80%" />
        </div>
        <Divider />
      </>
    )
  }

  return (
    <>

      <PhotoGallery
        isOpenCarousel={isOpenCarousel}
        setIsOpenCarousel={setIsOpenCarousel}
        image={galleryImage}
        imageArray={galleryImageArray}
      />

      <div className="mobilemaincontainer content">
        <div className="mobile_container dash_tabs">
          <div className="sabrinamainscroll create_page">
            {/* <DashboardHeader /> */}
            <div className="search_haeder_top">
              <Row>
                <Col md={2} xs={2}>
                  <img src={Logo} alt="img" />
                </Col>
                <Col md={8} xs={8}></Col>

                <Col md={1} xs={1}>
                  <div className="search_header pt-1">
                    <SearchIcon onClick={() => onFocusSearch()} />
                    {/* <img src={Search} alt="img" onClick={() => onFocusSearch()} /> */}
                  </div>
                </Col>
              </Row>
            </div>

            <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example" className="navdash navdash_four_tabs"
              // nav_none
              onSelect={(k: any) => setTabKey(k)}>
              <Tab eventKey="tab1" title={
                <span className="d-block">
                  {/* <EmojiObjectsOutlinedIcon /> */}
                  {tabKey === 'tab1' ? <>  <img src={ideas} />  <p> Ideas </p> </> : <img src={ideas} className="emoji-outlined-icon animate__animated animate__swing" />}
                  {/* {tabKey === 'tab1' ? <>  <EmojiObjectsIcon />  <span className="d-block"> discover </span> </> : <EmojiObjectsOutlinedIcon className="emoji-outlined-icon animate__animated animate__swing" />} */}
                </span>
              }>

                {
                  offerList?.length === 0 &&
                  <Grid container spacing={8}>
                    <Grid item xs>
                      {
                        [1, 2, 3].map((x, i) => {
                          return (<div key={i}>{skeleton()}</div>);
                        })
                      }
                    </Grid>
                  </Grid>
                }

                <div className="sabrinamainscroll horizontal_box dashscroll pb-3">
                  {
                    offerList?.map((item: any, i: number) => {
                      return (
                        <OfferDetail setLike={setLike} item={item}
                          key={i} index={i}
                          openCarousel={openCarousel} offerBio={false}
                        />
                      )
                    })
                  }
                </div>
              </Tab>
              <Tab eventKey="tab2" title={
                <span className="d-block">
                  {/* <TvIcon /> */}
                  {tabKey === 'tab2' ? <>  <img src={portfolio} />  <p> Portfolio </p> </> : <img src={portfolio} className="portfolio emoji-outlined-icon animate__animated animate__swing" />}
                  {/* {tabKey === 'tab2' ? <> <SentimentVerySatisfiedOutlinedIcon /> <span className="d-block">Subscriptions</span> </> : <SentimentVerySatisfiedOutlinedIcon className="sentiment-very-satisfied-outlined-icon animate__animated animate__heartBeat" />} */}
                </span>
              }>
                <div className="sabrinamainscroll horizontal_box dashscroll mb-3 mt-3">
                  Tab 2
                </div>
              </Tab>
              <Tab eventKey="tab3" title={
                <span className="d-block">
                  {/* <LiveTvIcon /> */}
                  {tabKey === 'tab3' ? <>  <img className="track_record_active" src={track_record} />  <p> TrackRecord </p> </> : <img src={track_record} className="track_record emoji-outlined-icon animate__animated animate__swing" />}
                  {/* {tabKey === 'tab3' ? <>  <EmojiObjectsIcon />  <span className="d-block"> discover </span> </> : <EmojiObjectsOutlinedIcon className="emoji-outlined-icon animate__animated animate__swing" />} */}
                </span>
              }>
                <div className="sabrinamainscroll horizontal_box dashscroll mb-3 mt-3">
                  Tab 3
                </div>
              </Tab>
              <Tab eventKey="tab4" title={
                <span className="d-block">
                  {/* <TuneIcon /> */}
                  {tabKey === 'tab4' ? <>  <img src={rubiks} />  <p> Rubiks </p> </> : <img src={rubiks} className="emoji-outlined-icon animate__animated animate__swing" />}
                  {/* {tabKey === 'tab4' ? <> <SentimentVerySatisfiedOutlinedIcon /> <span className="d-block">Subscriptions</span> </> : <SentimentVerySatisfiedOutlinedIcon className="sentiment-very-satisfied-outlined-icon animate__animated animate__heartBeat" />} */}
                </span>
              }>
                <div className="sabrinamainscroll horizontal_box dashscroll mb-3 mt-3">
                  Tab 4
                </div>
              </Tab>
              <Tab eventKey="tab5" title={
                <span className="d-block">
                  {/* <TvIcon /> */}
                  {tabKey === 'tab5' ? <>  <img src={game} />  <p> Compete </p> </> : <img src={game} className="emoji-outlined-icon animate__animated animate__swing" />}
                  {/* {tabKey === 'tab2' ? <> <SentimentVerySatisfiedOutlinedIcon /> <span className="d-block">Subscriptions</span> </> : <SentimentVerySatisfiedOutlinedIcon className="sentiment-very-satisfied-outlined-icon animate__animated animate__heartBeat" />} */}
                </span>
              }>
                <div className="sabrinamainscroll horizontal_box dashscroll mb-3 mt-3">
                  Tab 5
                </div>
              </Tab>
            </Tabs>
            <TabIcon />
          </div>
        </div>
      </div>
    </>
  )
}