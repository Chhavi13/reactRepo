import React from 'react'
import { Container, Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import CourseHeader from "../../../Assets/img/course/course-header-icon.svg";
import "./Header.scss"


const Header = () => {


  return (
    <div className='course-header-container mb-4'>
      
      <Container fluid>
        <div className='course-header px-5 py-5'>
          <Row>
            <div className='col-lg-12 col-md-12'>
              <Container>
            
                <div className='col-lg-12 col-md-12'>
                  <div className='Row'>
                    <div className='d-flex header-container justify-container-center align-items-center'>
                    <div className='d-flex align-items-center course-section-container'>
                      <div className='course-header-img px-4'>
                          <img src={CourseHeader} className="img-responsive" />
                      </div>
                      <div className='course-header-h2 px-4'> <h2>Courses</h2></div>
                    </div>
                    <div className='d-flex align-items-start flex-column ps-5'>
                      <p><span className='strong'>Education at your fingertips...anytime, anywhere</span></p>
                      <p className='p-0 m-0'>Our courses are a combination of video shorts, which are quick 2-20 minute tutorials to help troubleshoot a specific topic for your parenting stage and 40+ minute in-depth courses that cover everything you need to know about broader parenting topics to help you learn about and plan for what’s to come. </p>
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