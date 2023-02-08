import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DialogProps, Stack, TextField } from '@mui/material';
import { error } from 'console';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConsultForm from '../../../../Common/Consults/dynamicForm';
import TermConditionModel from '../../../../Common/TermConditionPopup/termConditionModel';

const UserInfo = ({ handleNext, value, setValue, handlePrev, term_condition, setPolicy, field }: any) => {

    const [errors, setErrors] = useState<any>({})
    const [open, setOpen] = React.useState<boolean>(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    // const [policy, setPolicy] = useState<any>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        let name = e.target.name;
        let inputValue = e.target.value
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        setErrors({
            ...errors,
            [name]: ""
        })
        // if (name === 'partner_support_person_email_address') {
        //     if (inputValue.match(emailRegex)) {
        //         setErrors({
        //             ...errors,
        //             [name]: ""
        //         })

        //     } else {
        //         setErrors({
        //             ...errors,
        //             [name]: "Invalid email"
        //         })
        //     }
        // }
        // if (name === 'partner_support_person_name') {
        //     if (inputValue.length < 3) {
        //         setErrors({
        //             ...errors,
        //             [name]: "Minimum 3 char required"
        //         })
        //     } else {
        //         setErrors({
        //             ...errors,
        //             [name]: ""
        //         })
        //     }
        // }
        setValue({
            ...value,
            [name]: inputValue
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
    let handleDueDate = (e: Date | null | any) => {
        // let date = moment(e).format('MM/DD/YYYY')
        // if (!e) {
        //     // debugger
        //     setErrors({
        //         ...errors,
        //         ['due_date']: moment(e).format('MM/DD/YYYY')
        //     })
        // } else {
        //     setErrors({
        //         ...errors,
        //         ['due_date']: ""
        //     })
        // }
        setErrors({
            ...errors,
            ['due_date']: ""
        })
        setValue({
            ...value,
            ['due_date']: moment(e).format('MM/DD/YYYY')
        })
    }

    const handleSubmit = () => {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!value?.due_date || value?.due_date === "Invalid date"
            // ||!value?.child_name || value?.child_name?.length < 3
            || !value?.is_your_first_baby
            // || !value.partner_support_person_name || value?.partner_support_person_name?.length < 3 
            // || !value?.partner_support_person_email_address || !value?.partner_support_person_email_address?.match(emailRegex)
            // || !value?.hear_about 
            || !term_condition) {
            let error: any = {}
            if (!value?.due_date) {
                error.due_date = "Please select date"
            }
            if (value?.due_date === "Invalid date") {
                error.due_date = "Please select date"
            }
            // if (value?.child_name?.length < 3) {
            //     error.child_name = "Minimum 3 char required"
            // }
            // if (!value?.child_name) {
            //     error.child_name = "this input the value"
            // }
            if (!value?.is_your_first_baby) {
                error.is_your_first_baby = "Please input the value"
            }
            // if (!value.partner_support_person_name) {
            //     error.partner_support_person_name = "Please input the value"
            // }
            // if (value?.partner_support_person_name?.length < 3) {
            //     error.partner_support_person_name = "Minimum 3 char required"
            // }
            // if (!value?.partner_support_person_email_address?.match(emailRegex)) {
            //     error.partner_support_person_email_address = "Invalid email"
            // }
            // if (!value?.partner_support_person_email_address) {
            //     error.partner_support_person_email_address = "Please input the value"
            // }
            // if (!value?.hear_about) {
            //     error.hear_about = "Please check the policy"
            // }
            if (!term_condition) {
                error.term_condition = "Please check terms of service "
            }
            setErrors(error)
        } else {
            // debugger
            console.log(value)
            console.log(term_condition)
            handleNext(value)
        }
    }

    const policyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // let checked = e.target.checked;
        setErrors({
            ...errors,
            [e.target.name]: ""
        })
        setPolicy(e.target.checked)
        setValue({
            ...value,
            term_condition:e.target.checked
        })
    }
    const termOfService = (e:any) => {
        e.preventDefault()
        setOpen(true)
    }
    console.log('data bind', value)
    console.log(term_condition)
    console.log(errors)

    return (
        <div>
            <TermConditionModel open={open} setOpen={setOpen} scroll={scroll} setScroll={setScroll} />
            <section className='step-container step2 user-info'>
                {/* <ConsultForm
                handleNext={handleNext} value={value}
                setValue={setValue} handlePrev={handlePrev}
                handleChange={handleChange}
                policy={policy}
                setPolicy={setPolicy}
            /> */}
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Complete your Information</h3>
                </div>

                <form className=' ' onSubmit={handleSubmit}>
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
                                        // inputFormat="dd/MM/yyyy"
                                        toolbarTitle="Choose date"
                                        value={value?.due_date || ""}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={handleDueDate}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}

                                    />
                                </Stack>
                            </LocalizationProvider>
                            {/* <h4 className="error-msgtext d-none">{errors?.due_date}</h4> */}
                            <h4 className="error-msgtext">{errors?.due_date}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Child's Name: <span className="fw-light"> (if applicable)</span> </label>
                            <input type="text" name='child_name' className='form-control'
                                value={value?.child_name} onChange={handleChange}
                            />
                            {/* <h4 className="error-msgtext">{errors?.child_name}</h4> */}
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Is this your first baby? <span className='mandatory text-danger mx-2'>*</span></label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="is_your_first_baby" checked={value?.is_your_first_baby === "yes"} value="yes"
                                    className="custom-control-input form-check-input"
                                    onChange={handleRadioButton}
                                />
                                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                <input type="radio" id="customRadio2" name="is_your_first_baby" checked={value?.is_your_first_baby === "no"}
                                    value="no"
                                    onChange={handleRadioButton}
                                    className="custom-control-input form-check-input"
                                />
                                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                            </div>
                            {/* <h4 className="error-msgtext d-none">{errors?.is_your_first_baby}</h4> */}
                            <h4 className="error-msgtext">{errors?.is_your_first_baby}</h4>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Name <span className="fw-light"> (if applicable):</span> </label>
                            <input type="text" className='form-control' name="partner_support_person_name" value={value?.partner_support_person_name} onChange={handleChange} placeholder='Enter name' />
                            {/* <h4 className="error-msgtext">{errors?.partner_support_person_name}</h4> */}
                        </div>

                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Partner or Support Person's Email address  <span className="fw-light"> (for reminders, content, and follow up): </span> </label>
                            <input type="text" className='form-control' name='partner_support_person_email_address' value={value?.partner_support_person_email_address} onChange={handleChange} placeholder='Enter email address' />
                            {/* <h4 className="error-msgtext d-none">{errors?.partner_support_person_email_address}</h4> */}
                            {/* <h4 className="error-msgtext">{errors?.partner_support_person_email_address}</h4> */}
                        </div>

                        {/* <div className="radio-area mb-3"> */}
                        {/* <h4>How did you hear about us? (optional)</h4>  */}
                        {/* <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Social Media"} value="Social Media" onChange={handleRadioButton} id="customCheck1" />
                                <label className="form-check-label" >
                                    Social Media
                                </label>
                            </div>
                        </div> */}

                        {/* <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Friend"} value="Friend" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Friend
                                </label>
                            </div>
                        </div> */}

                        {/* <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Print"} value="Print" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Print
                                </label>
                            </div>
                        </div> */}

                        {/* <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Internet Search"} value="Internet Search" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Internet Search
                                </label>
                            </div>
                        </div> */}

                        {/* <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="hear_about" checked={value?.hear_about === "Healthcare professional"} value="Healthcare professional" onChange={handleRadioButton} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Healthcare professional
                                </label>
                            </div>
                        </div> */}
                        {/* <h4 className="error-msgtext">{errors?.hear_about}</h4> */}
                        {/* </div>  */}

                        <div className='agreement-container py-4'>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="term_condition"
                                    //  value="yes"
                                    onChange={policyHandler}
                                    checked={term_condition}
                                    className="custom-control-input form-check-input" />
                                <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService} > terms of service</a></label>
                            </div>
                            <h4 className="error-msgtext">{errors?.term_condition}</h4>
                        </div>

                    </div>
                </form>
                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn'>Previous</button>
                    <button className='primary-blue-small-btn next' onClick={handleSubmit}>Next</button>
                </div>
            </section>
        </div>
    )
}

export default UserInfo;