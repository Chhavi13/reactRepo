import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as twilioService from "../../services/twilio.service";
import { TwilioService } from "../../services/twilio.service";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getItemLocalStorage } from "../../utils/Utils";
import { Header } from "../../components/header/header";
import { CreateChannelPopup } from "./create-channel-popup";
import Iconplus from "../../assets/images/chat/icon_plus.png";
import Right from "../../assets/images/mobileimages/chevron-right.svg";
import BottomPopup from "../../components/bottomPopup/bottomPopup";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export const ChannelChatList = () => {
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);
  const location: any = useLocation();
  const { groupItem } = location.state;
  const [openChannelModal, setOpenChannelModal] = useState<boolean>(false);
  const history = useHistory();
  const param = useParams();
  const classes = useStyles();
  const [channels, setChannels] = useState<any>();

  let userInfo: any = getItemLocalStorage("authData");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userInfo = JSON.parse(userInfo);

  const filterChannelByGroupName = (filterChannels: any) => {
    return filterChannels.filter(
      (channel: any) => channel.friendlyName === groupItem?.unique_name
    );
  };

  useEffect(() => {
    TwilioService.chatClient.on("channelAdded", (ch: any) => {
      const newChannels: any = TwilioService.getInstance().parseChannels([ch]);
      const filterChannelByGroup = filterChannelByGroupName(newChannels);
      // setChannels((pre: any) => [...pre, ...filterChannelByGroup]);
      console.log("## Update channel list ##", filterChannelByGroup);
    });

    TwilioService.chatClient.on("channelInvited", (channel: any) => {
      console.log("Invited to channel ", channel);
      fetchCreatedChannelList();
      // Join the channel that you were invited to
    });

    fetchCreatedChannelList();
  }, [param]);

  const fetchCreatedChannelList = () => {
    TwilioService.chatClient.getSubscribedChannels().then((paginator: any) => {
      const newChannels: any = TwilioService.getInstance().parseChannels(
        paginator.items
      );
      const filterChannelByGroup = filterChannelByGroupName(newChannels);
      console.log("Channels list -> ", newChannels);
      // setChannels(filterChannelByGroup);
    });

    twilioService.getChannleList(groupItem.id).then((res: any) => {
      setChannels(res?.data);
    });
  };

  const updateChannelList = (channelData: any) => {
    setChannels([ ...channels, channelData]); /* Update channel list when add new channel */
    setIsToggleSidebar(false);
  };

  return (
    <>
      <div className="chat_box_head mt-2">
        <h2>{groupItem?.group_name}</h2>
      </div>

      <div className="chat_channel mt-5">
        <BottomPopup
          isToggleSidebar={isToggleSidebar}
          setIsToggleSidebar={setIsToggleSidebar}
          showInnerContent={"create channel"}
          friendlyName={groupItem?.unique_name}
          groupInfo={groupItem}
          updateChannelList={updateChannelList}
        />
        <Row className="row_width_auto">
          <Col md={10} xs={10}>
            <h3 className="common_main_head">Channels</h3>
          </Col>

          <Col md={2} xs={2} className="text-right">
            <img
              src={Iconplus}
              alt="img"
              className="cursor_common"
              onClick={() => setIsToggleSidebar(true)}
            />
          </Col>
        </Row>

        <List component="nav" aria-label="main mailbox folders">
          {channels &&
            channels.map((channel: any) => {
              return (
                <ListItem
                  button
                  key={channel.id}
                  onClick={() =>
                    history.push({
                      pathname: `/chat/channel/room/${channel.channel_sid}`,
                      state: {
                        selectedChannelData: channel,
                        group_id: groupItem?.id
                      }
                    })
                  }
                >
                  <Row>
                    <Col md={10} xs={10}>
                      <ListItemText primary={"# " + channel.channel_name} />
                    </Col>
                    <Col md={2} xs={2} className="text-right pr-0">
                      {/* <span className="number_notify">2</span> */}
                    </Col>
                  </Row>
                </ListItem>
              );
            })}
          {/* <ListItem button className="channel_active">
            <Row>
              <Col md={10} xs={10}>
                <ListItemText primary="#subscribers" />
              </Col>
              <Col md={2} xs={2} className="text-right pr-0">
                <span className="number_notify">2</span>
              </Col>
            </Row>
          </ListItem> */}
        </List>
      </div>
    </>

    // <div className="mobilemaincontainer">
    //   <div className="mobile_container dash_tabs store_box chat_main_page">

    //     <CreateChannelPopup
    //       updateChannelList={updateChannelList}
    //       userInfo={userInfo}
    //       title={'Create channel'}
    //       openChannelModal={openChannelModal}
    //       setOpenChannelModal={setOpenChannelModal}
    //       friendlyName={groupItem?.unique_name}
    //       groupInfo={groupItem}
    //     />

    //     <Header title="Channel list"
    //       back={true}
    //       enableback={() => { history.goBack() }}
    //       next={<AddCircleOutlineOutlinedIcon className="plus_icon" />}
    //       enablenext={() => { setOpenChannelModal(!openChannelModal) }}
    //     />

    //     <List component="nav" className={classes.root} aria-label="contacts">
    //       {
    //         channels && channels.map((channel: any) => {
    //           return (

    //             <ListItem button key={channel.id} onClick={() => history.push({
    //                   pathname: `/chat/room/${channel.channel_sid}`,
    //                   state: { selectedChannelData: channel, group_id: groupItem?.id }
    //                 })
    //               } >
    //               <span className="offer_list_left">#</span>
    //               <ListItemText className="list_name_text" primary={channel.channel_name} />
    //               <span className="offer_list_right"><img src={Right} alt="img" /></span>
    //             </ListItem>
    //           )
    //         })
    //       }
    //     </List >
    //   </div>
    // </div>
  );
};
