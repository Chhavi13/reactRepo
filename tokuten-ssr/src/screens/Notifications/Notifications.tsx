import React, { useState, useEffect } from 'react'
import { Header } from '../../components/header/header'
import TabIcon from '../tabs/tabs'
import './Notifications.scss'
import { useHistory } from "react-router-dom";
import img1 from '../../assets/images/notification/Ellipse 61.png';
import img2 from '../../assets/images/notification/Ellipse 62.png';
import img3 from '../../assets/images/notification/Ellipse 63.png';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import axiosInstance from "../../services/axios";
import { useDispatch } from "react-redux";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState<any>([])
  const classes = useStyles();
  const path: string = window?.location?.pathname
  const todaysDate = new Date();
  //const offerDate = new Date(moment(item?.starts_at).format('DD MMMM YYYY'));
  //const daysCount = Math.round((todaysDate.getTime() - offerDate.getTime()) / (1000 * 60 * 60 * 24))
  //console.log("datadddddd",data);
  useEffect(() => {
    async function fetchNotification() {
      let response = await axiosInstance('notification/list/');
      setData(response?.data?.data)
    }
    fetchNotification()
  }, [])

  const profileDetail = (profileId: any) => {
    history.push(`user/${profileId?.username}/${profileId?.id}`);
  }

  const offerDetail = (offerId: any) => {
    {offerId===undefined?history.push(`/notification`):history.push(`/offer/comment/${offerId}`) }
  }

  


  return (
    <div className="mobilemaincontainer content">
      <div className="mobile_container dash_tabs">
        <div className="sabrinamainscroll create_page">
          <Header title="Notification page" back={false} />
          <div className="main_nott">
            <h2>All notifications</h2>
            {
              data?.map((item: any, i: any) => {
                return (
                  <div className="not_con">
                    <div className={classes.root}>
                      <Avatar alt="Remy Sharp" src={item?.from_user?.profile_image} onClick={() => profileDetail(item?.from_user)} />
                    </div>
                    <p>
                      <b>{item?.from_user?.username} <br />{item?.details?.title} </b>
                      {item?.notification_type === 'Comment' && <><br /> <span>{item?.details.comment?.comment}</span></>}
                      <br />
                      {moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a, ddd')}
                    </p>
                    <div className="btn_set">
                      <span>
                        {/* {Math.round((todaysDate.getTime() - new Date(moment(item?.created_at).format('DD MMMM YYYY')).getTime()) / (1000 * 60 * 60 * 24))} */}
                        {moment(item?.created_at).fromNow()}
                      </span>

                      <button className="btn red" onClick={() => offerDetail(item?.details?.offer_id)}>{item?.notification_type}</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <TabIcon />
        </div>
      </div>
    </div>
  )
}

export default Notification
