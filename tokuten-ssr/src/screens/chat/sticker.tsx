import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import "./bottomPopup.css";
// import { TierBenefits } from "../tierBenefitsPopup/tierBenefitsPopup";
import { CreateChannelNew } from "../../screens/chat/channel-create-new";
import { CreateGroupNew } from "../../screens/chat/group-create-new";
// import { OfferUnlockPopup } from "../offerUnlockPopup/offerUnlockPopup";
import { OfferMediaPopup } from "../../screens/newList/offerMediaPopup";
import "./sticker.scss";
import { ChatImageUploadModal } from "./image-upload-modal";

const useStyles = makeStyles({
  list: {
    width: "auto"
  },
  fullList: {
    width: "auto"
  }
});

const BottomPopup = ({
  isToggleSidebar,
  setIsToggleSidebar,
  
}: any) => {
  const classes = useStyles();
  const [show,setShow] = useState<boolean>(false)
  const [icon,setIcon] = useState<any>("")
  const [iconString,setIconString] = useState<any>()
  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsToggleSidebar(open);
  };
    const addIcon = (props:string) =>{
      let attachmentValues: any = {
        name:'image' 
      };
      setIconString(props)
      setShow(true)
      setIcon(attachmentValues)
      setIsToggleSidebar(false)
      
      
    }
  const list = () => (
        <div style={{ padding: 25}}>
          <img className="icon-img-sticker" onClick={()=>addIcon("https://cdn-icons-png.flaticon.com/512/4433/4433203.png")} src="https://cdn-icons-png.flaticon.com/512/4433/4433203.png" />
          <img className="icon-img-sticker" onClick={()=>addIcon("https://cdn-icons-png.flaticon.com/512/4433/4433188.png")} src="https://cdn-icons-png.flaticon.com/512/4433/4433188.png" />
          <img className="icon-img-sticker" onClick={()=>addIcon("https://cdn-icons-png.flaticon.com/512/4433/4433174.png")} src="https://cdn-icons-png.flaticon.com/512/4433/4433174.png" />
          <img className="icon-img-sticker" onClick={()=>addIcon("https://cdn-icons-png.flaticon.com/512/4433/4433175.png")} src="https://cdn-icons-png.flaticon.com/512/4433/4433175.png" />
          <img className="icon-img-sticker" onClick={()=>addIcon("https://cdn-icons-png.flaticon.com/512/4433/4433176.png")} src="https://cdn-icons-png.flaticon.com/512/4433/4433176.png" />
        </div>

    
  );

  return (
    <div>
      <ChatImageUploadModal
      show={show}
      handleClose={()=>setShow(false)}
      attachmentData={icon}
      base64String={iconString}

      />
    <Drawer
      anchor={"bottom"}
      open={isToggleSidebar}
      onClose={toggleDrawer(false)}
      className="MuiDrawer-paper-bottom-bar"
    >
      {list()}
    </Drawer>
    </div>
  );
};

export default BottomPopup;
