import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../Assets/img/login/signup.svg"
import { LOGIN, VERIFYEMAIL } from '../../Routes/RouteConstent';
import { userSignup } from '../../Service/userAuth';
import { emailRegex, passwpordRegex } from '../../Utils/Regex';
import "./Signup.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import Eye from "../../Assets/img/eye.svg"
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';
import { useDispatch } from 'react-redux';



const hearAbout: any = []
const Signup = () => {
    let dispatch = useDispatch()
    let Navigate = useNavigate()
    const inputRef = useRef<any>(null)
    let [signupData, setSignupData] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""

    })
    let [error, setError] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
    })
    const [isLoading, setIsloading] = useState<boolean>(false)

    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState<boolean>(false);

    const toggleIsPasswordShowValue = () => {
        setIsPasswordShow(!isPasswordShow);
    };
    const toggleIsPasswordShowValue2 = () => {
        setIsPasswordShow2(!isPasswordShow2);
    };

    // onSubmit event
    let signupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // debugger
        e.preventDefault()
        try {
            const errors: any = {};
            if (!signupData.first_name || signupData.first_name.length < 3 ||
                signupData.last_name.length < 3 || !signupData.last_name || !signupData.email || !signupData.phone || signupData.phone.length < 10 ||
                !emailRegex.test(signupData.email) || !signupData.password || !passwpordRegex.test(signupData.password)
                || !signupData.password_confirmation
                || signupData.password !== signupData.password_confirmation) {

                if (signupData.first_name.length < 3) {
                    errors.first_name = "Minimum 3 character required";
                }
                if (!signupData.first_name) {
                    errors.first_name = "First name is Required"
                }
                if (signupData.last_name.length < 3) {
                    errors.last_name = "Minimum 3 character required"
                }
                if (!signupData.last_name) {
                    errors.last_name = "Last name is required"
                }
                if (!emailRegex.test(signupData.email)) {
                    errors.email = "Please enter a valid email"
                }
                if (!signupData.email) {
                    errors.email = "Email is required"
                }
                if (signupData.phone.length < 10) {
                    errors.phone = "Please enter a valid contact no."
                }
                if (!signupData.phone) {
                    errors.phone = "Contact no. is required"
                }
                if (!passwpordRegex.test(signupData.password)) {
                    errors.password = "Password should contain 6 to 20 characters including one numeric digit, one uppercase letter, one lowercase letter and one special character"
                }
                if (!signupData.password) {
                    errors.password = "Password is required"
                }

                if (signupData.password !== signupData.password_confirmation) {
                    
                    errors.password_confirmation = "Please make sure your Passwords match"
                }

                if (!signupData.password_confirmation) {
                    errors.password_confirmation = "Confirm password is required"
                }
                await setError(errors)
                let errorClass: any = document.getElementsByClassName("error-input")

                errorClass[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                setIsloading(true)
                let res = await userSignup(signupData)

                let isSucess = res.data.success;
                let message = res.data.message
                let msg = "";
                for (let i = 0; i < message.length; i++) {
                    msg += message[i];
                }
                if (!isSucess) {
                    toast.error(msg)

                }
                if (isSucess) {

                    localStorage.setItem("Nurture_user_data", JSON.stringify(res?.data?.data));
                    // localStorage.setItem("Nurture_user_token", res?.data?.data?.token);


                    let user_id = res?.data?.data?.id;
                    let email = res?.data?.data?.email;
                    dispatch(getCourse({ user_id: res?.data?.data?.id }))
                    dispatch(getFavCourse({ user_id: res?.data?.data?.id }))
                    toast.success(msg)
                    Navigate(VERIFYEMAIL, { state: { user_id, email } })
                }

                setIsloading(false)
            }

        } catch (error) {
            setIsloading(false)
        }
    }

    // onChange event 
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "hear_about_us") {
            if (e.target.checked) {
                hearAbout.push(value)
            } else {
                let index = hearAbout.indexOf(value)
                hearAbout.splice(index, 1)
            }
            setSignupData({
                ...signupData,
                [name]: hearAbout
            })
            return
        }
        if (name === "first_name") {
            if (value.length < 3) {

                setError({
                    ...error,
                    [name]: "Minimum 3 character Required"
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
                    [name]: "Minimum 3 character Required"
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
                    [name]: "Enter valid Email Address"
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
            } else {
                setError({
                    ...error,
                    [name]: ""
                })
            }
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
            if (value !== signupData.password) {
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
        setSignupData({
            ...signupData,
            [name]: value
        })


    }
    const onWheel = () => {
        inputRef.current.blur()
    }

    console.log(signupData)
    return (
        <div>
            <ToastContainer />
            <div className="container-fluid signup-page">
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6'>
                        <div className="login-inner">
                            <div className="text-center top-image">
                                <img src={Logo} alt="" />
                            </div>
                            <h1>Create an Account</h1>
                            <form onSubmit={signupSubmit}>
                                <div className="form-group mb-3">
                                    <label>First Name</label>
                                    <input type="text" name="first_name" value={signupData?.first_name}
                                        onChange={handleChange} className={`${error.first_name && "error-input"} form-control`} id="" placeholder="First Name" />
                                    <p className='error'>{error.first_name}</p>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" value={signupData?.last_name}
                                        onChange={handleChange} className={`${error.last_name && "error-input"} form-control`} id="" placeholder="Last Name" />
                                    <p className='error'>{error.last_name}</p>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" value={signupData?.email}
                                        onChange={handleChange} className={`${error.email && "error-input"} form-control`} id="" placeholder="someone@domain.com" />
                                    <p className='error'>{error.email}</p>
                                </div>
                                <div className="form-group mb-3">
                                    <label>What is your contact no.?</label>
                                    <input type="number" name="phone" ref={inputRef} onWheel={onWheel} min="0"
                                        onChange={handleChange} className={`${error.phone && "error-input"} form-control`} id="" placeholder="Contact no." />
                                    <p className='error'>{error.phone}</p>
                                </div>
                                <hr></hr>
                                <div className="form-group create_pass mb-3">
                                    <label>Create a Password</label>
                                    <input
                                        //type="password" 
                                        type={isPasswordShow ? 'text' : 'password'}
                                        name="password" value={signupData?.password}
                                        onChange={handleChange} className={`${error.password && "error-input"} form-control`} id="" placeholder="Create a Password" />
                                    <img src={Eye} alt="" onClick={toggleIsPasswordShowValue} className="eye-passimg" />
                                    <p className='error'>{error.password}</p>
                                </div>
                                <div className="form-group create_pass mb-3">
                                    <label>Re-Enter a Password</label>
                                    <input
                                        //type="password"
                                        type={isPasswordShow2 ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={signupData?.password_confirmation}
                                        onChange={handleChange} className={`${error.password_confirmation && "error-input"} form-control`} id="" placeholder="Re-Enter a Password" />
                                    <img src={Eye} alt="" onClick={toggleIsPasswordShowValue2} className="eye-passimg" />
                                    <p className='error'>{error.password_confirmation}</p>
                                </div>
                                <hr></hr>
                                {/* <div className="checkbox-area radio-area mb-3"> */}
                                {/* <h4>How did you hear about us? (optional)</h4>
                                    <div className="custom-control custom-radio">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Social Media
                                            </label>
                                        </div>
                                    </div> */}
                                {/* <div className="custom-control custom-radio">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Internet Search
                                            </label>
                                        </div>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Print
                                            </label>
                                        </div>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Friend
                                            </label>
                                        </div>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Healthcare professional
                                            </label>
                                        </div>
                                    </div> */}
                                {/* <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' value="social media" className="custom-control-input" id="Check1" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="Check1">Social media</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' value="internet search" className="custom-control-input" id="Check2" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="Check2">Internet search</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' className="custom-control-input" value="print" id="Check3" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="Check3">Print</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' className="custom-control-input" value="friend" id="Check4" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="Check4">Friend</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' className="custom-control-input" value="healthcare professional" id="Check5" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="Check5">Healthcare professional</label>
                                                        </div> */}
                                {/* </div> */}
                                {/* <div className="checkbox-area">
                                <h4>How did you hear about us? (optional)</h4>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={handleChange} name='hear_about_us' value="social media" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Social media</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={handleChange} name='hear_about_us' value="internet search" className="custom-control-input" id="customCheck2" />
                                    <label className="custom-control-label" htmlFor="customCheck2">Internet search</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={handleChange} name='hear_about_us' className="custom-control-input" value="print" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">Print</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={handleChange} name='hear_about_us' className="custom-control-input" value="friend" id="customCheck4" />
                                    <label className="custom-control-label" htmlFor="customCheck4">Friend</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={handleChange} name='hear_about_us' className="custom-control-input" value="healthcare professional" id="customCheck5" />
                                    <label className="custom-control-label" htmlFor="customCheck5">Healthcare professional</label>
                                </div>
                            </div> */}
                                <div className="bottom-createaccount">
                                    <h2>By proceeding to create your account and use Nuture by Naps,
                                        you are agreeing to our <a>Privacy Policy</a>  and <a>Terms of Service.</a></h2>
                                </div>
                                <button type="submit" disabled={isLoading} className="btn next-button primary-blue-btn mt-3" > {isLoading ? <CircularProgress /> : "Sign Up"}</button>
                                <div className="text-center have-account">
                                    <p>Already have an account? <Link to={LOGIN} >Sign  In Now</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Signup
