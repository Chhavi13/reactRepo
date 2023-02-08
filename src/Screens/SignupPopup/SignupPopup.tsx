
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../Assets/img/login/signup.svg"
import { LOGIN, VERIFYEMAIL } from '../../Routes/RouteConstent';
import { userSignup } from '../../Service/userAuth';
import { emailRegex, passwpordRegex } from '../../Utils/Regex';
import "./SignupPopup.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
const hearAbout: any = []
const SignupPopup = (props: any) => {
    let { isSignup, setIsSignup, setIslogin } = props;

    let [signupData, setSignupData] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        phone:'',
        password: '',
        password_confirmation: ''
    })
    let [error, setError] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        phone:"",
        password: "",
        password_confirmation: ""
    })

    // const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setIsSignup(true);
    };

    const handleClose = () => {
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
                !signupData.last_name || signupData.last_name.length < 3 || !signupData.email || !signupData.phone || signupData.phone.length < 10 ||
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
                if (signupData.phone.length < 10) {
                    errors.phone = "Please enter a valid contact no."
                }
                if (!signupData.phone) {
                    errors.phone = "Contact no. is required"
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
                console.log('============>', signupData)
            }
        } catch (err) {
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
                                                            className={`${error.first_name && "error-input"} form-control`} id="" placeholder="First Name" value={signupData.first_name} onChange={handleChange} />
                                                        <p className="error">{error.first_name}</p>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label>Last Name</label>
                                                        <input type="text" name="last_name"
                                                            className={`${error.last_name && "error-input"} form-control`} id="" placeholder="Last Name" value={signupData.last_name} onChange={handleChange} />
                                                        <p className="error">{error.last_name}</p>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label>Email</label>
                                                        <input type="email" name="email"
                                                            className={`${error.email && "error-input"} form-control`} id="" placeholder="Email" value={signupData.email} onChange={handleChange} />
                                                        <p className="error">{error.email}</p>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label>What is your contact no.?</label>
                                                        <input type="number" name="phone"
                                                            onChange={handleChange} className={`${error.phone && "error-input"} form-control`} id="" placeholder="Contact no." />
                                                        <p className='error'>{error.phone}</p>
                                                    </div>
                                                    <hr></hr>
                                                    <div className="form-group mb-3">
                                                        <label>Create a Password</label>
                                                        <input type="password" name="password"
                                                            className={`${error.password && "error-input"} form-control`} id="" placeholder="Create a Password" value={signupData.password} onChange={handleChange} />
                                                        <p className="error">{error.password}</p>

                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label>Re-Enter a Password</label>
                                                        <input type="password" name="password_confirmation"
                                                            className={`${error.password_confirmation && "error-input"} form-control`} id="" placeholder="Re-Enter a Password" value={signupData.password_confirmation} onChange={handleChange} />
                                                        <p className="error">{error.password_confirmation}</p>
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
                                                            </div> */}
                                                        {/* </div>
                                                        <div className="custom-control custom-radio">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                    Print
                                                                </label>
                                                            </div> */}
                                                        {/* </div>
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
                                                    {/* <div className="checkbox-area radio-area">
                                                        <h4>How did you hear about us? (optional)</h4>
                                                        efdfgdf
                                                        {/* <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' value="social media" className="custom-control-input" id="customCheck1" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="customCheck1">Social media</label>
                                                        </div> */}
                                                    {/* <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' value="internet search" className="custom-control-input" id="customCheck2" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="customCheck2">Internet search</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' className="custom-control-input" value="print" id="customCheck3" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="customCheck3">Print</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' className="custom-control-input" value="friend" id="customCheck4" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="customCheck4">Friend</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" name='hear_about_us' className="custom-control-input" value="healthcare professional" id="customCheck5" onChange={handleChange} />
                                                            <label className="custom-control-label" htmlFor="customCheck5">Healthcare professional</label>
                                                        </div> 
                                                    </div> */}
                                                    <div className="bottom-createaccount mb-3">
                                                        <h2>By proceeding to create your account and use Nuture by Naps,
                                                            you are agreeing to our <a>Privacy Policy</a>  and <a>Terms of Service.</a></h2>
                                                    </div>
                                                    <button type="submit" className="btn next-button mt-3" > Sign Up</button>
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

