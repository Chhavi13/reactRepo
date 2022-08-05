import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Download from "../../assets/images/mobileimages/download.svg";
import User1 from "../../assets/images/mobileimages/userpic.svg";

interface IProps { }
export const ActivityHistory: React.FC<IProps> = () => {
    return (
        <div className="sub_content_main">
            <h2 className="title"> spending History </h2>

            <div className="history_form mt-3">
                <Form>
                    <Container>
                        <Row>
                            <Col md={9} sm={9} xs={9} className="pr-0">
                                <Form.Group className="mb-3">
                                    <Form.Control type="date" placeholder="01 aug to 01 may 2021" />
                                </Form.Group>
                            </Col>

                            <Col md={3} sm={3} xs={3} className="text-right">
                                <img src={Download} alt="Image" />
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>

            <div className="history_content">
                <Container>
                    <div className="history_detail">
                        <Row>
                            <Col md={2} sm={2} xs={2} className="">
                                <img src={User1} alt="Image" />
                            </Col>

                            <Col md={10} sm={10} xs={10} className="pl-0">
                                <div className="user_detail_history_right">
                                    <Row>
                                        <Col md={6} sm={6} xs={6}>
                                            <div className="user_detail_history">
                                                <h4>
                                                alex quas
                                                </h4>
                                                <p>
                                                29 may 2021
                                                </p>
                                            </div>  
                                        </Col>
                                        <Col md={3} sm={3} xs={3} className="text-right pr-0">
                                            <p className="history_type">
                                            tip
                                            </p>
                                        </Col>
                                        <Col md={3} sm={3} xs={3}>
                                            <span>
                                            $600.00
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="history_detail">
                        <Row>
                            <Col md={2} sm={2} xs={2} className="">
                                <img src={User1} alt="Image" />
                            </Col>

                            <Col md={10} sm={10} xs={10} className="pl-0">
                                <div className="user_detail_history_right">
                                    <Row>
                                        <Col md={6} sm={6} xs={6}>
                                            <div className="user_detail_history">
                                                <h4>
                                                Harmony Henry
                                                </h4>
                                                <p>
                                                29 may 2021
                                                </p>
                                            </div>  
                                        </Col>
                                        <Col md={3} sm={3} xs={3} className="text-right pr-0">
                                            <p className="history_type">
                                            purchase
                                            </p>
                                        </Col>
                                        <Col md={3} sm={3} xs={3}>
                                            <span>
                                            $600.00
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="history_detail">
                        <Row>
                            <Col md={2} sm={2} xs={2} className="">
                                <img src={User1} alt="Image" />
                            </Col>

                            <Col md={10} sm={10} xs={10} className="pl-0">
                                <div className="user_detail_history_right">
                                    <Row>
                                        <Col md={6} sm={6} xs={6}>
                                            <div className="user_detail_history">
                                                <h4>
                                                Phillips Kimmons
                                                </h4>
                                                <p>
                                                29 may 2021
                                                </p>
                                            </div>  
                                        </Col>
                                        <Col md={3} sm={3} xs={3} className="text-right pr-0">
                                            <p className="history_type">
                                            subscribe
                                            </p>
                                        </Col>
                                        <Col md={3} sm={3} xs={3}>
                                            <span>
                                            $600.00
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>


                    <div className="history_detail">
                        <Row>
                            <Col md={2} sm={2} xs={2} className="">
                                <img src={User1} alt="Image" />
                            </Col>

                            <Col md={10} sm={10} xs={10} className="pl-0">
                                <div className="user_detail_history_right">
                                    <Row>
                                        <Col md={6} sm={6} xs={6}>
                                            <div className="user_detail_history">
                                                <h4>
                                                alex quas
                                                </h4>
                                                <p>
                                                29 may 2021
                                                </p>
                                            </div>  
                                        </Col>
                                        <Col md={3} sm={3} xs={3} className="text-right pr-0">
                                            <p className="history_type">
                                            invest
                                            </p>
                                        </Col>
                                        <Col md={3} sm={3} xs={3}>
                                            <span>
                                            $600.00
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}