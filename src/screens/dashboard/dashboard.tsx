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
import { fetchPostSearchResults, fetchCreatedPost } from '../../services/offer.service';
import { filter, isEmpty, debounce } from 'lodash';

const top100Films: any[] = [];

interface IProps { }
export const Dashboard: React.FC<IProps> = () => {
  const history = useHistory();
  const [inputSearchText, setInputSearchText] = React.useState<any>();
  const [tabKey, setTabKey] = useState<string | any>('discoverTab');
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

  const fetchData = async (query: any, cb: any) => {
    const res = (query && await fetchPostSearchResults(query)) || [];
    cb(res);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchData = useCallback(
    debounce((query, cb) => {
      setSearchTextList([]);
      fetchData(query, cb);
    }, 500),
    []
  );

  React.useEffect(() => {
    debouncedFetchData(inputSearchText, (filteredOptions: any) => {
      console.log('filteredOptions', filteredOptions);
      if (isEmpty(filteredOptions)) {
        getOffers();
      }
      setSearchTextList(filteredOptions);
    });
  }, [inputSearchText, debouncedFetchData]);

  const onChangeInputText = async (newValue: any) => {
    const filterValues: any = filter(searchTextList, ['name', newValue]);
    if (filterValues.length > 0) {
      if (!filterValues[0]?.name?.charAt(0).includes('$')) {
        history.push(`user-profile/${filterValues[0].id}`, '_blank');
      } else {
        const res = await fetchCreatedPost(filterValues[0].name);
        console.log('%%%%', res.results);
        setOfferList(res.results);
      }
    }
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
                {/*
                  <Col md={9} xs={9} className="pr-0">
                    <div style={{ width: '100%' }}>
                      <Autocomplete
                        fullWidth={true}
                        className="MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator"
                        onChange={(event, newValue) => {
                          onChangeInputText(newValue);
                        }}
                        onFocus={() => onFocusSearch()}
                        onInputChange={(e, newInputValue) => setInputSearchText(newInputValue)}
                        // className="animate__animated animate__backInRight animate__delay-1s"
                        id="free-solo-demo"
                        freeSolo
                        forcePopupIcon={true}
                        popupIcon={
                          <SearchIcon />
                        }
                        options={searchTextList?.map((option: any) => option.name)}
                        renderInput={(params) => (
                          // <TextField
                          //     {...params}
                          //     placeholder="Search"
                          //     InputProps={{
                          //       ...params.InputProps,
                          //       startAdornment: (
                          //         <InputAdornment position="start">
                          //         <SearchIcon />
                          //       </InputAdornment>),
                          //       disableUnderline: true
                          //     }} 
                          // />
                          <TextField {...params} variant="outlined" placeholder="Search" />
                        )}
                      />
                    </div>
                  </Col>
                */}
                <Col md={1} xs={1}>
                  <div className="search_header pt-1">
                    <SearchIcon onClick={() => onFocusSearch()} />
                    {/* <img src={Search} alt="img" onClick={() => onFocusSearch()} /> */}
                  </div>
                </Col>
              </Row>
            </div>

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
            <TabIcon />
          </div>
        </div>
      </div>
    </>
  )
}