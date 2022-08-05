import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import './avatarGroupIcon.scss';

export default function GroupAvatarsIcon({channelMembersList}: any) {
  console.log(channelMembersList)
  return (
    <AvatarGroup max={3}>
      {
        channelMembersList.map((item: any, i: number) => {
          return(
            <Avatar alt={item.identity} src={item.avatar} className="sizeAvatar" key={i} />
          )
        })
      }
      {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
    </AvatarGroup>
  );
}