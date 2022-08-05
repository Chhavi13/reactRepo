import React, { useState, ChangeEvent, useEffect } from 'react';
import { CREATE_OFFER_OBJECT } from '../../redux/action/actionTypes/getOfferActionsTypes';
import { useSelector, useDispatch } from "react-redux"
import { Header } from '../../components/header/header';
import { useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

import "./newList.scss";
import { GoogleMaps } from '../../components/Autocomplete/Autocomplete';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
// import AddLocationAltOutlinedIcon from '@material-ui/icons/AddLocationAltOutlined';
import PermCameraMicOutlinedIcon from '@material-ui/icons/PermCameraMicOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import SpeedIcon from '@material-ui/icons/Speed';

class createOffer {
  expires_at: any;
  is_subscribed: boolean = false;
  is_private: boolean = false;
  cost: any;
  is_allow_tips: boolean = false;
  units: any;
  is_virtual_delivery: boolean = false;
  offer_location: any;
  is_physical_delivery: boolean = false;
  is_cost: boolean = false;
  is_location: boolean = false;
  is_units: boolean = false;
  is_expiry: boolean = false;
  is_allow_manage_store: boolean = false;
  disclaimer: any = null;
}

export const NewList = ({ onDataHandles, base64ImagesURI, actualAPIFiles, pageData,
  pageBack }: any) => {
  const dispatch = useDispatch()
  const history = useHistory();
  let [uriImages, setURIImages] = useState([])
  let [apiImages, setApiImages] = useState<any>([])
  let [advanceFormData, setAdvanceFormData] = useState<createOffer>(new createOffer());
  const [mapLocation, setMapLocation] = useState<any>();

  const createOfferStoreData = useSelector((state: any) => {
    return state?.getOfferReducer?.data;
  });

  const handleLocation: any = (loc: any) => {
    setMapLocation(loc);
    let newState = {};
    newState = { ...advanceFormData, ['offer_location']: loc }
    dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
    setAdvanceFormData({ ...advanceFormData, ...newState });
  }

  // const userProfileData = useSelector((state: any) => {
  //   return state.authReducer?.personalData?.data?.data;
  // });

  useEffect(() => {
    window.scrollTo(0, 1);
    if (base64ImagesURI)
      setURIImages(base64ImagesURI)

    if (actualAPIFiles)
      setApiImages(actualAPIFiles)

    if (createOfferStoreData) {
      if (createOfferStoreData && createOfferStoreData.expires_at) {
        setSelectedDate(createOfferStoreData['expires_at']);
      }
      console.log('###' , createOfferStoreData);
      setAdvanceFormData(createOfferStoreData);
    }
  }, [pageBack])

  // Upload file handleclick
  const hiddenFileInput = React.useRef<any>(null);
  const fileUpload = () => {
    hiddenFileInput.current.click();
  }

  // const handleFileChange = (e: any) => {
  //   const file = e.target.files;
  //   if (!file) {
  //     return;
  //   }
  //   // for image compress
  //   const arrayFile: any = Array.from(file)

  //   // for object images
  //   arrayFile?.map((file: any, i: number) => {
  //     return new Promise(() => {
  //       new Compressor(file, {
  //         quality: 0.2,
  //         success: (compressedResult) => {
  //           const blobToFile = new File([compressedResult], file.name, { type: file.type });
  //           setApiImages((prevapiImages: any) => prevapiImages.concat(blobToFile));

  //           /*covert to base64*/
  //           const reader = new FileReader()
  //           reader.readAsDataURL(compressedResult)
  //           reader.onload = function (e: any) {
  //             let resuts = e.target.result;
  //             setURIImages(images => images.concat(resuts))
  //           };
  //           /*covert to base64*/
  //         },
  //       });
  //     });
  //   });
  // }

  // const deleteImage = (i: any) => {
  //   uriImages.splice(i, 1);
  //   setURIImages([...uriImages])
  //   apiImages.splice(i, 1);
  //   setApiImages([...apiImages])
  // }

  // let photo: any = uriImages.map((image: any, i: number) => {
  //   return (
  //     <>
  //       <li className='media-images' key={i}>
  //         <img src={image} className="media1" />
  //         <div className="cross_imge">
  //           <img src={crossnew} onClick={() => deleteImage(i)} />
  //         </div>
  //       </li>
  //     </>
  //   )
  // })

  // const filterPassedTime = (time: any) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);
  //   return currentDate.getTime() < selectedDate.getTime();
  // };

  // const setStartDate = (date: Date) => {
  //   setFormData({ ...formData, ['expires_at']: date });
  // }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    var newState: any = {};
    if (e.target.id.includes("custom-switch")) {
      if (name === 'set_visibility') {
        if (e.target.checked) { // private
          advanceFormData.is_allow_manage_store = false;
          advanceFormData.is_subscribed = false;
        }
      
        // eslint-disable-next-line no-useless-computed-key
        newState = { ...advanceFormData, ['is_private']: e.target.checked };
      } else if (newState.is_allow_manage_store || name === 'is_allow_manage_store') {
        advanceFormData.is_private = false;
        // eslint-disable-next-line no-useless-computed-key
        newState = { ...advanceFormData, ['is_allow_manage_store']: e.target.checked };
      } else {
        newState = { ...advanceFormData, [name]: e.target.checked };
      }
    } else {
      newState = { ...advanceFormData, [name]: e.target.value };
    }
    dispatch({ type: CREATE_OFFER_OBJECT, payload: newState });
    setAdvanceFormData({ ...advanceFormData, ...newState });
    // onDataHandles(newState, uriImages, apiImages);
  }

  // onDataHandles(formData, uriImages, apiImages);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date: any) => {
    setAdvanceFormData({ ...advanceFormData, ['expires_at']: date });
    dispatch({ type: CREATE_OFFER_OBJECT, payload: { ...createOfferStoreData, ['expires_at']: date } });
    setSelectedDate(date);
  };

  const onPageBack = () => {
    history.goBack()
  }

  return (
    <div className="mobilemaincontainer">

      <div className="mobile_container pt-2">
        <Header 
        title={'Advanced'} 
        back={true} 
        enableback={onPageBack} 
        next='Save'
        enablenext={onPageBack}
        />
        <div className="detail_list_box_page">
          <Form>
            {/* <div className="box_list">
              <Row>
                <Col md={10} xs={10} className="pr-0">

                  <LazyLoadImage
                    src={userProfileData?.profile_image ?
                      userProfileData?.profile_image : profile}
                    className="d-inline-block userImg mt-0"
                    alt="Image"
                  />

                  <Form.Group className="mb-3 d-inline-block textarea_box">
                    <Form.Control as="textarea"
                      value={formData?.offer_title}
                      name="offer_title"
                      onChange={(event: any) => onInputChange(event)}
                      placeholder="Write a title..."
                      rows={3} />
                  </Form.Group>
                </Col>

                <Col md={2} xs={2} className="toggle-btn-offer" className="pr-2 pl-0 text-right">
                  <input type="file"
                    multiple
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img src={selectimg} className="img_select" onClick={fileUpload} />
                </Col>
              </Row>
            </div>
            {uriImages.length > 0 &&
              <div className="media_gallery">
                <ul className="pl-0 available-items">
                  {photo}
                </ul>
              </div>
            }

            <div className="box_list">
              <Form.Group className="textarea_box w-100" >
                <Form.Control as="textarea"
                  onChange={(event: any) => onInputChange(event)}
                  name="offer_bio"
                  value={formData?.offer_bio}
                  className="p-0"
                  placeholder="Blurb...." />
              </Form.Group>
            </div> */}

            <div className="box_list mt-2">
              <div className="profile_content">
                <Row>
                  <Col md={10} xs={10}>
                    <label>set visibility to private</label>
                    <p>
                      setting visibility to private requires your fans to purchase content
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={advanceFormData?.is_private}
                      id="custom-switch-1"
                      onChange={(event: any) => { onInputChange(event) }}
                      color="primary"
                      name='set_visibility'
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            <div className="box_list">
              <div className="profile_content">
                <Row>
                  <Col md={10} xs={10}>
                    <label>price</label>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={advanceFormData?.is_cost}
                      name="is_cost"
                      id="custom-switch-9"
                      onChange={(event: any) => { onInputChange(event) }}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>

                <div className={advanceFormData?.is_cost ? "select_cost_name pb-0" : "d-none"} >
                  <div className="select_cost">
                    <Form.Group controlId="exampleForm.ControlSelect1" className="select_name">
                      <Form.Control as="select">
                        <option>HKD</option>
                        <option>INR</option>
                      </Form.Control>
                    </Form.Group>
                    <div className="boxinput_field">
                      <Form.Group className={advanceFormData?.is_cost ? "mb-0 d-inline-block" : "d-none"}>
                        <Form.Control type="text" value={advanceFormData?.cost}
                          onChange={(event: any) => onInputChange(event)}
                          name="cost"
                          placeholder="Enter cost" />
                      </Form.Group>
                      <p className="pl-3">
                        set the price of your offers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box_list">
              <div className="profile_content img_content_box cost_switch p-0">
                <Row>
                  <Col md={10} xs={10}>
                    <span className="icon_same">
                      <MonetizationOnOutlined />
                    </span>
                    <label className="second_child_label">allow tips</label>
                    <p className="para-line">
                      allow your fans to appreciate you by giving you tips
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={advanceFormData?.is_allow_tips}
                      id="custom-switch-4"
                      onChange={(e: any) => { onInputChange(e) }}
                      color="primary"
                      name="is_allow_tips"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* <div className="box_list">
              <div className="profile_content">
                <Row>
                  <Col md={10} xs={10}>
                    <label>units</label>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={formData?.is_units}
                      id="custom-switch-5"
                      name="is_units"
                      onChange={(e: any) => { onInputChange(e) }}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>

                <div className="boxinput_field pl-0">
                  <span className={formData?.is_units ? "icon_same" : "d-none"}>
                    <SpeedIcon />
                  </span>
                  <Form.Group className={formData?.is_units ? "mb-0 d-inline-block" : "d-none"}>
                    <Form.Control type="text"
                      value={formData?.units}
                      onChange={(event: any) => onInputChange(event)}
                      name="units"
                      placeholder="Enter units" />
                  </Form.Group>
                  <p>
                    Set the number of units you want to sell
                  </p>
                </div>
              </div>
            </div> */}

            {/* <div className="box_list expiry_contentbox">
              <div className="profile_content pb-0">
                <Row>
                  <Col md={10} xs={10}>
                    <label>expiry</label>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={formData?.is_expiry}
                      id="custom-switch-6"
                      name="is_expiry"
                      onChange={(e: any) => { onInputChange(e) }}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
                <div className="expiry_content pl-0">
                  <div className={formData?.is_expiry ? "expiry_date" : "d-none"}>
                    <span className="icon_same">
                      <EventOutlinedIcon />
                    </span>
                    <label className="pl-3 date_label1 second_child_label">Date and Time</label>
                    <div className="expiry_right expiry_inputboxdiv">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          margin="normal"
                          id="date-picker-dialog"
                          disablePast
                          format="MM/dd/yyyy, hh:mm a"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                </div>
                <p>set expiry date and time for your offer</p>
              </div>
            </div> */}

            {/* <div className="box_list">
              <div className="profile_content">
                <label> delivery</label>
                <Row className="mt-3">
                  <Col md={10} xs={10}>
                    <span className="icon_same mr-2">
                      <PermCameraMicOutlinedIcon />
                    </span>
                    <label className="top_head">virtual</label>
                    <p className="para-line1 mt-0">
                      Your offer is deliver virtually eg. Online class, Live Stream, Content etc.
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={formData?.is_virtual_delivery}
                      id="custom-switch-7"
                      onChange={(event: any) => onInputChange(event)}
                      color="primary"
                      name="is_virtual_delivery"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
              </div>

              <div className="border_list"></div>

              <div className="profile_content img_content_box mt-2">
                <Row>
                  <Col md={10} xs={10}>
                    <span className="icon_same mr-2">
                      {formData.is_location ? <AddLocationIcon /> : <RoomOutlinedIcon />}
                    </span>
                    <label className="top_head">location</label>
                    <p className="para-line1 mt-0">
                      Your offer is valid for a physical location eg. class in a gym
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={formData?.is_location}
                      name="is_location"
                      onChange={(event: any) => onInputChange(event)}
                      id="custom-switch-8"
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
                <div className={formData?.is_location ? "mb-0 mt-3 d-block" : "d-none"}>
                  <GoogleMaps
                    handleLocation={handleLocation}
                  />
                </div>
              </div>

              <div className="border_list"></div>

              <div className="profile_content mt-2">
                <Row>
                  <Col md={10} xs={10}>
                    <span className="icon_same mr-2">
                      <LocalMallOutlinedIcon />
                    </span>
                    <label className="top_head">physical</label>
                    <p className="para-line1 mt-0">
                      You are selling a product which requires physical delivery
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={formData?.is_physical_delivery}
                      id="custom-switch-9"
                      onChange={(event: any) => onInputChange(event)}
                      color="primary"
                      name="is_physical_delivery"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
              </div>
            </div> */}

            {/* <div className="box_list">
              <div className="profile_content">
                <Row>
                  <Col md={10} xs={10}>
                    <label>Manage Order</label>
                    <p>
                      Not valid for private content manage your orders with flexibility via management
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked={formData?.is_allow_manage_store}
                      id="custom-switch-3"
                      onChange={(event: any) => { onInputChange(event) }}
                      color="primary"
                      name="is_allow_manage_store"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Col>
                </Row>
              </div>
            </div> */}

            {/* <div className="box_list">
              <div className="profile_content">
                <Row>
                  <Col md={10} xs={10}>
                    <label>scheduling</label>
                    <p>
                      Automate scheduling with time slots
                    </p>
                  </Col>
                  <Col md={2} xs={2} className="toggle-btn-offer">
                    <Switch
                      checked
                      id="custom-switch-11"
                      color="primary"
                    />
                  </Col>
                </Row>
              </div>
            </div> */}


            <div className="box_list additional_textarea">
              <h5>Disclaimer</h5>
              <textarea 
                value={advanceFormData?.disclaimer}
                name="disclaimer" 
                placeholder="Notes...."
                onChange={(event: any) => { onInputChange(event) }}>
              </textarea>
            </div>
          </Form>
        </div>
      </div>
    </div>

  )
}