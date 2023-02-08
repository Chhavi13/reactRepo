
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../Assets/img/login/signup.svg"
import Eye from "../../Assets/img/eye.svg"
import { LOGIN, VERIFYEMAIL } from '../../Routes/RouteConstent';
import { VERIFYEMAILPOPUP } from '../../Routes/RouteConstent';
import { userSignup } from '../../Service/userAuth';
import { emailRegex, passwpordRegex } from '../../Utils/Regex';
import "./Signup.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
const hearAbout: any = []

const SignupPopup = (props: any) => {
    let { isSignup, setIsSignup, setIslogin, setIsVerifyEmail, setData } = props;
    let Navigate = useNavigate()
    let [signupData, setSignupData] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    let [error, setError] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    let [loading, setLoading] = useState(false)
    // const [open, setOpen] = React.useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState<boolean>(false);
    const handleClickOpen = () => {
        setIsSignup(true);
    };
    const toggleIsPasswordShowValue = () => {
        setIsPasswordShow(!isPasswordShow);
    };
    const toggleIsPasswordShowValue2 = () => {
        setIsPasswordShow2(!isPasswordShow2);
    };
    const handleClose = (_e: any, type: any) => {
        if (type === "backdropClick") {
            return;
        }
        setIsSignup(false);
    };

    let handleChange = (e: any) => {
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
                    [name]: 'Minium 3 characters required'
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
                    [name]: 'Minimum 3 characters required'
                })
            } else {
                setError({
                    ...error,
                    [name]: ''
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
        if (name === "password") {
            if (!passwpordRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
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
                    [name]: "Password and confirm password are not matching"
                })
            } else {
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
    const errors: any = {}
    let signSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!signupData.first_name || signupData.first_name.length < 3 ||
                !signupData.last_name || signupData.last_name.length < 3 || !signupData.email ||
                !emailRegex.test(signupData.email) || !signupData.password || !passwpordRegex.test(signupData.password)
                || !signupData.password_confirmation || signupData.password !== signupData.password_confirmation) {
                if (signupData.first_name.length < 3) {
                    errors.first_name = "Minimum 3 character required"
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
                if (emailRegex.test(signupData.email)) {
                    errors.email = "6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
                }
                if (!signupData.email) {
                    errors.email = "Email is required"
                }
                if (passwpordRegex.test(signupData.password)) {
                    error.password = "6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
                }
                if (!signupData.password) {
                    errors.password = "Password is required"
                }
                if (signupData.password !== signupData.password_confirmation) {
                    errors.password_confirmation = "Password and Confirm password are not matching"
                }
                if (!signupData.password_confirmation) {
                    errors.password_confirmation = "Confirm password is required"
                }
                await setError(errors)
            } else {
                setLoading(true)
                let res = await userSignup(signupData)
                let isSuccess = res.data.success;
                let message = res.data.message;
                let msg = '';
                for (let i = 0; i < message.length; i++) {
                    msg += message[i];
                }
                if (!isSuccess) {
                    toast.error(msg)
                }
                if (isSuccess) {
                    let user_id = res?.data?.data?.id;
                    localStorage.setItem("Nurture_user_data", JSON.stringify(res?.data?.data));
                    localStorage.setItem("Nurture_user_token", res?.data?.data?.token);
                    let email = res.data.data.email;
                    toast.success(msg)
                    setData({ user_id, email })
                    setIsVerifyEmail(true)
                    setIsSignup(false)
                    // Navigate(VERIFYEMAILPOPUP, { state: { user_id, email } })
                }
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    let Login = () => {
        setIsSignup(false);
        setIslogin(true);
    }
    return (
        <div>

            <div className="login-inner">
                <div>

                    <Dialog
                        open={isSignup}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="signup-poupmodal modal-500"
                    >
                        {/* <DialogTitle id="alert-dialog-title">
                                    {"Use Google's location service?"}
                                </DialogTitle> */}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <div>
                                    <ToastContainer />
                                    <div className="container-fluid sign-pop signup-page">
                                        <div className="row">
                                            <div className="login-inner pt-5">
                                                <h1 className="heading">Create an Account</h1>
                                                <form onSubmit={signSubmit}>
                                                    <div className="form-group mb-3">
                                                        <label>First Name</label>
                                                        <input type="text" name="first_name"
                                                            className={`${error.first_name && "error-input"} form-control`} id="" placeholder="Enter first name" value={signupData.first_name} onChange={handleChange} />
                                                        <p className="error">{error.first_name}</p>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label>Last Name</label>
                                                        <input type="text" name="last_name"
                                                            className={`${error?.last_name && "error-input"} form-control`} id="" placeholder="Enter last name" value={signupData.last_name} onChange={handleChange} />
                                                        <p className="error">{error?.last_name}</p>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label>Email</label>
                                                        <input type="email" name="email"
                                                            className={`${error?.email && "error-input"} form-control`} id="" placeholder="Enter last Email" value={signupData.email} onChange={handleChange} />
                                                        <p className="error">{error?.email}</p>
                                                    </div>
                                                    <hr className='custom' />
                                                    <div className="form-group create_pass mb-3">
                                                        <label>Create a Password</label>
                                                        <input 
                                                            //type="password"
                                                            type={isPasswordShow ? 'text' : 'password'}
                                                             name="password"
                                                            className={`${error?.password && "error-input"} form-control`} id="" placeholder="Create a Password" value={signupData.password} onChange={handleChange} />
                                                            <img src={Eye} alt="" onClick={toggleIsPasswordShowValue} className="eye-passimg" />
                                                        <p className="error">{error.password}</p>

                                                    </div>
                                                    <div className="form-group create_pass mb-3">
                                                        <label>Re-Enter a Password</label>
                                                        <input 
                                                        //type="password"
                                                            name="password_confirmation"
                                                            type={isPasswordShow2 ? 'text' : 'password'}
                                                            className={`${error?.password_confirmation && "error-input"} form-control`} id="" placeholder="Re-Enter a Password" value={signupData.password_confirmation} onChange={handleChange} />
                                                            <img src={Eye} alt="" 
                                                            onClick={toggleIsPasswordShowValue2} 
                                                            className="eye-passimg" />
                                                        <p className="error">{error.password_confirmation}</p>
                                                    </div>
                                                    <hr className='custom' />
                                                    <div className="checkbox-area radio-area mb-3">
                                                        <h4>How did you hear about us? (optional)</h4>

                                                        <div className="custom-control custom-radio">
                                                            <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                Social Media
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="custom-control custom-radio">
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
                                                        </div>
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
                                                    </div>
                                                    <div className="bottom-createaccount">
                                                        <h2>By proceeding to create your account and use Nuture by Naps,
                                                            you are agreeing to our <a>Privacy Policy</a>  and <a>Terms of Service.</a></h2>
                                                    </div>
                                                    <button type="submit" className="btn next-button primary-blue-btn mt-3" > {loading ? <CircularProgress /> : "Sign Up"}</button>
                                                    <div className="text-center have-account">
                                                        <p>Already have an account? <a onClick={Login} >Sign  In Now</a></p>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div >

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={handleClose}>Disagree</Button>
                                    <Button onClick={handleClose} autoFocus>
                                        Agree
                                    </Button> */}
                        </DialogActions>
                    </Dialog>
                </div>

            </div>
        </div>

    )
}

export default SignupPopup

