import React, { useState, useEffect } from 'react'
import { Header } from '../../components/header/header'
import TabIcon from '../tabs/tabs'
import './Notifications.scss'
import img1 from '../../assets/images/notification/Ellipse 61.png';
import img2 from '../../assets/images/notification/Ellipse 62.png';
import img3 from '../../assets/images/notification/Ellipse 63.png';
import axios from 'axios';
import axiosInstance from "../../services/axios";
import { useDispatch } from "react-redux";
import moment from 'moment';
const Notification = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState<any>([])
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

    return (
        <div className="mobilemaincontainer content">
            <div className="mobile_container dash_tabs">
                <div className="sabrinamainscroll create_page">
                    <Header title="Notification page" back={true} />
                    <div className="main_nott">
                        <h2>all notifications</h2>

                        {
                            data?.map((item:any, i: any) => {
                                return(
                                 <div className="not_con">
                                    <img src={item?.from_user?.profile_image} alt="" />
                                    <p><b>{item?.from_user?.first_name} <br />{item?.details?.title}</b><br/>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a, ddd')}</p>
                                    <div className="btn_set">
                                        <span>
                                        {/* {Math.round((todaysDate.getTime() - new Date(moment(item?.created_at).format('DD MMMM YYYY')).getTime()) / (1000 * 60 * 60 * 24))} */}
                                        {moment(item?.created_at).fromNow()} 
                                            </span>
                                           
                                        <button className="btn red">{item?.notification_type}</button>
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
