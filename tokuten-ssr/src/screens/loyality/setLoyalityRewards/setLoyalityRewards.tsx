import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../../../components/header/header';
import { useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import Face from "../../../assets/images/mobileimages/face.svg";
import Gold from "../../../assets/images/mobileimages/goldgift.svg";
import Platinum from "../../../assets/images/mobileimages/platinumgift.svg";
import Blue from "../../../assets/images/mobileimages/bluegift.svg";
import Dollar from "../../../assets/images/mobileimages/rate.svg";
import Star from "../../../assets/images/mobileimages/pointstar.svg";
import Crown from "../../../assets/images/mobileimages/crown.svg";
import "./setLoyalityRewards.scss";



interface IProps { }

export const SetLoyalityRewards: React.FC<IProps> = () => {
  const history = useHistory()

  const onPageBack = () => {
    history.goBack()
  }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container bg_overflow pb-5">
          <Header title="setup loyalty rewards" back={true} enableback={onPageBack} next="Next" enablenext={()=>history.push("/setup/loyality")}/>
        <div className="set-loyalty-container text-center mt-3">
          <Typography variant="body1" gutterBottom>
            Reward and recognize your biggest fans with an <span> exclusive VIP Loyalty program </span> tailored to your needs. Create VIP tiers and perks to increase loyalty of your fan base & motivate them to keep coming back.
          </Typography>

          <Typography variant="overline" display="block" className="loyal_head" gutterBottom>
            build your loyalty program
          </Typography>

          <div className="loyalty_section">
              <div className="card_header text-left">
                <img src={Face} alt=""/>
                <h2 className="d-inline-block">
                Sabrina’s Fan Loyalty
                </h2>
              </div>
              <div className="card_body text-left">
                  <h3>
                  Loyal Fans get Royal Treatment
                  </h3>

                  <div className="table_section"> 
                    <Row>
                      <Col md={3} xs={3} className="pr-0 pl-1">
                        <h5 className="text-left">
                        benefits
                        </h5>
                      </Col>

                      <Col md={3} xs={3} className="pr-0">
                        <h5>
                        blue
                        </h5>
                      </Col>

                      <Col md={3} xs={3} className="pr-0">
                        <h5>
                        gold
                        </h5>
                      </Col>

                      <Col md={3} xs={3} className="pr-0">
                        <h5>
                        platinum
                        </h5>
                      </Col>
                    </Row>

                    <div className="table_border1"></div>

                    <Row>
                      <Col md={3} xs={3} className="pr-2 pl-1">
                        <p className="text-left">
                        discounts
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="blank">
                         
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                          <img src={Gold} alt=""/>
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                          <img src={Platinum} alt="" />
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={3} xs={3} className="pr-2 pl-1 text-left">
                        <p className="text-left">
                        exclusive
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                        <img src={Blue} alt=""/>
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                          <img src={Gold} alt=""/>
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                          <img src={Platinum} alt=""/>
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={3} xs={3} className="pr-2 pl-1 text-left">
                        <p className="text-left">
                        engagement
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="blank">
                         
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                          <img src={Gold} alt=""/>
                        </p>
                      </Col>

                      <Col md={3} xs={3} className="pr-0 text-center">
                        <p className="m-0">
                          <img src={Platinum} alt=""/>
                        </p>
                      </Col>
                    </Row>

                  </div>

              </div>

          </div>

          <div className="card_body_bottom">
            <Row>
              <Col md={3} xs={3} className="text-left pl-4">
                <img src={Dollar} alt=""/>
              </Col>

              <Col md={9} xs={9}>
                <h5 className="mt-2">
                grant 1 point for every $1 spent
                </h5>
              </Col>

              <Col md={3} xs={3} className="text-right">
                <img src={Star} alt=""/>
              </Col>

              <Col md={9} xs={9}>
                <p>
                $1 = 1 point
                </p>
              </Col>
            </Row>
        </div>

        <Typography variant="overline" display="block" className="loyal_head" gutterBottom>
        define benefits
          </Typography>

    <div className="benefit_bg"> 
          <div className="benefit_section">
            <Row>
              <Col md={5} xs={5}>
                <div className="benefit_left">
                  <img src={Crown} alt=""/>
                  <h4>
                  Platinum 
                  <span> unlock by earning </span>
                  </h4>

                  <p>
                  500 <sup>
                  points
                  </sup>
                  </p>
                </div>
              </Col>

              <Col md={7} xs={7}>
                <div className="benefit_right">
                  <p>
                  20% discount <span>
                  On all offers
                  </span>
                  </p>
                  <ListGroup>
                    <ListGroup.Item>Exclusive platinum member live streamso</ListGroup.Item>
                    <ListGroup.Item>Preferential booking for classes</ListGroup.Item>
                    <ListGroup.Item>Behind the scene access</ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}