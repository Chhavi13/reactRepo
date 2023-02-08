import React from 'react';
import ConsultsForm from '../../../../Common/Consults/dynamicForm';
import { Form, InputGroup, } from 'react-bootstrap';
import { DatePicker, LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DialogProps, Stack, TextField } from '@mui/material';
import moment from 'moment';
import TermConditionModel from '../../../../Common/TermConditionPopup/termConditionModel';

let delivery_type: any = []
const UserInfo = ({ handleNext, value, setValue, handlePrev, term_condition, setPolicy, field, state, error, setError,deliveryType,setDeliveryType }: any) => {


    console.log("statesss", state?.param)
    const [open, setOpen] = React.useState<boolean>(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        // let name = e.target.name;
        // let inputValue = e.target.value
        // if (value.length === 0) {
        //     setValue([{
        //         id: name,
        //         "value": inputValue
        //     }])
        // } else if (value.some((item: any) => item.id === name)) {
        //     let newValue = value.map((oValue: any) => {
        //         if (oValue.id === name) {
        //             oValue.value = inputValue
        //         }
        //         return oValue;
        //     })
        //     setValue(newValue)

        // } else {
        //     setValue([...value,
        //     {
        //         id: name,
        //         "value": inputValue
        //     }
        //     ])


        // }
        setError({
            ...error,
            [e.target.name]: ""
        })
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "delivery_type") {
            let newVal
            // if (e.target.checked) {
            //     // delivery_type.push(e.target.value)
            //     newVal = [...deliveryType,e.target.value]
            //     // setDeliveryType([...deliveryType,e.target.value])
            //     setDeliveryType(newVal)
            // } else {
            //     // let index = delivery_type.indexOf(e.target.value)
            //     // delivery_type.splice(index, 1)
            //     newVal = deliveryType.filter((item:any)=>item !== e.target.value)
            //     setDeliveryType(newVal)
            // }
            setError({
                ...error,
                [e.target.name]: ""
            })
            setValue({
                ...value,
                [e.target.name]: e.target.value
            })
            return
        }
        setError({
            ...error,
            [e.target.name]: ""
        })
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

    }

    console.log(delivery_type)
    let handleRadioButton = (e: any) => {
        let val = e.target.value;
        setError({
            ...error,
            [e.target.name]: ""
        })
        setValue({
            ...value,
            [e.target.name]: val
        })
    }
    const dateHandler = (date: Date | null | any) => {
        setError({
            ...error,
            ["due_date"]: ""

        })
        setValue({
            ...value,
            ["due_date"]: moment(date).format('MM/DD/YYYY')

        })
    }
    const policyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // debugger
        // let checked = e.target.checked;
        setError({
            ...error,
            [e.target.name]: ""
        })
        setPolicy(e.target.checked)
        setValue({
            ...value,
            term_condition: e.target.checked
        })
    }
    const DObHandler = (date: Date | null | any) => {

        setError({
            ...error,
            ["mother_dob"]: ""
        })
        setValue({
            ...value,
            ["mother_dob"]: moment(date).format('MM/DD/YYYY')
        })
    }
    const nursingHandleSubmit = (e: any) => {
        e.preventDefault()

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!value?.due_date || value?.due_date === "Invalid date"
            // || !value?.child_name || value?.child_name?.length < 3
            || !value?.is_your_first_baby
            //  || !value?.partner_support_person_name 
            // || !value?.partner_support_person_email_address || !policy
            // || !value?.pediatrician_name_practic_name 
            || !value?.significant_or_surgical_health_information
            || !value?.specific_question_concerns_topic
            // || !value?.hear_about 
            || !term_condition
            // !value?.significant_or_surgical_health_information 
            // || !value?.medical_surgical_history_baby 
            // || !value?.mother_dob || !value?.ob_name_practic_name || !value?.delivery_type || !value?.medical_surgical_history_mother
        ) {
            let errors: any = {}
            if (!value?.due_date) {
                errors.due_date = "Please select date"
            }
            if (value?.due_date === "Invalid date") {
                errors.due_date = "Please select date"
            }
            // if (value?.child_name?.length < 3) {
            //     errors.child_name = "Minimum 3 char required"
            // }
            // if (!value?.child_name) {
            //     errors.child_name = "this input the value"
            // }
            if (!value?.is_your_first_baby) {
                errors.is_your_first_baby = "this select this field"
            }
            // if (!value?.partner_support_person_name) {
            //     errors.partner_support_person_name = "Please input the value"
            // }
            // if (!value?.partner_support_person_email_address) {
            //     errors.partner_support_person_email_address = "Please input the value"
            // }
            // if (!value?.pediatrician_name_practic_name) {
            //     errors.pediatrician_name_practic_name = "Please input the value"
            // }
            // if (!value?.medical_surgical_history_baby) {
            //     errors.medical_surgical_history_baby = "Please input the value"
            // }
            // if (!value?.mother_dob) {
            //     errors.mother_dob = "Please input the value"
            // }
            // if (!value?.ob_name_practic_name) {
            //     errors.ob_name_practic_name = "Please input the value"
            // }
            // if (!value?.delivery_type) {
            //     errors.delivery_type = "Please input the value"
            // }
            // if (!value?.medical_surgical_history_mother) {
            //     errors.medical_surgical_history_mother = "Please input the value"
            // }            
            if (!value?.significant_or_surgical_health_information) {
                errors.significant_or_surgical_health_information = "Please input the value"
            }
            if (!value?.specific_question_concerns_topic) {
                errors.specific_question_concerns_topic = "Please input the value"
            }
            // if (!value?.hear_about) {
            //     errors.hear_about = "Please check the policy"
            // }
            if (!term_condition) {
                errors.term_condition = "Please the select the policy to continue "
            }
            setError(errors)
            return
        }
        handleNext()
        console.log(value)
    }
    const intilaLactiationSubmit = (e: any) => {
        e.preventDefault()
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!value?.due_date || value?.due_date === "Invalid date"
            // !value?.child_name || value?.child_name?.length < 3 ||            
            || !value?.is_your_first_baby
            // || !value?.partner_support_person_name || value?.partner_support_person_name?.length < 3
            // || !value?.partner_support_person_email_address || !value?.partner_support_person_email_address?.match(emailRegex)
            || !value?.medical_surgical_history_baby || !value?.mother_dob || !value?.ob_name_practic_name || !value?.Child_birth_weight
            || !value?.medical_surgical_history_mother || !value?.pediatrician_name_practic_name
            // || !value?.hear_about
            || !value?.elaborate_on_your_breastfeeding
            || !term_condition
            // || !value?.delivery_type  
            // || value?.delivery_type?.length === 0 
            || delivery_type?.lenght === 0
        ) {
            let errors: any = {}
            // if (value?.child_name?.length < 3) {
            //     errors.child_name = "Minimum 3 char required"
            // }
            // if (!value?.child_name) {
            //     errors.child_name = "this input the value"
            // }
            if (!value?.Child_birth_weight) {
                errors.Child_birth_weight = "this input the value"
            }
            if (!value?.due_date) {
                errors.due_date = "Please select date"
            }
            if (value?.due_date === "Invalid date") {
                errors.due_date = "Please select date"
            }
            if (!value?.is_your_first_baby) {
                errors.is_your_first_baby = "Please input the value"
            }
            // if (value?.partner_support_person_name?.length < 3) {
            //     errors.partner_support_person_name = "Minimum 3 char required"
            // }
            // if (!value?.partner_support_person_name) {
            //     errors.partner_support_person_name = "Please input the value"
            // }
            // if (!value?.partner_support_person_email_address?.match(emailRegex)) {
            //     errors.partner_support_person_email_address = "Invalid email"
            // }
            // if (!value?.partner_support_person_email_address) {
            //     errors.partner_support_person_email_address = "Please input the value"
            // }
            if (!value?.medical_surgical_history_baby) {
                errors.medical_surgical_history_baby = "Please input the value"
            }

            if (!value?.mother_dob) {
                errors.mother_dob = "Please input the value"
            }
            if (!value?.ob_name_practic_name) {
                errors.ob_name_practic_name = "Please input the value"
            }
            if (!value?.pediatrician_name_practic_name) {
                errors.pediatrician_name_practic_name = "Please input the value"
            }
            if(!value?.elaborate_on_your_breastfeeding){
                errors.elaborate_on_your_breastfeeding = "Please input the value"
            }
            // if (!value?.delivery_type) {
            //     errors.delivery_type = "Please input the value"
            // }
            // if(value?.delivery_type?.length === 0){
            //     errors.delivery_type = "Please input the value"
            // }   
            if (delivery_type?.length === 0) {
                errors.delivery_type = "Please input the value"
            }
            if (!value?.medical_surgical_history_mother) {
                errors.medical_surgical_history_mother = "Please input the value"
            }
            // if (!value?.hear_about) {
            //     errors.hear_about = "Please check the policy"
            // }
            if (!term_condition) {
                errors.term_condition = "Please the select the policy to continue "
            }
            setError(errors)

            return
        }
        handleNext()
        console.log(value)
        // setValue({})
        // setPolicy(false)
    }
    const termOfService = (e: any) => {
        e.preventDefault()
        setOpen(true)
    }
    console.log("value from nursing",value)
    // console.log(error)
    // console.log(term_condition)
    console.log(deliveryType)
    // React.useEffect(()=>{
    //     delivery_type = []
    // },[delivery_type])
    return (
        <>
            <TermConditionModel open={open} setOpen={setOpen} scroll={scroll} setScroll={setScroll} />
            <section className='step-container step2 user-info'>

                {state?.param === "service_2" && <div>
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
                                            onChange={dateHandler}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext">{error?.due_date}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Child's Name: <span className="fw-light"> (if applicable)</span></label>
                                <input type="text" name='child_name' className='form-control'
                                    value={value?.child_name} onChange={handleChange}
                                />
                                {/* <h4 className="error-msgtext">{error?.child_name}</h4> */}
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Is this your first baby? <span className='mandatory text-danger mx-2'>*</span></label>
                                <div className="custom-radio custom-control-inline">
                                    <input type="radio" id="customRadio1"
                                        name="is_your_first_baby" value="yes" onChange={handleChange} checked={value?.is_your_first_baby === "yes"}
                                        className="custom-control-input form-check-input"

                                    />
                                    <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                    <input type="radio" id="customRadio2" name="is_your_first_baby"
                                        value="no" className="custom-control-input form-check-input"
                                        checked={value?.is_your_first_baby === "no"}
                                        onChange={handleChange}
                                    />
                                    <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                                </div>
                                <h4 className="error-msgtext">{error?.is_your_first_baby}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Please list any significant medical or surgical health information for mom or baby that we should be aware of, including any medications or known allergies <span className='fw-light'> (to medications or otherwise): </span> <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" className='form-control' onChange={handleChange} value={value?.significant_or_surgical_health_information}
                                    name="significant_or_surgical_health_information" placeholder='Enter' />
                                <h4 className="error-msgtext">{error?.significant_or_surgical_health_information}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>What specific questions, concerns, and/or topics would you like to discuss during your consultation? <span className='mandatory text-danger mx-2'>*</span></label>
                                <textarea className='form-control' onChange={handleChange} value={value?.specific_question_concerns_topic}
                                    name="specific_question_concerns_topic" placeholder='Type something' />
                                <h4 className="error-msgtext">{error?.specific_question_concerns_topic}</h4>
                            </div>

                            {/* <div className="radio-area mb-3"> */}
                            {/* <h4>How did you hear about us? (optional)</h4>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about" onChange={handleRadioButton}
                                        value="Social Media"
                                        checked={value?.hear_about === "Social Media"}
                                        id="customCheck1" />
                                    <label className="form-check-label" >
                                        Social Media
                                    </label>
                                </div>
                            </div> */}

                            {/* <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        checked={value?.hear_about === "Friend"}
                                        onChange={handleRadioButton}
                                        value="Friend" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Friend
                                    </label>
                                </div>
                            </div> */}

                            {/* <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        name="hear_about" value="Print"
                                        checked={value?.hear_about === "Print"}
                                        onChange={handleRadioButton}
                                        id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Print
                                    </label>
                                </div>
                            </div> */}

                            {/* <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        value="Internet Search"
                                        checked={value?.hear_about === "Internet Search"}
                                        onChange={handleRadioButton}
                                        id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Internet Search
                                    </label>
                                </div>
                            </div> */}

                            {/* <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        value="Healthcare professional"
                                        checked={value?.hear_about === "Healthcare professional"}
                                        onChange={handleRadioButton}
                                        id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Healthcare professional
                                    </label>
                                </div>
                            </div> */}
                            {/* <h4 className="error-msgtext">{error?.hear_about}</h4> */}
                            {/* </div> */}

                            <div className='agreement-container py-4'>
                                <div className="custom-radio custom-control-inline">
                                    <input type="radio" id="customRadio1" name='term_condition'
                                        className="custom-control-input form-check-input" value="Accepted"
                                        checked={term_condition}
                                        onChange={policyHandler}
                                    />
                                    <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService}> terms of service</a></label>
                                </div>
                                <h4 className="error-msgtext">{error?.term_condition}</h4>
                            </div>
                        </div>
                    </form>

                    <div className='section-navigation my-5 d-flex justify-content-between'>
                        <button className='primary-blue-small-btn previous' onClick={handlePrev}>Previous</button>
                        <button className='primary-blue-small-btn next' onClick={nursingHandleSubmit}>Next</button>
                    </div>
                </div>}

                {state?.param === "service_3" && < div >
                    <div className='consult-section-heading text-center'>
                        <h3 className='my-5'>Complete your Information</h3>
                    </div>
                    <form className=' '>
                        <div className='row'>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Child's Name: <span className="fw-light"> (if applicable)</span></label>
                                <input type="text" className='form-control' name='child_name'
                                    onChange={handleChange} value={value?.child_name} placeholder='Enter name'
                                />
                                <h4 className="error-msgtext">{error?.child_name}</h4>
                            </div>

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
                                            onChange={dateHandler}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext">{error?.due_date}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Is this your First Baby? <span className='mandatory text-danger mx-2'>*</span></label>
                                <div className="custom-radio custom-control-inline">
                                    <input type="radio" id="customRadio1" name="is_your_first_baby" value="yes"
                                        className="custom-control-input form-check-input"
                                        onChange={handleChange} checked={value?.is_your_first_baby === "yes"}
                                    />
                                    <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                                    <input type="radio" id="customRadio2" name="is_your_first_baby"
                                        value="no" className="custom-control-input form-check-input"
                                        onChange={handleChange} checked={value?.is_your_first_baby === "no"}
                                    />
                                    <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                                </div>
                                <h4 className="error-msgtext">{error?.is_your_first_baby}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Partner or Support Person's Name <span className="fw-light"> (if applicable):</span></label>
                                <input type="text" name="partner_support_person_name"
                                    onChange={handleChange} value={value?.partner_support_person_name}

                                    className='form-control' />
                                {/* <h4 className="error-msgtext">{error?.partner_support_person_name}</h4> */}

                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Partner or Support Person's Email address  <span className="fw-light"> (for reminders, content, and follow up): </span> </label>
                                <input type="text" name="partner_support_person_email_address"

                                    className='form-control' onChange={handleChange} value={value?.partner_support_person_email_address} placeholder='Enter' />
                                {/* <h4 className="error-msgtext">{error?.partner_support_person_email_address}</h4> */}

                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Child's Birth Weight <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" name="Child_birth_weight" className='form-control' onChange={handleChange} value={value?.child_birth_weight}
                                    placeholder='Enter' />

                                <h4 className="error-msgtext">{error?.Child_birth_weight}</h4>
                            </div>


                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Pediatrician's Name/Practice Name: <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" name="pediatrician_name_practic_name" className='form-control'
                                    onChange={handleChange} value={value?.pediatrician_name_practic_name}

                                    placeholder='Enter' />
                                <h4 className="error-msgtext">{error?.pediatrician_name_practic_name}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Medical and/or Surgical History for Baby: <span className="mandatory text-danger mx-2">*</span></label>

                                <textarea name="medical_surgical_history_baby" className="form-control" onChange={handleChange} value={value?.medical_surgical_history_baby} placeholder="Type something"> </textarea>
                                <h4 className="error-msgtext">{error?.medical_surgical_history_baby}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Please elaborate on your Breastfeeding and/or Feeding concerns: <span className="mandatory text-danger mx-2">*</span></label>

                                <textarea name="elaborate_on_your_breastfeeding" className="form-control" onChange={handleChange} value={value?.elaborate_on_your_breastfeeding} placeholder="Type something"> </textarea>
                                <h4 className="error-msgtext">{error?.elaborate_on_your_breastfeeding}</h4>
                            </div>

                            {/* <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Mother's DOB: <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" className='form-control'
                                    onChange={handleChange} value={value?.mother_dob}

                                    name="mother_dob" placeholder='Enter' />
                                <h4 className="error-msgtext">{error?.mother_dob}</h4>
                            </div> */}

                            <div className="form-group col-lg-12 col-md-12 mb-3 due_dt_container">
                                <label >Mother's DOB:<span className='mandatory text-danger mx-2'>*</span></label>
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

                                            value={value?.mother_dob || ""}
                                            onChange={DObHandler}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error-msgtext">{error?.mother_dob}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>OB's Name/Practice Name <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" className='form-control' name="ob_name_practic_name"
                                    onChange={handleChange} value={value?.ob_name_practic_name}

                                    placeholder='Enter' />
                                <h4 className="error-msgtext">{error?.ob_name_practic_name}</h4>

                            </div>

                            <div className="mb-3 delivery_type">
                                <h4>Delivery Type <span className="mandatory text-danger mx-2">*</span></h4>
                                <div className='d-flex flex-wrap'>
                                    <div className="form-check d-flex">
                                        <input className="form-check-input" type="radio" name="delivery_type" onChange={handleChange} value="Vaginal Delivery" 
                                        // checked={deliveryType.some((value: any) => value === "Vaginal Delivery")} 
                                        checked={value?.delivery_type === 'Vaginal Delivery'}
                                        id="customCheck1" />
                                        <label className="form-check-label" >
                                            Vaginal Delivery
                                        </label>
                                    </div>

                                    <div className="form-check d-flex">
                                        <input className="form-check-input" type="radio" name="delivery_type" onChange={handleChange} value="Vaginal Delivery Healthcare professional" checked={value?.delivery_type === 'Vaginal Delivery Healthcare professional'} id="customCheck1" />
                                        <label className="form-check-label" >
                                            Forcep/Vacccum Assisted Vaginal Delivery
                                        </label>
                                    </div>

                                    <div className="form-check d-flex">
                                        <input className="form-check-input" type="radio" name="delivery_type" onChange={handleChange} value="C-section planned" checked={value?.delivery_type === 'C-section planned'} id="customCheck1" />
                                        <label className="form-check-label" >
                                            C-section (planned)
                                        </label>
                                    </div>

                                    <div className="form-check d-flex">
                                        <input className="form-check-input" type="radio" name="delivery_type" onChange={handleChange} value="C-section unplanned" checked={value?.delivery_type === 'C-section unplanned'} id="customCheck1" />
                                        <label className="form-check-label" >
                                            C-section unplanned (urgent/emergent)
                                        </label>
                                    </div>

                                </div>
                                <h4 className="error-msgtext">{error?.delivery_type}</h4>
                            </div>

                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Medical and/or Surgical History for MOTHER: <span className="mandatory text-danger mx-2">*</span></label>
                                <input type="text" className='form-control'
                                    name="medical_surgical_history_mother"
                                    placeholder='Enter history'
                                    value={value?.medical_surgical_history_mother} onChange={handleChange}
                                />
                                <h4 className="error-msgtext">{error?.medical_surgical_history_mother}</h4>
                            </div>
                            {/* 
                        <div className="radio-area mb-3">
                            <h4>How did you hear about us? (optional)</h4>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        onChange={handleRadioButton} checked={value?.hear_about === "full time working parent"}
                                        value="full time working parent" id="customCheck1" />
                                    <label className="form-check-label" >
                                        Social Media
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        onChange={handleRadioButton} checked={value?.hear_about === "part time working parent"}
                                        value="part time working parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Friend
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="hear_about"
                                        onChange={handleRadioButton} checked={value?.hear_about === "full time stay at home parent"}
                                        value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Print
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        onChange={handleRadioButton} checked={value?.hear_about === "full time stay at home parent"}
                                        name="hear_about" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Internet Search
                                    </label>
                                </div>
                            </div>

                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        onChange={handleRadioButton} checked={value?.hear_about === "full time stay at home parent"}
                                        name="hear_about" value="full time stay at home parent" id="flexRadioDefault2" />
                                    <label className="form-check-label" >
                                        Healthcare professional
                                    </label>
                                </div>
                            </div>
                            </div> */}
                            {/* <h4 className="error-msgtext">{error?.hear_about}</h4> */}


                            <div className='agreement-container py-4'>
                                <div className="custom-radio custom-control-inline">
                                    <input type="radio" id="customRadio1" name="term_condition"
                                        value="Accepted"
                                        checked={term_condition}
                                        onChange={policyHandler}
                                        className="custom-control-input form-check-input" />
                                    <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService} > terms of service</a></label>
                                </div>
                                <h4 className="error-msgtext">{error?.term_condition}</h4>
                            </div>
                        </div>
                    </form>

                    <div className='section-navigation my-5 d-flex justify-content-between'>
                        <button className='primary-blue-small-btn' onClick={handlePrev}>Previous</button>
                        <button className='primary-blue-small-btn next' onClick={intilaLactiationSubmit}>Next</button>
                    </div>
                </div>}
            </section >

        </>

    )
}

export default UserInfo;