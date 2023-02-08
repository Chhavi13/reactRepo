import React, { useEffect, useState } from 'react';
import { Tooltip, Image, TooltipProps, Button } from 'react-bootstrap';
import "./index.css"
import "./Ask-a-nurse.scss";
import { deleteUserMsgApi, getMyMsgApi, getQuestionList, getTagList, tagFilterCourse } from '../../Service/ask_a_nurse';
import Header from './Header';
import Popup_Ask_A_Nurse from './Popup_Ask_A_Nurse';
import Search from './Search';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import TabsButton from './Tabs';
import "react-notification-alert/dist/animate.css";
import AskIcon from "../../Assets/img/asknurse/Q.svg";
import { useNavigate } from 'react-router-dom';
import { MEMBERSHIP } from '../../Routes/RouteConstent';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Button from 'react-bootstrap/Button';
// import OverLayWrapper from './overLayWrapper';



const Ask_A_Nurse = ({ socket }: any) => {

    let [userMsg, setUserMsg] = React.useState<any>([])
    const [openPop, setOpenPop] = React.useState<boolean>(false)
    const [data, setData] = React.useState<any>([]);
    const [isDot, setIsDot] = React.useState<any>([])
    let [valueSelect, setValueSelect] = React.useState('');
    const [notify, setNotify] = useState<any>([])
    const Navigator = useNavigate()
    const handleClickOpen = () => {
        setOpenPop(true);
    };

    let getApiForTag = async () => {
        try {
            let res: any = await tagFilterCourse()
            setData(res?.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getApiForTag()
    }, [])

    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)

    const getUserMsg = async () => {
        try {
            let res: any = await getMyMsgApi({ user_id: userID?.id })
            if (res?.data?.success) {
                setUserMsg(res?.data?.data)

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserMsg()
    }, [])

    React.useEffect(() => {
        let user = {
            user_id: userID?.id,
            user_name: userID?.user_name,
            user_photo: userID?.user_photo,
            type: userID?.type
        }
        socket.on("ToMessage", (data: any) => {
            setUserMsg((oValue: any) => {
                return oValue.map((res: any) => {
                    if (res?.id == data?.question_id) {
                        res.dot = true
                    }
                    return res;
                })
            })

            let unseenMsg: any = localStorage.getItem("NapsUnseenMsg")
            if (unseenMsg === null) { unseenMsg = [] }
            else unseenMsg = JSON.parse(unseenMsg)
            unseenMsg.push(data?.question_id)
            setIsDot(unseenMsg)
            localStorage.setItem("NapsUnseenMsg", JSON.stringify(unseenMsg))
        })
        socket.on("askANurseQuestionReply", (data: any) => {

            try {
                setUserMsg((value: any) => {
                    return value.map((res: any) => {
                        if (res?.id == data?.question_id) {
                            res.answer = data?.message
                            if (res.instructor === null) {
                                res.instructor = new Object();
                            }
                            res.instructor.photo = data?.user?.user_photo !== null && data?.user?.user_photo
                            res.instructor.name = data?.user?.user_name
                            res.instructor.id = Number(data?.user?.user_id)

                        }
                        return res;
                    })
                })
                console.log(data)
            } catch (error) {

            }
        })
        return () => {
            socket.off("ToMessage")
            socket.off("askANurseQuestionReply")
        }
    }, [socket])

    const becomeMembership = () => {
        Navigator(MEMBERSHIP)
    }


    return (

        // <OverLayWrapper >
        <>

            <div className={`faq-container container-fluid mt-5 mb-4 `}>
                {userID?.is_membership ? <div>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12'>
                            <Header handleClickOpen={handleClickOpen} />
                            <TabsButton
                                Tab2={() => (<Tab2 data={userMsg} isDot={isDot} setIsDot={setIsDot} valueSelect={valueSelect} setValueSelect={setValueSelect} setData={setUserMsg} socket={socket} />)}
                            />


                            <Popup_Ask_A_Nurse
                                open={openPop} setOpen={setOpenPop}
                                setData={setUserMsg} list={data}
                                data={userMsg}
                                socket={socket}
                            />
                        </div>
                    </div>

                    <div className="ask-a-nurse-mob d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none">
                        <div className='askN-btn'>
                            <button onClick={() => setOpenPop(true)}>+ Ask a Nurse</button>
                        </div>
                    </div>
                </div> :
                    < div className='has-overlay container-fluid'>
                        <div className='row'>
                            <section className='px-3 section-lock'>
                                <div className="container lock-content">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className='d-flex justify-content-center flex-column'>
                                                <div className={`lock-icon  mx-auto`}>
                                                </div>
                                                <div className='member-title my-2'>
                                                    <h1 className='p-0'>Become a Member <br />
                                                        <strong>for total access</strong>
                                                    </h1>
                                                </div>
                                                <div className='member-description'>
                                                    <p>This is your all-access pass to our courses, videos, live webinars, Ask A Nurse, and more. Plus 1:1 consultation discounts and an onboarding call with a NAPS nurse to learn how we can best support you.</p>
                                                </div>
                                                <div className='btn-container my-3'>
                                                    <button type="button" className="btn secondary-teal-btn" onClick={becomeMembership}>Join Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>}
            </div >
        </>
        // </OverLayWrapper>
    )
}

export default Ask_A_Nurse