import React from 'react';
import { useHistory } from "react-router-dom";
import * as images from '../images'
import "./bookNow.scss";
import TabIcon from '../tabs/tabs';

interface IProps { }

export const BookNow: React.FC<IProps> = () => {
    const history = useHistory();
    const pageBack = () => {
        history.goBack();
    }

    return (
        <div className="mobilemaincontainer">
            <div className="mobile_container">
                <div className="sabrinamainscroll">
                        <div className="yogatrainercontainer userprofilemainyoga">
                            <div className="profileimgmaincontainer">
                                <img src={images.trainerimg} className="trainer_img" alt=""/>
                                <p className="remainingContainer">
                                    <img src={images.backarrow} onClick={pageBack} className="cursor-pointer" alt="back" />
                                    <img src={images.bigimgshowwhite} className="imagesshow cursor-pointer" alt="" />
                                </p>
                            </div>
                            <p className="remainingcontainer"><span><img src={images.redclock} alt="Clock"/>14:00:00 left</span><span className="bookarrowimg">1 remaining</span></p>
                            <p className="booknowhkcontainer">
                                <span><span className="dolar_text">$HK</span>600<span className="dolar_text">00</span></span>
                                {/* <p className="remainingtext">1 remaining</p> */}
                            </p>
                            </div>
                            <div className="book_scroll"> 
                            <div className="yoga_session">
                                <p className="small_group">yoga session - small group of 8</p>
                                <p className="join_other">Join me & others like you for a fun 90 min. Yoga session. we will be doing a few workouts together.</p>
                                <p className="tamar_text">
                                    <span className="tamer_park"><img src={images.location} alt="" />tamar park</span>
                                    <span>22 may, 2021</span>
                                    <span>06:00 pm</span>
                                </p>
                            </div>
                       
                        <div className="notes_container">
                            <span>NOtes: </span>
                            <p>1. This booking is non-refundable</p>
                            <p>2. Booking can be transferred to another person</p>
                            <p>3. In case of venue change, you will be notified atleast 3 hours in advance, you will have the option to get a refund</p>
                        </div>
                        <div className="booknowbtn">
                            <button>book now</button>
                        </div>
                        </div>
                        
                    </div>
                    <TabIcon/>
                </div>
        </div>
    )
}