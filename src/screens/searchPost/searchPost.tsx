/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import * as images from '../images';
import TabIcon from '../tabs/tabs';
import dashboardDataJSON from '../../json/dashboard.json';
import { getOfferData } from '../../redux/action/getOffersAction';
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import Logo from "../../assets/images/new_landing/header-logo.png";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PhotoGallery } from '../../components/gallery/photoGallery';
import SearchIcon from '@material-ui/icons/Search';
import { fetchPostSearchResults, fetchCreatedPost } from '../../services/offer.service';
import { filter, isEmpty, debounce } from 'lodash';
import "./searchPost.scss";

interface IProps { }

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export const SearchPost: React.FC<IProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const [inputSearchText, setInputSearchText] = React.useState<any>();
  const [tabKey, setTabKey] = useState<string | any>('discoverTab');
  const dispatch = useDispatch();
  let [offerList, setOfferList] = useState<any>([]);
  let [searchTextList, setSearchTextList] = useState([]);
  let [galleryImage, setGalleryImage] = useState<any>({});
  let [galleryImageArray, setGalleryImageArray] = useState<any>([]);
  let [isOpenCarousel, setIsOpenCarousel] = useState<boolean>(false);

  // const getOfferState = useSelector((state: any) => {
  //   return state?.getOfferReducer?.offerList?.data?.data?.results
  // });

  // useEffect(() => {
  //   window.scrollTo(0, 1);
  //   if (getOfferState) {
  //     setOfferList(getOfferState);
  //   } else {
  //     getOffers();
  //   }
  // }, [getOfferState]);

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
      if (isEmpty(filteredOptions)) {
        setOfferList([]);
        // getOffers();
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
        setOfferList(res.results);
      }
    }
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

  const handleDelete = () => {

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
            <div className="search_haeder_top">
              <Row>
                <Col md={1} xs={1} className='search-arrow'>
                  <ArrowBackIcon onClick={() => history.goBack()} />
                </Col>

                <Col md={11} xs={11}>
                  <div style={{ width: '100%' }}>
                    <Autocomplete
                      fullWidth={true}
                      onChange={(event, newValue) => {
                        onChangeInputText(newValue);
                      }}
                      onInputChange={(e, newInputValue) => setInputSearchText(newInputValue)}
                      id="free-solo-demo"
                      freeSolo
                      options={searchTextList?.map((option: any) => option.name)}
                      renderInput={(params) => (
                        <TextField  {...params} variant="outlined"
                          placeholder="Search" className="search-data"
                        />
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <Card>
              <CardContent>
                <div className="main-container">
                  <Row>
                    <Col md={6} xs={6}>
                      <h3 className="mb-0">$RIPL</h3>
                      <p>Reliance industries</p>
                    </Col>

                    <Col md={6} xs={6}>
                      11:00 AM
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4} xs={4}>
                      <h3 className="mb-0">2284.22</h3>
                      <p>In INR</p>
                    </Col>
                    <Col md={4} xs={4}>
                      <ArrowUpwardIcon /> 45
                    </Col>
                    <Col md={4} xs={4}>
                      <ArrowDownwardIcon /> 22.1%
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4} xs={4}>
                      <span>Open 5512</span>
                    </Col>
                    <Col md={4} xs={4}>
                      <span className="high">High</span> <span>2251</span>
                    </Col>
                    <Col md={4} xs={4}>
                      <span className="low">Low</span> <span>110</span>
                    </Col>
                  </Row>
                </div>
              </CardContent>
            </Card>



            {/* <div className={`trending-ticker mvps`}>
              <h3>MVPs</h3>
              <div className={classes.root}>
                <Chip
                  avatar={<Avatar>R</Avatar>}
                  label="$RIL"
                  onDelete={handleDelete}
                  color="primary"
                />
                <br />
                <Chip
                  avatar={<Avatar>T</Avatar>}
                  label="$TATA"
                  onDelete={handleDelete}
                  color="secondary"
                />
                <br />
                <Chip
                  avatar={<Avatar>H</Avatar>}
                  label="$HDFC"
                  onDelete={handleDelete}
                />
              </div>
            </div>

            <div className={`trending-ticker`}>
              <h3>Trending Ticker</h3>
              <div className={classes.root}>
                <Chip
                  avatar={<Avatar alt="Natacha" src="https://storage.googleapis.com/tokuten-sit/user_63/profile_image/b3fc3a76-92fa-4d57-9c6e-18109a4c6ae8.jpeg" />}
                  label="Avinash"
                  onDelete={handleDelete}
                  color="primary"
                />
                <br />
                <Chip
                  avatar={<Avatar alt="Natacha" src="https://storage.googleapis.com/tokuten-sit/user_63/profile_image/b3fc3a76-92fa-4d57-9c6e-18109a4c6ae8.jpeg" />}
                  label="Priya"
                  onDelete={handleDelete}
                />
                <br />
                <Chip
                  avatar={<Avatar alt="Natacha" src="https://storage.googleapis.com/tokuten-sit/user_63/profile_image/b3fc3a76-92fa-4d57-9c6e-18109a4c6ae8.jpeg" />}
                  label="Ash"
                  onDelete={handleDelete}
                  color="secondary"
                />
              </div>
            </div> */}



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
            <Tabs defaultActiveKey="discoverTab" id="uncontrolled-tab-example" className="navdash nav_none"
              onSelect={(k: any) => setTabKey(k)}>
              <Tab eventKey="discoverTab" title>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}