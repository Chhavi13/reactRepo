import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/lab';
import moment from 'moment';
import { DialogProps } from '@mui/material';
import { Link } from 'react-router-dom';
import TermConditionModel from '../../../../Common/TermConditionPopup/termConditionModel';

const UserInfo2 = ({ handleNext, value, setValue, handlePrev, term_condition, setTermPolicy }: any) => {

  const [error, setError] = React.useState<any>({})
  const [open, setOpen] = React.useState<boolean>(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  let handleDueDate = (e: Date | null | any) => {

    setError({
      ...error,
      ['due_date']: ""
    })
    setValue({
      ...value,
      ['due_date']: moment(e).format('MM/DD/YYYY')
    })
  }

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

  const handleChange = (e: any) => {
    setError({
      ...error,
      [e.target.name]: ""
    })
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };

  const policyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // let checked = e.target.checked;
    setError({
      ...error,
      ["policy"]: ""
    })
    setTermPolicy(e.target.checked)
    setValue({
      ...value,
      term_condition:e.target.value
    })

  }
  const termOfService = (e:any) => {
    e.preventDefault()
    setOpen(true)
  }
  const handleSleepConsult = (e: any) => {

    e.preventDefault()
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!value?.due_date || value?.due_date === "Invalid date"
      // || !value?.child_name || value?.child_name?.length < 3
      || !value?.is_your_first_baby
      // || !value?.partner_support_person_name || value?.partner_support_person_name?.length < 3
      // || !value?.partner_support_person_email_address || !value?.partner_support_person_email_address?.match(emailRegex)
      || !value?.medical_surgical_history_baby
      // || !value?.mother_dob || !value?.ob_name_practic_name
      // || !value?.medical_surgical_history_mother
      || !value?.what_is_your_biggest_sleep_concern || !value?.what_are_your_goals
      // || !value?.hear_about
      || !term_condition
    ) {
      let errors: any = {}
      if (!value?.due_date) {
        errors.due_date = "Please select date"
      }
      if (value?.due_date === "Invalid date") {
        errors.due_date = "Please select date"
      }
      // if(value?.child_name?.length < 3){
      //   errors.child_name = "Minimum 3 char required"
      // }
      // if(!value?.child_name){
      //   errors.child_name = "Please input the value"
      // }
      if (!value?.is_your_first_baby) {
        errors.is_your_first_baby = "Please input the value"
      }
      // if (!value?.partner_support_person_email_address?.match(emailRegex)) {
      //   errors.partner_support_person_email_address = "Invalid email"
      // }
      // if (!value?.partner_support_person_email_address) {
      //   errors.partner_support_person_email_address = "Please input the value"
      // }
      if (!value?.medical_surgical_history_baby) {
        errors.medical_surgical_history_baby = "Please input the value"
      }
      if (!value?.what_is_your_biggest_sleep_concern) {
        errors.what_is_your_biggest_sleep_concern = "Please input the value"
      }
      if (!value?.what_are_your_goals) {
        errors.what_are_your_goals = "Please check the policy"
      }
      if (!term_condition) {
        errors.term_condition = "Please the select the policy to continue "
      }
      setError(errors)
      return
    }
    handleNext(value)
    // console.log(valvalueue)
    // setValue({})
    // setPolicy(false)
  }

  console.log('data_binding', value)
  console.log('error_msg', error)
  console.log('policy', term_condition)
  return (
    // <div>UserInfo2</div>
    <div className='remote-sleep-consult'>
      <TermConditionModel open={open} setOpen={setOpen} scroll={scroll} setScroll={setScroll} />

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
                    // value={value}
                    value={value?.due_date || ""}
                    // onChange={(newValue) => {
                    //   setValue(newValue);
                    // }}
                    onChange={handleDueDate}
                    renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                  />
                </Stack>
              </LocalizationProvider>
              <h4 className="error-msgtext">{error?.due_date}</h4>
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>Child's Name: <span className="fw-light"> (if applicable)</span> </label>
              <input type="text" name="child_name" className="form-control" value={value?.child_name} onChange={handleChange} />
              {/* <h4 className="error-msgtext">{error?.child_name}</h4> */}
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>Is this your first baby? <span className='mandatory text-danger mx-2'>*</span></label>
              <div className="custom-radio custom-control-inline">
                <input type="radio" id="customRadio1" name="is_your_first_baby" value="yes"
                  onChange={handleRadioButton} checked={value?.is_your_first_baby === "yes"}
                  className="custom-control-input form-check-input"
                />
                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                <input type="radio" id="customRadio2" name="is_your_first_baby"
                  value="no" onChange={handleRadioButton} checked={value?.is_your_first_baby === "no"} className="custom-control-input form-check-input"
                />
                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
              </div>
              <h4 className="error-msgtext">{error?.is_your_first_baby}</h4>
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>Partner or Support Person's Name <span className='fw-light'>(if applicable) </span></label>
              <input type="text" className='form-control' name='partner_support_person_name' onChange={handleChange} value={value?.partner_support_person_name} placeholder='Type something' />
              {/* <h4 className="error-msgtext">{error?.partner_support_person_name}</h4> */}
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>Partner or Support Person's Email address <span className='fw-light'>( for reminders, content, and follow up )</span></label>
              <input type="text" name='partner_support_person_email_address' onChange={handleChange} className='form-control' value={value?.partner_support_person_email_address} placeholder='Type something' />
              {/* <h4 className="error-msgtext">{error?.partner_support_person_email_address}</h4> */}
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>Will your partner be on the call? <span className='fw-light'>(encouraged by not required!)</span></label>
              <div className="custom-radio custom-control-inline">
                <input type="radio" id="customRadio1" name="your_partner_be_the_call" onChange={handleRadioButton} value="yes"
                  className="custom-control-input form-check-input"
                  checked={value?.your_partner_be_the_call === "yes"}
                />
                <label className="custom-control-label me-3" htmlFor="customRadio1">yes</label>
                <input type="radio" id="customRadio2" name="your_partner_be_the_call" onChange={handleRadioButton}
                  value="no" checked={value?.your_partner_be_the_call === "no"} className="custom-control-input form-check-input"
                />
                <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
              </div>
              <h4 className="error-msgtext d-none">{"error"}</h4>
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>Please list any medical or surgical history for your baby that we should be aware of: <span className='mandatory text-danger mx-2'>*</span></label>
              <textarea name='medical_surgical_history_baby' className='form-control' value={value?.medical_surgical_history_baby} onChange={handleChange} placeholder='Type something'> </textarea>
              <h4 className="error-msgtext">{error?.medical_surgical_history_baby}</h4>
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>What methods <span className='fw-light'> (if any) </span> of sleep training have you tried? <span className='mandatory text-danger mx-2'>*</span></label>
              <textarea name='what_method_of_sleep_training' className='form-control' value={value?.what_method_of_sleep_training} onChange={handleChange} placeholder='Type something'> </textarea>
              {/* <h4 className="error-msgtext">{error?.what_method_of_sleep_training}</h4> */}
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>What is your biggest sleep concern you would like to address during the consultation? <span className='mandatory text-danger mx-2'>*</span></label>
              <textarea name='what_is_your_biggest_sleep_concern' className='form-control' value={value?.what_is_your_biggest_sleep_concern} onChange={handleChange} placeholder='Type something'> </textarea>
              <h4 className="error-msgtext">{error?.what_is_your_biggest_sleep_concern}</h4>
            </div>

            <div className="form-group col-lg-12 col-md-12 mb-3">
              <label>What are your goals for this consultation? <span className='mandatory text-danger mx-2'>*</span></label>
              <textarea name='what_are_your_goals' className='form-control' value={value?.what_are_your_goals} onChange={handleChange} placeholder='Type something'> </textarea>
              <h4 className="error-msgtext">{error?.what_are_your_goals}</h4>
            </div>

            {/* <div className="radio-area mb-3">
              <h4>How did you hear about us? (optional)</h4>
              <div className="custom-control custom-radio">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="hear_about" value="full time working parent" onChange={handleRadioButton} id="customCheck1" />
                  <label className="form-check-label" >
                    Social Media
                  </label>
                </div>
              </div>

              <div className="custom-control custom-radio">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="hear_about" value="part time working parent" onChange={handleRadioButton} id="flexRadioDefault2" />
                  <label className="form-check-label" >
                    Friend
                  </label>
                </div>
              </div>

              <div className="custom-control custom-radio">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="hear_about" value="full time stay at home parent" onChange={handleRadioButton} id="flexRadioDefault2" />
                  <label className="form-check-label" >
                    Print
                  </label>
                </div>
              </div>

              <div className="custom-control custom-radio">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="hear_about" value="full time stay at home parent" onChange={handleRadioButton} id="flexRadioDefault2" />
                  <label className="form-check-label" >
                    Internet Search
                  </label>
                </div>
              </div>

              <div className="custom-control custom-radio">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="hear_about" value="full time stay at home parent" onChange={handleRadioButton} id="flexRadioDefault2" />
                  <label className="form-check-label" >
                    Healthcare professional
                  </label>
                </div>
              </div>

            </div> */}

            <div className='agreement-container py-4'>
              <div className="custom-radio custom-control-inline">
                <input type="radio" id="customRadio1" name="term_condition" value="yes" checked={value?.term_condition} onChange={policyHandler}
                  className="custom-control-input form-check-input" />
                <label className="custom-control-label" htmlFor="customRadio1">I have read and agree to the <a href='' className='blue-link' onClick={termOfService}> terms of service</a></label>
              </div>
              <h4 className="error-msgtext">{error?.term_condition}</h4>
            </div>
          </div>
        </form>

        <div className='section-navigation my-5 d-flex justify-content-between'>
          <button className='primary-blue-small-btn previous' onClick={handlePrev}>Previous</button>
          <button className='primary-blue-small-btn next' onClick={handleSleepConsult}>Next</button>
        </div>
      </section>
    </div>
  )
}

export default UserInfo2