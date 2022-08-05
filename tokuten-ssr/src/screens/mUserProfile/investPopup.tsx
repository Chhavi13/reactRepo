import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from "../../assets/images/mobileimages/profilebg.svg" ;
import User from "../../assets/images/mobileimages/user.svg" ;
import Right from "../../assets/images/mobileimages/sbrinastarblanck.svg" ;
import axiosInstance from '../../services/axios';
import * as alertService from '../../services/AlertService';

function MyVerticallyCenteredModal(props: any) {
  // const [data , setData] = useState({})
  // const getData = async() =>{
  //   // try {
  //   //   let res = await 
  //   // } catch (error) {
      
  //   }
  // }
  // useEffect(() => {
    
  // }, [])
  const invest = async () => {
    const payload = {
      event_offer: 10,
      transaction_cost: props?.investor?.invest_amount_tier,
      transaction_status: "New",
      transaction_type: "Tier 1",
      user: props.data.id,
      creator:props.data.event_offer_creator[0].user_id
    }
    console.log('investpaylod',payload);
    try {
      if (props.data.subscript_cost != 0) {
        const response: any = await axiosInstance.post('/offer/transaction/', payload)
        let data = response?.data
        if(data){ 
          alertService.success('ok')
          props.onHide(false)
        }
      } else {
        console.log('error');
        alertService.error('error')
      }

    } catch (error) {
      props.onHide(false)

    }

  }

  return (
    <Modal
    className="subscribe_invest_modal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <img src={props?.data?.cover_image} alt="Image" />
      </Modal.Header>
      <Modal.Body>
        <div className="modal_body_content">
          <div className="user_profile">
              <Row>
                  <Col md={4} xs={3}>
                      <img src={props?.data?.profile_image} className="user_img" alt="Image" />
                  </Col>

                  <Col md={8} xs={8} className="pl-0">
                    <h3>
                      sabrina
                    </h3>
                    <img src={Right} alt="Image" />
                  </Col>

                  <Col md={12} xs={12}>
                    <p className="mt-3">
                    {props?.investor?.invest_description}
                    </p>
                    
                    <h4 className="mt-2">
                    benefits
                    </h4>

                    <span className="d-block head_span">
                    {props?.investor?.invest_benefit_tier}
                    </span>
                    </Col>
                  </Row>

                  <div className="btn_section mt-2"> 
                    <Button variant="contained" color="primary" onClick ={invest} className="btn_sub_now mb-0">
                    invest me for
                      <span className="text-right-btn">
                      {props?.investor?.invest_amount_tier}
                      </span>
                    </Button>
                  </div>

              
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export const InvestPopup = ({isInvestModal, setInvestModal,data,investor}: any) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <MyVerticallyCenteredModal
        show={isInvestModal}
        onHide={ () => setInvestModal(false) }
        data={data}
        investor={investor}
      />
    </>
  );
}