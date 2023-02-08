import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import Header from "../../Common/Header";
import Logo from "../../Assets/img/login/signup.svg"
import { CHECKMAIL, SIGNUP, VERIFYEMAIL } from '../../Routes/RouteConstent';
// import "./Login.scss";
import Eye from "../../Assets/img/signin/eye.svg";
import { useNavigate } from 'react-router-dom';
import { emailRegex } from '../../Utils/Regex';
import { UserForgotPassword } from '../../Service/userAuth';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';


const ForgotPassword = () => {
    let Navigate =  useNavigate()
    let [formData, setFormData] = useState({
        email: "",
        confirmEmail: ""
    })
    const [error, setError] = useState({
        email: "",
        confirmEmail: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    //onChange 
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "email") {
            if (!emailRegex.test(value)) {
                setError({
                    ...error,
                    email: "Please enter a valid email"
                })
            } else {
                setError({
                    ...error,
                    email: ""
                })
            }
        }
        if (name === "confirmEmail") {
            if (value !== formData.email) {
                setError({
                    ...error,
                    confirmEmail: "Email and confirm email are not mathched"
                })
            } else {
                setError({
                    ...error,
                    confirmEmail: ""
                })
            }
        }
        setFormData({
            ...formData,
            [name]: value
        })

    }


    let submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!formData.email  || !emailRegex.test(formData.email)
                ) {
                let errors: any = {}
                // if (formData.email !== formData.confirmEmail) {
                //     errors.confirmEmail = "Email and confirm email are not matched";
                // }
                if (!emailRegex.test(formData.email)) {
                    errors.email = "Please enter a valid email";
                }
                if (!formData.email) {
                    errors.email = "Please enter your email";
                }
                // if (!formData.confirmEmail) {
                //     errors.confirmEmail = "Re enter your email";
                // }
                setError(errors)
            } else {
                setIsLoading(true)
                let res = await UserForgotPassword({ email: formData.email })
                
                let isSuccess = res.data.success;
                let msgArr = res.data.message;
                debugger
                let msg = "";
                for(let i = 0; i < msgArr.length; i++){
                    msg += msgArr[i];
                }
                if(isSuccess){
                    Navigate(CHECKMAIL)
                }
                if(!isSuccess){
                    toast.error(msg)
                }
                setIsLoading(false)

            }
        } catch (error) {
            setIsLoading(false)

        }
    }


    return (
        <div>
            {/* <Header /> */}
            <ToastContainer/>
            <div className="container-fluid forgot-password-page">
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6'>
                    <div className="login-inner">
                        <div className="text-center top-image">
                            {/* <img src={Logo} alt="" /> */}
                        </div>
                        <h1>Forgot Password?</h1>
                        <form onSubmit={submitLogin}>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input type="email" value={formData.email} name="email"
                                    className={`${error.email && "error-input"} form-control`}
                                    id="exampleInputEmail1"
                                    placeholder="Type something"
                                    onChange={handleChange}
                                />
                                <p className="error">{error.email}</p>
                            </div>
                            {/* <div className="form-group position-relative mb-3">
                                <label>Re-Enter email</label>
                                <input type="email" value={formData.confirmEmail} name="confirmEmail"
                                    className={`${error.confirmEmail && "error-input"} form-control`}
                                    id="exampleInputPassword1"
                                    placeholder="Type something"
                                    onChange={handleChange}
                                />
                                <p className="error">{error.confirmEmail}</p>
                            </div> */}
                            <div className="text-center forget-password">
                                {/* <a className="">Forgot Password</a> */}
                            </div>
                            <button type="submit" disabled={isLoading} className="btn sign-inbtn primary-blue-btn">{isLoading ? <CircularProgress /> : "Reset Password"}</button>
                        </form>
                        <div className="text-center have-account mb-5">
                            <p>Having trouble? <a href="#" > Contact us</a></p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
