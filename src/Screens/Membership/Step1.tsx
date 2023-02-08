import * as companyData from "../../Service/company-work"
import React, { useEffect, useState } from 'react'
import "./Membership.scss";
import Profile from "../../Assets/img/signup/profile.png"
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import { useRef } from 'react';
import ConvertFileTobase64 from "../../Utils/ConverBase64";
import { CircularProgress } from "@mui/material";
import Camera from "../../Assets/img/icons/camera.svg";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const Step1 = ({ handleNext, value, setValue, loading, error, setError, selectId, setSelectedId }: any): JSX.Element => {

    let [industryList, setIndustryList] = useState([])
    let [companyName, setCompanyName] = useState([])
    let [image, setImage] = useState<any>("")
    let getCompanyName = async () => {
        try {
            let res: any = await companyData.companyName()
            let convetArray = Array.from(res.data.data)
            let newValue: any = convetArray.map((value: any) => {
                value.label = value.name;
                return value;
            })
            setCompanyName(newValue)

        } catch (error: any) {

        }
    }
    let getIndustryList = async () => {
        try {

            let res: any = await companyData.AllIndustry();
            if (res.data.success) {
                let convertArry = Array.from(res.data.data)
                let newValue: any = convertArry.map((value: any) => {
                    value.label = value.name
                    return value
                })
                setIndustryList(newValue)
            }


        } catch (error: any) {

        }
    }
  

    useEffect(() => {
        getIndustryList();
        getCompanyName();
    }, [])
    let userImageref: any = useRef()

    // Date change handler
    const handleDateChange = (newValue: Date | null) => {

        var date = moment(newValue)
        var now = moment()
        if (now > date) {
            setValue({
                ...value,
                ["dob"]: moment(newValue).format("YYYY-MM-DD")
            })
            setError({
                ...error,
                ["dob"]: ""
            })
            return;
        } else {
            setValue({
                ...value,
                ["dob"]: ""
            })
            setError({
                ...error,
                ["dob"]: ""
            })
            return;
            // toast.error("Invalid Date")
        }
        setError({
            ...error,
            ["dob"]: "Invalid Date"
        })
        // setValue({
        //     ...value,
        //     ["dob"]: newValue
        // })

    }


    let HandleDataChange = async (e: any, dValues: any, reason?: any) => {
        let name = e.target.name;
        let inputValue = e.target.value;

        if (reason === "clear") {
            if (value.company === "") {
                setValue({
                    ...value,
                    ["company_code"]: ""
                })
            }
            setValue('')

        }

        if (dValues === "data") {
            setError({
                ...error,
                [name]: ""
            })
            setValue({
                ...value,
                [name]: inputValue
            })
        } else if (dValues === "image") {
            let base64: any = await ConvertFileTobase64(e.target.files[0])
            setImage(base64)
            setError({
                ...error,
                [name]: ""
            })
            setValue({
                ...value,
                [name]: e.target.files[0]
            })
        } else {
            if (e.target.id.search("Gender") === 0) {
                setError({
                    ...error,
                    ["gender"]: ""
                })
                setValue({
                    ...value,
                    ["gender"]: dValues.label
                })
            }
            if (e.target.id.search("industry") === 0) {

                setError({
                    ...error,
                    ["industry_id"]: ""
                })
                setValue({
                    ...value,
                    ["industry_id"]: dValues.id
                })
                // setValue({
                //     ...value,
                //     ["industry"]: dValues.label
                // })

            }
            if (e.target.id.search("companyName") === 0) {
                setError({
                    ...error,
                    ["company_id"]: ""
                })

                setValue({
                    ...value,
                    ["company_id"]: dValues.id,
                    ["company"]: dValues.label

                })

            }
        }
    }

    let radioButtonHandler = (e: any, id: any) => {
        if (selectId.includes(id)) {
            let newValue = selectId.filter((data: any) => data !== id)
            setSelectedId(newValue)
        } else if (id === 1) {
            setSelectedId([id])
        } else if (id === 2) {
            setSelectedId([id])
        } else if (id === 4) {
            setSelectedId([id])
        } else {
            setSelectedId([])
        }
        if (e.target.name === "type_mom")
            setError({
                ...error,
                [e.target.name]: ""
            })

        let checkValue = e.target.value

        setValue({
            ...value,
            [e.target.name]: checkValue
        })

    }

    let onStatusChange = (e: any) => {
        setError({
            ...error,
            "current_life_status": ""
        })
        setValue({
            ...value,
            "current_life_status": e.target.value
        })
    }
    console.log("all value", value)
    console.log('SelectEdId',selectId)
    return (
        <div>
            <ToastContainer />
            <div className="step-innercontent step2">
                <div className="yourself-main">
                    <h3>Tell us <span className="strong">about yourself</span></h3>
                    <p className="mb-5 text-center mx-5 px-2 yourself-desc">In these next few sections, we are going to ask you information about you and your family to better customize your experience. We do <span className='strong'>Not</span> share any of this information with any third party providers, or anyone outside of our organization. </p>
                    <div className="profile-updaterdiv text-center">
                        <div className=" mt-5 mb-3" onClick={() => userImageref.current.click()} >
                            <img className="img-upload" src={image ? image : Profile} alt="" />
                            <img src={Camera} className="img-upload-icon" alt="" />
                        </div>
                        <input type="file" accept="image/png, image/gif, image/jpeg"
                            name="photo" onChange={(e) => HandleDataChange(e, "image")}
                            className="d-none" ref={userImageref}
                        />
                        <h4 className="error-msgtext text-center">{error?.photo}</h4>
                    </div>

                    <form className="step-form row">
                        <div className="form-group-m col-lg-12 mb-3">
                            <div className="row">
                                <div className={`form-group birthday-box ${error?.dob && "input-errorborder"} col-lg-6 col-md-6`}>
                                    <label>What’s your birthdate?</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={3}>
                                            <MobileDatePicker
                                                value={value?.dob || ""}
                                                toolbarTitle="Choose date"
                                                disableFuture
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    <h4 className="error-msgtext">{error?.dob}</h4>
                                </div>

                                <div className="form-group col-lg-6 col-md-6">
                                    <label>What’s your zip code?</label>
                                    <input type="number"
                                        onChange={(e) => HandleDataChange(e, "data")}
                                        name="zip_code" className={`${error?.zip_code && 'error-input'} form-control`}
                                        value={value?.zip_code}
                                        id=""
                                    />
                                    <h4 className="error-msgtext">{error?.zip_code}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="form-group-m col-lg-12 col-md-12 mb-3">
                            <div className="row">
                                <div className="form-group col-lg-12 col-md-12 gender-box ">
                                    <label>What are your preferred pronouns?</label>
                                    <Autocomplete
                                        disablePortal
                                        id="Gender"
                                        value={value?.gender}
                                        className={`${error?.gender && "input-errorborder"}`}
                                        options={Gender}
                                        sx={{ width: 300 }}
                                        onChange={HandleDataChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <h4 className="error-msgtext">{error?.gender}</h4>
                                </div>
                                {/* <div className="form-group col-lg-6 col-md-6">
                                    <label>What is your contact no.?</label>
                                    <input type="number" name="phone"
                                        className={`${error?.phone && 'error-input'} form-control`}
                                        id="user_contact_no" placeholder="Contact no."
                                        onChange={(e) => HandleDataChange(e, "data")}
                                        value={value?.phone}
                                    />
                                    <h4 className="error-msgtext">{error?.phone}</h4>
                                </div> */}
                            </div>
                        </div>

                    </form>
                    <div className="radio-area mb-3">
                        <h4>What best describes you?</h4>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "full time working parent"} value="full time working parent" onChange={(e) => radioButtonHandler(e, 1)} id="customCheck1" />
                                <label className="form-check-label" >
                                    Full time working parent
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "part time working parent"} value="part time working parent" onChange={(e) => radioButtonHandler(e, 2)} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Part time working parent
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "Stay at home parent"} value="Stay at home parent" onChange={(e) => radioButtonHandler(e, 3)} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Stay at home parent
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "Self employed"} value="Self employed" onChange={(e) => radioButtonHandler(e, 4)} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Self employed
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "unemployed"} value="unemployed" onChange={(e) => radioButtonHandler(e, 5)} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    unemployed
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "other"} value="other" onChange={(e) => radioButtonHandler(e, 6)} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    Other
                                </label>
                            </div>
                        </div>

                        <div className="custom-control custom-radio">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type_mom" checked={value?.type_mom === "I prefer not to say"} value="I prefer not to say" onChange={(e) => radioButtonHandler(e, "I_prefer_not_to_say")} id="flexRadioDefault2" />
                                <label className="form-check-label" >
                                    I prefer not to say
                                </label>
                            </div>
                        </div>

                        <h4 className="error-msgtext">{error?.type_mom}</h4>

                        {
                            selectId.length > 0 && <div className="industry-section .ms-md-3 mt-0 mb-3 me-0">
                                <form className="">
                                    <div className="form-group industry-selectbox mb-3">
                                        <label>What industry are you in? </label>
                                        <Autocomplete
                                            disablePortal
                                            onChange={HandleDataChange}
                                            value={value?.industry}
                                            id="industry"
                                            className={`mt-0 ${error?.industry_id && "input-errorborder"}`}
                                            options={industryList}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="" />}
                                        />
                                        <h4 className="error-msgtext">{error?.industry_id}</h4>
                                    </div>
                                    <div className="form-group industry-selectbox mb-3">
                                        <label>Company Name</label>
                                        <Autocomplete
                                            disablePortal
                                            id="companyName"

                                            onChange={HandleDataChange}
                                            value={value?.company}
                                            className={`"mt-2" ${error?.company_id && "input-errorborder"}`}
                                            options={companyName}
                                            sx={{ width: 300 }}

                                            renderInput={(params) => <TextField {...params} label="" />}
                                        />
                                        <h4 className="error-msgtext">{error?.company_id}</h4>
                                    </div>
                                    <div className="form-group">
                                    </div>

                                    {value?.company && <h6 className="corporate-partner">Your company is a corporate partner!</h6>}
                                    <p className="hr-contact mb-3">Contact your HR department to find out how you save on the cost of Nurture by Naps.</p>
                                    <div className="form-group">
                                        <label>Enter Company Code</label>
                                        <input type="text" name="company_code" value={value.company ? value?.company_code : ""} className="form-control mt-2"
                                            onChange={(e) => HandleDataChange(e, "data")}
                                            id="" placeholder="" />
                                    </div>
                                </form>
                            </div>
                        }

                        <div className="radio-area">
                            <h4>What’s your current life status?</h4>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="current_life_status" checked={value?.current_life_status === "I’m Single"} value="I’m Single" id="flexRadioDefault1" onChange={onStatusChange} />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        I’m Single
                                    </label>
                                </div>
                            </div>
                            <div className="custom-control custom-radio">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="current_life_status" checked={value?.current_life_status === "I have a Partner or Support Person"} value="I have a Partner or Support Person" id="flexRadioDefault1" onChange={onStatusChange} />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        I have a Partner or Support Person
                                    </label>
                                </div>
                            </div>
                            {/* <div className="custom-control custom-radio">
                                <input type="radio" id="customRadio1" name="customRadio" 
                                checked={value?.current_life_status === "I’m Single"}
                                className="custom-control-input" onChange={onStatusChange} value="I’m Single" />
                                <label className="custom-control-label" htmlFor="customRadio1">I’m Single</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" id="customRadio2" 
                                checked={value?.current_life_status === "I have a Partner or Support Person"}
                                value="I have a Partner or Support Person" name="customRadio" onChange={onStatusChange} className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="customRadio2">I have a Partner or Support Person</label>
                            </div> */}
                            <h4 className="error-msgtext">{error?.current_life_status}</h4>
                        </div>
                    </div>

                </div>
                <button className="btn primary-blue-btn mb-5" disabled={loading} onClick={handleNext}>{loading ? <CircularProgress /> : "Next Step"}</button>
            </div>
        </div>
    )
}

export default Step1

const Gender = [
    { label: 'She/her/hers' },
    { label: 'he/him/his' },
    { label: 'they/them/theirs' },
    { label: 'Prefer not to say' },
]