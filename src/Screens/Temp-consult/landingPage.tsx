import React from 'react';
import "./2consult.scss";
import TextField from '@mui/material/TextField';
// import {Form} from 'react-bootstrap';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import calender_thumb from "../../Assets/img/calender.png";
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/lab';
import or_img from "../../Assets/img/giftcard/Or.svg";
import card_cover from "../../Assets/img/giftcard/card-cover.svg";


const ConsultLandign = () => {
    // function StaticDatePickerDemo() {
    //     const [value, setValue] = React.useState<Date | null>(new Date());
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

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
            <div className='Veterans-Moms’-Survival-Group'>
                <section className='step-container step1'>
                    <div className='consult-section-heading text-center'>
                        <h3>Veterans Moms’ Survival Group</h3>  
                        <h3 className='my-4'>Choose an Appointment</h3>
                    </div>

                    <div className="consult-card-container">
                        <div className='d-flex py-3 px-3 justify-content-between'>
                            <div className='consult-info d-flex flex-column'>
                                <div className='time-projection-details d-flex'>
                                    <div className='time-projection'>In 2 Weeks</div>
                                    <div className='availablity'>24 spots left</div>
                                </div>
                                <div className='consult-date my-3'>Wednesday <span className='strong'>13 May </span> 2022</div>
                                <div className='consult-tm-dtls mb-1'> 
                                    <span className='consult-time'><span className='strong'>10:30am </span> 1 hour </span>
                                    <span className='host-name'>| by Katie Flaherty</span>
                                </div>
                                <div className='show-class-tm'><a href='#'>Show Class times</a></div>
                                <div className='btn-container mt-3'>
                                    <button className='btn primary-blue-small-btn-40'>Book</button>
                                </div>
                            </div>
                            <div className='consult-price '>
                                <span className='price'>$100</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='step-container step2'>
                    <div className='consult-section-heading text-center'>
                        <h3 className='my-5'>Complete your Information</h3>
                    </div>
                    <form className=' '>
                        <div className='row'>
                            <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                                <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
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
                                        <MobileDatePicker
                                            // label="Date picker"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Child's Name: <span className="fw-light"> (if applicable)</span> <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" name="child_name" className="form-control"/>
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
                                <label>Partner or Support Person's Name <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" className='form-control' placeholder='(if applicable...)'/>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Partner or Support Person's Email address <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" className='form-control' placeholder='(for reminderes, content, and follow-up)' />
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            {/* <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Please tell us a little more about yourself and how we can best support you now or in the future:<span className='mandatory'>*</span></label>
                                <textarea className='form-control' placeholder='Type something' />
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div> */}

                            {/* <div className="radio-area mb-3">
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

                            </div> */}

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
                
            </div>

            <div className='remote-sleep-consult'>
                <section className='step-container step1'>
                    <div className='consult-section-heading text-center'>
                        <h3>Remote Group Sleep Consults</h3>  
                        <h3 className='my-4'>Choose an Appointment</h3>
                    </div>

                    <div className="consult-card-container">
                        <div className='d-flex py-3 px-3 justify-content-between'>
                            <div className='consult-info d-flex flex-column'>
                                <div className='time-projection-details d-flex'>
                                    <div className='time-projection'>In 2 Weeks</div>
                                    <div className='availablity'>24 spots left</div>
                                </div>
                                <div className='consult-date my-3'>Wednesday <span className='strong'>13 May </span> 2022</div>
                                <div className='consult-tm-dtls mb-1'> 
                                    <span className='consult-time'><span className='strong'>10:30am </span> 1 hour </span>
                                    <span className='host-name'>| by Katie Flaherty</span>
                                </div>
                                <div className='show-class-tm'><a href='#'>Show Class times</a></div>
                                <div className='btn-container mt-3'>
                                    <button className='btn primary-blue-small-btn-40'>Book</button>
                                </div>
                            </div>
                            <div className='consult-price '>
                                <span className='price'>$100</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='step-container step2'>
                    <div className='consult-section-heading text-center'>
                        <h3 className='my-5'>Complete your Information</h3>
                    </div>
                    <form className=' '>
                        <div className='row'>
                            <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                                <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    
                                    <Stack spacing={3}>
                                        <DatePicker
                                            // label="Date picker"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Child's Name: <span className="fw-light"> (if applicable)</span> <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" name="child_name" className="form-control"/>
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
                                <label>Partner or Support Person's Name <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" className='form-control' placeholder='Type something'/>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Partner or Support Person's Email address <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" className='form-control' placeholder='Enter email address' />
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Will your partner be on the call? <span className='fw-light'>(encouraged by not required!)</span></label>
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
                                <label>Please list any medical or surgical history for your baby that we should be aware of: <span className='mandatory text-danger mx-2'>*</span></label>
                                <textarea className='form-control' placeholder='Type something'> </textarea>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>What methods <span className='fw-light'> (if any) </span> of sleep training have you tried? <span className='mandatory text-danger mx-2'>*</span></label>
                                <textarea className='form-control' placeholder='Type something'> </textarea>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>
                            
                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>What is your biggest sleep concern you would like to address during the consultation? <span className='mandatory text-danger mx-2'>*</span></label>
                                <textarea className='form-control' placeholder='Type something'> </textarea>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                            </div>
                            
                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Please list any medical or surgical history for your baby that we should be aware of:<span className='mandatory text-danger mx-2'>*</span></label>
                                <textarea className='form-control' placeholder='Type something'> </textarea>
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
            </div>

            <section className='step-container step1'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-4'>Choose an Appointment</h3>
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
            </section>

            <section className='step-container step2'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Complete your Information</h3>
                </div>
                <form className=' '>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                            <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
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
                                        // label="Date picker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
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
                            <label>Partner or Support Person's Name <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='(if applicable...)'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Email address <span>(including zip code)?</span><span className='mandatory'>*</span></label>
                            <input type="text" className='form-control' placeholder='(for reminderes, content, and follow-up)' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        {/* <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Please tell us a little more about yourself and how we can best support you now or in the future:<span className='mandatory'>*</span></label>
                            <textarea className='form-control' placeholder='Type something' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div> */}

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

                <div className="consult-card-container selected-consult-container py-3 py-md-4 px-4 px-md-3">
                    <div className='d-flex justify-content-between flex-column flex-md-row'>
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
                    <hr />
                    <div className='d-flex justify-content-between flex-column flex-md-row additional-class-container'>
                        <div className='d-flex flex-column'>
                            <div className='me-md-4 pe-md-5 me-2'>
                                <h3 className='selected-consult-title'>+2 additional prenatal classes</h3>
                            </div>
                            <div className='Show-details'>Show Details</div>
                        </div>
                        <div className='additional-cost'>
                            <h2 className='text-start m-0 p-0'><span className="text-decoration-line-through actual-price">$100</span><span className="strong">+$80</span></h2>
                        </div>
                    </div>
                    <hr />
                    <div className='coupon-container'>
                        <div className="apply-couponcode mb-4">
                            <h6 className="apply-heading">Apply Coupon Code</h6>
                            <div className="position-relative">
                                <div className="d-flex justify-content-between">
                                    <input type="text" className="form-control" value="" /><button className="btn secondary-teal-btn ms-2">Apply</button></div><span className="error"></span>
                                </div>
                            </div>
                    </div>
                    
                    <hr />
                    <div className='subtotal d-flex'>
                        <span className='ms-0 me-auto'><h2 className='m-0 p-0'>Subtotal</h2></span>
                        <span className='price me-0 ms-auto'><h2 className='m-0 p-0'>Free</h2></span>
                    </div>
                </div>

                <div className="bill-details">
                    <h6>Billing Details</h6>
                    <ul className="first py-3 py-md-3 px-3 px-md-4">
                        <li className='d-flex justify-content-between consult-total'><span className="headingspan">Consult Total</span><span className="pricespan">$</span></li>
                        <li className="d-flex justify-content-between coupon-discount "><span>Coupon Discount</span><span>- $0</span></li>
                        <li className="d-flex justify-content-between"><span>Taxes &amp; Charges</span><span>+$0</span></li>
                    </ul>
                    
                    <ul className="pay-list px-3 px-md-4">
                        <li className="d-flex justify-content-between"><span className="payspan">To Pay</span><span className="pay-total">$NaN</span></li>
                    </ul>
                </div>

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn previous'>Previous</button>
                    <button className='primary-blue-small-btn next'>Next</button>
                </div>
            </section>

            <section className='private-consult step-container'>
                <div className='consult-section-heading text-center'>
                    <h5>Breastfeeding Basics Classes</h5>
                    <h3 className='mb-5 mt-2'>Private Class Request Form</h3>
                    <p className='text-center'>Please complete our Request Form below and a NAPS staff member will be in touch with you shortly to book your appointment.</p>
                    <p className='text-center'>Private, prenatal classes are held privately in your home with a Registered Nurse. Or, if you prefer, you may book a private, virtual session instead. Please indicate your choice on the form.</p>
                </div>
                <form className=' '>
                    <div className='row'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>First Name <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Lorem Ipsum'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Last Name<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Lorem Ipsum'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Email <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='your@email.com'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Phone Number <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='123456'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                                <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span> </label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    {/* <Stack spacing={3}> */}
                                    {/* <MobileDatePicker
                                                    value={value?.dob || "fdsfdg"}
                                                    toolbarTitle="Choose date"
                                                    disableFuture */}
                                    {/* onChange={handleDateChange} */}
                                    {/* renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                                /> */}
                                    {/* </Stack> */}
                                    <Stack spacing={3}>                             <DatePicker
                                            // label="Date picker"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Street address <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Total Anticipated Participants<span className='mandatory text-danger mx-2'>*</span></label>
                            <TextField
                            id="filled-number"
                            // label="Number"
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            className='number-field'
                            />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="radio-area pb-4 ">
                            <h4>Would you like to book an in-home or virtual consult? <span className='mandatory text-danger mx-2'>* </span></h4>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                    className="custom-control-input form-check-input"
                                    
                                />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">In-home</label>
                                <input type="radio" id="customRadio1" name="pregnant" value="no"
                                    className="custom-control-input form-check-input"
                                    
                                />
                                <label className="custom-control-label step_two" htmlFor="customRadio2">Virtual Class</label>
                            </div>
                            
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>

                    <div className="radio-area mb-3">
                            <h4>Prenatal Classes Being Requested <span className='mandatory text-danger mx-2'>* </span></h4> 
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time working parent" id="customCheck1" />
                                    <label className="form-check-label" >
                                        Labor & Delivery Prep
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="part time working parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Newborn Essentials 
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Breastfeeding Basics
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="type_mom" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Infant & Child CPR and First Aid
                                    </label>
                                </div>
                            </div>

                        </div>
                    <div className='row'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Preferred Date #1<span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <Stack spacing={3}>
                                        <DatePicker
                                            // label="Date picker"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='preferred-dt'/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Preferred Date #1<span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    
                                    <Stack spacing={3}>                             <DatePicker
                                            // label="Date picker"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='preferred-dt'/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Preferred Time #1<span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                // label="Basic example"
                                value={value}
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                className="d-flex"
                                renderInput={(params) => <TextField {...params} className='preferred-tm'/>}
                            />
                            </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Preferred Time #2<span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                // label="Basic example"
                                value={value}
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} className='preferred-tm' />}
                            />
                            </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label>Regardless of your vaccination status, have you experienced any of the symptoms in the list below in the past 48 hours?<span className='mandatory text-danger mx-2'>*</span></label> 
                        <p>Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhea.</p>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                            
                            <input type="radio" id="customRadio1" name="pregnant" value="no"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <label>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick with COVID-19?<span className='mandatory text-danger mx-2'>*</span></label> 
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                            
                            <input type="radio" id="customRadio1" name="pregnant" value="no"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <label>Have you been in close physical contact in the last 14 days with anyone who is known to have laboratory-confirmed COVID-19 or anyone who has any symptoms consistent with COVID-19?</label> 
                        <p>Close physical contact is defined as being within 6 feet of an infected/symptomatic person for a cumulative total of 15 minutes or more over a 24-hour period starting from 48 hours before illness onset (or, for asymptomatic individuals, 48 hours prior to test specimen collection).</p>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                            
                            <input type="radio" id="customRadio1" name="pregnant" value="no"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                    </div>

                    <div className='section-navigation my-5 d-flex justify-content-between'>
                        {/* <button className='primary-blue-small-btn previous'>Previous</button> */}
                        <button className='primary-blue-small-btn next w-100'>Submit </button>
                    </div>
                </form>
            </section>

            <section className='private-consult step-container'>
                <div className='consult-section-heading text-center'>
                    <h5>Lactation Consult </h5>
                    <h3 className='mb-5 mt-2'>In-Person Lactation Consult Request Form</h3>
                    <p className='text-center mb-5 mb-md-5'>If You Are Based In Massachusetts And Would Like To Schedule An In-Person Lactation Consultation, Please Complete Our Lactation Consult Request Form Below And A NAPS Staff Member Will Be In Touch With You Shortly To Book Your Appointment.</p>
                </div>
                <form className=' '>
                    <div className='row mb-3'>
                        <label>Regardless of your vaccination status, have you experienced any of the symptoms in the list below in the past 48 hours? <span className='mandatory text-danger mx-2'>*</span></label> 
                        <p>Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhea.</p>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                            
                            <input type="radio" id="customRadio1" name="pregnant" value="no"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <label>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick with COVID-19? <span className='mandatory text-danger mx-2'>*</span></label> 
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                            
                            <input type="radio" id="customRadio1" name="pregnant" value="no"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <label>Have you been in close physical contact in the last 14 days with anyone who is known to have laboratory-confirmed COVID-19 or anyone who has any symptoms consistent with COVID-19? <span className='mandatory text-danger mx-2'>*</span></label> 
                        <p>Close physical contact is defined as being within 6 feet of an infected/symptomatic person for a cumulative total of 15 minutes or more over a 24-hour period starting from 48 hours before illness onset (or, for asymptomatic individuals, 48 hours prior to test specimen collection).</p>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                            
                            <input type="radio" id="customRadio1" name="pregnant" value="no"
                                className="custom-control-input form-check-input"/>
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>First Name <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Lorem Ipsum'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Last Name<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Lorem Ipsum'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Email <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='your@email.com'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Phone Number <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='123456'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label >Type of Consultation: <span className='mandatory text-danger mx-2'>*</span> </label>
                                <Autocomplete
                                disablePortal
                                disableClearable
                                id="consult-type"
                                options={consult_type}
                                className={'mu-custom-fields'}
                                renderInput={(params) => <TextField {...params} placeholder='Select Consultation'/>}
                                />
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Street address <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-4 col-md-4 mb-3">
                            <label>City <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='XYZ'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-4 col-md-4 mb-3">
                            <label>State <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='XYZ'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-4 col-md-4 mb-3">
                            <label>Zip Code <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='XYZ'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                                <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span> </label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    {/* <Stack spacing={3}> */}
                                    {/* <MobileDatePicker
                                                    value={value?.dob || "fdsfdg"}
                                                    toolbarTitle="Choose date"
                                                    disableFuture */}
                                    {/* onChange={handleDateChange} */}
                                    {/* renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                                /> */}
                                    {/* </Stack> */}
                                    <Stack spacing={3}>                             <DatePicker
                                            // label="Date picker"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Concerns You Would Like to Address During Your Consult:<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='0'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                    </div>
                   

                    <div className="radio-area mb-3">
                        <h4>Do you have any pets in the home? <span className='mandatory text-danger mx-2'>* </span></h4> 
                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" value="full time working parent" id="customCheck1" />
                                <label className="form-check-label" >
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" value="part time working parent" id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Yes - dog
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" value="full time stay at home parent" id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Yes -cat
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="radio-area mb-3">
                        <h4>Are you a current member of Nurture by NAPS? <span className='mandatory text-danger mx-2'>* </span></h4> 
                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" value="full time working parent" id="customCheck1" />
                                <label className="form-check-label" >
                                Yes, give me my member discount!
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" value="part time working parent" id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                No, but I would like more information
                                </label>
                            </div>
                        </div> 
                    </div>

                    

                    <div className='section-navigation my-5 d-flex justify-content-between'>
                        {/* <button className='primary-blue-small-btn previous'>Previous</button> */}
                        <button className='primary-blue-small-btn next w-100'>Submit </button>
                    </div>
                </form>
            </section>

            <section className='Pre-baby_bootcamp step-container step2'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Complete your Information(Pre baby)</h3>
                </div>
                <form className=' '>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                            <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
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
                                        // label="Date picker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
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
                            <label>If you purchased an "add on" for the VIP package to includea a CPR course, which date woud you like to register? <span className="fw-light">(please check individual class page for upcoming schedule)</span> <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Type something'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Name <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Type something'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Email address <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Type something' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        {/* <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Please tell us a little more about yourself and how we can best support you now or in the future:<span className='mandatory'>*</span></label>
                            <textarea className='form-control' placeholder='Type something' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div> */}

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
            
            <section className='Pre-baby_bootcamp step-container step2'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Complete your Information(Private sleep consult)</h3>
                </div>
                <form className=' '>
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                            <label >Due Date/Child's Birthday <span className='mandatory text-danger mx-2'>*</span></label>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
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
                                        // label="Date picker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field'/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                            <label >Child's Name <span className="fw-light">(if applicable)</span> <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='(if applicable...)'/>
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
                            <label>Partner or Support Person's Name <span className="fw-light"> (if applicable)</span></label>
                            <input type="text" className='form-control' placeholder='(if applicable...)'/>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Email address <span className="fw-light">(for reminders, content, and follow up)</span></label>
                            <input type="text" className='form-control' placeholder='(for reminderes, content, and follow-up)' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Will your partner be on the call?  <span className="fw-light">(encouraged by not required!)</span> <span className='mandatory text-danger mx-2'>*</span></label>
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

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>Please list any medical or surgical history for your baby that we should be aware of: <span className="mandatory text-danger mx-2">*</span></label><textarea className="form-control" placeholder="Type something"> </textarea><h4 className="error-msgtext d-none">error</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>What methods (if any) of sleep training have you tried? <span className="mandatory text-danger mx-2">*</span></label><textarea className="form-control" placeholder="Type something"> </textarea><h4 className="error-msgtext d-none">error</h4>
                        </div>
                        
                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>What is your biggest sleep concern you would like to address during the consultation? <span className="mandatory text-danger mx-2">*</span></label><textarea className="form-control" placeholder="Type something"> </textarea><h4 className="error-msgtext d-none">error</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>What are your goals for this consultation?  <span className="mandatory text-danger mx-2">*</span></label><textarea className="form-control" placeholder="Type something"> </textarea><h4 className="error-msgtext d-none">error</h4>
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

            <section className='gift-friend'>
                <div className='container'>
                    <div className='row mb-3'>
                        <div className='col-lg-10 col-xl-8 mx-auto'>
                         <h3 className='text-center gift-friend-caption'>Gift Your <span className="strong">Friend</span></h3>
                        </div>
                        <div className='col-lg-10 col-xl-8 mx-auto'>
                        <form className="step-form row">
                            <div className="form-group-m col-lg-12 mb-3">
                                <div className="row">
                                    <div className="form-group birthday-box col-lg-6 col-md-6">
                                        <label>Friend's name</label>
                                        <input type="text" name="friends_name" className="form-control" id="" placeholder="Enter name"/>
                                        <h4 className="error-msgtext"></h4>
                                    </div>

                                    <div className="form-group col-lg-6 col-md-6">
                                        <label>Friend's email addresss</label>
                                        <input type="email" name="friends_email" className="form-control" id="" placeholder="Enter email" />
                                        <h4 className="error-msgtext"></h4>
                                </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
                <div className='container-fluid pale-bg'>
                    <div className='row'>
                        <div className='col-lg-12 col-xl-12'>
                            <div className='container'>
                                    <div className='row custom-gift-card mt-5'>
                                        <div className='col-lg-12 col-xl-12'>
                                            <div className='d-flex w-100 flex-column gift-card-container px-3 px-md-4 py-5 py-md-4'>
                                                <div className='gift-card-info'>
                                                    <h3>Gift Card</h3>
                                                    <p> Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                                    <div className='d-flex amount-container align-items-center'> 
                                                        <div className='amount-field-container me-2'>
                                                            <form>
                                                                <input type="text" placeholder="Amount"  className="amount-field"/>
                                                            </form>
                                                        </div>
                                                        <div className=''>
                                                            <button className='btn send-gift'>Send Gift</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-5'>
                                        <div className='col-lg-12 text-center'>
                                            <img src={or_img} className='img-fluid mx-auto'></img>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-lg-4'>
                                            <div className="card gift-card">
                                                <div className="card-inner">
                                                    <img src={card_cover} className="image-fluid img-fluid w-100" />
                                                </div>
                                                <div className="card-body position-relative">
                                                    <div className="card-title"> <h5>$899.00</h5></div>
                                                    <p className="card-text">Lactation Consultation</p>
                                                    <div className='button-container mb-1'>
                                                        <button className="btn primary-blue-small-btn-40">Send Gift</button>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className="card gift-card">
                                                <div className="card-inner">
                                                    <img src={card_cover} className="image-fluid img-fluid w-100" />
                                                </div>
                                                <div className="card-body position-relative">
                                                    <div className="card-title"> <h5>$899.00</h5></div>
                                                    <p className="card-text">Lactation Consultation</p>
                                                    <div className='button-container mb-1'>
                                                        <button className="btn primary-blue-small-btn-40">Send Gift</button>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className="card gift-card">
                                                <div className="card-inner">
                                                    <img src={card_cover} className="image-fluid img-fluid w-100" />
                                                </div>
                                                <div className="card-body position-relative">
                                                    <div className="card-title"> <h5>$899.00</h5></div>
                                                    <p className="card-text">Lactation Consultation</p>
                                                    <div className='button-container mb-1'>
                                                        <button className="btn primary-blue-small-btn-40">Send Gift</button>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ConsultLandign 