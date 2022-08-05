import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import * as images from '../images';
import "./mSidebar.scss";

import { videoExtentionType, imgExtentionTypes } from '../editUserProfile/editUserProfile';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { logoutAction } from "../../redux/action/authActions/authActions";
import { useEffect } from "react";
import * as authService from "../../services/auth.service";
import { getUserProfileMediaAction } from '../../redux/action/authActions/authActions';
import { Private_MenusItems, Public_MenusItems } from "../../utils/menu/menu"
import { isLogin } from '../../utils/index'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import * as offer from "../../services/offer.service";
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import InsertInvitationRoundedIcon from '@material-ui/icons/InsertInvitationRounded';

class PhotosVM {
  position: number | undefined;
  src: any | undefined;
  type: string | undefined;
}

const useStyles = makeStyles({
  list: {
    width: 307
  },
  fullList: {
    width: "auto"
  }
});

const MobileSidebar = ({ isToggleSidebar, setIsToggleSidebar, isClasses = true }: any) => {

  const [userProfileData, setUserProfileData] = useState<any>({});
  let profileDataRedux = useSelector((state: any) => {
    return state.authReducer?.personalData
  })

  let mediaDataRedux = useSelector((state: any) => {
    return state.authReducer?.media?.data
  })

  const menuIcons = [
    { title: 'FaceOutlinedIcon', icon: <FaceOutlinedIcon /> },
    { title: 'BubbleChartOutlinedIcon', icon: <BubbleChartOutlinedIcon /> },
    { title: 'LinkOutlinedIcon', icon: <LinkOutlinedIcon /> },
    { title: 'SupervisedUserCircleOutlinedIcon', icon: <SupervisedUserCircleOutlinedIcon /> },
    { title: 'StoreRoundedIcon', icon: <StoreRoundedIcon /> },
    { title: 'AccessTimeOutlinedIcon', icon: <AccessTimeOutlinedIcon /> },
    { title: 'TouchAppOutlinedIcon', icon: <TouchAppOutlinedIcon /> },
    { title: 'RoomOutlinedIcon', icon: <RoomOutlinedIcon /> },
    { title: 'StoreOutlinedIcon', icon: <StoreOutlinedIcon /> },
    { title: 'InfoOutlinedIcon', icon: <InfoOutlinedIcon /> },
    { title: 'BusinessCenterOutlinedIcon', icon: <BusinessCenterOutlinedIcon /> },
    { title: 'CreditCardOutlinedIcon', icon: <CreditCardOutlinedIcon /> },
    { title: 'InsertInvitationRoundedIcon', icon: <InsertInvitationRoundedIcon /> },
  ]


  const history = useHistory()
  const classes = useStyles();
  let dispatch = useDispatch()

  let Logout = async () => {
    console.log('logout');
   await localStorage.removeItem("authData");
   await dispatch(logoutAction());
   history.push("/")
  }
  
  // let carouselPhotos: any = [];

  const [userPhotos, setUserPhotos] = useState<PhotosVM[]>([
    // { position: 1, src: '', type: '' },
    // { position: 2, src: '', type: '' },
    // { position: 3, src: '', type: '' },
    // { position: 4, src: '', type: '' }
  ]);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsToggleSidebar(open);
  };

  const userProfile = (link: any) => {
    toggleDrawer(false);
    history.push(link);
  }

  const getMediaData = (media: any) => {
    let data: any = [];
    if (media) {
      media.filter((item: any, i: number) => {
        const splitLink = item.file.split('.');
        const ext = splitLink[splitLink.length - 1];

        if (videoExtentionType.includes(ext)) {
          data.push({ src: item.file, type: 'video', position: i });
        } else if (imgExtentionTypes.includes(ext)) {
          data.push({ src: item.file, type: 'image', position: i });
        }
      });
    }
    if (data.length <= 4) {
      for (let index = 0; index < 4; index++) {
        const element = data[index];
        if (!element) {
          data.push({ src: '', type: '', position: index + 1 });
        }
      }
    }
    // const availablePhotos: any = data.filter((x: any) => (x.src && x.type === 'image'));
    // carouselPhotos = availablePhotos;
    setUserPhotos([...data]);
  }

  const getMedia = async () => {
    try {
      // const response: any = await authService.getUserProfileMedia();
      const response: any = await dispatch(getUserProfileMediaAction())
      // console.log('respo---->',response.payload.data)
      getMediaData(response.payload.data)

    } catch (err) {

    }
  }

  useEffect(() => {

    const getProfileU = async () => {
      try {

        const response: any = await authService.getProfile();
        const data = response.data.data;
        setUserProfileData({ ...data });

      } catch (err) {
        console.log(err)
      }
    }

    isLogin() && (profileDataRedux ? setUserProfileData({ ...profileDataRedux?.data?.data }) : getProfileU())
    isLogin() && (mediaDataRedux ? getMediaData(mediaDataRedux) : getMedia())

  }, [setUserProfileData, profileDataRedux]);
  // console.log('gyubjhb---->',mediaDataRedux)

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="mob-overflow">
        <div className="mobilemaincontainer">
          <div className="mobile_container">
            <div className="mobsidebarContainer">
              {/* <img src={profilebg} className="profilebgsign" /> */}

              {
                isLogin() &&
                <div className="">
                   {/* <CloseIcon onClick={toggleDrawer(false)}/> */}
                  {/*<img
                    src={userProfileData?.cover_image ? userProfileData?.cover_image : images.userbg}
                    className="profileheader_containerone"

                    onClick={toggleDrawer(true)}
                    alt=""
                  /> */}

                  <div className="profileimgmaincontainer">
                    <p className="imagesshow">
                      <img src={images.croseimg} alt="" onClick={toggleDrawer(false)} className="pointer" />

                    </p>
                  </div>
                </div>
              }
              <div className={`${isClasses ? 'sidebarprofilecontainer mobmarginscreen' : 'sidebarprofilecontainer'}`}>
                {
                  isLogin() &&
                  <div className="sabrinabrandcontainer2  border_bottomline"
                    onClick={toggleDrawer(true)}
                  >
                    <img
                      src={userProfileData?.profile_image ?
                        userProfileData?.profile_image : images.mobheader1}
                      className="sbrinaprofilereview" alt="" />
                    <p className="sbrinatext">
                      {userProfileData?.first_name} <img src={images.sbrinastarblanck} alt="" className="bigimgshow" />
                    </p>
                    {/* <p className="yoga_trainertext">{userProfileData?.company_bio}</p> */}
                    <p className="number_fans">
                      <span className="profileband">
                        <span className="numberfansspan">{userProfileData?.total_subscribers}</span>
                        subscriber
                      </span>
                      {/* <span>
                        <span className="numberfansspan">12</span>
                        brands
                      </span> */}
                    </p>
                  </div>
                }
                <div className="sidebarmenu" >
                  <ul className="sidebarmenuist">
                    {(isLogin() ? Private_MenusItems : Public_MenusItems)?.map((data: any, index: number) => (
                      <div key={index}>
                        <div className={`pointer `}>
                          <li className={`${isLogin() && (index === 2 || index === 6) && "socialreach_menu"}`} onClick={() => { userProfile(data.link) }}>
                            <span>
                              {menuIcons.map((item: any) => {
                                if (item.title === data.icon) {
                                  return item.icon
                                }
                              })
                              }

                            </span>
                            {data.title}
                          </li>
                          {isLogin() && index === 2 && <p className="menu-tag">Manage</p>}
                          {isLogin() && index === 6 && <p className="menu-tag">Settings</p>}
                        </div>
                        {index === 3 ? <div></div> : ''}
                      </div>
                    ))}
                  </ul>
                  {
                    isLogin() &&
                    <div className="logout_section">
                      <ul className="">
                        <li onClick={() => { Logout() }} className="pointer">
                          <span >
                            <img src={images.sidebarlogout} alt="" />
                          </span>
                          <p>
                            log out
                            <br />
                            <p className="logouttokuten">log out from tokuten</p>
                          </p>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Drawer
      className={`user-drawer-sidebar ${isClasses ? '' : 'MuiDrawer-paper-sidebar'}`}
      anchor={"right"}
      open={isToggleSidebar}
      onClose={toggleDrawer(false)}
    >
      {list()}
    </Drawer>
  );
};

export default MobileSidebar;
