import React, { useState } from 'react'
// import Logo from "../../assets/img/signin/Logo.png";
import "./ForgotPassword.scss"
import Back from "../../Assets/img/mobile/back.png";
// import Back from "../../Assets/img"
import { useSearchParams } from "react-router-dom";

// import Swal from 'sweetalert2';
// import { newPassword } from '../../Services/forgotPassword';
import { CircularProgress } from '@mui/material';
import Eye from "../../Assets/img/signin/eye.svg";
import { passwpordRegex } from '../../Utils/Regex';
import "./ForgotPassword.scss"
import { ResetPassword } from '../../Service/userAuth';
import { ToastContainer, toast } from 'react-toastify';



const SetNewPassword = () => {

    const [params] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [passwordText, setPasswordText] = useState({
        password: false,
        password_confirmation: false

    })

    let Token = params.get("token")
    let email = params.get("email")


    const [data, setData] = useState({
        password: "",
        password_confirmation: ""
    })
    const [error, setError] = useState({
        password: "",
        password_confirmation: ""
    })

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value

        if (name === "password") {
            if (!passwpordRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter and a special character"
                })
            } else {
                setError({
                    ...error,
                    [name]: ""
                })
            }

        }
        if (name === "password_confirmation") {
            if (value !== data.password) {
                setError({
                    ...error,
                    [name]: "Password and confirm password is not matching"
                })
            } else {
                setError({
                    ...error,
                    [name]: ""
                })
            }

        }
        setData({
            ...data,
            [name]: value
        })
    }

    let changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        try {

            e.preventDefault();
            if (email === null || Token === null) {

                return;
            }

            if (!passwpordRegex.test(data.password) || !data.password || !data.password_confirmation || data.password !== data.password_confirmation) {
                let errors: any = {}
                if (!passwpordRegex.test(data.password)) {
                    errors.password = "6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter and a special character";
                }
                if (!data.password) {
                    errors.password = "Please enter your new password";
                }
                if (data.password !== data.password_confirmation) {
                    errors.password_confirmation = "Password and confirm password is not matching";
                }
                if (!data.password_confirmation) {
                    errors.password_confirmation = "Please enter your password again"
                }
                setError(errors)
                return;
            }
            setLoading(true)
            let res: any = await ResetPassword({
                email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                token: Token
            })
            if (res.data.success === false) {
                let msg = res.data.message;
                let text = "";
                for (let i = 0; i < msg.length; i++) {
                    text += `${i + 1}. ${msg[i]}`
                }
                toast.error(text)
            }
            if (res.data.success === true) {
                let msg = res.data.message;
                let text = "";
                for (let i = 0; i < msg.length; i++) {
                    text += `${i + 1}. ${msg[i]}`
                }
                toast.success(text)
                
                setData({
                    password: "",
                    password_confirmation: ""

                })
            }
            setLoading(false)

        } catch (error: any) {
            setLoading(false)
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="container-fluid login-page forget-passwordpage">
                <div className="back-btn">
                    <a className="mobileback-btn">
                        <img src={Back} alt="" className="mr-2" />
                        Back</a>
                </div>
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6'>
                    <div className="login-inner">
                        <h1 className="set-pass forget-head">Set New Password</h1>
                        <form onSubmit={changePassword}>
                            <div className="form-group position-relative mb-3">
                                <label>Password</label>
                                <input type={`${passwordText.password ? "text" : "password"}`} className={`${error.password && 'error-input'} form-control`}
                                    name="password" id="exampleInputEmail1"
                                    value={data?.password} onChange={handleChange} placeholder="Type something"
                                />
                                <img src={Eye} alt="" className="eye-passimg" onClick={() => setPasswordText({
                                    ...passwordText,
                                    password: !passwordText.password
                                })} />
                                <h4 className="error">{error.password}</h4>
                                {/* <h4 className="pwd-text">6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter and a special character</h4> */}
                            </div>
                            <div className="form-group mb-3 position-relative">
                                <label>Re-Enter Password</label>
                                <input type={`${passwordText.password_confirmation ? "text" : "password"}`} value={data.password_confirmation}
                                    name="password_confirmation" onChange={handleChange}
                                    className={`${error.password_confirmation && 'error-input'} form-control`} id="exampleInputPassword1" placeholder="Type something"
                                />
                                <img src={Eye} alt="" className="eye-passimg" onClick={() => setPasswordText({
                                    ...passwordText,
                                    password_confirmation: !passwordText.password_confirmation
                                })} />
                                <h4 className="error">{error.password_confirmation}</h4>
                            </div>
                            <button type="submit" disabled={loading} className="btn sign-inbtn primary-blue-btn">{loading ? <CircularProgress /> : "Set As My New Password"}</button>
                        </form>
                        <div className="text-center pb-3 have-account">
                            <p><a href="" className="">Cancel, return to sign in</a></p>
                        </div>
                        <div className="text-center have-account">
                            <p>Having trouble? <a href="" className="">Contact Us</a></p>
                        </div>
                        {/*<div className="pb-5">
                             <div className="text-center Corporate-SignIn d-inline-block">
                                <a href="" className="">Corporate Sign In</a>
                            </div>
                            <div className="text-center Corporate-SignIn d-inline-block float-right">
                                <a href="" className="">Class Pass Code</a>
                            </div> 
                        </div>*/}
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SetNewPassword;