import React, { useEffect, useState } from 'react'
//import LoginPopup from '../LoginPopup/LoginPopup';
//import SignupPopup from '../SignupPopup/SignupPopup';
import SignupPopup from '../../Utils/Popup/Signup';
import LoginPopup from '../../Utils/Popup/Login';
import EmailVerifyPopup from '../../Utils/Popup/emailVerifyPopup';

const Popup = (props: any) => {
    // let { isSignup, isLogin } = props;
    const [isLogin, setIslogin] = useState<boolean>(false);
    const [isSignup, setIsSignup] = useState<boolean>(false)
    const [isVerifyEmail, setIsVerifyEmail] = useState<boolean>(false)
    const [data, setData] = useState<any>({})
    let isUser: any = localStorage.getItem("Nurture_user_data")
    isUser = JSON.parse(isUser);



    useEffect(() => {
        if (!isUser) {
            setIslogin(true);
        }
    }, [isUser])
    return (
        <div>
            <LoginPopup isLogin={isLogin} setIsSignup={setIsSignup} setIslogin={setIslogin} />
            <SignupPopup isSignup={isSignup} setIsSignup={setIsSignup} setData={setData} setIsVerifyEmail={setIsVerifyEmail} setIslogin={setIslogin} />
            <EmailVerifyPopup isVerifyEmail={isVerifyEmail} data={data} setIsVerifyEmail={setIsVerifyEmail} />
        </div>
    )
}

export default Popup