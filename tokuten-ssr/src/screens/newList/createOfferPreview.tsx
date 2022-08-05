import React, { useState, ChangeEvent, useEffect } from 'react';
import YouTube from 'react-youtube';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as alertService from '../../services/AlertService';
import * as offerService from "../../services/offer.service"
import { getFanGroup } from '../../redux/action/getOffersAction';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./createOfferPreview.scss";
import TabIcon from '../tabs/tabs';
import Compressor from 'compressorjs';
// import { Editor } from 'react-draft-wysiwyg';
import Chip from "@material-ui/core/Chip";
import draftToMarkdown from 'draftjs-to-markdown';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ImageLists } from '../../components/ImageList/imageList';
import { MetaDataCardDetails } from '../../components/metaCardDetails/metaCardDetails';
import moment from 'moment';
import {
  CREATE_OFFER_APIIMAGES, CREATE_OFFER_IMAGES,
  CREATE_OFFER_OBJECT
} from '../../redux/action/actionTypes/getOfferActionsTypes';
import { Header } from '../../components/header/header'

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import BottomPopup from '../../components/bottomPopup/bottomPopup';
import * as images from '../../screens/images'
import * as authService from "../../services/auth.service";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PhotoGallery } from '../../components/gallery/photoGallery';
import { OfferMediaPopup } from './offerMediaPopup';
import { TextField } from '@material-ui/core';
import UserMentionsComponents from '../../components/userMentions/userMentions';
import { Spinner } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class createOffer {
  expires_at: any;
  offer_title: any;
  offer_bio: any;
  is_subscribed: boolean = false;
  is_private: boolean | any = false;
  cost: any;
  is_allow_tips: any = false;
  units: any;
  is_virtual_delivery: boolean = false;
  offer_location: any;
  is_physical_delivery: boolean = false;
  additional_notes: any;
  thanku_note: any;
  is_cost: boolean = false;
  is_location: boolean = false;
  is_units: boolean = false;
  is_expiry: boolean = false;
  is_allow_manage_store: boolean = false;
  disclaimer: any = null;
  general_tag: any = [];
  primary_tag: any;
  item: any;
  audience: any;
}
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

    cardRoot: {
      maxWidth: 365,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    }
  }),
);
export const CreateOfferPreview = ({ item, onDataHandles, base64ImagesURI, actualAPIFiles, pageData,
  pageBack }: any) => {
  const classes = useStyles();
  const [currentUserData, setCurrentUserData] = useState<any>([]);
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);
  let [ideasTags, setIdeasTags] = useState<any>([]);
  let ideasTagsInputVal;
  const [editorValue, setEditorValue] = useState<any>(EditorState.createEmpty());
  const history = useHistory();
  const location: any = useLocation()
  const dispatch = useDispatch();
  const [text, setText] = useState<any>();
  let [uriImages, setURIImages] = useState<any>([]);
  let [apiImages, setApiImages] = useState<any>([])
  let [formData, setFormData] = useState<createOffer>(new createOffer());
  let [galleryImage, setGalleryImage] = useState<any>({});
  let [galleryImageArray, setGalleryImageArray] = useState<any>([]);
  const [submittingOffer, onSubmittingOffer] = React.useState<boolean>(false);
  const [defaultGroup, setDefaultGroup] = useState<any>({});
  const [metaDataInfo, setMetaDataInfo] = useState<any>();
  const [videoPlayerConfig, setVideoPlayerConfig] = useState<any>({
    height: '360',
    width: '360',
    playerVars: {
      autoplay: 1,
    },
  });

  let [isOpenCarousel, setIsOpenCarousel] = useState<boolean>(false);
  // let [showEditor, setShowEditor] = useState<boolean>(false);

  const createOfferStoreData = useSelector((state: any) => {
    return state?.getOfferReducer?.data;
  });

  // console.log('----->', createOfferStoreData);
  // console.log('primary', createOfferStoreData?.primary_tag?.title);
  // console.log('secondary', createOfferStoreData?.secondary_tag?.title);

  const primaryTag = createOfferStoreData?.primary_tag?.name;
  const secondaryTag = createOfferStoreData?.secondary_tag;
  console.log("secondry data", secondaryTag)
  let offerTitle = createOfferStoreData?.offer_title;
  const genralTags = createOfferStoreData?.general_tag;
  const createOfferStoreImages = useSelector((state: any) => {
    return state?.getOfferReducer;
  });

  console.log('redux-->', createOfferStoreData);
  // console.log('formdata', formData);
  // console.log(primaryTag, secondaryTag);

  // const handleLocation: any = (loc: any) => {
  //   setMapLocation(loc)
  //   console.log('---', mapLocation)
  //   let newState = {}
  //   newState = { ...formData, ['offer_location']: loc }
  //   setFormData({ ...formData, ...newState })
  //   console.log('formData', formData)
  //   onDataHandles(newState);
  // }

  const userProfileData = useSelector((state: any) => {
    return state.authReducer?.personalData?.data?.data;
  });

  const manageData = () => {
    var newState: any = {};
    // newState = { ...formData, [name]: e.target.value };
    setFormData({ ...formData, ...createOfferStoreData });
    createOfferStoreData?.general_tag && setIdeasTags(createOfferStoreData?.general_tag);
    // onDataHandles(newState, uriImages, apiImages);
  }

  const manageImage = () => {
    createOfferStoreImages.images &&
      createOfferStoreImages.images.length > 0 &&
      setURIImages(createOfferStoreImages.images)

    createOfferStoreImages.APIImages &&
      createOfferStoreImages.APIImages.length > 0 &&
      setApiImages(createOfferStoreImages.APIImages)
  }

  const getCurrentUserData = async () => {
    const response: any = await authService.getProfile();
    setCurrentUserData({ ...response.data.data });
  }

  useEffect(() => {
    getCurrentUserData(); /* Get current user details */
    window.scrollTo(0, 1);
    if (pageBack) {
      if (base64ImagesURI)
        setURIImages(base64ImagesURI)
      if (actualAPIFiles)
        setApiImages(actualAPIFiles)
      if (pageData) {
        if (pageData && pageData.expires_at) {
          setSelectedDate(pageData['expires_at']);
        }
        if (pageData && pageData.general_tag.length > 0) {
          setIdeasTags(pageData.general_tag);
        }
        setFormData(pageData);
      }
    }
    createOfferStoreData && manageData()
    createOfferStoreImages && manageImage()
  }, [pageBack])

  useEffect(() => {
    uriImages.length > 0 && dispatch({ type: CREATE_OFFER_IMAGES, payload: uriImages })
    apiImages.length > 0 && dispatch({ type: CREATE_OFFER_APIIMAGES, payload: apiImages })
  }, [uriImages, apiImages]);


  // get audiance attr = all id Function
  const audiance = async () => {
    const res: any = await dispatch(getFanGroup())
    const data: any = res?.payload?.data
    const AllAtrrData = data.find((item: any) => {
      return item?.group === "ALL"
    })
    setDefaultGroup(AllAtrrData)

  }
  // get audiance attr = all id Function end

  useEffect(() => {
    // const elem: any = document.getElementsByClassName('rdw-editor-toolbar')[0];
    // elem.style.display = 'none';
    audiance();
  }, [])



  // Upload file handleclick
  const hiddenFileInput = React.useRef<any>(null);
  const fileUpload = () => {
    hiddenFileInput.current.click();
  }

  // onDataHandles(formData, uriImages, apiImages);

  const handleFileChange = async (e: any) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    // for image compress
    const arrayFile: any = Array.from(file);
    // for object images
    let imageData: any = [];
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
              let base64File: any = e.target.result;
              // imageData.push({ file: base64File, position: i });
              imageData.push(base64File);
              setURIImages([...uriImages, ...imageData]);
              setMetaDataInfo(null);
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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    var newState: any = {};
    newState = { ...formData, [name]: e.target.value };
    dispatch({ type: CREATE_OFFER_OBJECT, payload: { ...createOfferStoreData, [name]: e.target.value } });
    setFormData({ ...formData, ...newState });
  }

  const [selectedDate, setSelectedDate] = React.useState(null);


  const openFansPage = () => {
    history.push({ pathname: '/fans', state: "audience" });
  }

  const openDetailPage = () => {
    history.push('/create/offer/detail');
  }

  const onEditorStateChange = (editorState: any) => {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorValue(editorState);
    // const value = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
    let newState = {};
    newState = { ...formData, 'offer_bio': value };
    dispatch({ type: CREATE_OFFER_OBJECT, payload: { ...createOfferStoreData, 'offer_bio': value } });
    setFormData({ ...formData, ...newState });
  };

  const handleDelete = (index: number) => {
    ideasTags.splice(index, 1);
    // console.log(ideasTags);
    setIdeasTags([...ideasTags]);
    let newState = {};
    newState = { ...formData, 'general_tag': ideasTags };
    dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
    setFormData({ ...formData, ...newState });
  };

  const inputOnChange = (event: any) => {
    let tag: string = event.target.value.trim();
    if (event.key === ' ') {
      if (tag.charAt(0).includes('$')) {
        const newTages = [...ideasTags, tag];
        setIdeasTags([...ideasTags, tag]);
        let newState = {};
        newState = { ...formData, 'general_tag': newTages };
        dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
        setFormData({ ...formData, ...newState });
      }
      event.target.value = null;
    }
  };

  const setCols = (i: number) => {
    if (uriImages.length > 1) {
      if (uriImages.length % 2 && (i) === uriImages.length) return 2;
      else return 1;
    }
    else return 2;
  }

  const openCarousel = (imgItem: any, itemId?: number) => {
    setGalleryImageArray(uriImages)
    setGalleryImage(imgItem)
    setIsOpenCarousel(true);
  }

  const setShowEditor = () => {
    const elem: any = document.getElementsByClassName('rdw-editor-toolbar')[0];
    elem.style.display = 'flex';
  }

  const getMetaDataFromLink = async (title: string) => {
    const newTitle: any = title?.split(' ');
    let url;
    for await (const iterator of newTitle) {
      try {
        url = new URL(iterator);
        return url.href;
      } catch (_) {
        // return false;
      }
    }
  }

  const setTitleValue = async (title: any) => {
    let metaDataURL = await getMetaDataFromLink(title);
    if(metaDataURL) {
      if(metaDataInfo) return;
      offerService.getMetaDataByLink(metaDataURL).then((res: any) => {
        if (res.success) {
          if(res?.data?.site_name === 'YouTube') {
            res.data['isVideo'] = true;
          }
          setMetaDataInfo(res.data);
        }
      });
    } else {
      setMetaDataInfo(null);
    }

    let newState = {};
    newState = { ...formData, 'offer_title': title };
    dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
    setFormData({ ...formData, ...newState });
  }

  //  data submit function 
  const convertToFormData = () => {
    let formDatas = new FormData();
    formDatas.append('audience', formData.audience ? formData.audience : defaultGroup?.id);
    formDatas.append('cost', formData?.cost ? formData?.cost : 0);
    formDatas.append('disclaimer', formData.disclaimer);
    formDatas.append('is_allow_tips', formData.is_allow_tips || false);
    formDatas.append('is_private', formData.is_private || false);
    if (formData.offer_bio) {
      formDatas.append('offer_bio', formData.offer_bio);
    }
    formDatas.append('offer_title', formData.offer_title);
    let tags: any = {};
    if (primaryTag) {
      tags['primary'] = [primaryTag];
    }
    if (secondaryTag) {
      tags['secondary'] = [secondaryTag?.name];
    }
    if (formData?.general_tag) {
      tags['ideas_tag'] = formData.general_tag;
    }
    formDatas.append('tags', JSON.stringify(tags));
    if(metaDataInfo) {
      formDatas.append('meta_title', metaDataInfo.title);
      formDatas.append('meta_description', metaDataInfo.description);
      formDatas.append('meta_image', metaDataInfo.image);
      formDatas.append('meta_url', metaDataInfo.url);
    }
    for (let i = 0; i < apiImages.length; i++) {
      formDatas.append('event_offer_images', apiImages[i]);
    }
    return formDatas;
  }

  let createOfferHandler = async () => {
    try {
      const payload = convertToFormData();
      onSubmittingOffer(true);
      const response = await offerService.createOffer(payload);
      if (response?.status === 201) {
        // setResData(response?.data?.data);
        onSubmittingOffer(false);
        // setPageBack(false)
        dispatch({ type: CREATE_OFFER_OBJECT, payload: {} });
        dispatch({ type: CREATE_OFFER_IMAGES, payload: {} })
        dispatch({ type: CREATE_OFFER_APIIMAGES, payload: {} })
        // setPropsData({});
        setURIImages([])
        formData = {
          expires_at: "",
          offer_title: "",
          offer_bio: "",
          is_subscribed: false,
          is_private: false,
          cost: "",
          is_allow_tips: false,
          units: "",
          is_virtual_delivery: false,
          offer_location: "",
          is_physical_delivery: false,
          additional_notes: "",
          thanku_note: "",
          is_cost: false,
          is_location: false,
          is_units: false,
          is_expiry: false,
          is_allow_manage_store: false,
          disclaimer: null,
          general_tag: [],
          primary_tag: [],
          item: "",
          audience: ""
        }
        setFormData(formData)
        offerTitle = ""
        setEditorValue(EditorState.createEmpty())

      } else {
        alertService.error(response?.data?.message)
        onSubmittingOffer(false);
      }
    } catch (error: any) {
      alertService.error(error.message);
      onSubmittingOffer(false);
    }
  }

  const handleNext = () => {
    if (!formData.offer_title) {
      let errors: any = [];
      if (!formData.offer_title) {
        errors.push('Title');
      }
      let msg: string = '';
      errors.forEach((elem: any, index: any) => {
        msg += `${index + 1}${")"} ${elem} is required \n `
      });
      alertService.error(msg);
    } else {
      // setSendData({sendData, ...propsData});
      createOfferHandler()
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // if (activeStep === 0) {
      //   setSendData(propsData)
      // }
      // if (activeStep === 1) {
      // }
    }
  };
  return (
    <div className="text_media_height">
      {/* <BottomPopup
        isToggleSidebar={isToggleSidebar}
        setIsToggleSidebar={setIsToggleSidebar}
        showInnerContent={'offer-media-popup'}
        hiddenFileInput={hiddenFileInput}
        handleFileChange={handleFileChange}
        fileUpload={fileUpload}
        setShowEditor={setShowEditor}
      /> */}

      <PhotoGallery
        isOpenCarousel={isOpenCarousel}
        setIsOpenCarousel={setIsOpenCarousel}
        image={galleryImage}
        imageArray={galleryImageArray}
      />
      <div className="mobilemaincontainer">
        <div className="mobile_container dash_tabs">
          <div className="sabrinamainscroll create_page list_page_head">
            <Header
              title="Create Post"
              next={
                (submittingOffer ?
                  <Spinner className="spinner-offer" animation="grow" variant="primary" /> :
                  'Post'
                )
              }
              enablenext={handleNext}
            />

            <div className="pt-2">
              <div className="yogatrainercontainer new_dash1" >
                <div className="sbrina_container p-2 mt-0 pt-0">
                  <div className="sbrinamain_container">
                    <div className="yoga_trainer_001">
                      {/* <YouTube videoId='https://www.youtube.com/watch?v=CJq1hGSO89A&list=RDCJq1hGSO89A&start_radio=1' opts={videoPlayerConfig}/> */}
                      <LazyLoadImage
                        effect="blur"
                        src={currentUserData?.profile_image ? currentUserData?.profile_image : images.mobheader1}
                        className="sbrinaprofileimg"
                      />
                      <div className="sbrinacontainer">
                        <p className="sbrinatext_name">{currentUserData?.first_name}</p>
                        <span className="sbrina_subscribe" onClick={openFansPage} >
                          {location?.state?.name ? location?.state?.name : 'ALL'}
                          <ArrowForwardIosOutlinedIcon className="arrow-icon-post" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* images section */}
                <div className="img_bg">
                  <div className={classes.root}>
                    <ImageLists openCarousel={openCarousel} sliderImages={uriImages} />
                    {/* Meta data section */}
                    {  metaDataInfo && <MetaDataCardDetails image={metaDataInfo?.image} 
                        title={metaDataInfo?.title} description={metaDataInfo?.description} /> 
                    }
                    {/* Meta data section end*/}
                  </div>
                </div>
                {/* images section end */}

                <div className="first_section">
                  <Row>
                    <Col md={6} xs={6}>
                      <span
                        style={{ backgroundColor: secondaryTag?.background }}
                        className="activity_label all-tags"
                        onClick={() => history.push('/tag/activity-label')}>
                        {secondaryTag ? secondaryTag?.name : 'Activity Label +'}
                      </span>
                    </Col>
                  </Row>

                  <UserMentionsComponents
                    placeholderText={'Write a title, use the @ symbol to tag other users.'}
                    setSingleLineValue={setTitleValue}
                  />

                  <Row>
                    <Col md={12} xs={12}>
                      {/* <Form.Group className="mb-3 d-inline-block textarea_box" style={{width: '100%'}}>
                      <Form.Control as="textarea"
                        value={formData?.offer_title}
                        name="offer_title"
                        onChange={(event: any) => onInputChange(event)}
                        placeholder="Write a title..."
                        rows={3} />
                    </Form.Group> */}
                    </Col>
                  </Row>
                  <div className="tags_dash">
                    <Row>
                      <Col md={6} xs={6}>
                        {
                          formData.general_tag.length > 0
                            ?
                            formData.general_tag.map((tag: any) => {
                              return (
                                <span
                                  className="asset_tag all-tags"
                                  onClick={() => history.push('/tag/asset-tag')}
                                >
                                  {tag}
                                </span>
                              )
                            })
                            : <span
                              className="asset_tag all-tags"
                              onClick={() => history.push('/tag/asset-tag')}
                            >
                              Asset Tag +
                            </span>
                        }
                      </Col>

                      <Col md={6} xs={6} className="text-right">
                        {
                          <span
                            className="asset_label all-tags"
                            onClick={() => history.push('/tag/asset-label')}
                          >

                            {primaryTag ?
                              <>
                                <img
                                  src={formData?.primary_tag?.icon}
                                  className="mr-2" alt="img"
                                />
                                {primaryTag}
                              </>
                              : 'Asset Label +'}
                          </span>
                        }
                      </Col>
                    </Row>
                  </div>
                </div>


                <div className="box_list">
                  <Row>
                    <Col md={12} xs={12}>
                      {/* <Editor
                        editorState={editorValue}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        placeholder="Write your ideas..."
                        onEditorStateChange={onEditorStateChange}
                        hashtag={{}}
                      /> */}
                    </Col>
                  </Row>
                </div>

                <div className="bg_overflow pb-5" style={{ marginBottom: '75px' }}>
                  {
                    (createOfferStoreData?.is_private || createOfferStoreData?.is_private === false || formData?.cost) &&
                    <div className="list_page list_detail_page pt-2 pb-4">
                      <div className="box_list">
                        {/* {
                          (createOfferStoreData?.is_private || createOfferStoreData?.is_private === false) &&
                          <div className="detail_content1 mt-4">
                            <Row>
                              <Col md={4} xs={4} className="text-left">
                                <h6>Visibility</h6>
                              </Col>
                              <Col md={8} xs={8} className="text-right">
                                <p>{formData?.is_private ? 'Private' : 'Public'}</p>
                              </Col>
                            </Row>
                          </div>
                        } */}

                        {/* {
                          formData?.cost &&
                          <div className="detail_content1 mt-4">
                            <Row>
                              <Col md={4} xs={4} className="text-left">
                                <h6>Price</h6>
                              </Col>
                              <Col md={8} xs={8} className="text-right">
                                <p>{formData?.cost && 'HK$  ' + formData?.cost}</p>
                              </Col>
                            </Row>
                          </div>
                        } */}
                      </div>
                    </div>
                  }
                </div>


              </div>
            </div>
          </div>

          {/* <div className="mobile_container bg_overflow pb-5"> */}
          {/* <div className="list_page list_detail_page pt-2 pb-4"> */}
          {/* <Form> */}
          {/* <div className="box_list"> */}

          {/* <span
                className="activity_label all-tags"
                onClick={() => history.push('/tag/activity-label')}
              >
                {secondaryTag ? secondaryTag : 'Activity Label'}
              </span> */}

          {/* 
              <Row>
                <Col md={9} xs={9} className="pr-0"> */}
          {/* <LazyLoadImage
                    src={userProfileData?.profile_image ?
                      userProfileData?.profile_image : profile}
                    className="d-inline-block userImg mt-0"
                    alt="Image"
                  /> */}

          {/* <Form.Group className="mb-3 d-inline-block textarea_box">
                    <Form.Control as="textarea"
                      value={formData?.offer_title}
                      name="offer_title"
                      onChange={(event: any) => onInputChange(event)}
                      placeholder="Write a title..."
                      rows={3} />
                  </Form.Group> */}
          {/* </Col> */}

          {/* <Col md={3} xs={3} className="pr-2 pl-0 text-right">
                  <input type="file"
                    multiple
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img src={selectimg} className="img_select" onClick={fileUpload} alt="" />
                </Col> */}
          {/* </Row> */}
          {/* {uriImages.length > 0 &&
                <div className="media-gallery-create-offer media_gallery">
                  <ul className="pl-0 available-items">
                    {photo}
                  </ul>
                </div>
              } */}
          {/* </div> */}

          {/* <div className="tags_dash">
              <Row>
                <Col md={6} xs={6}>
                  {
                    formData.general_tag.length > 0
                      ?
                      formData.general_tag.map((tag: any) => {
                        return (
                          <span
                            className="asset_tag all-tags"
                            onClick={() => history.push('/tag/asset-tag')}
                          >
                            {tag}
                          </span>
                        )
                      })
                      : <span
                        className="asset_tag all-tags"
                        onClick={() => history.push('/tag/asset-tag')}
                      >
                        Asset
                      </span>
                  }
                </Col>

                <Col md={6} xs={6} className="text-right">
                  {
                    <span
                      className="asset_label all-tags"
                      onClick={() => history.push('/tag/asset-label')}
                    >

                      {primaryTag ?
                        <div> <img
                          src={formData?.primary_tag?.icon}
                          className="mr-2" alt="img"
                        />
                          {primaryTag} </div>
                        : 'Asset Label'}
                    </span>
                  }
                </Col>
              </Row>
            </div> */}

          {/* <div className="box_list"> */}
          {/* <Row>
                <Col md={4} xs={4}>
                  <h5 className="m-0" onClick={() => history.push('/offertag')}>Title tag</h5>
                </Col>
                <Col md={8} xs={8} className="text-right detail_Col"> */}
          {/* <p className="d-inline-block detail_text">
                    {location.state && location.state.name}
                  </p> */}
          {/* <img src={Right} className="ml-2" onClick={() => history.push('/offertag')} alt="img" />
                </Col>
              </Row> */}
          {/* <Row>
                <Col md={12} xs={12}>
                  {primaryTag && <Chip className="chips chip_avatar" label={primaryTag} variant="outlined" />}
                  {secondaryTag && <Chip className="chips chip_avatar" label={secondaryTag} variant="outlined" />}
                </Col>
              </Row> */}
          {/* </div> */}

          {/* {
              showEditor &&
              <div className="box_list">
                <Row>
                  <Col md={12} xs={12}>
                    <Editor
                      editorState={editorValue}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      placeholder="Enter details..."
                      onEditorStateChange={onEditorStateChange}
                      mention={{
                        separator: ' ',
                        trigger: '@',
                        suggestions: [
                          { text: 'APPLE', value: 'apple', url: 'apple' },
                          { text: 'BANANA', value: 'banana', url: 'banana' },
                          { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                          { text: 'DURIAN', value: 'durian', url: 'durian' },
                          { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                          { text: 'FIG', value: 'fig', url: 'fig' },
                          { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                          { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                        ],
                      }}
                      hashtag={{}}
                    />
                  </Col>
                </Row>
              </div>
            } */}

          {/* <div className="box_list">
              <Row>
                <Col md={12} xs={12}>
                  <InputLabel htmlFor="input-with-icon-adornment">Ideas tag...</InputLabel>
                  <Input
                    className="w-100 textarea_input_div"
                    multiline
                    placeholder="Create $ Tags"
                    value={ideasTagsInputVal}
                    onKeyPress={inputOnChange}
                    id="input-with-icon-adornment"
                    startAdornment={ideasTags.map((item: any, index: number) => {
                      return (
                        <>
                          <Chip
                            onDelete={() => handleDelete(index)}
                            label={item}
                            variant="outlined"
                          />
                          <span>&nbsp;</span>
                        </>
                      );
                    })}
                  />
                </Col>
              </Row>
            </div> */}

          {/* <div className="box_list">
              <Form.Group className="textarea_box w-100" >
                <Form.Control as="textarea"
                  onChange={(event: any) => onInputChange(event)}
                  name="offer_bio"
                  value={formData?.offer_bio}
                  className="p-0"
                  placeholder="Write a Blurb..." />
              </Form.Group>
            </div> */}

          {/* <div className="box_list"> */}
          {/* <Row>
                <Col md={4} xs={4}>
                  <h5 className="m-0">Advanced</h5>
                </Col>
                <Col md={8} xs={8} className="text-right detail_Col">
                  <img src={Right} onClick={openDetailPage} alt="img" />
                </Col>
              </Row> */}

          {/* {
                (createOfferStoreData?.is_private || createOfferStoreData?.is_private === false) &&
                <div className="detail_content1 mt-4">
                  <Row>
                    <Col md={4} xs={4} className="text-left">
                      <h6>Visibility</h6>
                    </Col>
                    <Col md={8} xs={8} className="text-right">
                      <p>{formData?.is_private ? 'Private' : 'Public'}</p>
                    </Col>
                  </Row>
                </div>
              }

              {
                formData?.cost &&
                <div className="detail_content1 mt-4">
                  <Row>
                    <Col md={4} xs={4} className="text-left">
                      <h6>Price</h6>
                    </Col>
                    <Col md={8} xs={8} className="text-right">
                      <p>{formData?.cost && 'HK$  ' + formData?.cost}</p>
                    </Col>
                  </Row>
                </div>
              } */}

          {/* <div className="detail_content1 mt-4">
                <Row>
                  <Col md={4} xs={4} className="text-left">
                    <h6>
                      Units:
                    </h6>
                  </Col>
                  <Col md={8} xs={8} className="text-right">
                    <p>{formData?.units}</p>
                  </Col>
                </Row>
              </div> */}

          {/* <div className="detail_content1 mt-4">
                <Row>
                  <Col md={4} xs={4} className="text-left">
                    <h6>
                      Expiry:
                    </h6>
                  </Col>
                  <Col md={8} xs={8} className="text-right">
                    <p>{ formData?.expires_at && moment(formData?.expires_at).format('Do MMMM, YYYY')}</p>
                  </Col>
                </Row>
              </div> */}

          {/* <div className="detail_content1 mt-4">
                <Row>
                  <Col md={4} xs={4} className="text-left">
                    <h6>
                      delivery:
                    </h6>
                  </Col>
                  <Col md={8} xs={8} className="text-right detail_Col">
                    {formData?.offer_location &&
                      <span className="icon_same">
                        <LocationOnIcon />
                      </span>}
                    <p className="font_text d-inline-block">
                      {formData?.offer_location && formData?.offer_location}
                    </p>
                  </Col>
                </Row>
              </div> */}
          {/* </div> */}

          {/* <div className="box_list additional_textarea">
              <Row>
                <Col md={6} xs={6} className="text-left">
                  <h5>
                    Additional notes
                  </h5>
                </Col>
                <Col md={6} xs={6} className="text-right">
                  <img src={Right} className="" onClick={() => { history.push('/offer/text/notes') }} alt="" />
                </Col>
              </Row>

              <Row>
                <Col md={12} xs={12}>
                  <p>{formData?.additional_notes}</p>
                </Col>
              </Row>
            </div> */}

          {/* <div className="box_list additional_textarea mb-0">
              <Row>
                <Col md={6} xs={6} className="text-left">
                  <h5>
                    Thank you Note
                  </h5>
                </Col>
                <Col md={6} xs={6} className="text-right">
                  <img src={Right} className="" onClick={() => { history.push('/offer/text/thanku') }} alt="" />
                </Col>
              </Row>

              <Row>
                <Col md={12} xs={12}>
                  <p>{formData?.thanku_note}</p>
                </Col>
              </Row>
            </div> */}
          {/* <div className="box_list">
              <Row>
                <Col md={4} xs={4}>
                  <h5 className="m-0">audience</h5>
                </Col>
                <Col md={8} xs={8} className="text-right detail_Col">
                  <p className="d-inline-block detail_text">
                    {location?.state?.name ? location?.state?.name : 'ALL'}
                  </p>
                  <img src={Right} className="ml-2" onClick={openFansPage} alt="" />
                </Col>
              </Row>
            </div> */}


          {/* </Form> */}

          <OfferMediaPopup
            hiddenFileInput={hiddenFileInput}
            handleFileChange={handleFileChange}
            fileUpload={fileUpload}
            setShowEditor={setShowEditor}
          />

          <TabIcon setIsTogglePopup={setIsToggleSidebar} />
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
