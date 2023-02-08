import Icon from '@mui/material/Icon';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image, ListGroup, Card, ListGroupItem, ProgressBar, Form } from 'react-bootstrap';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import "./NurseChat.scss";
import SenderProfile from "../../Assets/img/asknurse/sender-profile.png";
import ReceiverProfile from "../../Assets/img/asknurse/receiver-profile.png";
import Header from '../Ask_A_Nurse/Header';
import TabsButton from '../Ask_A_Nurse/Tabs';
import { io } from "socket.io-client";
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { getChatDataApi } from '../../Service/ask_a_nurse';
import profile from "../../Assets/img/profile.png"
import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import nurse_tag from "../../Assets/img/asknurse/RegisterNurseTag-sm.svg";



const NurseChat = ({ socket }: any) => {
  let { state }: any = useLocation()
  let [chat, setChat] = useState<any>([])
  let [chatValue, setChatValue] = useState<any>("")
  let userID: any = localStorage.getItem("Nurture_user_data");
  const Navigate = useNavigate()
  userID = JSON.parse(userID)?.id;

  let onBack = () => {
    Navigate(-1)
  }
  const scrollToLastMsg = () => {
    let chatId = document.getElementsByClassName("chatting")
    chatId[chatId.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }
  const chatHistory = async () => {
    let chatData: any = await getChatDataApi({
      user_id: state?.data?.user?.id,
      ask_nurse_question_id: state?.data?.id
    });
    if (chatData?.data?.success) {
      chat = chatData?.data;
      await setChat(chat)
      scrollToLastMsg()
    }
  }

  useEffect(() => {
    chatHistory()
  }, [])
  const updateChat = (data: any) => {

    console.log("chat from chat data", chat)
    if (state?.data?.id == data?.question_id) {
      if (!chat?.instructor || chat?.instructor === null) {
        // chat.message = data?.message
        if (chat?.instructor === null || !chat?.instructor) chat.instructor = new Object();
        chat.instructor.user_photo = data?.user?.user_photo !== null && data?.user?.user_photo
        chat.instructor.user_name = data?.user?.user_name
        chat.instructor.id = Number(data?.user?.user_id)
        if (!chat?.data) chat.data = new Array();
        chat.data = [...chat.data, data]
        setChat({ ...chat })
      } else {
        chat = { ...chat }
        chat.data.push(data)
        setChat({ ...chat })
      }

    }
  }
  const onChatSubmit = async () => {
    if (!chatValue || chatValue.trim() === "") return
    // id: state?.data?.user?.id,
    // user_name: state?.data?.user?.name,
    // user_photo: state?.data?.user?.photo,
    let msg = {
      user: {
        user_id: state?.data?.user?.id,
        user_name: state?.data?.user?.name,
        user_photo: state?.data?.user?.photo,
        type: state?.data?.user?.type
      },
      receive_id: state?.data?.instructor?.id,
      created_at: new Date(),
      question_id: state?.data?.id,
      message: chatValue.trim()
    }

    await socket.emit('sendMessage', msg)
    await updateChat(msg)
    let chatId = document.getElementsByClassName("chatting")
    chatId[chatId.length - 1]?.scrollIntoView({ behavior: "smooth", block: "center" })
    setChatValue("")
  }

  useEffect(() => {
    socket.on("ToMessage", updateChat)
    // socket.on("askANurseQuestionReply", (data: any) => {
    //   debugger
    //   if(data?.question_id == state.data.id){
    //     debugger
    //   }
    // })
    // state.data.instructor.name = "pathan sahab"
    return () => socket.off("ToMessage")
  }, [socket])
  const onkeyChat = (event: any) => {
    if (event.key === "Enter") {
      onChatSubmit()
    }
  }
  console.log("chat", chat)
  return (
    <div className='chat-expanded-view'>
      {/* <Header /> */}
      {/* <TabsButton
        Tab1={() => (<></>)}
        Tab2={() => (<></>)}
      /> */}
      <Container>
        <Row>
          <div className='col-lg-12 py-2'>
            <div className='back-pg' onClick={onBack}><ArrowBackIosNewIcon />Back</div>
          </div>
        </Row>
        <Row className='mb-3'>
          <div className='col-lg-12'>
            <div className='receiver-info d-flex align-items-center py-3'>
              {chat?.instructor &&
                <>
                  <div className="nurse-profile" style={{ 'backgroundImage': `url(${chat?.instructor?.user_photo ? chat?.instructor?.user_photo : profile})` }}></div>
                  <div className="nurse-personalinfo ms-3">
                    <div className="nurse-name">{chat?.instructor?.user_name}</div>
                    <div className="register-tag"><span className='registered-label-tag me-1'>{chat?.instructor?.are_you_registered || chat?.instructor?.are_you_registered == 1 ? <img src={nurse_tag}></img> : ""}</span>{chat?.instructor?.designation}</div>

                  </div>
                </>
              }
            </div>
          </div>
        </Row>
        <Row>
          <div className='col-lg-12 col-md-12 all-msg-thread'>
            {/* <Row className='justify-content-end askN-questions-container'>
              <div className='time-stamp'>Last time, {moment(state?.data?.created_at).fromNow()} </div>
              <div className='col-lg-10 '>
                <div className='askN-questions text-right'>
                  {state?.data?.question}
                  <br></br>
                  {state?.data?.image && <img src={state?.data?.image}
                    style={{ height: 100, width: 200 }}
                  />}
                </div>
              </div>
            </Row> */}
            <Row className='message-list-container'>
              <div className='col-lg-12 chat-threds'>
                {chat?.data?.map(
                  (res: any, index: number) => (
                    <>
                      {
                        index !== 0 ?
                          <div key={index} className={`col-lg-12 mb-2`}>
                            <div className='row chatting '>
                              {/* <div className='time-stamp'>{moment(res?.created_at).fromNow()} {""}{moment(res?.created_at).format("LLLL")} </div> */}
                              {(res?.user?.id || res?.user?.user_id) !== userID ? <div className='col-lg-10 receiver-inner'>
                                <div className='d-flex w-100 justify-content-start'>
                                  <div className='msg-list-profile'>
                                    <img src={res?.user?.user_photo ? res?.user?.user_photo : profile} />
                                  </div>
                                  <div className='d-flex flex-column msg-details-info'>
                                    <div className='messanger-nurse-nm'>{res?.user?.user_name}</div>
                                    <div className='msg-details'>
                                      <p>{res?.message} </p>
                                      <span className='time-stamp text-end'>{moment(res?.created_at).fromNow()} {""}{moment(res?.created_at).format("LL")}</span>
                                    </div>
                                  </div>
                                </div>
                              </div> :
                                <div className='col-lg-10 sender-inner me-0 ms-auto'>
                                  <div className='d-flex w-100 justify-content-end'>
                                    <div className='d-flex flex-column msg-details-info'>
                                      <div className='messanger-nurse-nm text-end'>You</div>
                                      <div className='msg-details'>
                                        <p>{res?.message} </p>
                                        <span className='time-stamp text-end'>{moment(res?.created_at).fromNow()} {""}{moment(res?.created_at).format("LL")}</span>
                                      </div>
                                    </div>
                                    <div className='msg-list-profile'>
                                      <img src={res?.user?.user_photo ? res?.user?.user_photo : profile} />
                                    </div>
                                  </div>
                                </div>}
                            </div>
                          </div> : <Row className='justify-content-end askN-questions-container'>
                            <div className='time-stamp'>Last time, {moment(state?.data?.created_at).fromNow()} </div>
                            <div className='col-lg-10 '>
                              <div className='askN-questions text-right'>
                                {state?.data?.question}
                                <br></br>
                                {state?.data?.image && <img src={state?.data?.image}
                                  style={{ height: 100, width: 200 }}
                                />}
                              </div>
                            </div>
                          </Row>
                      }

                    </>

                  ))}
              </div>
            </Row>
          </div>
          <div className='chat-footer'>
            {chat?.instructor ? <div className='d-flex justify-content-between'>
              {/* <div className='form-text mt-0'> */}
              <Form.Group controlId="formBasicText" className="w-100">
                <Form.Control type="text"
                  onKeyPress={onkeyChat}
                  value={chatValue} onChange={(e) => setChatValue(e.target.value)} placeholder="Type any..." />
              </Form.Group>
              {/* </div> */}
              <div className='chat-attachment px-1'>
                {/* <button className='btn chat-attachment-btn'></button> */}
              </div>
              <div className='message-send px-1'>
                <button className='btn message-send-btn' onClick={onChatSubmit}></button>
              </div>
            </div> : <div>Waiting for reply.....</div>}
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default NurseChat