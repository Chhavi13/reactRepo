import React, { useState } from 'react'

// import Logo from "../../assets/img/signin/Logo.png";
// import "./ForgotPassword.scss";
// import "./NewPassword.scss";
// import "./ForgotPassword.scss"
import "./ForgotPassword.scss"
import { Link } from 'react-router-dom';
import { LOGIN ,SIGNUP } from '../../Routes/RouteConstent';

const SendEmail = () => {

    const [data, setData] = useState({
        email: "",
        confirmEmail: ""
    })

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            
            <div className="container-fluid login-page forget-passwordpage sent-emailpage">
                <div className="row">
                    <div className="login-inner pt-0 mt-0">
                        <div className="text-center top-image">
                            {/* <img src={Logo} alt="" /> */}
                        </div>
                        <h2 className="forget-head">Forgot Password</h2>
                        <p className="text-center">If this email is associated with an account,
                            we’ll send you password reset instructions to your email address..</p>

                        <div className="text-center have-account mb-5">
                            <p> <Link to={LOGIN}>Return to sign in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SendEmail;