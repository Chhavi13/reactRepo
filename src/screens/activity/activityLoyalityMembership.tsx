import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from '../../assets/images/mobileimages/user4.svg';
import Horse from "../../assets/images/mobileimages/horse.svg";

interface IProps { }
export const ActivityLoyalityMembership: React.FC<IProps> = () => {
    return (
        <div className="sub_content_main">
            <h2 className="title"> Loyality Membership </h2>

            <div className="membership_content">
                <Container>
                    <div className="membership_detail">
                        <div className="member_padding_detail">
                            <Row>
                                <Col md={2} sm={2} xs={2}>
                                    <div className="member_img">
                                        <img src={User} alt="Image" />
                                    </div>
                                </Col>
                                <Col md={10} sm={10} xs={10} className="pl-0">
                                    <h5>
                                        Sabrina
                                    </h5>
                                </Col>
                            </Row>
                        </div>

                        <Row className="mt-2">
                            <Col md={12} sm={12} xs={12}>
                                <div className="member_point">
                                    <p>
                                    350
                                    <sup>
                                    points
                                    </sup>
                                    </p>

                                    <div className="membership_cover_img">
                                        <img src={Horse} alt="Image" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="member_padding_detail mb-2"> 
                            <Row>
                                <Col md={5} sm={5} xs={5} className="pr-0">
                                    <div className="membership_tier">
                                        <p>
                                        tier
                                        </p>
                                        <span>
                                        gold
                                        </span>
                                    </div>
                                </Col>

                                <Col md={7} sm={7} xs={7} className="pl-0">
                                    <div className="membership_tier">
                                        <p>
                                        Valid
                                        </p>
                                        <span>
                                        20/06/2021
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="membership_detail">
                        <div className="member_padding_detail">
                            <Row>
                                <Col md={2} sm={2} xs={2}>
                                    <div className="member_img">
                                        <img src={User} alt="Image" />
                                    </div>
                                </Col>
                                <Col md={10} sm={10} xs={10} className="pl-0">
                                    <h5>
                                        Sabrina
                                    </h5>
                                </Col>
                            </Row>
                        </div>

                        <Row className="mt-2">
                            <Col md={12} sm={12} xs={12}>
                                <div className="member_point">
                                    <p>
                                    700
                                    <sup>
                                    points
                                    </sup>
                                    </p>

                                    <div className="membership_cover_img">
                                        <img src={Horse} alt="Image" />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className="member_padding_detail mb-2"> 
                            <Row>
                                <Col md={5} sm={5} xs={5} className="pr-0">
                                    <div className="membership_tier">
                                        <p>
                                        tier
                                        </p>
                                        <span>
                                        platinum
                                        </span>
                                    </div>
                                </Col>

                                <Col md={7} sm={7} xs={7} className="pl-0">
                                    <div className="membership_tier">
                                        <p>
                                        Valid
                                        </p>
                                        <span>
                                        10/05/2022
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </div> 
        </div>
    )
}