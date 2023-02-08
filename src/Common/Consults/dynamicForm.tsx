import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DialogProps, Stack, TextField } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermConditionModel from '../TermConditionPopup/termConditionModel';

const ConsultForm = ({ handleNext, value, setValue, handlePrev,term_condition,setTermPolicy }: any) => {
    
    const [errors, setErrors] = useState<any>({})
    const [open, setOpen] = React.useState<boolean>(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    // const [term_condition,setTermPolicy] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {

        let name = e.target.name;
        let inputValue = e.target.value
        setErrors({
            ...errors,
            [name]: ""
        })
        setValue({
            ...value,
            [name]: inputValue
        })
    }
    // const dateHandler = (newValue: Date | null) => {

    //     var date = moment(newValue)
    //     var now = moment()
    //     if (now > date) {
    //         setValue({
    //             ...value,
    //             ["dob"]: newValue
    //         })
                   
          
    //         // toast.error("Invalid Date")
    //     }
       
    //     // setValue({
    //     //     ...value,
    //     //     ["dob"]: newValue
    //     // })

    // }
    const dateHandler = (date: Date | null | any) => {
        
        setErrors({
            ...errors,
            ["due_date"]: ""
        })
        setValue({
            ...value,
            ["due_date"]: moment(date).format('MM/DD/YYYY')
        })
    }


    const handleSubmit = (e:any) => {
      
       
        if (!value?.due_date || value?.due_date === "Invalid date" || !term_condition || !value?.is_your_first_baby 
        // || !value?.address
            // !value?.child_name || value?.child_name?.length < 3 ||
        ) {
            let error: any = {}
            // if (value?.child_name?.length < 3) {
            //     error.child_name = "Minimum 3 char required"
            // }
            // if (!value?.child_name) {
            //     error.child_name = "Please input the value"
            // }            
            if (!value?.due_date) {
                error.due_date = "Please select date"
            }
            if (value?.due_date === "Invalid date") {
                error.due_date = "Please select date"
            }
            if (!value?.is_your_first_baby) {
                error.is_your_first_baby = "Please input the value"
            }
            // if (!value?.address) {
            //     error.address = "Please input the value"
            // }
            // if (!value?.about_yourself) {
            //     error.about_yourself = "Please input the value"
            // }
            if (!term_condition) {
                error.term_condition = "Please check the policy"
            }

            setErrors(error)
            
        } else {

            
            // console.log(value)
            // console.log(term_condition)
            handleNext(value)
        }
    }

    const policyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // let checked = e.target.checked;

        setErrors({
            ...errors,
            [e.target.name]: ""
        })
        setTermPolicy(e.target.checked)
        setValue({
            ...value,
            term_condition:e.target.checked
        })      
    }
    let handleRadioButton = (e: any) => {
        let val = e.target.value;
        setErrors({
            ...errors,
            [e.target.name]: ""
        })
        setValue({
            ...value,
            [e.target.name]: val
        })
    }
    const termOfService=(e:any)=>{
        e.preventDefault()
        setOpen(true)
    }
    console.log(value)
    console.log('term_condition',term_condition)
    return (
        <div>
            <TermConditionModel open={open} setOpen={setOpen} scroll={scroll} setScroll={setScroll} />
            <section className='step-container step2'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Complete your Information</h3>
                </div>
                <form >
                    <div className='row'>
                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
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
                                    <MobileDatePicker
                                        // label="Date picker"
                                        toolbarTitle="Choose date"
                                        value={value?.due_date || ""}
                                        // disableFuture
                                        onChange={dateHandler}
                                        renderInput={(params) => <TextField  placeholder="MM-DD-YYYY"  {...params}    className='due-date-field' />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <h4 className="error-msgtext">{errors.due_date}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Child's Name: <span className='fw-light'> (if applicable)</span></label>
                            <input type="text" value={value?.child_name} name="child_name" onChange={handleChange} className='form-control' />
                            {/* <h4 className="error-msgtext">{errors?.child_name}</h4> */}
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Is this your first baby ? <span className='mandatory text-danger mx-2'>*</span></label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="is_your_first_baby" checked={value?.is_your_first_baby === "yes"} onChange={handleChange} value="yes"
                                    className="custom-control-input form-check-input"

                                />
                                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                <input type="radio" id="customRadio2" name="is_your_first_baby"
                                    onChange={handleChange}
                                    value="no" checked={value?.is_your_first_baby === "no"}
                                    className="custom-control-input form-check-input"
                                />
                                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                            </div>
                            <h4 className="error-msgtext">{errors.is_your_first_baby}</h4>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>What is your full address <span className="fw-light">(including zip code)</span>: </label>
                            <input type="text" className='form-control' name="partner_support_person_name" value={value?.partner_support_person_name} onChange={handleChange} placeholder='Address' />
                            {/* <h4 className="error-msgtext">{errors?.partner_support_person_name}</h4> */}
                        </div>

                    <div className="form-group col-lg-12 col-md-12 mb-3">
                        <label>Please tell us a little more about yourself and how we can best support you now or in the future: <span className='mandatory text-danger mx-2'>*</span></label>
                        <textarea name="medical_surgical_history_baby" className="form-control" value={value?.medical_surgical_history_baby}  onChange={handleChange} placeholder="Type something" > </textarea>
                        {/* <h4 className="error-msgtext d-none">{errors?.partner_support_person_email_address}</h4> */}
                        {/* <h4 className="error-msgtext">{errors?.partner_support_person_email_address}</h4> */}
                    </div>

                    <div className="radio-area mb-3">
                        <h4>How did you hear about us? <span className="fw-light">(optional)</span></h4>
                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Social Media"} value="Social Media" onChange={handleRadioButton} id="customCheck1" />
                                <label className="form-check-label" >
                                    Social Media
                                </label>
                            </div>
                        </div>

                         <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Friend"} value="Friend" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Friend
                                </label>
                            </div>
                        </div> 

                         <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Print"} value="Print" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Print
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio"> 
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Internet Search"} value="Internet Search" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Internet Search
                                </label>
                            </div>
                        </div> 

                         <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Healthcare professional"} value="Healthcare professional" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Healthcare professional
                                </label>
                            </div>
                        </div>
                         <h4 className="error-msgtext">{errors?.hear_about}</h4>
                    </div> 

                        {/* <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>What is your full address <span className='fw-light'>(including zip code)</span> ? <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" onChange={handleChange} value={value?.address} name="address" className='form-control' placeholder='Address' />
                            <h4 className="error-msgtext">{errors?.address}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Please tell us a little more about yourself and how we can best support you now or in the future: <span className='mandatory text-danger mx-2"'>*</span></label>
                            <textarea className='form-control'
                                onChange={handleChange}
                                value={value?.about_yourself} name="about_yourself"
                                placeholder='Type something' />
                            <h4 className="error-msgtext">{errors?.about_yourself}</h4>
                        </div> */}

                        {/* <div className="radio-area mb-3">
                            <h4>How did you hear about us? (optional)</h4>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        onChange={handleChange} value="Social Media" checked={value?.hear_about === "Social Media"}
                                        id="customCheck1" />
                                    <label className="form-check-label" >
                                        Social Media
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" checked={value?.hear_about === "Friend"}
                                        type="radio" name="hear_about" onChange={handleChange} value="Friend" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Friend
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        checked={value?.hear_about === "Print"}
                                        name="hear_about" onChange={handleChange} value="Print" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Print
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        checked={value?.hear_about === "Internet Search"}
                                        name="hear_about" onChange={handleChange} value="Internet Search" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Internet Search
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        checked={value?.hear_about === "full time stay at home parent"}
                                        name="hear_about" onChange={handleChange} value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Healthcare professional
                                    </label>
                                </div>
                            </div>

                        </div> */}

                        <div className='agreement-container py-4'>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name='term_condition'
                                    className="custom-control-input form-check-input"
                                    checked={term_condition}
                                    onChange={policyHandler}
                                />
                                {/* <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='#' className='blue-link' onClick={termOfService} > terms of service</a></label> */}
                                <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService} > terms of service</a></label>
                            </div>
                            <h4 className="error-msgtext">{errors?.term_condition}</h4>
                        </div>
                    </div>
                </form>

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn' onClick={handlePrev}>Previous</button>
                    <button className='primary-blue-small-btn next' onClick={handleSubmit}>Next</button>
                </div>
            </section>
        </div>
    )
}

export default ConsultForm;