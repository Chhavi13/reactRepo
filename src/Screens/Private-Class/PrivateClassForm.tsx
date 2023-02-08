import React, { useRef } from 'react'
import TextField from '@mui/material/TextField';
// import {Form} from 'react-bootstrap';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import calender_thumb from "../../Assets/img/calender.png";
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { Dayjs } from 'dayjs';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/lab';
import { useLocation } from 'react-router-dom';
import { privateBookingApi } from '../../Service/Cousult.service';
import PrivateClassModel from '../../Common/CongratsPopoup/congratsModel';
import { emailRegex, passwpordRegex } from '../../Utils/Regex';
import "./PrivateClassForm.scss";
import moment from 'moment';
import { CircularProgress } from '@mui/material';

function PrivateClassForm() {
    const [value, setValue] = React.useState<Dayjs | null | any>({});
    const [values, setValues] = React.useState<any>({})
    const [error, setError] = React.useState<any>({})
    const { state }: any = useLocation()
    const [congrats, setCongrats] = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const inputRef = useRef<any>(null)
    const inputRef2 = useRef<any>(null)

    let user: any = localStorage.getItem("Nurture_user_data")
    user = JSON.parse(user)

    // const [value, setValue] = React.useState<Date | null>(
    //     new Date(),
    // );

    // const handleChange = (newValue: Date | null) => {
    //     setValue(newValue);
    // };

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
    const handleChangeInfo = (e: any) => {

        let name = e.target.name;
        let value = e.target.value;

        if (name === "first_name") {
            if (value.length < 3) {

                setError({
                    ...error,
                    [name]: "Minimum 3 character required"
                })

            } else {
                setError({
                    ...error,
                    [name]: ""
                })
            }
        }
        if (name === "last_name") {
            if (value.length < 3) {

                setError({
                    ...error,
                    [name]: "Min 3 character required"
                })

            } else {

                setError({
                    ...error,
                    [name]: ""
                })
            }
        }

        if (name === "email") {
            if (!emailRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "Email in not valid"
                })
            } else {
                setError({
                    ...error,
                    [name]: ""
                })
            }
        }
        if (name === "phone") {
            if (value.length < 10) {
                setError({
                    ...error,
                    [name]: "Please enter valid contact no."
                })
            }

            else {
                setError({
                    ...error,
                    [name]: ""
                })
            }
        }
        if (name === "total_anticipated_participants") {
            setError({
                ...error,
                [name]: ""
            })

        }
        if (name === "street_address") {
            setError({
                ...error,
                [name]: ""
            })

        }

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })

    }
    const handlerRadioBtn = (e: any) => {
        // debugger
        if (e.target.name === "would_you_like_to_book_an_in_home_or_virtual_consult") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: ""
            })

        }
        if (e.target.name === "prenatal_classes_being_requested") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: ""
            })
        }
        if (e.target.name === "regardless_of_your_vaccination_status") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: ""
            })
        }
        if (e.target.name === "are_you_isolating_or_quarantining") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: ""
            })
        }
        if (e.target.name === "have_you_been_in_close_physical_contact_is_defined") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: ""
            })
        }

    }
    const dateHandler = (val: any, name: string) => {
        setValues({
            ...values,
            [name]: moment(val).format("L")
        })
        setError({
            ...error,
            [name]: ""
        })
    }
    const timeHandler = (val: any, name: string) => {
        if (name === "preferred_time_1") {
            setValue({
                ...value,
                ["time1"]: val
            })
        }
        if (name === "preferred_time_2") {
            setValue({
                ...value,
                ["time2"]: val
            })
        }
        setValues({
            ...values,
            [name]: moment(val).format("LT")
        })
        setError({
            ...error,
            [name]: ""
        })
    }
    const handlePrivateBook = async (e: any) => {
        
  
        e.preventDefault()
        try {
            if (
                // !values?.first_name || !values?.last_name || !values?.email || !values?.phone|| 
                !values?.total_anticipated_participants || !values?.street_address ||
                !values?.due_date || values?.due_date === "Invalid date" || !values?.would_you_like_to_book_an_in_home_or_virtual_consult ||
                // !values?.prenatal_classes_being_requested 
                
                !values?.preferred_date_1 || !values?.preferred_date_2 || !values?.preferred_time_1 ||
                !values?.preferred_time_2 ||
                !values?.are_you_isolating_or_quarantining) {

                let errors: any = {}

                // if (!values?.first_name) {
                //     errors.first_name = "First name is Required"
                // }
                if (user?.first_name) {
                    errors.first_name = ""
                }

                // if (!values?.last_name) {
                //     errors.last_name = "Last name is Required"
                // }
                if (user?.last_name) {
                    errors.last_name = ""
                }
                // if (!values?.email) {
                //     errors.email = "Email is required"
                // }
                if (user?.email) {
                    errors.email = ""
                }


                // if (!values?.phone) {
                //     errors.phone = "Phone Number is Required"
                // }
                if (user?.phone) {
                    errors.phone = ""
                }

                if (!values?.total_anticipated_participants) {
                    errors.total_anticipated_participants = "Please Enter the Value"
                }

                if (!values?.street_address) {
                    errors.street_address = "Please Enter the Value"
                }
                if (!values?.due_date) {
                    errors.due_date = "Please select date"
                }
                if (!values?.would_you_like_to_book_an_in_home_or_virtual_consult) {
                    errors.would_you_like_to_book_an_in_home_or_virtual_consult = "Please Select the Value"
                }
                // if (!values?.prenatal_classes_being_requested) {
                //     errors.prenatal_classes_being_requested = "Please Select the Value"
                // }
                if (!values?.preferred_date_1) {
                    errors.preferred_date_1 = "Please select date"
                }
                if (!values?.preferred_date_2) {
                    errors.preferred_date_2 = "Please select date"
                }
                if (!values?.preferred_time_1) {
                    errors.preferred_time_1 = "Please select time"
                }
                if (!values?.preferred_time_2) {
                    errors.preferred_time_2 = "Please select time"
                }
                if (!values?.regardless_of_your_vaccination_status) {
                    errors.regardless_of_your_vaccination_status = "Please Select the Value"
                }
                if (!values?.are_you_isolating_or_quarantining) {
                    errors.are_you_isolating_or_quarantining = "Please Select the Value"
                }


                // errors.allError = "All fields are required!"

                setError(errors)


            } else {
                setLoading(true)
                console.log('submited', values)
                let param = {
                    type: state?.param,
                    user_id: user?.id,
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    email: user?.email,
                    phone: user?.phone,
                    due_date: values?.due_date,
                    street_address: values?.street_address,
                    total_anticipated_participants: values?.total_anticipated_participants,
                    would_you_like_to_book_an_in_home_or_virtual_consult: values?.would_you_like_to_book_an_in_home_or_virtual_consult,
                    prenatal_classes_being_requested: values?.prenatal_classes_being_requested,
                    preferred_date_1: values?.preferred_date_1,
                    preferred_date_2: values?.preferred_date_2,
                    preferred_time_1: values?.preferred_time_1,
                    preferred_time_2: values?.preferred_time_2,
                    regardless_of_your_vaccination_status: values?.regardless_of_your_vaccination_status,
                    are_you_isolating_or_quarantining: "Yes",
                    have_you_been_in_close_physical_contact_is_defined: values?.have_you_been_in_close_physical_contact_is_defined
                }

                let res: any = await privateBookingApi(param)

                if (res?.data?.success) {
                    setCongrats(true)
                    setLoading(false)
                }
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    console.log(values)

    const onWheel = (val: any) => {
        val.current.blur()

    }
    console.log(value)
    return (
        <div>
            <PrivateClassModel open={congrats} setOpen={setCongrats} text="booked successfully!" />
            <div className='Veterans-Moms’-Survival-Group'>
                <section className='private-consult step-container'>
                    <div className='consult-section-heading text-center'>
                        <h5 className='mb-3'>CPR and first aid private class</h5>
                        <h3 className='mb-3 mt-2'>Private Class Request Form</h3>
                        <p className='text-center pb-3'>Please fill out the form below to request an appointment. We will respond to your request within 24 hours Monday - Friday and within 48 hours on the weekend.</p>
                        <p className='text-center'>Private, prenatal classes are held privately in your home with a Registered Nurse. Or, if you prefer, you may book a private, virtual session instead. Please indicate your choice on the form.</p>
                    </div>
                    <form className=' '>
                        {/* <h6 style={{color:'red'}}>{error?.allError}</h6> */}
                        <div className='row'>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>First Name <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" disabled name='first_name' className='form-control' value={user?.first_name} onChange={handleChangeInfo} placeholder='Enter first name' />
                                <h4 className="error">{error?.first_name}</h4>
                            </div>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Last Name<span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" disabled name='last_name' className='form-control' value={user?.last_name} onChange={handleChangeInfo} placeholder='Enter last name' />
                                <h4 className="error">{error.last_name}</h4>
                                {/* <p style={{color:'red'}}>{error.last_name}</p> */}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Email <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" disabled name='email' className='form-control' value={user?.email} onChange={handleChangeInfo} placeholder='Enter email address' />
                                <h4 className="error">{error?.email}</h4>
                            </div>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Phone Number <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="number" name='phone' disabled ref={inputRef} value={user?.phone} onWheel={() => onWheel(inputRef)} min="0"
                                    className='form-control' onChange={handleChangeInfo} placeholder='123456' />
                                <h4 className="error">{error.phone}</h4>
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
                                    <Stack spacing={3}>                             <MobileDatePicker
                                        // label="Date picker"
                                        value={values?.due_date || ""}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={(val) => dateHandler(val, "due_date")}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='due-date-field' />}
                                    />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error">{error.due_date}</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Street address <span className='mandatory text-danger mx-2'>*</span></label>
                                <input type="text" name='street_address' className='form-control' onChange={handleChangeInfo} />
                                <h4 className="error">{error.street_address}</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-lg-12 col-md-12 mb-3">
                                <label>Total Anticipated Participants<span className='mandatory text-danger mx-2'>*</span></label>
                                <TextField
                                    id="filled-number"

                                    // label="Number"
                                    name='total_anticipated_participants'
                                    type="number"
                                    inputRef={inputRef2} onWheel={() => onWheel(inputRef2)}
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    className='number-field'
                                    onChange={handleChangeInfo}
                                />
                                <h4 className="error">{error.total_anticipated_participants}</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="radio-area pb-4 ">
                                <h4>Would you like to book an in-home or virtual consult? <span className='mandatory text-danger mx-2'>* </span></h4>
                                <div className="custom-radio custom-control-inline">
                                    <input type="radio" id="customRadio1" name="would_you_like_to_book_an_in_home_or_virtual_consult" value="In-home"
                                        onChange={handlerRadioBtn} className="custom-control-input form-check-input"

                                    />
                                    <label className="custom-control-label step_two me-3" htmlFor="customRadio1">In-home</label>
                                    <input type="radio" id="customRadio1" name="would_you_like_to_book_an_in_home_or_virtual_consult" value="Virtual Class"
                                        onChange={handlerRadioBtn} className="custom-control-input form-check-input"

                                    />
                                    <label className="custom-control-label step_two" htmlFor="customRadio2">Virtual Class</label>
                                </div>
                                <p className="error">{error.would_you_like_to_book_an_in_home_or_virtual_consult}</p>
                            </div>

                        </div>
                        {/* <div className='row'>
                            <div className="radio-area mb-3">
                                <h4>Prenatal Classes Being Requested <span className='mandatory text-danger mx-2'>* </span></h4>
                                <div className="custom-control custom-radio">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="prenatal_classes_being_requested" value="Labor & Delivery Prep" onChange={handlerRadioBtn} id="customCheck1" />
                                        <label className="form-check-label" >
                                            Labor & Delivery Prep
                                        </label>
                                    </div>
                                </div>

                                <div className="custom-control custom-radio">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="prenatal_classes_being_requested" value="Newborn Essentials" onChange={handlerRadioBtn} id="flexRadioDefault2" />
                                        <label className="form-check-label" >
                                            Newborn Essentials
                                        </label>
                                    </div>
                                </div>

                                <div className="custom-control custom-radio">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="prenatal_classes_being_requested" value="Breastfeeding Basics" onChange={handlerRadioBtn} id="flexRadioDefault2" />
                                        <label className="form-check-label" >
                                            Breastfeeding Basics
                                        </label>
                                    </div>
                                </div>

                                <div className="custom-control custom-radio">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="prenatal_classes_being_requested" value="Infant & Child CPR and First Aid" onChange={handlerRadioBtn} id="flexRadioDefault2" />
                                        <label className="form-check-label" >
                                            Infant & Child CPR and First Aid
                                        </label>
                                    </div>
                                </div>
                                <p className="error">{error.prenatal_classes_being_requested}</p>
                            </div>
                        </div> */}

                        <div className='row'>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Preferred Date #1<span className='mandatory text-danger mx-2'>*</span></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            // label="Date picker"
                                            value={values?.preferred_date_1 || ""}
                                            // onChange={(newValue) => {
                                            //     setValue(newValue);
                                            // }}
                                            onChange={(val) => dateHandler(val, "preferred_date_1")}
                                            renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='preferred-dt' />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error">{error.preferred_date_1}</h4>
                            </div>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Preferred Date #2<span className='mandatory text-danger mx-2'>*</span></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >

                                    <Stack spacing={3}>                             <MobileDatePicker
                                        // label="Date picker"
                                        value={values?.preferred_date_2 || ""}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={(val) => dateHandler(val, "preferred_date_2")}
                                        renderInput={(params) => <TextField {...params} placeholder="MM-DD-YYYY" className='preferred-dt' />}
                                    />
                                    </Stack>
                                </LocalizationProvider>
                                <h4 className="error">{error.preferred_date_2}</h4>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Preferred Time #1<span className='mandatory text-danger mx-2'>*</span></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        // label="Basic example"
                                        value={value?.time1 || ""}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={(val) => timeHandler(val, "preferred_time_1")}
                                        className="d-flex"
                                        views={['hours', 'minutes']}
                                        // inputFormat="HH:mm:ss"
                                        // label="With seconds"
                                        renderInput={(params: any) => <TextField {...params} className='preferred-tm' />}
                                    />
                                </LocalizationProvider>
                                <h4 className="error">{error.preferred_time_1}</h4>
                            </div>
                            <div className="form-group col-lg-6 col-md-6 mb-3">
                                <label>Preferred Time #2<span className='mandatory text-danger mx-2'>*</span></label>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        // label="Basic example"
                                        value={value?.time2 || ""}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
                                        onChange={(val) => timeHandler(val, "preferred_time_2")}
                                        views={['hours', 'minutes']}
                                        // inputFormat="HH:mm:ss"
                                        renderInput={(params) => <TextField {...params} className='preferred-tm' />}
                                    />
                                </LocalizationProvider>
                                <h4 className="error">{error.preferred_time_2}</h4>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <p>Regardless of your vaccination status, have you experienced any of the symptoms in the list below in the past 48 hours?</p>
                            <label>Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhea.<span className='mandatory text-danger mx-2'>*</span></label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="regardless_of_your_vaccination_status" value="yes"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                                <input type="radio" id="customRadio1" name="regardless_of_your_vaccination_status" value="no"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                            </div>
                            <h4 className="error">{error.regardless_of_your_vaccination_status}</h4>
                        </div>

                        <div className='row mb-3'>
                            <label>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick with COVID-19?<span className='mandatory text-danger mx-2'>*</span></label>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="are_you_isolating_or_quarantining" value="yes"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                                <input type="radio" id="customRadio1" name="are_you_isolating_or_quarantining" value="no"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                            </div>
                            <h4 className="error">{error.are_you_isolating_or_quarantining}</h4>
                        </div>

                        <div className='row mb-3'>
                            <label>Have you been in close physical contact in the last 14 days with anyone who is known to have laboratory-confirmed COVID-19 or anyone who has any symptoms consistent with COVID-19? </label>
                            <p>Close physical contact is defined as being within 6 feet of an infected/symptomatic person for a cumulative total of 15 minutes or more over a 24-hour period starting from 48 hours before illness onset (or, for asymptomatic individuals, 48 hours prior to test specimen collection).</p>
                            <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="have_you_been_in_close_physical_contact_is_defined" value="yes"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                                <input type="radio" id="customRadio1" name="have_you_been_in_close_physical_contact_is_defined" value="no"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                            </div>
                        </div>

                        <div className='row  info'>
                            <label>Prenatal Classes</label>
                            <div className='prenatal-consult-info'>
                                <p className='m-0 p-0'>In case you haven’t checked out our other prenatal classes beyond CPR, please visit our pages about Newborn Essentials, Breastfeeding Basics, and Labor & Delivery Prep. </p>
                            </div>
                            {/* <div className="custom-radio custom-control-inline">
                                <input type="radio" id="customRadio1" name="have_you_been_in_close_physical_contact_is_defined" value="yes"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                                <input type="radio" id="customRadio1" name="have_you_been_in_close_physical_contact_is_defined" value="no"
                                    onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                                <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                            </div> */}
                        </div>

                        <div className='section-navigation my-5 d-flex justify-content-between'>
                            {/* <button className='primary-blue-small-btn previous'>Previous</button> */}
                            <button className='primary-blue-small-btn w-100' disabled={loading} onClick={handlePrivateBook}>{loading?<CircularProgress />: "Submit"} </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default PrivateClassForm
