/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
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
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { PhotoGallery } from '../../components/gallery/photoGallery';
import { fetchPostSearchResults } from '../../services/offer.service';
import { isEmpty, debounce, find } from 'lodash';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import { useQuery } from 'react-query';
import { shareUrl } from '../../components/Share/share';
import { MetaDataTags } from '../../components/metaDataTags/metaDataTags';
import "./searchPost.scss";

let e_price: any;

interface IProps { }

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));


export const SearchPost: React.FC<IProps> = () => {
  const params: any = useParams();
  const history = useHistory();
  const [inputSearchText, setInputSearchText] = React.useState<any>();
  const [tabKey, setTabKey] = useState<string | any>('discoverTab');
  const dispatch = useDispatch();
  let [offerList, setOfferList] = useState<any>([]);
  let [searchTextList, setSearchTextList] = useState([]);
  let [galleryImage, setGalleryImage] = useState<any>({});
  let [filterValues, setFilterValues] = useState<any>();
  let [galleryImageArray, setGalleryImageArray] = useState<any>([]);
  let [isOpenCarousel, setIsOpenCarousel] = useState<boolean>(false);

  // const getOfferState = useSelector((state: any) => {
  //   return state?.getOfferReducer?.offerList?.data?.data?.results
  // });

  useEffect(() => {
    const getTagsData = async () => {
      if(params.hasOwnProperty('shortname')){
        let response: any = await fetchPostSearchResults(params.shortname);
        setFilterValues(response[0]);
      }
    }
    getTagsData();
  }, [params.shortname]);

  const getRendringData = async () => {
    try {
      if (params.shortname) {
        let response: any = await fetchPostSearchResults(params.shortname);
        return {
          title: `${response[0].name} | ${response[0].existing_price} | tokuten`,
          description: response[0].display_name,
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  let { data } = params && useQuery('data', getRendringData);

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
    const data: any = find(searchTextList, ['name', newValue]);
    setFilterValues(data)
    // if (filterValues.length > 0) {
    //   if (!filterValues[0]?.name?.charAt(0).includes('$')) {
    //     history.push(`user-profile/${filterValues[0].id}`, '_blank');
    //   } else {
    //     const res = await fetchCreatedPost(filterValues[0].name);
    //     setOfferList(res.results);
    //   }
    // }
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
      <MetaDataTags title={data?.title} description={data?.description} />

      <PhotoGallery
        isOpenCarousel={isOpenCarousel}
        setIsOpenCarousel={setIsOpenCarousel}
        image={galleryImage}
        imageArray={galleryImageArray}
      />

      <div className="mobilemaincontainer content">
        <div className="mobile_container dash_tabs">
          <div className="sabrinamainscroll create_page">
            {
              !params?.fullname &&
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
                          <TextField  {...params} variant="outlined" placeholder="Type $" className="search-data" />
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            }

            {filterValues &&
              <Card>
                <CardContent>
                  <div className="main-container">
                    <Row>
                      <Col md={2} xs={2}><AccountCircleIcon /></Col>
                      <Col md={8} xs={8}>
                        <h5 className="mb-0">{filterValues?.name}</h5>
                        {/* <p>{filterValues?.display_name}</p> */}
                      </Col>
                      {/* <Col md={5} xs={5}>11:00 AM</Col> */}
                      <Col md={2} xs={2}>
                        <LaunchOutlinedIcon onClick={() => shareUrl(`company/${filterValues?.name}/${filterValues?.display_name}`)} />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12} xs={12}>
                        <p>{filterValues?.display_name}</p>
                      </Col>
                    </Row>

                    <br />

                    <Row>
                      <Col md={6} xs={6} className="open-high-low">
                        <p>INR {filterValues?.existing_price || e_price} </p>
                        <p className="high" >{filterValues?.previous_price_difference}</p>
                        <p>11:00 AM</p>
                      </Col>
                      <Col md={6} xs={6} className="open-high-low">
                        <Row>
                          <Col md={5} xs={5}><p>Open:</p></Col>
                          <Col md={7} xs={7}><p>{filterValues?.open_price}</p></Col>
                        </Row>
                        <Row>
                          <Col md={5} xs={5}><p>High:</p></Col>
                          <Col md={7} xs={7}><p>{filterValues?.high_price}</p></Col>
                        </Row>
                        <Row>
                          <Col md={5} xs={5}><p>Low:</p></Col>
                          <Col md={7} xs={7}><p>{filterValues?.low_price}</p></Col>
                        </Row>
                        <Row>
                          <Col md={5} xs={5}><p>Volume:</p></Col>
                          <Col md={7} xs={7}><p>{filterValues?.volume}</p></Col>
                        </Row>
                        {/* <p>Open: 221.11</p>
                        <p>Hign: 4544</p>
                        <p>Low: -444</p>
                        <p>Valume: 121</p> */}
                      </Col>
                    </Row>

                    <Row>
                      <Col className="flex-end" >
                        <AddCircleOutlineOutlinedIcon onClick={() => history.push("portfolio")} />
                      </Col>
                    </Row>
                  </div>
                </CardContent>
              </Card>
            }

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