import React, { useState, useEffect, useRef } from "react";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useParams, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { getItemLocalStorage } from "../../utils/Utils";
import { SearchUsersPopup } from "./search-users";
import { Header } from "../../components/header/header";
import Chatuser from "../../assets/images/mobileimages/chat1.svg";
import * as twilioService from "../../services/twilio.service";
import { TwilioService } from "../../services/twilio.service";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Iconplus from "../../assets/images/chat/icon_plus.png";
import Arrow from "../../assets/images/mobileimages/blackarrow.svg";
import Group from "../../assets/images/mobileimages/groupdash.svg";
import GroupAvatarsIcon from "../../components/AvatarGroup/avatarGroupIcon";


const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  chatSection: {
    width: "100%",
    height: "100%"
  },
  headBG: {
    backgroundColor: "#e0e0e0"
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0"
  },
  messageArea: {
    maxHeight: "81vh",
    overflowY: "auto"
  }
});

interface IProps { }

export const ChatRoom = ({ backArrowHandler }: any) => {
  let params: any = useParams();
  const { channelSid } = params;
  const location: any = useLocation();
  const {
    selectedChannelData,
    group_id = "",
    isPrivate = false
  } = location.state;
  let userInfo: any = getItemLocalStorage("authData");
  userInfo = JSON.parse(userInfo);

  const [messages, setMessages] = useState<any>([]);
  const [channelMembersList, setChannelMembersList] = useState<any>([]);
  const [text, setText] = useState<string>();
  const [messageIndex, setMessageIndex] = useState<number>(-1);
  const scrollDiv: any = useRef();
  const [loading, setLoading] = useState<boolean>(false);
  const chatClientChannel: any = useRef();
  const channelAdmin: any = useRef();
  const history = useHistory();
  const classes = useStyles();
  const [isCreateChannelModal, setCreateChannelModal] = React.useState(false);
  const [memberCount, setMemberCount] = useState();

  // useEffect(() => {
  //   chatClientChannel.current && chatClientChannel.current.on('messageAdded', (message: any) => {
  //       console.log('$$$$$', message);
  //       const newMessage = TwilioService.getInstance().parseMessage(message);
  //       console.log('new' , newMessage);
  //   });
  // }, []);

  const setChannelEvents = (currentChannel: any) => {
    TwilioService.getInstance().on("messageAdded", (message: any) => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      console.log("new", newMessage);
      // setMessages((prevMessages: any) => {
      // //   if (prevMessages.some(({ _id }: any) => _id === giftedId)) {
      // //     return prevMessages.map((m: any) => (m._id === giftedId ? newMessage : m));
      // //   }
      //   return [newMessage, ...prevMessages];
      // });
    });
    // return chatClientChannel.current;
  };

  const getChannelMessageHistory = async (client: any) => {
    client.getChannelBySid(channelSid).then(async (myChannel: any) => {
      channelAdmin.current = myChannel.createdBy.toLocaleLowerCase();
      console.log("channel admin ----->", channelAdmin.current);
      const count: any = await myChannel.getMembersCount();
      const members: any = await myChannel.getMembers();
      setChannelMembersList(members);
      setLoading(true);
      setMemberCount(count);
      // you can now set event listeners on this channel object directly.
      // no need to call join() on it since, our server side code has already added the members(which means they've joined it)
      //to receive the messages of this channel, set an event listener on the channel
      myChannel.on("messageAdded", (message: any) => {
        const newMessage = TwilioService.getInstance().parseMessage(message);
        if (messageIndex !== newMessage.message_index) {
          setMessageIndex(newMessage.message_index);
          setMessages((prevMessages: any) => {
            return [...prevMessages, newMessage];
          });
          console.log("Messagge is received", message);
          scrollToBottom();
        }
      });

      const paginator: any = await myChannel.getMessages();
      console.log("Chat History", paginator.items);
      // Invite another member to your channel
      // myChannel.invite('Test').then(function() {
      //   console.log('Your friend has been invited!');
      // });
      const chatHistory: any = TwilioService.getInstance().parseMessages(
        paginator.items.reverse()
      );
      setMessages(chatHistory);
      scrollToBottom();
      chatClientChannel.current = myChannel;
    });

    // const currentChannel: any = await client.getChannelBySid(channelSid);
    // console.log('currentChannel', currentChannel);
    // // setChannelEvents(currentChannel);
    // const paginator: any = await currentChannel.getMessages();
    // chatClientChannel.current = currentChannel;
    // console.log('History', paginator.items);
    // const newMessages: any = TwilioService.getInstance().parseMessages(paginator.items.reverse());
    // setMessages(newMessages);
    // scrollToBottom()
  };

  const inviteMemberToChannel = (username: string) => {
    chatClientChannel.current?.invite(username).then(async () => {
      alert(`${username} has been invited!`);
      const count: any = await chatClientChannel.current.getMembersCount();
      const members: any = await chatClientChannel.current.getMembers();
      console.log(members);
      setMemberCount(count);
    });
  };

  const getChannelMessageByChannelId = async () => {
    const client: any = await TwilioService.getInstance().getChatClient();
    // console.log('client', client)
    getChannelMessageHistory(client);
  };

  useEffect(() => {
    getChannelMessageByChannelId();
  }, []);

  const scrollToBottom = () => {
    console.log("scrollIntoView", scrollDiv.current);
    scrollDiv.current &&
      scrollDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  const onTextChange = (value: string) => {
    setText(value);
  };

  const onSendMessage = () => {
    // setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    chatClientChannel.current?.sendMessage(text);
    setText("");
  };

  /* Page back */
  const pageGoBack = () => {
    history.goBack();
    backArrowHandler();
  }

  const messageList = messages.map((msg: any) => {
    return (
      <ListItem key={msg._id}>
        <Grid container>
          <Grid item md={2} sm={2} xs={2}>
            <div className="user_img_chat mt-1">
              <img src={Chatuser} alt="img" />
            </div>
          </Grid>
          <Grid item md={10} sm={10} xs={10} className="pl-3">
            <div className="chat_head_user">
              <ListItemText
                className="chat_user_name"
                secondary={msg?.user?.name}
              ></ListItemText>
              <p className="chat_time">4:20PM </p>
            </div>
            <div className="msg_same msg_receive">
              <ListItemText style={{ whiteSpace: 'pre-line' }} primary={msg.text}></ListItemText>
            </div>
          </Grid>
        </Grid>
      </ListItem>
    );
  });

  return (
    <>
      {/* {channelMembersList && loading && (
        <SearchUsersPopup
          group_id={group_id}
          selectedChannelData={selectedChannelData}
          channelMembersList={channelMembersList}
          isCreateChannelModal={isCreateChannelModal}
          setCreateChannelModal={setCreateChannelModal}
          inviteMemberToChannel={inviteMemberToChannel}
        />
      )} */}

      <div className="">
        <div className="dash_tabs store_box chat_msg_box">
          <div className="general_header">
            <Row className="row_width_auto">
              <Col md={1} xs={1} className="text-left general_plus arrow_back padding_top_chat">
                <img src={Arrow} alt="img" className="cursor_common" onClick={() => pageGoBack()} />
              </Col>

              <Col md={11} xs={11}>
                <Row>
                  <Col md={4} xs={4}>
                    <h3 className="head_general padding_top_chat">
                      {
                        selectedChannelData?.channel_name ?
                          `#${selectedChannelData?.channel_name}` : twilioService.getChatUserName(selectedChannelData?.uniqueName, userInfo?.username)
                      }
                    </h3>
                  </Col>


                  <Col md={6} xs={6} className="pr-0 text-right">
                    <GroupAvatarsIcon channelMembersList={channelMembersList} />
                  </Col>

                  <Col md={1} xs={1} className="text-right padding_top_chat_icon pl-0">
                    <AddBoxOutlinedIcon />
                  </Col>
                </Row>
              </Col>


              {/* {
                !selectedChannelData?.isPrivate && 
                <>
                  <Col md={5} xs={5}>
                    <div className="together_people">
                      <img src={Group} alt="Image" />
                      <span>{memberCount}</span>
                    </div>
                  </Col>

                  <Col md={1} xs={1} className="text-right pl-0 general_plus">
                    <img src={Iconplus} alt="Image" className="cursor_common" />
                  </Col>
                </>
              } */}
            </Row>
          </div>
          {/* <Header
            title={selectedChannelData?.channel_name ||
              twilioService.getChatUserName(selectedChannelData?.uniqueName, userInfo?.username)
            }
            back={true}
            enableback={() => { history.goBack() }}
            next={(!isPrivate && channelAdmin?.current === userInfo?.username?.toLocaleLowerCase()) ? 
                <AddCircleOutlineOutlinedIcon className="plus_icon" /> : ''
            }
            enablenext={() => { setCreateChannelModal(true) }}
            subtitle={(!isPrivate && memberCount) && `${memberCount} members`}
          /> */}

          <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12} className="mt-3">
              <List className={classes.messageArea}>
                {messageList}
                <div className="scrollIntoView" ref={scrollDiv} />
              </List>

              <div className="chat_submit_msg">

                <Grid container style={{ padding: "0px" }}>
                  <OutlinedInput
                    fullWidth
                    id="chat-box-textarea"
                    value={text}
                    placeholder="write your message..."
                    multiline
                    maxRows={4}
                    onChange={(e: any) => onTextChange(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Fab
                          color="primary"
                          className="send_icon_chat"
                          aria-label="add"
                          onClick={onSendMessage}
                        >
                          <SendIcon />
                        </Fab>
                      </InputAdornment>
                    }
                  />

                  {/* <Grid
                    item
                    md={10}
                    sm={10}
                    xs={10}
                    className="chat-room-message-box"
                  >
                    <TextField
                      id="standard-multiline-flexible"
                      label="write your message..."
                      multiline
                      maxRows={4}
                      onChange={(e: any) => onTextChange(e.target.value)}
                      value={text}
                    />
                  </Grid>
                  <Grid
                    md={2}
                    sm={2}
                    xs={2}
                    className="text-right chat-room-icon"
                  >
                    <Fab
                      color="primary"
                      className="send_icon_chat"
                      aria-label="add"
                      onClick={onSendMessage}
                    >
                      <SendIcon />
                    </Fab>
                  </Grid> */}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
