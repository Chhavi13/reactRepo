import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { SearchUsersPopup } from "./search-users";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import User from "../../assets/images/mobileimages/userlist.svg";
import * as twilioService from "../../services/twilio.service";
import { getItemLocalStorage } from "../../utils/Utils";
import Iconplus from "../../assets/images/chat/icon_plus.png";

interface IProps {}

export const UserChatList = ({ privateChannelList, hideSideBar }: any) => {
  const [isCreateChannelModal, setCreateChannelModal] = useState(false);
  const history = useHistory();
  let userInfo: any = getItemLocalStorage("authData");
  userInfo = JSON.parse(userInfo);

  console.log("privateChannelList from userList---->", privateChannelList);

  const openChatRoom = (user: any) => {
    hideSideBar();
    history.push({
      pathname: `/chat/channel/room/${user.id}`,
      state: { selectedChannelData: user, isPrivate: true }
    });
    
  }

  return (
    <>
      <div className="chat_box_head mt-2">
        <h2>Direct Messages</h2>
      </div>

      <div className="chat_channel mt-5">
        <div className="user-chat-list">
          <div className="user_head_top">
            <Row className="row_width_auto">
              <Col md={10} xs={10}>
                <h3 className="common_main_head">DMs</h3>
              </Col>

              <Col md={2} xs={2} className="text-right">
              <img
                  src={Iconplus}
                  alt="img"
                  onClick={ () => history.push({ pathname: '/chat/invite', state: {
                      isPrivate: true,
                      isChat: true,
                      channelMembersList: privateChannelList
                    }
                  }) }
                />
                {/* <img
                  src={Iconplus}
                  alt="img"
                  onClick={() => {
                    setCreateChannelModal(true);
                  }}
                /> */}

                {/* <AddCircleOutlineOutlinedIcon
                  className="icon_plus"
                  onClick={() => {
                    setCreateChannelModal(true);
                  }}
                  //onClick={() => history.push('/create/channel') }
                /> */}
                {privateChannelList && (
                  <SearchUsersPopup
                    channelMembersList={privateChannelList}
                    isPrivate={true}
                    isCreateChannelModal={isCreateChannelModal}
                    setCreateChannelModal={setCreateChannelModal}
                  />
                )}
              </Col>
            </Row>
          </div>

          <div className="user_main_content mt-4">
            {privateChannelList?.map((user: any, i: number) => (
              <div className="user_detail pl-0" key={i}>
                <Grid
                  container
                  // onClick={()=>{history.push(`/chat/room/${item.id}`)}}
                  onClick={() => openChatRoom(user) }
                >
                  <Grid item md={2} sm={2} xs={2}>
                    <div className="user_img">
                      <Avatar alt={user?.identity} src={user.avatar} />
                    </div>
                  </Grid>
                  <Grid item md={10} sm={10} xs={10} className="">
                    <div className="pl-3 content_right">
                      <div className="content_width_user">
                        <ListItemText
                          className="user_top_content"
                          secondary={user?.identity}
                        ></ListItemText>
                        <div className={`user_para ${!user?.lastMessage && "pt-3" }`}>
                          <ListItemText 
                            primary={user?.lastMessage}
                          ></ListItemText>
                        </div>
                      </div>

                      <div className="user_time">
                        <p>{moment(user.lastMessageTime).format("hh:mm A")}</p>
                        <span>{user?.messageCount} </span>
                      </div>
                    </div>
                  </Grid>

                  {/* <Grid item md={3} sm={3} xs={3} className="text-right">
                   
                  </Grid> */}
                </Grid>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
