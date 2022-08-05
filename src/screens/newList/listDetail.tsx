import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from "react-redux"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Right from "../../assets/images/mobileimages/chevron-right.svg";
import Location from "../../assets/images/mobileimages/location2.svg";
import profile from "../../assets/images/mobileimages/sbrinaprofile.png";
import selectimg from "../../assets/images/mobileimages/selectimg.svg";
import "./listDetail.scss";
import TabIcon from '../tabs/tabs';
import crossnew from "../../assets/images/mobileimages/cross.svg";
import Compressor from 'compressorjs';


class createOffer {
  expires_at: any;
  offer_title: any;
  offer_bio: any;
  is_subscribed: boolean = false;
  is_private: boolean = false;
  cost: any;
  is_allow_tips: boolean = false;
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
}

export const ListDetail = ({ onDataHandles, base64ImagesURI, actualAPIFiles, pageData,
  pageBack }: any) => {


  let [uriImages, setURIImages] = useState([])
  let [apiImages, setApiImages] = useState<any>([])
  let [formData, setFormData] = useState<createOffer>(new createOffer());


  // const handleLocation: any = (loc: any) => {
  //   setMapLocation(loc)
  //   console.log('---', mapLocation)
  //   let newState = {}
  //   newState = { ...formData, ['offer_location']: loc }
  //   setFormData({ ...formData, ...newState })
  //   onDataHandles(newState);
  //   console.log('formData', formData)
  // }


  const userProfileData = useSelector((state: any) => {
    return state.authReducer?.personalData?.data?.data;
  });

  useEffect(() => {
    window.scrollTo(0, 1)
    if (base64ImagesURI)
      setURIImages(base64ImagesURI)

    if (actualAPIFiles)
      setApiImages(actualAPIFiles)

    if (pageData) {
      if (pageData && pageData.expires_at) {
        setSelectedDate(pageData['expires_at']);
      }
      setFormData(pageData);
    }
  }, [pageBack])



  // Upload file handleclick
  const hiddenFileInput = React.useRef<any>(null);
  const fileUpload = () => {
    hiddenFileInput.current.click();
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files;
    if (!file) {
      return;
    }
    // for image compress
    const arrayFile: any = Array.from(file)

    // for object images
    arrayFile?.map((file: any, i: number) => {
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
              let resuts = e.target.result;
              setURIImages(images => images.concat(resuts))
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
            <img src={crossnew} onClick={() => deleteImage(i)}  alt=""/>
          </div>
        </li>
      </>
    )
  })

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const setStartDate = (date: Date) => {
    setFormData({ ...formData, ['expires_at']: date });
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    var newState: any = {};
    if (e.target.id.includes("custom-switch")) {
      if (newState.is_private || name === 'is_private') {
        formData.is_subscribed = false;
        formData.is_allow_manage_store = false;
        newState = { ...formData, ['is_private']: e.target.checked };
      } else if (newState.is_subscribed || name === 'is_subscribed') {
        formData.is_private = false;
        newState = { ...formData, ['is_subscribed']: e.target.checked };
      }else if (newState.is_allow_manage_store || name === 'is_allow_manage_store') {
        formData.is_private = false;
        newState = { ...formData, ['is_allow_manage_store']: e.target.checked };
      } else {
        newState = { ...formData, [name]: e.target.checked };
      }
    } else {
      newState = { ...formData, [name]: e.target.value };
    }
    setFormData({ ...formData, ...newState });
    onDataHandles(newState, uriImages, apiImages);
  }

  // onDataHandles(formData, uriImages, apiImages);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date: any) => {
    setFormData({ ...formData, ['expires_at']: date });
    setSelectedDate(date);
  };

  return (
      <>
    <div className="list_page list_detail_page pt-2">
      <div className="">
        <Form>
            <div className="box_list">
              <Row>
                <Col md={9} xs={9} className="pr-0">

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

                <Col md={3} xs={3} className="pr-2 pl-0 text-right">
                  <input type="file"
                    multiple
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img src={selectimg} className="img_select" onClick={fileUpload} alt="" />
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
                  placeholder="Write a Blurb..." />
              </Form.Group>
            </div>


            <div className="box_list">
                <Row>
                    <Col md={4} xs={4}>
                        <h5 className="m-0">
                        audience
                        </h5>
                    </Col>
                    <Col md={8} xs={8} className="text-right detail_Col">
                        <p className="d-inline-block detail_text">
                            All
                        </p>
                        <img src={Right} className="ml-2" alt=""/>
                    </Col>
                </Row>
            </div>

            <div className="box_list">
                <Row>
                    <Col md={4} xs={4}>
                        <h5 className="m-0">
                        details
                        </h5>
                    </Col>
                    <Col md={8} xs={8} className="text-right detail_Col">
                        <img src={Right} className="" alt=""/>
                    </Col>
                </Row>

                <div className="detail_content1 mt-4">
                    <Row>
                        <Col md={4} xs={4} className="text-left">
                            <h6>
                            visibility:
                            </h6>
                        </Col>
                        <Col md={8} xs={8} className="text-right">
                            <p>
                            only subscribers
                            </p>
                        </Col>
                    </Row>
                </div>

                <div className="detail_content1 mt-4">
                    <Row>
                        <Col md={4} xs={4} className="text-left">
                            <h6>
                            cost:
                            </h6>
                        </Col>
                        <Col md={8} xs={8} className="text-right">
                            <p>
                            HK$ 1000000.00 
                            </p>
                        </Col>
                    </Row>
                </div>

                <div className="detail_content1 mt-4">
                    <Row>
                        <Col md={4} xs={4} className="text-left">
                            <h6>
                            Units:
                            </h6>
                        </Col>
                        <Col md={8} xs={8} className="text-right">
                            <p>
                            100
                            </p>
                        </Col>
                    </Row>
                </div>

                <div className="detail_content1 mt-4">
                    <Row>
                        <Col md={4} xs={4} className="text-left">
                            <h6>
                            Expiry:
                            </h6>
                        </Col>
                        <Col md={8} xs={8} className="text-right">
                            <p>
                            monday, 31 july 2021
                            </p>
                        </Col>
                    </Row>
                </div>

                <div className="detail_content1 mt-4">
                    <Row>
                        <Col md={4} xs={4} className="text-left">
                            <h6>
                            delivery:
                            </h6>
                        </Col>
                        <Col md={8} xs={8} className="text-right detail_Col">
                            <img src={Location} className="mr-2" alt=""/>
                            <p className="font_text d-inline-block">
                            tamar park
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className="box_list additional_textarea">
                <Row>
                    <Col md={6} xs={6} className="text-left">
                        <h5>
                        Additional notes
                        </h5>
                    </Col>
                    <Col md={6} xs={6} className="text-right">
                        <img src={Right} className="" alt=""/>
                    </Col>
                </Row>

                <Row>
                    <Col md={12} xs={12}>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac rhoncus eget ipsum nec vitae imperdiet.
                        </p>
                    </Col>
                </Row>

              {/* <textarea
                onChange={(event: any) => onInputChange(event)}
                name="additional_notes"
                value={formData?.additional_notes}
                placeholder="Notes...."
              ></textarea> */}
            </div>

            <div className="box_list additional_textarea mb-0">
                <Row>
                    <Col md={6} xs={6} className="text-left">
                        <h5>
                        Thank you
                        </h5>
                    </Col>
                    <Col md={6} xs={6} className="text-right">
                        <img src={Right} className="" alt=""/>
                    </Col>
                </Row>

                <Row>
                    <Col md={12} xs={12}>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac rhoncus eget ipsum nec vitae imperdiet.
                        </p>
                    </Col>
                </Row>
              {/* <textarea
                onChange={(event: any) => onInputChange(event)}
                name="thanku_note"
                value={formData?.thanku_note}
                placeholder="Notes...."
              ></textarea> */}
            </div>

        </Form>
      </div>
      <TabIcon />
    </div>

</>
  )
}