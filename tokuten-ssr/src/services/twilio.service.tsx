import { Client } from 'twilio-chat';
import { getItemLocalStorage } from '../utils/Utils';
import httpService from "./http.service";
import axios from 'axios';
import _clone from 'lodash/clone'
import _escapeRegExp from 'lodash/escapeRegExp'
import _uniqBy from 'lodash/uniqBy';
import { Chip } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
var thumbsup = <Chip />;

import React from 'react';

export class TwilioService {
  static serviceInstance: any;
  static chatClient: any;

  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  async getChatClient(twilioToken: any) {
    if (!TwilioService.chatClient && !twilioToken) {
      throw new Error('Twilio token is null or undefined');
    }
    if (!TwilioService.chatClient && twilioToken) {
      return Client.create(twilioToken).then((client: any) => {
        console.log('Chat client --> ', client);
        TwilioService.chatClient = client;
        return TwilioService.chatClient;
      });
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  async getChatClientForInvitedMember(twilioToken: any) {
    const client = await Client.create(twilioToken);
    return Promise.resolve().then(() => client);
  }

  clientShutdown() {
    TwilioService.chatClient?.shutdown();
    TwilioService.chatClient = null;
  }

  addTokenListener(getToken: any) {
    if (!TwilioService.chatClient) {
      throw new Error('Twilio client is null or undefined');
    }
    TwilioService.chatClient.on('tokenAboutToExpire', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });

    TwilioService.chatClient.on('tokenExpired', () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });
    return TwilioService.chatClient;
  }

  parseChannels(channels: any) {
    return channels.map(this.parseChannel);
  }


  parseChannel(channel: any) {
    // let lastMessage: any;
    // if(channel.isPrivate) {
    //   channel.getMessages().then((messages: any) => {
    //     if(messages?.items.length > 0) {
    //       lastMessage = messages?.items[messages?.items.length - 1];
          
    //     }
    //   });
    // }

    return {
      isPrivate: channel.isPrivate,
      uniqueName: channel.uniqueName,
      id: channel.sid,
      friendlyName: channel.friendlyName,
      createdAt: channel.dateCreated,
      updatedAt: channel.dateUpdated,
      lastMessageTime: channel.lastMessage?.dateCreated ?? channel.dateUpdated ?? channel.dateCreated,
      // lastMessage: lastMessage?.body
    };
  }

  parseMessages(messages: any) {
    return messages.map(this.parseMessage).reverse();
  }

  parseMessage(message: any) {
    return {
      _id: message.sid,
      type: message.type,
      text: swapTags(message.body),
      // text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: message.author,
      },
      message_index: message.state.index,
      received: true,
      media: message.media
    };
  }

}

export const parseChannels = async(channels: any) => {
  let channelsList: any = [];
  for (const channel of channels) {
    channelsList.push(await parseChannel(channel));
  }
  return channelsList;
  // console.log('###########', channelsList);
}

export const parseChannel = async (channel: any) => {
  let userInfo: any = getItemLocalStorage('authData');
  userInfo = JSON.parse(userInfo);

  let lastMessage: any;
  if(channel.isPrivate) {
    const messages = await channel.getMessages();
    if(messages?.items.length > 0) {
      lastMessage = messages?.items[messages?.items.length - 1];
    }
  }
  
  let identity: string = getChatUserName(channel.uniqueName, userInfo.username);
  identity = identity.charAt(0).toUpperCase() + identity.slice(1);
  
  return {
    identity: identity.toLocaleLowerCase(),
    messageCount: 0,
    isPrivate: channel.isPrivate,
    uniqueName: channel.uniqueName,
    id: channel.sid,
    friendlyName: channel.friendlyName,
    createdAt: channel.dateCreated,
    updatedAt: channel.dateUpdated,
    lastMessageTime: channel.lastMessage?.dateCreated ?? channel.dateUpdated ?? channel.dateCreated,
    lastMessage: swapTags(lastMessage?.body)
  };
}

function foo(val: any) {
  return <div>{ val.split('$')[1] }</div>
  // return <Chip label={val} variant="outlined"/>
  // return React.createElement("Chip", { class: "https://www.meziantou.net" }, "meziantou");
}
 
export async function getUploadedMediaLink(media: any) {
  let imgURL: any = await media.getContentTemporaryUrl();
  return imgURL;
}

export function swapTags(text: any) {
  let displayText = _clone(text)
  const tags = text && text.match(/\{\{[^\}]+\}\}/gi) || [];
  tags.map((myTag: any) => {
    const tagData = myTag.slice(3, -2)
    const tagDataArray = tagData.split('||')
    let tagDisplayValue = tagDataArray[2]
    if(tagDisplayValue.charAt(0) === '$') {
      tagDisplayValue = tagDisplayValue.split('$')[1];
    }
    displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)
  });

  return displayText;
}

export const getChatUserName = (channel_name: string, current_user: string) => {
  return channel_name.replace(current_user, '').replace('_', '');
}

export const getNodeTwilioToken = (username: any) => axios.get(`http://localhost:8080/token?identity=${username}`).then((twilioUser) => twilioUser.data.jwt);

export const createGroup = (payload: any) => {
  return httpService.post("chat/channel/group/", payload);
}

export const fetchGroupList = () => {
  return httpService.get("chat/channel/group/");
}

export const getChannleList = (groupId: number) => {
  return httpService.get(`chat/channel/?channel_group=${groupId}`);
}

export const createChannel = (payload: any) => {
  return httpService.post("chat/channel/", payload);
}

export const retriveChannelUserList = () => {
  return httpService.get("auth/users/retrieve/");
}

export const addUserToChannel = (payload: any) => {
  return httpService.post("chat/group/subchannel/",payload);
}