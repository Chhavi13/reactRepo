import React from 'react'
import { Container, Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import "../../global-componant.css";
import EventHeadericon from "../../Assets/img/liveevents/event-icon.svg"
import "./Header.scss";

const Header = () => {
  return (
    <div className='event-header-container mb-4'>
      <Container fluid>
        <div className='event-header px-5 py-5'>
          <Row>
            <div className='col-lg-12 col-md-12'>
              <Container>
                <div className='col-lg-12 col-md-12'>
                  <div className='Row'>
                    <div className='d-flex header-container justify-container-center align-items-center'>
                      <div className='d-flex align-items-center event-section-container'>
                        <div className='event-header-img px-4'>
                            <img src={EventHeadericon} className="img-responsive" />
                        </div>
                        <div className='event-header-h2 px-4'> <h2>Events</h2></div>
                      </div>
                      <div className='d-flex align-items-start flex-column ps-5'>
                        <p><span className='strong'>Events are live with a NAPS expert or other expert guest speakers.</span></p>
                        <p className='p-0 m-0'>Events are created to enhance your learning experience and create community among parents with similar interests and/or challenges. If you can't make it live, no problem! All members get access to the recordings of past events.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </Row>
        </div>
    </Container>
    </div>
  )
}

export default Header