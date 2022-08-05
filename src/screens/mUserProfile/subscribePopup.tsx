import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Right from "../../assets/images/mobileimages/sbrinastarblanck.svg";
import axiosInstance from '../../services/axios';
import * as alertService from '../../services/AlertService';
import * as authService from "../../services/auth.service";


function MyVerticallyCenteredModal(props: any) {

  const getUserDataByID = async () => {
    try {
      let response: any = await authService.getUserProfileDetail(props.data.id);
      const media: any = response?.data?.data?.user_media_files.map((item: any) => item = { 'file': item });
      props.setUserProfileData({ ...response.data.data });

      props.setPoints({
        ...props.points,
        ["point"]: response.data.data.points
      })

      props.setData(response.data.data)
      props.getMediaData(media);
    } catch (error) {
      console.log(error)
    }
  }
  const data:any = localStorage.getItem('authData')
  let id = JSON.parse(data)

  const subscribe = async () => {
    const payload = {
      transaction_cost: props.data.subscript_cost,
      transaction_status: "New",
      transaction_type: "Subscriber",
      user: id?.id,
      creator:props.data.id
    }
    
    try {
      if (props.data.subscript_cost === 0) {
        const response: any = await axiosInstance.post('/offer/transaction/', payload)
        let data = response?.data
        if(data){ 
        await  getUserDataByID()
          props.onHide(false)
        }
      } else {
        // const response: any = await axiosInstance.post('/offer/transaction/', payload)
        // let data = response?.data
        // if(data){ 
        //   alertService.success('ok')
        //   props.onHide(false)
        // }
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
                  {props?.data?.first_name}
                </h3>
                <img src={Right} alt="Image" />
              </Col>
            </Row>

            <div className="btn_section">
              <Button variant="contained" color="primary" className="btn_sub_now mb-3" onClick={subscribe}>
                subscribe now for
                <span className="text-right-btn">
                  ${props?.data?.subscript_cost}/m
                </span>
              </Button>

              {props?.data?.subscript_discount == 0 ? null : <Button variant="outlined" className="btn_sub_discount">
                3 months ({props?.data?.subscript_discount}% off)
                <span className="text-right-btn">

                  ${props?.data?.subscript_cost * 3 * (100 - props?.data?.subscript_discount) / 100}
                </span>
              </Button>}
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

export const SubscribePopup = ({getMediaData,points, isSubscribeModal,setUserProfileData, setSubscribeModal, data ,setPoints,setData,id}: any) => {
  

  return (
    <>
      <MyVerticallyCenteredModal
        show={isSubscribeModal}
        data={data}
        onHide={() => setSubscribeModal(false)}
        id={id}
        setUserProfileData={setUserProfileData}
        setPoints={setPoints}
        points={points}
        getMediaData={getMediaData}
        setData={setData}
      />
    </>
  );
}