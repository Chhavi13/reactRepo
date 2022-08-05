import React, { useState } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import hand from "../../assets/images/mobileimages/hand.svg";
import "./thankYou.scss";
import moment from 'moment';
import { useEffect } from 'react';
import Sliders from '../../components/Slider/Slider';


export const ThankYouScreen = (props: any) => {
  let history = useHistory()
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false
  // };


  let [data, setData] = useState<any>([])
  let location = useLocation()
 
  

  useEffect(() => {
    //getOffer();
    setData(location?.state)
  }, [])
  
  const backToStore = () => {
    history.push('/dashboard');
  }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs thank_page pb-5">

        <div className="pt-2 mob_scroll">
          <div className="thank_head">
            <Row>
              <Col md={7} xs={7}>
                <h1>
                {props.isCreateOffer ? props?.sendData?.offer_title : data?.offer_title}
                </h1>
              </Col>

              <Col md={5} xs={5}>
                <p>date: {props.isCreateOffer ? moment(props?.sendData?.expires_at).format('Do MMMM, YYYY'):moment(data?.expires_at).format('Do MMMM, YYYY')}</p>
                <p>time: {props.isCreateOffer ? moment(props?.sendData?.expires_at).format('hh:mm A'): moment(data?.expires_at).format('hh:mm A')}</p>
                
                <p>
                  place: { props.isCreateOffer ? props?.sendData?.offer_location : data?.offer_location}
                </p>
                <p>
                  cost: HKD { props.isCreateOffer ? props?.sendData?.cost :data?.cost}
                </p>
              </Col>
            </Row>
          </div>

          <div className="thank_content">
            <div className="thank_img">
              <Sliders image={props.isCreateOffer ? props?.images :data?.event_offer_images} />
              <img src={hand} className="hand_thank" alt="hand" />
            </div>
          </div>

          <div className="thank_content_main">
            <p className="thank_para">
              {props?.isCreateOffer ? props?.sendData?.thanku_note : data?.thanku_note}
            </p>
          </div>

          <div className="list_buy mb-5">
            <Row>
              <Col md={12} xs={12}>
                <h5 className="text-center" onClick={backToStore}>
                  back to store
                </h5>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div >
  )
}