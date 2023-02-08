import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DialogProps, Stack, TextField } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermConditionModel from '../../../../Common/TermConditionPopup/termConditionModel';

const UserInfo2 = ({ handleNext, value, setValue, handlePrev, term_condition, setTermPolicy,setPolicy }: any) => {

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
    const dateHandler = (date: Date | null | any, name: string) => {
        setErrors({
            ...errors,
            [name]: ""
        })
        setValue({
            ...value,
            [name]: moment(date).format('MM/DD/YYYY')
        })
    }


    const handleSubmit = () => {

        if (!value?.due_date || value?.due_date === "Invalid date"  || !term_condition || !value?.is_your_first_baby ||
           !value?.medical_surgical_history_baby || !value?.what_method_of_sleep_training || !value?.what_is_your_biggest_sleep_concern || !value?.what_are_your_goals

        ) {
            let error: any = {}
                                   
            if (!value?.due_date) {
                error.due_date = "Please select date"
            }
            if (value?.due_date === "Invalid date") {
                error.due_date = "Please select date"
            }
            if (!value?.is_your_first_baby) {
                error.is_your_first_baby = "Please select the value"
            }
            if(!value?.medical_surgical_history_baby){
                error.medical_surgical_history_baby = "Please input the value"
            }
            if(!value?.what_method_of_sleep_training){
                error.what_method_of_sleep_training = "Please input the value"
            }
            if(!value?.what_is_your_biggest_sleep_concern){
                error.what_is_your_biggest_sleep_concern = "Please input the value"
            }
            if(!value?.what_are_your_goals){
                error.what_are_your_goals = "Please input the value"
            }
            if (!term_condition) {
                error.term_condition = "Please check the policy"
            }

            setErrors(error)
        } else {

            handleNext(value)
            console.log(value)
            console.log(term_condition)
        }
    }

    const handleTermPolicy = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setErrors({
          ...errors,
          [name]: ""
        })
        setPolicy(e.target.checked)
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
    console.log('term_condition', term_condition)
    return (
        <div>
            <TermConditionModel open={open} setOpen={setOpen} scroll={scroll} setScroll={setScroll} />
            <section className='Pre-baby_bootcamp step-container step2'>
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
                                        value={value?.due_date || ""}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={(date) => dateHandler(date, "due_date")}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            <h4 className="error-msgtext">{errors?.due_date}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                            <label >Child's Name <span className="fw-light">(if applicable)</span></label>
                            <input type="text" name='child_name' value={value?.child_name} className='form-control' onChange={handleChange} placeholder='Type Something' />
                            {/* <h4 className="error-msgtext">{errors?.child_name}</h4> */}
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Is this your first baby? <span className='mandatory text-danger mx-2'>*</span></label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="is_your_first_baby" value="yes" checked={value?.is_your_first_baby === "yes"}
                                    onChange={handleRadioButton} className="custom-control-input form-check-input"

                                />
                                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                <input type="radio" id="customRadio2" name="is_your_first_baby"
                                    value="no" checked={value?.is_your_first_baby === "no"} onChange={handleRadioButton} className="custom-control-input form-check-input"
                                />
                                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                            </div>
                            <h4 className="error-msgtext">{errors?.is_your_first_baby}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Name <span className="fw-light"> (if applicable)</span></label>
                            <input type="text" name='partner_support_person_name' value={value?.partner_support_person_name} className='form-control' onChange={handleChange} placeholder='Type Something' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Email address <span className="fw-light">( for reminders, content, and follow up )</span></label>
                            <input type="text" name='partner_support_person_email_address' value={value?.partner_support_person_email_address} className='form-control' onChange={handleChange} placeholder='Type Something' />
                            <h4 className="error-msgtext d-none">{"error"}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Will your partner be on the call?   <span className="fw-light">(encouraged by not required!)</span> </label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="your_partner_be_the_call" value="yes" onChange={handleRadioButton}
                                    checked={value?.your_partner_be_the_call === "yes"} className="custom-control-input form-check-input"

                                />
                                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                <input type="radio" id="customRadio2" name="your_partner_be_the_call"
                                    value="no" checked={value?.your_partner_be_the_call === "no"} onChange={handleRadioButton} className="custom-control-input form-check-input"
                                />
                                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                            </div>
                            {/* <h4 className="error-msgtext">{errors?.your_partner_be_the_call}</h4> */}
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>Please list any medical or surgical history for your baby that we should be aware of: <span className="mandatory text-danger mx-2">*</span></label>
                            <textarea name='medical_surgical_history_baby' value={value?.medical_surgical_history_baby} onChange={handleChange} className="form-control" placeholder="Type something"> </textarea>
                            <h4 className="error-msgtext">{errors?.medical_surgical_history_baby}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>What methods <span className='fw-light'>(if any)</span> of sleep training have you tried? <span className="mandatory text-danger mx-2">*</span></label>
                            <textarea name='what_method_of_sleep_training' value={value?.what_method_of_sleep_training} onChange={handleChange} className="form-control" placeholder="Type something"> </textarea>
                            <h4 className="error-msgtext ">{errors?.what_method_of_sleep_training}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>What is your biggest sleep concern you would like to address during the consultation? <span className="mandatory text-danger mx-2">*</span></label>
                            <textarea name='what_is_your_biggest_sleep_concern' value={value?.what_is_your_biggest_sleep_concern} onChange={handleChange} className="form-control" placeholder="Type something"> </textarea>
                            <h4 className="error-msgtext ">{errors?.what_is_your_biggest_sleep_concern}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3"><label>What are your goals for this consultation?  <span className="mandatory text-danger mx-2">*</span></label>
                            <textarea name='what_are_your_goals' value={value?.what_are_your_goals} onChange={handleChange} className="form-control" placeholder="Type something"> </textarea>
                            <h4 className="error-msgtext ">{errors?.what_are_your_goals}</h4>
                        </div>

                        {/* <div className="radio-area mb-3">
                            <h4>How did you hear about us? (optional)</h4>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about" value="Social Media" onChange={handleRadioButton} checked={value?.hear_about === "Social Media"} id="customCheck1" />
                                    <label className="form-check-label" >
                                        Social Media
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about" value="Friend" onChange={handleRadioButton} checked={value?.hear_about === "Friend"} id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Friend
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about" value="Print" onChange={handleRadioButton} checked={value?.hear_about === "Print"} id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Print
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about" value="Internet Search" onChange={handleRadioButton} checked={value?.hear_about === "Internet Search"} id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Internet Search
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about" value="Healthcare professional" onChange={handleRadioButton} checked={value?.hear_about === "Healthcare professional"} id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Healthcare professional
                                    </label>
                                </div>
                            </div>

                        </div> */}

                        <div className='agreement-container py-4'>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="pregnant" value="yes" onChange={(e) => handleTermPolicy(e, "term_condition")} checked={term_condition}
                                    className="custom-control-input form-check-input" />
                                <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService} > terms of service</a></label>
                            </div>
                            <h4 className="error-msgtext ">{errors?.term_condition}</h4>
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

export default UserInfo2;