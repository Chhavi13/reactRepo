import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User1 from "../../assets/images/mobileimages/user1.svg";
import User2 from "../../assets/images/mobileimages/user2.svg";
import Right from "../../assets/images/mobileimages/chevron-right.svg";

interface IProps { }
export const ActivitySubscription: React.FC<IProps> = () => {
    return (
        <div>
            <h2 className="title"> Subscription </h2>
            <div className="sub_content_main">
                <h4>Active</h4>

                <div className="subscription_type_content">
                    <div className="detail_type"> 
                        <Row>
                            <Col md={2} sm={2} xs={2}>
                                <div className="sub_image">
                                    <img src={User1} alt="Image" />
                                </div>
                            </Col>

                            <Col md={8} sm={8} xs={8}>
                                <div className="sub_description_content">
                                    <h5>
                                    Rosemary Kimmons
                                    </h5>
                                    <p>
                                    subscription for $100.00
                                    </p>
                                    <p>
                                    next renewal date: jun 11, 2021
                                    </p>
                                </div>
                            </Col>
                            
                            <Col md={2} sm={2} xs={2}>
                                <div className="right_image mt-3">
                                    <img src={Right} alt="Image" />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="detail_type"> 
                        <Row>
                            <Col md={2} sm={2} xs={2}>
                                <div className="sub_image">
                                    <img src={User2} alt="Image" />
                                </div>
                            </Col>

                            <Col md={8} sm={8} xs={8}>
                                <div className="sub_description_content">
                                    <h5>
                                    Rosemary Kimmons
                                    </h5>
                                    <p>
                                    subscription for $100.00
                                    </p>
                                    <p>
                                    next renewal date: jun 11, 2021
                                    </p>
                                </div>
                            </Col>
                            
                            <Col md={2} sm={2} xs={2}>
                                <div className="right_image mt-3">
                                    <img src={Right} alt="Image" />
                                </div>
                            </Col>
                        </Row>
                    </div>


                    <div className="detail_type"> 
                        <Row>
                            <Col md={2} sm={2} xs={2}>
                                <div className="sub_image">
                                    <img src={User1} alt="Image" />
                                </div>
                            </Col>

                            <Col md={8} sm={8} xs={8}>
                                <div className="sub_description_content">
                                    <h5>
                                    Rosemary Kimmons
                                    </h5>
                                    <p>
                                    subscription for $100.00
                                    </p>
                                    <p>
                                    next renewal date: jun 11, 2021
                                    </p>
                                </div>
                            </Col>
                            
                            <Col md={2} sm={2} xs={2}>
                                <div className="right_image mt-3">
                                    <img src={Right} alt="Image" />
                                </div>
                            </Col>
                        </Row>
                    </div>


                    <div className="detail_type"> 
                        <Row>
                            <Col md={2} sm={2} xs={2}>
                                <div className="sub_image">
                                    <img src={User2} alt="Image" />
                                </div>
                            </Col>

                            <Col md={8} sm={8} xs={8}>
                                <div className="sub_description_content">
                                    <h5>
                                    Rosemary Kimmons
                                    </h5>
                                    <p>
                                    subscription for $100.00
                                    </p>
                                    <p>
                                    next renewal date: jun 11, 2021
                                    </p>
                                </div>
                            </Col>
                            
                            <Col md={2} sm={2} xs={2}>
                                <div className="right_image mt-3">
                                    <img src={Right} alt="Image" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <div className="sub_content_main">
                <h4>expired</h4>

                <div className="subscription_type_content">
                    <div className="detail_type"> 
                        <Row>
                            <Col md={2} sm={2} xs={2}>
                                <div className="sub_image">
                                    <img src={User1} alt="Image" />
                                </div>
                            </Col>

                            <Col md={8} sm={8} xs={8}>
                                <div className="sub_description_content">
                                    <h5>
                                    Rosemary Kimmons
                                    </h5>
                                    <p>
                                    subscription for $100.00
                                    </p>
                                    <p>
                                    next renewal date: jun 11, 2021
                                    </p>
                                </div>
                            </Col>
                            
                            <Col md={2} sm={2} xs={2}>
                                <div className="right_image mt-3">
                                    <img src={Right} alt="Image" />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="detail_type"> 
                        <Row>
                            <Col md={2} sm={2} xs={2}>
                                <div className="sub_image">
                                    <img src={User2} alt="Image" />
                                </div>
                            </Col>

                            <Col md={8} sm={8} xs={8}>
                                <div className="sub_description_content">
                                    <h5>
                                    Rosemary Kimmons
                                    </h5>
                                    <p>
                                    subscription for $100.00
                                    </p>
                                    <p>
                                    next renewal date: jun 11, 2021
                                    </p>
                                </div>
                            </Col>
                            
                            <Col md={2} sm={2} xs={2}>
                                <div className="right_image mt-3">
                                    <img src={Right} alt="Image" />
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    )
}