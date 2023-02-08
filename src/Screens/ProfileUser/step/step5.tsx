import moment from 'moment';
import React, { useState } from 'react'
import { Row } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Envelop_green from '../../../Assets/img/envelop-green.svg'
import Paper_plane_green from '../../../Assets/img/paper-plane-green.svg'
import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GIFTCARD } from '../../../Routes/RouteConstent';

function Step5({ data, subStep3 }: any) {
  console.log(data)
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Copied
    </Tooltip>
  );
  const hideTooltip = (props: any) => (<></>);

  const Navigate = useNavigate();
  const [textChange, setTextChange] = useState<any>([])
  const codeCopFun = (e: any, id: any) => {
    e.preventDefault()
    setTextChange([...textChange, id])
    var copyText: any = document.getElementById(id);
    navigator.clipboard.writeText(copyText.value);

    setTimeout(() => {
      setTextChange([])
    }, 2500)
  }

  console.log(subStep3)
  return (
    <div>
      <Row>
        <div className='col-lg-12 col-md-12'>
          {/* <div className='event-container-main p-2 mb-3'>
            <div className='d-flex align-items-center'>
              <div className='event-thumbnail'>
                <img src={video_list_thumb} className='img-responsive' />
              </div>
              <div className='event-detail mx-3'>
                <h3 className='event-name'>

                </h3>
                <p>Dive into a robust course covering the first signs of labor to the birth of your baby and postpartum recovery. See live demonstrations of breathing, massage and relaxation techniques and an overview of pain medication.
                </p>
                <div className='event-time-container w-75'>
                  <span className='event-time'>View Invoice </span>
                </div>
              </div>
              <div className='btn-conatainer mx-3'>
                <button className='primary-blue-small-btn-40 btn'>Reschedule</button>
              </div>
            </div>
          </div> */}
          {
            data?.map((val: any, i: any) => (
              <div className='profile-container-main p-4 p-md-3 mb-3'>
                <div className='d-flex align-items-start profile-container-inner flex-column flex-md-row '>
                  <div className='profile-section-thumbnail mb-3 mb-md-0 text-center'>
                    <img src={subStep3 == 1 ? Envelop_green : Paper_plane_green} className='img-responsive' />
                  </div>
                  <div className='profile-section-detail d-flex flex-column px-0 px-md-3'>
                    <div className='profile-sec-info'>
                      {
                        subStep3 == 1 &&
                        <div className='d-flex justify-content-between flex-column flex-md-row gift-info-all'>
                            <div className='senderinfo my-1'>
                          {val?.sender_name} <span className='sender-email'>  ({val?.sender_email})</span> gifted you a
                        </div>
                        <div className="profile-section-date">
                          <p className="fw-bold my-2">{moment(val?.created_at).format('DD-MMM-yyyy')}</p>
                        </div>
                        </div>
                      }
                      {
                        subStep3 == 2 &&
                        <div className='senderinfo my-1'>
                          You gifted a gift card to {val?.friend_name} <span className='sender-email'>  ({val?.email})</span>
                        </div>
                      }

                      {/* <div className='senderinfo my-1'>
                        {val?.friend_name} <span className='sender-email'> ( Sophia@abcd.com )</span> gifted you a
                      </div> */}
                      <h3 className='section-title'>
                        {val?.title === 'All' ? '' : val?.title}
                      </h3>
                      {/* <p>Dive into a robust course covering the first signs of labor to the birth of your baby and postpartum recovery. See live demonstrations of breathing, massage and relaxation techniques and an overview of pain medication.
                </p> */}
                      <div className='section-time-container'>
                        <span className='time-stamp'>Total amount: ${val?.amount} &emsp;&nbsp;&nbsp; Remaining amount: ${val?.remaining_amount}</span>
                      </div>
                    </div>
                    <div className="coupencode-container mt-2">
                      {/* {
                        subStep2 == 3 &&
                        <div className="position-relative">
                          <form>
                            <input type='text' value={val?.code} className='w-100 coupon-code-text' id='codeInput' />
                            <div className='copy-code position-absolute' onClick={codeCopFun}>
                              Copy
                            </div>
                          </form>
                        </div>
                      } */}
                      <div className="position-relative">
                        <form>
                          <input type='text' value={val?.code} className='w-100 coupon-code-text' id={val?.id} />
                          {/* <div className='copy-code position-absolute' onClick={() => codeCopFun(val?.id)}>
                            {textChange.includes(val?.id) ? 'Copied' : 'Copy'}
                          </div> */}
                          {/* <button className='copy-code position-absolute border-0 text-white d-flex align-items-center justify-content-center rounded-3' onClick={(e) => codeCopFun(e, val?.id)}>
                            <i className="fa fa-clone"></i>
                          </button> */}

                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={textChange?.includes(val?.id) ? renderTooltip : hideTooltip}
                            trigger='click'
                          >
                            <button className='copy-code position-absolute border-0 text-white d-flex align-items-center justify-content-center rounded-3' onClick={(e) => codeCopFun(e, val?.id)}>
                              <i className="fa fa-clone"></i>
                            </button>
                          </OverlayTrigger>
                        </form>
                      </div>
                    </div>
                  </div>
                  

                </div>
              </div>
            ))
          }


        </div>
      </Row>

      {
        (!data?.length && subStep3 == 1) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container gift-card-icon'>

          </div>
          <h3><strong>Gift Card </strong>Received</h3>
          <p>You haven’t received  any Gift Card yet.</p>
          {/* <button className="btn primary-blue-small-btn-40 mt-3">View Services</button> */}
        </div>
      }

      {
        (!data?.length && subStep3 == 2) &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container gift-card-icon'>

          </div>
          <h3><strong>Gift Card </strong>Sent</h3>
          <p>You haven’t Sent any Gift Card yet.</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(GIFTCARD)}} >Gift your friend</button>
        </div>
      }
    </div>
  )
}

export default Step5
