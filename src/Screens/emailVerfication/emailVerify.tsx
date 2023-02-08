import React, { useEffect, useState } from 'react'
import { ResendEmailVerify, verifyOtp } from '../../Service/userAuth';
import "./emailVerify.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'react-bootstrap';
import { LOGIN } from '../../Routes/RouteConstent';

const EmailVerify = () => {
    
    let { state }: any = useLocation()

    let Navigate = useNavigate()
    const [code, setCode] = useState<any>("")
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [sMsg, setSMsg] = useState<string>("")
    let [timer, setTimer] = useState(30)
    let [isLinkDisabled, setIsLinkDisabled] = useState<boolean>(false)
    //onChange 
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)


    let submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault();
            if (!code) {
                setError("Enter verification code")
            } else {

                let obj = {
                    user_id: user?.id,
                    email: user?.email,
                    otp: code
                }

                setIsLoading(true)
                let res = await verifyOtp(obj)

                const isSucess = res.data.success;
                let msgArray = res.data.message;
                let msg = ""
                for (let i = 0; i < msgArray.length; i++) {
                    msg += msgArray[i]
                }
                if (!isSucess) {
                    setError(msg)
                    // toast.error(msg)
                }
                if (isSucess) {
                    setSMsg(msg)
                    localStorage.removeItem('Nurture_user_data')
                    localStorage.setItem('Nurture_user_data',JSON.stringify(res?.data?.data))
                    // localStorage.setItem('Nurture_is_email_verify',JSON.stringify(res?.data?.data?.is_email_verify))
                    Navigate('/')
                }
                setIsLoading(false)

            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    const resendVeryCode = async () => {
        var startTime = new Date().getTime();
        var interval = setInterval(function () {
            if (new Date().getTime() - startTime > 30050) {
                clearInterval(interval);
                return;
            }
            setTimer(timer -= 1)
        }, 1000);
        try {
            let obj = {
                user_id: user?.id,
                email: user?.email
            }

            let res = await ResendEmailVerify(obj)

            let isSucess = res.data.success
            let message = res.data.message
            let msg = "";
            // if (isSucess ===true) {
            // }
            for (let i = 0; i < message.length; i++) {
                msg += message[i];
            }
            if (isSucess) {
                toast.success(msg)
                
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (timer == 0) {
            setTimer(30)
        }
    }, [timer])
    return (
        <div>
            {/* <Header /> */}
            <ToastContainer />
            <div className="container-fluid login-page">
                <div className="row justify-content-center">
                    <div className='col-lg-6 col-md-6'>
                        <div className="login-inner">
                            <div className="text-center top-image">
                                {/* <img src={Logo} alt="" /> */}
                            </div>
                            <h1>Email Verification</h1>
                            {!sMsg && <p className='text-center'>We have sent a verification code to your {state?.email ? `Email ${state?.email}` : `Email ${user?.email}`}</p>}
                            <div>
                                {sMsg && <Alert className="alert-body" variant="success" >
                                    <Alert.Heading className="alert-msg">
                                        {sMsg}
                                    </Alert.Heading>
                                </Alert>}
                            </div>
                            <form style={{ marginBottom: "200px" }} onSubmit={submitLogin}>
                                <div className="form-group mb-3">
                                    <label>Enter Verification Code</label>
                                    <input type="text" value={code} name="email"
                                        className={`${error && "error-input"} form-control`}
                                        id="exampleInputEmail1"
                                        placeholder="Type something"
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <p className="error">{error}</p>
                                </div>
                                {/* <a href='#'>Resend verification code</a> */}
                                {
                                    timer < 30 ? <span>Resend verification code {timer}s</span> :
                                        <Link to={''} onClick={resendVeryCode}>Resend verification code</Link>
                                }
                                {/* <Link to={''} onClick={resendVeryCode}>Resend verification code {timer}s</Link> */}
                                <div className="text-center forget-password">
                                    {/* <a className="">Forgot Password</a> */}
                                </div>
                                <button type="submit" disabled={isLoading} className="btn sign-inbtn primary-blue-btn mb-5">{isLoading ? <CircularProgress /> : "Submit"}</button>
                            </form>
                            {/* <div className="text-center have-account mb-5">
                            <p>Having trouble?<a href="#" >Contact us</a></p>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerify
