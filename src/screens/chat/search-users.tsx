import React, { useEffect, useState, ChangeEvent } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getItemLocalStorage } from '../../utils/Utils';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '../../assets/images/mobileimages/search.svg';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Plus from '../../assets/images/mobileimages/plus-circle.svg';
import * as twilioService from '../../services/twilio.service';
import { TwilioService } from '../../services/twilio.service';
import { remove, find, lowerCase } from 'lodash';

function MyVerticallyCenteredModal(props: any) {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchResults, setSearchResults] = useState<any>()
  const [usersList, setUsersList] = useState<any>();
  let currentUser: any = getItemLocalStorage('authData');
  currentUser = JSON.parse(currentUser);

  const getUsersList = async () => {
    const response: any = await twilioService.retriveChannelUserList();
    remove(response?.data, (user: any) => user.username === currentUser.username);
    response?.data.map((item: any) => {
      // console.log('props.channelMembersList', props.channelMembersList)
      if(find(props.channelMembersList, (member: any) => 
          member?.identity?.toLocaleLowerCase() === item?.username?.toLocaleLowerCase())) {
        item.isAdded = true;
      }
      return item;
    });
    console.log('Channel users', response?.data);
    setUsersList(response?.data);
  }

  useEffect(() => {
    getUsersList();
  }, []);

  const onCreateOrJoin = (invite_by: string, invite_to: string) => {
    const channelUniqeName: string =`${invite_by}_${invite_to}`;
    console.log(channelUniqeName);
    TwilioService.getInstance().getChatClient()
      .then((client: any) => client.getChannelByUniqueName(channelUniqeName)
          .then((channel: any) => {
            alert('This channel name is already exits');
            // (channel.channelState.status !== 'joined' ? channel.join() : channel)
          }).catch(() => {
            client.createChannel({ uniqueName: channelUniqeName, friendlyName: 'Private chat', isPrivate: true })
              .then((channel: any) => {
                alert('You have joined.');
                channel.join();
                channel.invite(invite_to).then(() => {
                  alert(`${invite_to} has been invited!`);
                });
            })
          }),
      )
      .catch((err: any) => alert(err.message + 'danger' ) )
      .finally(() => {
        props.setCreateChannelModal(false);
        console.log('done');
      });
  };

  const addMemberInChannel = async (user: any) => {
    if(props.isPrivate) {
      /* Create channel for 1 to 1 chat */
      onCreateOrJoin(currentUser.username, user.username);
    } else {
      /* Add member in channel */
      try {
        const payload: any = {
          channel_sid: props.selectedChannelData.id,
          invited_by: currentUser?.id,
          invited_to: user.id,
          channel_group: props.group_id
        };
        await twilioService.addUserToChannel(payload);
        props.setCreateChannelModal(false);
        props.inviteMemberToChannel(user.username);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setSearchTerm(searchValue)
    if (searchValue) {
      const search: string = usersList?.filter((user: any) => {
        return (
          user.username.toLowerCase().includes(searchValue.toLowerCase())
        )
      })
      setSearchResults(search)
    }else{
      setSearchResults('')
    }
  }

  return (
    <Modal
      className="subscribe_invest_modal search_user_chat"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Search User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal_body_content">
          <div className="chat_submit_msg mt-4">
            
              <Grid container>
                <Grid item md={1} sm={1} xs={1}>
                  <img src={Search} className="mt-2" alt="img" />
                </Grid>
                <Grid item md={11} sm={11} xs={11} className="pl-0">
                  <TextField
                    id="input-with-icon-grid"
                    label="Search here..."
                    value={searchTerm}
                    onChange={(e: any) => onSearch(e)}
                  />
                </Grid>
              </Grid>
            
              <Grid container component={Paper} className="mt-4 search_list">
                <Grid item xs={12} className="mt-2">
                  <List className="p-0">
                    {
                       (searchResults || (!searchResults && usersList))
                       &&
                       (searchResults || (!searchResults && usersList))?.map((item: any, i: number) => (
                        <ListItem className="p-0" key={i}>
                          <Grid container>
                            <Grid item md={11} sm={11} xs={11}>
                              <ListItemText className="" secondary={item?.username}></ListItemText>
                            </Grid>

                            <Grid item md={1} sm={1} xs={1}>
                              <div className="user_img_chat">
                                { item?.isAdded ? <span>Added</span> : <img src={Plus} alt="img" onClick={() => { addMemberInChannel(item) }} /> }
                              </div>
                            </Grid>
                          </Grid>
                        </ListItem>
                      ))
                    }
                  </List>
                </Grid>
              </Grid>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export const SearchUsersPopup = ({
  isCreateChannelModal, 
  setCreateChannelModal, 
  channelMembersList, 
  selectedChannelData,
  group_id, 
  inviteMemberToChannel,
  isPrivate}: any) => {
    
  return (
      <MyVerticallyCenteredModal
        isPrivate={isPrivate}
        group_id={group_id}
        selectedChannelData={selectedChannelData}
        setCreateChannelModal={setCreateChannelModal}
        channelMembersList={channelMembersList}
        show={isCreateChannelModal}
        inviteMemberToChannel={inviteMemberToChannel}
        onHide={() => setCreateChannelModal(false)}
      />
  );
}