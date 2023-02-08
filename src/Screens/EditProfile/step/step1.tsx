import React, { useEffect, useRef, useState } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { Autocomplete, CircularProgress } from '@mui/material';
import Camera from '../../../Assets/img/icons/camera.svg'
import Eye from "../../../Assets/img/eye.svg"
import Profile from '../../../Assets/img/signup/profile.png';
import ConvertFileTobase64 from '../../../Utils/ConverBase64';
import { accountSettingAPI, profileAboutUpdate, profilebabyUpdate, profileFamilyUpdate } from '../../../Service/update_profile';
import { emailRegex, passwpordRegex } from '../../../Utils/Regex';
import { toast } from 'react-toastify';
import getUserProfileUpdateAPI from '../../../Utils/profileUpdateAPI';
import { Link, useNavigate } from 'react-router-dom';
import { EDITPROFILE } from '../../../Routes/RouteConstent';
import moment from 'moment';

function Step1({ formNo, profileData, formData1, setFormData1, formData2, setFormData2, formData3,
  setFormData3, formData4, setFormData4, error, setError, setOpenPop, openPop, getProfileBaby, feedingChoice, setFeedingChoice }: any) {

  console.log(profileData?.about_you)
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordShow1, setIsPasswordShow1] = useState<boolean>(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({})
  let [image, setImage] = useState<any>("")
  const [loading, setLoading] = useState(false)
  const [addChild, setAddChild] = useState<any>([])
  const [addOption, setAddOption] = useState<any>([])

  let userImageref: any = useRef()

  let user: any = localStorage.getItem('Nurture_user_data')
  user = JSON.parse(user)
  const Navigate = useNavigate()

  function handleDateChange(date: Date | any, name: string) {
    // debugger
    if (name === 'dob') {
      setFormData1({
        ...formData1,
        [name]: moment(date).format("YYYY-MM-DD")
      })
    }
    if (name === 'due_date') {
      setFormData2({
        ...formData2,
        [name]: moment(date).format("YYYY-MM-DD")
      })
    }
    if (name === 'baby_dob' || "baby_dob1" || "baby_dob2") {
      setFormData2({
        ...formData2,
        [name]: moment(date).format("YYYY-MM-DD")
      })
    }
  }

  const toggleIsCurrPassShowValue = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  const toggleIsPassShowValue = () => {
    setIsPasswordShow1(!isPasswordShow1);
  };
  const toggleIsConPassShowValue = () => {
    setIsPasswordShow2(!isPasswordShow2);
  };

  const handleCancel = (e: any) => {
    setFormData1({
      ...formData1,
      ['first_name']: profileData?.about_you?.first_name,
      ['last_name']: profileData?.about_you?.last_name,
      ['phone']: profileData?.about_you?.phone,
      ['dob']: profileData?.about_you?.dob,
      ['zip_code']: profileData?.about_you?.zip_code,
      ['current_life_status']: profileData?.about_you?.current_life_status,
      ['type_mom']: profileData?.about_you?.type_mom,
      ["gender"]: profileData?.about_you?.gender
    })
    setError({
      ...error,
      ["phone"]: ""
    })


  }

  const handleCancel1 = (e: any) => {
    if (formData2?.pregnant === 'yes') {
      setFormData2({
        ...formData2,
        ['due_date']: profileData?.about_your_baby?.due_date,
        ['expected_baby_gender']: profileData?.about_your_baby?.expected_baby_gender
      })
    }
    if (formData2?.pregnant === 'no') {
      setFormData2({
        ...formData2,
        ['baby_gender']: profileData?.about_your_baby?.baby_gender,
        ['baby_first_name']: profileData?.about_your_baby?.baby_first_name,
        ['baby_dob']: profileData?.about_your_baby?.baby_dob,
        ['feeding_choice']: profileData?.about_your_baby?.feeding_choice,
        ['baby_premature']: profileData?.about_your_baby?.baby_premature,
        ['c_section']: profileData?.about_your_baby?.c_section,
        ['fertility_question']: profileData?.about_your_baby?.fertility_question
      })
    }
  }

  const handleCancel2 = (e: any) => {
    setFormData3({
      ['family_first_name']: profileData?.about_your_partner?.family_first_name,
      ['family_last_name']: profileData?.about_your_partner?.family_last_name,
      ['family_email']: profileData?.about_your_partner?.family_email
    })
  }

  const handleCancel3 = (e: any) => {
    setFormData4({
      ...formData4,
      ['current_password']: "",
      ['password']: "",
      ['password_confirmation']: ""
    })
    setError({
      ...error,
      ['current_password']: "",
      ['password']: "",
      ['password_confirmation']: ""
    })
  }
  const handleSelectOption = async (e: any, value: any, name: string) => {
    //  debugger
    if (name === 'gender') {
      setFormData1({
        ...formData1,
        ["gender"]: value?.value
      })
    }

    if (name === 'photo') {
      let base64: any = await ConvertFileTobase64(e.target.files[0])
      setImage(base64)
      setFormData1({
        ...formData1,
        [name]: e.target.files[0]
      })
    }

    if (name === 'baby_gender' || "baby_gender1" || "baby_gender2") {
      setFormData2({
        ...formData2,
        [name]: value.value
      })
    }
    if (name === 'expected_baby_gender') {
      setFormData2({
        ...formData2,
        [name]: value.value
      })
    }
  }

  const handleInputText = (e: any) => {
    let { name, value } = e.target;
    //  debugger
    // if (name === 'first_name') {
    //   if (value.length < 3) {
    //     setError({
    //       ...error,
    //       [name]: 'minimum 3 chat required'
    //     })
    //   } else {
    //     setError({
    //       ...error,
    //       [name]: ''
    //     })
    //   }
    // }

    // if (name === 'last_name') {
    //   if (value.length < 3) {
    //     setError({
    //       ...error,
    //       [name]: 'minimum 3 chat required'
    //     })
    //   } else {
    //     setError({
    //       ...error,
    //       [name]: ''
    //     })
    //   }
    // }

    if (name === "phone") {
      if (value.length < 10 || value.length > 10) {
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

    // if (name === 'zip_code') {
    //   if (value.length < 5) {
    //     setError({
    //       ...error,
    //       [name]: "Please enter valid zip code"
    //     })
    //   } else {
    //     setError({
    //       ...error,
    //       [name]: ""
    //     })
    //   }

    setFormData1({
      ...formData1,
      [name]: value
    })

    if (name === 'baby_first_name' || "baby_first_name1" || "baby_first_name2") {
      setFormData2({
        ...formData2,
        [name]: value
      })
    }
    if (name === 'family_first_name') {
      setFormData3({
        ...formData3,
        [name]: value
      })
    }
    if (name === 'family_last_name') {
      setFormData3({
        ...formData3,
        [name]: value
      })
    }
    if (name === 'family_email') {
      setFormData3({
        ...formData3,
        [name]: value
      })
    }
    if (name === 'current_password') {
      setFormData4({
        ...formData4,
        [name]: value
      })
    }
    if (name === 'password') {
      setFormData4({
        ...formData4,
        [name]: value
      })
    }
    if (name === 'password_confirmation') {
      setFormData4({
        ...formData4,
        [name]: value
      })
    }
    if (name === "password") {
      if (!passwpordRegex.test(value)) {
        setError({
          ...error,
          [name]: "Password should contain 6 to 20 characters including one numeric digit, one uppercase letter, one lowercase letter and one special character"
        })
      } else {
        setError({
          ...error,
          [name]: ""
        })
      }
    }
    if (name === "password_confirmation") {
      if (value !== formData4?.password) {
        setError({
          ...error,
          [name]: "Please make sure your Passwords match"
        })
      }
      else {
        setError({
          ...error,
          [name]: ""
        })
      }
    }

  }

  const handleRadioBtn = (e: any) => {
    if (e.target.name === 'pregnant') {
      setFormData2({
        ...formData2,
        [e.target.name]: e.target.value
      })
    }

    if (e.target.name === 'type_mom') {
      setFormData1({
        ...formData1,
        [e.target.name]: e.target.value
      })
    }
    if (e.target.name === 'current_life_status') {
      setFormData1({
        ...formData1,
        [e.target.name]: e.target.value
      })
    }
    if (e.target.name === 'feeding_choice') {
      setFormData2({
        ...formData2,
        [e.target.name]: e.target.value
      })
    }
    if (e.target.name === 'baby_premature') {
      setFormData2({
        ...formData2,
        [e.target.name]: e.target.value
      })
    }
    if (e.target.name === 'c_section') {
      setFormData2({
        ...formData2,
        [e.target.name]: e.target.value
      })
    }
    if (e.target.name === 'fertility_question') {
      setFormData2({
        ...formData2,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleFeedingChoice = (e: any) => {
    let inputValue = e.target.value;
    let name = e.target.name
    let arr: any
    if (e.target.checked) {
      arr = [...feedingChoice, inputValue]
      setFeedingChoice(arr)
    } else {
      // // let index = arr.indexOf(inputValue)
      // // arr.splice(index, 1)
      arr = feedingChoice.filter((item: any) => item !== e.target.value)
      setFeedingChoice(arr)
    }
    setFormData2({
      ...formData2,
      [name]: arr
    })
  }

  const handleAboutYou = async (e: any) => {
    e.preventDefault();
    try {
      let errors: any = {}
      if (formData1?.first_name?.length < 3 || formData1?.last_name?.length < 3 || (formData1?.phone?.length < 10 || formData1?.phone?.length > 10)) {
        if (formData1?.first_name?.length < 3) {
          errors.first_name = 'Minimum 3 char required'
        }
        if (formData1?.last_name?.length < 3) {
          errors.last_name = 'Minimum 3 char required'
        }
        if (formData1?.phone?.length < 10 || formData1?.phone?.length > 10) {
          errors.phone = 'Contact number should be of 10 digits'
        }
        // if (formData1?.zip_code?.length < 5) {
        //   errors.zip_code = 'Please enter valid zip code'
        // }
        setError(errors)

      } else {
        setLoading(true)
        let formData = new FormData()
        formData.append('user_id', userData?.id)
        formData.append('first_name', formData1?.first_name)
        formData.append('last_name', formData1?.last_name)
        formData.append('email', userData?.email)
        formData.append('phone', formData1?.phone)
        formData.append('dob', formData1?.dob)
        formData.append('zip_code', formData1?.zip_code)
        formData.append('gender', formData1?.gender)
        formData.append('type_mom', formData1?.type_mom)
        formData.append('current_life_status', formData1?.current_life_status)
        formData.append('photo', formData1?.photo)
        let res: any = await profileAboutUpdate(formData)

        let message = res?.data?.message
        let msg = "";
        for (let i = 0; i < message.length; i++) {
          msg += message[i]
        }
        if (res?.data?.success) {
          getProfileBaby()
          let data = await getUserProfileUpdateAPI()
          toast.success(msg)
          setLoading(false)
          localStorage.setItem('profile_data_update', JSON.stringify(res?.data?.data))
        }
        Navigate(EDITPROFILE)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const handleBabyProfile = async (e: any) => {
    e.preventDefault();
    try {
      let errors: any = {}
      if (formData2?.baby_first_name?.length < 3) {
        if (formData2?.baby_first_name?.length < 3) {
          errors.baby_first_name = 'Minimum 3 char required'
        }
        setError(errors)
      } else {
        setLoading(true)
        let data: any = {
          user_id: userData?.id,
          ...formData2
        }
        let res: any = await profilebabyUpdate(data)

        let message = res?.data?.message
        let msg = "";
        for (let i = 0; i < message.length; i++) {
          msg += message[i]
        }
        if (res?.data?.success) {
          getProfileBaby()
          toast.success(msg)
          setLoading(false)
        }
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const handleProfileFamily = async (e: any) => {
    e.preventDefault();
    try {
      let errors: any = {}
      if (formData3?.family_first_name?.length < 3 || formData3?.family_last_name?.length < 3 ||
        !emailRegex.test(formData3?.family_email)) {
        if (formData3?.family_first_name?.length < 3) {
          errors.family_first_name = 'Minimum 3 char required'
        }
        if (formData3?.family_last_name?.length < 3) {
          errors.family_last_name = 'Minimum 3 char required'
        }
        if (!emailRegex.test(formData3?.family_email)) {
          errors.family_email = 'Please enter valid email'
        }

        setError(errors)
      } else {
        let data: any = {
          user_id: userData?.id,
          ...formData3
        }
        setLoading(true)
        let res: any = await profileFamilyUpdate(data)
        // debugger
        let message = res?.data?.message
        let msg = "";
        for (let i = 0; i < message.length; i++) {
          msg += message[i]
        }
        if (res?.data?.success) {
          toast.success(msg)
          setLoading(false)
        }
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const handleChangePass = async (e: any) => {
    e.preventDefault();
    try {
      let errors: any = {}
      if (!formData4?.current_password || !formData4?.password || !passwpordRegex.test(formData4?.password) ||
        !formData4?.password_confirmation || formData4?.password !== formData4?.password_confirmation) {

        if (!formData4?.current_password) {
          errors.current_password = 'Please enter current password'
        }
        if (!passwpordRegex.test(formData4?.password)) {
          errors.password = 'Password should contain 6 to 20 characters including one numeric digit, one uppercase letter, one lowercase letter and one special character'
        }
        if (!formData4?.password) {
          errors.password = 'Please enter new password'
        }


        if (!formData4?.password_confirmation) {
          errors.password_confirmation = 'Please enter confirm password'
        }

        if (formData4?.password !== formData4?.password_confirmation) {
          errors.password_confirmation = 'Please make sure your Passwords match'
        }
        setError(errors)

      } else {
        setLoading(true)
        let data: any = {
          user_id: userData?.id,
          ...formData4
        }
        let res: any = await accountSettingAPI(data)

        let message = res?.data?.message
        let msg = "";
        for (let i = 0; i < message.length; i++) {
          msg += message[i]
        }
        if (!res?.data?.success) {
          setLoading(false)
          setError({
            ...error,
            ['current_password']: msg
          })
        }
        if (res?.data?.success) {
          toast.success(msg)
          setLoading(false)
        }
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }


  const handleAddNewChild = (id: number) => {

    // if (addOption.includes(id)) {
    //     setAddOption([])
    // } else {
    //     setAddOption([id])
    // }
    if (!addOption.includes(id)) {
      setAddOption([id])
    } else if (addOption.length < 2) {
      setAddOption([...addOption, id + 1])
    }
  }

  useEffect(() => {
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user);
    setUserData(user)
  }, [])
  console.log('================>', formData2)
  console.log(profileData)
  console.log(feedingChoice)
  return (
    <>
      {formNo == 0 &&
        <div className='col-lg-12 col-md-12'>
          <h5 className='section-title'>Tell us about yourself</h5>
          <div className='edit-profile-container py-5 mb-4'>
            <div className="step-innercontent step2">
              <div className="yourself-main">

                <div className="profile-updaterdiv text-center">
                  <div className=" mt-5 mb-3" onClick={() => userImageref.current.click()}>
                    <img className="img-upload" alt="" src={image ? image : profileData?.about_you?.photo || Profile} />
                    <img src={Camera} className="img-upload-icon" alt="" />
                  </div>
                  <input type="file" accept="image/png, image/gif, image/jpeg" name="photo"
                    onChange={(e) => handleSelectOption(e, '', 'photo')} className="d-none" ref={userImageref} />
                  <h4 className="error-msgtext text-center"></h4>
                </div>

                <form className="step-form row">

                  <div className="form-group-m col-lg-12 mb-3">
                    <div className="row">
                      <div className="form-group col-lg-6 col-md-6">
                        <label>First Name</label>
                        <input type="text"
                          name='first_name'
                          className='form-control'
                          value={formData1?.first_name}
                          onChange={handleInputText}
                          id=""
                          placeholder='First Name'
                        />
                        <h4 className="error-msgtext">{error?.first_name}</h4>
                      </div>
                      <div className="form-group col-lg-6 col-md-6">
                        <label>Last Name</label>
                        <input type="text"
                          name='last_name'
                          className='form-control'
                          value={formData1?.last_name}
                          onChange={handleInputText}
                          id=""
                          placeholder='Last Name'
                        />
                        <h4 className="error-msgtext">{error?.last_name}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-m col-lg-12 col-md-12 mb-3">
                    <div className="row">
                      <div className="form-group col-lg-12 col-md-12 gender-box ">
                        <label>Email</label>
                        <input type="email" name="email"
                          value={formData1?.email}
                          // onChange={handleChange} value={value?.email}
                          className=' form-control'
                          id="" placeholder="Email" />
                        <h4 className="error-msgtext"></h4>
                      </div>
                    </div>
                  </div>
                  <div className="form-group-m col-lg-12 col-md-12 mb-3">
                    <div className="row">
                      <div className="form-group col-lg-12 col-md-12 gender-box ">
                        <label>Contact number</label>
                        <input type="number" name="phone"
                          value={formData1?.phone}
                          className=' form-control'
                          id="" onChange={handleInputText} placeholder="Contact no." />
                        <h4 className="error-msgtext">{error?.phone}</h4>
                      </div>
                    </div>
                  </div>



                  {user?.is_membership ?
                    <> <div className="form-group-m col-lg-12 mb-3">
                      <div className="row">
                        <div className={`form-group birthday-box col-lg-6 col-md-6`}>
                          <label>What’s your birthdate?</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <MobileDatePicker
                                // value={user.dob}                              
                                value={formData1?.dob}
                                toolbarTitle="Choose date"
                                disableFuture
                                onChange={(date) => handleDateChange(date, 'dob')}
                                renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                              />
                            </Stack>
                          </LocalizationProvider>
                          <h4 className="error-msgtext"></h4>
                        </div>

                        <div className="form-group col-lg-6 col-md-6">
                          <label>What’s your zip code?</label>
                          <input type="number"
                            name='zip_code'
                            className='form-control'
                            value={formData1?.zip_code}
                            onChange={handleInputText}
                            id=""
                          />
                          <h4 className="error-msgtext">{error?.zip_code}</h4>
                        </div>
                      </div>

                    </div></> : <></>
                  }
                  {user?.is_membership ? <div className="form-group-m col-lg-12 col-md-12 mb-3">
                    <div className="row">
                      <div className="form-group col-lg-12 col-md-12 gender-box ">
                        <label>What are your preferred pronouns?</label>
                        <Autocomplete
                          disablePortal
                          id="Gender"
                          // name='gender'                          
                          // className={`${error?.gender && "input-errorborder"}`}
                          options={Gender}
                          value={formData1?.gender || ""}
                          sx={{ width: 300 }}
                          onChange={(e, value) => handleSelectOption(e, value, 'gender1')}
                          renderInput={(params) => <TextField placeholder='Gender' {...params} name="gender" />}
                        />
                        <h4 className="error-msgtext"></h4>
                      </div>
                    </div>
                  </div> : <></>
                  }
                </form>

                {user?.is_membership ? <div className="radio-area mb-3">
                  <h4>What best describes you?</h4>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="customCheck1" onChange={handleRadioBtn} value="full time working parent" checked={formData1?.type_mom === "full time working parent"} /><label className="form-check-label">Full time working parent</label>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" onChange={handleRadioBtn} value="part time working parent" checked={formData1?.type_mom === "part time working parent"} /><label className="form-check-label" >Part time working parent</label>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" onChange={handleRadioBtn} value="Stay at home parent" checked={formData1?.type_mom === 'Stay at home parent'} /><label className="form-check-label" >Stay at home parent</label>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" onChange={handleRadioBtn} value="Self employed" checked={formData1?.type_mom === "Self employed"} /><label className="form-check-label">Self employed</label>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" onChange={handleRadioBtn} value="unemployed" checked={formData1?.type_mom === "unemployed"} /><label className="form-check-label">unemployed</label>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" onChange={handleRadioBtn} value="other" checked={formData1?.type_mom === "other"} /><label className="form-check-label" >Other</label>
                    </div>
                  </div>
                  <div className="custom-control custom-radio">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type_mom" id="flexRadioDefault2" onChange={handleRadioBtn} value="I prefer not to say" checked={formData1?.type_mom === "I prefer not to say"} />
                      <label className="form-check-label">I prefer not to say</label>
                    </div>
                  </div><h4 className="error-msgtext"></h4>
                </div> : <></>
                }
              </div>


              {user?.is_membership ? <div className="radio-area">
                <h4>What’s your current life status?</h4>
                <div className="custom-control custom-radio">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="current_life_status" value="I’m Single" checked={formData1?.current_life_status === "I’m Single"} onChange={handleRadioBtn} id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      I’m Single
                    </label>
                  </div>
                </div>
                <div className="custom-control custom-radio">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="current_life_status" value='I have a Partner or Support Person' checked={formData1?.current_life_status === 'I have a Partner or Support Person'} onChange={handleRadioBtn} />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      I have a Partner or Support Person
                    </label>
                  </div>
                </div>

                <h4 className="error-msgtext"></h4>
              </div> : <></>
              }
              <div className='d-flex justify-content-between mt-5'>
                <button type="button" className="primary-blue-small-btn btn w-50 me-2" disabled={loading} onClick={handleAboutYou} >{loading ? <CircularProgress /> : 'Save Changes'}</button>
                <button type="button" className="primary-outline-btn h50 btn w-50 ms-2" onClick={handleCancel}>Cancel</button>
              </div>
            </div>

          </div>

        </div>
      }

      {
        formNo == 1 &&
        <div className='col-lg-12 col-md-12'>
          <h5 className='section-title'>About your  Baby</h5>
          <div className='edit-profile-container py-5 mb-4'>
            <div className='step-innercontent step4'>
              <form className="step-form">
                <div className="radio-area pb-4 ">
                  <h4>Are you currently expecting?</h4>
                  <div className="custom-radio custom-control-inline">
                    <input type="radio" id="customRadio1" name="pregnant" checked={formData2?.pregnant === 'yes'} value="yes" onChange={handleRadioBtn}
                      className="custom-control-input form-check-input" />
                    <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                    <input
                      type="radio"
                      id="customRadio2"
                      name="pregnant"
                      checked={formData2?.pregnant === 'no'}
                      value="no" className="custom-control-input form-check-input"
                      onChange={handleRadioBtn}
                    />
                    <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                  </div>
                  <h5 className="error-msgtext"></h5>
                </div>

                {
                  formData2?.pregnant === 'yes' &&
                  <div>
                    <div className="form-group birthday-box mb-3">
                      <label>Expected due date</label>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <MobileDatePicker
                            disablePast
                            label=""
                            className="error-input"
                            inputFormat="MM/dd/yyyy"
                            value={formData2?.due_date}
                            onChange={(date) => handleDateChange(date, 'due_date')}
                            // value={valueYes?.due_date || ""}
                            // onChange={(date) => yesHandleChange(date)}
                            renderInput={(params) => <TextField placeholder="MM-DD-YYYY" {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                      <h5 className="error-msgtext"></h5>
                    </div>
                    <div className="form-group mb-3 baby-gender">
                      <label>Baby’s Gender</label>
                      <Autocomplete
                        disablePortal
                        id="Gender"
                        // value={formData2?.gender}
                        // className={`${error?.gender && "input-errorborder"}`}
                        options={Gender1}
                        // onChange={yesHandleChange}
                        value={formData2?.expected_baby_gender}
                        onChange={(e, value) => handleSelectOption(e, value, 'expected_baby_gender')}
                        renderInput={(params) => <TextField placeholder='Baby’s Gender' {...params} name="gender" />}
                      />
                      <h4 className="error-msgtext"></h4>
                    </div>
                  </div>
                }
                {
                  formData2?.pregnant === 'no' &&
                  <div>
                    <div className="form-group mb-3">
                      <label>Baby’s First Name</label>
                      <input type="text" name="baby_first_name"
                        className="form-control" onChange={handleInputText} id="" value={formData2?.baby_first_name}
                        placeholder="First-name" />
                      <h5 className="error-msgtext">{error?.baby_first_name}</h5>
                    </div>

                    <div className="form-group birthday-box mb-3">
                      <label>Baby’s Birthdate</label>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <MobileDatePicker
                            disableFuture
                            label=""
                            className="error-input"
                            inputFormat="MM/dd/yyyy"
                            value={formData2?.baby_dob}
                            onChange={(date) => handleDateChange(date, 'baby_dob')}
                            // value={valueYes?.due_date || ""}
                            // onChange={(date) => yesHandleChange(date)}
                            renderInput={(params) => <TextField placeholder="MM-DD-YYYY" {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                      <h5 className="error-msgtext"></h5>
                    </div>

                    <div className="form-group mb-3 baby-gender">
                      <label>Baby’s Gender</label>
                      <Autocomplete
                        disablePortal
                        id="Gender"
                        // value={formData2?.baby_gender}
                        // className={`${error?.gender && "input-errorborder"}`}
                        options={Gender1}
                        value={formData2?.baby_gender}
                        onChange={(e, value) => handleSelectOption(e, value, 'baby_gender')}
                        renderInput={(params) => <TextField placeholder='Baby’s Gender' {...params} name="gender" />}
                      />
                      <h4 className="error-msgtext"></h4>
                    </div>

                    <div className="radio-area mb-3">
                      <h4>How are you feeding your baby? </h4>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="checkbox" id="customRadio3" name="feeding_choice" value="Breastfeeding"
                          //  checked={formData2?.feeding_choice?.some((item:string)=>item === 'Breastfeeding')} 
                          onChange={handleFeedingChoice} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio3">Breast-feeding</label>

                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="checkbox" id="customRadio4" name="feeding_choice" value="Pumping" onChange={handleFeedingChoice} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio4">Pumping</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="checkbox" id="customRadio5" name="feeding_choice" value="Formulafeeding" onChange={handleFeedingChoice} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio4">Formula Feeding</label>
                      </div>

                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={handleFeedingChoice} value="Donorbreastmilk" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio4">Donor Breastmilk</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={handleFeedingChoice} value="solid_foods" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio4">Solid Foods</label>
                      </div>
                      {/* <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio5" name="feeding_choice" onChange={handleRadioBtn} checked={formData2?.feeding_choice === "All"} value="All" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio5">Select All</label>
                      </div> */}

                    </div>
                    <div className="radio-area mb-3">
                      <h4>Was your baby born prematurely (prior to 37 weeks)?</h4>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio6" name="baby_premature" value="yes" onChange={handleRadioBtn} checked={formData2?.baby_premature === 'yes'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio6">yes</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio7" name="baby_premature" value='no' onChange={handleRadioBtn} checked={formData2?.baby_premature === 'no'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio7">no</label>
                      </div>
                      <h5 className="error-msgtext"></h5>
                    </div>

                    <div className="radio-area mb-3">
                      <h4>How did you welcome your baby?</h4>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio3" name="c_section" value="Natural conception" onChange={handleRadioBtn} checked={formData2?.c_section === 'Natural conception'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio3">Natural conception</label>

                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio4" name="c_section" value="Fertility assisted methods" onChange={handleRadioBtn} checked={formData2?.c_section === 'Fertility assisted methods'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio4">Conception through IUI, IVF, or other fertility assisted methods</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio5" name="c_section" value="Surrogacy" onChange={handleRadioBtn} checked={formData2?.c_section === 'Surrogacy'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio5">Surrogacy</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio5" name="c_section" value="Adoption" onChange={handleRadioBtn} checked={formData2?.c_section === 'Adoption'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio5">Adoption</label>
                      </div>

                      {/* <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio3" name="delivery_choice" checked={formData2?.delivery_choice === "Natural conception"} onChange={handleRadioBtn} value="Natural conception" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio3">Natural conception</label>

                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio4" name="delivery_choice" onChange={handleRadioBtn} checked={formData2?.delivery_choice === "Fertility assisted methods"} value="Fertility assisted methods" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio4">Conception through IUI, IVF, or other fertility assisted methods</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio5" name="delivery_choice" onChange={handleRadioBtn} checked={formData2?.delivery_choice === "Surrogacy"} value="Surrogacy" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio5">Surrogacy</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio5" name="delivery_choice" onChange={handleRadioBtn} checked={formData2?.delivery_choice === "Adoption"} value="Adoption" className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio5">Adoption</label>
                      </div> */}

                      <h5 className="error-msgtext"></h5>
                    </div>

                    <div className="radio-area mb-3">
                      <h4>Did you struggle with fertility?</h4>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio6" name="fertility_question" value="yes" onChange={handleRadioBtn} checked={formData2?.fertility_question === 'yes'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio6">yes</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadio7" name="fertility_question" value="no" onChange={handleRadioBtn} checked={formData2?.fertility_question === 'no'} className="custom-control-input form-check-input" />
                        <label className="custom-control-label step_two" htmlFor="customRadio7">no</label>
                      </div>
                      <h5 className="error-msgtext"></h5>
                    </div>

                    {addOption.includes(1) && <>
                      <div className="form-group mb-3">
                        <label>Baby’s First Name</label>
                        <input type="text" name="baby_first_name1"
                          className="form-control" onChange={handleInputText} id="" value={formData2?.baby_first_name1}
                          placeholder="First-name" />
                        <h5 className="error-msgtext">{error?.baby_first_name}</h5>
                      </div>

                      <div className="form-group birthday-box mb-3">
                        <label>Baby’s Birthdate</label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <MobileDatePicker
                              disableFuture
                              label=""
                              className="error-input"
                              inputFormat="MM/dd/yyyy"
                              value={formData2?.baby_dob1}
                              onChange={(date) => handleDateChange(date, 'baby_dob1')}
                              // value={valueYes?.due_date || ""}
                              // onChange={(date) => yesHandleChange(date)}
                              renderInput={(params) => <TextField placeholder="MM-DD-YYYY" {...params} />}
                            />
                          </Stack>
                        </LocalizationProvider>
                        <h5 className="error-msgtext"></h5>
                      </div>

                      <div className="form-group mb-3 baby-gender">
                        <label>Baby’s Gender</label>
                        <Autocomplete
                          disablePortal
                          id="Gender"
                          // value={formData2?.baby_gender}
                          // className={`${error?.gender && "input-errorborder"}`}
                          options={Gender1}
                          value={formData2?.baby_gender1}
                          onChange={(e, value) => handleSelectOption(e, value, 'baby_gender1')}
                          renderInput={(params) => <TextField placeholder='Baby’s Gender' {...params} name="gender" />}
                        />
                        <h4 className="error-msgtext"></h4>
                      </div>
                    </>
                    }
                    {
                      addOption.includes(2) &&
                      <>

                        <div className="form-group mb-3">
                          <label>Baby’s First Name</label>
                          <input type="text" name="baby_first_name2"
                            className="form-control" onChange={handleInputText} id="" value={formData2?.baby_first_name2}
                            placeholder="First-name" />
                          <h5 className="error-msgtext">{error?.baby_first_name}</h5>
                        </div>

                        <div className="form-group birthday-box mb-3">
                          <label>Baby’s Birthdate</label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <MobileDatePicker
                                disableFuture
                                label=""
                                className="error-input"
                                inputFormat="MM/dd/yyyy"
                                value={formData2?.baby_dob2}
                                onChange={(date) => handleDateChange(date, 'baby_dob2')}
                                // value={valueYes?.due_date || ""}
                                // onChange={(date) => yesHandleChange(date)}
                                renderInput={(params) => <TextField placeholder="MM-DD-YYYY" {...params} />}
                              />
                            </Stack>
                          </LocalizationProvider>
                          <h5 className="error-msgtext"></h5>
                        </div>

                        <div className="form-group mb-3 baby-gender">
                          <label>Baby’s Gender</label>
                          <Autocomplete
                            disablePortal
                            id="Gender"
                            // value={formData2?.baby_gender}
                            // className={`${error?.gender && "input-errorborder"}`}
                            options={Gender1}
                            value={formData2?.baby_gender2 || ""}
                            onChange={(e, value) => handleSelectOption(e, value, 'baby_gender2')}
                            renderInput={(params) => <TextField placeholder='Baby’s Gender' {...params} name="gender" />}
                          />
                          <h4 className="error-msgtext"></h4>
                        </div>

                      </>


                    }



                    {
                      addOption?.length < 2 &&
                      <Link to={''} className="add-child-info secondary_hyperlink" onClick={() => handleAddNewChild(1)}>+ Add child</Link>
                    }
                  </div>
                }
                <div className='d-flex justify-content-between mt-5'>
                  <button type="button" className="primary-blue-small-btn btn w-50 me-2" disabled={loading} onClick={handleBabyProfile} >{loading ? <CircularProgress /> : 'Save Changes'}</button>
                  <button type="button" className="primary-outline-btn h50 btn w-50 ms-2" onClick={handleCancel1} >Cancel</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      }

      {
        formNo == 2 &&
        <div className='col-lg-12 col-md-12'>
          <h5 className='section-title'>About your Partner</h5>
          <div className='edit-profile-container py-5 mb-4'>
            <div className="step-innercontent step4">
              <form className="step-form">
                <div className="form-group mb-3">
                  <label>Partner or Support Person’s First Name</label>
                  <input type="text" name="family_first_name"
                    value={formData3?.family_first_name}
                    onChange={handleInputText}
                    className=' form-control' id=""
                    placeholder="Name" />
                  <h5 className="error-msgtext">{error?.family_first_name}</h5>
                </div>

                <div className="form-group mb-3">
                  <label>Partner or Support Person’s Last Name</label>
                  <input type="text" name="family_last_name"
                    value={formData3?.family_last_name}
                    onChange={handleInputText}
                    className='form-control' id=""
                    placeholder="Last Name" />
                  <h5 className="error-msgtext">{error?.family_last_name}</h5>
                </div>
                <div className="form-group mb-3">
                  <label>Partner or Support Person’s Email</label>
                  <input type="email" name="family_email" value={formData3?.family_email}
                    // onChange={handleChange} 
                    className='form-control'
                    id=""
                    onChange={handleInputText}
                    placeholder="Email" />
                  <h5 className="error-msgtext">{error.family_email}</h5>
                </div>

                <div className='d-flex justify-content-between mt-5'>
                  <button type="button" className="primary-blue-small-btn btn w-50 me-2" disabled={loading} onClick={handleProfileFamily} >{loading ? <CircularProgress /> : 'Save Changes'}</button>
                  <button type="button" className="primary-outline-btn h50 btn w-50 ms-2" onClick={handleCancel2} >Cancel</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      }

      {
        formNo == 3 &&
        <div className='col-lg-12 col-md-12'>
          <h5 className='section-title'>Account settings</h5>
          <div className='edit-profile-container py-5 mb-4'>
            <div className="step-innercontent step4">
              <form className="step-form">
                <div className="form-group mb-3 position-relative">
                  <label>Current Password</label>
                  <input
                    // type="password"
                    type={isPasswordShow ? 'text' : 'password'}
                    value={formData4?.current_password}
                    name="current_password"
                    className='form-control'
                    onChange={handleInputText}
                    id="exampleInputPassword1"
                    placeholder="Enter your current password"
                  // onChange={handleChange}
                  />
                  {/* <img src={Eye} alt="" onClick={toggleIsPasswordShowValue} className="eye-passimg" />
                   */}
                  <img src={Eye} alt="" onClick={toggleIsCurrPassShowValue} className="eye-passimg" />
                  <h5 className="error-msgtext">{error?.current_password}</h5>
                </div>

                <div className="form-group mb-3 position-relative">
                  <label>New Password</label>
                  <input
                    // type="password"
                    type={isPasswordShow1 ? 'text' : 'password'}
                    name="password"
                    className='form-control'
                    onChange={handleInputText}
                    value={formData4?.password}
                    id="exampleInputPassword1"
                    placeholder="Enter new password"
                  // onChange={handleChange}
                  />
                  <img src={Eye} alt="" onClick={toggleIsPassShowValue} className="eye-passimg" />
                  <h5 className="error-msgtext">{error?.password}</h5>
                </div>
                <div className="form-group mb-3 position-relative">
                  <label>Confirm Password</label>
                  <input
                    // type="password"
                    type={isPasswordShow2 ? 'text' : 'password'}
                    name="password_confirmation"
                    className='form-control'
                    onChange={handleInputText}
                    value={formData4?.password_confirmation}
                    id="exampleInputPassword1"
                    placeholder="Enter confirm password"
                  // onChange={handleChange}
                  />
                  <img src={Eye} alt="" onClick={toggleIsConPassShowValue} className="eye-passimg" />
                  <h5 className="error-msgtext">{error?.password_confirmation}</h5>
                </div>



                <div className='d-flex justify-content-between mt-5'>
                  <button type="button" className="primary-blue-small-btn btn w-50 me-2" disabled={loading} onClick={handleChangePass}>{loading ? <CircularProgress /> : 'Save Changes'}</button>
                  <button type="button" className="primary-outline-btn h50 btn w-50 ms-2" onClick={handleCancel3} >Cancel</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Step1

const Gender = [
  { label: 'She/her/hers', value: 'She/her/hers' },
  { label: 'he/him/his', value: 'he/him/his' },
  { label: 'they/them/theirs', value: 'they/them/theirs' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
]
const Gender1 = [
  { label: 'Boy', value: "Boy", name: 'gender' },
  { label: 'Girl', value: "Girl", name: 'gender' },
  { label: 'It’s a Surprise', value: "It’s a Surprise", name: 'gender' },
  { label: 'it’s multiples', value: "it’s multiples", name: 'gender' },
]