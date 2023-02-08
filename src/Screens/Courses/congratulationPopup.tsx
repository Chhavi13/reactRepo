import React from 'react';
import { Modal } from 'react-bootstrap';
import "./detailPopup.scss";
import "./congratulation.scss";

const Congratulation = (props: any) => {
   // function test(){
   //    debugger
   // } 
  return (
    <div>
      <Modal
        {...props}
         // backdrop={test}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='custom_modal'
      >
        <Modal.Body>
           <div className='mode_heade'>
           <h3>Congratulations!</h3>
           <p>Thanks for buying our Course</p>
           </div>
           <div className='modalcustom_area'>
             <div className='border_b'>
              <div className='row justify-content-center align-items-center'>
                   <div className='col-md-6'>
                      <div className='pop_head'>
                         <h3>Receipt</h3>
                      </div>
                   </div>
                   <div className='col-md-6'>
                        <div className='head_content'>
                           <p>Invoice Number</p>
                           <h3>8675309</h3>
                        </div>
                   </div>
              </div>
              </div>
              <div className='border_b'>
              <div className='row justify-content-center align-items-center'>
                   <div className='col-md-6'>
                      <div className='mem_head'>
                         <p>Sept. 15 - Oct. 14 </p>
                         <h6>Monthly Membership</h6>
                      </div>
                   </div>
                   <div className='col-md-6'>
                        <div className='mem_detail'>
                           <p>$97.00</p>
                        </div>
                   </div>
              </div>
              </div>

              <div className='border_b'>
              <div className='row justify-content-center align-items-center'>
                   <div className='col-md-6'>
                      <div className='tex'>
                         <p>Tax (6.25%)</p>
                        </div>
                   </div>
                   <div className='col-md-6'>
                        <div className='mem_detail'>
                           <p>$97.00</p>
                        </div>
                   </div>
              </div>
              </div>
              
              <div className='total_boxx'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='total'>
                          <h3>Total</h3>
                      </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='total'>
                      <p>$103.06</p>
                      </div>
                    </div>
                  </div>
              

              </div>
              <div className='paid_box'>
                   <div className='row justify-content-center align-items-center'>
                      <div className='col-md-4'>
                         <div className='paid_in'>
                           <h5>Paid</h5>
                         </div>
                      </div>
                      <div className='col-md-4'>
                      <div className='paid_in'>
                           <p>October 14, 2021</p>
                         </div>
                      </div>
                      <div className='col-md-4'>
                      <div className='paid_in'>
                           <p>Credit Card: Visa  -  1234</p>
                         </div>
                      </div>
                   </div>
              </div>

              <div className='row'>
                 <div className='col-md-12'>
                    <div className='botm-text'>
                       <p>Need some help, or have a question?</p>
                       <a href="#!">Contact Us</a>
                    </div>
                 </div>
              </div>
           </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Congratulation