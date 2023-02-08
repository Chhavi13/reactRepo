import React from 'react';
import "./consult.scss";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import calender_thumb from "../../Assets/img/calender.png";
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/lab';

const ConsultLandign = () => {
    // function StaticDatePickerDemo() {
    //     const [value, setValue] = React.useState<Date | null>(new Date());
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };
    return (
        <div>
                <section className='step-container step1'>
                    <div className='consult-section-heading text-center'>
                        <h3 className='my-4'>Choose an Appointment</h3>
                        <h5 className='mb-4'>30-minute Prospective Client Informational Call </h5>
                        <p>This informational call is for prospective clients interested in our in-home, daytime and overnight nursing care services. This thirty minute, getting-to-know you call is an opportunity for you to express your interests and needs and to get acquainted with our team and the NAPS community we have available to you.</p>
                    </div>

                    <div className="consult-card-container">
                        <div className='d-flex py-4 px-3 justify-content-between align-items-center'>
                            <div className='consult-info d-flex  align-items-center '>
                                <div className='consultant-profile me-2' style={{ 'backgroundImage': `url(../../Assets/img/Instructors2.png)` }}>

                                </div>
                                <div className='consultant-name'>
                                    <p>Kate Hanafin</p>
                                </div>
                            </div>
                            <div className='btn-container float-left'>
                                <button className='btn primary-blue-small-btn-40'>Book</button>
                            </div>
                        </div>
                    </div>

                    <div className="consult-card-container">
                        <div className='d-flex py-4 px-3 justify-content-between align-items-center '>
                            <div className='consult-info d-flex  align-items-center '>
                                <div className='consultant-profile me-2' style={{ 'backgroundImage': `url(../../Assets/img/Instructors2.png)` }}>

                                </div>
                                <div className='consultant-name'>
                                    <p>Kate Hanafin</p>
                                </div>
                            </div>
                            <div className='btn-container float-left'>
                                <button className='btn primary-blue-small-btn-40'>Book</button>

                            </div>
                        </div>
                        <div className='calender-container px-3'>
                            <p>Select Date</p>
                            {/* <img src={calender_thumb} /> */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <MobileDatePicker
                                        label="Date & Time picker"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} 
                                        />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className='timeslot-container px-3 pb-3'>
                            {/* <p>Select Time</p>
                        <button className='btn time-btn'> 7:45pm</button>
                        <button className='btn time-btn'> 7:45pm</button>
                        <button className='btn time-btn'> 7:45pm</button>
                        <button className='btn time-btn'> 7:45pm</button>
                        <button className='btn time-btn'> 7:45pm</button>
                        <button className='btn time-btn'> 7:45pm</button> */}
                        </div>
                    </div>

                    <div className="consult-card-container">
                        <div className='d-flex py-4 px-3 justify-content-between align-items-center'>
                            <div className='consult-info d-flex  align-items-center '>
                                <div className='consultant-profile me-2' style={{ 'backgroundImage': `url(../../Assets/img/Instructors2.png)` }}>

                                </div>
                                <div className='consultant-name'>
                                    <p>Kate Hanafin</p>
                                </div>
                            </div>
                            <div className='btn-container float-left'>
                                <button className='btn primary-blue-small-btn-40'>Book</button>
                            </div>
                        </div>
                      
                    </div>
                    {/* <div className='section-navigation my-5 d-flex justify-content-end'>
                        <button className='primary-blue-small-btn next me-0 ms-auto'>Next</button>
                    </div> */}
                </section>

            <section className='step-container step2'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Complete your Information</h3>
                </div>
                <form className=' '>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                {/* <Stack spacing={3}> */}
                                {/* <MobileDatePicker
                                                value={value?.dob || "fdsfdg"}
                                                toolbarTitle="Choose date"
                                                disableFuture */}
                                {/* onChange={handleDateChange} */}
                                {/* renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                            /> */}
                                {/* </Stack> */}
                                <Stack spacing={3}>
                                    <DatePicker
                                        label="Date picker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY"  />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Child's Name: (if applicable) <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Is this your first baby? <span className='mandatory text-danger mx-2'>*</span></label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                    className="custom-control-input form-check-input"

                                />
                                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                <input type="radio" id="customRadio2" name="pregnant"
                                    value="no" className="custom-control-input form-check-input"
                                />
                                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                            </div>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>What is your full address <span>(including zip code)?</span><span className='mandatory'>*</span></label>
                            <input type="text" className='form-control' placeholder='Address' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Please tell us a little more about yourself and how we can best support you now or in the future:<span className='mandatory'>*</span></label>
                            <textarea className='form-control' placeholder='Type something' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="radio-area mb-3">
                            <h4>How did you hear about us? (optional)</h4>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time working parent" id="customCheck1" />
                                    <label className="form-check-label" >
                                        Social Media
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="part time working parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Friend
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Print
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Internet Search
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Healthcare professional
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div className='agreement-container py-4'>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                    className="custom-control-input form-check-input" />
                                <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='#' className='blue-link'> terms of service</a></label>
                            </div>
                        </div>
                    </div>
                </form>

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn previous'>Previous</button>
                    <button className='primary-blue-small-btn next'>Next</button>
                </div>
            </section>

            <section className='step-container step3'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Your Appointment</h3>
                </div>

                <div className="consult-card-container selected-consult-container">
                    <div className='d-flex py-3 py-md-4 px-3 px-md-5 justify-content-between flex-column flex-md-row'>
                        <div className='d-flex flex-column'>
                            <div className='me-md-4 pe-md-5 me-2'>
                                <h3 className='selected-consult-title'>Daytime & Overnight Infantttt Care</h3>
                            </div>
                            <div className='consult-date my-2'>11 May, 2022 - 7:00 to 9:00 pm</div>
                            <div className='change-date'>Change Date</div>
                        </div>
                        <div className='consult-cost'>
                            <h2 className='text-start'>Free</h2>
                        </div>
                    </div>
                    <div className='subtotal d-flex mx-3 mx-md-5 pb-3 pt-3'>
                        <span className='ms-0 me-auto'><h2 className='m-0 p-0'>Subtotal</h2></span>
                        <span className='price me-0 ms-auto'><h2 className='m-0 p-0'>Free</h2></span>
                    </div>
                </div>

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn previous'>Previous</button>
                    <button className='primary-blue-small-btn next'>Next</button>
                </div>
            </section>
        </div>
    )
}

export default ConsultLandign