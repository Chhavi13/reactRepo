import React, { useState, useCallback, useEffect } from 'react';
import Carousel, { Modal, ModalGateway } from "react-images";
import { useDispatch, useSelector } from "react-redux"
import { GET_PERSONAL_DATA } from "../../redux/action/actionTypes/actionTypes";
import ReactPlayer from 'react-player/lazy';
// import DatePicker from '@mui/lab/DatePicker';
import screenfull from 'screenfull';
import { Link, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import DateFnsUtils from '@date-io/date-fns';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Form from 'react-bootstrap/Form';
// import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from "@material-ui/core/Button";
import * as images from '../images'
import UploadImage from "../../utils/CropImageUtils/upload";
import * as authService from "../../services/auth.service";
import * as alertService from '../../services/AlertService';
import "./editUserProfile.scss";
import { getUserProfileMediaAction } from '../../redux/action/authActions/authActions';
import Rightarrow from "../../../src/assets/images/mobileimages/sidebarrightarrow.svg";
import { Spinner } from 'react-bootstrap';
import { Header } from '../../components/header/header';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    }
  }),
);

export const videoExtentionType = [
  'webm',
  'flv',
  'mp4',
  'm3u8',
  'ts',
  '3gp',
  'mov',
  'avi',
  'wmv',
];

export const imgExtentionTypes = [
  'gif',
  'png',
  'jpeg',
  'jpg',
  'tif',
  'tiff',
  'wbmp',
  'webp',
  'ico',
  'icox',
  'bmp',
  'bmpx',
  'svg',
  'jng',
];


class PhotosVM {
  position: number | undefined;
  src: any | undefined;
  type: string | undefined;
  // width: number = 3;
  // height: number = 4;
}
let carouselPhotos: any = [];
let myInput: any = [];


// interface userProfileDataType {
//   company_bio: any;
//   first_name: any;
//   invest_amount_tier1: any;
//   invest_amount_tier2: any;
//   invest_benefit_tier1: any;
//   invest_benefit_tier2: any;
//   invest_description: any;
//   invest_target: any;
//   is_invest: any;
//   is_subscription: any;
//   location: any;
//   subscript_cost: any;
//   subscript_description: any;
//   subscript_discount: any;
//   passions: any;
// }
function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}
export const EditUserProfile: React.FC = () => {
  const classes = useStyles();
  const [inputAcceptType, setInputAcceptType] = useState('image/*');
  const [cropShape, setCropShape] = useState('rect');

  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [showUpload, setShow] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [userProfileData, setUserProfileData] = useState<any>({});
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState<number>(0);
  const [isFirstNameError, setIsFirstNameError] = useState<boolean>(false);
  const [country, setCountry] = useState<any>("")
  const [errMsg, setErrMsg] = useState<String>("")

  let [upload, setUpload] = useState<boolean>(false);
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  let profileDataRedux: any = useSelector((state: any) => {
    return state.authReducer?.personalData
  });

  let mediaDataRedux = useSelector((state: any) => {
    return state.authReducer?.media?.data
  })

  const history = useHistory();

  let [currentPosition, setCurrentPosition] = useState<PhotosVM>(new PhotosVM());
  let [videoElem, setVideoElem] = useState<any>();

  const [userPhotos, setUserPhotos] = useState<PhotosVM[]>([
    // { position: 1, src: '', type: '' },
    // { position: 2, src: '', type: '' },
    // { position: 3, src: '', type: '' },
    // { position: 4, src: '', type: '' }
  ]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const pageBack = () => {
    history.goBack();
  }

  const openLightbox = useCallback((item) => {
    const index = carouselPhotos.findIndex((x: any) => x.position === item.position);
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const requestFullscreen = () => {

    if (screenfull.isEnabled) {
      screenfull.request(videoElem);
    }
  }

  const videoIndex = (index: number) => {
    setVideoElem(myInput[index].getInternalPlayer());
  }

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const isToggleUploadPic = (cropShape: string, acceptType: string) => {
    setCropShape(cropShape);
    setInputAcceptType(acceptType);
    setShow(!showUpload);
  }

  const Passions: any = [
    { id: 1, title: 'Yoga' },
    { id: 2, title: 'Fitness' },
    { id: 3, title: 'Nutrition' },
    { id: 4, title: 'Beauty' },
    { id: 5, title: 'Wine' },
    { id: 6, title: 'Shoes' },
  ]
  const [passions, setPassions] = useState<any>()


  const onMediaUpload = (item: PhotosVM) => {
    if (item) setCurrentPosition(item);
    setSelectedFileName('media-file-upload');
    isToggleUploadPic('rect', 'image/*,video/*');
  }

  // const onSortEnd = ({ oldIndex, newIndex }: any) => {
  //   setUserPhotos(arrayMove(userPhotos, oldIndex, newIndex));
  // };

  const onFileChange = async (e: any) => {
    setSelectedFileName(e.target.name);
    if (e.target.name === 'userPic') {
      isToggleUploadPic('round', 'image/*');
    } else {
      isToggleUploadPic('rect', 'image/*');
    }
    // if (e.target.files && e.target.files.length > 0) {
    //   const file = e.target.files[0];
    //   const name: string = e.target.name;
    //   const imageURI: any = await readFile(file);
    //   if (name === 'media-file-upload') {
    //     // userPhotos.push({
    //     //   src: imageURI,
    //     //   width: 3,
    //     //   height: 3
    //     // })
    //     setUserPhotos([...userPhotos]);
    //   } else {
    //     setUserMedia({ ...userMedia, [name]: imageURI });
    //   }
    // }
  }


  const getVideoURI = (vedioURI: File) => {
    uploadUserMedia(vedioURI, vedioURI);
    // setShow(false);
    // currentPosition.src = vedioURI;
    // userPhotos.filter(x => {
    //   if (x.position === currentPosition.position) {
    //     x.src = vedioURI;
    //     x.type = 'video';
    //   }
    //   return x;
    // });
    // setUserPhotos([...userPhotos]);
    // setShow(false);
  }

  const uploadUserPic = async (thumbmail: File, original: File) => {
    /* Upload user pic & cover pic */

    try {
      let formData = new FormData()
      if (selectedFileName === 'userPic') {
        formData.append("profile_image", thumbmail);
        formData.append("profile_thumbnail", thumbmail);
      } else {
        formData.append("cover_image", thumbmail);
      }

      authService.uploadUserProfiles(formData, (event: any) => {

        setProgress(Math.round((100 * event.loaded) / event.total));
      }).then((response: any) => {
        if (response) {
          dispatch({ type: GET_PERSONAL_DATA, payload: response });
          setProgress(0);
          // alertService.success(response.data.message);
          setUserProfileData({ ...userProfileData, ...response.data.data });
          setUpload(true)
          setShow(false);
        }
      }).catch(() => {
        setProgress(0);
        setShow(false);
        setUpload(true)
      });
    } catch (err) {
      setUploadingFile(false);
      setUpload(true)
    }
  }

  const uploadUserMedia = async (thumbmail: File, original: File) => {
    /* Upload media files */
    // debugger
    try {
      let formData = new FormData()
      formData.append("file", thumbmail);

      authService.uploadMedia(formData, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }).then((response: any) => {
        if (response) {
          setProgress(0);
          // alertService.success(response.data.message);
          setShow(false);
          getMedia();
          // setClose(true);
          setUpload(true)
        }
      }).catch(() => {
        setProgress(0);
        setShow(false);
        // setClose(true)
        setUpload(true)
      });
    } catch (err) {
      // setUploadingFile(false);
      // setClose(true)
      setUpload(true)
    }
  }

  const getCroppedImage = async (thumbmail: File, original: File) => {
    // let imageDataUrl = await readFile(file);
    if (selectedFileName === 'media-file-upload') {
      uploadUserMedia(thumbmail, original);
      // currentPosition.src = imageDataUrl;
      // userPhotos.filter(x => {
      //   if (x.position === currentPosition.position) {
      //     x.src = imageDataUrl;
      //     x.type = 'image';
      //   }
      //   return x;
      // });
      // const availablePhotos = userPhotos.filter(x => (x.src && x.type === 'image'));
      // carouselPhotos = availablePhotos;
      // setUserPhotos([...userPhotos]);
    } else {
      uploadUserPic(thumbmail, original);
      // setUserMedia({ ...userMedia, [selectedFileName]: imageDataUrl });
    }
  }

  const getMediaData = (media: any) => {
    let data: any = [];
    if (media) {
      media.filter((item: any, i: number) => {
        const splitLink = item.file.split('.');
        const ext = splitLink[splitLink.length - 1];

        if (videoExtentionType.includes(ext)) {
          return data.push({ src: item.file, type: 'video', position: i });
        } else if (imgExtentionTypes.includes(ext)) {
          return data.push({ src: item.file, type: 'image', position: i });
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

  useEffect(() => {
    window.scrollTo(0, 1)
    const getProfileU = async () => {
      try {
        const response: any = await authService.getProfile();
        const data = response.data.data;
        if (!data?.passions) {
          (data.passions = []);
        }
        setUserProfileData({ ...data });
        setCountry(data?.country)
      } catch (err) {
        console.log(err)
      }
    }
    const setProfileUfromRedux = () => {
      const data = profileDataRedux?.data?.data;
      // console.log(data)
      // let data = profileDataRedux?.config?.data;
      // data = JSON.parse(data);
      // console.log(data);
      if (!data?.passions) {
        data.passions = [];
      }
      setUserProfileData({ ...data });
    }
    profileDataRedux ? setProfileUfromRedux() : getProfileU();
    mediaDataRedux ? getMediaData(mediaDataRedux) : getMedia();
  }, [setUserProfileData, profileDataRedux]);

  const setIsInvestActive = (e: any) => {
    try {
      const key = e.target.name;
      const payload = {
        [key]: e.target.checked
      }

      setUserProfileData({ ...userProfileData, [key]: e.target.checked });
      authService.uploadUserProfiles(payload, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }).then((response: any) => {
        if (response) {
          setUserProfileData({ ...response.data.data });
          // alertService.success(response.data.message);
          setUpload(true)
        }
      }).catch(() => {

      });
    } catch (err) {

    }
  }
  const onTextChange = (e: any) => {
    if (userProfileData?.first_name) {
      setIsFirstNameError(false);
    }
    const key = e.target.name;
    setUserProfileData({ ...userProfileData, [key]: e.target.value });
  }


  const saveProfile = async () => {
    // if (!userProfileData?.first_name) {
    //   setIsFirstNameError(true);
    //   return
    // }
    if (!country) {
      setErrMsg("Country field may not be blank")
      return;
    }
    setIsSubmitting(true)
    const data = {
      company_bio: userProfileData.company_bio,
      // first_name: userProfileData.first_name,
      invest_amount_tier1: userProfileData.invest_amount_tier1,
      invest_amount_tier2: userProfileData.invest_amount_tier2,
      invest_benefit_tier1: userProfileData.invest_benefit_tier1,
      invest_benefit_tier2: userProfileData.invest_benefit_tier2,
      invest_description: userProfileData.invest_description,
      invest_target: userProfileData.invest_target,
      is_invest: userProfileData.is_invest,
      is_subscription: userProfileData.is_subscription,
      location: userProfileData.location,
      subscript_cost: userProfileData.subscript_cost,
      subscript_description: userProfileData.subscript_description,
      subscript_discount: userProfileData.subscript_discount,
      passions: passions,
      country: country
      // passions:Passions
    }

    try {
      const response: any = await authService.updateProfile(data);
      if (response)
        dispatch({ type: GET_PERSONAL_DATA, payload: response });
      setIsSubmitting(false)
      // alertService.success(response.data.message);
    } catch (err) {
      console.log(err)
      setIsSubmitting(false)
    }
  }

  // const setVideoRefs = (input: any, item: any, i: number) => {
  //   console.log(input);
  // }
  //  for country on change function
  const onCountryChange = (event: any) => {
    setErrMsg("")
    setCountry(event)

  }

  //  for country on change function end
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <>
      <UploadImage
        show={showUpload}
        isToggleUploadPic={isToggleUploadPic}
        getCroppedImage={getCroppedImage}
        getVideoURI={getVideoURI}
        uploadingFile={uploadingFile}
        setUploadingFile={setUploadingFile}
        inputAccept={inputAcceptType}
        cropShape={cropShape}
        progress={progress}
        upload={upload}
        setUpload={setUpload}
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

      <div className="mobilemaincontainer">
        <div className="mobile_container">
          <div className="sabrinamainscroll create_page">
            <Header
              title='Edit profile'
              back={true}
              enableback={pageBack}
              next={isSubmitting
                // ? <Spinner animation="border" />
                ? <Spinner className="spinner-offer" animation="grow" variant="primary" />
                : 'Save'}
              enablenext={!isSubmitting && saveProfile}
            />
            {/* <h1 className="pl-3 pt-3 d-inline-block">
              <img src={images.blackarrow} alt="back" onClick={pageBack} className="cursor-pointer pr-3" />
              Edit profile
            </h1>

            <Button variant="outlined" color="primary" className="btn-right"
              onClick={saveProfile}>
              {isSubmitting
                ? <Spinner animation="border" />
                : 'Save'}
            </Button> */}

            <form>
              <div className="bg_image">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    <input type='text' id="cover-page"
                      name="coverPic"
                      onClick={onFileChange}
                    />
                    <label htmlFor="cover-page"></label>
                  </div>
                  <div className="avatar-preview">
                    <img
                      src={userProfileData?.cover_image ? userProfileData?.cover_image : images.userbg}
                      className="profile-user-img" alt="cover" />
                  </div>
                </div>
              </div>

              <div className="profile_content">
                <Container>
                  <div className="user_image">
                    <div className="avatar-upload">
                      <div className="avatar-edit">
                        <input type='text' id="user-pic"
                          name="userPic"
                          accept="image/*"
                          onClick={onFileChange}
                        />
                        <label htmlFor="user-pic"></label>
                      </div>
                      <div className="avatar-preview imgpreview">
                        <img
                          src={userProfileData?.profile_image ?
                            userProfileData?.profile_image : images.mobheader1}
                          className="profile-user-img" alt="" />
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* <span className="account_span">
                      account verified
                      <img src={images.verify} className="text-right" alt="varify" />
                    </span> */}

                    <div className="mobileloginform_material p-0 pr-1">
                      {/* <div className="input-wrapper">
                        {/* <FormControl fullWidth >
                          <TextField id="outlined-basic" label="Name" variant="outlined"
                            style={{ border: isFirstNameError ? '1px solid red' : 'none' }}
                            placeholder="Enter your name"
                            name="first_name"
                            required
                            value={userProfileData?.first_name}
                            onChange={onTextChange}
                            size="small"
                          />
                        </FormControl> */}
                      {/* <label htmlFor="user">Name</label> */}
                      {/* </div>  */}

                      <div className="input-wrapper">
                        <FormControl fullWidth >
                          <TextField id="outlined-basic" label="username" variant="outlined" name="username" placeholder="Enter username"
                            disabled
                            value={userProfileData?.username}
                            onChange={onTextChange}
                            size="small"
                          />
                          {/* <label htmlFor="username">user name</label> */}
                        </FormControl>
                      </div>
                      <br />
                      <br />

                      <div className="datepicker_select">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="D.O.B."
                            value={selectedDate}
                            onChange={(newValue) => {
                              setSelectedDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>

                      <div className="mt-3 mb-3">
                        <FormControl fullWidth >
                          <TextField id="outlined-basic" label="Write about"
                            variant="outlined"
                            required
                            multiline
                            rows={2}
                            name="company_bio"
                            value={userProfileData?.company_bio}
                            onChange={onTextChange}
                          />
                          {/* <label htmlFor="bio">bio</label> */}
                        </FormControl>
                      </div>
                      <div className="text-field-material text-fieldcustom">
                        {/* <FormControl fullWidth >
                          <TextField id="outlined-basic" label="location" variant="outlined"

                            placeholder="Enter location" required
                            name="location"
                            value={userProfileData?.location}
                            onChange={onTextChange}
                            size="small"
                          />
                        </FormControl> */}
                        {/* <label htmlFor="location">location</label> */}

                        <FormControl
                          variant="outlined"
                          className="w-100 login-selectcity"
                        >
                          {/* <InputLabel htmlFor="outlined-age-native-simple">
                      Choose country
                    </InputLabel> */}
                          {/* <Select
                      native
                      label="Choose country"
                      className="select_material"
                      value={signupForm.country}
                      inputProps={{
                        name: "country",
                        id: "outlined-age-native-simple"
                      }}
                      onChange={(event: any) => onInputChangeSignup(event)}
                    >
                      <option value={""}></option>
                      <option value={"India"}>India</option>
                      <option value={"USA"}>USA</option>
                      <option value={"Spain"}>Spain</option>
                    </Select> */}

                          <Autocomplete
                            id="country-select-demo"
                            // style={{ width: 300 }}
                            options={countries as CountryType[]}
                            classes={{
                              option: classes.option,
                            }}
                            inputValue={country}
                            onInputChange={(e: any, value: any) => onCountryChange(value)}
                            // onInputChange={(e: any, value: any) => setSignupForm({ ...signupForm, ['country']: value })}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(option) => (
                              <React.Fragment>
                                <span>{countryToFlag(option.code)}</span>
                                {option.label} ({option.code}) +{option.phone}
                              </React.Fragment>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Choose country"
                                variant="outlined"
                                name="country"
                                className="select_material material_select_input"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                        </FormControl>


                      </div>
                      <span className="text-danger error-spanfeild">
                        {errMsg}
                      </span>
                      {/* {
                        userProfileData &&
                        (userProfileData?.passions) &&

                        <Autocomplete
                          multiple
                          id="checkboxes-tags-demo"
                          options={Passions}
                          // defaultValue={Passions}
                          defaultValue={userProfileData?.passions}
                          onChange={(e, value) => { setPassions(value) }}
                          disableCloseOnSelect
                          getOptionSelected={(option, value) => option.id === value.id}
                          getOptionLabel={(option: any) => option.title}
                          renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.title}
                            </React.Fragment>
                          )}
                          style={{ width: 340, marginTop: 33, }}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Passions"
                              placeholder="Favorites" />
                          )}
                        />

                      } */}

                      <h5 className="mt-4 mb-3 pl-2">media</h5>

                      {/* <PhotoGallery photos={userPhotos} onSortEnd={onSortEnd} /> */}
                      {/* <Player
                        playsInline
                        preload="auto"
                        src="http://vjs.zencdn.net/v/oceans.mp4"
                      /> */}

                      <div className="mr-4">
                        <Row className="mb-3">
                          {
                            userPhotos?.map((item: PhotosVM, i: number) => {
                              let imageSecion;
                              if (item.src && item.type === 'image') {
                                imageSecion = (<Col md={6} xs={6}>
                                  <div className="mediaprofile_section" key={i}>
                                    <div className="image_upload">
                                      <img src={item.src} className="media1" alt=""
                                        onClick={() => openLightbox(item)}
                                      />
                                      <span className="cross_img">
                                        <img src={images.cross} alt="cross" />
                                      </span>
                                    </div>
                                  </div>
                                </Col>)
                              } else if (item.src && item.type === 'video') {
                                imageSecion = (<Col md={6} xs={6}>
                                  <div className="mediaprofile_section" key={i}>
                                    <div className="image_upload" onClick={() => videoIndex(i)}>
                                      <ReactPlayer
                                        ref={(input) => { myInput[i] = input }}
                                        // ref={playerRef}
                                        url={item.src}
                                        width='100%'
                                        height='100%'
                                        muted={false}
                                        controls={true}
                                        onPlay={requestFullscreen}
                                      />

                                      <span className="cross_img">
                                        <img src={images.cross} alt="cross" />
                                      </span>
                                    </div>
                                  </div>
                                </Col>)
                              } else {
                                imageSecion = (<Col md={6} xs={6}>
                                  <div className="mediaprofile_section" onClick={() => onMediaUpload(item)}>
                                    {/* onClick={() => mediaInputFile.current.click()} */}
                                    {/* <input type="file"
                                      ref={mediaInputFile}
                                      className='media-file-upload'
                                      name="media-file-upload"
                                      accept="video/*,image/*"
                                      onChange={onFileChange}
                                    /> */}
                                    <span><img src={images.plus} alt="" /></span>
                                  </div>
                                </Col>
                                )
                              }
                              return imageSecion;
                            })
                          }
                        </Row>
                        {/* <Button variant="contained" className="default_btn1 mt-3 mb-4">hold & drag your photos to change the order</Button> */}
                      </div>

                      <div className="subscription">
                        <Form>
                          <Form.Check
                            checked={userProfileData?.is_loyalty}
                            type="switch"
                            name="is_loyalty"
                            id="custom-switch3"
                            label="loyalty"
                            onChange={(e: any) => { setIsInvestActive(e) }}
                          />


                          {userProfileData?.is_loyalty && <div className="loyalty_reward_section mt-3">
                            <p>
                              <Link to="/set/loyality">
                                setup loyalty rewards

                                <img src={Rightarrow} alt="" className="pull-right pr-4" />
                              </Link>
                            </p>
                          </div>}
                        </Form>
                      </div>

                      <div className="section_border mt-3 mb-3"></div>

                      <div className="subscription">
                        <Form>
                          <Form.Check
                            checked={userProfileData?.is_subscription}
                            type="switch"
                            name="is_subscription"
                            id="custom-switch"
                            label="subscription"
                            onChange={(e: any) => { setIsInvestActive(e) }}
                          />
                        </Form>

                        {userProfileData?.is_subscription && <div className="loyalty_reward_section mt-3">
                          <p>
                            <Link to="/edit-user-profile/subscription">
                              setup Subscription
                              <img src={Rightarrow} alt="" className="pull-right pr-4" />
                            </Link>
                          </p>
                        </div>}

                      </div>
                      <div className="section_border"></div>

                      <div className="invest mt-3">
                        <Form>
                          <Form.Check
                            checked={userProfileData?.is_invest}
                            name="is_invest"
                            type="switch"
                            id="custom-switch1"
                            label="invest in me"
                            onChange={(e: any) => { setIsInvestActive(e) }}
                          />
                        </Form>
                        {userProfileData?.is_invest && <div className="loyalty_reward_section mt-3">
                          <p>
                            <Link to="/invest/me">
                              Invest me

                              <img src={Rightarrow} alt="" className="pull-right pr-4" />
                            </Link>
                          </p>
                        </div>}

                      </div>

                      <div className="section_border mt-4"></div>

                      {/* <h5 className="mt-4 mb-3 pl-2 linkhead">
                        Linked accounts
                      </h5> */}

                      {/* <Button className="gradient1">
                        <img src={images.instagram} className="pr-2" alt="" />
                        connect your instagram
                        <span className="text-right">
                          <img src={images.right} className="pr-2" alt="" />
                        </span>
                      </Button> */}

                      {/* <Button className="gradient2 mt-3 mb-4">
                        <img src={images.youtube} className="pr-2" alt="youtube" />
                        connect your youtube
                        <span className="text-right">
                          <img src={images.right} className="pr-2" alt="" />
                        </span>
                      </Button> */}
                    </div>
                  </div>
                </Container>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
interface CountryType {
  code: string;
  label: string;
  phone: string;
}
const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  { code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
  { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
  { code: 'CF', label: 'Central African Republic', phone: '236' },
  { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
  { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  { code: 'FR', label: 'France', phone: '33', suggested: true },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  { code: 'PS', label: 'Palestine, State of', phone: '970' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
  { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
  { code: 'TD', label: 'Chad', phone: '235' },
  { code: 'TF', label: 'French Southern Territories', phone: '262' },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
  { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

