import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useHistory } from "react-router-dom";
import { SearchUsersPopup } from "./search-users";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import { getItemLocalStorage } from "../../utils/Utils";
import { makeStyles } from '@material-ui/core/styles';
import _orderBy from 'lodash/orderBy';

interface IProps { }

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  userDm: {
    boxShadow: '0px 13px 10px -15px #111'
  }
}));

export const UserChatList = ({ privateChannelList, hideSideBar }: any) => {
  const [isCreateChannelModal, setCreateChannelModal] = useState(false);
  const history = useHistory();
  let userInfo: any = getItemLocalStorage("authData");
  userInfo = JSON.parse(userInfo);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  privateChannelList = _orderBy(privateChannelList, ['lastMessageTime'], ['desc']);

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
      {/* <Card
        elevation={10}>
        <div className={`chat_box_head user_chat chat_border ${classes.userDm}`}>
          <Row>
            <Col md={10} xs={10}>
              <h2 className="pl-3 direct-message">DMs</h2>
            </Col>
            <Col className="pl-0" md={2} xs={2}>
              <AddBoxOutlinedIcon
                onClick={() => history.push({
                  pathname: '/chat/invite', state: {
                    isPrivate: true,
                    isChat: true,
                    channelMembersList: privateChannelList
                  }
                })}
              />
            </Col>
          </Row>
        </div> */}

        <div className="user-chat-list">
          {/* <div className="user_head_top">
            <Row className="row_width_auto">
              <Col md={10} xs={10}>
                <h3 className="common_main_head">DMs</h3>
              </Col>

              <Col md={2} xs={2} className="text-right">
                <img
                  src={Iconplus}
                  alt="img"
                  onClick={() => history.push({
                    pathname: '/chat/invite', state: {
                      isPrivate: true,
                      isChat: true,
                      channelMembersList: privateChannelList
                    }
                  })}
                /> */}
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
          {/* {privateChannelList && (
                  <SearchUsersPopup
                    channelMembersList={privateChannelList}
                    isPrivate={true}
                    isCreateChannelModal={isCreateChannelModal}
                    setCreateChannelModal={setCreateChannelModal}
                  />
                )}
              </Col>
            </Row>
          </div> */}

          <div className="user_main_content available-items">
            {privateChannelList?.map((user: any, i: number) => (
              <div className="user_detail" key={i}>
                <Grid
                  container
                  // onClick={()=>{history.push(`/chat/room/${item.id}`)}}
                  onClick={() => openChatRoom(user)}
                >
                  <Grid item md={2} sm={2} xs={2}>
                    <div className="user_img">
                      <Avatar alt={user?.identity} src={user.avatar} />
                    </div>
                  </Grid>
                  <Grid item md={10} sm={10} xs={10}>
                    <div className="pl-3 content_right">
                      <Grid item md={8} sm={8} xs={8} className="content_width_user">
                        {/* <div className="content_width_user"> */}
                        <ListItemText
                          className="user_top_content"
                          secondary={user?.identity}
                        ></ListItemText>
                        {/* <div className={`user_para ${!user?.lastMessage && "pt-3"}`}>
                          <ListItemText
                            className="user_lastMessage_content"
                            primary={user?.lastMessage}
                          ></ListItemText>
                        </div> */}
                        {/* </div> */}
                      </Grid>

                      <Grid item md={4} sm={4} xs={4} className="user_time">
                        <p>{moment(user.lastMessageTime).format("hh:mm A")}</p>
                        {/* { user?.messageCount > 0 && <span>{user?.messageCount} </span> } */}
                      </Grid>
                      <Grid item md={8} sm={8} xs={8} className="content_width_user">
                        <div className="content_right pt-1">
                          <div className={`user_para ${!user?.lastMessage && "pt-3"}`}>
                            <ListItemText
                              className="user_lastMessage_content"
                              primary={user?.lastMessage}
                            ></ListItemText>
                          </div>
                        </div>
                      </Grid>
                    </div>
                  </Grid>

                </Grid>
              </div>
            ))}
          </div>
        </div>
      {/* </Card> */}
    </>
  );
};
