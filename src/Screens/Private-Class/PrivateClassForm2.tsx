import React, { useState } from 'react'
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
import { privateBookingApi } from '../../Service/Cousult.service';
import { useLocation } from 'react-router-dom';
import PrivateClassModel from '../../Common/CongratsPopoup/congratsModel';
import { emailRegex, passwpordRegex } from '../../Utils/Regex';
import { CircularProgress } from '@mui/material';

function PrivateClassForm2() {
    const [error, setError] = React.useState<any>({})
    const { state }: any = useLocation()
    const [congrats, setCongrats] = useState(false)
    const [loading, setLoading] = useState(false)
    let user: any = localStorage.getItem("Nurture_user_data")
    user = JSON.parse(user)
    const [values, setValues] = React.useState<any>({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        phone: user?.phone,
    })
  

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
        { label: 'Initial lactation consultation', value: 1 },
        { label: 'Prenatal lactation consultation', value: 2 },
        { label: 'Bottle Consultation', value: 3 },
    ]
    const handlerRadioBtn = (e: any) => {

        if (e.target.name === "would_you_like_to_book_an_in_home_or_virtual_consult") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })

        }
        if (e.target.name === "prenatal_classes_being_requested") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
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
        if (e.target.name === "do_you_have_any_pets_in_the_home") {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: ""
            })
        }
        if (e.target.name === "are_you_a_current_member_of_nurture_by_naps") {
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
        setValues({ ...values, [name]: value });
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
        setValues({ ...values, [name]: value });

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
        setValues({ ...values, [name]: value });
        if (name === "phone") {
            if (value.length < 10 || value.length >10) {
                setError({
                    ...error,
                    [name]: "Contact number should be of 10 digits"
                })
            } else {
                setError({
                    ...error,
                    [name]: ""
                })
            }
        }
        setValues({ ...values, [name]: value });
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
        if (name === "city") {
            setError({
                ...error,
                [name]: ""
            })

        }
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        if (name === "state") {
            setError({
                ...error,
                [name]: ""
            })

        }
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        if (name === "zip_code") {
            setError({
                ...error,
                [name]: ""
            })

        }
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        if (name === "concerns_you_would_like_to_address_during_your_consult") {
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
    const dateHandler = (val: any, name: string) => {
        setValues({
            ...values,
            [name]: val
        })
        setError({
            ...error,
            [name]: ""
        })
    }
    const handleSelectConsult = (e: any, val: any) => {
        setValues({
            ...values,
            ["type_of_consultation"]: val?.label
        })
        setError({
            ...error,
            ["type_of_consultation"]: ""
        })
    }
    console.log('bind_form_data', values)

    const handleLactationSubmit = async (e: any) => {

        e.preventDefault()
        try {
            if (!values?.regardless_of_your_vaccination_status || !values?.are_you_isolating_or_quarantining || !values?.have_you_been_in_close_physical_contact_is_defined ||
                //   !values?.first_name || !values?.last_name || !values?.email || !values?.phone||
                
                !values?.type_of_consultation ||
                !values?.street_address || !values?.city || !values?.state || !values?.zip_code || !values?.due_date || !values?.concerns_you_would_like_to_address_during_your_consult
                || !values?.do_you_have_any_pets_in_the_home || !values?.are_you_a_current_member_of_nurture_by_naps) {

                let errors: any = {}
                if (!values?.first_name) {
                    errors.first_name = "First name is Required"
                }
                // if (user?.first_name) {
                //     errors.first_name = ""
                // }
                if (!values?.concerns_you_would_like_to_address_during_your_consult) {
                    errors.concerns_you_would_like_to_address_during_your_consult = "Please Enter the Value"
                }
                if (!values?.due_date) {
                    errors.due_date = "Please select date"
                }

                if (!values?.last_name) {
                    errors.last_name = "Last name is Required"
                }
                // if (user?.last_name) {
                //     errors.last_name = ""
                // }


                if (!values?.email) {
                    errors.email = "Email is required"
                }
                // if (user?.email) {
                //     errors.email = ""
                // }


                if (!values?.phone) {
                    errors.phone = "Phone no. is Required"
                }

                // if (user?.phone) {
                //     errors.phone = ""
                // }
                if (values?.phone.length < 10 || values?.phone.length > 10) {
                    errors.phone = "Contact number should be of 10 digits"
                }
                if (!values?.regardless_of_your_vaccination_status) {
                    errors.regardless_of_your_vaccination_status = "Please Select the Value"
                }
                if (!values?.are_you_isolating_or_quarantining) {
                    errors.are_you_isolating_or_quarantining = "Please Select the Value"
                }
                if (!values?.have_you_been_in_close_physical_contact_is_defined) {
                    errors.have_you_been_in_close_physical_contact_is_defined = "Please Select the Value"
                }
                if (!values?.type_of_consultation) {
                    errors.type_of_consultation = "Please Select the Value"
                }
                if (!values?.street_address) {
                    errors.street_address = "Please Enter the Value"
                }
                if (!values?.city) {
                    errors.city = "Please Enter the Value"
                }

                if (!values?.zip_code) {
                    errors.zip_code = "Please Enter the Value"
                }
                if (!values?.state) {
                    errors.state = "Please Enter the Value"
                }

                if (!values?.do_you_have_any_pets_in_the_home) {
                    errors.do_you_have_any_pets_in_the_home = "Please Select the Value"
                }
                if (!values?.are_you_a_current_member_of_nurture_by_naps) {
                    errors.are_you_a_current_member_of_nurture_by_naps = "Please Select the Value"
                }
                // errors.allError = "All fields are required!"
                setError(errors)

            } else {
                console.log('submited', values)
                setLoading(true)
                let param = {
                    type: state?.param,
                    user_id: user?.id,
                    regardless_of_your_vaccination_status: values?.regardless_of_your_vaccination_status,
                    are_you_isolating_or_quarantining: values?.are_you_isolating_or_quarantining,
                    have_you_been_in_close_physical_contact_is_defined: values?.have_you_been_in_close_physical_contact_is_defined,
                    first_name: values?.first_name,
                    last_name: values?.last_name,
                    email: values?.email,
                    phone: values?.phone,
                    type_of_consultation: values?.type_of_consultation,
                    street_address: values?.street_address,
                    city: values?.city,
                    state: values?.state,
                    zip_code: values?.zip_code,
                    due_date: values?.due_date,
                    concerns_you_would_like_to_address_during_your_consult: values?.concerns_you_would_like_to_address_during_your_consult,
                    do_you_have_any_pets_in_the_home: values?.do_you_have_any_pets_in_the_home,
                    are_you_a_current_member_of_nurture_by_naps: values?.are_you_a_current_member_of_nurture_by_naps,

                    // total_anticipated_participants: values?.total_anticipated_participants,
                    // would_you_like_to_book_an_in_home_or_virtual_consult: values?.would_you_like_to_book_an_in_home_or_virtual_consult,
                    // prenatal_classes_being_requested: values?.prenatal_classes_being_requested,
                    // preferred_date_1: values?.preferred_date_1,
                    // preferred_date_2: values?.preferred_date_2,
                    // preferred_time_1: values?.preferred_time_1,
                    // preferred_time_2: values?.preferred_time_2,                   

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
    return (
        <div>
            <PrivateClassModel open={congrats} setOpen={setCongrats} text="booked successfully!" />
            <section className='private-consult step-container'>
                <div className='consult-section-heading text-center'>
                    <h5>Lactation Consult </h5>
                    <h3 className='mb-3 mt-2'>In-Person Lactation Consult Request Form</h3>
                    <p className='text-center pb-3'>If you are based in Massachusetts and would like to schedule an in-person lactation consultation, please complete our lactation consult request form below and a naps staff member will be in touch with you shortly to book your appointment. we will respond to your request within 24 hours Monday - Friday and within 48 hours on the weekend.</p>
                </div>
                <form className=' '>
                    <div className='row mb-3'>
                        <p>Regardless of your vaccination status, have you experienced any of the symptoms in the list below in the past 48 hours? </p>
                        <label>Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion or runny nose, nausea or vomiting, diarrhea.<span className='mandatory text-danger mx-2'>*</span></label>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="regardless_of_your_vaccination_status" value="yes"
                                onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                            <input type="radio" id="customRadio1" name="regardless_of_your_vaccination_status" value="no"
                                onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                        <p className="error">{error.regardless_of_your_vaccination_status}</p>
                    </div>

                    <div className='row mb-3'>
                        <label>Are you isolating or quarantining because you tested positive for COVID-19 or are worried that you may be sick with COVID-19? <span className='mandatory text-danger mx-2'>*</span></label>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="are_you_isolating_or_quarantining" value="yes"
                                onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                            <input type="radio" id="customRadio1" name="are_you_isolating_or_quarantining" value="no"
                                onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                        <p className="error">{error.are_you_isolating_or_quarantining}</p>
                    </div>

                    <div className='row mb-3'>
                        <label>Have you been in close physical contact in the last 14 days with anyone who is known to have laboratory-confirmed COVID-19 or anyone who has any symptoms consistent with COVID-19? <span className='mandatory text-danger mx-2'>*</span></label>
                        <p>Close physical contact is defined as being within 6 feet of an infected/symptomatic person for a cumulative total of 15 minutes or more over a 24-hour period starting from 48 hours before illness onset (or, for asymptomatic individuals, 48 hours prior to test specimen collection).</p>
                        <div className="custom-radio custom-control-inline">
                            <input type="radio" id="customRadio1" name="have_you_been_in_close_physical_contact_is_defined" value="yes"
                                onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>

                            <input type="radio" id="customRadio1" name="have_you_been_in_close_physical_contact_is_defined" value="no"
                                onChange={handlerRadioBtn} className="custom-control-input form-check-input" />
                            <label className="custom-control-label step_two me-3" htmlFor="customRadio1">no</label>
                        </div>
                        <p className="error">{error.have_you_been_in_close_physical_contact_is_defined}</p>
                    </div>

                    <div className='row mb-3'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>First Name <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='first_name' value={values.first_name} className='form-control' onChange={handleChangeInfo} placeholder='Enter first name' />
                            <h4 className="error">{error.first_name}</h4>

                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Last Name<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='last_name' value={values?.last_name} className='form-control' onChange={handleChangeInfo} placeholder='Enter last name' />
                            <h4 className="error">{error.last_name}</h4>

                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Email <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='email' value={values?.email} className='form-control' onChange={handleChangeInfo} placeholder='Enter email address' />
                            <h4 className="error">{error?.email}</h4>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 mb-3">
                            <label>Phone Number <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='phone' value={values?.phone} className='form-control' onChange={handleChangeInfo} placeholder='Enter phone number' />
                            <h4 className="error">{error?.phone}</h4>
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
                                onChange={handleSelectConsult}
                                renderInput={(params) => <TextField {...params} name='type_of_consultation' placeholder='Select Consultation' />}
                            />

                            <h4 className="error">{error.type_of_consultation}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Street address <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='street_address' className='form-control' onChange={handleChangeInfo} />
                            <h4 className="error">{error.street_address}</h4>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="form-group col-lg-4 col-md-4 mb-3">
                            <label>City <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='city' className='form-control' placeholder='' onChange={handleChangeInfo} />
                            <h4 className="error">{error.city}</h4>
                        </div>
                        <div className="form-group col-lg-4 col-md-4 mb-3">
                            <label>State <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='state' className='form-control' placeholder='' onChange={handleChangeInfo} />
                            <h4 className="error">{error.state}</h4>
                        </div>
                        <div className="form-group col-lg-4 col-md-4 mb-3">
                            <label>Zip Code <span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='zip_code' className='form-control' placeholder='' onChange={handleChangeInfo} />
                            <h4 className="error">{error.zip_code}</h4>
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

                    <div className='row mb-3'>
                        <div className="form-group col-lg-12 col-md-12 mb-3">
                            <label>Concerns You Would Like to Address During Your Consult:<span className='mandatory text-danger mx-2'>*</span></label>
                            <input type="text" name='concerns_you_would_like_to_address_during_your_consult' className='form-control' placeholder='' onChange={handleChangeInfo} />
                            <h4 className="error">{error.concerns_you_would_like_to_address_during_your_consult}</h4>
                        </div>
                    </div>


                    <div className="radio-area mb-3">
                        <h4>Do you have any pets in the home? <span className='mandatory text-danger mx-2'>* </span></h4>
                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="do_you_have_any_pets_in_the_home" value="No" onChange={handlerRadioBtn} id="customCheck1" />
                                <label className="form-check-label" >
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="do_you_have_any_pets_in_the_home" value="Yes - dog" onChange={handlerRadioBtn} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Yes - dog
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="do_you_have_any_pets_in_the_home" value="Yes -cat" id="flexRadioDefault2" onChange={handlerRadioBtn} />
                                <label className="form-check-label" >
                                    Yes -cat
                                </label>
                            </div>

                        </div>
                        <p className="error">{error.do_you_have_any_pets_in_the_home}</p>
                    </div>

                    <div className="radio-area mb-3">
                        <h4>Are you a current member of Nurture by NAPS? <span className='mandatory text-danger mx-2'>* </span></h4>
                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="are_you_a_current_member_of_nurture_by_naps" value="Yes, give me my member discount!" onChange={handlerRadioBtn} id="customCheck1" />
                                <label className="form-check-label" >
                                    Yes, give me my member discount!
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="are_you_a_current_member_of_nurture_by_naps" value="No, but I would like more information" onChange={handlerRadioBtn} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    No, but I would like more information
                                </label>
                            </div>
                        </div>
                        <p className="error">{error.are_you_a_current_member_of_nurture_by_naps}</p>
                    </div>



                    <div className='section-navigation my-5 d-flex justify-content-between'>
                        {/* <button className='primary-blue-small-btn previous'>Previous</button> */}
                        <button className='primary-blue-small-btn next w-100' disabled={loading} onClick={handleLactationSubmit}>{loading ? <CircularProgress /> : 'Submit'}</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default PrivateClassForm2
