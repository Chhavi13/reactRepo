import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { TwilioService } from '../../services/twilio.service';
import * as twilioService  from '../../services/twilio.service';
import Close from "../../assets/images/mobileimages/cancel1.png";

interface IProps {}

export const CreateChannelNew: React.FC<any> = (props: any) => {
  console.log(props);
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
    // console.log(channelName);
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
        // props.setIsToggleSidebar(false);
        console.log('done')
      });
  };

  const onSubmit = async () => {
    onCreateOrJoin(name, props.friendlyName);
  }

  return (
    <div className="create-channel-modal">
      <div className="channel_header">
        <h1 className="pt-2 mb-0">new channel</h1>
        <img src={Close} alt="Image" />
      </div>

      <div className="channel_body">
        <form className="w-100" noValidate autoComplete="off">
          <TextField
            id="standard-password-input"
            label="Channel name"
            type="text"
            autoComplete="current-password"
            className="mb-4"
            onChange={(event: any)=> valueChangeHandler(event.target.value)}
          />

          <TextField
            id="standard-textarea"
            label="Description (Optional)"
            placeholder=""
            className="mb-5"
            multiline
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={`modal_btn mt-4 ${!name && "validate_btn"}`}
            disabled={!name && true}
            onClick={onSubmit}>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
