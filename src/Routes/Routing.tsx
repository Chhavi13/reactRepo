import React, { useEffect } from 'react'
import {
  Routes,
  useLocation,
  Route,
} from "react-router-dom";
// import BuyCourse from '../Screens/Courses/buyCourse';
// import CourseDetails from '../Screens/Courses/courseDetails';
//import Courses from '../Screens/Courses/courses';
//import PaymentDetail from '../Screens/Courses/paymentDetail';
//import EmailVerify from '../Screens/emailVerfication/emailVerify';
//import SendEmail from '../Screens/ForgotPassword/EmailSent';
//import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
// import SetNewPassword from '../Screens/ForgotPassword/NewPassword';
// import Home from '../Screens/Home/Home';
// import Login from '../Screens/Login/Login';

// import LoginPopup from '../Screens/LoginPopup/LoginPopup';
//import Membership from '../Screens/Membership/Membership';
// import Signup from '../Screens/Signup/Signup';
//import SignupPopup from '../Screens/SignupPopup/SignupPopup';
import EmailVerifyPopup from '../Utils/Popup/emailVerifyPopup';
import * as navigate from "./RouteConstent";
import * as Screens from "../Screens";
import FaqList from '../Screens/Ask_A_Nurse/FaqList';
import { io } from "socket.io-client"
import { PrivateRoute } from './PrivateRoute';

const CONNECTION_PORT = "https://dev.nurturebynaps.com:3000/";
let socket: any;

const Routing = () => {
  const { pathname } = useLocation();

  socket = io(CONNECTION_PORT)
  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)

  useEffect(() => {
    let user = {
      user_id: userID?.id,
      user_name: userID?.user_name,
      user_photo: userID?.user_photo,
      type: userID?.type
    }
    if (userID && !socket.connected) socket.emit("join", user);
    socket.on("askANurseQuestionReply", (data: any) => {
      try{
        // debugger
      }catch(err){
        console.log(err)
      }
    })

    return () => {
      if (userID) socket.off("join");
    }
  }, [socket])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div>
      <Routes>
        {/* <Route path={navigate.HOME} element={<PrivateRoute Component={<Screens.Home />} />} /> */}
        <Route path={navigate.HOME} element={<PrivateRoute Component={<Screens.Home />} /> } />
        <Route path={navigate.LOGIN} element={<Screens.Login />} />
        <Route path={navigate.SIGNUPPOPUP} element={<Screens.SignupPopup />} />
        {/* <Route path={navigate.LOGINPOPUP} element={<LoginPopup />} /> */}
        <Route path={navigate.MEMBERSHIP} element={<PrivateRoute Component={<Screens.Membership/>} /> } />
        <Route path={navigate.SIGNUP} element={<Screens.Signup />} />
        <Route path={navigate.FORGOTPASSWORD} element={<Screens.ForgotPassword />} />
        <Route path={navigate.VERIFYEMAIL} element={<Screens.EmailVerify />} />
        <Route path={navigate.CHECKMAIL} element={<Screens.SendEmail />} />
        <Route path={navigate.SETPASSWORD} element={<Screens.SetNewPassword />} />
        <Route path={navigate.VERIFYEMAILPOPUP} element={<EmailVerifyPopup />} />
        <Route path={navigate.COURSE} element={<PrivateRoute Component={<Screens.Courses/>} />} />
        <Route path={navigate.COURSEDETAILS + ":id"} element={<Screens.CourseDetails />} />
        <Route path={navigate.BUYCOURSEDETAIL} element={<Screens.PaymentDetail />} />
        <Route path={navigate.BUYCOURSE} element={<Screens.BuyCourse />} />
        <Route path={navigate.ASKANURSE} element={<PrivateRoute Component={<Screens.Ask_A_Nurse socket={socket} />} />} />
        <Route path={navigate.FAQLIST + ":id"} element={<FaqList socket={socket} />} />
        <Route path={navigate.INSTRUCTOR + ":id"} element={<Screens.Instructor />} />
        <Route path={navigate.NURSECHAT} element={<Screens.NurseChat socket={socket} />} />
        <Route path={navigate.EVENTS} element={<PrivateRoute Component={<Screens.Events />}/>} />
        <Route path={navigate.EVENTSDETAIL + ":id"} element={<Screens.EventsDetails />} />
        <Route path={navigate.LIVEEVENT} element={<Screens.LIVEEVENT />} />
        <Route path={navigate.COURSEVIEW + ":id"} element={<Screens.CourseView />} />
        <Route path={navigate.MEMBERCHAT} element={<Screens.MemberChat />} />
        <Route path={navigate.CONSULTS} element={<Screens.Consult />} />
        <Route path={navigate.NONMEMBER} element={<Screens.PostLogin />} />
        <Route path={navigate.MEMBER} element={<Screens.Member />} />
        {/* <Route path={navigate.CONSULTSTEMP} element={<Screens.ConsultLanding />} /> */}
        <Route path={navigate.CONSULTSTEMP2} element={<Screens.ConsultLanding2 />} />
        <Route path={navigate.NURSECONSULTS} element={<Screens.NurseConsult />} />
        <Route path={navigate.ILACATATIONCONSULTS} element={<Screens.LactationConsult />} />
        <Route path={navigate.DATECONSULTS} element={<Screens.DateConsult />} />
        <Route path={navigate.MULTIPLECLASS} element={<Screens.MultipleClassStep />} />
        <Route path={navigate.VIRTUALCLASSCONSULTS} element={<Screens.VirtualClassConsult />} />
        <Route path={navigate.PRIVATECLASS} element={<Screens.PrivateClassForm />} />
        <Route path={navigate.PRIVATECLASS2} element={<Screens.PrivateClassForm2 />} />
        <Route path={navigate.PREBABYBOOTCAMP} element={<Screens.PrebabyConsult />} />
        <Route path={navigate.PREBABYBOOTCAMP} element={<Screens.PrebabyConsult />} />
        <Route path={navigate.PRIVATESLEEPCONSULT} element={<Screens.StepsForPrivateSleep />} />
        <Route path={navigate.GIFTCARD} element={<PrivateRoute Component={<Screens.GiftCard/>}  />} />
        <Route path={navigate.GIFTCARDPURCHASE} element={<Screens.GiftCardPayment />} />
        <Route path={navigate.PROFILEUSER} element={<Screens.ProfileUser />} />
        <Route path={navigate.EDITPROFILE} element={<Screens.EditProfile />} />
        <Route path={navigate.LIVEWEBINAR} element={<Screens.LiveWebinars />} />
        <Route path={navigate.PODCASTQUESTION} element={<Screens.PodcastQuestion />} />
        <Route path={navigate.SPONSORSHIP} element={<Screens.Sponsorships />} />
      </Routes>
    </div>
  )
}
export default Routing


