import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import hand from "../../assets/images/mobileimages/hand.svg";
import "./thankYou.scss";
import TabIcon from '../tabs/tabs';
import moment from 'moment';
import Sliders from '../../components/Slider/Slider';

export const ThankYou = (props: any) => {


  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs thank_page pb-5">
    
        <div className="pt-2">
          <div className="thank_head">
            <Row>
              <Col md={7} xs={7}>
                <h1>
                  {props.sendData.offer_title}
                </h1>
              </Col>

              <Col md={5} xs={5}>
                <p>date: {moment(props.sendData.expires_at).format('Do MMMM, YYYY')}</p>
                <p>time: {moment(props.sendData.expires_at).format('hh:mm A')}</p>
                <p>
                  {props.date}
                </p>
                <p>
                  place: {props.sendData.offer_location}
                </p>
                <p>
                  cost: HKD {props.sendData.cost}
                </p>
              </Col>
            </Row>
          </div>

          <div className="thank_content">
            <div className="thank_img">
              {/* <img src={trainerimg} className="user_thank" alt="Image"/> */}
              <Sliders image={props.images} />
              <img src={hand} className="hand_thank" alt="" />
            </div>
          </div>

          <div className="thank_content_main">
            <p className="thank_para">
              thank you for booking my class. I will send you a confirmation via whatsapp shortly.
            </p>
            <p className="thank_para">
              looking forward to a great session with you
            </p>

            <p className="thank_id">
              your transaction id is: <span> lkdf655421431 </span>
            </p>
          </div>

          <div className="list_buy mb-5">
            <Row>
              <Col md={12} xs={12}>
                <h5 className="text-center">
                  back to store
                </h5>
              </Col>
            </Row>

          </div>

        </div>
        <TabIcon />
      </div>
    </div >
  )
}