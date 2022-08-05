import { Input, makeStyles, Theme } from '@material-ui/core';
import Send from "../../assets/images/mobileimages/send.png";
import moment from 'moment';
import React, { useState } from 'react'
import { Row, Col, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import Comment1 from "../../assets/images/comment1.png";
import BgHeart from "../../assets/images/heart.png";
import { addComments, getOfferReplies } from '../../services/offer.service';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


const Comments = ({ data, offerId, label ,refComments,setRefComments }: any) => {
    const classes = useStyles();

    const [loading, setLoading] = useState<Boolean>(false)
    const [itemID, setItemId] = useState<Number>()

    const date: any = new Date();
    // const realDate: any = moment(date).format('MMMM Do YYYY, h:mm:ss a')
    // console.log("date and time from comment", realDate)
    
    const refComment = async (id:any) => {
        if (id === itemID) {
            return;
        }
        try {
            setItemId(id)
            setLoading(true)
            setRefComments([])
            let res: any = await getOfferReplies(id)
            setRefComments(res?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div>

            <div className="comment_border">
                <div className="comment_reply_section">
                    {data?.map((data: any, key: Number) => (

                        <Row>
                            <Col md={2} xs={2} className="">
                                <div className="user-img">
                                    <img src={data?.user?.profile_image} alt="profile pic" />
                                </div>
                            </Col>

                            <Col md={10} xs={10} className="">
                                <div className="comment_msg">
                                    <div className="comment_msg_box">
                                        <Row>
                                            <Col md={8} xs={8}>
                                                <h5>
                                                    {data?.user?.first_name}
                                                </h5>
                                                <p className="user_profile">
                                                    market expert
                                                </p>
                                            </Col>

                                            <Col md={4} xs={4}>
                                                <div className="text_user_right">
                                                    <p className="text-right d-inline-block">
                                                        {/* {moment(data?.created_at).format('Do MMMM  YYYY, h:mm:ss')} */}
                                                    </p>
                                                    <DropdownButton className="dropdown_user d-inline-block" id="dropdown-basic-button" title="">
                                                        <Dropdown.Item href="#">1</Dropdown.Item>
                                                        <Dropdown.Item href="#">2</Dropdown.Item>
                                                        <Dropdown.Item href="#">3</Dropdown.Item>
                                                    </DropdownButton>
                                                </div>
                                            </Col>
                                        </Row>

                                        <p className="user_reply">
                                            {data?.comment}
                                        </p>
                                    </div>

                                    <div className="like_reply_div">
                                        <div className="like_div d-inline-block">
                                            <p>
                                                Like
                                                <img src={BgHeart} className="ml-2 mr-2" alt="Image" />
                                                12
                                            </p>
                                        </div>

                                        <div className="reply_div d-inline-block">
                                            <p className="reply_first d-inline-block" style={{ cursor: "pointer" }}
                                                onClick={() => label({ label: data?.user?.first_name, offerId: data?.id })}>
                                                reply
                                            </p>

                                            <p className="reply_two d-inline-block">
                                                {data?.replies_count} replies
                                            </p>

                                        </div>

                                    </div>
                                </div>

                                {data?.replies_count != 0 && <span className="more_reply d-block" onClick={() => refComment(data?.id)}>
                                    {/* Show 10 more replies */}
                                    Show {data?.replies_count} replies
                                    {loading && itemID === data?.id && <Spinner animation="grow" role="status" size="sm" variant="info" />}
                                </span>}

                                {itemID === data?.id && !loading && refComments.map((res: any, item: Number) => (
                                    <div className="comment_reply_section">
                                        <Row>
                                            <Col md={2} xs={2} className="">
                                                <div className="user-img">
                                                    <img src={res?.user?.profile_image} alt="Image" />
                                                </div>
                                            </Col>

                                            <Col md={10} xs={10} className="">
                                                <div className="comment_msg">
                                                    <div className="comment_msg_box">
                                                        <Row>
                                                            <Col md={7} xs={7}>
                                                                <h5>
                                                                    {res?.user?.first_name}
                                                                </h5>
                                                                <p className="user_profile">
                                                                    market expert
                                                                </p>
                                                            </Col>

                                                            <Col md={5} xs={5}>
                                                                <div className="text_user_right">
                                                                    <p className="text-right d-inline-block">
                                                                        59m
                                                                    </p>
                                                                    <DropdownButton className="dropdown_user d-inline-block" id="dropdown-basic-button" title="">
                                                                        <Dropdown.Item href="#">1</Dropdown.Item>
                                                                        <Dropdown.Item href="#">2</Dropdown.Item>
                                                                        <Dropdown.Item href="#">3</Dropdown.Item>
                                                                    </DropdownButton>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <p className="user_reply">
                                                            {res?.comment}
                                                        </p>
                                                    </div>

                                                    <div className="like_reply_div">
                                                        <div className="like_div d-inline-block">
                                                            <p>
                                                                Like
                                                                <img src={BgHeart} className="ml-2 mr-2" alt="Image" />
                                                                1
                                                            </p>
                                                        </div>

                                                        <div className="reply_div d-inline-block">
                                                            <p className="reply_first d-inline-block">
                                                                reply
                                                            </p>


                                                        </div>
                                                    </div>
                                                </div>


                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Comments
