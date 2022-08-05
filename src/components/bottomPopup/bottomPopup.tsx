import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import "./bottomPopup.css";
import { TierBenefits } from "../tierBenefitsPopup/tierBenefitsPopup";
import { CreateChannelNew } from "../../screens/chat/channel-create-new";
import { CreateGroupNew } from "../../screens/chat/group-create-new";
import { OfferUnlockPopup } from "../offerUnlockPopup/offerUnlockPopup";
import { OfferMediaPopup } from "../../screens/newList/offerMediaPopup";

const useStyles = makeStyles({
  list: {
    width: "auto"
  },
  fullList: {
    width: "auto"
  }
});

type Anchor = "top" | "left" | "bottom" | "right";

interface IProps {
  title?: string | boolean;
  back?: boolean;
  next?: any;
  enablenext?: any;
  enableback?: any;
  offerId?: number;
  hiddenFileInput?: any;
  handleFileChange?: any;
  fileUpload?: any;
  setShowEditor?: any;
}

const BottomPopup = ({
  isToggleSidebar,
  setIsToggleSidebar,
  id,
  showInnerContent,
  friendlyName,
  groupInfo,
  updateGroupList,
  updateChannelList,
  offerId,
  hiddenFileInput,
  handleFileChange,
  fileUpload,
  setShowEditor,
}: any) => {
  const classes = useStyles();

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsToggleSidebar(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(true)}>

      {showInnerContent === "create channel" &&
        <CreateChannelNew friendlyName={friendlyName} groupInfo={groupInfo} updateChannelList={updateChannelList} />}
      {showInnerContent === "create group" && <CreateGroupNew updateGroupList={updateGroupList} />}
      {showInnerContent === "show tier" && <TierBenefits id={id} />}
      {showInnerContent === "offerUnlock" && <OfferUnlockPopup offerId={offerId} />}
      {
        showInnerContent === "offer-media-popup" &&
        <OfferMediaPopup
          hiddenFileInput={hiddenFileInput}
          handleFileChange={handleFileChange}
          fileUpload={fileUpload}
          setShowEditor={setShowEditor}
        />
      }


      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <Drawer
      anchor={"bottom"}
      open={isToggleSidebar}
      onClose={toggleDrawer(false)}
      className="MuiDrawer-paper-bottom-bar"
    >
      {list()}
    </Drawer>
  );
};

export default BottomPopup;
