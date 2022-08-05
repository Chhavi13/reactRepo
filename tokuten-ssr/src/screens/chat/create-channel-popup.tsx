import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { TwilioService } from '../../services/twilio.service';
import * as twilioService  from '../../services/twilio.service';

function MyVerticallyCenteredModal(props: any) {
  const [name, setName] = useState<any>();

  const valueChangeHandler = (event: any) => {
    setName(event);
  }

  const onCreateChannel = (channel: any, channelName: string, channelUniqeName: string) => {
    const payload: any = {
      channel_group: props?.groupInfo?.id,
      channel_sid: channel.sid,
      channel_unique_name: channelUniqeName,
      channel_name: channelName
    }
    /* Create new channel */
    twilioService.createChannel(payload).then(res => {
      props.updateChannelList(res.data.data);
    });
  }

  const onCreateOrJoin = (channelName: string, friendlyName: string) => {
    const channelUniqeName =`${channelName}_${friendlyName}`;
    console.log(channelName);
    TwilioService.getInstance().getChatClient()
      .then((client: any) => client.getChannelByUniqueName(channelUniqeName)
          .then((channel: any) => {
            alert('This channel name is already exits');
            // (channel.channelState.status !== 'joined' ? channel.join() : channel)
          }).catch(() => {
            client.createChannel({ uniqueName: channelUniqeName, friendlyName: friendlyName, isPrivate: false })
              .then((channel: any) => {
                onCreateChannel(channel, channelName, channelUniqeName);
                alert('You have joined.')
                // onAddChannel(channel);
                channel.join();
            })
          }),
      )
      .catch((err: any) => alert(err.message + 'danger' ) )
      .finally(() => {
        setName('');
        props.setCreateChannelModal(false);
        console.log('done')
      });
  };
  
   const onSubmit = async () => {
    if(props.title === 'Create channel') { /*Create channel*/
      onCreateOrJoin(name, props.friendlyName);
      // let res = await TwilioService.getInstance().createPublicChannel('angular_777');
    } else { /* Create Group */
      const payload = {
        group_name: name,
        creator: props.userInfo.id,
      }
      twilioService.createGroup(payload).then(res => {
        setName('');
        props.updateGroupList(res?.data?.data);
        props.setCreateChannelModal(false);
      });
    }
  }

  return (
    <Modal
      className="subscribe_invest_modal add_user_chat"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal_body_content">
          <div className="chat_submit_msg mt-4">
            <Grid container>
              <Grid item md={12} sm={12} xs={12}>
                <TextField id="outlined-basic-text" label={props.title} fullWidth 
                  onChange={(event: any)=> valueChangeHandler(event.target.value)}
                />
              </Grid>
            </Grid>

            <div className="btn_section mt-2">
              <Button variant="contained" color="primary" className="btn_sub_now text-center mb-0"
                onClick={onSubmit} disabled={ !name }>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export const CreateChannelPopup = ({ 
  openChannelModal, 
  setOpenChannelModal, title, userInfo, updateGroupList,
  friendlyName, groupInfo, updateChannelList }: any) => {
  
  return (
      <MyVerticallyCenteredModal
        friendlyName={friendlyName}
        groupInfo={groupInfo}
        userInfo={userInfo}
        title={title}
        show={openChannelModal}
        setCreateChannelModal={setOpenChannelModal}
        updateGroupList={updateGroupList}
        updateChannelList={updateChannelList}
        onHide={() => setOpenChannelModal(false)}
      />
  );
}