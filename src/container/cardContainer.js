import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PostView } from '../features/post/postView';
import '../container/container.css'
const CardContainer=() =>{
  return (
    <div>
     <Container className='container-fluid'>
     <Row className='row-cols-4'>
    <Col xs={6} md={4}>
     <PostView/>
    </Col>
    <Col xs={6} md={4}>
    
    </Col>
    <Col xs={6} md={4}>
    
    </Col>
  </Row>
     </Container>
    </div>
  )
}

export default CardContainer