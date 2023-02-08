import React, { useEffect, useRef } from 'react'
import "./Header.scss";
import Logo from "../../Assets/img/Logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { COURSE, HOME, LOGIN, SIGNUP, ASKANURSE, EVENTS,MEMBERSHIP, GIFTCARD, VERIFYEMAIL } from '../../Routes/RouteConstent';
import ProfileMenu from './ProfileMenu';
import { getUserProfileEdit } from '../../Service/update_profile';
import getUserProfileUpdateAPI from '../../Utils/profileUpdateAPI';

const Header = () => {

    let navigate = useNavigate()
    const navRef = useRef<any>(null)
    const navRef2 = useRef<any>(null)

    let userToken: any = localStorage.getItem("Nurture_user_token");
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)
    let is_email: any = localStorage.getItem("Nurture_is_email_verify")
    is_email = JSON.parse(is_email)
      
    // const [toggle, setToggle] = useState(false);
    const [profileData, setProfileData] = useState<any>({})

    const logout = () => {
        localStorage.clear();
        navigate("");
    }

    const navigation = () => {
        navRef2.current.click()
    }
    const navigationLogin = () => {
        navRef2.current.click()
        navigate(LOGIN)
    }
    const navigationSignup = () => {
        navRef2.current.click()
        navigate(SIGNUP)
    }

    const getProfileData=async()=>{
        // let res:any = await getUserProfileUpdateAPI()
        // setProfileData(res?.about_you)
        try {
            let id: any = { user_id: user?.id }
            let res: any = await getUserProfileEdit(id)
            setProfileData(res?.data?.about_you)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getProfileData()
    },[])
    return (
        <div>
            <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                    <img src={Logo} alt="" />

                    {
                        (userToken || user) &&
                        <div className='d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none profile-mobile-view'><ProfileMenu /></div>
                    }
                    
                    <button ref={navRef2} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto" onClick={navigation}>
                            <li className="nav-item active">
                                <Link to={HOME} className="nav-link" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={COURSE} className="nav-link" >Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={EVENTS}>Live Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={''}>Book a Service</Link>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Member Chat</a>
                            </li> */}
                            <li className="nav-item">
                                {/* <a className="nav-link" href="#">Ask a Nurse</a> */}
                                <Link to={ASKANURSE} className="nav-link">Ask a Nurse</Link>
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link" href="#">Ask a Nurse</a> */}
                                <Link to={GIFTCARD} className="nav-link">Gift Card</Link>
                            </li>
                        </ul>
                        {

                        }
                        {/* <button className="btn login-btn mr-2" onClick={()=>navigate(LOGIN)} >
                            log in
                        </button>
                        <button className="btn startnow-btn" onClick={()=>navigate(SIGNUP)}>Start now</button> */}
                        {(userToken || user) ? (
                        <React.Fragment>
                             <div className='d-flex'>
                             {!user?.is_membership &&<button className="btn startnow-btn become-member"
                                onClick={()=>navigate(MEMBERSHIP)}
                            >Become a Member</button>} &nbsp;
                             </div>
                            {/* <button className="btn startnow-btn"
                                onClick={logout}
                            >Log out</button> */}
                            <div className='user-profile-cont d-none d-md-block d-lg-block d-xl-block d-xxl-block'>
                                <ProfileMenu data={profileData} />
                            </div>
                        </React.Fragment>

                        ) : (

                            <div className='top-nav-ext-btn d-flex flex-column flex-md-row'>
                                {/* <> */}
                                    <button className="btn login-btn mr-2" onClick={navigationLogin} >
                                        Log in
                                    </button>
                                    <button className="btn startnow-btn" onClick={navigationSignup}>Start now</button>
                                {/* </> */}
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header
