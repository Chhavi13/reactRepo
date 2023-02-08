import React from 'react'
import { Container, Row, Col, Button, Image, ListGroup, Form } from 'react-bootstrap';
import "./Footer.scss";
import Logo from "../../Assets/img/footer/footer-logo.svg"
import Facebook from "../../Assets/img/footer/Facebook.svg"
import Instagram from "../../Assets/img/footer/instagram.svg"
import Pintrest from "../../Assets/img/footer/pinterest.svg"
const Footer = () => {
    return (
        <Container fluid>
            <div className='footer'>
            <Row>
                   <div className='col-lg-12 col-md-12'>
                        <div className="container g-0">
                            <div className="row">
                                <div className='d-flex justify-content-between footer-flex-container'>
                                    <div className='d-flex block block1 flex-column px-3 '>
                                        <div className="footer-logo mb-5">
                                            <img src={Logo} alt="" />
                                        </div>
                                        <div className="social-icons d-inline-block">
                                            <img src={Facebook} alt="" className='rounded'/>
                                            <img src={Instagram} alt="" />
                                            <img src={Pintrest} alt="" />
                                        </div>
                                    </div>
                                    <div className='d-flex block block2 flex-column px-3'>
                                            <h4>Contact</h4>
                                            <p className="address">395 West Broadway Boston, MA 02127 hello@nurturebynaps.com (857) 496-5095</p>
                                        {/* </div> */}
                                    </div>
                                    <div className='d-flex block block3 flex-column px-3 d-none d-sm-none d-md-block'>
                                        <h4>Explore</h4>
                                        <ul>
                                            <li>Our Story</li>
                                            <li>Contact Us </li>
                                            <li>Careers</li>
                                            <li>Partnerships & Sponsors</li>
                                            {/* <li>Nurture Login</li> */}
                                        </ul>
                                        
                                    </div>
                                    <div className='d-flex block block4 px-3'>
                                        <div className="stay-loop">
                                            <h4>Stay in the loop:</h4>
                                            <input className="form-control" type='email' placeholder='Enter your e-mail' />
                                            <button className="btn">Submit</button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* <div className="col-md-12">
                                    <div className="footer-logo">
                                        <img src={Logo} alt="" />
                                    </div>
                                </div> */}
                                {/* <div className="col-md-8">
                                    <p className="address">395 West Broadway Boston, MA 02127 hello@nurturebynaps.com (857) 496-5095</p>
                                </div> */}
                                {/* // <div className="col-md-4">
                                //     <div className="stay-loop">
                                //         <h4>Stay in the loop:</h4>
                                //         <input className="form-control"/>
                                //         <button className="btn">send</button>
                                //     </div>
                                // </div>
                                // <div className="col-md-12">
                                //     <div className="footer-content">
                                //         <ul>
                                //             <li>Our Story</li>
                                //             <li>Contact Us </li>
                                //             <li>Carreers</li>
                                //             <li>Partnerships & Sponsors</li>
                                //             <li>Nurture Login</li>
                                //         </ul>
                                //         <hr className="bg-white"></hr>
                                //     </div>
                                // </div>
                                // <div className="col-md-8">
                                //     <div>
                                //         <p className="bottom">Nurture by NAPS  @   All rights reserved.</p>
                                //     </div>
                                // </div>
                                // <div className="col-md-4 text-right">
                                //     <div className="social-icons d-inline-block">
                                //         <img src={Facebook} alt="" />
                                //         <img src={Instagram} alt="" />
                                //         <img src={Pintrest} alt="" />
                                //     </div>
                                //     <p className="privacy-policy d-inline-block">Privacy & Terms</p>
                                // </div> */}
                            </div>
                            <hr className="bg-white"></hr>
                            <div className='row bottom'>
                                <div className='d-flex justify-content-between footer-inner'>
                                    <div className='rigths'>
                                        <p className="bottomm">Nurture by NAPS  @   All rights reserved.</p>
                                    </div>
                                    <div className='d-flex'>
                                        <div><p className="privacy-policy me-4">Privacy Policy</p></div>
                                        <div><p className="privacy-policy">Terms and Conditions</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
               </Row>
            </div>
        </Container>
    )
}

export default Footer
