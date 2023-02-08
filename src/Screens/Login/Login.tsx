import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Header from "../../Common/Header";
import Logo from "../../Assets/img/login/signup.svg"
import { FORGOTPASSWORD, HOME, SIGNUP, VERIFYEMAIL } from '../../Routes/RouteConstent';
import { UserLogin } from '../../Service/userAuth';
import "./Login.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import Eye from "../../Assets/img/eye.svg"
import { useDispatch } from 'react-redux';
import { getCourse, getFavCourse } from '../../Redux/Course/CourseReducer';

const Login = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    //onChange 
    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "email") {
            setError({
                ...error,
                email: ""
            })
        }
        if (name === "password") {
            setError({
                ...error,
                password: ""
            })
        }
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const toggleIsPasswordShowValue = () => {
        setIsPasswordShow(!isPasswordShow);
    };


    let submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!formData.email || !formData.password) {
                let errors: any = {}
                if (!formData.email) {
                    errors.email = "Email is required";
                }
                if (!formData.password) {
                    errors.password = "Password is required";
                }
                setError(errors)
                return;
            }

            setIsLoading(true)
            let res = await UserLogin(formData)
            // debugger
            const isSucess = res.data.success;
            let msgArr = res.data.message;
            let msg = "";
            for (let i = 0; i < msgArr.length; i++) {
                msg += msgArr[i];
            }

            if (!isSucess) {
                toast.error(msg)
            }
            if (isSucess) {
                // debugger
                localStorage.setItem("Nurture_user_data", JSON.stringify(res?.data?.data));
                localStorage.setItem("Nurture_user_token", res?.data?.data?.token);
                const user_id = res?.data?.data.id
                const email = res?.data?.data.email

                dispatch(getCourse({ user_id: res?.data?.data?.id }))
                dispatch(getFavCourse({ user_id: res?.data?.data?.id }))
                if (res.data.data.email_verified_at === null) {
                    navigate(VERIFYEMAIL, { state: { user_id, email } })
                } else {
                    navigate(HOME)
                }

            }
            setIsLoading(false)
        } catch (error: any) {
            setIsLoading(false)
            if (error.response.status === 401) {
                let msgArr = error.response.data.message;
                let msg = "";
                for (let i = 0; i < msgArr.length; i++) {
                    msg += msgArr[i];
                }
                toast.error(msg)
            }
        }
    }


    return (
        <div>
            {/* <Header /> */}
            <ToastContainer />
            <div className="container-fluid login-page">
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6'>
                        <div className="login-inner">
                            <div className="text-center top-image">
                                <img src={Logo} alt="" />
                            </div>
                            <h1>Welcome Back!</h1>
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
                                <div className="form-group position-relative mb-3">
                                    <label>Password</label>
                                    <input
                                        // type="password"
                                        type={isPasswordShow ? 'text' : 'password'}
                                        value={formData.password} name="password"
                                        className={`${error.password && "error-input"} form-control`}
                                        id="exampleInputPassword1"
                                        placeholder="Type something"
                                        onChange={handleChange}
                                    />
                                    <img src={Eye} alt="" onClick={toggleIsPasswordShowValue} className="eye-passimg" />
                                    <p className="error">{error.password}</p>
                                </div>
                                <button type="submit" disabled={isLoading} className="btn sign-inbtn primary-blue-btn">{isLoading ? <CircularProgress /> : "Sign In"}</button>
                                <div className="text-center forget-password">
                                    <Link to={FORGOTPASSWORD} className="">Forgot Password</Link>
                                </div>
                            </form>
                            <div className="text-center have-account">
                                <p className='mb-0'>Don’t have an account? <Link to={SIGNUP} className="n-signup">Create one</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
