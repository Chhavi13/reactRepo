import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import { useHistory, useLocation } from 'react-router-dom';
import { getItemLocalStorage } from '../../../utils/Utils';
import { Header } from '../../../components/header/header';
import Divider from '@material-ui/core/Divider';
import { getFanList } from '../../../services/offer.service';
import { remove, find, lowerCase } from 'lodash';
import "./groupList.scss";
import { getToken } from "../../../services/auth.service";
import { TwilioService } from '../../../services/twilio.service';
import * as twilioService from "../../../services/twilio.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 380,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const GroupList = ({ backArrowHandler, hideChatSideBar }: any) => {
  const history = useHistory();
  const classes = useStyles();
  const location: any = useLocation();
  console.log("location state", location);
  const [data, setData] = React.useState([]);
  let [channelMembersList, setChannelMembersList] = React.useState<any>(location?.state?.channelMembersList);
  const onPageBack = () => {
    history.goBack()
  }

  let currentUser: any = getItemLocalStorage('authData');
  currentUser = JSON.parse(currentUser);

  const getListData = async () => {
    let response: any = await getFanList(location.state.id);
    remove(response?.data, (user: any) => user.username === currentUser.username);
    // console.log('channelMembersList ----->> ', location?.state?.channelMembersList);
    response?.data.map((item: any) => {
      if (find(channelMembersList, (member: any) =>
        member?.identity?.toLocaleLowerCase() === item?.username?.toLocaleLowerCase())) {
        item.isAdded = true;
      }
      return item;
    });
    console.log('Channel users', response?.data);
    setData(response?.data);
  }

  useEffect(() => {
    location.state && getListData()
  }, [location?.state?.id])

  useEffect(() => {
    hideChatSideBar && hideChatSideBar();
    return () => {
      backArrowHandler && backArrowHandler();
    }
  }, []);

  const inviteNewMember = async (invite_to: string) => {
    
  }

  const onCreateOrJoin = async(invite_by: string, invite_to: string) => {
    const channelUniqeName: string = `${invite_by}_${invite_to}`;
    console.log(channelUniqeName);

    const token: any = await getToken(invite_to);
    const chatClient: any = await TwilioService.getInstance().getChatClientForInvitedMember(
      token
    );
    chatClient.on("channelInvited",(channel: any) => {
      console.log("Invited to channel ", channel);
      // const newChannel = await twilioService.parseChannel(channel);
      // const updateMemberList = [...channelMembersList, newChannel];
      // setChannelMembersList(updateMemberList);
      // getListData();
      channel.join();
    });

    TwilioService.getInstance().getChatClient()
      .then((client: any) => client.getChannelByUniqueName(channelUniqeName)
        .then((channel: any) => {
          alert('This channel name is already exits');
          // (channel.channelState.status !== 'joined' ? channel.join() : channel)
        }).catch(() => {
          client.createChannel({ uniqueName: channelUniqeName, friendlyName: 'Private chat', isPrivate: true })
            .then((channel: any) => {
              channel.join();

              channel.invite(invite_to).then(() => {
                alert(`${invite_to} has been invited!`);
              });
              // inviteNewMember(invite_to);
            })
        }),
      )
      .catch((err: any) => alert(err.message + 'danger'))
      .finally(() => {
        // props.setCreateChannelModal(false);
        console.log('done');
        getListData();
      });
  };

  const addMemberInChannel = (item: any) => {
    const { isPrivate } = location?.state;
    if (isPrivate) {
      /* Create channel for 1 to 1 chat */
      onCreateOrJoin(currentUser.username, item.username);
    }
    // else {
    //   /* Add member in channel */
    //   try {
    //     const payload: any = {
    //       channel_sid: props.selectedChannelData.id,
    //       invited_by: currentUser?.id,
    //       invited_to: user.id,
    //       channel_group: props.group_id
    //     };
    //     await twilioService.addUserToChannel(payload);
    //     props.setCreateChannelModal(false);
    //     props.inviteMemberToChannel(user.username);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container tier_box_third bg_overflow pb-5">
        <Header title={location?.state?.group ? `${location.state.group} ${location.state.name}` : location.state.name} back={true} enableback={onPageBack} />
        <List className={classes.root}>
          {data && data?.map((item: any, key: any) => (
            <div key={key}>
              <ListItem className="list_tier_loyal">
                <ListItemAvatar>
                  <Avatar alt={item?.username} src={item?.profile_image} />
                </ListItemAvatar>
                <ListItemText primary={item?.first_name} secondary={item?.username} />
                {
                  location?.state?.isChat &&
                  (item?.isAdded ? <span>Invited</span> :
                    <AddBoxOutlinedIcon onClick={() => { addMemberInChannel(item) }} />)
                }

                {
                  !location?.state?.isChat && <>
                    <SmsOutlinedIcon className="group-list-icon" />
                    <DeleteOutlineOutlinedIcon className="group-list-icon ml-3" />
                  </>
                }

              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  )
}

export default GroupList
