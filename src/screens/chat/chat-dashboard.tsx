import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Spinner  from 'react-bootstrap/Spinner';
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
import Logo from "../../assets/images/chat/logo_icon.png";
import Plus from "../../assets/images/chat/plus.png";
import Direct from "../../assets/images/chat/direct.png";
import "./chat-dashboard.scss";

interface IProps { }

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export const ChatDashBoard: React.FC<IProps> = () => {
  const classes = useStyles();
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);
  const [isChatSidebar, setIsChatSidebar] = React.useState(true);
  const history = useHistory();
  const [openChannelModal, setOpenChannelModal] = React.useState(false);
  let [groupList, setGroupList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [privateChannelList, setPrivateChannelList] = useState<any>();
  // const { channels, updateChannels } = useGlobalContext();
  const [channels, updateChannels] = useState<any>();
  const channelPaginator = useRef();

  let userInfo: any = getItemLocalStorage("authData");
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
        const usersList: any = await twilioService.retriveChannelUserList();
        const allChannels: any = await twilioService.parseChannels(
          paginator.items
        );
        const userPrivateChannelList = allChannels.filter(
          (channel: any) => channel.isPrivate
        );
        userPrivateChannelList.forEach((item: any) => {
          const userObj = usersList.data.find((user: any) =>
              user?.username?.toLocaleLowerCase() === item?.identity
          );
          if (userObj) {
            item["avatar"] = userObj.profile_thumbnail;
          }
        });

        setPrivateChannelList(userPrivateChannelList);
        history.push(`${url}/users`)
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

      <div className="mobilemaincontainer">
        <div className="mobile_container dash_tabs store_box chat_main_page">
          <div className="chat_mob_box">
            <Row>
              {
                isChatSidebar && 
                <Col md={3} xs={3} className="border_chat pr-0">
                  <div className="chat_sidebar">
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
                        button
                        className="mb-2"
                        onClick={() => history.push(`${url}/users`)}
                      >
                        <ListItemIcon>
                          <img src={Direct} alt="img" />
                        </ListItemIcon>
                      </ListItem>
                      {groupList.map((item: any) => {
                        return (
                          <ListItem
                            button
                            className="mb-2"
                            onClick={() =>
                              history.push({
                                pathname: `${url}/channel/list/${item?.id}`,
                                state: { groupItem: item }
                              })
                            }
                            key={item.id}
                          >
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

              <Col md={isChatSidebar ? 9 : 12} xs={isChatSidebar ? 9 : 12} className={isChatSidebar ? 'pl-0' : ''}>
                <div className="chat_box_right">
                  <Switch>
                    <Route exact path={`${path}/channel/list/:groupId`}>
                      <ChannelChatList />
                    </Route>
                    <Route exact path={`${path}/channel/room/:channelSid`}>
                      <ChatRoom backArrowHandler={backArrowHandler} />
                    </Route>
                    <Route exact path={`${path}/users`}>
                      <UserChatList privateChannelList={privateChannelList} hideSideBar={hideChatSideBar} />
                    </Route>
                    <Route exact path={`${path}/invite`}>
                      <FanGroup />
                    </Route>
                    <Route exact path={`${path}/invite/user`}>
                      <GroupList />
                    </Route>
                  </Switch>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
