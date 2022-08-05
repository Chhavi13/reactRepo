import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileSidebar from "../mSidebar/mSidebar";
import { NavLink } from "react-router-dom";
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
// import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import "./tabs.css";
import { useSelector } from 'react-redux'
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Avatar from "@material-ui/core/Avatar";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import BottomPopup from "../../components/bottomPopup/bottomPopup";

const TabIcon = ({setIsTogglePopup}: any) => {
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);
  // const [isTogglePopup, setIsTogglePopup] = React.useState(false);
  const [path, setPath] = useState<string>(window?.location?.pathname)
  const [userProfileImage, setUserProfileImage] = useState<any>();

  let profileDataRedux = useSelector((state: any) => {
    return state.authReducer?.personalData
  });

  useEffect(() => {
    profileDataRedux && setUserProfileImage(profileDataRedux?.data?.data?.profile_image)
  }, [setUserProfileImage, profileDataRedux]);

  return (
    <div>

      {/* <BottomPopup
        isToggleSidebar={isTogglePopup}
        setIsToggleSidebar={setIsTogglePopup}
        showInnerContent={'offer-media-popup'}
      /> */}

      <div className="footer_container">
        <Link to="/dashboard" className={path === '/dashboard' ? 'active-color' : 'inactive-color'}>
          {path === '/dashboard' ? <HomeRoundedIcon className="footer01-icon" /> : <HomeOutlinedIcon className="footer01-icon" />}
        </Link>
        <Link to="/notification" className={path === '/notification' ? 'active-color' : 'inactive-color'}>
          {path === '/notification' ? <NotificationsActiveRoundedIcon className="footer01-icon" /> : <NotificationsActiveOutlinedIcon className="footer01-icon" />}
        </Link>
        {/* <NavLink to="/notification" activeClassName="activeClass"> */}
          {/* <NotificationsActiveOutlinedIcon color="action" className="footer01-icon" /> */}
          {/* <p>
            <img src={images.footernotification} />
            <span>5</span>
          </p> */}
        {/* </NavLink> */}
        <Link to="/create/offer" className={path === '/create/offer' ? 'active-color' : 'inactive-color'}>
          {path === '/create/offer' && <span className="border_top_black" onClick={ () => setIsTogglePopup(true) }></span> }
          {path === '/create/offer' ? 
            <AddBoxRoundedIcon className="footer01-icon" onClick={ () => setIsTogglePopup(true) } /> 
             : <AddBoxOutlinedIcon className="footer01-icon" />
          }
        </Link>
        <NavLink to="/chat" activeClassName="activeClass">
          {path === '/chat' ? <QuestionAnswerIcon color="action" className="footer01-icon" /> : <ForumOutlinedIcon color="action" className="footer01-icon" />}
        </NavLink>

        <NavLink to="#" activeClassName="activeClass">
          <ListItemAvatar className={`tabs-user-pic ${path === '/user-profile' && "tabs-user-pic-active"} `} >
            <Avatar alt="Images" src={userProfileImage} onClick={() => setIsToggleSidebar(true)} />
          </ListItemAvatar>
        </NavLink>

      </div>
      <MobileSidebar
        isToggleSidebar={isToggleSidebar}
        setIsToggleSidebar={setIsToggleSidebar}
      />
    </div>
  );
};

export default TabIcon;