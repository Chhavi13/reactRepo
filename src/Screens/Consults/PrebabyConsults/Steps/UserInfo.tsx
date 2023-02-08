import React from 'react'
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
import moment from 'moment';
import { DialogProps } from '@mui/material';
import { Link } from 'react-router-dom';
import TermConditionModel from '../../../../Common/TermConditionPopup/termConditionModel';

function UserInfo({ state, handleNext, value, setValue, handlePrev, term_condition, setPolicy }: any) {
  // debugger
  // const [value, setValue] = React.useState<Date | null>(
  //   new Date(),
  // );
  const [errors, setErrors] = React.useState<any>({})
  const [open, setOpen] = React.useState<boolean>(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const handleChange = (e: any) => {
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
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

  const handleDueDate = (date: Date | null | any, name: string) => {
    setErrors({
      ...errors,
      [name]: ""
    })
    setValue({
      ...value,
      [name]: moment(date).format('MM/DD/YYYY')
    })
  }

  const handleRadioButton = (e: any) => {
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const handleTermPolicy = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setErrors({
      ...errors,
      [name]: ""
    })
    setPolicy(e.target.checked)
    // debugger
    setValue({
      ...value,
      term_condition:e.target.checked
    })
  }
  const termOfService=(e:any)=>{
    e.preventDefault()
    setOpen(true)
}

  const handlePrebabyConsult = () => {
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!value?.due_date || !value?.is_your_first_baby || !term_condition
      // || !value?.if_you_purchased || !value?.partner_support_person_name || !value?.partner_support_person_email_address || !value?.partner_support_person_email_address?.match(email) 
    ) {
      let error: any = {}
      if (!value?.due_date) {
        error.due_date = "please select due date"
      }
      if (!value?.is_your_first_baby) {
        error.is_your_first_baby = "please input the field"
      }
      // if(!value?.if_you_purchased){
      //   error.if_you_purchased = "please input the field"
      // }
      // if(!value?.partner_support_person_name){
      //   error.partner_support_person_name = "please input the field"
      // }
      // if(!value?.partner_support_person_email_address?.match(email)){
      //   error.partner_support_person_email_address = "please enter valid email"
      // }
      // if(!value?.partner_support_person_email_address){
      //   error.partner_support_person_email_address = "please input the field"
      // }        
      if (!term_condition) {
        error.term_condition = "Please check terms of service "
      }
      setErrors(error)
    } else {
      handleNext(value)
    }
  }
  console.log("form_data_bind", value)
  console.log("term_condition",term_condition)
  return (
    <>
    <TermConditionModel  open={open} setOpen={setOpen} scroll={scroll} setScroll={setScroll} />
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
                  //   setValue(newValue);
                  // }}
                  onChange={(date) => handleDueDate(date, "due_date")}
                  renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                />
              </Stack>
            </LocalizationProvider>
            <h4 className="error-msgtext">{errors?.due_date}</h4>
          </div>

          <div className="form-group col-lg-12 col-md-12 mb-3">
            <label>Is this your first baby? <span className='mandatory text-danger mx-2'>*</span></label>
            <div className="custom-radio custom-control-inline">
              <input type="radio" id="customRadio1" name="is_your_first_baby" value="yes" onChange={handleRadioButton}
                checked={value?.is_your_first_baby === "yes"} className="custom-control-input form-check-input"

              />
              <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
              <input type="radio" id="customRadio2" name="is_your_first_baby"
                value="no" onChange={handleRadioButton} checked={value?.is_your_first_baby === "no"} className="custom-control-input form-check-input"
              />
              <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
            </div>
            <h4 className="error-msgtext">{errors?.is_your_first_baby}</h4>
          </div>

          {/* <div className="form-group col-lg-12 col-md-12 mb-3">
            <label>If you purchased an "add on" for the VIP package to includea a CPR course, which date woud you like to register? <span className="fw-light">(please check individual class page for upcoming schedule)</span> </label>
            <input type="text" name='if_you_purchased' className='form-control' onChange={handleChange} value={value?.if_you_purchased} placeholder='Type something' />
            <h4 className="error-msgtext">{errors?.if_you_purchased}</h4>
          </div> */}

          <div className="form-group col-lg-12 col-md-12 mb-3">
            <label>Partner or Support Person's Name </label>
            <input type="text" name='partner_support_person_name' className='form-control' onChange={handleChange} value={value?.partner_support_person_name} placeholder='Type something' />
            <h4 className="error-msgtext">{errors?.partner_support_person_name}</h4>
          </div>

          <div className="form-group col-lg-12 col-md-12 mb-3">
            <label>Partner or Support Person's Email address </label>
            <input type="text" name='partner_support_person_email_address' className='form-control' onChange={handleChange} value={value?.partner_support_person_email_address} placeholder='Type something' />
            <h4 className="error-msgtext">{errors?.partner_support_person_email_address}</h4>
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
              <input type="radio" id="customRadio1" name="pregnant" value="yes"
                className="custom-control-input form-check-input" onChange={(e) => handleTermPolicy(e, "term_condition")} checked={term_condition} />
              <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService} > terms of service</a></label>
            </div>
            <h4 className="error-msgtext">{errors?.term_condition}</h4>
          </div>
        </div>
      </form>

      <div className='section-navigation my-5 d-flex justify-content-between'>
        <button className='primary-blue-small-btn previous'>Previous</button>
        <button className='primary-blue-small-btn next' onClick={handlePrebabyConsult} >Next</button>
      </div>
    </section>
    </>
  )
}

export default UserInfo
