import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'


const UserInfo = (props: any) => {
    let { field, value, setValue } = props;

    // const [value, setValue] = React.useState<Date | null>(
    //     new Date(),
    // );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
        // setValue(newValue);
    };


    console.log("field all value", field)
    console.log("value all value", value)
    return (
        <div>
            <section className='step-container step2 user-info'>
                <div className='consult-section-heading text-center '>
                    <h3 className='my-5'>Complete your Information</h3>
                </div>

                <form>
                    {field.map((res: any) => (
                        <>
                            < label > {res?.label}</label> 
                            {/* <br /> */}
                            <>
                                {/* {res?.label_type === "checkbox" ? <input type={res?.label_type} name={res?.name} onChange={handleChange} />
                                    : 
                            <input type={res?.label_type} name={res?.name} onChange={handleChange} /><br />

                                } */}
                                {
                                    res?.label_type === ("checkbox" || "radio") ?
                                        res?.label_value_option.map((option: any) => (
                                            <>
                                                < label > {option?.key}</label>
                                                <input type={res?.label_type} value={option?.value} name={res?.name} onChange={handleChange} /> <br />
                                            </>
                                        ))
                                        : <input type={res?.label_type} name={res?.name} onChange={handleChange} />
                                }
                            </>
                        </>
                    ))}
                </form>

                {/* <form className=' '>
                    <div className='row'>

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
                {/* </Stack> // missing currly brancket 
                                <Stack spacing={3}>
                                    <DatePicker

                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Child's Name: (if applicable) </label>
                            <input type="text" className='form-control' placeholder='enter' />
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
                            <label>Partner or Support Person's Name (if applicable): <span className='mandatory'></span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Email address  (for reminders, content, and follow up):  <span className='mandatory'></span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Pediatrician's Name/Practice Name:  <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Medical and/or Surgical History for BABY:<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Mother's DOB: <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>OB's Name/Practice Name<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label >Delivery Type<span className='mandatory text-danger mx-2'>*</span></Form.Label>
                            <div className="custom-radio custom-control-inline tag-container">
                                <div className='d-flex justify-content-between flex-wrap flex-sm-row flex-column'>
                                    <div className='category-option custom-checkbox'>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Vaginal Delivery
                                        </label>
                                    </div>
                                    <div className='category-option custom-checkbox'>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Vaginal Delivery Healthcare professional
                                        </label>
                                    </div>
                                    <div className='category-option custom-checkbox'>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            C-section planned
                                        </label>
                                    </div>
                                    <div className='category-option custom-checkbox'>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            C-section unplanned
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </Form.Group>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Medical and/or Surgical History for MOTHER:<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" className='form-control' placeholder='Enter' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className='agreement-container py-4'>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="pregnant" value="yes"
                                    className="custom-control-input form-check-input" />
                                <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='#' className='blue-link'> terms of service</a></label>
                            </div>
                        </div>
                    </div>
                </form> */}

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn previous'>Previous</button>
                    <button className='primary-blue-small-btn next'>Next</button>
                </div>
            </section>
        </div >
    )
}

export default UserInfo;