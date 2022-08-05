import React, { useState, useEffect, useRef, useCallback } from "react";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AdbOutlinedIcon from '@material-ui/icons/AdbOutlined';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FileIcon, defaultStyles } from 'react-file-icon';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { getItemLocalStorage } from "../../utils/Utils";
import * as twilioService from "../../services/twilio.service";
import { TwilioService } from "../../services/twilio.service";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Arrow from "../../assets/images/mobileimages/blackarrow.svg";
import GroupAvatarsIcon from "../../components/AvatarGroup/avatarGroupIcon";
import moment from "moment";
import { debounce } from "lodash";
import * as offerService from "../../services/offer.service"
import { fetchUserList } from "../../services/offer.service";
import UserMentionsComponents from "../../components/userMentions/userMentions";
import { readFile } from '../../utils/CropImageUtils/upload';
import { Button, Chip, Popover, Typography } from "@material-ui/core";
import { ChatImageUploadModal } from "./image-upload-modal";
import { MetaDataCardDetails } from "../../components/metaCardDetails/metaCardDetails";
import { debug } from "webpack";
import BottomPopup from "./sticker";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  chatSection: {
    width: "100%",
    height: "100%",
    padding: '15px'
  },
  headBG: {
    backgroundColor: "#e0e0e0"
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0"
  }
});

let currentValue: string;
interface IProps { }

export const ChatRoom = ({ backArrowHandler, hideChatSideBar, usersList }: any) => {
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

  const mediaInputFile: any = useRef();
  const [imageUploadModalShow, setImageUploadModalShow] = useState<boolean>(false);
  const [imageBase64Value, setImageBase64Value] = useState<any>();
  const [imageFileFormat, setImageFileFormat] = useState<any>();
  const handleUploadClose = () => setImageUploadModalShow(false)
  const [isClearTextBox, setIsClearTextBox] = useState<boolean>(false);
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
  const [chatBoxHeight, setChatBoxHeight] = useState<number>()
  const [attachmentData, setAttachmentData] = useState<any>();
  const [isToggleSidebar, setIsToggleSidebar] = useState<boolean>(false);

  useEffect(() => {
    const messageBoxId: any = document.querySelector('#chat-box-textarea')
    const messageBoxHeight: number = messageBoxId.offsetHeight
    if (messageBoxHeight === 50) {
      setChatBoxHeight(160)
    } else if (messageBoxHeight === 62) {
      setChatBoxHeight(172)
    } else if (messageBoxHeight === 83) {
      setChatBoxHeight(192)
    }
    else if (messageBoxHeight === 100) {
      setChatBoxHeight(210)
    }
    if (text === "") {
      setChatBoxHeight(160)
    }
  }, [text])

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

  const filterMessagesData = async (chatHistory: any) => {
    for await (const item of chatHistory) {
      item.text = ((item?.text) && JSON.parse(item.text))
      if (item?.type === 'media') {
        const link: any = await twilioService.getUploadedMediaLink(item.media);
        console.log(item.media);
        const media = {
          link: link,
          type: item.media.state.contentType.includes('image') ? 'image' : 'doc',
          filename: item?.media?.state?.filename,
          extension: item?.media?.state?.filename ? item?.media?.state?.filename.split('.')[1] : 'doc'
        };
        item['media_data'] = media;

        // item['image_link'] = await twilioService.getUploadedMediaLink(item.media);
        // item['media_type'] = item.media.state.contentType.includes('image') ? 'image' : 'doc';
      }
      const userObj = usersList.data.find((user: any) =>
        (user?.username?.toLocaleLowerCase() === (item?.user?.name.toLocaleLowerCase() || item?.identity?.toLocaleLowerCase()))
      );

      if (userObj) {
        item['avatar'] = userObj.profile_thumbnail;
      } else {
        item['avatar'] = userInfo.profile_pic;
      }
    }

    return chatHistory;
  }

  const getChannelMessageHistory = async (client: any) => {
    client.getChannelBySid(channelSid).then(async (myChannel: any) => {
      channelAdmin.current = myChannel.createdBy.toLocaleLowerCase();
      console.log("channel admin ----->", channelAdmin.current);
      const count: any = await myChannel.getMembersCount();
      let members: any = await myChannel.getMembers();
      members = await filterMessagesData(members);
      setChannelMembersList(members);
      setLoading(true);
      setMemberCount(count);
      // you can now set event listeners on this channel object directly.
      // no need to call join() on it since, our server side code has already added the members(which means they've joined it)
      //to receive the messages of this channel, set an event listener on the channel
      myChannel.on('messageAdded', async (message: any) => {
        const newMessage = TwilioService.getInstance().parseMessage(message);
        newMessage.text = ((newMessage?.text) && JSON.parse(newMessage.text));

        if (newMessage?.type === 'media') {
          const link: any = await twilioService.getUploadedMediaLink(newMessage.media);
          const media = {
            link: link,
            type: newMessage.media.state.contentType.includes('image') ? 'image' : 'doc',
            filename: newMessage?.media?.state?.filename,
            extension: newMessage?.media?.state?.filename ? newMessage?.media?.state?.filename.split('.')[1] : 'doc'
          };
          newMessage['media_data'] = media;
        }

        if (messageIndex !== newMessage.message_index) {
          const userObj = usersList.data.find((user: any) =>
            user?.username?.toLocaleLowerCase() === newMessage?.user?.name.toLocaleLowerCase()
          );
          if (userObj) {
            newMessage['avatar'] = userObj.profile_thumbnail;
          }
          setMessageIndex(newMessage.message_index);
          setMessages((prevMessages: any) => {
            return [...prevMessages, newMessage];
          });
          setTimeout(() => { scrollToBottom() }, 0);
        }
      });

      const paginator: any = await myChannel.getMessages();

      // Invite another member to your channel
      // myChannel.invite('Test').then(function() {
      //   console.log('Your friend has been invited!');
      // });
      let chatHistory: any = TwilioService.getInstance().parseMessages(
        paginator.items.reverse()
      );

      chatHistory = await filterMessagesData(chatHistory);
      console.log('Chat history------>', chatHistory);
      setMessages(chatHistory);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
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
    hideChatSideBar();
    getChannelMessageByChannelId();
    return () => {
      backArrowHandler();
    }
  }, []);

  const scrollToBottom = () => {
    console.log("scrollIntoView", scrollDiv.current);
    scrollDiv.current &&
      scrollDiv.current.scrollIntoView({ behavior: "smooth" });
  };

  const onTextChange = (value: string) => {
    setText(value);
  };

  const getMetaDataFromLink = async (message: string) => {
    const newMessage: any = message?.split(' ');
    let url;
    for await (const iterator of newMessage) {
      try {
        url = new URL(iterator);
        return url.href;
      } catch (_) {
        // return false;
      }
    }
  }

  const onSendMessage = async () => {
    // setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const message: any = text?.trim();
    if (!message) return;
    const meta_data = { meta_tags: '', text_data: message };
    let metaDataURL: any = await getMetaDataFromLink(message);

    if (metaDataURL) {
      let response: any = await offerService.getMetaDataByLink(metaDataURL);
      if (response.success) {
        meta_data.meta_tags = response.data;
      }
    }

    if (message) chatClientChannel.current?.sendMessage(JSON.stringify(meta_data));
    setIsClearTextBox(true);
    setText('');
  };

  /* Page back */
  const pageGoBack = () => {
    history.goBack();
    backArrowHandler();
  }

  const onKeyPressHandler = (e: any) => {
    if (e.nativeEvent.data === '@' || e.nativeEvent.data === '$') {
      currentValue = e.nativeEvent.data;
    }
  }

  const [value, setValue] = useState();
  const handleChange = (event: any, newValue: any, newPlainTextValue: any, mentions: any) => {
    if (event.key === '@' || event.key === '$') currentValue = event.key;
    setValue(newValue);
    console.log('event', event);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchData = useCallback(
    debounce((query, cb) => {
      fetchData(query, cb);
    }, 500),
    []
  );

  const fetchData = async (query: any, callback: any) => {
    if (!query) return;
    const res = await fetchUserList(`${currentValue}${query}`);
    callback(res);
  }

  const getHtml = (text_data: any) => {
    const text: any = text_data.split(' ');
    let appendData: any = [];
    for (const iterator of text) {
      try {
        let url = new URL(iterator);
        let link: any = (<a style={{ textTransform: 'lowercase' }} href='javascript:void(0);' onClick={() => window.open(iterator)}>{iterator}</a>)
        appendData.push(link);
      } catch (_) {
        let temp: any = (<>{iterator}&nbsp;</>)
        appendData.push(temp)
      }
    }

    return (<>{appendData}</>);
  }

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let attachmentValues: any = {
        extension: file.name.split('.').pop(), 
        name:  file.type.includes('image') ? 'image' : 'doc'
      };
      setAttachmentData(attachmentValues);
      setImageFileFormat(file);
      if (file?.type?.includes('image')) {
        let imageDataUrl: any = await readFile(file);
        setImageBase64Value(imageDataUrl);
      }
      setImageUploadModalShow(true);
    }
  }

  const uploadChatImage = () => {
    const formData = new FormData();
    formData.append('file', imageFileFormat);
    chatClientChannel.current?.sendMessage(formData);
    handleUploadClose();
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event?: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 

  const openChatPopup = Boolean(anchorEl);
  const chatPopupId = openChatPopup ? 'simple-popover' : undefined;

  const chooseImageFile = () => {
    setAnchorEl(null);
    mediaInputFile.current.click();
  }

  const messageList = messages.map((msg: any) => {
    return (
      <ListItem key={msg._id}>
        <Grid container>
          <Grid item md={2} sm={2} xs={2}>
            <div className="user_img_chat mt-1">
              <img src={msg?.avatar} alt="img" className="user-avatar" />
            </div>
          </Grid>
          <Grid item md={10} sm={10} xs={10}>
            <div className="chat_head_user">
              <ListItemText
                className="chat_user_name mb-0"
                secondary={msg?.user?.name}
              ></ListItemText>
              <p className="chat_time">{moment(msg.createdAt).format("hh:mm:A")} </p>
            </div>
            <div className="msg_same msg_receive">
              {msg.type === 'media' &&
                <>
                  {msg.media_data.type === 'doc' &&
                    <div className="chat-doc-icon" >
                      <div onClick={() => window.open(msg.media_data.link)}>
                        <FileIcon extension={msg.media_data.extension} {...defaultStyles[msg.media_data.extension]} />
                      </div>
                    </div>
                  }
                  {msg.media_data.type === 'image' && <img src={msg.media_data.link} alt='img' width="100%" height="100%" />}
                </>
              }

              {msg.type === 'text' &&
                <>
                  {msg?.text?.meta_tags &&
                    <MetaDataCardDetails
                      image={msg?.text?.meta_tags?.image}
                      title={msg?.text.meta_tags?.title}
                      description={msg?.text.meta_tags?.description}
                      url={msg?.text.meta_tags?.url}
                    />
                  }

                  <ListItemText className="mt-0" style={{ whiteSpace: 'pre-line' }}
                    primary={
                      getHtml(msg?.text.text_data)
                    }>
                  </ListItemText>
                </>
              }
            </div>
          </Grid>
        </Grid>
      </ListItem>
    );
  });
const onSticker =() => {
  handleClose()
    setIsToggleSidebar(true)
  }

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

      <ChatImageUploadModal
        show={imageUploadModalShow}
        handleClose={handleUploadClose}
        base64String={imageBase64Value}
        uploadChatImage={uploadChatImage}
        attachmentData={attachmentData}
      />
  <BottomPopup
  isToggleSidebar={isToggleSidebar}
  setIsToggleSidebar={setIsToggleSidebar}
  />
      <Popover
        id={chatPopupId}
        open={openChatPopup}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{padding: '16px'}}>
          <Row>
            {/* <div className="attach-popup-icon">
              <NoteAddOutlinedIcon onClick={() => chooseDocFile() } />
            </div> */}
            <div className="attach-popup-icon">
              <PhotoLibraryOutlinedIcon onClick={() => chooseImageFile() } />
            </div>
            <div className="attach-popup-icon" onClick={()=>onSticker()}>
              <AdbOutlinedIcon/>
            </div>
          </Row>
        </div>
      </Popover>

      <div className="dash_tabs store_box chat_msg_box">
        <div className="general_header">
          <Row className="row_width_auto">
            <Col md={1} xs={1} className="text-left general_plus arrow_back padding_top_chat">
              <img src={Arrow} alt="img" className="cursor_common" onClick={() => pageGoBack()} />
            </Col>

            <Col md={11} xs={11}>
              <Row>
                <Col md={isPrivate ? 11 : 6} xs={isPrivate ? 11 : 6}>
                  <h3 className="head_general padding_top_chat text_ellipsis">
                    {
                      selectedChannelData?.channel_name ? `#${selectedChannelData?.channel_name}` :
                        twilioService.getChatUserName(selectedChannelData?.uniqueName, userInfo?.username)
                    }
                  </h3>
                </Col>

                {
                  !isPrivate &&
                  <>
                    <Col md={4} xs={4} className="pr-0 text-right">
                      <GroupAvatarsIcon className="user-group-icon" channelMembersList={channelMembersList} />
                    </Col>

                    <Col md={1} xs={1} className="text-right padding_top_chat_icon pl-0">
                      <AddBoxOutlinedIcon />
                    </Col>
                  </>
                }
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
          <Grid item xs={12} className="mt-5">
            {/* <List className={classes.messageArea}> */}
            <List style={{ maxHeight: `calc(100vh - ${chatBoxHeight}px)` }}>
              {messageList}
              <div className="scrollIntoView" ref={scrollDiv} />
            </List>

            <div className="chat_submit_msg">

              <Grid container style={{ padding: "0px" }}>
                <Grid item md={1} sm={1} xs={1} className="chat-room-icon">
                  <input
                    className='media-file-upload'
                    type="file"
                    id="file"
                    accept={'.xlsx, image/*,.xls, .doc, .docx,.ppt, .pptx,.txt, .pdf'}
                    ref={mediaInputFile}
                    onChange={onFileChange}
                  />
                  <AttachFileIcon onClick={handleClick}/>
                </Grid>
                <Grid item sm={10} md={10} xs={10} >
                  <UserMentionsComponents
                    placeholderText={'Write your message...'}
                    setMentionsCoreValue={setText}
                    clearTextBox={isClearTextBox}
                    setIsClearTextBox={setIsClearTextBox}
                    offerTitle={text}
                  />

                  {/* <OutlinedInput
                    fullWidth
                    id="chat-box-textarea"
                    value={text}
                    placeholder="write your message..."
                    multiline
                    maxRows={4}
                    onChange={(e: any) => onTextChange(e.target.value)}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     <Fab
                  //       color="primary"
                  //       className="send_icon_chat"
                  //       aria-label="add"
                  //       onClick={onSendMessage}
                  //     >
                  //       <SendIcon />
                  //     </Fab>
                  //   </InputAdornment>
                  // }
                  /> */}
                </Grid>
                <Grid item md={1} sm={1} xs={1} className="text-right chat-room-icon">
                  <Fab
                    color="primary"
                    className="send_icon_chat"
                    aria-label="add"
                    onClick={onSendMessage}
                  >
                    <SendIcon />
                  </Fab>
                </Grid>



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

    </>
  );
};
