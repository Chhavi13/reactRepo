import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TwilioService } from '../../services/twilio.service';
import { Header } from '../../components/header/header';
import "./channel-create.scss"

interface IProps { }

export const CreateChannel: React.FC<IProps> = () => {
  const history = useHistory()
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [channels, updateChannels] = useState<any>();

  const onAddChannel = (channel: any) => {
    const newChannel = TwilioService.getInstance().parseChannel(channel);
    // updateChannels(channels.concat(newChannel));
  };

  console.log(TwilioService.chatClient);
  const onCreateOrJoin = () => {
    setLoading(true);
    TwilioService.getInstance().getChatClient()
      .then((client: any) =>
        client
          .getChannelByUniqueName(channelName)
          .then((channel: any) => (channel.channelState.status !== 'joined' ? channel.join() : channel))
          .then(onAddChannel)
          .catch(() =>
            client.createChannel({ uniqueName: channelName, friendlyName: 'Friendly name Zee' })
              .then((channel: any) => {
                onAddChannel(channel);
                channel.join();
            }),
          ),
      )
      .then(() => alert( 'You have joined.' ) )
      .catch((err: any) => alert(err.message + 'danger' ) )
      .finally(() => setLoading(false));
  };

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs store_box">
        <Header
          title="Create channel"
          back={true}
          enableback={() => { history.goBack() }}
        />
        
        <div className="channel-container">
          <label htmlFor="ChanelName" className="channel-name" >Chan-Name</label>
          <input id="ChanelName" type="text" 
            onChange={(event) => setChannelName(event.target.value)}/>
        </div>
        <button
          type="submit"
          className="channel_btn"
          onClick={onCreateOrJoin}>
          Save
        </button>
      </div>
    </div>
  )
}