import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from "react-redux";
import { getItemLocalStorage } from "../../utils/Utils";
import DashboardHeader from "../mHeader/mHeader";
import { useGlobalContext, MyGlobalContext } from "./app-context";
import {
  getNodeTwilioToken,
  TwilioService
} from "../../services/twilio.service";
import * as twilioService from "../../services/twilio.service";
import { makeStyles } from "@material-ui/core/styles";
import { getToken } from "../../services/auth.service";
import { ChannelChatList } from "./channel-list";
import { ChatRoom } from "./chat-room";
import { UserChatList } from "./user-list";
import BottomPopup from "../../components/bottomPopup/bottomPopup";
import { CreateChannelPopup } from "./create-channel-popup";
import { FanGroup } from "../loyality/fanGroup/fanGroup";
import GroupList from "../loyality/fanGroup/groupList";
/*new */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import Logo from "../../assets/images/chat/logo_icon.png";
import Logo from "../../assets/images/new_landing/header-logo.png";
import Plus from "../../assets/images/chat/plus.png";
import Direct from "../../assets/images/chat/direct.png";
import "./chat-dashboard.scss";
import Iconplus from "../../assets/images/chat/icon_plus.png";
import { SearchUsersPopup } from "./search-users";
import Arrow from "../../assets/images/mobileimages/blackarrow.svg";
import LoadingOverlay from 'react-loading-overlay';
import Card from '@material-ui/core/Card';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import _orderBy from 'lodash/orderBy'

interface IProps { }

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const useStylesCard = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  userDm: {
    boxShadow: '0px 13px 10px -15px #111'
  }
}));

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export const ChatDashBoard = () => {
  const cardClasses = useStylesCard();
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);
  const [isChatSidebar, setIsChatSidebar] = React.useState(true);
  const history = useHistory();
  const [openChannelModal, setOpenChannelModal] = React.useState(false);
  let [groupList, setGroupList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [privateChannelList, setPrivateChannelList] = useState<any>();
  const [userList, setUserList] = useState<any>();
  const [channels, updateChannels] = useState<any>();
  const channelPaginator = useRef();
  const [activeGroupId, setActiveGroupId] = useState<number>();
  const [rightSideTitle, setRightSideTitle] = useState<string>("DMs");
  const [isDMs, setIsDMs] = useState<boolean>(true);

  let userInfo: any = getItemLocalStorage('authData');
  userInfo = JSON.parse(userInfo);
  const username = userInfo?.username;

  const getNewChannel = useCallback(
    client =>
      client.on("channelAdded", (ch: any) => {
        console.log("Channel added: " + ch);
      }),
    []
  );

  const getSubscribedChannels = useCallback(
    client =>
      client.getSubscribedChannels().then(async (paginator: any) => {
        channelPaginator.current = paginator;
        const usersListData: any = await twilioService.retriveChannelUserList();
        setUserList(usersListData);
        const allChannels: any = await twilioService.parseChannels(
          paginator.items
        );
        const userPrivateChannelList = allChannels.filter(
          (channel: any) => channel.isPrivate
        );
        userPrivateChannelList.forEach((item: any) => {
          const userObj = usersListData.data.find((user: any) =>
            user?.username?.toLocaleLowerCase() === item?.identity
          );
          if (userObj) {
            item["avatar"] = userObj.profile_thumbnail;
          }
        });
        
        setPrivateChannelList(userPrivateChannelList);
        history.push(`${url}/users`)
        setLoading(false);
        // updateChannels(allChannels);
      }),
    []
  );

  const setChannelEvents = useCallback(
    client => {
      client.on("messageAdded", async (message: any) => {
        if (message?.channel?.isPrivate) {
          setPrivateChannelList((prevChannels: any) =>
            prevChannels.map((channel: any) =>
              channel.id === message.channel.sid
                ? {
                  ...channel,
                  lastMessageTime: message.dateCreated,
                  lastMessage: message?.body,
                  messageCount: channel?.messageCount + 1
                }
                : channel
            )
          );
        }
      });

      client.on("tokenAboutToExpire", async () => {
        const token = await getToken(username);
        client.updateToken(token);
      });

      client.on("tokenExpired", async () => {
        const token = await getToken(username);
        client.updateToken(token);
      });

      return client;
    },
    [updateChannels]
  );

  const fetchTwilioToken = async () => {
    const token: any = await getToken(username);
    connectWithTwilio(token);
  };

  const connectWithTwilio = async (token: any) => {
    const chatClient: any = await TwilioService.getInstance().getChatClient(
      token
    );

    setChannelEvents(chatClient); /* Get new messages */
    getSubscribedChannels(chatClient); /* Get channel list */
    getNewChannel(chatClient);
    // Listen for new invitations to your Client
    chatClient.on("channelInvited", (channel: any) => {
      console.log("Invited to channel ", channel);
      getGroupList();
      // Join the channel that you were invited to
      channel.join();
    });
  };

  const getGroupList = () => {
    twilioService.fetchGroupList().then((res: any) => {
      setGroupList(res.data.data);
    });
  };

  const updateGroupList = (group: any) => {
    setGroupList([...groupList, group]);
    setIsToggleSidebar(false);
  };

  useEffect(() => {
    getGroupList(); /* Retrive group list */
  }, [setGroupList]);

  useEffect(() => {
    fetchTwilioToken();
    // return () => TwilioService.getInstance().clientShutdown();
  }, [false]);
  let { path, url } = useRouteMatch();

  const backArrowHandler = () => {
    setIsChatSidebar(true);
  }

  const hideChatSideBar = () => {
    setIsChatSidebar(false);
  }

  const handleDMs = () => {
    history.push(`${url}/users`);
    setRightSideTitle("DMs");
    setIsDMs(true);
  }

  const handleChannel = (item: any) => {
    history.push({
      pathname: `${url}/channel/list/${item?.id}`,
      state: { groupItem: item }
    });
    setRightSideTitle(item.group_name);
    setIsDMs(false)
  }

  return (
    <>
      <CreateChannelPopup
        userInfo={userInfo}
        title={"Add group"}
        openChannelModal={openChannelModal}
        setOpenChannelModal={setOpenChannelModal}
        updateGroupList={updateGroupList}
      />
      <BottomPopup
        isToggleSidebar={isToggleSidebar}
        setIsToggleSidebar={setIsToggleSidebar}
        showInnerContent={"create group"}
        updateGroupList={updateGroupList}
      />

      {/* <div className="mobilemaincontainer">
        <div className="mobile_container dash_tabs store_box chat_main_page">
          <DashboardHeader addIcon={true} setCreateChannelModal={setOpenChannelModal}/>
          <GroupsList groupList={groupList} />
          <UserChatList privateChannelList={privateChannelList} />
        </div>
      </div> */}

      <LoadingOverlay active={loading} spinner text='Loading your chat...'>

        <div className="mobilemaincontainer">
          <div className="mobile_container dash_tabs">
            <div className="chat_mob_box">
              {/* {
                isChatSidebar &&
                <div className="chat_box_head" style={{ zIndex: loading ? 0 : 999 }}>
                  <Row className="user_head_top ml-0 mt-2">
                    <Col className="pl-2" md={1} xs={1}>
                      <img src={Arrow} alt="img" className="cursor_common" onClick={() => history.push("/")} />
                    </Col>
                    <Col className="direct-msg pl-2" md={9} xs={9}>
                      <h2>DMs</h2>
                    </Col>
                    <Col className="pl-2 mr-0" md={2} xs={2}>

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
                      />
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
              } */}
              <Row>
                {
                  isChatSidebar &&
                  <Col md={2} xs={2} >
                    <div className="chat_sidebar available-items">
                      <List component="nav" aria-label="main mailbox folders">
                        <ListItem button className="mb-2">
                          <ListItemIcon>
                            <img
                              src={Logo}
                              alt="img"
                              onClick={() => history.push('/dashboard')}
                            />
                          </ListItemIcon>
                        </ListItem>

                        <ListItem button className="mb-2">
                          <ListItemIcon>
                            <img
                              src={Plus}
                              alt="img"
                              onClick={() => setIsToggleSidebar(true)}
                            />
                          </ListItemIcon>
                        </ListItem>

                        <ListItem
                          style={{ borderLeft: `${!activeGroupId ? "3px solid #2d9cdb" : "3px solid #fff"}`, paddingLeft: `${!activeGroupId && "13px"}` }}
                          button
                          className="mb-2"
                          onClick={handleDMs}
                        >
                          <ListItemIcon>
                            <img src={Direct} alt="img" />
                          </ListItemIcon>
                        </ListItem>
                        {groupList.map((item: any) => {
                          return (
                            <ListItem
                              style={{ borderLeft: `${item.id === activeGroupId ? "3px solid #2d9cdb" : "3px solid #fff"}`, paddingLeft: "12px" }}
                              button
                              className="mb-2"
                              onClick={() => handleChannel(item)}
                              key={item.id}>
                              <p className="chat_icon_name">
                                <span className="chat_icon_blue">
                                  {item?.group_name.charAt(0)}
                                </span>
                              </p>
                            </ListItem>
                          );
                        })}
                      </List>
                    </div>
                  </Col>
                }

                <Col md={isChatSidebar ? 10 : 12} xs={isChatSidebar ? 10 : 12}
                  className={isChatSidebar ? 'column-right' : ''}>
                  <div className="chat_box_right">
                    <Switch>
                      <Card
                        elevation={10}>
                        {
                          isChatSidebar &&
                          <div className={`chat_box_head user_chat ${cardClasses.userDm}`}>
                            <Row>
                              <Col md={isDMs ? 10 : 12} xs={isDMs ? 10 : 12} >
                                <h2 className={` ${isDMs && "direct-message"} chat_border`} >{rightSideTitle}</h2>
                              </Col>
                              {
                                isDMs &&
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
                              }
                            </Row>
                          </div>
                        }

                        <Route exact path={`${path}/channel/list/:groupId`}>
                          <ChannelChatList setActiveGroupId={setActiveGroupId} />
                        </Route>
                        <Route exact path={`${path}/users`}>
                          <UserChatList privateChannelList={privateChannelList} hideSideBar={hideChatSideBar} />
                        </Route>
                      </Card>
                    </Switch>

                    <Switch>

                      <Route exact path={`${path}/invite`}>
                        <FanGroup backArrowHandler={backArrowHandler} hideChatSideBar={hideChatSideBar} />
                      </Route>

                      <Route exact path={`${path}/channel/room/:channelSid`}>
                        <ChatRoom backArrowHandler={backArrowHandler}
                          hideChatSideBar={hideChatSideBar}
                          usersList={userList}
                        />
                      </Route>
                      <Route exact path={`${path}/invite/user`}>
                        <GroupList backArrowHandler={backArrowHandler} hideChatSideBar={hideChatSideBar} />
                      </Route>
                    </Switch>

                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
};
