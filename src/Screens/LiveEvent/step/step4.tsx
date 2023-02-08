import React from 'react'
import { Row } from 'react-bootstrap'
import "../../Consults/consult.scss";
import video_list_thumb from '../../.././Assets/img/profile/video-list-thumb.png'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Autocomplete from '@mui/material/Autocomplete';

function Step4() {

  const top100Films = [
    { label: 'Labor Prep', value: 1 },
    { label: 'Labor Prep', value: 2 },
    { label: 'Labor Prep', value: 3 },
]

const consult_type = [
    { label: 'Type 1', value: 1 },
    { label: 'Type 2', value: 2 },
    { label: 'Type 3', value: 3 },
]

  return (
    <div>
      
      <Row className='mt-3'>        
        <div className='col-lg-12 col-md-12'>

          <div className='profile-container-main p-4 p-md-2 mb-3'>
            <div className='d-flex align-items-md-center align-items-start profile-container-inner flex-column flex-md-row '>
              <div className='profile-section-thumbnail mb-3 mb-md-0'>
                <img src={video_list_thumb} className='img-responsive' />
              </div>
              <div className='profile-section-detail mx-0 mx-md-3'>
                <h3 className='section-title'>
                  CPR & first aid for infants/children
                  Live Virtual Class
                </h3>
                <div className='section-time-container w-75'>
                  <span className='time-stamp'>Thursday, June 23, 2022 <br /> 7:30 PM  8:30 PM</span>
                </div>
              </div>
              <div className='btn-conatainer mx-0 mx-md-3 mt-3 mt-md-0'>
                <button className='primary-blue-small-btn-40 btn'>Reshedule</button>
              </div>
            </div>
            <hr></hr>
            <div className='step-container step1 mt-5'>
                <h3>Select Consult</h3>
                <div className="consult-card-container">
                    <div className='d-flex py-3 px-3 justify-content-between'>
                        <div className='consult-info d-flex flex-column'>
                            <div className='time-projection-details d-flex'>
                                <div className='time-projection'>In 2 Weeks</div>
                                <div className='availablity'>24 spots left</div>
                            </div>
                            <div className='consult-date my-3'>Wednesday <span className='strong'>13 May </span> 2022</div>
                            <div className='consult-tm-dtls mb-3'> 
                                <span className='consult-time'><span className='strong'>10:30am </span> 1 hour </span>
                                <span className='host-name'>| by Katie Flaherty</span>
                            </div>
                            <div className='btn-container'>
                                <button className='btn primary-blue-small-btn-40'>Book</button>
                            </div>
                        </div>
                        <div className='consult-price'>
                            <span className='price'>$100</span>
                        </div>
                    </div>
                </div>

                <div className="consult-card-container">
                    <div className='d-flex py-3 px-3 justify-content-between'>
                        <div className='consult-info d-flex flex-column'>
                            <div className='time-projection-details d-flex'>
                                <div className='time-projection'>In 2 Weeks</div>
                                <div className='availablity'>24 spots left</div>
                            </div>
                            <div className='consult-date my-3'>Wednesday <span className='strong'>13 May </span> 2022</div>
                            <div className='consult-tm-dtls mb-3'> 
                                <span className='consult-time'><span className='strong'>10:30am </span> 1 hour </span>
                                <span className='author-name'>| by Katie Flaherty</span>
                            </div>
                            <div className='btn-container'>
                                <button className='btn primary-blue-small-btn-40'>Book</button>
                            </div>
                        </div>
                        <div className='consult-price'>
                            <span className='price'>$100</span>
                        </div>
                    </div>
                    
                    <div className='additional-class py-3 px-3'>
                        <hr />
                        <h2 className='text-start pb-0 mb-2 add-head' >Bundle and Save</h2>
                        <p>Add on additional classes to your Infant and Child CPR course including <strong>Labor Prep, Newborn Essentials, and/or Breastfeeding Basics.</strong></p>
                        <hr />
                        <div className='class-list w-100 d-flex flex-column flex-md-row mb-3 mb-md-0'>
                            <div className="mb-3 me-2">
                                <label>Select Class 1</label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Labor Prep' />}
                                />
                            </div>

                            <div className="mb-3 me-2">
                                <label>Select Appointment</label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Choose Later'/>}
                                />
                            </div>

                            <div className='me-md-0 me-auto ms-md-auto ms-0'>
                                <div className='d-flex justify-content-end flex-md-column'>
                                    <div className='ms-auto me-0'><input type='checkbox' className='form-check-input me-0 ms-auto'/></div>
                                    <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0'><span className='text-decoration-line-through actual-price'>$100</span><span className='strong'>+$80</span></div>
                                </div>
                            </div>
                        </div>

                        <div className='class-list w-100 d-flex flex-column flex-md-row mb-3 mb-md-0'>
                            <div className="mb-3 me-2">
                                <label>Select Class 1</label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Labor Prep' />}
                                />
                            </div>

                            <div className="mb-3 me-2">
                                <label>Select Appointment</label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Choose Later'/>}
                                />
                            </div>

                            <div className='me-md-0 me-auto ms-md-auto ms-0'>
                                <div className='d-flex justify-content-end flex-md-column'>
                                    <div className='ms-auto me-0'><input type='checkbox' className='form-check-input me-0 ms-auto'/></div>
                                    <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0'><span className='text-decoration-line-through actual-price'>$100</span><span className='strong'>+$80</span></div>
                                </div>
                            </div>
                        </div>

                        <div className='class-list w-100 d-flex flex-column flex-md-row mb-3 mb-md-0'>
                            <div className="mb-3 me-2">
                                <label>Select Class 1</label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Labor Prep' />}
                                />
                            </div>

                            <div className="mb-3 me-2">
                                <label>Select Appointment</label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="class-id"
                                options={top100Films}
                                className={'w-100, mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Choose Later'/>}
                                />
                            </div>

                            <div className='me-md-0 me-auto ms-md-auto ms-0'>
                                <div className='d-flex justify-content-end flex-md-column'>
                                    <div className='ms-auto me-0'><input type='checkbox' className='form-check-input me-0 ms-auto'/></div>
                                    <div className='additional-cost mt-0 mt-md-3 ms-3 ms-md-0'><span className='text-decoration-line-through actual-price'>$100</span><span className='strong'>+$80</span></div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='total-amt d-flex justify-content-between'>
                            <div className='total-amount'>Total <span className='total-value'>$260</span></div>
                            <div><button className='primary-blue-small-btn-40 btn'>Buy Now</button></div>
                        </div>
                    </div>
                </div>
            </div>

                
          </div>
        </div>
      </Row>
    </div>
  )
}

export default Step4