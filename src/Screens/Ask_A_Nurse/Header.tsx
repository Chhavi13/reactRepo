import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Image, ListGroup } from 'react-bootstrap';
import "./Header.scss";
import AskNHeaderMain from "../../Assets/img/asknurse/askN-header.svg";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from "react-router-dom"


const Header = ({ handleClickOpen }: any) => {
  const Navigate = useNavigate()
  let onBack = () => {
    Navigate(-1)
  }

  return (
    <div className='ask-nurse-headercontainer mb-4'>
      

      <Container fluid >
        <div className='ask-nurse-header px-5 py-3'>
          <Row>
            <div className='col-lg-12 col-md-12'>
              <Container className='p-0'>
                <Row>
                <div className='col-lg-12 py-2'>
                  <div className='back-pg' onClick={onBack}><ArrowBackIosNewIcon />Back</div>
                </div>
                </Row>
              </Container>
            </div>
          </Row>

          <Row>
            <Col lg="12">
              <Container>
                <div className='d-flex align-items-center header-inner'>
                  <div className='d-flex align-items-center banner-section'>
                    <div className='askN-header-img px-4'>
                      <img src={AskNHeaderMain} className="img-responsive"/>
                    </div>
                    <div className='askN-header-h2 px-4'>
                      <h2>Ask <span className='strong'> a Nurse</span></h2>
                    </div>
                  </div>
                  <div className='askN-header-caption px-5 mx-5'>
                    <p>
                      <span className='strong'>Ask A Nurse forum with 24-hour response time to keep you from a google rabbit hole</span></p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className='askN-btn d-none d-sm-none d-md-block'>
                    <button onClick={handleClickOpen}>+ Ask a Nurse</button>
                  </div>
                </div>
              </Container>
            </Col>
          </Row>
        </div>{/* end of header container  */}
      </Container>
    </div>
  )
}

export default Header